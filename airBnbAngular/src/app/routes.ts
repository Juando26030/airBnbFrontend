import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { DetailsReservationComponent } from "./details-reservation/details-reservation.component";
import { PropertySingleComponent } from "./property-single/property-single.component";

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'details',
        component: DetailsReservationComponent,
        title: 'Details Property Page'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login Page'
    },
    {
        path: 'property',
        component: PropertySingleComponent,
        title: 'Property Single'
    }
];

export default routeConfig;