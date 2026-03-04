# The Drum Shtick

![App Preview](https://imgix.cosmicjs.com/fd00af70-17eb-11f1-ae90-cb04e4590f44-autopilot-photo-1513883049090-d0b7439799bf-1772643775451.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive online drum store built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse drums, drum sets, sticks, and accessories with category filtering, detailed product pages, and customer reviews.

## Features

- 🥁 **Product Catalog** — Browse all products with pricing, images, and inventory status
- 🏷️ **Category Browsing** — Filter products by category (Drums, Drum Sets, Sticks, Accessories)
- ⭐ **Customer Reviews** — Read authentic reviews with star ratings linked to products
- 📦 **Product Detail Pages** — Individual product pages with galleries and related reviews
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern Design** — Warm, inviting color palette inspired by natural drum materials
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js App Router and Server Components

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69a8655b0381b2395660e3b0&clone_repository=69a866940381b2395660e40a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews. User instructions: An online drum store that sells drums, drum sets, sticks, and accessories."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'The Drum Shtick'. The content is managed in Cosmic CMS with the following object types: product-categories, products, customer-reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: An online drum store that sells drums, drum sets, sticks, and accessories."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript 5](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing the object types: `products`, `product-categories`, `customer-reviews`

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up environment variables:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```
4. Run the development server:
   ```bash
   bun dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Products
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug
```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews for a Product
```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'customer-reviews', 'metadata.product': productId })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with three Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| Products | `products` | Drums, drum sets, sticks, and accessories |
| Product Categories | `product-categories` | Category groupings for products |
| Customer Reviews | `customer-reviews` | Customer reviews with star ratings |

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Import the repository on [Netlify](https://netlify.com)
3. Add your environment variables in the Netlify dashboard
4. Set the build command to `bun run build` and publish directory to `.next`
5. Deploy!

<!-- README_END -->