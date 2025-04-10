'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import Filters from './Filters';
import { useCart } from './CartContext';
import { ProductsApiResponse, Product } from '../lib/types';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ProductGridProps {
  data: ProductsApiResponse;
}

export default function ProductGrid({ data }: ProductGridProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAddingToCart, setIsAddingToCart] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayData, setDisplayData] = useState<ProductsApiResponse>(data);
  const [redirectingProduct, setRedirectingProduct] = useState<number | null>(null);

  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayData(data);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [data]);

  const handleProductClick = (productId: number) => {
    setRedirectingProduct(productId);
    router.push(`/products/${productId}`);
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/products?${params.toString()}`);
  };

  const handleAddToCart = async (product: Product) => {
    setIsAddingToCart((prev) => ({ ...prev, [product.id]: true }));
    try {
      await addToCart(product);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  const filteredProducts = searchQuery
    ? displayData.products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : displayData.products;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Filters initialParams={Object.fromEntries(searchParams.entries())} />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative">
                {redirectingProduct === product.id && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 z-10 flex items-center justify-center">
                    <LoadingSpinner />
                    <span className="ml-2 text-sm">Loading product...</span>
                  </div>
                )}
                <div onClick={() => handleProductClick(product.id)} className="cursor-pointer">
                  <ProductCard product={product} />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  disabled={isAddingToCart[product.id]}
                  className={`mt-3 w-full py-2 rounded transition-colors flex items-center justify-center ${
                    isAddingToCart[product.id]
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  aria-label={`Add ${product.title} to cart`}
                >
                  {isAddingToCart[product.id] ? (
                    <>
                      <LoadingSpinner />
                      Adding...
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
            ))}
          </div>

          {displayData.totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-100"
                  aria-label="Previous page"
                >
                  &larr;
                </button>
              )}

              {Array.from({ length: Math.min(5, displayData.totalPages) }, (_, i) => {
                let pageNum;
                if (displayData.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= displayData.totalPages - 2) {
                  pageNum = displayData.totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 border rounded ${
                      pageNum === currentPage
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white hover:bg-gray-100 border-gray-300'
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {currentPage < displayData.totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-100"
                  aria-label="Next page"
                >
                  &rarr;
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
