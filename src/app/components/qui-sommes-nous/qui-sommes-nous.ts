import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qui-sommes-nous',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qui-sommes-nous.html',
  styleUrls: ['./qui-sommes-nous.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuiSommesNousComponent {
  officeImage = 'assets/images/our-office.png';

  scrollToOffres(): void {
    document.getElementById('nos-bureaux')?.scrollIntoView({ behavior: 'smooth' });
  }
}
