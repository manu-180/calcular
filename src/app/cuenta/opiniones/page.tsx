import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { clienteDelPedido, usuarioActual } from "@/lib/auth/sesion";
import { Etiqueta } from "@/components/cuenta/MarcoAuth";
import { Opiniones } from "@/components/opiniones/Opiniones";
import { tituloDeRuta } from "@/data/navegacion";
import { rutaDeOrigen, type Opinion } from "@/lib/opiniones";

export const metadata: Metadata = {
  title: "Tus opiniones",
  robots: { index: false, follow: false },
};

type SP = Record<string, string | string[] | undefined>;

async function historial(): Promise<{ opiniones: Opinion[]; error: boolean }> {
  const supabase = await clienteDelPedido();
  if (!supabase) return { opiniones: [], error: true };
  const { data, error } = await supabase
    .from("ca_opiniones")
    .select("id, tipo, mensaje, desde, estado, created_at")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) {
    console.error("[opiniones] no pude leer el historial:", error.code, error.message);
    return { opiniones: [], error: true };
  }
  return { opiniones: (data ?? []) as Opinion[], error: false };
}

export default async function OpinionesPage({ searchParams }: { searchParams: Promise<SP> }) {
  // El historial sale junto con getUser (mismo JWT, RLS filtra por auth.uid()): un viaje de
  // espera en vez de dos. Si getUser no confirma la sesión, lo leído no se muestra.
  const [usuario, sp, { opiniones, error }] = await Promise.all([usuarioActual(), searchParams, historial()]);
  const desde = rutaDeOrigen(sp.desde);
  if (!usuario) redirect(`/login?next=${encodeURIComponent(`/cuenta/opiniones${desde ? `?desde=${desde}` : ""}`)}`);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-8 sm:pt-4">
      <header className="animate-[ca-col_0.5s_var(--ease-fluid)_backwards]">
        <Link
          href="/cuenta"
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M16 10H5M9 5.5 4.5 10 9 14.5" />
          </svg>
          Mi cuenta
        </Link>
        <div>
          <Etiqueta>Opiniones</Etiqueta>
        </div>
        <h1 className="mt-4 text-[1.9rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-[2.4rem]">
          ¿Qué mejorarías de CalculAR?
        </h1>
        <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-zinc-600">
          Una idea, algo que anda mal o lo que quieras contarnos. Las leemos todas y nos ayudan a decidir qué hacer primero.
        </p>
      </header>

      <Opiniones
        historial={opiniones}
        errorHistorial={error}
        desde={desde}
        tituloDesde={desde ? tituloDeRuta(desde) : null}
        ahora={Date.now()}
      />
    </div>
  );
}
