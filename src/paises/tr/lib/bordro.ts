import { aplicarEscalaMarginal, enMapa, porcentaje } from "@/motor/calculo";
import type { FilaEscala, Requisitos, TablaResultado } from "@/motor/tipos";

// Lo que pide cualquier cálculo de bordro (brüt ücretten net ücrete). Se reparte entre varias
// calculadoras para que todas lean los mismos datos.
export const REQ_BORDRO = {
  "tr.asgari-ucret": "numero",
  "tr.gv-tarife-ucret": "escala",
  "tr.sgk-oranlari": "mapa",
  "tr.pek-sinirlari": "mapa",
  "tr.damga-oranlari": "mapa",
} as const satisfies Requisitos;

export interface ValoresBordro {
  "tr.asgari-ucret": number;
  "tr.gv-tarife-ucret": readonly FilaEscala[];
  "tr.sgk-oranlari": Readonly<Record<string, number>>;
  "tr.pek-sinirlari": Readonly<Record<string, number>>;
  "tr.damga-oranlari": Readonly<Record<string, number>>;
}

export const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"] as const;
export const OPCIONES_AY = AYLAR.map((ad, i) => ({ valor: String(i + 1), etiqueta: ad }));

export interface SatirBordro {
  brut: number;
  sgkMatrahi: number;
  sgkIsci: number;
  issizlikIsci: number;
  gvMatrahi: number;
  kumulatifOnce: number;
  gvHesaplanan: number;
  gvIstisna: number;
  gelirVergisi: number;
  damgaHesaplanan: number;
  damgaIstisna: number;
  damgaVergisi: number;
  net: number;
  dilim: number;
}

type Yuvarla = (n: number) => number;

export function vergi(tarife: readonly FilaEscala[], matrah: number): number {
  return aplicarEscalaMarginal(tarife, Math.max(0, matrah));
}

// Kümülatif matrahın girdiği dilimin oranı (bordrodaki «vergi dilimi»).
export function dilimOrani(tarife: readonly FilaEscala[], matrah: number): number {
  let oran = tarife[0]?.tasa ?? 0;
  for (const f of tarife) if (matrah > f.desde) oran = f.tasa;
  return oran;
}

export function isciKesintiOrani(v: ValoresBordro): { sgk: number; issizlik: number } {
  const o = v["tr.sgk-oranlari"];
  return { sgk: enMapa(o, "isci-myo") + enMapa(o, "isci-gss"), issizlik: enMapa(o, "isci-issizlik") };
}

// Asgari ücretin gelir vergisi matrahı: brüt asgari ücretten işçi SGK ve işsizlik primi düşülür.
export function asgariMatrah(v: ValoresBordro, r: Yuvarla): number {
  const au = v["tr.asgari-ucret"];
  const k = isciKesintiOrani(v);
  return r(au - r(porcentaje(au, k.sgk)) - r(porcentaje(au, k.issizlik)));
}

