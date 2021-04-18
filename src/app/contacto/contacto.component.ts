import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrganizationModel } from '../modelo/organizacion.model';
import { SocialMedia } from '../modelo/social-media.model';
import { AlertasService } from '../sevicios/alertas.service';
import { OrganizacionService } from '../sevicios/organizacion.service';
import { Router} from '@angular/router';



@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  private org: OrganizationModel = new OrganizationModel();

  public CountryISO = CountryISO
  public SearchCountryField = SearchCountryField
  public editar = false;

  form = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    descripcion: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    redSFace: new FormControl(null),
    redSTwit: new FormControl(null),
    redSInst: new FormControl(null),
    redSTik: new FormControl(null),
    redSPag: new FormControl(null)

  });

  constructor(private orgServ: OrganizacionService, private alerta: AlertasService,
    private spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let { updateID } = this.route.snapshot.queryParams

    if (updateID) {
      this.org.updateID = updateID
      this.getUpdateIDOrganization(updateID)
      this.editar = true;
    }
  }

  async getUpdateIDOrganization(updateID: string) {
    this.spinner.show();
    let response = await this.orgServ.getOrganizationRequest(updateID)
    this.spinner.hide();
    if (!response.success) {
      this.alerta.fnError('Error de recuperacion', response.message)
      this.router.navigate(['/inicio']);
    }
    else {
      

      let values = {
        firstName: response.obj.firstname || null,
        lastName: response.obj.lastname || null,
        name: response.obj.name || null,
        email: response.obj.email || null,
        descripcion: response.obj.description || null,
        phone: response.obj.phone || null,
        redSFace: this.getSocialMediaLink('FACEBOOK',response.obj.socialMedia),
        redSTwit: this.getSocialMediaLink('TWITTER',response.obj.socialMedia),
        redSInst: this.getSocialMediaLink('INSTAGRAM',response.obj.socialMedia),
        redSTik: this.getSocialMediaLink('TIKTOK',response.obj.socialMedia),
        redSPag: this.getSocialMediaLink('WEB',response.obj.socialMedia),
      };
      this.form.setValue(values)
    }
  }

  getSocialMediaLink(type:string,socialMedia:SocialMedia[]){
    let sm = socialMedia.filter(obj=>obj.type == type);
    if(sm.length > 0 ){
      return sm[0].link
    }
    return null
  }

  async enviarSolicitud() {

    if (!this.confirmarSocial()) {

      this.alerta.fnError("UPS", "introduce al menos una red social")
      return;
    }

    this.org.firstname = this.form.get('firstName')?.value;
    this.org.lastname = this.form.get('lastName')?.value;
    this.org.name = this.form.get('name')?.value;
    this.org.email = this.form.get('email')?.value;
    this.org.description = this.form.get('descripcion')?.value;
    this.org.phone = this.form.get('phone')?.value.number;

    this.spinner.show()

    let successApi,messageApi
    if(this.editar){
      let { success, message } = await this.orgServ.UpdateOrganization(this.org)
      successApi = success;
      messageApi = message;
    }else{
      let { success, message } = await this.orgServ.OrganizationsRequest(this.org)
      successApi = success;
      messageApi = message;
    }
    
    this.spinner.hide();

    if (successApi) {
      this.alerta.fnSuccess("Exito", messageApi)
      this.form.reset();
    } else {
      this.alerta.fnError("Error", messageApi);
      this.org.socialMedia = [];
    }
    console.log(this.form.get('phone')?.value.number)

  }

  confirmarSocial() {
    if (this.form.get('redSFace')?.value == null && this.form.get('redSTwit')?.value == null &&
      this.form.get('redSInst')?.value == null && this.form.get('redSTik')?.value == null && this.form.get('redSPag')?.value == null) {

      return false
    }
    else {

      if (this.form.get('redSFace')?.value != null) {
        this.org.socialMedia.push(new SocialMedia({ type: "FACEBOOK", link: this.form.get('redSFace')?.value }))
      }
      if (this.form.get('redSTwit')?.value != null) {
        this.org.socialMedia.push(new SocialMedia({ type: "TWITTER", link: this.form.get('redSTwit')?.value }))
      }
      if (this.form.get('redSInst')?.value != null) {
        this.org.socialMedia.push(new SocialMedia({ type: "INSTAGRAM", link: this.form.get('redSInst')?.value }))
      }
      if (this.form.get('redSTik')?.value != null) {
        this.org.socialMedia.push(new SocialMedia({ type: "TIKTOK", link: this.form.get('redSTik')?.value }))
      }
      if (this.form.get('redSPag')?.value != null) {
        this.org.socialMedia.push(new SocialMedia({ type: "WEB", link: this.form.get('redSPag')?.value }))
      }
    }
    return true;
  }


}
