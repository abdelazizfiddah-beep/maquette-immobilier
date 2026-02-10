import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Type,
  Ville,
  Offre,
  Article,
  ContactForm,
  ContactResponse,
  LoginRequest,
  LoginResponse,
  OffreFilters
} from '../models/api.models';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.baseUrl}/types.php`);
  }

  getVilles(): Observable<Ville[]> {
    return this.http.get<Ville[]>(`${this.baseUrl}/villes.php`);
  }

  getOffres(filters?: OffreFilters): Observable<Offre[]> {
    let params = new HttpParams();
    
    if (filters?.type) {
      params = params.set('type', filters.type);
    }
    if (filters?.localisation) {
      params = params.set('localisation', filters.localisation);
    }
    if (filters?.budget) {
      params = params.set('budget', filters.budget.toString());
    }

    return this.http.get<Offre[]>(`${this.baseUrl}/offres.php`, { params });
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/article.php?id=${id}`);
  }

  sendContact(contact: ContactForm): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.baseUrl}/contact.php`, contact);
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/jwt-login.php`, credentials);
  }
}
