"use client";

import { Loader2, Package, Settings, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AccountPage() {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const user = useQuery(api.users.current);
  const orders = useQuery(api.orders.getUserOrders) || [];

  return (
    <AuthGuard>
      <div className="min-h-screen pt-32 pb-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-brand-black tracking-tight mb-2">Mon Compte</h1>
              <p className="text-brand-graphite">Bienvenue, {user?.name || user?.email}</p>
            </div>
            <button 
              onClick={() => void signOut()}
              className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 border border-brand-gray rounded-full text-brand-graphite hover:text-brand-black hover:border-brand-black transition-colors"
            >
              <LogOut size={18} /> Déconnexion
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Menu */}
            <div className="col-span-1 space-y-4">
              <Link href="/account" className="flex items-center justify-between p-4 bg-brand-black text-brand-white rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <Package size={20} />
                  <span className="font-semibold">Mes Commandes</span>
                </div>
                <ChevronRight size={18} />
              </Link>
              <Link href="/account/settings" className="flex items-center justify-between p-4 bg-brand-gray/30 hover:bg-brand-gray border border-transparent hover:border-brand-gray text-brand-black rounded-2xl transition-colors">
                <div className="flex items-center gap-3">
                  <Settings size={20} />
                  <span className="font-semibold">Paramètres</span>
                </div>
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* Content */}
            <div className="col-span-1 md:col-span-2">
              <div className="bg-brand-white p-8 rounded-3xl border border-brand-gray shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Historique de commandes</h2>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12 text-brand-graphite">
                    <Package size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Vous n'avez pas encore passé de commande.</p>
                    <Link href="/shop" className="inline-block mt-6 px-8 py-3 bg-brand-black text-brand-white font-semibold rounded-full hover:bg-brand-graphite transition-all">
                      Découvrir la boutique
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order: any) => (
                      <div key={order._id} className="border border-brand-gray rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4 pb-4 border-b border-brand-gray">
                          <div>
                            <p className="font-bold text-lg">{order.orderNumber}</p>
                            <p className="text-sm text-brand-graphite">{new Date(order.createdAt).toLocaleDateString("fr-FR")}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{(order.total / 100).toFixed(2)} €</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                              order.orderStatus === "pending" ? "bg-yellow-100 text-yellow-800" :
                              order.orderStatus === "processing" ? "bg-blue-100 text-blue-800" :
                              order.orderStatus === "shipped" ? "bg-purple-100 text-purple-800" :
                              order.orderStatus === "delivered" ? "bg-green-100 text-green-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {order.orderStatus === "pending" ? "En attente" : 
                               order.orderStatus === "processing" ? "En traitement" : 
                               order.orderStatus === "shipped" ? "Expédiée" : 
                               order.orderStatus === "delivered" ? "Livrée" : 
                               order.orderStatus}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {order.items.map((item: any) => (
                            <div key={item._id} className="flex justify-between items-center text-sm">
                              <span className="font-medium">{item.quantity}x {item.name}</span>
                              <span className="text-brand-graphite">{(item.priceAtTime / 100).toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </AuthGuard>
  );
}
