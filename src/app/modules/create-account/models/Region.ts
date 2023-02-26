import { City } from './City';

export interface Region {
  id: number;
  name: string;
  cities: Array<City>;
}
