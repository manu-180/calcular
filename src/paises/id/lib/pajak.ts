import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export type StatusPtkp = "tk0" | "tk1" | "tk2" | "tk3" | "k0" | "k1" | "k2" | "k3";

export const OPCIONES_STATUS = [
  { valor: "tk0", etiqueta: "TK/0 (tidak kawin, tanpa tanggungan)" },
  { valor: "tk1", etiqueta: "TK/1 (tidak kawin, 1 tanggungan)" },
  { valor: "tk2", etiqueta: "TK/2 (tidak kawin, 2 tanggungan)" },
  { valor: "tk3", etiqueta: "TK/3 (tidak kawin, 3 tanggungan)" },
  { valor: "k0", etiqueta: "K/0 (kawin, tanpa tanggungan)" },
  { valor: "k1", etiqueta: "K/1 (kawin, 1 tanggungan)" },
  { valor: "k2", etiqueta: "K/2 (kawin, 2 tanggungan)" },
  { valor: "k3", etiqueta: "K/3 (kawin, 3 tanggungan)" },
] as const satisfies readonly { valor: StatusPtkp; etiqueta: string }[];

export const REQUIERE_PTKP = {
  "id.ptkp-diri": "numero",
  "id.ptkp-kawin": "numero",
  "id.ptkp-tanggungan": "numero",
  "id.ptkp-tanggungan-maks": "numero",
} as const;

export const REQUIERE_TER = {
  "id.ter-kategori-a": "escala",
  "id.ter-kategori-b": "escala",
  "id.ter-kategori-c": "escala",
} as const;

export interface ValoresPtkp {
  "id.ptkp-diri": number;
  "id.ptkp-kawin": number;
  "id.ptkp-tanggungan": number;
  "id.ptkp-tanggungan-maks": number;
}

export interface ValoresTer {
  "id.ter-kategori-a": readonly FilaEscala[];
  "id.ter-kategori-b": readonly FilaEscala[];
  "id.ter-kategori-c": readonly FilaEscala[];
}

function partes(status: StatusPtkp): { kawin: boolean; tanggungan: number } {
  return { kawin: status.startsWith("k"), tanggungan: Number(status.slice(-1)) };
}

export function ptkpSetahun(status: StatusPtkp, v: ValoresPtkp): number {
  const { kawin, tanggungan } = partes(status);
  const t = Math.min(tanggungan, v["id.ptkp-tanggungan-maks"]);
  return v["id.ptkp-diri"] + (kawin ? v["id.ptkp-kawin"] : 0) + t * v["id.ptkp-tanggungan"];
}

// PP 58/2023 Pasal 2 ayat (4): A para TK/0, TK/1 y K/0; B para TK/2, TK/3, K/1 y K/2; C para K/3.
export function kategoriTer(status: StatusPtkp): "A" | "B" | "C" {
  if (status === "tk0" || status === "tk1" || status === "k0") return "A";
  if (status === "k3") return "C";
  return "B";
}

// La TER no es marginal: la tasa de la fila que contiene el bruto se aplica sobre todo el bruto.
// Cada fila cubre "di atas desde sampai dengan hasta".
export function tarifTer(status: StatusPtkp, bruto: number, v: ValoresTer): number {
  const k = kategoriTer(status);
  const escala = k === "A" ? v["id.ter-kategori-a"] : k === "B" ? v["id.ter-kategori-b"] : v["id.ter-kategori-c"];
  for (const f of escala) if (f.hasta === null || bruto <= f.hasta) return f.tasa;
  return escala[escala.length - 1].tasa;
}

// PMK 168/2023 Pasal 8 ayat (4): el PKP se redondea hacia abajo a miles de rupias.
export function bulatkanRibuan(n: number): number {
  return n <= 0 ? 0 : Math.floor(n / 1000) * 1000;
}

export function pph17(escala: readonly FilaEscala[], pkp: number): number {
  return aplicarEscalaMarginal(escala, pkp);
}

export function biayaJabatanSetahun(bruto: number, tarif: number, maks: number): number {
  return Math.min(porcentaje(bruto, tarif), maks);
}
