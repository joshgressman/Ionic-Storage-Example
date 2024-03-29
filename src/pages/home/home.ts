import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any[] = [];

  constructor(public navCtrl: NavController, private storage: Storage) {
   this.getUsers();
  }

  getUsers() {
    this.storage.ready().then(() => {
      this.storage.forEach((v, k, i) => {
        if (k.indexOf('user') === 0) {
          this.users.push(v);
        }
      });
    });
    console.log("users", this.users)
  }

  addUser(name, age) {
    this.storage.ready().then(() => {
      let user = {
        id: this.genRandomId(),
        name: name.value,
        age: age.value
      };
           // save it to the storage
      this.storage.set('user-' + user.id, user);
      // update the inmemory variable to refresh the UI
      this.users.push(user);
      // reset the form
      name.value = '';
      age.value = '';
    });
  }

  removeUser(user) {
    this.storage.ready().then(() => {
      //remove from storage
      this.storage.remove('user-' + user.id);
      //update the inmemory variable to refresh ui
      this.users.splice(this.users.indexOf(user, 1));
    });

  }

  genRandomId() {
    // up to 4 digits random number
    return Math.floor(Math.random() * 9999);
  }

}
