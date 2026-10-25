import type { ReactNode } from "react";
import { Bandera } from "@/motor/ui/Bandera";
import { mercadoMedido } from "@/lib/medicion/mercados";
import type { Sitio } from "@/lib/panel/tipos";
import { nombreMercado } from "../paises";
import { TARJETA } from "../ui";

export const NOMBRE_CANAL: Record<string, string> = {
  whatsapp: "WhatsApp",
  nativo: "Menú del celular",
  copiar: "Copiar el link",
  link: "Botón de calcular.ar",
  x: "X",
  telegram: "Telegram",
  linkedin: "LinkedIn",
  otro: "Sin dato",
};

export const NOMBRE_ORIGEN: Record<string, string> = {
  calculadora: "Resultado de una calculadora",
  mundo: "Tu sueldo en el mundo",
  duelo: "Duelo de sueldos",
  ranking: "Ranking de países",
  horas: "Horas de trabajo",
  sueldos: "Sueldos reales",
  calendario: "Calendario",
  otro: "Sin dato",
};

export const NOMBRE_SITIO: Record<Sitio, string> = { ar: "calcular.ar", intl: "calcularya.com" };

export const canal = (c: string) => NOMBRE_CANAL[c] ?? c;
export const origen = (o: string) => NOMBRE_ORIGEN[o] ?? o;

export function paisDeMercado(m: string): string | null {
  if (m === "ar") return "AR";
  if (m === "global") return null;
  return mercadoMedido(m)?.pais ?? m.slice(0, 2).toUpperCase();
}

export function Pais({ mercado, nombre = true }: { mercado: string; nombre?: boolean }) {
  const pais = paisDeMercado(mercado);
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      {pais ? (
        <span className="relative inline-block h-[11px] w-4 shrink-0 overflow-hidden rounded-[2px]">
          <Bandera pais={pais} ancho={16} className="absolute inset-0 h-full w-full object-cover ring-1 ring-zinc-900/10" />
        </span>
      ) : (
        <span aria-hidden className="inline-block h-[11px] w-4 shrink-0 rounded-[2px] bg-zinc-200" />
      )}
      {nombre ? <span className="truncate">{mercado === "global" ? "Global" : nombreMercado(mercado)}</span> : null}
    </span>
  );
}

// Cada bloque dice qué mide en una línea: el panel lo lee Manuel, no un analista.
export function Bloque({
  titulo,
  significa,
  children,
  className = "",
  acciones,
  id,
}: {
  titulo: string;
  significa: ReactNode;
  children: ReactNode;
  className?: string;
  acciones?: ReactNode;
  id?: string;
}) {
  return (
    <div className={`${TARJETA} p-5 ${className}`} id={id}>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-zinc-900">{titulo}</h3>
          <p className="mt-0.5 max-w-[60ch] text-xs leading-relaxed text-zinc-600">{significa}</p>
        </div>
        {acciones}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

// Estado vacío con forma: dice qué va a aparecer y por qué todavía no hay nada.
export function VacioBoca({ titulo, children, icono }: { titulo: string; children: ReactNode; icono?: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-zinc-50/80 px-4 py-4 ring-1 ring-inset ring-zinc-900/[0.05]">
      {icono ? (
        <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-zinc-600 ring-1 ring-zinc-900/[0.07]">
          {icono}
        </span>
      ) : null}
      <div className="min-w-0 pt-0.5">
        <p className="text-sm font-medium text-zinc-800">{titulo}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-zinc-600">{children}</p>
      </div>
    </div>
  );
}

export function Cifra({ valor, etiqueta, nota }: { valor: ReactNode; etiqueta: string; nota?: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-zinc-600">{etiqueta}</p>
      <p className="mt-1 text-2xl font-semibold tracking-[-0.02em] tabular-nums text-zinc-900">{valor}</p>
      {nota ? <p className="mt-0.5 text-xs text-zinc-600">{nota}</p> : null}
    </div>
  );
}
