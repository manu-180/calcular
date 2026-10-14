import { porcentaje } from "@/motor/calculo";

export const REQUIERE_COTISATIONS = {
  "fr.pmss": "numero",
  "fr.vieillesse-plafonnee": "numero",
  "fr.vieillesse-deplafonnee": "numero",
  "fr.agirc-arrco-t1": "numero",
  "fr.agirc-arrco-t2": "numero",
  "fr.ceg-t1": "numero",
  "fr.ceg-t2": "numero",
  "fr.cet": "numero",
  "fr.apec": "numero",
  "fr.csg-deductible": "numero",
  "fr.csg-non-deductible": "numero",
  "fr.crds": "numero",
  "fr.assiette-csg": "numero",
  "fr.maladie-alsace-moselle": "numero",
} as const;

export type ValeursCotisations = { readonly [K in keyof typeof REQUIERE_COTISATIONS]: number };

export interface OptionsSalarie {
  cadre: boolean;
  alsaceMoselle: boolean;
}

export interface DetailCotisations {
  brut: number;
  retraite: number;
  csgCrds: number;
  csgNonDeductible: number;
  crds: number;
  maladieAlsaceMoselle: number;
  total: number;
  net: number;
  netImposable: number;
}

// Cada cotización se redondea al céntimo, como en una nómina. Con el Smic de 1 867,02 € brutos da
// 1 477,93 € netos y 1 531,12 € netos imponibles, los dos montos que publica la administración:
// no cambiar el orden de los redondeos sin volver a correr smic.casos.ts.
export function salaireMensuel(brut: number, opts: OptionsSalarie, v: ValeursCotisations, redondear: (n: number) => number): DetailCotisations {
  const pmss = v["fr.pmss"];
  const t1 = Math.min(brut, pmss);
  const t2 = Math.max(0, Math.min(brut, 8 * pmss) - pmss);
  const r = (base: number, taux: number) => redondear(porcentaje(base, taux));

  const retraite =
    r(t1, v["fr.vieillesse-plafonnee"]) +
    r(brut, v["fr.vieillesse-deplafonnee"]) +
    r(t1, v["fr.agirc-arrco-t1"]) +
    r(t1, v["fr.ceg-t1"]) +
    r(t2, v["fr.agirc-arrco-t2"]) +
    r(t2, v["fr.ceg-t2"]) +
    (brut > pmss ? r(Math.min(brut, 8 * pmss), v["fr.cet"]) : 0) +
    (opts.cadre ? r(Math.min(brut, 4 * pmss), v["fr.apec"]) : 0);

  const assiette = porcentaje(Math.min(brut, 4 * pmss), v["fr.assiette-csg"]) + Math.max(0, brut - 4 * pmss);
  const csgDeductible = r(assiette, v["fr.csg-deductible"]);
  const csgNonDeductible = r(assiette, v["fr.csg-non-deductible"]);
  const crds = r(assiette, v["fr.crds"]);
  const maladieAlsaceMoselle = opts.alsaceMoselle ? r(brut, v["fr.maladie-alsace-moselle"]) : 0;

  const csgCrds = csgDeductible + csgNonDeductible + crds;
  const total = redondear(retraite + csgCrds + maladieAlsaceMoselle);
  const net = redondear(brut - total);
  return {
    brut,
    retraite: redondear(retraite),
    csgCrds: redondear(csgCrds),
    csgNonDeductible,
    crds,
    maladieAlsaceMoselle,
    total,
    net,
    netImposable: redondear(net + csgNonDeductible + crds),
  };
}

// El neto crece con el bruto pero en escalones por los redondeos: la bisección deja un bruto
// aproximado y el último bucle baja al céntimo más chico que todavía alcanza el neto pedido.
export function brutPourNet(netVise: number, opts: OptionsSalarie, v: ValeursCotisations, redondear: (n: number) => number): number {
  let bas = netVise;
  let haut = netVise * 2 + 100;
  for (let i = 0; i < 60; i++) {
    const milieu = (bas + haut) / 2;
    if (salaireMensuel(milieu, opts, v, redondear).net < netVise) bas = milieu;
    else haut = milieu;
  }
  let brut = redondear(haut);
  while (brut > 0 && salaireMensuel(brut - 0.01, opts, v, redondear).net >= netVise) brut = redondear(brut - 0.01);
  return brut;
}
