import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../sevicios/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AngularFireAuth,
        private authService: AuthService,
        private router: Router,
        private http: HttpClient
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            
            this.authService.validateSession()
                .then((valid: boolean) => {
                    console.log(valid)
                    this.authService.$validToken.next(valid);
                    observer.next(true);
                    observer.complete();
                    
                })

                // observer.next(true);
                //     observer.complete();
                    

        });
    }
}