import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrganizationModel } from '../modelo/organizacion.model';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../modelo/response.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  OrganizationsRequest(obj: OrganizationModel): Promise<ResponseModel<any>> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.ip}organization`, { obj }).toPromise()
        .then((data: any) => {
          let respose = data as ResponseModel<OrganizationModel>;
          if (respose) {
            resolve(respose)
          } else {
            resolve(new ResponseModel<any>(false, 'Error de conexion', null, []))
          }
        })
        .catch(err => { resolve(new ResponseModel<any>(false, 'Error de conexion', null, [])) });
    })
  }

  getOrganizationRequest(idOrg: String): Promise<ResponseModel<OrganizationModel>> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.ip}organization/updateID/${idOrg}`).toPromise()
        .then((data: any) => {
          let respose = data as ResponseModel<OrganizationModel>;
          if (respose) {
            resolve(respose)
          } else {
            resolve(new ResponseModel<any>(false, 'Error de conexion', null, []))
          }
        })
        .catch(err => { resolve(new ResponseModel<any>(false, 'Error de conexion', null, [])) });
    });
  }

  UpdateOrganization(obj: OrganizationModel): Promise<ResponseModel<any>> {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.ip}organization/updateID`, { obj }).toPromise()
        .then((data: any) => {
          let respose = data as ResponseModel<OrganizationModel>;
          if (respose) {
            resolve(respose)
          } else {
            resolve(new ResponseModel<any>(false, 'Error de conexion', null, []))
          }
        })
        .catch(err => { resolve(new ResponseModel<any>(false, 'Error de conexion', null, [])) });
    })
  }

  getOrganizationInfo(): Promise<ResponseModel<any>> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.ip}organization/owner`, { headers: this.auth.getHeaders() }).toPromise()
        .then((data: any) => {
          let respose = data as ResponseModel<any>;
          if (respose) {
            resolve(respose)
          } else {
            resolve(new ResponseModel<any>(false, 'Error de conexion', null, []))
          }
        })
        .catch(err => { resolve(new ResponseModel<any>(false, 'Error de conexion', null, [])) });
    });
  }

  UpdateOrganizationInfo(obj: OrganizationModel): Promise<ResponseModel<any>> {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.ip}organization/owner`, { obj }, { headers: this.auth.getHeaders() }).toPromise()
        .then((data: any) => {
          let respose = data as ResponseModel<any>;
          if (respose) {
            resolve(respose)
          } else {
            resolve(new ResponseModel<any>(false, 'Error de conexion', null, []))
          }
        })
        .catch(err => { resolve(new ResponseModel<any>(false, 'Error de conexion', null, [])) });
    });
  }

  UpdateOrganizationPhoto(file: File): Promise<ResponseModel<any>> {
    return new Promise((resolve, reject) => {
      let formData:FormData = new FormData();
      formData.append("file",file,file.name);
      this.http.post(`${environment.ip}organization/photo`, formData, { headers: this.auth.getHeaders() }).toPromise()
        .then((data: any) => {
          let respose = data as ResponseModel<any>;
          
          
          if(respose){
            resolve(respose)
          }else{
            resolve(new ResponseModel<any>(false, 'Error de conexion', null, []))
          }
        })
        .catch(err => { resolve(new ResponseModel<any>(false, 'Error de conexion', null, [])) });
    });
  }
}