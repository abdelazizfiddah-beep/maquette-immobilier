import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Type, Ville, Offre, OffreFilters } from '../../models/api.models';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-nos-offres',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './nos-offres.html',
  styleUrls: ['./nos-offres.scss']
})
export class NosOffresComponent implements OnInit {
  offres = signal<Offre[]>([]);
  types = signal<Type[]>([]);
  villes = signal<Ville[]>([]);
  loading = signal<boolean>(true);

  // Filtres actuels
  selectedType = '';
  selectedLocalisation = '';
  selectedBudget: number | null = null;
  selectedVente = false;
  selectedLocation = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFiltersData();
    this.loadOffresFromURL();
  }

  loadFiltersData(): void {
    this.apiService.getTypes().subscribe({
      next: (data) => this.types.set(data)
    });

    this.apiService.getVilles().subscribe({
      next: (data) => this.villes.set(data)
    });
  }

  loadOffresFromURL(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedType = params['type'] || '';
      this.selectedLocalisation = params['localisation'] || '';
      this.selectedBudget = params['budget'] ? +params['budget'] : null;
      this.selectedVente = params['vente'] === '1';
      this.selectedLocation = params['location'] === '1';

      this.loadOffres();
    });
  }

  loadOffres(): void {
    this.loading.set(true);

    const filters: OffreFilters = {};
    if (this.selectedType) filters.type = this.selectedType;
    if (this.selectedLocalisation) filters.localisation = this.selectedLocalisation;
    if (this.selectedBudget) filters.budget = this.selectedBudget;

    this.apiService.getOffres(filters).subscribe({
      next: (data) => {
        let filtered = data;

        if (this.selectedVente) {
          filtered = filtered.filter(o => o.isAVendre === 1);
        }
        if (this.selectedLocation) {
          filtered = filtered.filter(o => o.isALouer === 1);
        }

        this.offres.set(filtered);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.loading.set(false);
      }
    });
  }

  applyFilters(): void {
    const queryParams: any = {};

    if (this.selectedType) queryParams.type = this.selectedType;
    if (this.selectedLocalisation) queryParams.localisation = this.selectedLocalisation;
    if (this.selectedBudget) queryParams.budget = this.selectedBudget;
    if (this.selectedVente) queryParams.vente = '1';
    if (this.selectedLocation) queryParams.location = '1';

    this.router.navigate(['/nos-offres'], { queryParams });
  }

  resetFilters(): void {
    this.selectedType = '';
    this.selectedLocalisation = '';
    this.selectedBudget = null;
    this.selectedVente = false;
    this.selectedLocation = false;
    this.router.navigate(['/nos-offres']);
  }

  viewOffre(offre: Offre): void {
    alert(`Détails de ${offre.libelle}\n${offre.surface}m² - ${offre.ville}\n${offre.prix.toLocaleString('fr-FR')} €`);
  }
}
