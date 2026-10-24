import { enMapa, porcentaje } from "@/motor/calculo";
import type { Requisitos } from "@/motor/tipos";

export const REQ_ISVEREN = {
  "tr.sgk-oranlari": "mapa",
  "tr.sgk-tesvik": "mapa",
  "tr.pek-sinirlari": "mapa",
} as const satisfies Requisitos;

export const OPCIONES_TESVIK = [
  { valor: "diger", etiqueta: "2 puan Hazine indirimi (imalat dışı sektörler)" },
  { valor: "imalat", etiqueta: "5 puan Hazine indirimi (imalat sektörü)" },
  { valor: "yok", etiqueta: "İndirim yok (şartlar sağlanmıyor)" },
];

export interface Primler {
  matrah: number;
  isciMyo: number;
  isciGss: number;
  isciIssizlik: number;
  isverenMyo: number;
  isverenGss: number;
  isverenKvsk: number;
  isverenIssizlik: number;
  tesvikTutari: number;
  isciToplam: number;
  isverenToplam: number;
  isverenSgkOrani: number;
}

type V = { "tr.sgk-oranlari": Readonly<Record<string, number>>; "tr.sgk-tesvik": Readonly<Record<string, number>>; "tr.pek-sinirlari": Readonly<Record<string, number>> };

// Hazine indirimi (5510 md. 81/ı) malullük, yaşlılık ve ölüm sigortası işveren hissesinden düşülür.
export function primler(brut: number, tesvik: string, v: V, r: (n: number) => number): Primler {
  const o = v["tr.sgk-oranlari"];
  const matrah = Math.min(brut, v["tr.pek-sinirlari"].ust ?? brut);
  const puan = tesvik === "yok" ? 0 : enMapa(v["tr.sgk-tesvik"], tesvik);
  const isciMyo = r(porcentaje(matrah, enMapa(o, "isci-myo")));
  const isciGss = r(porcentaje(matrah, enMapa(o, "isci-gss")));
  const isciIssizlik = r(porcentaje(matrah, enMapa(o, "isci-issizlik")));
  const isverenMyo = r(porcentaje(matrah, enMapa(o, "isveren-myo") - puan));
  const isverenGss = r(porcentaje(matrah, enMapa(o, "isveren-gss")));
  const isverenKvsk = r(porcentaje(matrah, enMapa(o, "isveren-kvsk")));
  const isverenIssizlik = r(porcentaje(matrah, enMapa(o, "isveren-issizlik")));
  const isverenSgkOrani = enMapa(o, "isveren-myo") - puan + enMapa(o, "isveren-gss") + enMapa(o, "isveren-kvsk");
  return {
    matrah,
    isciMyo,
    isciGss,
    isciIssizlik,
    isverenMyo,
    isverenGss,
    isverenKvsk,
    isverenIssizlik,
    tesvikTutari: r(porcentaje(matrah, puan)),
    isciToplam: r(isciMyo + isciGss + isciIssizlik),
    isverenToplam: r(isverenMyo + isverenGss + isverenKvsk + isverenIssizlik),
    isverenSgkOrani,
  };
}
