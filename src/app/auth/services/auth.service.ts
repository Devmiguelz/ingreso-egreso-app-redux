import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioRegister, UsuarioLogin } from '../../model/models';
import Swal from 'sweetalert2'
import { User } from '../../model/user.model';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
// AngularFire
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, 
              private afStore: AngularFirestore,
              private router: Router) { }

  InitAuthListener(){
    this.afAuth.authState.subscribe(dataUser => {
      console.log(dataUser);      
    });
  }

  CrearUsuario(usuario: UsuarioRegister): void {
    this.afAuth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(result => {

        const usuarioFire: User = {
          uid: result.user.uid,
          nombre: usuario.nombre,
          email: result.user.email
        }

        this.afStore.doc(`${usuarioFire.uid}/usuario`)
        .set(usuarioFire)
        .then(() => { 
          this.router.navigate(['/']);          
        });
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
    this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.password)
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
    this.router.navigate(['/login']);
    this.afAuth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(fbUser => {

        if(fbUser == null){
          this.router.navigate(['/login']);
        } 

        return fbUser != null
      })
    );
  }

}
