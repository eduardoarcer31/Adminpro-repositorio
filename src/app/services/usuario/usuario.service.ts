import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/Config/config';

import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( public http: HttpClient) {
    console.log('Servicio de usuario listo');
   }

   login(usuario: Usuario, recuerdame: boolean = false) {
     const url = URL_SERVICIOS + '/login';
     return this.http.post(url, usuario)
            .map( (resp: any) => {
              localStorage.setItem('id', resp.id);
              localStorage.setItem('token', resp.token);
              localStorage.setItem('usuario', JSON.stringify(resp.usuario));
              return true;
            });
   }

   crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).map( (resp: any) => {
      Swal.fire({
        type: 'success',
        title: 'Usuario creado',
        text: usuario.email,
        footer: '<a href></a>'
      });
      return resp.usuario;
    });
   }

   cargarUsuarios( desde: number = 0) {
     const url = URL_SERVICIOS + '/usuario?desde=' + desde;

     return this.http.get( url );

   }
}
