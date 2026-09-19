"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { useState, useRef } from "react";
import Link from "next/link";
import { CheckCircle, Lock, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure you have NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_fallback");

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const user = useQuery(api.users.current);
  const isLoaded = user !== undefined;
  const isSignedIn = user !== null;
  const router = useRouter();
  const [guestCheckout, setGuestCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const createOrder = useMutation(api.orders.createOrder);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street1: "",
    postalCode: "",
    city: "",
    country: "France",
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 5000 ? 0 : 590; // Free shipping above 50€
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.street1 &&
      formData.postalCode &&
      formData.city
    );
  };

  const generateOrderNumber = () => {
    return `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
  };

  const handleStripeCheckout = async () => {
    if (!isFormValid()) {
      alert("Veuillez remplir tous les champs de livraison.");
      return;
    }

    setIsProcessing(true);
    try {
      const orderNumber = generateOrderNumber();
      
      // Save order in Convex as pending
      const orderId = await createOrder({
        orderNumber,
        subtotal,
        shipping,
        total,
        currency: "eur",
        paymentProvider: "stripe",
        paymentStatus: "pending",
        orderStatus: "pending",
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          street1: formData.street1,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        customerEmail: formData.email || user?.email || "",
        items: items.map(i => ({
          productId: i.id as any,
          quantity: i.quantity,
          priceAtTime: i.price,
          name: i.name,
        }))
      });

      // Calling your own API route for Stripe Checkout
      const response = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items, 
          orderId, // Passing Convex Order ID to metadata
          customerEmail: formData.email 
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (stripe) {
        await (stripe as any).redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error("Erreur Stripe:", error);
      alert("Une erreur est survenue lors de la création de la session Stripe.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalApprove = async (data: any, actions: any) => {
    return actions.order.capture().then(async (details: any) => {
      setIsProcessing(true);
      try {
        const orderNumber = generateOrderNumber();
        
        await createOrder({
          orderNumber,
          subtotal,
          shipping,
          total,
          currency: "eur",
          paymentProvider: "paypal",
          paymentStatus: "paid",
          orderStatus: "processing",
          paypalOrderId: details.id,
          shippingAddress: {
            name: `${formData.firstName} ${formData.lastName}`,
            street1: formData.street1,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          customerEmail: formData.email,
          items: items.map(i => ({
            productId: i.id as any,
            quantity: i.quantity,
            priceAtTime: i.price,
            name: i.name,
          }))
        });

        clearCart();
        window.location.href = `/checkout/success?orderNumber=${orderNumber}`;
      } catch (error) {
        console.error("PayPal Capture Error:", error);
        alert("Erreur lors de l'enregistrement de la commande PayPal.");
      } finally {
        setIsProcessing(false);
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-brand-white text-center">
        <h1 className="text-4xl font-black text-brand-black mb-4">Votre panier est vide</h1>
        <p className="text-brand-graphite mb-8">Ajoutez quelques produits avant de passer à la caisse.</p>
        <Link href="/shop" className="px-8 py-4 bg-brand-black text-brand-white font-semibold rounded-full hover:bg-brand-graphite">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl md:text-4xl font-black text-brand-black tracking-tight mb-12">Paiement Sécurisé</h1>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Form / Login */}
          <div className="flex-[2]">
            {!isLoaded ? (
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-brand-gray rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-brand-gray rounded"></div>
                    <div className="h-4 bg-brand-gray rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ) : !isSignedIn && !guestCheckout ? (
              <div className="bg-brand-gray/30 p-8 rounded-3xl border border-brand-gray text-center">
                <h2 className="text-2xl font-bold mb-4">Déjà client ?</h2>
                <p className="text-brand-graphite mb-8">Connectez-vous pour finaliser votre achat plus rapidement et suivre vos commandes.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => router.push("/login")}
                    className="px-8 py-4 bg-brand-blue text-brand-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Se connecter
                  </button>
                  <button 
                    onClick={() => setGuestCheckout(true)}
                    className="px-8 py-4 border-2 border-brand-black text-brand-black font-semibold rounded-full hover:bg-brand-gray transition-colors"
                  >
                    Continuer en tant qu'invité
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                {/* Checkout Form */}
                <div className="bg-brand-white p-8 rounded-3xl border border-brand-gray shadow-sm">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="bg-brand-black text-brand-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
                    Livraison
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-graphite mb-2">Prénom *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors" placeholder="Jean" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-graphite mb-2">Nom *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors" placeholder="Dupont" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-brand-graphite mb-2">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors" placeholder="jean.dupont@email.com" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-brand-graphite mb-2">Adresse postale *</label>
                      <input type="text" name="street1" value={formData.street1} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors" placeholder="123 rue de la République" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-graphite mb-2">Code Postal *</label>
                      <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors" placeholder="75001" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-graphite mb-2">Ville *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors" placeholder="Paris" />
                    </div>
                  </div>
                </div>

                <div className="bg-brand-white p-8 rounded-3xl border border-brand-gray shadow-sm relative">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="bg-brand-black text-brand-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
                    Paiement
                  </h2>
                  <p className="text-brand-graphite mb-6">Veuillez d'abord remplir vos informations de livraison.</p>
                  
                  {isProcessing && (
                    <div className="absolute inset-0 bg-brand-white/80 z-10 flex items-center justify-center rounded-3xl backdrop-blur-sm">
                      <Loader2 className="animate-spin text-brand-black w-8 h-8" />
                    </div>
                  )}

                  <div className={`flex flex-col gap-4 ${!isFormValid() ? 'opacity-50 pointer-events-none' : ''}`}>
                    <button 
                      type="button" 
                      onClick={handleStripeCheckout}
                      className="w-full py-4 bg-[#0A2540] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors"
                    >
                      <Lock size={18} /> Carte bancaire (Stripe)
                    </button>
                    
                    <div className="relative z-0 mt-4">
                      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb", currency: "EUR" }}>
                        <PayPalButtons 
                          style={{ layout: "vertical", shape: "rect" }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              intent: "CAPTURE",
                              purchase_units: [{
                                amount: {
                                  currency_code: "EUR",
                                  value: (total / 100).toFixed(2)
                                }
                              }]
                            });
                          }}
                          onApprove={handlePayPalApprove}
                        />
                      </PayPalScriptProvider>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="flex-1">
            <div className="bg-brand-gray/20 p-8 rounded-3xl border border-brand-gray sticky top-32">
              <h3 className="text-xl font-bold mb-6">Résumé de la commande</h3>
              
              <ul className="space-y-4 mb-6">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-white rounded-lg flex items-center justify-center overflow-hidden border border-brand-gray">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-brand-graphite max-w-[150px] truncate">
                        {item.name} <span className="text-xs ml-1">x{item.quantity}</span>
                      </span>
                    </div>
                    <span className="font-medium text-brand-black shrink-0">
                      {((item.price * item.quantity) / 100).toFixed(2)} €
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-brand-gray pt-6 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-brand-graphite">
                  <span>Sous-total</span>
                  <span>{(subtotal / 100).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm text-brand-graphite">
                  <span>Livraison</span>
                  <span>{shipping === 0 ? "Gratuite" : `${(shipping / 100).toFixed(2)} €`}</span>
                </div>
              </div>

              <div className="border-t border-brand-black pt-6 flex justify-between items-center mb-8">
                <span className="font-bold text-lg">Total</span>
                <span className="font-black text-2xl">{(total / 100).toFixed(2)} €</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-brand-graphite">
                <CheckCircle size={16} className="text-green-600" />
                <span>Paiement 100% sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
