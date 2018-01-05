import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
  id: string;
  client: Client;
  clientSub: Subscription;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id
    this.id = this.route.snapshot.params['id'];

    // Get Client
    this.clientSub = this.clientService.getClient(this.id)
      .subscribe((client) => {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
      });
  }

  updateBalance(id: string) {
    // Update client
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance updated', { cssClass: 'alert-success', timeout: 2000});
    this.router.navigate(['/client/' + id]);
    this.showBalanceUpdateInput = false;
  }

  onDelete() {
    if (confirm('Are you sure to delete?')) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client deleted', { cssClass: 'alert-success', timeout: 2000});
    this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }

}
