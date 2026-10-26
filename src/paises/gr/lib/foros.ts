import { aplicarEscalaMarginal, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;

export type Ilikia = "ews-25" | "26-30" | "31";

export const OPCIONES_ILIKIAS = [
  { valor: "31", etiqueta: "31 ετών και άνω" },
  { valor: "26-30", etiqueta: "26 έως 30 ετών" },
  { valor: "ews-25", etiqueta: "Έως 25 ετών" },
] as const;

export interface ParametroiKlimakas {
  klimaka: readonly FilaEscala[];
  a: Mapa;
  b: Mapa;
  g: Mapa;
  meiosiGAnaPaidi: number;
  neoi: Mapa;
}

// Las requiere de cualquier calculadora que aplique el art. 15 παρ. 1 ΚΦΕ con hijos y edad.
export const REQUIERE_KLIMAKA = {
  "gr.klimaka-forou": "escala",
  "gr.syntelestis-a-klimakiou": "mapa",
  "gr.syntelestis-b-klimakiou": "mapa",
  "gr.syntelestis-g-klimakiou": "mapa",
  "gr.meiosi-g-klimakiou-ana-paidi": "numero",
  "gr.syntelestis-neon": "mapa",
} as const;

export const REQUIERE_MEIOSI = {
  "gr.meiosi-forou": "mapa",
  "gr.meiosi-forou-epipleon-paidi": "numero",
  "gr.meiosi-forou-orio": "numero",
  "gr.meiosi-forou-ana-1000": "numero",
  "gr.meiosi-forou-paidia-xoris-periorismo": "numero",
} as const;

interface ValoresKlimakas {
  "gr.klimaka-forou": readonly FilaEscala[];
  "gr.syntelestis-a-klimakiou": Mapa;
  "gr.syntelestis-b-klimakiou": Mapa;
  "gr.syntelestis-g-klimakiou": Mapa;
  "gr.meiosi-g-klimakiou-ana-paidi": number;
  "gr.syntelestis-neon": Mapa;
}

interface ValoresMeiosis {
  "gr.meiosi-forou": Mapa;
  "gr.meiosi-forou-epipleon-paidi": number;
  "gr.meiosi-forou-orio": number;
  "gr.meiosi-forou-ana-1000": number;
  "gr.meiosi-forou-paidia-xoris-periorismo": number;
}

export function parametroi(v: ValoresKlimakas): ParametroiKlimakas {
  return {
    klimaka: v["gr.klimaka-forou"],
    a: v["gr.syntelestis-a-klimakiou"],
    b: v["gr.syntelestis-b-klimakiou"],
    g: v["gr.syntelestis-g-klimakiou"],
    meiosiGAnaPaidi: v["gr.meiosi-g-klimakiou-ana-paidi"],
    neoi: v["gr.syntelestis-neon"],
  };
}

export function elegxosPaidion(paidia: number, campo = "paidia"): void {
  if (!Number.isInteger(paidia) || paidia < 0) throw new ErrorEntrada("Εισάγετε τον αριθμό των εξαρτώμενων παιδιών (0 ή περισσότερα).", campo);
}

// Art. 15 παρ. 1 ΚΦΕ (ν. 5246/2025): los dos primeros tramos y el tercero bajan según los hijos; los
// jóvenes tienen tasa propia en los dos primeros. Se aplica la tasa más baja que corresponda.
export function klimakaGia(p: ParametroiKlimakas, paidia: number, ilikia: Ilikia): FilaEscala[] {
  const k = String(Math.min(paidia, 4));
  return p.klimaka.map((f, i) => {
    let tasa = f.tasa;
    if (i === 0) tasa = enMapa(p.a, k);
    if (i === 1) tasa = enMapa(p.b, k);
    if (i === 2) tasa = paidia > 4 ? Math.max(0, enMapa(p.g, "4") - p.meiosiGAnaPaidi * (paidia - 4)) : enMapa(p.g, k);
    if (i <= 1 && ilikia !== "31") tasa = Math.min(tasa, enMapa(p.neoi, ilikia));
    return { ...f, tasa };
  });
}

export function forosKlimakas(p: ParametroiKlimakas, eisodima: number, paidia: number, ilikia: Ilikia): number {
  return aplicarEscalaMarginal(klimakaGia(p, paidia, ilikia), eisodima);
}

// Art. 16 ΚΦΕ: la reducción por hijos baja 20 € por cada 1.000 € de ingreso por encima de 12.000 €,
// salvo con 5 hijos o más.
export function meiosiForou(v: ValoresMeiosis, paidia: number, eisodima: number): number {
  const mapa = v["gr.meiosi-forou"];
  const vasi = paidia <= 5 ? enMapa(mapa, String(paidia)) : enMapa(mapa, "5") + v["gr.meiosi-forou-epipleon-paidi"] * (paidia - 5);
  if (paidia >= v["gr.meiosi-forou-paidia-xoris-periorismo"]) return vasi;
  const periorismos = (Math.max(0, eisodima - v["gr.meiosi-forou-orio"]) * v["gr.meiosi-forou-ana-1000"]) / 1000;
  return Math.max(0, vasi - periorismos);
}

export interface ForosMisthotou {
  forosKlimakas: number;
  meiosi: number;
  foros: number;
}

export function forosMisthotou(v: ValoresKlimakas & ValoresMeiosis, eisodima: number, paidia: number, ilikia: Ilikia, redondear: (n: number) => number): ForosMisthotou {
  const fk = redondear(forosKlimakas(parametroi(v), eisodima, paidia, ilikia));
  const meiosi = redondear(Math.min(fk, meiosiForou(v, paidia, eisodima)));
  return { forosKlimakas: fk, meiosi, foros: redondear(fk - meiosi) };
}

// Los sueldos del año para quien cobra por mes: 12 meses más el δώρο Χριστουγέννων (1), el δώρο
// Πάσχα (1/2) y el επίδομα αδείας (1/2). Salen de los datos de cada uno, no se escriben a mano.
export const REQUIERE_PAGES = {
  "gr.doro-christougennon": "mapa",
  "gr.doro-pascha": "mapa",
  "gr.epidoma-adeias": "mapa",
} as const;

export function misthoiEtous(v: { "gr.doro-christougennon": Mapa; "gr.doro-pascha": Mapa; "gr.epidoma-adeias": Mapa }): number {
  return 12 + enMapa(v["gr.doro-christougennon"], "mines") + enMapa(v["gr.doro-pascha"], "mines") + enMapa(v["gr.epidoma-adeias"], "mines");
}

export interface Misthodosia {
  eisforesMina: number;
  forosMina: number;
  katharaMina: number;
  miktaEtous: number;
  eisforesEtous: number;
  forologiteo: number;
  forosKlimakas: number;
  meiosi: number;
  forosEtous: number;
  katharaEtous: number;
  plafon: boolean;
}

export interface ParametroiMisthodosias {
  syntelestisEisforon: number;
  orio: number;
  misthoi: number;
}

export function misthodosia(
  miktos: number,
  p: ParametroiMisthodosias,
  v: ValoresKlimakas & ValoresMeiosis,
  paidia: number,
  ilikia: Ilikia,
  redondear: (n: number) => number,
): Misthodosia {
  const eisforesMina = redondear(porcentaje(Math.min(miktos, p.orio), p.syntelestisEisforon));
  const miktaEtous = redondear(miktos * p.misthoi);
  const eisforesEtous = redondear(eisforesMina * p.misthoi);
  const forologiteo = redondear(miktaEtous - eisforesEtous);
  const f = forosMisthotou(v, forologiteo, paidia, ilikia, redondear);
  const forosMina = redondear(f.foros / p.misthoi);
  const katharaMina = redondear(miktos - eisforesMina - forosMina);
  return {
    eisforesMina,
    forosMina,
    katharaMina,
    miktaEtous,
    eisforesEtous,
    forologiteo,
    forosKlimakas: f.forosKlimakas,
    meiosi: f.meiosi,
    forosEtous: f.foros,
    katharaEtous: redondear(miktaEtous - eisforesEtous - f.foros),
    plafon: miktos > p.orio,
  };
}

// Bruto a partir del neto: búsqueda binaria sobre la misma cuenta (el neto crece con el bruto).
export function miktosApoKathara(
  kathara: number,
  p: ParametroiMisthodosias,
  v: ValoresKlimakas & ValoresMeiosis,
  paidia: number,
  ilikia: Ilikia,
  redondear: (n: number) => number,
): number {
  let lo = kathara;
  let hi = kathara * 3 + 1000;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (misthodosia(mid, p, v, paidia, ilikia, (n) => n).katharaMina < kathara) lo = mid;
    else hi = mid;
  }
  let miktos = redondear(hi);
  while (misthodosia(miktos, p, v, paidia, ilikia, redondear).katharaMina < kathara) miktos = redondear(miktos + 0.01);
  while (miktos > 0.01 && misthodosia(redondear(miktos - 0.01), p, v, paidia, ilikia, redondear).katharaMina >= kathara) miktos = redondear(miktos - 0.01);
  return miktos;
}
