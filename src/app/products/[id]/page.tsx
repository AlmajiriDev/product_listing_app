import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetails from '../../../components/ProductDetails';
import { Product } from '../../../lib/types';

interface ApiResponse {
  product: Product;
}

interface PageProps {
  params: Promise<{ id: string }>;
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${apiUrl}/api/products/${id}`);

  if (!res.ok) {
    notFound();
  }

  const data: ApiResponse = await res.json();
  return data.product;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await getProduct(id);
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
export default async function ProductDetailPage({ params }: PageProps) {
  try {
    const { id } = await params;
    const product = await getProduct(id);
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </div>
    );
  } catch {
    notFound();
  }
}
