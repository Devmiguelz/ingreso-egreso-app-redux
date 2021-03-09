import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title: string = "Ingreso-Egreso-App";

  constructor(public _authService: AuthService) { }

  ngOnInit() : void {
    this._authService.InitAuthListener();
  }
}
