export interface CosmicObject {
  id: string;
  title: string;
  slug: string;
  type: string;
  metadata: Record<string, unknown>;
  created_at?: string;
  modified_at?: string;
}

export interface ProductMetadata {
  product_name: string;
  description: string;
  price: number;
  compare_at_price?: number;
  featured_image?: {
    url: string;
    imgix_url: string;
  };
  gallery?: Array<{
    url: string;
    imgix_url: string;
  }>;
  inventory_status?: string;
  sku?: string;
  category?: ProductCategory;
}

export interface Product extends CosmicObject {
  metadata: ProductMetadata;
}

export interface ProductCategoryMetadata {
  name: string;
  description?: string;
  category_image?: {
    url: string;
    imgix_url: string;
  };
}

export interface ProductCategory extends CosmicObject {
  metadata: ProductCategoryMetadata;
}

export interface CustomerReviewMetadata {
  reviewer_name: string;
  rating: number;
  review: string;
  product?: Product;
}

export interface CustomerReview extends CosmicObject {
  metadata: CustomerReviewMetadata;
}

export interface PageMetadata {
  heading: string;
  content: string;
  last_updated: string;
}

export interface Page extends CosmicObject {
  metadata: PageMetadata;
}