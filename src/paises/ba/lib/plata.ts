// Obračun plate zavisi od entiteta. U FBiH porez ide na bruto umanjen za doprinose iz plate (Zakon o porezu
// na dohodak, član 11), a u RS na bruto (Zakon o porezu na dohodak RS, član 13, „Sl. glasnik“ 119/21).
// Iz RS: dio od 50 KM iz člana 8. stav 2. tačka 13) nije osnovica ni za porez ni za doprinose. To potvrđuju
// sami iznosi iz Odluke o najnižoj plati za 2026: 1.476,23 bruto daje 1.000,00 neto.

export type Entitet = "fbih" | "rs";

export interface Vrijednosti {
  "ba.doprinosi": Readonly<Record<string, Readonly<Record<string, number>>>>;
  "ba.doprinosi-poslodavac-fbih": Readonly<Record<string, number>>;
  "ba.porez": Readonly<Record<string, number>>;
  "ba.odbitak-mjesecno": Readonly<Record<string, number>>;
  "ba.odbitak-clan-rs": number;
  "ba.neoporezivo-rs": number;
}

export const REQUIERE_PLATA = {
  "ba.doprinosi": "mapa-por-region",
  "ba.doprinosi-poslodavac-fbih": "mapa",
  "ba.porez": "numero-por-region",
  "ba.odbitak-mjesecno": "numero-por-region",
  "ba.odbitak-clan-rs": "numero",
  "ba.neoporezivo-rs": "numero",
  "ba.doprinosi-ukupno": "numero-por-region",
  "ba.doprinosi-poslodavac-fbih-ukupno": "numero",
  "ba.odbitak": "numero-por-region",
} as const;

export const CAMPO_REGION = { id: "region", tipo: "region", etiqueta: "Entitet u kojem radite", regiones: ["fbih", "rs"], porDefecto: "fbih" } as const;

export const CAMPO_SPREMA = {
  id: "sprema",
  tipo: "opcion",
  etiqueta: "Posao po stepenu obrazovanja",
  ayuda: "Za poslove bez uslova o obrazovanju i one s najmanje trogodišnjom srednjom školom dio plate od 50 KM nije oporeziv.",
  opciones: [
    { valor: "do3", etiqueta: "Bez uslova ili trogodišnja srednja škola" },
    { valor: "vise", etiqueta: "Četverogodišnja škola ili više" },
  ],
  porDefecto: "vise",
  visibleSi: { region: ["rs"] },
} as const;

export const CAMPOS_ENTITET = [
  CAMPO_REGION,
  { id: "faktor", tipo: "numero", etiqueta: "Faktor ličnog odbitka s porezne kartice", ayuda: "Sami: 1. Za izdržavanog bračnog druga ili prvo dijete dodaje se 0,5. Tačan zbir piše na poreznoj kartici.", min: 0, max: 10, porDefecto: 1, visibleSi: { region: ["fbih"] } },
  { id: "izdrzavani", tipo: "entero", etiqueta: "Izdržavani članovi na poreskoj kartici", min: 0, max: 15, porDefecto: 0, visibleSi: { region: ["rs"] } },
  CAMPO_SPREMA,
] as const;

export interface Ulaz {
  region: string;
  faktor: number | null;
  izdrzavani: number | null;
  sprema: string | null;
}

export interface Obracun {
  bruto: number;
  doprinosi: number;
  pio: number;
  zdravstvo: number;
  nezaposlenost: number;
  djecija: number;
  odbitak: number;
  osnovicaPoreza: number;
  porez: number;
  neto: number;
  naPlatu: number;
  trosak: number;
}

export function obracunaj(bruto: number, u: Ulaz, v: Readonly<Vrijednosti>, redondear: (n: number) => number): Obracun {
  const s = v["ba.doprinosi"][u.region];
  const stopaPoreza = v["ba.porez"][u.region];
  const osnovniOdbitak = v["ba.odbitak-mjesecno"][u.region];
  const rs = u.region === "rs";
  const neoporezivo = rs && u.sprema === "do3" ? Math.min(bruto, v["ba.neoporezivo-rs"]) : 0;
  const osnovica = bruto - neoporezivo;
  const pio = redondear((osnovica * s.pio) / 100);
  const zdravstvo = redondear((osnovica * s.zdravstvo) / 100);
  const nezaposlenost = redondear((osnovica * s.nezaposlenost) / 100);
  const djecija = rs ? redondear((osnovica * (s.djecija ?? 0)) / 100) : 0;
  const doprinosi = redondear(pio + zdravstvo + nezaposlenost + djecija);
  const odbitak = rs ? redondear(osnovniOdbitak + ((u.izdrzavani ?? 0) * v["ba.odbitak-clan-rs"]) / 12) : redondear(osnovniOdbitak * (u.faktor ?? 1));
  const dohodak = rs ? osnovica : osnovica - doprinosi;
  const osnovicaPoreza = redondear(Math.max(0, dohodak - odbitak));
  const porez = redondear((osnovicaPoreza * stopaPoreza) / 100);
  const neto = redondear(osnovica - doprinosi - porez + neoporezivo);
  const poslodavac = rs ? 0 : Object.values(v["ba.doprinosi-poslodavac-fbih"]).reduce((a, b) => a + redondear((bruto * b) / 100), 0);
  const naPlatu = redondear(poslodavac);
  return { bruto, doprinosi, pio, zdravstvo, nezaposlenost, djecija, odbitak, osnovicaPoreza, porez, neto, naPlatu, trosak: redondear(bruto + naPlatu) };
}

// Najmanji bruto (na feninge) iz kojeg ostaje bar traženi neto. Neto ne opada kad bruto raste.
export function brutoIzNeta(cilj: number, u: Ulaz, v: Readonly<Vrijednosti>, redondear: (n: number) => number): Obracun {
  let dole = 0;
  let gore = Math.max(100000, Math.ceil(cilj * 400));
  while (obracunaj(gore / 100, u, v, redondear).neto < cilj) gore *= 2;
  while (gore - dole > 1) {
    const sredina = Math.floor((dole + gore) / 2);
    if (obracunaj(sredina / 100, u, v, redondear).neto >= cilj) gore = sredina;
    else dole = sredina;
  }
  return obracunaj(gore / 100, u, v, redondear);
}
