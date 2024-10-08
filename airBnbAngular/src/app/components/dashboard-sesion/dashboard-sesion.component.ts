import { Component } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {MenuComponent} from "../menu/menu.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard-sesion',
  standalone: true,
  imports: [
    LoginComponent,
    MenuComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-sesion.component.html',
  styleUrl: './dashboard-sesion.component.css'
})
export class DashboardSesionComponent {

}
