import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ExpRegularEmail } from '../../model/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public _authService: AuthService) { }

  ngOnInit(): void {
    this.FormRegister();
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
