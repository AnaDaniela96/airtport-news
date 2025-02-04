import { Component } from '@angular/core';
import { SearchAirportComponent } from '../../components/search-airport/search-airport.component';
import { HeaderComponent } from "../../components/header/header.component";


@Component({
  selector: 'app-home',
    imports: [SearchAirportComponent, HeaderComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
}

