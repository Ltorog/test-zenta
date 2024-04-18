import { SubBreed } from './sub_breed';

export interface Dog {
    id: number;
    description: string;
    url_src: string;
    sub_breed: SubBreed;
  }