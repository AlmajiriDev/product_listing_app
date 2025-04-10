import { NextResponse } from 'next/server';
import products from '../../../../data/products.json';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    const product = products.find((p) => p.id === parseInt(id || ''));

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
