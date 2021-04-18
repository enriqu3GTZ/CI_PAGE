import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FooterComponent } from './footer/footer.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFireModule } from '@angular/fire';
import { OxxoComponent } from './oxxo/oxxo.component';

const config = {
  apiKey: "AIzaSyAmiCiPuP15C3ahPPDRDq84JczW8JmK6mc",
  authDomain: "campamentoimpacto-a4217.firebaseapp.com",
  projectId: "campamentoimpacto-a4217",
  storageBucket: "campamentoimpacto-a4217.appspot.com",
  messagingSenderId: "151106356642",
  appId: "1:151106356642:web:f75e767a51d1e51c549efb",
  measurementId: "G-NWJRDN0ERY"
};


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    NosotrosComponent,
    ContactoComponent,
    FooterComponent,
    PerfilComponent,
    OxxoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    AngularFireModule.initializeApp(config),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
