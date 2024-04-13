import { SubBreed } from './sub_breed';

export interface Dog {
    id: number;
    description: string;
    imageSrc: string;
    subBreed: SubBreed;
  }