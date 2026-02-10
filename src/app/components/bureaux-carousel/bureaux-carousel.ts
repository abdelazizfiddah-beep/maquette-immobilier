import { Component, OnInit, signal, computed, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Offre, OffreFilters } from '../../models/api.models';

interface DisplayOffre {
  libelle: string;
  surface: number;
  ville: string;
  image: string;
}

@Component({
  selector: 'app-bureaux-carousel',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './bureaux-carousel.html',
  styleUrls: ['./bureaux-carousel.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BureauxCarouselComponent implements OnInit {
  offres = signal<Offre[]>([]);
  loading = signal<boolean>(true);

  private defaultOffres: DisplayOffre[] = [
    { libelle: "L'ENVOL BÂT A", surface: 784, ville: 'SAINT-PRIEST', image: 'assets/images/bat-a.png' },
    { libelle: 'EVEREST 3 BAT A', surface: 4065, ville: 'GENAS', image: 'assets/images/everest-bat-a.png' },
    { libelle: 'MONT BLANC BÂT B', surface: 130, ville: 'LYON', image: 'assets/images/mont-blanc-bat-b.png' }
  ];

  displayOffres = computed<DisplayOffre[]>(() => {
    const apiOffres = this.offres();
    if (apiOffres.length > 0) {
      return apiOffres.map((o, i) => ({
        libelle: o.libelle,
        surface: o.surface,
        ville: o.ville,
        image: o.photoUrl ? 'assets/images/' + o.photoUrl : this.defaultOffres[i % this.defaultOffres.length].image
      }));
    }
    return this.defaultOffres;
  });

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(filters?: OffreFilters): void {
    this.loading.set(true);
    this.apiService.getOffres(filters).subscribe({
      next: (data) => {
        this.offres.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement offres:', error);
        this.loading.set(false);
      }
    });
  }

  showAllOffres(): void {
    this.loadOffres();
  }
}
