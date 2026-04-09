'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: "Coques et Protections",
    items: [
      {
        q: "Vos coques NestCase protègent-elles vraiment des chutes sévères ?",
        a: "Absolument. Nos coques 'Édition Signature' et 'Collection Luxe' embarquent une technologie d'absorption des chocs de qualité militaire. Elles sont testées pour résister à des chutes allant jusqu'à 3 mètres sur des surfaces dures. Les bords surélevés de 1.5mm protègent l'écran, tandis que l'anneau renforçateur de 2.2mm sécurise pleinement le bloc caméra."
      },
      {
        q: "Les coques NestCase jaunissent-elles avec le temps ?",
        a: "Non. Contrairement aux coques bon marché en TPU basique, toutes nos coques transparentes ou translucides bénéficient d'un traitement exclusif anti-UV et anti-jaunissement (Anti-Yellowing Tech). Votre coque conserve sa clarté cristalline même après plusieurs mois d'exposition solaire intense."
      },
      {
        q: "Puis-je utiliser un verre trempé avec votre coque ?",
        a: "Oui, toutes nos coques sont 'Case-Friendly', c'est-à-dire spécifiquement taillées pour être 100% compatibles avec la majorité des films protecteurs et verres trempés 3D ou 9H du marché, sans créer de bulles sur les rebords."
      }
    ]
  },
  {
    category: "Chargeurs Rapides & Batteries",
    items: [
      {
        q: "Qu'est-ce que la technologie de charge rapide GaN utilisée dans vos chargeurs secteur ?",
        a: "Nos chargeurs premium utilisent le Nitrure de Gallium (GaN), une technologie de pointe remplaçant le silicium traditionnel. Cela permet d'avoir des chargeurs beaucoup plus petits, qui chauffent nettement moins tout en délivrant une puissance fulgurante (20W, 30W, ou 65W). Vous pouvez recharger votre smartphone de 0 à 50% en moins de 30 minutes sans abîmer la batterie."
      },
      {
        q: "Le chargeur mural NestCase coupe-t-il l'alimentation quand le téléphone est à 100% ?",
        a: "Oui. Nos chargeurs intègrent une puce intelligente (Smart Charge Chip) identifiant le besoin énergétique exact de l'appareil branché. Ils ajustent la tension en temps réel et entrent en mode maintien (trickle charge) une fois les 100% atteints, protégeant ainsi activement la durée de vie de votre batterie."
      }
    ]
  },
  {
    category: "Câbles & Connectique",
    items: [
      {
        q: "Pourquoi vos câbles USB-C et Lightning sont-ils réputés indestructibles ?",
        a: "Nos câbles sont renforcés avec du Kevlar et enveloppés d'une double tresse en nylon balistique. Ils ont passé avec succès des tests de flexion (Bending Tests) allant jusqu'à 25 000 pliages au niveau de la jointure. Ils ne s'effilochent pas, ne se tordent pas et assurent un débit de données maximal."
      },
      {
        q: "Sont-ils certifiés par les constructeurs (MFi pour Apple) ?",
        a: "Tous les câbles Lightning NestCase disposent de la certification MFi (Made For iPhone/iPad/iPod). Cela vous garantit aucune erreur de compatibilité ni réduction de la vitesse de charge, même après les mises à jour iOS d'Apple."
      }
    ]
  },
  {
    category: "Compatibilité MagSafe & Supports",
    items: [
      {
        q: "Vos accessoires et coques sont-ils compatibles MagSafe ?",
        a: "L'intégralité de nos nouvelles gammes intègre un parfait alignement magnétique MagSafe composé de 38 aimants N52 surpuissants. La force d'attraction est jusqu'à 3 fois supérieure aux standards du marché. Vous pouvez fixer fermement aucun risque votre téléphone sur un support voiture, un chargeur sans fil ou ajouter un porte-cartes magnétique."
      },
      {
        q: "Le support de voiture endommage-t-il les grilles de ventilation ?",
        a: "Pas du tout. Notre support voiture magnétique ou à pince dispose de coussinets en silicone texturé qui protègent les pales de l'aérateur des rayures tout en assurant une fixation extrêmement rigide, même sur route cahoteuse."
      }
    ]
  },
  {
    category: "Commandes & Expédition",
    items: [
      {
        q: "Quels sont les délais de livraison en France et à l'international ?",
        a: "Pour la France métropolitaine, l'expédition Standard prend de 48h à 72h. Nous proposons également une livraison Express (24h) via Chronopost. Pour l'international (Europe, Suisse, Canada), prévoyez entre 3 et 7 jours ouvrés."
      },
      {
        q: "Puis-je retourner mon accessoire s'il ne convient pas ?",
        a: "Bien sûr. Vous disposez d'un délai légal étendu à 30 jours (la garantie 'Satisfait ou Remboursé NestCase') pour nous renvoyer l'article dans son emballage d'origine. Les retours sont simples et pris en charge par notre service client ultra-réactif."
      }
    ]
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {faqs.map((section, sectionIdx) => (
        <section key={sectionIdx}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', color: '#f8fafc', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
            {section.category}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {section.items.map((item, itemIdx) => {
              const id = `${sectionIdx}-${itemIdx}`;
              const isOpen = openIndex === id;
              
              return (
                <div 
                  key={itemIdx}
                  style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => toggle(id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '24px',
                      background: 'transparent',
                      border: 'none',
                      color: isOpen ? '#818cf8' : '#e2e8f0',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                    }}
                  >
                    <span>{item.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div style={{ padding: '0 24px 24px', color: '#94a3b8', lineHeight: 1.7, fontSize: '1.05rem' }}>
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
