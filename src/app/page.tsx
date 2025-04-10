import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="animate-bounce mb-8">
          <Image src="/greet.png" alt="Waving hand" width={120} height={120} className="mx-auto" />
        </div>

        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Marhaba da Zuwa!
        </h1>

        <p className="text-xl mb-8 text-gray-700">
          Welcome to <span className="font-bold">JUMMAI</span>, the most{' '}
          <span className="font-bold">✨aMaZiNg✨</span> store in the universe!
          <br />
          Our products are so good, they&apos;ll make your wallet cry tears of joy.
        </p>

        <div className="group">
          <Link
            href="/products"
            className="inline-block px-8 py-4 text-xl font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 group-hover:scale-105"
          >
            <span className="block group-hover:animate-pulse"> SHOP NOW </span>
            <span className="block text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              (Warning: Extreme happiness ahead)
            </span>
          </Link>
        </div>

        <p className="mt-12 text-gray-500">
          P.S. Our lawyers made us say: &quot;Actual happiness may vary. Batteries not
          included.&quot;
        </p>
      </div>
    </div>
  );
}
