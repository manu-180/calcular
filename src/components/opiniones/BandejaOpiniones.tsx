"use client";

import Link from "next/link";
import { useOptimistic, useState, useTransition } from "react";
import { marcarOpinion } from "@/app/dashboard/opiniones/acciones";
import type { BandejaDatos, Filtro } from "@/app/dashboard/opiniones/datos";
import { Aviso } from "@/components/cuenta/Campos";
import { fechaYHora, hrefInterno } from "@/lib/panel/formato";
import type { EstadoOpinion, OpinionAdmin } from "@/lib/opiniones";
import { ChipTipo, EstadoMarca } from "./piezas";

const PESTANAS: { filtro: Filtro; texto: string; estado: EstadoOpinion | null }[] = [
  { filtro: "nuevas", texto: "Nuevas", estado: "nueva" },
  { filtro: "leidas", texto: "Leídas", estado: "leida" },
  { filtro: "resueltas", texto: "Resueltas", estado: "resuelta" },
  { filtro: "todas", texto: "Todas", estado: null },
];

const ACCIONES: Record<EstadoOpinion, { a: EstadoOpinion; texto: string; principal?: boolean }[]> = {
  nueva: [
    { a: "leida", texto: "Marcar leída", principal: true },
    { a: "resuelta", texto: "Ya está resuelta" },
  ],
  leida: [
    { a: "resuelta", texto: "Marcar resuelta", principal: true },
    { a: "nueva", texto: "Volver a nueva" },
  ],
  resuelta: [{ a: "leida", texto: "Reabrir" }],
};

const VACIO: Record<Filtro, string> = {
  nuevas: "No hay opiniones nuevas. Cuando alguien escriba, aparece acá y te llega un mail.",
  leidas: "No hay opiniones leídas pendientes.",
  resueltas: "Todavía no marcaste ninguna como resuelta.",
  todas: "Todavía nadie dejó una opinión.",
};

type Cambio = { id: string; estado: EstadoOpinion };

