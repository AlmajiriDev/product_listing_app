import { NextResponse } from 'next/server';
import products from '../../../data/products.json';
import { Product } from '@/src/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    // Filtering
    let filteredProducts: Product[] = [...products];

    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category === category);
    }

    if (q) {
      const query = q.toLowerCase();
      filteredProducts = filteredProducts.filter((p) => p.title.toLowerCase().includes(query));
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIdx = (pageNum - 1) * limitNum;
    const paginatedProducts = filteredProducts.slice(startIdx, startIdx + limitNum);

    return NextResponse.json({
      products: paginatedProducts,
      total: filteredProducts.length,
      page: pageNum,
      totalPages: Math.ceil(filteredProducts.length / limitNum),
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
