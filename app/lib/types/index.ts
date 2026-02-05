export interface Service {
  title: string;
  image: string;
  description?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
}

export interface Partner {
  id: string;
  name: string;
  logoGray: string;
  logoColor: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Tech {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  href?: string;
}

export interface FooterLink {
  href: string;
  label: string;
}

