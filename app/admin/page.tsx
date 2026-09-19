"use client";

import { Loader2, LayoutDashboard, PackageSearch, Users, Tags } from "lucide-react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminPage() {
  const products = useQuery(api.products.getProducts);
  const orders = useQuery(api.orders.getAllOrders) || [];
  const updateOrderStatus = useMutation(api.orders.updateOrderStatus);

  if (products === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-white">
        <Loader2 className="animate-spin text-brand-blue" size={48} />
      </div>
    );
  }

  return (
    <AuthGuard requireAdmin>
      <div className="min-h-screen flex flex-col md:flex-row bg-brand-white">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-black text-brand-white p-6 pt-24 md:min-h-screen flex flex-col">
        <h2 className="text-xl font-bold mb-10 tracking-wider">ADMIN <span className="text-brand-blue">PANEL</span></h2>
        
        <nav className="space-y-2 flex-grow">
          <Link href="/admin" className="flex items-center gap-3 p-3 bg-brand-graphite rounded-xl transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 p-3 hover:bg-brand-graphite rounded-xl transition-colors text-brand-gray hover:text-brand-white">
            <PackageSearch size={20} />
            <span className="font-medium">Produits</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 p-3 hover:bg-brand-graphite rounded-xl transition-colors text-brand-gray hover:text-brand-white">
            <Tags size={20} />
            <span className="font-medium">Commandes</span>
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 p-3 hover:bg-brand-graphite rounded-xl transition-colors text-brand-gray hover:text-brand-white">
            <Users size={20} />
            <span className="font-medium">Clients</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 pt-24">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-brand-black">Vue d'ensemble</h1>
          <p className="text-brand-graphite">Gérez votre boutique Nestcase.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stats Cards */}
          <div className="bg-brand-gray/30 p-6 rounded-2xl border border-brand-gray">
            <h3 className="text-sm font-semibold text-brand-graphite uppercase tracking-wider mb-2">Chiffre d'Affaires</h3>
            <p className="text-3xl font-black text-brand-black">
              {orders ? (orders.reduce((acc: number, order: any) => acc + (order.paymentStatus === 'paid' ? order.total : 0), 0) / 100).toFixed(2) : 0} €
            </p>
          </div>
          <div className="bg-brand-gray/30 p-6 rounded-2xl border border-brand-gray">
            <h3 className="text-sm font-semibold text-brand-graphite uppercase tracking-wider mb-2">Commandes</h3>
            <p className="text-3xl font-black text-brand-black">{orders?.length || 0}</p>
          </div>
          <div className="bg-brand-gray/30 p-6 rounded-2xl border border-brand-gray">
            <h3 className="text-sm font-semibold text-brand-graphite uppercase tracking-wider mb-2">Produits Actifs</h3>
            <p className="text-3xl font-black text-brand-black">{products?.length || 0}</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-brand-white border border-brand-gray rounded-3xl overflow-hidden shadow-sm mb-12">
          <div className="p-6 border-b border-brand-gray flex justify-between items-center">
            <h2 className="text-xl font-bold">Dernières Commandes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-gray/30 text-brand-graphite text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Numéro</th>
                  <th className="p-4 font-semibold">Client</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray">
                {orders?.map((order: any) => (
                  <tr key={order._id} className="hover:bg-brand-gray/10 transition-colors">
                    <td className="p-4 font-medium text-brand-black">{order.orderNumber}</td>
                    <td className="p-4">{order.shippingAddress?.name}</td>
                    <td className="p-4">{new Date(order.createdAt).toLocaleDateString("fr-FR")}</td>
                    <td className="p-4 font-semibold">{(order.total / 100).toFixed(2)} €</td>
                    <td className="p-4">
                      <select
                        className="bg-brand-gray/20 border border-brand-gray rounded-lg px-2 py-1 text-sm outline-none cursor-pointer"
                        value={order.orderStatus}
                        onChange={(e) => {
                          updateOrderStatus({
                            orderId: order._id,
                            orderStatus: e.target.value as any
                          });
                        }}
                      >
                        <option value="pending">En attente</option>
                        <option value="processing">En traitement</option>
                        <option value="shipped">Expédiée</option>
                        <option value="delivered">Livrée</option>
                        <option value="cancelled">Annulée</option>
                        <option value="refunded">Remboursée</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {orders?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-brand-graphite">Aucune commande pour le moment.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-brand-white border border-brand-gray rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-brand-gray flex justify-between items-center">
            <h2 className="text-xl font-bold">Catalogue</h2>
            <button className="px-4 py-2 bg-brand-black text-brand-white text-sm font-bold rounded-lg hover:bg-brand-graphite">
              + Nouveau Produit
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-gray/30 text-brand-graphite text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Produit</th>
                  <th className="p-4 font-semibold">Prix</th>
                  <th className="p-4 font-semibold">Stock</th>
                  <th className="p-4 font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray">
                {products?.map((product) => (
                  <tr key={product._id} className="hover:bg-brand-gray/10 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                      <span className="font-medium text-brand-black">{product.name}</span>
                    </td>
                    <td className="p-4 font-semibold">{(product.price / 100).toFixed(2)} €</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">
                      {product.stock > 0 ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">En stock</span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">Rupture</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
      </div>
    </AuthGuard>
  );
}
