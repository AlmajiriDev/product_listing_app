import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetails from '../../../components/ProductDetails';
import { Product } from '../../../lib/types';

interface ApiResponse {
  product: Product;
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);

  if (!res.ok) {
    notFound();
  }

  const data: ApiResponse = await res.json();
  return data.product;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const product = await getProduct(params.id);
    return {
      title: `${product.title} | Our Store`,
      description: product.description,
      openGraph: {
        images: [product.image],
      },
    };
  } catch {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </div>
    );
  } catch {
    notFound();
  }
}
