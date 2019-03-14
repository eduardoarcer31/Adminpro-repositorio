import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';


declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor( public _usuarioService: UsuarioService) {  }

  forma: FormGroup;

  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo1].value;
      return {sonIguales: true };

      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };

  }


  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales( 'password', 'password2')});

    this.forma.setValue({
      nombre: 'Test',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

 /*  registrate() {
    this.router.navigate([ '/login' ]);
  } */

registraUsuario() {

 /*  if (this.forma.invalid) {
    return;
  } */

  if ( !this.forma.value.condiciones ) {

    Swal.fire({
      type: 'warning',
      title: 'Importante',
      text: 'Debe aceptar las condiciones!',
      footer: '<a href></a>'
    });
/*     swal ('Importante', 'Debe de aceptar las condiciones', 'warning');
 */ return;
  }

  const usuario = new Usuario(
    this.forma.value.nombre,
    this.forma.value.email,
    this.forma.value.password
  );

  this._usuarioService.crearUsuario( usuario ).subscribe(resp => {
    console.log( resp);
  });
  }

}
