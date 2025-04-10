'use client';

import { useState } from 'react';
import { useCart } from './CartContext';
import { Product } from '../lib/types';
import Rating from './Rating';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(product, quantity);
      toast.success(`${quantity} ${product.title} added to cart!`, {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const images: string[] = [
    product.image,
    ...(Array.isArray(product.image) ? product.image.slice(0, 3) : []),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image Gallery */}
      <div>
        <div className="relative h-96 mb-4 rounded-lg overflow-hidden bg-gray-50">
          <Image
            src={selectedImage}
            alt={product.title}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => {
            const imageSrc = typeof image === 'string' ? image : image || '';

            return (
              <button
                key={index}
                onClick={() => setSelectedImage(imageSrc)}
                className={`relative h-20 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === imageSrc ? 'border-blue-500' : 'border-transparent'
                }`}
                aria-label={`View ${product.title} image ${index + 1}`}
              >
                <Image
                  src={imageSrc}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = '/add-image-here'; //i will add a placeholder image here later
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

        <div className="flex items-center mb-4">
          <Rating value={product.rating?.rate || 0} />
          <span className="ml-2 text-sm text-gray-600">({product.rating?.count || 0} reviews)</span>
        </div>

        <p className="text-2xl font-semibold mb-6">₦{product.price.toFixed(2)}</p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Specifications</h2>
          <ul className="grid grid-cols-2 gap-2">
            <li className="flex">
              <span className="font-medium mr-2">Category:</span>
              <span className="capitalize">{product.category}</span>
            </li>
            <li className="flex">
              <span className="font-medium mr-2">Stock:</span>
              <span>In Stock</span>
            </li>
          </ul>
        </div>

        {/* Add to Cart */}
        <div className="flex items-center space-x-4 mt-8">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 text-lg hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 py-1">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 text-lg hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`flex-1 py-3 px-6 rounded transition-colors ${
              isAddingToCart
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            aria-label="Add to cart"
          >
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
