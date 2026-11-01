import type { Detector, DetectorSerie, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const NBG = "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json/";

interface RespuestaNbg {
  date?: string;
  currencies?: { code?: string; quantity?: number; rate?: number }[];
}

// La API del Banco Nacional devuelve el curso por «quantity» unidades (10 liras, 100 rublos): se
// guarda por unidad, igual que en series.json. El día es el «date» del bloque, no el de cada moneda.
async function nbgKursi(http: Http, valuta: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(`${NBG}?currencies=${valuta}`)) as RespuestaNbg[];
  const bloque = Array.isArray(json) ? json[0] : undefined;
  const c = bloque?.currencies?.find((x) => x.code === valuta);
  const fecha = bloque?.date?.slice(0, 10);
  if (!c || !fecha || typeof c.rate !== "number" || typeof c.quantity !== "number" || c.quantity <= 0) return null;
  return [{ fecha: fecha as PuntoSerie["fecha"], valor: Math.round((c.rate / c.quantity) * 1e6) / 1e6 }];
}

function detectorKursi(valuta: string, banda: DetectorSerie["banda"]): Detector {
  const k = valuta.toLowerCase();
  return {
    id: `ge.${k}-nbg`,
    carril: "serie",
    serie: `ge.${k}`,
    metodo: "api-json",
    url: `${NBG}?currencies=${valuta}`,
    banda,
    traer(http) {
      return nbgKursi(http, valuta);
    },
  };
}

// El IPC de Geostat solo se publica en xlsx y `Http` no lee binarios: se vigila el id del archivo en
// la página y el hallazgo abre el PR para cargar el mes nuevo a mano.
const CPI_ACTUAL = 83216;
const PENSIA_NAKHULI = "2026-09-21";
const KODEKSI_NAKHULI = "2026-10-16";

export const detectores: readonly Detector[] = [
  detectorKursi("USD", { min: 1.8, max: 4, saltoRelativoMax: 0.05 }),
  detectorKursi("EUR", { min: 2, max: 4.5, saltoRelativoMax: 0.05 }),
  detectorKursi("GBP", { min: 2.4, max: 5.2, saltoRelativoMax: 0.05 }),
  detectorKursi("TRY", { min: 0.02, max: 0.15, saltoRelativoMax: 0.08 }),
  detectorKursi("RUB", { min: 0.015, max: 0.06, saltoRelativoMax: 0.08 }),
  {
    id: "ge.cpi-geostat",
    carril: "norma",
    datos: ["ge.cpi-bazisi"],
    metodo: "html",
    url: "https://www.geostat.ge/ka/modules/categories/26/samomkhmareblo-fasebis-indeksi-inflatsia",
    async traer(http): Promise<HallazgoNorma[] | null> {
      const html = await http.texto(this.url);
      const m = /media\/(\d+)\/samomxmareblo-fasebis-indeqsebi-2010-wlis/.exec(html);
      if (!m) return null;
      if (Number(m[1]) === CPI_ACTUAL) return [];
      return [{ titulo: "საქსტატმა ფასების ინდექსის ახალი ფაილი გამოაქვეყნა", url: `https://www.geostat.ge/media/${m[1]}/samomxmareblo-fasebis-indeqsebi-2010-wlis-sashualo%3D100.xlsx`, fecha: new Date().toISOString().slice(0, 10) as HallazgoNorma["fecha"] }];
    },
  },
  {
    id: "ge.pensia-kanoni",
    carril: "norma",
    datos: ["ge.pensia-dasaqmebuli", "ge.pensia-damsaqmebeli", "ge.pensia-sakhelmtsipo", "ge.pensia-sakhelmtsipo-2", "ge.pensia-zghvari-1", "ge.pensia-zghvari-2"],
    metodo: "api-json",
    url: "https://site-api.pensions.ge/api/v1/embedded-doc/get-all",
    async traer(http): Promise<HallazgoNorma[] | null> {
      const json = (await http.json(this.url)) as { result?: { slug?: string; date?: string }[] };
      const fecha = json.result?.find((x) => x.slug === "georgian-law-about-cumulative-pensions")?.date;
      if (!fecha) return null;
      return fecha > PENSIA_NAKHULI ? [{ titulo: "საპენსიო ფონდმა კანონის ახალი რედაქცია გამოაქვეყნა", url: "https://www.pensions.ge/", fecha: fecha as HallazgoNorma["fecha"] }] : [];
    },
  },
  {
    id: "ge.sagadasakhado-kodeksi",
    carril: "norma",
    datos: ["ge.sashemosavlo", "ge.dghg", "ge.mtsire", "ge.dividendi", "ge.protsenti", "ge.qoneba-max", "ge.mogeba"],
    metodo: "html",
    url: "https://infohubapi.rs.ge/api/documents/800cbef0-32bf-4f06-94fe-8afd2bf144a0/details-by-key?openFromSearch=false",
    async traer(http): Promise<HallazgoNorma[] | null> {
      // La API del hub exige el idioma en este encabezado propio y devuelve el código entero (6 MB).
      const texto = await http.texto(this.url, { encabezados: { languageCode: "ka" } });
      // Cada enmienda queda al pie del artículo como «ვებგვერდი, 16.10.2026წ.»: la más nueva manda.
      const fechas = [...texto.matchAll(/ვებგვერდი,\s*(\d{2})\.(\d{2})\.(\d{4})/g)].map((m) => `${m[3]}-${m[2]}-${m[1]}`).sort();
      const ultima = fechas.at(-1);
      if (!ultima) return null;
      return ultima > KODEKSI_NAKHULI ? [{ titulo: "საგადასახადო კოდექსში ცვლილება გამოქვეყნდა", url: "https://infohub.rs.ge/ka/workspace/document/800cbef0-32bf-4f06-94fe-8afd2bf144a0", fecha: ultima as HallazgoNorma["fecha"] }] : [];
    },
  },
  {
    id: "ge.mpr-nbg",
    carril: "norma",
    datos: ["ge.mpr"],
    metodo: "html",
    url: "https://nbg.gov.ge/en/monetary-policy/committee-decisions",
    async traer(http): Promise<HallazgoNorma[] | null> {
      const html = await http.texto(this.url);
      if (!html.includes("8.25") && !/\d+\.\d+/.test(html)) return null;
      return html.includes("8.25") ? [] : [{ titulo: "ეროვნული ბანკის განაკვეთი შეიცვალა", url: this.url, fecha: new Date().toISOString().slice(0, 10) as HallazgoNorma["fecha"] }];
    },
  },
];
