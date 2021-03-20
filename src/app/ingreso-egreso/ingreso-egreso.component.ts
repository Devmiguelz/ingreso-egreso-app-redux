import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tipoMonto, IngresoEgreso } from '../model/ingreso-egreso.model';
import { IngresoEgresoService } from './services/ingreso-egreso.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.reducers';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DeactivarLoadingAction } from '../redux/actions/ui.action';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  formIngresoEgreso: FormGroup;
  tipoDeMonto: tipoMonto = 'ingreso';
  cargando: boolean = false;
  loadingSubs: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder,
    public _ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loadingSubs = this.store.select('iu').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
    this.FormIngresoEgreso();
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  FormIngresoEgreso(): void {
    this.formIngresoEgreso = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(4)]],
      monto: [0, [Validators.required, Validators.minLength(3)]]
    });
  }

  CrearIngresoEgreso(): void {

    // Activar el loading a través del dispatch
    const accion = new ActivarLoadingAction();
    this.store.dispatch(accion);

    const ingresoEgreso: IngresoEgreso =
    {
      descripcion: this.formIngresoEgreso.controls["descripcion"].value,
      monto: this.formIngresoEgreso.controls["monto"].value,
      tipo: this.tipoDeMonto
    };
    
    this._ingresoEgresoService.CrearIngresoEgreso(ingresoEgreso)
    .then(result => {

      this.formIngresoEgreso.reset();

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: ingresoEgreso.tipo + ' Guardado exitosamente',
        showConfirmButton: true,
        timer: 2000
      });

      // Desactivar el loading a través del dispatch
      const accion = new DeactivarLoadingAction();
      this.store.dispatch(accion);

    })
    .catch(error => {

      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });

      // Desactivar el loading a través del dispatch
      const accion = new DeactivarLoadingAction();
      this.store.dispatch(accion);
    });
  }
}
