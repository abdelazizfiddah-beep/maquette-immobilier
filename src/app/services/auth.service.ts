import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';
  isAuthenticated = signal<boolean>(false);

  constructor(private apiService: ApiService) {
    this.checkAuth();
  }

  private checkAuth(): void {
    const token = this.getToken();
    this.isAuthenticated.set(!!token);
  }

  login(credentials: LoginRequest): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apiService.login(credentials).subscribe({
        next: (response) => {
          if (response.token) {
            this.setToken(response.token);
            this.isAuthenticated.set(true);
            resolve(true);
          } else {
            reject(response.message || 'Erreur de connexion');
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}
