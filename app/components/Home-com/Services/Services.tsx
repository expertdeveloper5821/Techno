'use client';

import React from 'react';
import ServicesCarousel from './ServicesCarousel';
import type { Service } from '@/app/services';

interface ServicesProps {
  services?: Service[];
}

export default function Services({ services }: ServicesProps) {
  
  return <ServicesCarousel services={services} />;
}
