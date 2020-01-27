import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProductsPage } from '../products/products';
import { ContactPage } from '../contact/contact';
import { AddressesPage } from '../addresses/addresses';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  userName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
   this.userName = localStorage.getItem('userName');
  }

  ionViewCanEnter(){
    this.userName = localStorage.getItem('userName');
  }

  goProducts(){
    this.navCtrl.push(ProductsPage);
  }

  goAddresses(){
    this.navCtrl.push(AddressesPage);
  }

  goContact(){
    this.navCtrl.push(ContactPage);
  }

  alerta(mensaje: string) {
    this.alertCtrl.create({
      message: mensaje,
      buttons: ['Ok']
    }).present();
  }

  confirmarCierreSesion() {
    let alert = this.alertCtrl.create({
      title: '¿Quiere cerrar sesión?',
      message: 'Al confirmar, volvera a la pantalla de inicio',
      buttons: [
        {
          text: 'NO',
          handler: () => {

          }
        },
        {
          text: 'SI',
          handler: () => {
            this.cerrarSesion();
          }
        }
      ]
    });
    alert.present();
  }

  cerrarSesion(){
    this.navCtrl.setRoot(LoginPage);
    localStorage.removeItem('userName');
    localStorage.clear();
  }


}
