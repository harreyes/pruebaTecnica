import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

@IonicPage()
@Component({
  selector: 'products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  infoProducts: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public servicesProvider: ServicesProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.cargarProductos();
  }

  /**
   * Trae la lista de produtos del servicio REST
   */
  cargarProductos() {
    let loading = this.loadingCtrl.create({
      content: 'Procesando Informacion...'
    });
    loading.present();
    let bodyInfo = "";
    this.servicesProvider.getProducts(bodyInfo)
      .then
      (
        (data) => {
          this.infoProducts = data;
          loading.dismiss();
        }
      )
      .catch
      (
        (error) => {
          this.alerta("Se ha presentado un error, no se han podido cargar los productos");
          loading.dismiss();
        }
      )
  }

  alerta(mensaje: string) {
    this.alertCtrl.create({
      message: mensaje,
      buttons: ['Ok']
    }).present();
  }


}
