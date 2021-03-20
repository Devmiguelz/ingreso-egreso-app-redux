import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from 'src/app/model/ingreso-egreso.model';
import { AuthService } from '../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.reducers';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SetItemAction, UnSetItemAction } from 'src/app/redux/actions/ingreso-egreso.action';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

   initSubcripcion: Subscription = new Subscription();
   ingresoEgresoSubcripcion: Subscription = new Subscription();

  constructor(private afStore: AngularFirestore,
    public _authService: AuthService,
    private store: Store<AppState>) { }

  InitIngresoEgresoListener(): void {
    this.initSubcripcion = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      ).subscribe(auth => {
        this.IngresoEgresoItems(auth.user.uid);
    });    
  }

  private IngresoEgresoItems(uid: string) {
    this.ingresoEgresoSubcripcion = this.afStore.collection(`${uid}/ingresos-egresos/items`)
        .snapshotChanges()
        .pipe(
          map(docData => {
            return docData.map( doc => {
              let data = doc.payload.doc.data() as IngresoEgreso;
              return {
                uid: doc.payload.doc.id,
                ...data
              };
            });
          })
        )
        .subscribe((coleccion: IngresoEgreso[])=> {
          this.store.dispatch(new SetItemAction(coleccion));               
        });
  }

  CancelarSubcripciones(): void {
    this.initSubcripcion.unsubscribe();
    this.ingresoEgresoSubcripcion.unsubscribe();
    this.store.dispatch(new UnSetItemAction());
  }

  CrearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    const usuarioFire = this._authService.getUsuarioAuth();

    return this.afStore.doc(`${usuarioFire.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  BorrarIngresoEgreso(uidItem: string){

    const usuarioFire = this._authService.getUsuarioAuth();

    return this.afStore.doc(`${usuarioFire.uid}/ingresos-egresos/items/${uidItem}`)
        .delete();
  }
}
