import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable()
export class ClientService {

  constructor(
    public af: AngularFireDatabase
  ) {
  }

  getClients(): Observable<Client[]> {
    return this.af.list('/clients').snapshotChanges()
    .map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  newClient(client: Client) {
    return this.af.list('/clients').push(client);
  }

  getClient(id: string): Observable<Client> {
    return this.af.object('/clients/' + id).valueChanges();

  }

  updateClient(id: string, client: Client) {
    return this.af.object('/clients/' + id).update(client);
  }

  deleteClient(id: string) {
    return this.af.object('/clients/' + id).remove();
  }

}
