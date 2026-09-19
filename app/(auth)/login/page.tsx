"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signIn, signOut } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Force la suppression des cookies côté client immédiatement
    if (typeof document !== "undefined") {
      document.cookie = "convex_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "convex_refresh_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    // Nettoyage automatique via l'API pour être sûr
    signOut().catch(() => {});
  }, [signOut]);


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    try {
      await signIn("password", { email: normalizedEmail, password, flow: "signIn" });
      router.push("/account");
    } catch (err: any) {
      console.error("Erreur brute de connexion :", err);
      setError(err.message || "Erreur inconnue lors de la connexion. Vérifiez la console.");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-brand-white px-4">
      <div className="w-full max-w-md bg-brand-white p-8 rounded-3xl border border-brand-gray shadow-sm">
        <h1 className="text-3xl font-black text-brand-black mb-2 text-center">Bon retour</h1>
        <p className="text-brand-graphite mb-8 text-center">Connectez-vous à votre compte Nestcase.</p>
        
        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-graphite mb-2">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors" 
              placeholder="votre@email.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-graphite mb-2">Mot de passe</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-4 py-3 rounded-xl border border-brand-gray focus:outline-none focus:border-brand-black transition-colors" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-4 mt-4 bg-brand-black text-brand-white font-bold rounded-xl hover:bg-brand-graphite transition-colors"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-brand-graphite text-sm">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-brand-black font-semibold hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
