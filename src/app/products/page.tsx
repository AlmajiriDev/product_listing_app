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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const query = new URLSearchParams();

  if (params.page) query.set('page', params.page);
  if (params.search) query.set('search', params.search);
  if (params.category) query.set('category', params.category);
  //   // if (searchParams.minPrice) query.set('minPrice', searchParams.minPrice); // to be added later
  //   // if (searchParams.maxPrice) query.set('maxPrice', searchParams.maxPrice); // to be added later
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/products?${query.toString()}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);

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
