import { aplicarEscalaMarginal, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;
type Arrondi = (n: number) => number;

export const REQ_CNSS = {
  "bf.cnss-taux": "mapa",
  "bf.cnss-plafond": "numero",
  "bf.smig": "numero",
} as const;

export const REQ_IUTS = {
  ...REQ_CNSS,
  "bf.iuts-bareme": "escala",
  "bf.iuts-charges-famille": "mapa",
  "bf.iuts-abattement": "mapa",
  "bf.iuts-plafond-pension": "numero",
  "bf.iuts-indemnites-taux": "mapa",
  "bf.iuts-indemnites-plafond": "mapa",
} as const;

export interface ValeursCnss {
  readonly "bf.cnss-taux": Mapa;
  readonly "bf.cnss-plafond": number;
  readonly "bf.smig": number;
}

export interface ValeursIuts extends ValeursCnss {
  readonly "bf.iuts-bareme": readonly FilaEscala[];
  readonly "bf.iuts-charges-famille": Mapa;
  readonly "bf.iuts-abattement": Mapa;
  readonly "bf.iuts-plafond-pension": number;
  readonly "bf.iuts-indemnites-taux": Mapa;
  readonly "bf.iuts-indemnites-plafond": Mapa;
}

export const OPTIONS_CATEGORIE = [
  { valor: "autres", etiqueta: "Autres catégories (abattement de 25 %)" },
  { valor: "superieure", etiqueta: "Catégories P, A ou B, ou 6, 1 ou 2, et équivalentes (abattement de 20 %)" },
] as const;

export interface Cnss {
  assiette: number;
  vieillesseSalarie: number;
  vieillesseEmployeur: number;
  prestationsFamiliales: number;
  risquesProfessionnels: number;
  totalEmployeur: number;
}

// La CNSS calcule sur toute la rémunération, plafonnée, et jamais sur moins que le SMIG.
export function cotisationsCnss(remuneration: number, v: ValeursCnss, r: Arrondi): Cnss {
  const t = v["bf.cnss-taux"];
  const assiette = Math.max(v["bf.smig"], Math.min(remuneration, v["bf.cnss-plafond"]));
  const vieillesseSalarie = r(porcentaje(assiette, t["vieillesse-salarie"]));
  const vieillesseEmployeur = r(porcentaje(assiette, t["vieillesse-employeur"]));
  const prestationsFamiliales = r(porcentaje(assiette, t["prestations-familiales"]));
  const risquesProfessionnels = r(porcentaje(assiette, t["risques-professionnels"]));
  return {
    assiette,
    vieillesseSalarie,
    vieillesseEmployeur,
    prestationsFamiliales,
    risquesProfessionnels,
    totalEmployeur: r(vieillesseEmployeur + prestationsFamiliales + risquesProfessionnels),
  };
}

export interface Remuneration {
  base: number;
  primes: number;
  logement: number;
  fonction: number;
  transport: number;
  categorie: string;
  charges: number;
}

export interface Iuts {
  brut: number;
  cnss: number;
  pensionDeduite: number;
  abattement: number;
  exonerations: number;
  netImposable: number;
  impotBrut: number;
  tauxReduction: number;
  reduction: number;
  iuts: number;
}

function exonere(montant: number, cle: string, brutApresCotisation: number, v: ValeursIuts): number {
  const plafond = Math.min(porcentaje(brutApresCotisation, v["bf.iuts-indemnites-taux"][cle]), v["bf.iuts-indemnites-plafond"][cle]);
  return Math.min(montant, plafond);
}

// Articles 106, 111, 112 et 113 du CGI. Le « salaire brut » qui sert de base aux exonérations
// d'indemnités est le salaire de base plus les indemnités, moins les cotisations sociales ; les
// abattements de l'article 111 se calculent sur le seul salaire de base.
export function iutsMensuel(p: Remuneration, v: ValeursIuts, r: Arrondi): Iuts {
  if (p.base <= 0) throw new ErrorEntrada("Indiquez un salaire de base supérieur à zéro.", "base");
  const brut = p.base + p.primes + p.logement + p.fonction + p.transport;
  const cnss = cotisationsCnss(brut, v, r).vieillesseSalarie;
  const pensionDeduite = Math.min(cnss, r(porcentaje(p.base, v["bf.iuts-plafond-pension"])));
  const abattement = r(porcentaje(p.base, enMapa(v["bf.iuts-abattement"], p.categorie)));
  const brutApresCotisation = brut - cnss;
  const exonerations = r(
    exonere(p.logement, "logement", brutApresCotisation, v) +
      exonere(p.fonction, "fonction", brutApresCotisation, v) +
      exonere(p.transport, "transport", brutApresCotisation, v),
  );
  const netImposable = Math.max(0, r(brut - pensionDeduite - abattement - exonerations));
  const impotBrut = r(aplicarEscalaMarginal(v["bf.iuts-bareme"], netImposable));
  const tauxReduction = p.charges <= 0 ? 0 : v["bf.iuts-charges-famille"][String(Math.min(p.charges, 4))];
  const reduction = r(porcentaje(impotBrut, tauxReduction));
  return { brut, cnss, pensionDeduite, abattement, exonerations, netImposable, impotBrut, tauxReduction, reduction, iuts: r(impotBrut - reduction) };
}
