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
    [key: string]: unknown; // Changed: Added index signature for Record<string, unknown> compatibility
    name?: string;
    description?: string;
    category_image?: CosmicImage;
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    [key: string]: unknown; // Changed: Added index signature for Record<string, unknown> compatibility
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
    [key: string]: unknown; // Changed: Added index signature for Record<string, unknown> compatibility
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

// Changed: Added Page types (merged from types/index.ts)
export interface Page extends CosmicObject {
  metadata: {
    [key: string]: unknown; // Changed: Added index signature for Record<string, unknown> compatibility
    heading: string;
    content: string;
    last_updated: string;
  };
}