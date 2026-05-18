import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <h1 className="text-2xl font-semibold">Entrar no FollowFlow AI</h1>
        <p className="mt-2 text-sm text-slate-400">Autenticação será conectada ao Supabase Auth neste foundation.</p>
        <form className="mt-8 space-y-4">
          <label className="block text-sm">
            Email
            <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-brand-500" type="email" placeholder="voce@empresa.com" />
          </label>
          <label className="block text-sm">
            Senha
            <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-brand-500" type="password" placeholder="••••••••" />
          </label>
          <Link href="/dashboard" className="block rounded-xl bg-brand-500 px-4 py-3 text-center font-semibold text-white hover:bg-brand-700">
            Acessar ambiente demo
          </Link>
        </form>
      </section>
    </main>
  );
}
