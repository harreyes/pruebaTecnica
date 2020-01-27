import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';

//import pages
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ContactPage } from '../pages/contact/contact';
import { MenuPage } from '../pages/menu/menu';

//import provider
import { ServicesProvider } from '../providers/services/services';

/**
 * Import FIREBASE
 */
import { FCM } from '@ionic-native/fcm';
import { ProductsPage } from '../pages/products/products';
import { AddressesPage } from '../pages/addresses/addresses';

@NgModule({
  declarations: [
    MyApp,
    // LoginPage,
    // OurProdcutsPage,
    // ContactPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ContactPage,
    MenuPage,
    ProductsPage,
    AddressesPage,
    AddressesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServicesProvider,
    FCM,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
