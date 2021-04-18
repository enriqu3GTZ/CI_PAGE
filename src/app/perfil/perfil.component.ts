import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../sevicios/alertas.service';
import { OrganizacionService } from '../sevicios/organizacion.service';
import { StripeService } from '../sevicios/stripe.service';
import { Router } from '@angular/router';
import { OrganizationModel } from '../modelo/organizacion.model';
import { SocialMedia } from '../modelo/social-media.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  org: OrganizationModel = new OrganizationModel();
  orgEditar: OrganizationModel = new OrganizationModel();
  redes: SocialMedia[] = [];

  red_fb: any;
  red_insta: any;
  red_twitter: any;
  red_tiktok: any;
  red_web: any;

  stripeStatus:string = 'inactive';

  selectedFile:any;

  constructor(private alerta: AlertasService, private stripeSvc: StripeService,
    private orgServ: OrganizacionService, private route: Router, private spinner: NgxSpinnerService) {
    this.getInfo();
    this.stripeSvc.getStripeStatus()
      .then((txt) => {
        this.stripeStatus = txt;
        
      })
  }

  async onSelectFile(event:any){
    
    this.selectedFile = (event.target || event.srcElement).files[0];
    console.log(this.selectedFile)
    let {success, message} = await this.orgServ.UpdateOrganizationPhoto(this.selectedFile)
    console.log({success, message})
    if(success){
      this.alerta.fnSuccess("Imagen de usuario",message)
    }else{
      this.alerta.fnError("Imagen de usuario",message)
    }
  }

  getOrganizationImage(){
    return this.org ? `${environment.ip}organization/photo?organizationID=${this.org._id}` : 'assets/prueba.png'
  }

  editar = false;
  nombreOrg = ""
  ngOnInit(): void {
  }

  async getInfo() {
    let { success, obj, message } = await this.orgServ.getOrganizationInfo();
    // console.log(obj)
    if (success) {
      this.org = obj.organization;
      this.redes = this.org.socialMedia
      this.orgEditar = this.org
    } else {
      this.alerta.fnError("Error", message)
      this.route.navigate(['/inicio']);
    }
  }
  webInf() {
    this.red_fb = this.getSocialMedia('FACEBOOK')?.link;
    this.red_insta = this.getSocialMedia('INSTAGRAM')?.link;
    this.red_twitter = this.getSocialMedia('TWITTER')?.link;
    this.red_tiktok = this.getSocialMedia('TIKTOK')?.link;
    this.red_web = this.getSocialMedia('WEB')?.link;
  }

  getSocialMedia(type: string) {
    let list = this.redes.filter(obj => obj.type == type);
    return list.length == 1 ? list[0] : null
  }

  async goToStripe() {
    let s = await this.stripeSvc.goStripe();

    if (s.success) {
      window.open(s.obj.url, "_blank")
    } else {
      this.alerta.fnError("Error", s.message)
    }
  }

  btnEditar() {
    this.editar = true;
    this.webInf();
  }

  pushRedes(tipo: string, valor: String) {
    if (valor) {
      let nueva: SocialMedia = new SocialMedia({ type: tipo, link: valor })
      this.orgEditar.socialMedia.push(nueva)
    }

  }

  async guardar() {

    this.spinner.show()
    this.orgEditar.socialMedia = []
    this.pushRedes('FACEBOOK', this.red_fb)
    this.pushRedes('INSTAGRAM', this.red_insta)
    this.pushRedes('TIK TOK', this.red_tiktok)
    this.pushRedes('TWITTER', this.red_twitter)
    this.pushRedes('WEB', this.red_web)


    let response = await this.orgServ.UpdateOrganizationInfo(this.orgEditar)
    this.spinner.hide();
    if (response.success) {
      this.alerta.fnSuccess("Exito", "Tu informacion se ha actualizado");
      this.getInfo();
      this.editar = false;
    }
    else {
      this.alerta.fnError('Error', response.message)
    }


  }

  async salir() {

    let salir = await this.alerta.fnConfirmar("¿Deseas Salir?", "Tus cambios aun no han sido guardados", "Salir", "Seguir editando");

    if (salir) {
      this.editar = false
    }
  }
}
