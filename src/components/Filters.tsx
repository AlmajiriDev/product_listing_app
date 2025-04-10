'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface FiltersProps {
  initialParams: Record<string, string>;
}

export default function Filters({ initialParams }: FiltersProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialParams.search || '');
  const [category, setCategory] = useState(initialParams.category || '');
  const [minPrice, setMinPrice] = useState(initialParams.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialParams.maxPrice || '');

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded w-full sm:w-1/4"
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 rounded w-full sm:w-1/4"
      />
      <input
        placeholder="Min Price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        disabled
        className="border px-3 py-2 rounded w-full sm:w-1/4"
      />
      <input
        placeholder="Max Price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border px-3 py-2 rounded w-full sm:w-1/4"
        disabled
      />
      <button
        onClick={handleFilter}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
  );
}
