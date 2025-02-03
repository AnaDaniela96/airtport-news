import { Routes } from '@angular/router';
import { AirportDetailsComponent } from './pages/airport-details/airport-details.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'search-airport', component: HomeComponent },
    { path: 'airport/:iataCode', component: AirportDetailsComponent }
];
