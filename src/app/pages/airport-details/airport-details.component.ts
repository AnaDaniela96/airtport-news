import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmadeusService } from '../../amadeus.service';



@Component({
  selector: 'app-airport-details',
  imports: [ CommonModule ],
  templateUrl: './airport-details.component.html',
  styleUrl: './airport-details.component.css'
})
export class AirportDetailsComponent implements OnInit {
  airport: any = null ;

  constructor (private route: ActivatedRoute, private amadeusService: AmadeusService ) {}

  ngOnInit() {
    const iataCode = this.route.snapshot.paramMap.get('iataCode');
    if ( iataCode ) {
      this.amadeusService.getAirportByIata(iataCode).subscribe( data => {
        this.airport = data;
      })
    }
  }
}
