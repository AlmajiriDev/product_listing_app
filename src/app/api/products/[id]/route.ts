import { NextResponse } from 'next/server';
import products from '../../../../data/products.json';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = products.find((p) => p.id === parseInt(params.id));

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
