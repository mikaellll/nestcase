import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-brand-white text-center">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-black text-brand-black mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">This page took a wrong turn.</h2>
        <p className="text-lg text-brand-graphite mb-10">
          La page que vous recherchez a peut-être été déplacée ou n'existe plus. Let's get you back to Nestcase.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="px-8 py-4 bg-brand-black text-brand-white font-semibold rounded-full hover:bg-brand-graphite transition-colors">
            Back to shop
          </Link>
          <Link href="/" className="px-8 py-4 border-2 border-brand-black text-brand-black font-semibold rounded-full hover:bg-brand-gray transition-colors">
            Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
