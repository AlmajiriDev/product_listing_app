'use client';

import { useCart } from '../../components/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          href="/products"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="grid gap-6">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 border-b pb-6">
            <div className="relative w-24 h-24">
              <Image src={item.image} alt={item.title} fill className="object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 border"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 border"
                >
                  +
                </button>
                <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Total: ${cartTotal.toFixed(2)}</h3>
          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="px-4 py-2 border border-red-500 text-red-500 rounded"
            >
              Clear Cart
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
