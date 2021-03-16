import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ExpRegularEmail } from '../../model/models';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  formRegister: FormGroup;
  cargando: boolean = false;
  subcripcion: Subscription;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    public _authService: AuthService) { }

  ngOnInit(): void {
    this.FormRegister();
    this.subcripcion = this.store.select('iu').subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy() : void{
    this.subcripcion.unsubscribe();
  }

  FormRegister(): void {
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(ExpRegularEmail)]],
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  IsValidControl(control: string, formulario: FormGroup) {
    return formulario.get(control).invalid && (formulario.get(control).dirty || formulario.get(control).touched);
  }

  RegistarUsuario(): void {
    this._authService.CrearUsuario(this.formRegister.value);
    this.formRegister.reset();
  }
}
