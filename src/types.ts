/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Wine {
  id: string;
  name: string;
  bodega: string;
  type: 'Tinto' | 'Blanco' | 'Rosado' | 'Espumoso' | 'Corte Premium' | 'Pack Gourmet' | 'Aceite de Oliva' | 'Miel Artesana';
  year: number;
  category: 'Crianza' | 'Reserva' | 'Gran Reserva' | 'Genérico' | 'Selección Especial' | 'Madurado' | 'Virgen Extra' | 'Sierra Cantabria' | 'Monofloral';
  price: number;
  description: string;
  tastingNotes: string;
  alcohol: string;
  varietals: string[];
  pairings: string[];
  rating: number;
  image: string;
  stock: number;
}

export interface Bodega {
  id: string;
  name: string;
  location: string;
  foundedYear: number;
  description: string;
  style: string;
  experienceHighlight: string;
  image: string;
}

export interface Experience {
  id: string;
  title: string;
  bodegaId: string;
  price: number;
  duration: string;
  description: string;
  inclusions: string[];
  rating: number;
  image: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'sommelier';
  text: string;
  timestamp: string;
  featuredWineId?: string; // Optional recommended wine card attached to this message
}

export interface CartItem {
  wine: Wine;
  quantity: number;
}
