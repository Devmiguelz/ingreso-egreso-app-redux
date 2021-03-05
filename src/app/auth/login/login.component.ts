import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ExpRegularEmail } from '../../model/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public _authService: AuthService) { }

  ngOnInit(): void {
    this.FormLogin();
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
