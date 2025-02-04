import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AmadeusService } from '../../amadeus.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  searchHistory: any[] = []; // Almacena el historial de búsquedas

  constructor(private amadeusService: AmadeusService) {}

  ngOnInit() {
    this.searchHistory = this.amadeusService.getSearchHistory(); // Obtener el historial de búsquedas
  }
}
