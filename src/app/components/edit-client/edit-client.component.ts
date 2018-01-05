import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {
  id: string;
  clientSub: Subscription;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnEdit: boolean;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEddit;

    // Get Client
    this.clientSub = this.clientService.getClient(this.id)
    .subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['edit-client/' + this.id]);
    } else {
      // Update Client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client updated', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/client/' + this.id]);
    }
  }

  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }

}
