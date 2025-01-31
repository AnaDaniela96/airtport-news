// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   imports: [],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {

// }

import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import TomSelect from 'tom-select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('selectElement', { static: false }) selectElement!: ElementRef;

  ngAfterViewInit() {
    new TomSelect(this.selectElement.nativeElement, {
      create: false, // Evita agregar opciones nuevas
      sortField: 'text', // Ordena por texto de la opción
      placeholder: 'Escribe la opción ...',
      maxItems: 1, // Cambia a `null` si quieres selección múltiple
      allowEmptyOption: true
    });
  }
}

