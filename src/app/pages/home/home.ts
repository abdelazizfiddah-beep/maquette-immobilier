import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header';
import { HeroSearchComponent } from '../../components/hero-search/hero-search';
import { QuiSommesNousComponent } from '../../components/qui-sommes-nous/qui-sommes-nous';
import { BureauxCarouselComponent } from '../../components/bureaux-carousel/bureaux-carousel';
import { ContactFormComponent } from '../../components/contact-form/contact-form';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroSearchComponent,
    QuiSommesNousComponent,
    BureauxCarouselComponent,
    ContactFormComponent,
    FooterComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {}
