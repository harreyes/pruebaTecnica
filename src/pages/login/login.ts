import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController,  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInterfaz } from '../../interfaces/login';
import { ServicesProvider } from '../../providers/services/services';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public User: string;
  public password: string;
  public formauth: FormGroup;

  constructor(public alertCtrl: AlertController,public loadingCtrl: LoadingController,public navCtrl: NavController,
     public navParams: NavParams, public formBuilder: FormBuilder, public servicesProvider: ServicesProvider) {
      this.formauth = this.formBuilder.group
      ({
        User:
          [
            '',
            Validators.compose
              ([
                Validators.required,
              ])
          ],
        password:
          [
            '',
            Validators.compose
              ([
                Validators.required,
              ])
          ]
      });
  }


  /** 
   * Validar usuario para ingresar
  */
  goIngreso() {
    let loading = this.loadingCtrl.create({
      content: 'Procesando Informacion...'
    });
    loading.present();
    let logininfo = new LoginInterfaz(this.User, this.password);
    this.servicesProvider.postLogin(logininfo)
      .then
      (
        (data) => {
          console.log('data',data);
          localStorage.setItem('userName', this.User);
          this.activarPushNotifications();
          this.navCtrl.setRoot(MenuPage);
          loading.dismiss();
        }
      )
      .catch
      (
        (error) => {
          this.alerta("Se ha presentado un error, compruebe los datos y vuelva a intentar");
          loading.dismiss();
        }
      )
  }

  activarPushNotifications() {
    let alert = this.alertCtrl.create({
      title: '¿Desea recibir notificaciones sobre nuestros productos?',
      message: 'Recibiras alertas con descuentos y productos increíbles',
      buttons: [
        {
          text: 'NO',
          handler: () => {

          }
        },
        {
          text: 'SI',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }



  alerta(mensaje: string) {
    this.alertCtrl.create({
      message: mensaje,
      buttons: ['Ok']
    }).present();
  }


}
