import type { Metadata } from 'next';
import { Mail, MessageCircle, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contactez-nous | NestCase",
  description: "Besoin d'aide avec votre coque, chargeur ou câble de téléphone ? Notre équipe chez NestCase est là pour vous assister. Contactez-nous dès maintenant.",
};

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', background: '#080808', color: '#f8fafc' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.03em' }}>
            Contactez <span style={{ color: '#818cf8' }}>NestCase</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Une question sur un produit, une commande ou un partenariat ? Nous sommes à votre écoute.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'start' }}>
          
          {/* Contact Info */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '32px' }}>Nos Coordonnées</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ background: 'rgba(99,102,241,0.1)', padding: '12px', borderRadius: '12px' }}>
                  <Mail size={24} color="#818cf8" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>E-mail</h3>
                  <p style={{ color: '#94a3b8', marginBottom: '4px' }}>Pour toute demande générale :</p>
                  <a href="mailto:contact@nestcase.com" style={{ color: '#f8fafc', fontWeight: 500, textDecoration: 'none' }}>contact@nestcase.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ background: 'rgba(99,102,241,0.1)', padding: '12px', borderRadius: '12px' }}>
                  <Phone size={24} color="#818cf8" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Téléphone</h3>
                  <p style={{ color: '#94a3b8', marginBottom: '4px' }}>Lun-Ven, de 9h à 18h :</p>
                  <a href="tel:+33761822463" style={{ color: '#f8fafc', fontWeight: 500, textDecoration: 'none' }}>+33 7 61 82 24 63</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ background: 'rgba(99,102,241,0.1)', padding: '12px', borderRadius: '12px' }}>
                  <MessageCircle size={24} color="#818cf8" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Réseaux Sociaux</h3>
                  <p style={{ color: '#94a3b8', marginBottom: '4px' }}>Réponse rapide garantie :</p>
                  <a href="#" style={{ color: '#f8fafc', fontWeight: 500, textDecoration: 'none' }}>@NestCaseFr sur Instagram</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '32px' }}>Envoyez-nous un message</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>Nom complet</label>
                  <input type="text" id="name" className="input-field" placeholder="Jean Dupont" style={{ width: '100%', background: 'rgba(0,0,0,0.2)' }} />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>Adresse e-mail</label>
                  <input type="email" id="email" className="input-field" placeholder="jean@exemple.com" style={{ width: '100%', background: 'rgba(0,0,0,0.2)' }} />
                </div>
              </div>

              <div>
                <label htmlFor="subject" style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>Sujet</label>
                <select id="subject" className="input-field" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', color: '#f8fafc' }}>
                  <option value="order">Suivi de commande</option>
                  <option value="product">Question sur un produit (Coque, Chargeur...)</option>
                  <option value="return">Retour et garantie</option>
                  <option value="other">Autre demande</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>Message</label>
                <textarea id="message" className="input-field" rows={5} placeholder="Comment pouvons-nous vous aider ?" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', resize: 'vertical' }}></textarea>
              </div>

              <button type="button" className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1rem', marginTop: '10px' }}>
                Envoyer le message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
