export interface Type {
  id: number;
  libelle: string;
}

export interface Ville {
  ville: string;
}

export interface Offre {
  id: number;
  libelle: string;
  photoUrl: string;
  surface: number;
  ville: string;
  prix: number;
  isAVendre: number;
  isALouer: number;
  id_type: number;
}

export interface Article {
  id: number;
  titre: string;
  photoUrl: string;
  contenu: string;
  libelle_lien: string;
  href_lien: string;
}

export interface ContactForm {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  error?: boolean;
  message?: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  error?: boolean;
  message?: string;
}

export interface OffreFilters {
  type?: string;
  localisation?: string;
  budget?: number;
}
