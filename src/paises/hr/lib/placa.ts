// Obračun plaće prema uputama Porezne uprave: mirovinski doprinosi iz plaće, umanjenje osnovice I. stupa
// (Zakon o doprinosima, čl. 21.a), porez po stopama grada ili općine i zdravstveno na plaću.

export const REQUIERE_PLACA = {
  "hr.osobni-odbitak": "numero",
  "hr.koeficijenti-odbitka": "mapa",
  "hr.prag-mjesecni": "numero",
  "hr.stopa-niza": "mapa",
  "hr.stopa-visa": "mapa",
  "hr.mio-i": "numero",
  "hr.mio-ii": "numero",
  "hr.mio-samo-i": "numero",
  "hr.zdravstveno": "numero",
  "hr.umanjenje-iznos": "numero",
  "hr.umanjenje-donja": "numero",
  "hr.umanjenje-gornja": "numero",
  "hr.najvisa-osnovica": "numero",
} as const;

export const CAMPO_GRAD = {
  id: "grad",
  tipo: "opcion-dato",
  etiqueta: "Grad ili općina prebivališta",
  ayuda: "Stope poreza određuje grad ili općina u kojoj živite, a ne ona u kojoj radite.",
  dato: "hr.stopa-niza",
  porDefecto: "zagreb",
} as const;

export const CAMPO_DRUGI_STUP = {
  id: "drugiStup",
  tipo: "si-no",
  etiqueta: "Član ste II. mirovinskog stupa",
  porDefecto: true,
} as const;

export const CAMPO_DJECA = {
  id: "djeca",
  tipo: "entero",
  etiqueta: "Uzdržavana djeca na poreznoj kartici",
  min: 0,
  max: 9,
  porDefecto: 0,
} as const;

export const CAMPO_UZDRZAVANI = {
  id: "uzdrzavani",
  tipo: "entero",
  etiqueta: "Ostali uzdržavani članovi",
  min: 0,
  max: 9,
  porDefecto: 0,
} as const;

export interface VrijednostiPlace {
  readonly "hr.osobni-odbitak": number;
  readonly "hr.koeficijenti-odbitka": Readonly<Record<string, number>>;
  readonly "hr.prag-mjesecni": number;
  readonly "hr.stopa-niza": Readonly<Record<string, number>>;
  readonly "hr.stopa-visa": Readonly<Record<string, number>>;
  readonly "hr.mio-i": number;
  readonly "hr.mio-ii": number;
  readonly "hr.mio-samo-i": number;
  readonly "hr.zdravstveno": number;
  readonly "hr.umanjenje-iznos": number;
  readonly "hr.umanjenje-donja": number;
  readonly "hr.umanjenje-gornja": number;
  readonly "hr.najvisa-osnovica": number;
}

export interface Osobno {
  grad: string;
  drugiStup: boolean;
  djeca: number;
  uzdrzavani: number;
}

export interface Obracun {
  bruto: number;
  umanjenje: number;
  mioI: number;
  mioII: number;
  doprinosi: number;
  dohodak: number;
  odbitak: number;
  osnovica: number;
  porezNiza: number;
  porezVisa: number;
  porez: number;
  neto: number;
  zdravstveno: number;
  trosak: number;
}

export function koeficijent(koef: Readonly<Record<string, number>>, djeca: number, uzdrzavani: number): number {
  let k = 1 + uzdrzavani * (koef["uzdrzavani"] ?? 0);
  for (let i = 1; i <= djeca; i++) k += koef[`d${i}`] ?? 0;
  return k;
}

export function umanjenjeOsnovice(bruto: number, v: VrijednostiPlace): number {
  if (bruto <= v["hr.umanjenje-donja"]) return v["hr.umanjenje-iznos"];
  if (bruto < v["hr.umanjenje-gornja"]) return 0.5 * (v["hr.umanjenje-gornja"] - bruto);
  return 0;
}

// Najviša osnovica ograničava mirovinske doprinose; zdravstveno se računa na cijelu bruto plaću.
export function obracunaj(bruto: number, o: Osobno, v: VrijednostiPlace, redondear: (n: number) => number): Obracun {
  const osnovicaMio = Math.min(bruto, v["hr.najvisa-osnovica"]);
  const umanjenje = redondear(Math.min(umanjenjeOsnovice(bruto, v), osnovicaMio));
  const stopaI = o.drugiStup ? v["hr.mio-i"] : v["hr.mio-samo-i"];
  const mioI = redondear(((osnovicaMio - umanjenje) * stopaI) / 100);
  const mioII = o.drugiStup ? redondear((osnovicaMio * v["hr.mio-ii"]) / 100) : 0;
  const doprinosi = redondear(mioI + mioII);
  const dohodak = redondear(bruto - doprinosi);
  const odbitak = redondear(v["hr.osobni-odbitak"] * koeficijent(v["hr.koeficijenti-odbitka"], o.djeca, o.uzdrzavani));
  const osnovica = Math.max(0, redondear(dohodak - odbitak));
  const prag = v["hr.prag-mjesecni"];
  const porezNiza = redondear((Math.min(osnovica, prag) * (v["hr.stopa-niza"][o.grad] ?? 0)) / 100);
  const porezVisa = redondear((Math.max(0, osnovica - prag) * (v["hr.stopa-visa"][o.grad] ?? 0)) / 100);
  const porez = redondear(porezNiza + porezVisa);
  const neto = redondear(dohodak - porez);
  const zdravstveno = redondear((bruto * v["hr.zdravstveno"]) / 100);
  return { bruto, umanjenje, mioI, mioII, doprinosi, dohodak, odbitak, osnovica, porezNiza, porezVisa, porez, neto, zdravstveno, trosak: redondear(bruto + zdravstveno) };
}

// Neto raste s bruto iznosom, ali po dijelovima (umanjenje, dvije stope, najviša osnovica), pa se traži
// raspolavljanjem do centa umjesto formulom po dijelovima.
export function brutoIzNeta(neto: number, o: Osobno, v: VrijednostiPlace, redondear: (n: number) => number): Obracun {
  let dolje = neto;
  let gore = neto * 3 + 1000;
  for (let i = 0; i < 60; i++) {
    const s = (dolje + gore) / 2;
    if (obracunaj(s, o, v, redondear).neto < neto) dolje = s;
    else gore = s;
  }
  return obracunaj(redondear(gore), o, v, redondear);
}
