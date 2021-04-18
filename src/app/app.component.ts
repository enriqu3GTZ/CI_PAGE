import { Component } from '@angular/core';
import { AuthService } from './sevicios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cImpacto';

  constructor(private authService:AuthService){
    // this.authService.validateJWT()
    //             .then((valid: boolean) => {
    //                 console.log(valid)
    //             })
  }
}
