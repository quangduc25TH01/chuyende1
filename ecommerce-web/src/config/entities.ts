export interface ICategory {
  id: number;
  name: string;
  slug: string;
  logoURL: string;
  imageURL: string;
}

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: number;
  information: string;
  code: string;
  isNew: boolean;
  isBestSeller: boolean;
  images: ImageProduct[];
  category: ICategory;
}

export interface ImageProduct {
  id: number;
  imageUrl: string;
}

export interface IArticle {
  id: number;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
