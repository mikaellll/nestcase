import type { Metadata } from 'next';
import { Shield, Zap, RefreshCw, Feather } from 'lucide-react';

export const metadata: Metadata = {
  title: "À Propos de NestCase | L'Excellence de l'Accessoire Mobile",
  description: "Découvrez l'histoire de NestCase. Nous concevons des coques, chargeurs ultrarapides, câbles renforcés et supports premium pour sublimer votre expérience mobile.",
};

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: "Protection Militaire",
      description: "Nos coques sont testées pour résister à des chutes jusqu'à 3 mètres tout en conservant une finesse exceptionnelle."
    },
    {
      icon: Zap,
      title: "Charge Ultra Rapide",
      description: "Une technologie de charge certifiée pour alimenter votre smartphone en un temps record, en toute sécurité."
    },
    {
      icon: RefreshCw,
      title: "Matériaux Durables",
      description: "Câbles tressés en nylon balistique et plastiques recyclés : nous concevons nos produits pour qu'ils durent des années."
    },
    {
      icon: Feather,
      title: "Design Minimaliste",
      description: "Parce qu'un accessoire doit sublimer le design original de votre téléphone et non le dissimuler."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', background: '#080808', color: '#f8fafc' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.03em' }}>
            Notre mission chez <span style={{ color: '#818cf8' }}>NestCase</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto' }}>
            Nous croyons que les smartphones modernes sont de véritables bijoux de technologie. 
            C&apos;est pourquoi nous créons des <strong style={{ color: '#f8fafc' }}>coques</strong> et des <strong style={{ color: '#f8fafc' }}>accessoires</strong> (chargeurs rapides, câbles renforcés, supports ergonomiques) d&apos;une qualité absolue, pensés pour sublimer et protéger votre appareil.
          </p>
        </div>

        {/* Image Placeholder or Graphic Element */}
        <div style={{ 
          width: '100%', 
          height: '400px', 
          borderRadius: '24px', 
          background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
          border: '1px solid rgba(99,102,241,0.3)',
          marginBottom: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', width: '150%', height: '150%', background: 'radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 60%)' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#f8fafc', zIndex: 1 }}>L&apos;alliance du Design et de la Technologie</h2>
        </div>

        {/* Story Section */}
        <div style={{ marginBottom: '80px', display: 'grid', gap: '32px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>Comment tout a commencé</h2>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8, marginBottom: '16px' }}>
              L&apos;idée de NestCase est née de la frustration d&apos;un constat simple : la plupart des accessoires pour téléphone sur le marché offrent soit une bonne protection mais un design lourd et inesthétique, soit un beau design mais aucune réelle durabilité (câbles qui se déchirent, chargeurs lents, coques qui jaunissent).
            </p>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8 }}>
              Nous avons rassemblé des designers passionnés et des ingénieurs pour concevoir le <strong style={{ color: '#f8fafc' }}>chargeur parfait</strong>, le câble ultra-résistant, le support voiture invisible, et bien sûr, notre pièce maîtresse : la coque de protection ultime, la série Édition Signature. NestCase est devenue la référence pour équiper intégralement de A à Z son smartphone avec des produits haut de gamme.
            </p>
          </div>
        </div>

        {/* Features Grids */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px' }}>
              <feature.icon size={32} color="#818cf8" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>{feature.title}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
