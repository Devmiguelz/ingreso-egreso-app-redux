import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioRegister, UsuarioLogin } from '../../model/models';
import Swal from 'sweetalert2'
import { User } from '../../model/user.model';
import { map } from "rxjs/operators";
import { Observable, Subscription } from 'rxjs';
// AngularFire
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.reducers';
import { DeactivarLoadingAction, ActivarLoadingAction } from '../../redux/actions/ui.action';
import { SetUserAction } from 'src/app/redux/actions/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubcripcion: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private store: Store<AppState>) { }

  InitAuthListener(): void {
    this.afAuth.authState.subscribe(dataUser => {
      if (dataUser) {
        this.userSubcripcion = this.afStore.doc(`${dataUser.uid}/usuario/`)
          .valueChanges().subscribe((usuarioStore: User) => {
            const accion = new SetUserAction(usuarioStore);
            this.store.dispatch(accion);
          });
      }else {
        this.userSubcripcion.unsubscribe();
      }
    });
  }

  CrearUsuario(usuario: UsuarioRegister): void {

    // Activar el loading a través del dispatch
    const accion = new ActivarLoadingAction();
    this.store.dispatch(accion);

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
            // Desactivar el loading a través del dispatch
            const accion = new DeactivarLoadingAction();
            this.store.dispatch(accion);

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

    // Activar el loading a través del dispatch
    const accion = new ActivarLoadingAction();
    this.store.dispatch(accion);

    this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.password)
      .then(result => {

        // Desactivar el loading a través del dispatch
        const accion = new DeactivarLoadingAction();
        this.store.dispatch(accion);
        
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

        if (fbUser == null) {
          this.router.navigate(['/login']);
        }

        return fbUser != null
      })
    );
  }

}
