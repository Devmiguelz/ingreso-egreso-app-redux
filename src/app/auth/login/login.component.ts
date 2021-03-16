import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ExpRegularEmail } from '../../model/models';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin: FormGroup;
  cargando: boolean = false;
  subcripcion: Subscription;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    public _authService: AuthService) { }

  ngOnInit(): void {
    this.FormLogin();
    this.subcripcion = this.store.select('iu').subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy() : void{
    this.subcripcion.unsubscribe();
  }

  FormLogin(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(ExpRegularEmail)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ValidarLogin(): void {
    this._authService.LoginUsuario(this.formLogin.value);
  }
}
