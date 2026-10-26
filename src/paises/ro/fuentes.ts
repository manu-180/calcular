import { esFechaISO } from "@/motor/vigencia";
import type { BandaSerie, Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";
const BNR_XML = "https://curs.bnr.ro/nbrfxrates10days.xml";
const CODUL_FISCAL = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";
const ULTIMA_ACTUALIZARE_CF = "LEGEA nr. 170/2026";

// BNR publică cursurile de referință în XML (curs.bnr.ro, din 2026 doar prin HTTPS). Unele monede vin cu
// multiplier="100" (cursul pentru 100 de unități), așa că se împarte.
async function cursBnr(http: Http, cod: string): Promise<readonly PuntoSerie[] | null> {
  const xml = await http.texto(BNR_XML);
  if (!/<DataSet[\s>]/.test(xml)) return null;
  const puncte: PuntoSerie[] = [];
  for (const m of xml.matchAll(/<Cube date="(\d{4}-\d{2}-\d{2})">([\s\S]*?)<\/Cube>/g)) {
    const r = new RegExp(`currency="${cod}"(?:\\s+multiplier="(\\d+)")?\\s*>([\\d.]+)<`).exec(m[2]);
    if (!r || !esFechaISO(m[1])) continue;
    const valor = Number(r[2]) / Number(r[1] ?? 1);
    if (!Number.isFinite(valor) || valor <= 0) return null;
    puncte.push({ fecha: m[1], valor: Math.round(valor * 1e6) / 1e6 });
  }
  puncte.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puncte.length ? puncte : null;
}

function detectorCurs(cod: string, banda: BandaSerie): Detector {
  const c = cod.toLowerCase();
  return {
    id: `ro.${c}-bnr`,
    carril: "serie",
    serie: `ro.${c}`,
    metodo: "api-xml",
    url: BNR_XML,
    banda,
    traer(http) {
      return cursBnr(http, cod);
    },
  };
}

// Eurostat publică IAPC lunar (2025 = 100) în format JSON-stat; dimensiunea timp vine ca index.
async function iapcEurostat(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(url)) as {
    value?: Record<string, unknown>;
    dimension?: { time?: { category?: { index?: Record<string, number> } } };
  };
  const index = json?.dimension?.time?.category?.index;
  if (!index || !json.value) return null;
  const puncte: PuntoSerie[] = [];
  for (const [luna, poz] of Object.entries(index)) {
    const v = json.value[String(poz)];
    const fecha = `${luna}-01`;
    if (typeof v !== "number" || !esFechaISO(fecha) || luna < "2000-01") continue;
    puncte.push({ fecha, valor: v });
  }
  puncte.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puncte.length ? puncte : null;
}

// Codul fiscal actualizat de ANAF spune în antet ultimul act care l-a modificat. Dacă se schimbă,
// e un act nou de verificat (cote, deduceri, plafoane).
async function actualizareCodFiscal(http: Http): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(CODUL_FISCAL);
  const m = /ultima actualizare:\s*([^<\r\n]+?)\s*</i.exec(html);
  if (!m) return null;
  const act = m[1].replace(/\s+/g, " ").trim();
  if (act === ULTIMA_ACTUALIZARE_CF) return [];
  return [{ titulo: `Codul fiscal actualizat de ANAF: ${act}`, url: CODUL_FISCAL, fecha: VERIFICADO }];
}

const DATE_CODUL_FISCAL = [
  "ro.cas", "ro.cass", "ro.cam", "ro.impozit-venit", "ro.deducere-baza", "ro.deducere-plafon", "ro.deducere-pas",
  "ro.deducere-scadere", "ro.deducere-tineri", "ro.deducere-copil", "ro.tva", "ro.cota-micro", "ro.plafon-micro",
  "ro.impozit-dividende", "ro.impozit-dobanzi", "ro.forfetar-chirii", "ro.forfetar-drepturi-autor",
  "ro.impozit-transfer-imobiliar", "ro.plafoane-cass", "ro.plafoane-cass-pfa", "ro.plafoane-cas",
];

export const detectores: readonly Detector[] = [
  detectorCurs("EUR", { min: 4.6, max: 6.5, saltoRelativoMax: 0.04 }),
  detectorCurs("USD", { min: 3.6, max: 6.2, saltoRelativoMax: 0.06 }),
  detectorCurs("GBP", { min: 5.2, max: 7.6, saltoRelativoMax: 0.06 }),
  detectorCurs("CHF", { min: 4.6, max: 7.2, saltoRelativoMax: 0.06 }),
  detectorCurs("MDL", { min: 0.2, max: 0.34, saltoRelativoMax: 0.06 }),
  {
    id: "ro.iapc-eurostat",
    carril: "serie",
    serie: "ro.iapc",
    metodo: "api-json",
    url: "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr?geo=RO&unit=I25&coicop18=TOTAL&sinceTimePeriod=2000-01",
    banda: { min: 0.5, max: 160, saltoRelativoMax: 0.05 },
    traer(http) {
      return iapcEurostat(http, this.url);
    },
  },
  {
    id: "ro.codul-fiscal-anaf",
    carril: "norma",
    datos: DATE_CODUL_FISCAL,
    metodo: "html",
    url: CODUL_FISCAL,
    traer(http) {
      return actualizareCodFiscal(http);
    },
  },
  {
    id: "ro.salariu-minim-hg",
    carril: "norma",
    datos: ["ro.salariu-minim", "ro.salariu-minim-orar", "ro.ore-lunare-salariu-minim", "ro.salariu-minim-1-ianuarie", "ro.facilitate-salariu-minim"],
    // Manual: hotărârea anuală a salariului minim nu are o listă oficială care să se poată citi automat
    // (gov.ro încarcă ședințele cu JavaScript, mmuncii.gov.ro cere verificare anti-bot). Semaforul
    // avertizează înainte de 1 ianuarie 2027, când expiră suma neimpozabilă și baza anuală pentru CASS.
    metodo: "manual",
    url: "https://monitoruloficial.ro/",
    async traer() {
      return [];
    },
  },
  {
    id: "ro.codul-muncii",
    carril: "norma",
    datos: ["ro.concediu-odihna-minim", "ro.spor-ore-suplimentare", "ro.preaviz"],
    // Manual: legislatie.just.ro închide conexiunea TLS de pe rețeaua de lucru; textul se verifică de mână.
    metodo: "manual",
    url: "https://legislatie.just.ro/Public/DetaliiDocument/41625",
    async traer() {
      return [];
    },
  },
];
