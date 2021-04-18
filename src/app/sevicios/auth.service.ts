import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseModel } from '../modelo/response.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN = 'token';
  SESSION = 'session';

  $validToken:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _validToken:Observable<boolean> = this.$validToken.asObservable();
  // validToken:boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  saveToken(jwt:string) {
    localStorage.setItem(this.TOKEN, jwt);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN) || null;
  }

  deleteSessionData() {
    this.$validToken.next(false);
    localStorage.removeItem(this.SESSION)
    localStorage.removeItem(this.TOKEN);
  }

  saveSession(session:string) {
    localStorage.setItem(this.SESSION, session);
  }

  getSession() {
    return localStorage.getItem(this.SESSION) || null;
  }

  validateJWT():Promise<ResponseModel<string>> {
    return new Promise(resolve => {
      
      let token = this.getToken();
      if(!token){
        this.$validToken.next(false)
        resolve({success:false,obj:null} as any);
        return 
      }
      this.http.get(`${environment.ip}auth/web/jwt`, { headers: this.getHeaders(true) }).toPromise()
        .then((r:any) => {
          let data = r as ResponseModel<any>
          if (data && data.success) {
            this.$validToken.next(true)
            resolve(data);
          } else {
            this.deleteSessionData();
            resolve({success:false,obj:null} as any);
          }
        })
        .catch(err => {
          this.deleteSessionData();
          resolve({success:false,obj:null} as any)
        })
    });
  }


  validateSession():Promise<boolean> {
    return new Promise(resolve => {
      
      let token = this.getSession();
      if(!token){
        this.$validToken.next(false)
        resolve(false);
        return 
      }
      this.http.get(`${environment.ip}auth/user/session`, { headers: this.getHeaders(false) }).toPromise()
        .then((r:any) => {
          let data = r as ResponseModel<any>
          if (data && data.success) {
            this.$validToken.next(true)
            resolve(true);
          } else {
            this.deleteSessionData();
            resolve(false);
          }
        })
        .catch(err => {
          this.deleteSessionData();
          resolve(false)
        })
    });
  }

  getHeaders(validateJWT:boolean = false) {
    let headers:HttpHeaders;
    if(validateJWT){
      let token:string = this.getToken() as any;
      headers = new HttpHeaders(
        token ? { auth: token } : {}
      );
    }else{
      let session:string = this.getSession() as any;
      headers = new HttpHeaders(
        session ? { session: session } : {}
      );
    }
    
    return headers;
  }

  signout(){
    return new Promise<void>(resolve=>{
      this.http.get(`${environment.ip}auth/signout`, { headers: this.getHeaders(false) }).toPromise()
      .then(()=>{})
      .catch(()=>{})
      .finally(()=>{
        resolve();
      })
    })
  }

}
