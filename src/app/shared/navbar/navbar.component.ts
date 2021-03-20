import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.reducers';
import { Subscription } from 'rxjs';
import { User } from '../../model/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombreUsuario: string;
  loadDataUserSub: Subscription = new Subscription();

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.loadDataUserSub = this.store.select('auth')
                              .pipe(filter(auth => auth.user != null))
                               .subscribe(auth => {
                                  this.nombreUsuario = auth.user.nombre;
                               });
  }

  ngOnDestroy(): void {
    this.loadDataUserSub.unsubscribe();
  }

}
