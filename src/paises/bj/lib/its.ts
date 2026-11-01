import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;
type Arrondi = (n: number) => number;

export const REQ_ITS = {
  "bj.its-bareme": "escala",
  "bj.its-redevance-ortb": "mapa",
} as const;

export interface ValeursIts {
  readonly "bj.its-bareme": readonly FilaEscala[];
  readonly "bj.its-redevance-ortb": Mapa;
}

export const OPTIONS_MOIS = [
  { valor: "autre", etiqueta: "Un autre mois" },
  { valor: "mars", etiqueta: "Mars" },
  { valor: "juin", etiqueta: "Juin" },
] as const;

export type Mois = (typeof OPTIONS_MOIS)[number]["valor"];

export interface Its {
  impot: number;
  redevance: number;
  total: number;
}

// Article 125 du CGI : barème progressif sur le salaire mensuel imposable, puis redevance ORTB de
// 1 000 F sur le salaire de mars et de 3 000 F sur celui de juin. Les 3 000 F de juin ne sont pas
// dus si le salaire ne dépasse pas la première tranche du barème.
export function itsMensuel(base: number, mois: Mois, v: ValeursIts, r: Arrondi): Its {
  const bareme = v["bj.its-bareme"];
  const impot = r(aplicarEscalaMarginal(bareme, Math.max(0, base)));
  const premiereTranche = bareme[0].hasta ?? 0;
  const ortb = v["bj.its-redevance-ortb"];
  let redevance = 0;
  if (mois === "mars") redevance = ortb.mars;
  if (mois === "juin" && base > premiereTranche) redevance = ortb.juin;
  return { impot, redevance, total: r(impot + redevance) };
}
