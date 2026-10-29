import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;
type Arrondi = (n: number) => number;

export const REQ_IRG = {
  "dz.irg-bareme": "escala",
  "dz.irg-abattement-taux": "numero",
  "dz.irg-abattement": "mapa",
  "dz.irg-exoneration": "numero",
  "dz.irg-lissage-plafonds": "mapa",
  "dz.irg-lissage": "mapa",
} as const;

export const REQ_PAIE = { ...REQ_IRG, "dz.cnas": "mapa" } as const;

export interface ValeursIrg {
  readonly "dz.irg-bareme": readonly FilaEscala[];
  readonly "dz.irg-abattement-taux": number;
  readonly "dz.irg-abattement": Mapa;
  readonly "dz.irg-exoneration": number;
  readonly "dz.irg-lissage-plafonds": Mapa;
  readonly "dz.irg-lissage": Mapa;
}

export interface ValeursPaie extends ValeursIrg {
  readonly "dz.cnas": Mapa;
}

export interface Irg {
  /** Impôt du barème avant abattement. */
  bareme: number;
  abattement: number;
  /** Impôt après le premier abattement de 40 %. */
  apresAbattement: number;
  /** Impôt retenu chaque mois. */
  irg: number;
  regle: "exonere" | "lissage" | "lissage-special" | "bareme";
}

// Article 104-II-3-a du CIDTA : le revenu mensuel est annualisé pour appliquer le barème, l'impôt
// est diminué d'un abattement de 40 % borné, puis les revenus juste au-dessus du seuil d'exonération
// passent par une formule de lissage pour éviter le saut d'impôt à 30 000 DA.
export function irgMensuel(imposable: number, special: boolean, v: ValeursIrg, r: Arrondi): Irg {
  const a = v["dz.irg-abattement"];
  const l = v["dz.irg-lissage"];
  const p = v["dz.irg-lissage-plafonds"];
  const bareme = r(aplicarEscalaMarginal(v["dz.irg-bareme"], imposable * 12) / 12);
  const abattement = Math.min(bareme, Math.min(a.maximum, Math.max(a.minimum, r(porcentaje(bareme, v["dz.irg-abattement-taux"])))));
  const apresAbattement = r(bareme - abattement);
  const base = { bareme, abattement, apresAbattement };
  if (imposable <= v["dz.irg-exoneration"]) return { ...base, irg: 0, regle: "exonere" };
  if (special && imposable < p.special) {
    return { ...base, irg: Math.max(0, r(apresAbattement * l["multiplicateur-special"] - l["deduction-special"])), regle: "lissage-special" };
  }
  if (imposable < p.general) {
    return { ...base, irg: Math.max(0, r(apresAbattement * l.multiplicateur - l.deduction)), regle: "lissage" };
  }
  return { ...base, irg: apresAbattement, regle: "bareme" };
}

export function paie(brut: number, special: boolean, v: ValeursPaie, r: Arrondi) {
  const cnas = r(porcentaje(brut, v["dz.cnas"].salarie));
  const imposable = r(brut - cnas);
  const impot = irgMensuel(imposable, special, v, r);
  return { cnas, imposable, ...impot, net: r(brut - cnas - impot.irg) };
}

export const OBS_ASSIETTE =
  "Le calcul suppose que tout le salaire brut est soumis à la cotisation de sécurité sociale et à l'IRG. Si une partie de votre rémunération n'y est pas soumise, votre bulletin de paie sera différent.";
