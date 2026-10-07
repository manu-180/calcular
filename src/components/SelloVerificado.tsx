import type { ReactNode } from "react";
import Link from "next/link";
import { FirmaAutor } from "@/components/FirmaAutor";
import { fechaLargaNovedad } from "@/lib/novedades";

export type Fuente = { nombre: string; url: string };

// Las páginas pasan la fecha como la tiene su archivo de datos: unas en ISO ("2026-08-01"), otras
// ya escritas. Un "Verificado el 2026-08-01" se lee como un log, no como una fecha.
function fechaLegible(fecha: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(fecha) ? fechaLargaNovedad(fecha) : fecha;
}

function LinkNovedades({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/novedades"
      prefetch={false}
      className={`font-medium underline underline-offset-2 transition-colors duration-150 ${className}`}
    >
      novedades
    </Link>
  );
}

function MarcaVerificado({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 2.6l7.2 2.7v6c0 4.6-3 8.3-7.2 10.1C7.8 19.6 4.8 15.9 4.8 11.3v-6L12 2.6z"
        fill="currentColor"
        fillOpacity="0.13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 11.9l2.3 2.3 4.3-4.6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconoLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M6.5 3.5H4A1.5 1.5 0 002.5 5v7A1.5 1.5 0 004 13.5h7a1.5 1.5 0 001.5-1.5V9.5M9 2.5h4.5V7M13 3l-6 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Sello de verificación: va arriba del pliegue, debajo del H1. Hace visible lo único
 * que separa a este sitio de un blog — que el número salió de un documento oficial, con
 * fecha. Si no hay fuente con URL, no se pone el sello: sería decorativo.
 */
export function SelloVerificado({
  verificadoEl,
  fuente,
  norma,
}: {
  verificadoEl: string;
  fuente: Fuente;
  norma?: string;
}) {
  return (
    <div className="group/sello relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-white to-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)] sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100 transition-transform duration-300 ease-out group-hover/sello:scale-105">
            <MarcaVerificado className="size-6" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold leading-tight text-emerald-900">
              Verificado el {fechaLegible(verificadoEl)}
            </p>
            <p className="mt-0.5 text-[12px] leading-tight text-emerald-800/70">
              contra el documento oficial{norma ? ` · ${norma}` : ""}
            </p>
          </div>
        </div>

        <div className="min-w-0 sm:ml-auto sm:max-w-[22rem] sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700/70">
            Fuente
          </p>
          <a
            href={fuente.url}
            target="_blank"
            rel="nofollow noopener"
            className="mt-0.5 inline-flex items-baseline gap-1.5 rounded text-[13px] font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-2 outline-none transition-colors duration-150 hover:text-emerald-900 hover:decoration-emerald-500"
          >
            <span className="line-clamp-2">{fuente.nombre}</span>
            <IconoLink className="size-3 shrink-0 translate-y-px opacity-60" />
          </a>
        </div>
      </div>
      <p className="mt-3 flex items-start gap-2 border-t border-emerald-200/60 pt-2.5 text-[12px] leading-snug text-emerald-900/70">
        <span aria-hidden className="mt-[3px] grid size-3 shrink-0 place-items-center rounded-full bg-emerald-500/15">
          <span className="size-1 rounded-full bg-emerald-500" />
        </span>
        <span>
          Si el dato oficial cambia, lo actualizamos y queda anotado en{" "}
          <LinkNovedades className="text-emerald-800 decoration-emerald-300 hover:text-emerald-950 hover:decoration-emerald-500" />.
        </span>
      </p>
    </div>
  );
}

/**
 * Lista de fuentes al pie de una página de datos. Es el par del sello: el sello dice
 * "está verificado", esto dice contra qué exactamente.
 */
export function FuentesOficiales({
  fuentes,
  verificadoEl,
  children,
}: {
  fuentes: Fuente[];
  verificadoEl?: string;
  children?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center gap-2">
        <MarcaVerificado className="size-4 text-emerald-600" />
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
      </div>
      <ul className="mt-3 space-y-2">
        {fuentes.map((f) => (
          <li key={f.url}>
            <a
              href={f.url}
              target="_blank"
              rel="nofollow noopener"
              className="group/f flex items-baseline gap-2 rounded text-sm text-zinc-600 outline-none transition-colors duration-150 hover:text-emerald-800"
            >
              <span
                aria-hidden
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400 transition-transform duration-200 group-hover/f:scale-150"
              />
              <span className="underline decoration-zinc-300 underline-offset-2 transition-colors group-hover/f:decoration-emerald-400">
                {f.nombre}
              </span>
              <IconoLink className="size-3 shrink-0 translate-y-px opacity-0 transition-opacity duration-150 group-hover/f:opacity-60" />
            </a>
          </li>
        ))}
      </ul>
      {verificadoEl && (
        <p className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-500">
          Última verificación: <strong className="font-medium text-zinc-700">{fechaLegible(verificadoEl)}</strong>
          . Si un número no está en el documento oficial, no se publica, y cada cambio queda anotado en{" "}
          <LinkNovedades className="text-zinc-700 decoration-zinc-300 hover:text-emerald-700" />. <FirmaAutor />.
        </p>
      )}
      {children && <div className="mt-3 text-xs text-zinc-500">{children}</div>}
    </section>
  );
}
