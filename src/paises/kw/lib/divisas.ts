export const REQUIERE_FX = {
  "kw.fx-usd": "serie",
  "kw.fx-eur": "serie",
  "kw.fx-gbp": "serie",
  "kw.fx-sar": "serie",
  "kw.fx-aed": "serie",
  "kw.fx-inr": "serie",
  "kw.fx-egp": "serie",
  "kw.fx-pkr": "serie",
  "kw.fx-bdt": "serie",
  "kw.fx-lkr": "serie",
} as const;

export type Divisa = "usd" | "eur" | "gbp" | "sar" | "aed" | "inr" | "egp" | "pkr" | "bdt" | "lkr";

export const OPCIONES_DIVISA = [
  { valor: "usd", etiqueta: "US dollar (USD)" },
  { valor: "eur", etiqueta: "Euro (EUR)" },
  { valor: "gbp", etiqueta: "Pound sterling (GBP)" },
  { valor: "sar", etiqueta: "Saudi riyal (SAR)" },
  { valor: "aed", etiqueta: "UAE dirham (AED)" },
  { valor: "inr", etiqueta: "Indian rupee (INR)" },
  { valor: "egp", etiqueta: "Egyptian pound (EGP)" },
  { valor: "pkr", etiqueta: "Pakistani rupee (PKR)" },
  { valor: "bdt", etiqueta: "Bangladeshi taka (BDT)" },
  { valor: "lkr", etiqueta: "Sri Lankan rupee (LKR)" },
] as const;

type Punto = { fecha: string; valor: number };

export function tasa(v: Readonly<Record<`kw.fx-${Divisa}`, Punto>>, d: Divisa): Punto {
  return v[`kw.fx-${d}`];
}

export function codigo(d: Divisa): string {
  return d.toUpperCase();
}
