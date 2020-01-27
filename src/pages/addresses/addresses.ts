import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';
import { AppConfig } from '../../providers/appConfig';

@IonicPage()
@Component({
  selector: 'page-addresses',
  templateUrl: 'addresses.html',
})
export class AddressesPage {

  hasError: boolean = false;
  formAddresses: FormGroup;
  records: any[];
  saveButtonName: string = "Adicionar";
  updateRecord: boolean = false;

  addID: number;



  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private sqlite: SQLite,
    public servicesProvider: ServicesProvider, public loadingController: LoadingController, public alertCtrl: AlertController) {
    this.createFormAddresses();
  }

  ionViewDidLoad() {
    this.loadAddresses();
  }

  createFormAddresses() {
    this.formAddresses = this.formBuilder.group(
      {
        nameAddresses: [{ value: undefined, disabled: false }, [Validators.required]],
        Addresses: [{ value: undefined, disabled: false }, [Validators.required]]
      }
    );
  }

  loadAddresses() {
    this.records = [];
    this.sqlite.create({
      name: 'pruebaTecnica.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql(AppConfig.CreateTable.addressesTable, [])
        .then(() => {
          db.executeSql('SELECT * FROM AddressesTable', [])
            .then(data => {
              console.log('tablaCreada');
              if (data && data.rows && data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                  this.records.push(data.rows.item(i));
                }
              }
            })
            .catch(e => {
            });
        })
        .catch(e => {
          this.alerta("Error al crear la tabla");
        });
    }).catch(e => {
    });
  }

  save() {
    if (this.formAddresses.valid) {
      this.hasError = false;
      this.update();
    } else {
      this.hasError = true;
    }
  }

  actionUpdate(record: any) {
    this.formAddresses.controls.nameAddresses.setValue(record.add_name);
    this.formAddresses.controls.Addresses.setValue(record.add_addresses);
    this.addID = record.addID;
    this.saveButtonName = "Actualizar";
    this.updateRecord = true;
  }

  update() {
    this.sqlite.create({
      name: 'pruebaTecnica.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql(AppConfig.CreateTable.addressesTable, [])
        .then(() => {
          if (this.updateRecord) {
            let executeQuery = "UPDATE AddressesTable SET add_name =?, add_addresses =? WHERE addID = ?";
            db.executeSql(executeQuery, [this.formAddresses.controls.nameAddresses.value, this.formAddresses.controls.Addresses.value, this.addID])
              .then(() => {
                this.cleanData();
                this.loadAddresses();
                this.alerta("Dirección actualizada");
              })
              .catch(e => {
                this.alerta("Error al actualizar dirección");
              });
          } else {
            let executeQuery = "INSERT INTO AddressesTable (add_name, add_addresses) VALUES (?,?)";
            db.executeSql(executeQuery, [this.formAddresses.controls.nameAddresses.value, this.formAddresses.controls.Addresses.value])
              .then(() => {
                this.cleanData();
                this.loadAddresses();
                this.alerta("Dirección registrada");
              })
              .catch(e => {
                this.alerta("Error al insertar dirección");
              });
          }
        })
        .catch(e => {
          console.log('ERROR', e)
        });
    }).catch(e => {
    });
  }

  delete() {
    this.sqlite.create({
      name: 'pruebaTecnica.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM AddressesTable WHERE addID = ?', [this.addID])
        .then(data => {
          this.loadAddresses();
          this.cleanData();
        })
        .catch(e => {
          this.alerta("Error al eliminar la dirección");
        });

    }).catch(e => {
      this.alerta("Error al crear la base de datos");
    });
  }

  cleanData() {
    this.formAddresses.reset();
    this.saveButtonName = "Adicionar";
    this.updateRecord = false;
  }

  alerta(mensaje: string) {
    this.alertCtrl.create({
      message: mensaje,
      buttons: ['Ok']
    }).present();
  }


}
