import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmadeusService {
  private apiUrl = 'https://test.api.amadeus.com/v1';
  private clientId = 'GKGSyGePOZdVB8Q7k4JaW9e2x0YL1U3Y'; // 🔹 Reemplaza con tu API Key
  private clientSecret = '0zVzM9mln2EBN9R7'; // 🔹 Reemplaza con tu API Secret
  private accessToken: string = '';

  constructor(private http: HttpClient) { }

  // 1️⃣ Obtener el Token de Autenticación
  private authenticate(): Observable<any> {
    const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    return this.http.post(url, body.toString(), { headers });
  }

  // 2️⃣ Guardar el Token
  public initAuth(): void {
    this.authenticate().subscribe(response => {
      this.accessToken = response.access_token;
    });
  }

  // 3️⃣ Buscar Aeropuertos por Nombre o Código
  public searchAirports(keyword: string): Observable<any> {
    const url = `${this.apiUrl}/reference-data/locations?subType=AIRPORT&keyword=${keyword}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get(url, { headers });
  }
}
