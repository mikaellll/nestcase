import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Nestcase",
  description: "Contactez le service client Nestcase. Nous sommes là pour répondre à vos questions sur nos chargeurs, câbles, et vos commandes.",
  alternates: {
    canonical: "/contact",
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-4">Contactez-nous</h1>
          <p className="text-lg text-brand-graphite">
            Une question sur un produit, une commande ou un retour ? Notre équipe vous répond sous 24h ouvrées.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-5xl mx-auto">
          
          {/* Form */}
          <div className="flex-[2] bg-brand-white p-8 rounded-3xl border border-brand-gray shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-graphite mb-2" htmlFor="name">Nom complet</label>
                  <input id="name" type="text" className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors" placeholder="Jean Dupont" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-graphite mb-2" htmlFor="email">Email</label>
                  <input id="email" type="email" className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors" placeholder="jean@email.com" required />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-graphite mb-2" htmlFor="subject">Sujet</label>
                <select id="subject" className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors bg-white">
                  <option value="product">Question sur un produit</option>
                  <option value="order">Suivi de commande</option>
                  <option value="return">Demande de retour / SAV</option>
                  <option value="other">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-graphite mb-2" htmlFor="orderId">Numéro de commande (optionnel)</label>
                <input id="orderId" type="text" className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors" placeholder="Ex: #12345" />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-graphite mb-2" htmlFor="message">Message</label>
                <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors resize-none" placeholder="Comment pouvons-nous vous aider ?" required></textarea>
              </div>

              <button type="submit" className="w-full px-8 py-4 bg-brand-black text-brand-white font-bold rounded-xl hover:bg-brand-graphite transition-all">
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Quick Info & FAQ */}
          <div className="flex-1 space-y-8">
            <div className="bg-brand-gray/30 p-8 rounded-3xl border border-brand-gray">
              <h3 className="font-bold text-xl mb-4">Informations</h3>
              <ul className="space-y-4 text-brand-graphite">
                <li>
                  <strong className="block text-brand-black mb-1">Email :</strong>
                  <a href="mailto:support@nestcase.com" className="hover:text-brand-blue transition-colors">support@nestcase.com</a>
                </li>
                <li>
                  <strong className="block text-brand-black mb-1">Horaires :</strong>
                  Du Lundi au Vendredi<br />9h00 - 18h00
                </li>
              </ul>
            </div>

            <div className="bg-brand-gray/30 p-8 rounded-3xl border border-brand-gray">
              <h3 className="font-bold text-xl mb-4">Questions fréquentes</h3>
              <ul className="space-y-3 text-sm text-brand-graphite">
                <li><a href="/faq#livraison" className="hover:text-brand-black underline decoration-brand-gray underline-offset-2">Quels sont les délais de livraison ?</a></li>
                <li><a href="/faq#retours" className="hover:text-brand-black underline decoration-brand-gray underline-offset-2">Comment retourner un produit ?</a></li>
                <li><a href="/faq#compatibilite" className="hover:text-brand-black underline decoration-brand-gray underline-offset-2">Mon appareil est-il compatible ?</a></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
