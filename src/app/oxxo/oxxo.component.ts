import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertasService } from '../sevicios/alertas.service';
import { StripeService } from '../sevicios/stripe.service';

declare var Stripe: any;

@Component({
  selector: 'app-oxxo',
  templateUrl: './oxxo.component.html',
  styleUrls: ['./oxxo.component.css']
})
export class OxxoComponent implements OnInit {

  packageID: string = '';
  userID: string = '';
  organizationID: string = '';


  name:string = '';
  email:string = '';

  SUCCESS = 1
  FAIL = 2
  FORM = 3

  status = this.FORM

  loading:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private stripeService: StripeService,
    private alertSerivice: AlertasService
  ) { }

  ngOnInit(): void {
    let { packageID,
      userID,
      organizationID } = this.route.snapshot.queryParams;

    this.packageID = packageID;
    this.userID = userID;
    this.organizationID = organizationID;
  }

  continue() {
    if(this.loading){
      return;
    }
    this.loading = true;
    if(!this.name){
      this.alertSerivice.fnWarning("Campo faltante","Llena el campo nombre")
      return;
    }else if(!this.email){
      this.alertSerivice.fnWarning("Campo faltante","Llena el campo correo")
      return;
    }else if(new FormControl(this.email,[Validators.email]).invalid){
      this.alertSerivice.fnWarning("Campo faltante","El correo es invalido")
      return;
    }
    var stripe = Stripe('pk_test_51IQ3WHE2TZJZWjxwaXnKqU06Jroca1HEr35j66ChVch7J32WllMStMZa7ljj92PG8DBws3R6ZTU2ZFbRXgIP9DEv002TQYocv7');
    this.stripeService.getOxxoPaymentIntent(this.organizationID, this.userID, this.packageID)
      .then((client_secret) => {
        stripe.confirmOxxoPayment(
          client_secret,
          {
            payment_method: {
              billing_details: {
                name: this.name,
                email: this.email,
              },
            },
          })
          .then((result:any) => {
            if (result.error) {
              this.status = this.FAIL;
              this.alertSerivice.fnError("Houston tenemos un problema",result.error.message)
            }else{
              this.status = this.SUCCESS;
            }
          });
      })
      .catch((errMessage) => {
        this.status = this.FAIL;
        this.alertSerivice.fnError("Ups intentalo mas tarde", errMessage)
      })
  }

}
