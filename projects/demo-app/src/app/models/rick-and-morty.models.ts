/**
 * Modelos de dominio para la Rick and Morty API.
 * @see https://rickandmortyapi.com/documentation
 */

/** Personaje de la serie */
export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: LocationRef;
  location: LocationRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

/** Episodio de la serie */
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

/** Ubicación del universo de la serie */
export interface RMLocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

/** Referencia a ubicación usada en Character */
export interface LocationRef {
  name: string;
  url: string;
}

/** Respuesta paginada de la API */
export interface ApiResponse<T> {
  info: PageInfo;
  results: T[];
}

/** Metadata de paginación */
export interface PageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

/** Recursos disponibles en el Explorer */
export type ResourceType = 'character' | 'episode' | 'location';

/** Filtros de status disponibles */
export type StatusFilter = 'alive' | 'dead' | 'unknown' | '';
