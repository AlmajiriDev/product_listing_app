import { notFound } from 'next/navigation';
import ProductGrid from '../../components/ProductGrid';
import { ProductsApiResponse } from '../../lib/types';

interface SearchParams {
  page?: string;
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  // Safely build query parameters without destructuring
  const query = new URLSearchParams();

  // Handle each parameter individually
  if (searchParams.page) query.set('page', searchParams.page);
  if (searchParams.search) query.set('search', searchParams.search);
  if (searchParams.category) query.set('category', searchParams.category);
  // if (searchParams.minPrice) query.set('minPrice', searchParams.minPrice); // to be added later
  // if (searchParams.maxPrice) query.set('maxPrice', searchParams.maxPrice); // to be added later

  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/products?${query.toString()}`, {
      next: { revalidate: 3600 }, // ISR - revalidate every hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data: ProductsApiResponse = await res.json();

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <ProductGrid data={data} />
      </div>
    );
  } catch (error) {
    console.error('ProductsPage error:', error);
    notFound();
  }
}
