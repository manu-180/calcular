import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Arrondi = (n: number) => number;

export const REQ_IRPP = {
  "tg.irpp-bareme": "escala",
  "tg.irpp-abattement": "numero",
  "tg.irpp-abattement-plafond": "numero",
  "tg.irpp-retraite-plafond": "numero",
  "tg.irpp-charge-famille": "numero",
  "tg.irpp-charges-max": "numero",
} as const;

export interface ValeursIrpp {
  readonly "tg.irpp-bareme": readonly FilaEscala[];
  readonly "tg.irpp-abattement": number;
  readonly "tg.irpp-abattement-plafond": number;
  readonly "tg.irpp-retraite-plafond": number;
  readonly "tg.irpp-charge-famille": number;
  readonly "tg.irpp-charges-max": number;
}

export interface Irpp {
  personnes: number;
  retenuesDeduites: number;
  abattement: number;
  deductionCharges: number;
  revenuImposable: number;
  impot: number;
  tauxMarginal: number;
}

// Articles 26, 72 à 74 du CGI, sur l'année : on retire du brut la retenue pour la retraite (dans la
// limite de 6 % du brut) et la cotisation maladie obligatoire, puis la déduction forfaitaire de 28 %
// sur les dix premiers millions, puis 10 000 F par personne à charge et par mois. Le revenu net est
// arrondi au millier inférieur et l'impôt à la dizaine inférieure.
export function irppAnnuel(brut: number, retraite: number, maladie: number, personnes: number, v: ValeursIrpp, r: Arrondi): Irpp {
  const charges = Math.min(personnes, v["tg.irpp-charges-max"]);
  const retenuesDeduites = r(Math.min(retraite, porcentaje(brut, v["tg.irpp-retraite-plafond"])) + maladie);
  const apresRetenues = Math.max(0, brut - retenuesDeduites);
  const abattement = r(porcentaje(Math.min(apresRetenues, v["tg.irpp-abattement-plafond"]), v["tg.irpp-abattement"]));
  const deductionCharges = charges * v["tg.irpp-charge-famille"] * 12;
  const revenuImposable = Math.floor(Math.max(0, apresRetenues - abattement - deductionCharges) / 1000) * 1000;
  const impot = Math.floor(aplicarEscalaMarginal(v["tg.irpp-bareme"], revenuImposable) / 10) * 10;
  let tauxMarginal = 0;
  for (const f of v["tg.irpp-bareme"]) if (revenuImposable > f.desde) tauxMarginal = f.tasa;
  return { personnes: charges, retenuesDeduites, abattement, deductionCharges, revenuImposable, impot, tauxMarginal };
}
