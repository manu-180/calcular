import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;
type Afronden = (n: number) => number;

export const REQ_IR = {
  "ma.ir-bareme": "escala",
  "ma.frais-professionnels-taux": "mapa",
  "ma.frais-professionnels-limites": "mapa",
  "ma.charges-de-famille": "mapa",
} as const;

export interface ValeursIr {
  readonly "ma.ir-bareme": readonly FilaEscala[];
  readonly "ma.frais-professionnels-taux": Mapa;
  readonly "ma.frais-professionnels-limites": Mapa;
  readonly "ma.charges-de-famille": Mapa;
}

export interface Ir {
  brutAnnuel: number;
  fraisProfessionnels: number;
  cotisations: number;
  netImposable: number;
  impotBrut: number;
  chargesDeFamille: number;
  impotAnnuel: number;
  impotMensuel: number;
}

// Article 59-I-A du CGI : le taux de 35 % ne s'applique que si le revenu brut annuel imposable ne
// dépasse pas le seuil ; au-delà, c'est 25 % avec un plafond. Les cotisations sociales (59-II et III)
// se déduisent ensuite.
export function fraisProfessionnels(brutAnnuel: number, v: ValeursIr, r: Afronden): number {
  const taux = v["ma.frais-professionnels-taux"];
  const lim = v["ma.frais-professionnels-limites"];
  if (brutAnnuel <= lim.seuil) return r(porcentaje(brutAnnuel, taux["jusqu-au-seuil"]));
  return Math.min(r(porcentaje(brutAnnuel, taux["au-dela"])), lim.plafond);
}

export function impotSurSalaire(brutMensuel: number, cotisationsMensuelles: number, personnesACharge: number, v: ValeursIr, r: Afronden): Ir {
  const brutAnnuel = r(brutMensuel * 12);
  const frais = fraisProfessionnels(brutAnnuel, v, r);
  const cotisations = r(cotisationsMensuelles * 12);
  const netImposable = Math.max(0, r(brutAnnuel - frais - cotisations));
  const impotBrut = r(aplicarEscalaMarginal(v["ma.ir-bareme"], netImposable));
  const cf = v["ma.charges-de-famille"];
  const chargesDeFamille = Math.min(impotBrut, Math.min(personnesACharge * cf["par-personne"], cf.plafond));
  const impotAnnuel = r(impotBrut - chargesDeFamille);
  return {
    brutAnnuel,
    fraisProfessionnels: frais,
    cotisations,
    netImposable,
    impotBrut,
    chargesDeFamille,
    impotAnnuel,
    impotMensuel: r(impotAnnuel / 12),
  };
}
