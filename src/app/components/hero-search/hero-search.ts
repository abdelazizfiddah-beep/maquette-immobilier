import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Type, Ville } from '../../models/api.models';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-search.html',
  styleUrls: ['./hero-search.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeroSearchComponent implements OnInit {
  types = signal<Type[]>([]);
  villes = signal<Ville[]>([]);
  searchMode = signal<'acheter' | 'louer' | 'estimer'>('acheter');

  selectedType = '';
  selectedVille = '';
  selectedBudget: number | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters(): void {
    this.apiService.getTypes().subscribe({
      next: (data) => this.types.set(data),
      error: (error) => console.error('Erreur types:', error)
    });

    this.apiService.getVilles().subscribe({
      next: (data) => this.villes.set(data),
      error: (error) => console.error('Erreur villes:', error)
    });
  }

  onSearch(): void {
    const queryParams: any = {};
    if (this.selectedType) queryParams.type = this.selectedType;
    if (this.selectedVille) queryParams.localisation = this.selectedVille;
    if (this.selectedBudget) queryParams.budget = this.selectedBudget;
    if (this.searchMode() === 'acheter') {
      queryParams.vente = '1';
    } else if (this.searchMode() === 'louer') {
      queryParams.location = '1';
    }
    this.router.navigate(['/nos-offres'], { queryParams });
  }

  onFilter(): void {
    this.onSearch();
  }
}
