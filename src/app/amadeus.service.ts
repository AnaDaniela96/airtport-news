import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AmadeusService {
  private apiUrl = 'https://test.api.amadeus.com/v1';
  private clientId = 'GKGSyGePOZdVB8Q7k4JaW9e2x0YL1U3Y'; // 🔹 Replace with API Key
  private clientSecret = '0zVzM9mln2EBN9R7'; // 🔹 Replace with my API Secret
  private accessToken: string = '';

  constructor(private http: HttpClient) {
    this.initAuth(); // Initializes authentication when loading the service
  }

  // Obtain Authentication Token
  private authenticate(): Observable<any> {
    const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    return this.http.post(url, body.toString(), { headers });
  }

  // Save Token
  public initAuth(): void {
    this.authenticate().subscribe(response => {
      this.accessToken = response.access_token;
      //console.log('Token obtenido:', this.accessToken);
    });
  }

  // Search Airports by Name or Code
  public searchAirports(keyword: string): Observable<any> {
    if (!this.accessToken) {
      console.error('Token no disponible. Se debe autenticar primero.');
      return of(null);
    }

    const url = `${this.apiUrl}/reference-data/locations?subType=AIRPORT&keyword=${keyword}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get(url, { headers }).pipe(
      catchError(error => {
        console.error('Error en la petición:', error);
        return of(null); // Error handling
      })
    );
  }

  // Save the search in the localStorage
  public saveSearch(searchQuery: string): void {
    let searches = JSON.parse(localStorage.getItem('searches') || '[]');
    searches.push({ query: searchQuery, timestamp: new Date() });
    localStorage.setItem('searches', JSON.stringify(searches));
  }

  // Obtain search history
  public getSearchHistory(): any[] {
    return JSON.parse(localStorage.getItem('searches') || '[]');
  }

  getAirportByIata(iataCode: string): Observable<any> {
    if (!this.accessToken) {
      console.error('Token no disponible. Se debe autenticar primero.');
      return new Observable(observer => {
        observer.error('No hay token disponible.');
      });
    }

    const url = `${this.apiUrl}/reference-data/locations?keyword=${iataCode}&subType=AIRPORT`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get<any>(url, { headers });
  }

}