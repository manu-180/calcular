import Link from "next/link";
import { Suspense } from "react";
import { contarNuevas } from "@/app/(ar)/dashboard/opiniones/datos";

async function Contador({ demo }: { demo: string | null }) {
  let n: number;
  if (demo) n = demo === "vacio" ? 0 : 2;
  else {
    try {
      n = await contarNuevas();
    } catch (e) {
      console.error("[dashboard] no pude contar las opiniones nuevas", e);
      return null;
    }
  }
  if (n === 0) return <span className="text-zinc-500">sin nuevas</span>;
  return (
    <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-zinc-900 px-2 py-0.5 text-xs font-semibold tabular-nums text-white">
      {n} {n === 1 ? "nueva" : "nuevas"}
    </span>
  );
}

// El enlace se pinta enseguida y sólo el número llega después: así el panel no salta cuando
// termina la cuenta.
export function EnlaceOpiniones({ demo }: { demo: string | null }) {
  return (
    <div className="mx-auto mb-6 flex w-full justify-end gap-2 lg:ml-[calc(50%_-_min(35rem,_50vw_-_1.5rem))] lg:w-[min(70rem,_calc(100vw_-_3rem))]">
      <Link
        href={demo ? `/dashboard/paises?demo=${demo}` : "/dashboard/paises"}
        className="group inline-flex h-10 items-center gap-2 rounded-full bg-zinc-900 pl-3.5 pr-3 text-sm font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.12),0_6px_16px_-8px_rgba(0,0,0,0.4)] transition-[transform,background-color] duration-200 ease-[var(--ease-snappy)] hover:-translate-y-px hover:bg-zinc-800 active:translate-y-0 active:scale-[0.98]"
      >
        <svg className="size-4 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5s1.1-6.1 3.4-8.5z" />
        </svg>
        Países
        <svg className="size-4 text-zinc-400 transition-transform duration-200 ease-[var(--ease-snappy)] group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
        </svg>
      </Link>
      <Link
        href={demo ? `/dashboard/opiniones?demo=${demo}` : "/dashboard/opiniones"}
        className="group inline-flex h-10 items-center gap-2.5 rounded-full border border-zinc-200 bg-white pl-4 pr-3 text-sm font-medium text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-[border-color,transform] duration-200 ease-[var(--ease-snappy)] hover:-translate-y-px hover:border-zinc-300 active:translate-y-0"
      >
        Opiniones
        <Suspense fallback={<span className="h-5 w-16 animate-pulse rounded-full bg-zinc-900/[0.06] motion-reduce:animate-none" aria-hidden />}>
          <Contador demo={demo} />
        </Suspense>
        <svg className="size-4 text-zinc-400 transition-transform duration-200 ease-[var(--ease-snappy)] group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
        </svg>
      </Link>
    </div>
  );
}