// Bir ayın bordrosu. Gelir vergisi kümülatif matrah üzerinden hesaplanır; asgari ücret istisnası
// (GVK md. 23/18) aynı ay için asgari ücretin kendi kümülatifiyle bulunan vergi kadardır ve
// hesaplanan vergiyi aşamaz. Damga vergisinde asgari ücrete isabet eden kısım istisnadır.
export function bordroAyi(brut: number, ay: number, kumulatifOnce: number, v: ValoresBordro, r: Yuvarla): SatirBordro {
  const k = isciKesintiOrani(v);
  const sgkMatrahi = Math.min(brut, v["tr.pek-sinirlari"].ust ?? brut);
  const sgkIsci = r(porcentaje(sgkMatrahi, k.sgk));
  const issizlikIsci = r(porcentaje(sgkMatrahi, k.issizlik));
  const gvMatrahi = r(Math.max(0, brut - sgkIsci - issizlikIsci));
  const tarife = v["tr.gv-tarife-ucret"];
  const gvHesaplanan = r(vergi(tarife, kumulatifOnce + gvMatrahi) - vergi(tarife, kumulatifOnce));

  const auMatrah = asgariMatrah(v, r);
  const auKumulatif = auMatrah * (ay - 1);
  const istisnaTam = r(vergi(tarife, auKumulatif + auMatrah) - vergi(tarife, auKumulatif));
  const gvIstisna = Math.min(istisnaTam, gvHesaplanan);
  const gelirVergisi = r(gvHesaplanan - gvIstisna);

  const damgaOrani = enMapa(v["tr.damga-oranlari"], "ucret");
  const damgaHesaplanan = r(porcentaje(brut, damgaOrani));
  const damgaIstisna = Math.min(damgaHesaplanan, r(porcentaje(v["tr.asgari-ucret"], damgaOrani)));
  const damgaVergisi = r(damgaHesaplanan - damgaIstisna);

  const net = r(brut - sgkIsci - issizlikIsci - gelirVergisi - damgaVergisi);
  return {
    brut,
    sgkMatrahi,
    sgkIsci,
    issizlikIsci,
    gvMatrahi,
    kumulatifOnce,
    gvHesaplanan,
    gvIstisna,
    gelirVergisi,
    damgaHesaplanan,
    damgaIstisna,
    damgaVergisi,
    net,
    dilim: dilimOrani(tarife, kumulatifOnce + gvMatrahi),
  };
}

// Ocak'tan Aralık'a aynı brüt ücret: her ayın kümülatif matrahı bir önceki ayların toplamıdır.
export function yillikBordro(brut: number, v: ValoresBordro, r: Yuvarla): SatirBordro[] {
  const satirlar: SatirBordro[] = [];
  let kumulatif = 0;
  for (let ay = 1; ay <= 12; ay++) {
    const s = bordroAyi(brut, ay, kumulatif, v, r);
    satirlar.push(s);
    kumulatif = r(kumulatif + s.gvMatrahi);
  }
  return satirlar;
}

export function tabloYillik(satirlar: readonly SatirBordro[]): TablaResultado {
  return {
    tipo: "tabla",
    columnas: [
      { clave: "ay", etiqueta: "Ay", formato: "texto" },
      { clave: "brut", etiqueta: "Brüt", formato: "moneda" },
      { clave: "sgk", etiqueta: "SGK ve işsizlik", formato: "moneda" },
      { clave: "gv", etiqueta: "Gelir vergisi", formato: "moneda" },
      { clave: "damga", etiqueta: "Damga vergisi", formato: "moneda" },
      { clave: "net", etiqueta: "Net", formato: "moneda" },
      { clave: "dilim", etiqueta: "Vergi dilimi", formato: "porcentaje" },
    ],
    filas: satirlar.map((s, i) => [AYLAR[i], s.brut, s.sgkIsci + s.issizlikIsci, s.gelirVergisi, s.damgaVergisi, s.net, s.dilim]),
  };
}

// Netten brüte: bordro ayı brütte artan bir fonksiyon, ikiye bölerek kuruşuna kadar aranır.
export function bruttenAra(hedefNet: number, ay: number, v: ValoresBordro, r: Yuvarla): SatirBordro {
  const kumulatifIcin = (brut: number) => {
    let kum = 0;
    for (let a = 1; a < ay; a++) kum = r(kum + bordroAyi(brut, a, kum, v, r).gvMatrahi);
    return kum;
  };
  const netOf = (brut: number) => bordroAyi(brut, ay, kumulatifIcin(brut), v, r).net;
  let alt = hedefNet;
  let ust = hedefNet * 2 + 1000;
  while (netOf(ust) < hedefNet) ust *= 2;
  for (let i = 0; i < 80 && ust - alt > 0.004; i++) {
    const orta = (alt + ust) / 2;
    if (netOf(orta) < hedefNet) alt = orta;
    else ust = orta;
  }
  let brut = r(ust);
  if (netOf(r(brut - 0.01)) >= hedefNet) brut = r(brut - 0.01);
  return bordroAyi(brut, ay, kumulatifIcin(brut), v, r);
}