export function BandejaOpiniones({
  inicial,
  filtro,
  demo,
  ahora,
}: {
  inicial: BandejaDatos;
  filtro: Filtro;
  demo: string | null;
  ahora: number;
}) {
  // En la demo no hay servidor que guarde: los cambios quedan en memoria de la pestaña.
  const [locales, setLocales] = useState<Record<string, EstadoOpinion>>({});
  const [adelantados, adelantar] = useOptimistic(locales, (actual, c: Cambio) => ({ ...actual, [c.id]: c.estado }));
  const [, empezar] = useTransition();
  const [fallo, setFallo] = useState(false);

  const estadoDe = (o: OpinionAdmin) => adelantados[o.id] ?? o.estado;
  const pestana = PESTANAS.find((p) => p.filtro === filtro)!;
  const visibles = inicial.opiniones.filter((o) => !pestana.estado || estadoDe(o) === pestana.estado);

  const cuentas = { ...inicial.cuentas };
  for (const o of inicial.opiniones) {
    const nuevo = adelantados[o.id];
    if (nuevo && nuevo !== o.estado) {
      cuentas[o.estado]--;
      cuentas[nuevo]++;
    }
  }

  function marcar(id: string, estado: EstadoOpinion) {
    setFallo(false);
    if (demo) {
      setLocales((l) => ({ ...l, [id]: estado }));
      return;
    }
    empezar(async () => {
      adelantar({ id, estado });
      const r = await marcarOpinion(id, estado);
      if (!r.ok) setFallo(true);
    });
  }

  const conDemo = (href: string) => (demo ? `${href}${href.includes("?") ? "&" : "?"}demo=${demo}` : href);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-8 sm:pt-4">
      <header className="animate-[ca-col_0.5s_var(--ease-fluid)_backwards] space-y-5">
        <Link
          href={conDemo("/dashboard")}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M16 10H5M9 5.5 4.5 10 9 14.5" />
          </svg>
          Panel
        </Link>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-zinc-900/[0.05] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-600">
              Panel privado
            </span>
            {demo ? (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-900">
                {demo === "vacio" ? "Demo sin datos" : "Datos de ejemplo"}
              </span>
            ) : null}
          </div>
          <h1 className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-zinc-900 sm:text-4xl">Opiniones</h1>
          <p className="mt-1.5 text-[15px] text-zinc-600">Lo que nos escriben las personas con cuenta.</p>
        </div>

        <nav aria-label="Filtrar opiniones" className="-mx-1 overflow-x-auto px-1 pb-1">
          <ul className="inline-flex gap-1 rounded-full bg-zinc-900/[0.045] p-1 ring-1 ring-inset ring-zinc-900/[0.05]">
            {PESTANAS.map((p) => {
              const activa = p.filtro === filtro;
              const n = p.estado ? cuentas[p.estado] : cuentas.nueva + cuentas.leida + cuentas.resuelta;
              return (
                <li key={p.filtro}>
                  <Link
                    href={conDemo(p.filtro === "nuevas" ? "/dashboard/opiniones" : `/dashboard/opiniones?ver=${p.filtro}`)}
                    aria-current={activa ? "page" : undefined}
                    className={`inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-3.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-200 ease-[var(--ease-snappy)] ${
                      activa ? "bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_10px_-6px_rgba(0,0,0,0.18)]" : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    {p.texto}
                    <span className={`tabular-nums text-xs ${activa ? "text-zinc-500" : "text-zinc-400"}`}>{n}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {fallo ? <Aviso tono="error">No se guardó el cambio. Probá de nuevo.</Aviso> : null}

      {visibles.length === 0 ? (
        <div className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-inset ring-zinc-900/[0.055]">
          <p className="rounded-[1.375rem] bg-white px-6 py-12 text-center text-sm text-zinc-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.05)]">
            {VACIO[filtro]}
          </p>
        </div>
      ) : (
        <ol className="space-y-3">
          {visibles.map((o, i) => {
            const estado = estadoDe(o);
            const href = hrefInterno(o.desde);
            return (
              <li
                key={o.id}
                className="animate-[ca-col_0.55s_var(--ease-fluid)_backwards] rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-inset ring-zinc-900/[0.055]"
                style={{ animationDelay: `${60 + Math.min(i, 6) * 50}ms` }}
              >
                <article className="rounded-[1.375rem] bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_-14px_rgba(0,0,0,0.16)] sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <ChipTipo tipo={o.tipo} />
                    <EstadoMarca estado={estado} admin />
                    <span className="ml-auto text-xs tabular-nums text-zinc-500">{fechaYHora(o.created_at, ahora)}</span>
                  </div>
                  <p className="mt-3 whitespace-pre-line break-words text-[15px] leading-relaxed text-zinc-900">{o.mensaje}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-zinc-500">
                    {o.email ? (
                      <a
                        href={`mailto:${o.email}?subject=${encodeURIComponent("Tu opinión en CalculAR")}`}
                        className="break-all font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-700"
                      >
                        {o.email}
                      </a>
                    ) : (
                      <span>Cuenta sin mail</span>
                    )}
                    {href ? (
                      <a href={href} target="_blank" rel="noopener" className="underline decoration-zinc-300 underline-offset-4 hover:text-zinc-800 hover:decoration-zinc-700">
                        Desde {o.desde}
                      </a>
                    ) : null}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-100 pt-4">
                    {ACCIONES[estado].map((a) => (
                      <button
                        key={a.a}
                        type="button"
                        onClick={() => marcar(o.id, a.a)}
                        className={
                          a.principal
                            ? "inline-flex h-10 cursor-pointer items-center rounded-full bg-zinc-900 px-4 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform] duration-200 ease-[var(--ease-snappy)] hover:-translate-y-px hover:bg-zinc-800 active:translate-y-0 active:scale-[0.98]"
                            : "inline-flex h-10 cursor-pointer items-center rounded-full border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-800 transition-[border-color,transform] duration-200 ease-[var(--ease-snappy)] hover:-translate-y-px hover:border-zinc-400 active:translate-y-0 active:scale-[0.98]"
                        }
                      >
                        {a.texto}
                      </button>
                    ))}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      )}
      {inicial.opiniones.length >= 100 ? <p className="text-center text-xs text-zinc-500">Se muestran las 100 más recientes.</p> : null}
    </div>
  );
}
