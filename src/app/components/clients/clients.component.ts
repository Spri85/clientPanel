import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients;
  clientsSub: Subscription;
  totalOwed: number;


  constructor(public clientService: ClientService) {
   }

  ngOnInit() {
    this.clientsSub = this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  private getTotalOwed() {
    let total = 0;
    for (let i = 0; i < this.clients.length; i++) {
      total += Number(this.clients[i].balance);
    }
    this.totalOwed = total;
  }

  ngOnDestroy() {
    this.clientsSub.unsubscribe();
  }

}
