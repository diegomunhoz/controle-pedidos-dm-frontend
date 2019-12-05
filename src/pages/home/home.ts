import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'))
        this.navCtrl.setRoot('CategoriasPage')
      },
      error => {})
  }

  signup() {
    this.navCtrl.push('SignupPage')
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'))
      this.navCtrl.setRoot('CategoriasPage')
    },
    error => {})
  }

}
