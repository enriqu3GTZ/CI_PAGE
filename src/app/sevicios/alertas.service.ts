import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

  fnSuccess(title: String, msg: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: msg,
      timer: 2500,
      showConfirmButton: false,
    });
  }

  fnSimple() {
    Swal.fire('Sesion Terminada');
  }

  fnError(title: string, msg: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: msg,
      timer: 2500,
      showConfirmButton: false,
    });
  }

  fnWarning(title: string, msg: string) {
    Swal.fire(
      title,
      msg,
      'warning'
    )
  }


  fnConfirmar(title: string, msg: string, confirmTxt: string, cancelTxt: string): Promise<boolean> {
    return new Promise(resolve=>{
      Swal.fire({
        title: title,
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#AEE25A',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmTxt,
        cancelButtonText: cancelTxt
      }).then((result) => {
        if (result.isConfirmed) {
         resolve(true);
        }
        else resolve(false)
      })
    })
    
  }

}
