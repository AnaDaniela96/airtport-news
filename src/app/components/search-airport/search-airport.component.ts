import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import TomSelect from 'tom-select';
import { AmadeusService } from '../../amadeus.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-airport',
  imports: [CommonModule],
  templateUrl: './search-airport.component.html',
  styleUrl: './search-airport.component.css'
})
export class SearchAirportComponent implements AfterViewInit {
  @ViewChild('airportSelect', { static: false }) selectRef!: ElementRef;
  airports: any[] = [];
  tomSelectInstance!: TomSelect;

  constructor(private amadeusService: AmadeusService) { }

  ngOnInit() {
    this.amadeusService.initAuth();
  }

  ngAfterViewInit() {
    this.initTomSelect();
  }

  initTomSelect() {
    this.tomSelectInstance = new TomSelect(this.selectRef.nativeElement, {
      valueField: 'iataCode',
      labelField: 'name',
      searchField: ['name', 'iataCode'],
      maxItems: 1,
      create: false
    });
  }

  searchAirport(event: any) {
    const keyword = event.target.value;
    if (keyword.length >= 3) {
      this.amadeusService.searchAirports(keyword).subscribe(data => {
        this.airports = data.data;
        this.updateTomSelect();
      });
    }
  }

  updateTomSelect() {
    if (this.tomSelectInstance) {
      this.tomSelectInstance.clearOptions();
      this.airports.forEach(airport => {
        this.tomSelectInstance.addOption({
          value: airport.iataCode,
          text: `${airport.name} (${airport.iataCode}) - ${airport.address.cityName}`
        });
      });
    }
  }
}
