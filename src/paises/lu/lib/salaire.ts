import { aplicarEscala, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const CLASSES = [
  { valor: "1", etiqueta: "Classe 1 (personne seule)" },
  { valor: "1a", etiqueta: "Classe 1a (parent seul, veuf, 65 ans et plus)" },
  { valor: "2", etiqueta: "Classe 2 (marié ou partenaire)" },
] as const;
export type Classe = (typeof CLASSES)[number]["valor"];

export const REQ_COTISATIONS = {
  "lu.cotisation-maladie-soins": "numero",
  "lu.cotisation-maladie-especes": "numero",
  "lu.cotisation-pension": "numero",
  "lu.cotisation-dependance": "numero",
  "lu.plafond-cotisable": "numero",
  "lu.abattement-dependance": "numero",
} as const;

export const REQ_RETENUE = {
  "lu.retenue-classe-1": "escala",
  "lu.retenue-classe-1a": "escala",
  "lu.retenue-classe-2": "escala",
  "lu.fonds-emploi-retenue": "mapa",
  "lu.cis": "mapa",
} as const;

export interface TauxCotisations {
  maladieSoins: number;
  maladieEspeces: number;
  pension: number;
  dependance: number;
  plafond: number;
  abattement: number;
}

export function tauxAus(v: {
  readonly "lu.cotisation-maladie-soins": number;
  readonly "lu.cotisation-maladie-especes": number;
  readonly "lu.cotisation-pension": number;
  readonly "lu.cotisation-dependance": number;
  readonly "lu.plafond-cotisable": number;
  readonly "lu.abattement-dependance": number;
}): TauxCotisations {
  return {
    maladieSoins: v["lu.cotisation-maladie-soins"],
    maladieEspeces: v["lu.cotisation-maladie-especes"],
    pension: v["lu.cotisation-pension"],
    dependance: v["lu.cotisation-dependance"],
    plafond: v["lu.plafond-cotisable"],
    abattement: v["lu.abattement-dependance"],
  };
}

export interface CotisationsSalarie {
  assiette: number;
  maladie: number;
  pension: number;
  dependance: number;
  total: number;
}

// Maladie et pension se partagent à parts égales et s'arrêtent au maximum cotisable ; la dépendance
// est entièrement à charge de l'assuré, sans plafond, sur le salaire diminué de l'abattement (CCSS).
export function cotisationsSalarie(brut: number, t: TauxCotisations, redondear: (n: number) => number): CotisationsSalarie {
  const assiette = Math.min(brut, t.plafond);
  const maladie = redondear((assiette * (t.maladieSoins + t.maladieEspeces)) / 2 / 100);
  const pension = redondear((assiette * t.pension) / 2 / 100);
  const dependance = redondear((Math.max(brut - t.abattement, 0) * t.dependance) / 100);
  return { assiette, maladie, pension, dependance, total: redondear(maladie + pension + dependance) };
}

function dixCentimesInferieurs(n: number): number {
  return Math.floor(n * 10 + 1e-6) / 10;
}

export function escalaRetenue(classe: Classe, v: { readonly "lu.retenue-classe-1": readonly FilaEscala[]; readonly "lu.retenue-classe-1a": readonly FilaEscala[]; readonly "lu.retenue-classe-2": readonly FilaEscala[] }): readonly FilaEscala[] {
  return classe === "1" ? v["lu.retenue-classe-1"] : classe === "1a" ? v["lu.retenue-classe-1a"] : v["lu.retenue-classe-2"];
}

// Formules de l'ACD : R arrondi aux 5 euros inférieurs, impôt = taux x R - déduction arrondi aux 10 cents
// inférieurs, puis majoration pour le fonds pour l'emploi (7 % ou impôt x 0,09 - déduction au-delà du seuil).
export function retenueMensuelle(revenu: number, classe: Classe, escala: readonly FilaEscala[], fonds: Readonly<Record<string, number>>): { base: number; impot: number; retenue: number } {
  const base = Math.floor(Math.max(revenu, 0) / 5) * 5;
  const impot = dixCentimesInferieurs(Math.max(aplicarEscala(escala, base), 0));
  const seuil = enMapa(fonds, `seuil-${classe}`);
  const majore = base <= seuil ? impot * 1.07 : impot * 1.09 - enMapa(fonds, `deduction-${classe}`);
  return { base, impot, retenue: dixCentimesInferieurs(Math.max(majore, 0)) };
}

// CIS et CI-CO2 salarié 2026 (ACD), sur le salaire brut annuel.
export function creditsSalarie(brutAnnuel: number, p: Readonly<Record<string, number>>): { cis: number; co2: number } {
  const v = (k: string) => enMapa(p, k);
  if (brutAnnuel < v("min") || brutAnnuel >= v("max")) return { cis: 0, co2: 0 };
  const cis =
    brutAnnuel <= v("palier-1") ? v("base") + (brutAnnuel - v("min")) * v("pente-1") : brutAnnuel <= v("palier-2") ? v("plateau") : v("plateau") - (brutAnnuel - v("palier-2")) * v("pente-2");
  const co2 = brutAnnuel <= v("palier-2") ? v("co2") : v("co2") - (brutAnnuel - v("palier-2")) * v("pente-co2");
  return { cis: Math.max(cis, 0), co2: Math.max(co2, 0) };
}

export function verifierSalaire(brut: number, champ: string): void {
  if (!(brut > 0)) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", champ);
}
