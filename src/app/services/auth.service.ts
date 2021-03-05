import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsuarioRegister, UsuarioLogin } from '../model/models';
import Swal from 'sweetalert2'
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  InitAuthListener(){
    this.auth.authState.subscribe((dataUser: User) => {
      console.log(dataUser);      
    });
  }

  CrearUsuario(usuario: UsuarioRegister): void {
    this.auth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(result => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  LoginUsuario(usuario: UsuarioLogin) {
    this.auth.signInWithEmailAndPassword(usuario.email, usuario.password)
      .then(result => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  LogOut() {
    this.router.navigate(['/']);
    this.auth.signOut();
  }

}
