import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ContactForm } from '../../models/api.models';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactFormComponent {
  formData: ContactForm = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    message: ''
  };

  submitting = signal<boolean>(false);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    this.submitting.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    this.apiService.sendContact(this.formData).subscribe({
      next: (response) => {
        this.submitting.set(false);
        if (response.error) {
          this.errorMessage.set(response.message || 'Une erreur est survenue');
        } else {
          this.successMessage.set('Votre message a été envoyé avec succès !');
          this.resetForm();
        }
      },
      error: (error) => {
        this.submitting.set(false);
        this.errorMessage.set("Une erreur est survenue lors de l'envoi du message.");
        console.error('Erreur envoi contact:', error);
      }
    });
  }

  resetForm(): void {
    this.formData = {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      message: ''
    };
  }
}
