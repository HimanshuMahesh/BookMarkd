export interface Book {
    id: string;
    title: string;
    author: string;
    cover: string;
    shelf: string;
    review?: string;
  }
  
  export interface Shelf {
    id: string;
    name: string;
  }