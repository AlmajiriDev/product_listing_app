import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../lib/types';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white rounded-2xl shadow hover:shadow-md transition duration-300 p-4"
      aria-label={`View details for ${product.title}`}
    >
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={false}
        />
      </div>
      <h2 className="text-lg font-semibold mt-3 line-clamp-1">{product.title}</h2>
      <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-blue-600 font-bold">₦{product.price.toFixed(2)}</span>
        <span className="text-sm text-gray-500">
          {product.rating?.rate || 0} ⭐ ({product.rating?.count || 0})
        </span>
      </div>
    </Link>
  );
}
