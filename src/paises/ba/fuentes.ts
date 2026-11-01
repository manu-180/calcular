import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

// CBBiH daje kursnu listu kao JSON za traženi datum; `Date` je datum liste, a neradnim danom vraća zadnju.
const CBBH = "https://www.cbbh.ba/CurrencyExchange/";
function cbbhJson(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${CBBH}GetJson?date=${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}-${d.getUTCFullYear()}%2000%3A00%3A00`;
}

interface StavkaKursa {
  AlphaCode?: unknown;
  Units?: unknown;
  Middle?: unknown;
}

async function kurs(http: Http, oznaka: string): Promise<readonly PuntoSerie[] | null> {
  const odgovor = (await http.json(cbbhJson(new Date()))) as { Date?: unknown; CurrencyExchangeItems?: unknown };
  const fecha = typeof odgovor.Date === "string" ? odgovor.Date.slice(0, 10) : "";
  if (!esFechaISO(fecha) || !Array.isArray(odgovor.CurrencyExchangeItems)) return null;
  const red = (odgovor.CurrencyExchangeItems as StavkaKursa[]).find((s) => s.AlphaCode === oznaka);
  if (!red) return null;
  const jedinica = Number(red.Units);
  const srednji = Number(red.Middle);
  if (!jedinica || !Number.isFinite(srednji) || srednji <= 0) return null;
  return [{ fecha, valor: srednji / jedinica }];
}

function detectorKursa(oznaka: string, banda: DetectorSerie["banda"]): Detector {
  const k = oznaka.toLowerCase();
  return {
    id: `ba.${k}-cbbh`,
    carril: "serie",
    serie: `ba.${k}`,
    metodo: "api-json",
    url: CBBH,
    banda,
    traer(http) {
      return kurs(http, oznaka);
    },
  };
}

const HOY = () => new Date().toISOString().slice(0, 10) as FechaISO;

// Statistički zavod RS objavljuje CPI samo kao PDF, koji detektor ne čita. Saopštenje s većim mjesecom od
// poznatog traži da se serija ba.ipc dopuni ručno.
const RZS = "https://www.rzs.rs.ba/";
const MJESEC: Record<string, string> = { jan: "01", feb: "02", mart: "03", april: "04", maj: "05", jun: "06", juli: "07", jul: "07", avg: "08", sep: "09", okt: "10", nov: "11", dec: "12" };
async function novoCpi(http: Http, poznato: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(RZS);
  const nadjeno = [...html.matchAll(/IndeksiPotrosackihCijena_([a-z]+)_(\d{4})\.pdf/g)].flatMap((m) => (MJESEC[m[1]] ? [`${m[2]}-${MJESEC[m[1]]}`] : []));
  if (!nadjeno.length) return null;
  const najnovije = nadjeno.sort().at(-1) as string;
  if (najnovije <= poznato) return [];
  return [{ titulo: `RZS RS: novi indeks potrošačkih cijena za ${najnovije}`, url: RZS, fecha: HOY() }];
}

// Zakon o doprinosima i drugi propisi FBiH: spisak koji Porezna uprava drži u svojoj aplikaciji navodi brojeve
// „Službenih novina”. Promjena tog spiska traži čitanje novog teksta.
const PU_APP = "https://www.pufbih.ba/";
async function propisiFbih(http: Http, poznato: readonly string[]): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(PU_APP);
  const skripta = /src="(main-[A-Z0-9]+\.js)"/.exec(html);
  if (!skripta) return null;
  const js = await http.texto(`${PU_APP}${skripta[1]}`);
  const nadjeno: HallazgoNorma[] = [];
  for (const naziv of poznato) {
    const [ime, broj] = naziv.split("|");
    const i = js.indexOf(ime);
    if (i < 0) return null;
    const lista = js.slice(i, i + 260);
    if (!lista.includes(broj)) nadjeno.push({ titulo: `Porezna uprava FBiH: promijenjen spisak izmjena, ${ime}`, url: PU_APP, fecha: HOY() });
  }
  return nadjeno;
}

// Odluke Vlade FBiH o najnižoj plati: članak za novu godinu nosi broj godine u naslovu.
const VLADA_FBIH = "https://fbihvlada.gov.ba/bs/";
async function novaOdlukaFbih(http: Http, godina: number): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(`${VLADA_FBIH}vlada-fbih-utvrden-iznos-najnize-place-za-${godina}-godinu`).catch(() => null);
  if (html === null) return [];
  return [{ titulo: `Vlada FBiH: iznos najniže plate za ${godina}. godinu`, url: `${VLADA_FBIH}vlada-fbih-utvrden-iznos-najnize-place-za-${godina}-godinu`, fecha: HOY() }];
}

export const detectores: readonly Detector[] = [
  detectorKursa("USD", { min: 1.3, max: 2.3, saltoRelativoMax: 0.06 }),
  detectorKursa("GBP", { min: 1.9, max: 2.9, saltoRelativoMax: 0.06 }),
  detectorKursa("CHF", { min: 1.7, max: 2.7, saltoRelativoMax: 0.06 }),
  detectorKursa("RSD", { min: 0.014, max: 0.02, saltoRelativoMax: 0.05 }),
  {
    id: "ba.cpi-rzs",
    carril: "norma",
    datos: ["ba.prosjecna-neto-rs-2025"],
    metodo: "html",
    url: RZS,
    traer(http) {
      return novoCpi(http, "2026-09");
    },
  },
  {
    id: "ba.propisi-fbih",
    carril: "norma",
    datos: ["ba.doprinosi", "ba.doprinosi-poslodavac-fbih", "ba.porez", "ba.odbitak"],
    metodo: "html",
    url: PU_APP,
    traer(http) {
      return propisiFbih(http, ["Zakon o doprinosima (|33/25", "Zakon o porezu na dohodak (|65/13"]);
    },
  },
  {
    id: "ba.najniza-plata-fbih",
    carril: "norma",
    datos: ["ba.minimalna-fbih"],
    metodo: "html",
    url: VLADA_FBIH,
    traer(http) {
      return novaOdlukaFbih(http, 2027);
    },
  },
];
