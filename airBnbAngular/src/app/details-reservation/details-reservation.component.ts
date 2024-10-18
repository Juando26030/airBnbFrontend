import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "../components/login/login.component";
import { MenuComponent } from "../components/menu/menu.component";
import { CardPropiedadComponent } from "../components/card-propiedad/card-propiedad.component";
import { PropiedadComponent } from "../components/propiedad/propiedad.component";
import { FooterComponent } from "../components/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, MenuComponent, CardPropiedadComponent, PropiedadComponent, FooterComponent],
  templateUrl: './details-reservation.component.html',
  styleUrls: ['./details-reservation.component.css']
})
export class DetailsReservationComponent {

}