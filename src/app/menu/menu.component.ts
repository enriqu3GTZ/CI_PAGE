import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../sevicios/alertas.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../sevicios/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private alerta: AlertasService, private auth: AngularFireAuth, private spinner: NgxSpinnerService, private authService: AuthService) {
    this.sesionActiva = this.authService._validToken;
  }
  mensjError = "";
  correcto = true;
  sesionActiva: any;
  loginTxt: String = 'LOGIN'

  email: string = ''
  password: string = '';



  ngOnInit(): void {
  }

  async validarLogin() {
    this.spinner.show()
    try {
      console.log(this.email, this.password)
      let user = await this.auth.signInWithEmailAndPassword(this.email, this.password);
      let token: string = await (await this.auth.currentUser)?.getIdToken() as any;
      console.log(user, token)
      this.authService.saveToken(token);
      let { success, obj } = await this.authService.validateJWT()
      if (success) {
        this.authService.saveSession(obj);
        this.alerta.fnSuccess("Bienvenido", "");
        this.loginTxt = "Bienvenido"
        this.router.navigate(['/perfil']);
      } else {
        this.alerta.fnError("Error", "Usuario y/o contraseña incorrectas")
      }
      console.log(success)
    } catch (error) {
      this.alerta.fnError("Error", "Error en los datos")

    }
    this.spinner.hide()

  }

  cerrarSesion() {
    this.authService.signout()
      .then(() => {
        this.auth.signOut().then()
          .catch().finally(() => {
            this.authService.deleteSessionData()

            this.alerta.fnSimple();
            this.router.navigate(['/inicio']);
            this.loginTxt = "LOGIN"
          })
      })


  }

  miPerfil() {
    this.router.navigate(['/perfil']);
  }

}
