import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.reducers';
import { IngresoEgreso } from '../../model/ingreso-egreso.model';
import { IngresoEgresoState } from '../../redux/state/ingreso-egreso.state';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  ItemIngresoEgresoSub: Subscription = new Subscription();

  constructor(private store: Store<AppState>,
              public _ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ItemIngresoEgresoSub = this.store.select('ingresoEgreso').subscribe((ingresoEgreso: IngresoEgresoState) => {
      this.items = ingresoEgreso.items;
    });
  }

  ngOnDestroy(): void {
    this.ItemIngresoEgresoSub.unsubscribe();
  }

  BorrarIngresoEgreso(uidItem: string){
    this._ingresoEgresoService.BorrarIngresoEgreso(uidItem); 
  }

}
