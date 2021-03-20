import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(public _ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this._ingresoEgresoService.InitIngresoEgresoListener();
  }

}
