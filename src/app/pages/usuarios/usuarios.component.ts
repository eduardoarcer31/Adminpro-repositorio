import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  desde: number = 0;
  totalRegistros: number = 0;

  // tslint:disable-next-line:variable-name
  constructor( public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }


  cargarUsuarios() {

    this._usuarioService.cargarUsuarios( this.desde ).subscribe( (resp: any) => {

      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;

    });

  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

}
