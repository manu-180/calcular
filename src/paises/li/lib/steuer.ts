import { aplicarEscala, enMapa, ErrorEntrada } from "@/motor/calculo";

type Escala = Parameters<typeof aplicarEscala>[0];
type MapaValores = Readonly<Record<string, number>>;

export const TARIFE = [
  { valor: "alleinstehend", etiqueta: "Alleinstehend" },
  { valor: "alleinerziehend", etiqueta: "Alleinerziehend" },
  { valor: "ehegatten", etiqueta: "Verheiratet (gemeinsame Veranlagung)" },
] as const;

export type Tarif = (typeof TARIFE)[number]["valor"];

export const REQ_STEUER = {
  "li.steuertarif-alleinstehend": "escala",
  "li.steuertarif-alleinerziehend": "escala",
  "li.steuertarif-ehegatten": "escala",
  "li.gemeindezuschlag": "mapa",
} as const;

export interface Steuer {
  erwerb: number;
  landessteuer: number;
  gemeindesteuer: number;
  total: number;
  grenzsatz: number;
}

export function pruefeZuschlag(zuschlag: number, spanne: MapaValores): void {
  const min = enMapa(spanne, "min");
  const max = enMapa(spanne, "max");
  if (zuschlag < min || zuschlag > max) throw new ErrorEntrada(`Der Gemeindezuschlag liegt zwischen ${min} und ${max} %.`, "zuschlag");
}

export function steuer(erwerbRoh: number, escala: Escala, zuschlag: number, redondear: (n: number) => number): Steuer {
  // Art. 18 Abs. 1 SteG: Erwerbsbeträge werden auf zehn Franken abgerundet.
  const erwerb = Math.floor(Math.max(erwerbRoh, 0) / 10) * 10;
  const landessteuer = redondear(Math.max(aplicarEscala(escala, erwerb), 0));
  const gemeindesteuer = redondear((landessteuer * zuschlag) / 100);
  const stufe = [...escala].reverse().find((s) => erwerb > s.desde);
  return {
    erwerb,
    landessteuer,
    gemeindesteuer,
    total: redondear(landessteuer + gemeindesteuer),
    grenzsatz: landessteuer > 0 && stufe ? stufe.tasa * (1 + zuschlag / 100) : 0,
  };
}

export function escalaFuer<T extends Record<keyof typeof REQ_STEUER, unknown>>(tarif: Tarif, v: T): Escala {
  const e = tarif === "alleinerziehend" ? v["li.steuertarif-alleinerziehend"] : tarif === "ehegatten" ? v["li.steuertarif-ehegatten"] : v["li.steuertarif-alleinstehend"];
  return e as Escala;
}
