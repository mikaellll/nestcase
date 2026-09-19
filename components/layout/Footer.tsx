import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white pt-20 pb-10 border-t border-brand-graphite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="font-heading font-black text-2xl tracking-tighter uppercase block mb-6">
              NESTCASE
            </Link>
            <p className="text-brand-gray mb-6 leading-relaxed">
              Power your everyday. Des accessoires technologiques premium conçus pour durer.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-gray hover:text-brand-blue transition-colors">IG</a>
              <a href="#" className="text-brand-gray hover:text-brand-blue transition-colors">X</a>
              <a href="#" className="text-brand-gray hover:text-brand-blue transition-colors">FB</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Boutique</h4>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-brand-gray hover:text-brand-white transition-colors">Tous les produits</Link></li>
              <li><Link href="/shop" className="text-brand-gray hover:text-brand-white transition-colors">Chargeurs</Link></li>
              <li><Link href="/shop" className="text-brand-gray hover:text-brand-white transition-colors">Câbles</Link></li>
              <li><Link href="/shop" className="text-brand-gray hover:text-brand-white transition-colors">Supports</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Assistance</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-brand-gray hover:text-brand-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-brand-gray hover:text-brand-white transition-colors">Livraison</Link></li>
              <li><Link href="/returns" className="text-brand-gray hover:text-brand-white transition-colors">Retours</Link></li>
              <li><Link href="/warranty" className="text-brand-gray hover:text-brand-white transition-colors">Garantie</Link></li>
              <li><Link href="/contact" className="text-brand-gray hover:text-brand-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Nestcase</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-brand-gray hover:text-brand-white transition-colors">À propos</Link></li>
              <li><Link href="/privacy" className="text-brand-gray hover:text-brand-white transition-colors">Confidentialité</Link></li>
              <li><Link href="/terms" className="text-brand-gray hover:text-brand-white transition-colors">CGV</Link></li>
              <li><Link href="/cookies" className="text-brand-gray hover:text-brand-white transition-colors">Cookies</Link></li>
              <li><Link href="/legal" className="text-brand-gray hover:text-brand-white transition-colors">Mentions Légales</Link></li>
              <li><Link href="/accessibility" className="text-brand-gray hover:text-brand-white transition-colors">Accessibilité</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-graphite text-center md:flex md:justify-between items-center text-brand-gray text-sm">
          <p>© {new Date().getFullYear()} Nestcase. Tous droits réservés.</p>
          <div className="mt-4 md:mt-0 flex justify-center space-x-4">
            <span>Paiement Sécurisé : Stripe & PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
