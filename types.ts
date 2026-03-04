export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface ProductCategory extends CosmicObject {
  type: 'product-categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: CosmicImage;
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name?: string;
    description?: string;
    price?: number;
    compare_at_price?: number;
    featured_image?: CosmicImage;
    gallery?: CosmicImage[];
    inventory_status?: string;
    sku?: string;
    category?: ProductCategory;
  };
}

export interface CustomerReview extends CosmicObject {
  type: 'customer-reviews';
  metadata: {
    reviewer_name?: string;
    rating?: number;
    review?: string;
    product?: Product;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}