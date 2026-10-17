import { aplicarEscala, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;
type Afronden = (n: number) => number;

export type Statuut = "bediende" | "arbeider";
export type Gezin = "alleenstaand" | "partner-met-inkomen" | "partner-zonder-inkomen";

export const STATUUT_OPCIONES = [
  { valor: "bediende", etiqueta: "Bediende" },
  { valor: "arbeider", etiqueta: "Arbeider" },
] as const;

export const GEZIN_OPCIONES = [
  { valor: "alleenstaand", etiqueta: "Alleenstaand" },
  { valor: "partner-met-inkomen", etiqueta: "Gehuwd of wettelijk samenwonend, partner heeft een eigen beroepsinkomen" },
  { valor: "partner-zonder-inkomen", etiqueta: "Gehuwd of wettelijk samenwonend, partner heeft geen beroepsinkomen" },
] as const;

export const REQ_RSZ = {
  "be.rsz-werknemer": "numero",
  "be.werkbonus": "mapa",
} as const;

export const REQ_BBSZ = {
  "be.bbsz-individueel": "escala",
  "be.bbsz-gemeenschappelijk": "escala",
  "be.bbsz-grenzen": "mapa",
} as const;

export const REQ_BV = {
  "be.bv-schaal": "escala",
  "be.bv-gezin": "mapa",
  "be.bv-kinderen": "mapa",
  "be.bv-werkbonus": "mapa",
} as const;

// Arbeiders worden bij de RSZ aangegeven aan 108 % van hun brutoloon: zo worden de bijdragen op
// het enkel vakantiegeld, dat de RJV of een vakantiefonds betaalt, vooraf geïnd.
export function rszBasis(bruto: number, statuut: Statuut): number {
  return statuut === "arbeider" ? bruto * 1.08 : bruto;
}

export interface Rsz {
  bijdrage: number;
  werkbonusA: number;
  werkbonusB: number;
  werkbonus: number;
  netto: number;
}

function luik(s: number, grens: number, plafond: number, basis: number, helling: number, r: Afronden): number {
  if (s <= grens) return basis;
  if (s > plafond) return 0;
  return Math.max(0, r(basis - helling * (s - grens)));
}

// Sociale werkbonus voor een voltijdse werknemer met een volledige maand prestaties (P = R). Het
// refertemaandloon S is het loon aan 100 %, ook voor arbeiders.
export function rszWerknemer(bruto: number, statuut: Statuut, tarief: number, wb: Mapa, r: Afronden): Rsz {
  const bijdrage = r(porcentaje(rszBasis(bruto, statuut), tarief));
  const arb = statuut === "arbeider";
  let a = luik(bruto, wb["grens-a"], wb["plafond-a"], arb ? wb["basis-a-arbeider"] : wb["basis-a-bediende"], arb ? wb["helling-a-arbeider"] : wb["helling-a-bediende"], r);
  let b = luik(bruto, wb["grens-b"], wb["plafond-b"], arb ? wb["basis-b-arbeider"] : wb["basis-b-bediende"], arb ? wb["helling-b-arbeider"] : wb["helling-b-bediende"], r);
  // De werkbonus mag de persoonlijke bijdrage niet overschrijden; de RSZ topt eerst luik B af en
  // pas daarna luik A.
  let tekort = a + b - bijdrage;
  if (tekort > 0) {
    const vanB = Math.min(b, tekort);
    b = r(b - vanB);
    tekort -= vanB;
    a = r(Math.max(0, a - tekort));
  }
  const werkbonus = r(a + b);
  return { bijdrage, werkbonusA: a, werkbonusB: b, werkbonus, netto: r(bijdrage - werkbonus) };
}

export interface WaardenBbsz {
  readonly "be.bbsz-individueel": readonly FilaEscala[];
  readonly "be.bbsz-gemeenschappelijk": readonly FilaEscala[];
  readonly "be.bbsz-grenzen": Mapa;
}

// Berekend per kwartaal op drie keer het maandloon en dan per maand ingehouden. Bij een vast
// maandloon is dat een derde van het kwartaalbedrag.
export function bbszPerMaand(bruto: number, statuut: Statuut, gezin: Gezin, v: WaardenBbsz, r: Afronden): number {
  const kwartaal = 3 * rszBasis(bruto, statuut);
  const g = v["be.bbsz-grenzen"];
  let bedrag: number;
  if (gezin === "alleenstaand") {
    bedrag = aplicarEscala(v["be.bbsz-individueel"], kwartaal);
  } else if (gezin === "partner-met-inkomen") {
    bedrag =
      kwartaal < g["ondergrens-partner-met-inkomen"]
        ? 0
        : Math.min(Math.max(aplicarEscala(v["be.bbsz-gemeenschappelijk"], kwartaal), g["minimum-partner-met-inkomen"]), g["maximum-partner-met-inkomen"]);
  } else {
    bedrag = kwartaal < g["ondergrens-partner-zonder-inkomen"] ? 0 : Math.min(aplicarEscala(v["be.bbsz-gemeenschappelijk"], kwartaal), g["maximum-partner-zonder-inkomen"]);
  }
  return r(r(bedrag) / 3);
}

export interface WaardenBv {
  readonly "be.bv-schaal": readonly FilaEscala[];
  readonly "be.bv-gezin": Mapa;
  readonly "be.bv-kinderen": Mapa;
  readonly "be.bv-werkbonus": Mapa;
}

export interface Bv {
  brutoJaar: number;
  beroepskosten: number;
  belastbaarJaar: number;
  basisbelasting: number;
  kinderen: number;
  andereLasten: number;
  jaarbelasting: number;
  perMaand: number;
  werkbonusFiscaal: number;
  teBetalen: number;
}

export function kinderVermindering(aantal: number, k: Mapa): number {
  if (aantal <= 0) return 0;
  if (aantal <= 8) return k[String(aantal)];
  return k["8"] + (aantal - 8) * k.extra;
}

// Sleutelformule van de FOD Financiën voor maandelijkse bezoldigingen (nrs. 6 tot 21). Elke stap
// wordt op de cent afgerond, zoals nr. 3 van de sleutelformule voorschrijft.
export function bedrijfsvoorheffing(
  belastbaarMaand: number,
  invoer: { gezin: Gezin; kinderen: number; alleenstaandeOuder: boolean; werkbonusA: number; werkbonusB: number },
  v: WaardenBv,
  r: Afronden,
): Bv {
  const g = v["be.bv-gezin"];
  const schaal = (x: number) => r(aplicarEscala(v["be.bv-schaal"], x));
  const brutoJaar = r(belastbaarMaand * 12);
  const beroepskosten = Math.min(r(porcentaje(brutoJaar, g["forfait-pct"])), g["forfait-max"]);
  const belastbaarJaar = r(brutoJaar - beroepskosten);
  let basisbelasting: number;
  if (invoer.gezin === "partner-zonder-inkomen") {
    const toegekend = r(Math.min(porcentaje(belastbaarJaar, g["hq-pct"]), g["hq-max"]));
    basisbelasting = Math.max(0, r(schaal(belastbaarJaar - toegekend) + schaal(toegekend) - 2 * g["belasting-vrije-som"]));
  } else {
    basisbelasting = r(schaal(belastbaarJaar) - g["belasting-vrije-som"]);
  }
  const kinderen = kinderVermindering(invoer.kinderen, v["be.bv-kinderen"]);
  const andereLasten = invoer.alleenstaandeOuder && invoer.gezin !== "partner-zonder-inkomen" ? g["alleenstaande-ouder"] : 0;
  const jaarbelasting = Math.max(0, r(basisbelasting - kinderen - andereLasten));
  const perMaand = r(jaarbelasting / 12);
  const wb = v["be.bv-werkbonus"];
  const werkbonusFiscaal = r(r(porcentaje(invoer.werkbonusA, wb["luik-a"])) + r(porcentaje(invoer.werkbonusB, wb["luik-b"])));
  const teBetalen = Math.max(0, r(perMaand - werkbonusFiscaal));
  return { brutoJaar, beroepskosten, belastbaarJaar, basisbelasting, kinderen, andereLasten, jaarbelasting, perMaand, werkbonusFiscaal, teBetalen };
}

const EUR = new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" });
export function euro(n: number): string {
  return EUR.format(n);
}
