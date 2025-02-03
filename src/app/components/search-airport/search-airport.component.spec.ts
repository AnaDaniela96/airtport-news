import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAirportComponent } from './search-airport.component';

describe('SearchAirportComponent', () => {
  let component: SearchAirportComponent;
  let fixture: ComponentFixture<SearchAirportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAirportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
