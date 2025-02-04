import { Component } from '@angular/core';
import { AmadeusService } from '../../amadeus.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-airport',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './search-airport.component.html',
  styleUrl: './search-airport.component.css'
})
export class SearchAirportComponent  {
  searchQuery: string = ''; // Stores the search text
  suggestions: any[] = []; // Stores API suggestions
  selectedAirports: any[] = []; // Stores the selected airports

  constructor(private amadeusService: AmadeusService) {}

  ngOnInit() {
    this.amadeusService.initAuth(); // Initializes authentication
  }

  // Search for airports as the user types
  searchAirports() {
    if (this.searchQuery.length >= 3) {
      this.amadeusService.searchAirports(this.searchQuery).subscribe(response => {
        if (response && response.data) {
          this.suggestions = response.data; //Update suggestions
          this.amadeusService.saveSearch(this.searchQuery); // Save search
        } else {
          this.suggestions = []; // Clean if no results
        }
      });
    } else {
      this.suggestions = []; // Clean up if the text is too short
    }
  }

  // Clean up if the text is too short
  selectAirport(airport: any) {
    if (!this.selectedAirports.some(a => a.iataCode === airport.iataCode)) {
      this.selectedAirports.push(airport); // Add to shortlist
    }
    this.searchQuery = ''; // Clean up the input
    this.suggestions = []; // Clean up suggestoins
  }

  // Remove an airport from the list of selected airports
  removeAirport(airport: any) {
    this.selectedAirports = this.selectedAirports.filter(a => a.iataCode !== airport.iataCode);
  }
}
