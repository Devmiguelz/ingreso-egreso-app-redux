import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoState, IngresoEgresoAppState } from '../../redux/state/ingreso-egreso.state';
import { IngresoEgreso } from '../../model/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  TotalIngresos: number;
  TotalEgresos: number;

  NroIngresos: number;
  NroEgresos: number;
  
  estadisticaSub: Subscription = new Subscription();

  // Doughnut
  public doughnutChartLabels: string[] = ['INGRESOS', 'EGRESOS'];
  public doughnutChartData: number[];
  
  constructor(private store: Store<IngresoEgresoAppState>) { }

  ngOnInit(): void {
    this.estadisticaSub = this.store.select('ingresoEgreso')
                              .subscribe((estado: IngresoEgresoState)  =>{
                                this.ContarIngresoEgreso(estado.items);
                              });
  }

  ContarIngresoEgreso(items: IngresoEgreso[]): void {
    this.TotalIngresos = 0;
    this.TotalEgresos = 0;

    this.NroIngresos = 0;
    this.NroEgresos = 0;

    items.forEach(item => {
      if(item.tipo === 'ingreso') {
        this.TotalIngresos += item.monto;
        this.NroIngresos++;
      } else {
        this.TotalEgresos += item.monto;
        this.NroEgresos++;
      }
    });
    this.doughnutChartData = [this.TotalIngresos, this.TotalEgresos];
  }

  ngOnDestroy(): void {
    this.estadisticaSub.unsubscribe();
  }
}
