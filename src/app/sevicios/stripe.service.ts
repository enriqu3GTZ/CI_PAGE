import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseModel } from '../modelo/response.model';
import { AuthService } from './auth.service';
import { AlertasService } from './alertas.service';


@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient, private auth: AuthService,private alertSerivice:AlertasService) { }

  goStripe():Promise<ResponseModel<any>> {
    return new Promise(resolve => {
      this.http.get(`${environment.ip}stripe/accountLink`, { headers: this.auth.getHeaders() }).toPromise()
        .then((r:any) => {
          let data = r as ResponseModel<any>
          console.log(data);
          if (data && data.success) {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch(err => { resolve(new ResponseModel<any>(false, 'Error de conexion', null, [])) });
    });
  }

  getStripeStatus(){
    return new Promise<string>(resolve => {
      this.http.get(`${environment.ip}stripe/status`, { headers: this.auth.getHeaders() }).toPromise()
        .then((r:any) => {
          console.log(r)
          if(r && r.success){
            resolve(r.obj);
          }else{
            resolve("inactive")
          }
          
        })
        .catch(err => { resolve("nactive") });
    });
  }

  getOxxoPaymentIntent(organization:string,user:string,packageID:string){
    return new Promise<string>((resolve,reject)=>{
      this.http.get(`${environment.ip}stripe/oxxo/payment?organizationID=${organization}&userID=${user}&packageID=${packageID}`).toPromise()
      .then((data:any)=>{
        let {success,obj:{client_secret}} = data;
        if(success){
          resolve(client_secret)
        }else{
          reject("Ups parece que algo a salido mal, porfavor intentalo mas tarde")
        }
      })
      .catch(()=>{
        reject("Ups parece que algo a salido mal, porfavor intentalo mas tarde")
      })
    })
    
  }
}
