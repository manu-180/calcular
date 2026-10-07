import type { ReactNode } from "react";
import { NOMBRE_ESTADO, NOMBRE_TIPO, type EstadoOpinion, type TipoOpinion } from "@/lib/opiniones";

const TRAZOS: Record<TipoOpinion, ReactNode> = {
  idea: <path d="M10 2.75a5 5 0 0 0-3 9v1.75h6v-1.75a5 5 0 0 0-3-9ZM8 16.25h4M8.75 13.5v-2.25M11.25 13.5v-2.25" />,
  error: <path d="M10 3.25 2.75 16h14.5L10 3.25ZM10 8v3.5M10 13.75h.01" />,
  otra: <path d="M4 4.5h12v8.25H8.5L5 15.5v-2.75H4V4.5ZM7.25 8.5h5.5M7.25 10.75h3.5" />,
};

export function IconoTipo({ tipo, className = "size-5" }: { tipo: TipoOpinion; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {TRAZOS[tipo]}
    </svg>
  );
}

const TONO_TIPO: Record<TipoOpinion, string> = {
  idea: "bg-amber-50 text-amber-900 ring-amber-700/15",
  error: "bg-rose-50 text-rose-800 ring-rose-700/15",
  otra: "bg-zinc-100 text-zinc-700 ring-zinc-900/[0.06]",
};

export function ChipTipo({ tipo }: { tipo: TipoOpinion }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full py-0.5 pl-1.5 pr-2.5 text-xs font-medium ring-1 ring-inset ${TONO_TIPO[tipo]}`}>
      <IconoTipo tipo={tipo} className="size-3.5" />
      {NOMBRE_TIPO[tipo]}
    </span>
  );
}

const TONO_ESTADO: Record<EstadoOpinion | "enviando", { punto: string; texto: string }> = {
  enviando: { punto: "bg-zinc-300 animate-pulse motion-reduce:animate-none", texto: "text-zinc-500" },
  nueva: { punto: "bg-zinc-400", texto: "text-zinc-600" },
  leida: { punto: "bg-sky-500", texto: "text-sky-800" },
  resuelta: { punto: "bg-emerald-500", texto: "text-emerald-800" },
};

export function EstadoMarca({ estado, admin = false }: { estado: EstadoOpinion | "enviando"; admin?: boolean }) {
  const t = TONO_ESTADO[estado];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${t.texto}`}>
      <span aria-hidden className={`size-1.5 rounded-full ${t.punto}`} />
      {estado === "enviando" ? "Enviando…" : admin && estado === "nueva" ? "Nueva" : NOMBRE_ESTADO[estado]}
    </span>
  );
}
