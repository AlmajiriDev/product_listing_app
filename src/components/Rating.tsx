'use client';

interface RatingProps {
  value: number;
  size?: 'sm' | 'md';
}

export default function Rating({ value, size = 'md' }: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} filled className={starSize} />
      ))}
      {hasHalfStar && <Star half className={starSize} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={starSize} />
      ))}
    </div>
  );
}

function Star({
  filled = false,
  half = false,
  className = '',
}: {
  filled?: boolean;
  half?: boolean;
  className?: string;
}) {
  if (half) {
    return (
      <div className={`relative ${className}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-gray-300"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-yellow-400"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${filled ? 'text-yellow-400' : 'text-gray-300'} ${className}`}
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}
