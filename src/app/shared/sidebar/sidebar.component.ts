import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.reducers';
import { User } from '../../model/user.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/services/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombreUsuario: string;
  emailUsuario: string;
  loadDataUserSub: Subscription = new Subscription();

  constructor(public _authService: AuthService,
              public _ingresoEgresoService: IngresoEgresoService,
              private store:Store<AppState>) { }

  ngOnInit(): void { 
    this.loadDataUserSub = this.store.select('auth')
        .pipe(filter(auth => auth.user != null))
        .subscribe(auth => {
          this.nombreUsuario = auth.user.nombre;
          this.emailUsuario = auth.user.email;
        });
  }

  ngOnDestroy(): void {
    this.loadDataUserSub.unsubscribe();
  }

  LogOut(){
    this._authService.LogOut();
    this._ingresoEgresoService.CancelarSubcripciones();
  }

}
