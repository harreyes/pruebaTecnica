import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';

//importar provider servicio
import { FCM, NotificationData } from "@ionic-native/fcm";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,  private fcm: FCM) {
    platform.ready().then(() => {
      this.registrarToken();
      this.refrescarToken();
      this.iniciarApp();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault(); 
      splashScreen.hide();
    });
  }

  iniciarApp(){
    if(localStorage.getItem('userName') == undefined || localStorage.getItem('userName') == null){
      this.rootPage = LoginPage;
    }else{
      this.rootPage = MenuPage;
    }
  }

  registrarToken() {
    //la aplicación esta lista, vamos a obtener y registrar el token en Firebase
    //y procesar las notificaciones
    this.fcm.getToken()
      .then((token: string) => {
        //aquí se debe enviar el token al back-end para tenerlo registrado y de esta forma poder enviar mensajes
        // a esta  aplicación
        //o también copiar el token para usarlo con Postman :D
        console.log("registrar token", token);
        localStorage.setItem('tokenFCM',token);
      })
      .catch(error => {
        //ocurrió un error al procesar el token
        console.error('er',error);
      });
  }

  refrescarToken() {
    /**
       * No suscribimos para obtener el nuevo token cuando se realice un refresh y poder seguir procesando las notificaciones
       * */
    this.fcm.onTokenRefresh().subscribe(
      (token: string) => {
        console.log("registrar token1", token);        
        localStorage.setItem('tokenFCM',token);
       },
      error => console.error('er1',error)
    );
  }

  lanzarNotificacion() {
    /**
       * cuando la configuración este lista, vamos a procesar los mensajes
       * */
    this.fcm.onNotification().subscribe(
      (data: NotificationData) => {

        if (data.wasTapped) {
          //ocurre cuando nuestra app está en segundo plano y hacemos tap en la notificación que se muestra en el dispositivo
        } else {
          //ocurre cuando nuestra aplicación se encuentra en primer plano,
          //puedes mostrar una alerta o un modal con los datos del mensaje
        }
      }, error => {
        console.error("Error in notification", error)
      }
    );
  }


}

