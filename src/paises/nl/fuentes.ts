import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

// CBS zet achter de sleutel van een categorie spaties; zonder die spaties geeft het filter niets terug.
const CPI_URL =
  "https://opendata.cbs.nl/ODataApi/odata/86141NED/TypedDataSet?$filter=Bestedingscategorieen%20eq%20%27T001112%20%20%27&$select=Perioden,CPI_1";

const SRU = "https://repository.overheid.nl/sru";

function sruUrl(publicatie: string, woorden: string): `https://${string}` {
  const query = `w.publicatienaam="${publicatie}" and dt.title any "${woorden}"`;
  return `${SRU}?operation=searchRetrieve&version=2.0&maximumRecords=50&query=${encodeURIComponent(query)}`;
}

// De SRU-dienst negeert sortKeys en geeft de oudste stukken eerst. Daarom beperken we de vraag tot
// het laatste jaar; de query staat als laatste parameter in de url, dus de datum kan erachter.
function laatsteJaar(url: string): string {
  const grens = new Date(Date.now() - 365 * 86_400_000).toISOString().slice(0, 10);
  return `${url}${encodeURIComponent(` and dt.date>="${grens}"`)}`;
}

// De SRU-dienst van officielebekendmakingen.nl geeft records met titel, datum en een link naar de
// publicatie. Zonder <sru:numberOfRecords> is het antwoord geen SRU meer: dan null in plaats van [].
async function bekendmakingen(http: Http, url: string): Promise<HallazgoNorma[] | null> {
  const xml = await http.texto(url);
  if (!/<sru:numberOfRecords>/.test(xml)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const [, record] of xml.matchAll(/<sru:record>([\s\S]*?)<\/sru:record>/g)) {
    const titulo = /<dcterms:title>([\s\S]*?)<\/dcterms:title>/.exec(record)?.[1]?.trim();
    const fecha = /<dcterms:date>(\d{4}-\d{2}-\d{2})<\/dcterms:date>/.exec(record)?.[1];
    const enlace = /resourceIdentifier="(https:\/\/[^"]+)"/.exec(record)?.[1];
    if (!titulo || !fecha || !enlace || !esFechaISO(fecha)) continue;
    hallazgos.push({ titulo, url: enlace, fecha });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "nl.cpi-cbs",
    carril: "serie",
    serie: "nl.cpi",
    metodo: "api-json",
    url: CPI_URL,
    banda: { min: 90, max: 130, saltoRelativoMax: 0.03 },
    async traer(http) {
      const json = (await http.json(this.url)) as { value?: { Perioden?: string; CPI_1?: number | null }[] };
      if (!Array.isArray(json?.value)) return null;
      const puntos: PuntoSerie[] = [];
      for (const fila of json.value) {
        const m = /^(\d{4})MM(\d{2})$/.exec(fila.Perioden?.trim() ?? "");
        if (!m || typeof fila.CPI_1 !== "number") continue;
        const fecha = `${m[1]}-${m[2]}-01`;
        if (!esFechaISO(fecha)) return null;
        puntos.push({ fecha, valor: fila.CPI_1 });
      }
      return puntos.length ? puntos : null;
    },
  },
  {
    id: "nl.staatscourant-minimumloon",
    carril: "norma",
    datos: ["nl.minimumloon", "nl.ww-maximumdagloon", "nl.maximumpremieloon"],
    metodo: "api-xml",
    url: sruUrl("Staatscourant", "minimumloon minimumjeugdloon maximumdagloon"),
    async traer(http) {
      return bekendmakingen(http, laatsteJaar(this.url));
    },
  },
  {
    id: "nl.staatsblad-belastingplan",
    carril: "norma",
    datos: [
      "nl.box1-schijven",
      "nl.ahk",
      "nl.ahk-afbouw",
      "nl.arbeidskorting-grenzen",
      "nl.arbeidskorting-tarieven",
      "nl.iack",
      "nl.aftrek-maximumtarief",
      "nl.zelfstandigenaftrek",
      "nl.mkb-winstvrijstelling",
      "nl.btw-hoog",
      "nl.btw-laag",
      "nl.overdrachtsbelasting",
      "nl.box3-rendement",
      "nl.box3-heffingsvrij",
      "nl.eigenwoningforfait",
    ],
    metodo: "api-xml",
    url: sruUrl("Staatsblad", "Belastingplan inkomstenbelasting omzetbelasting overdrachtsbelasting box"),
    async traer(http) {
      return bekendmakingen(http, laatsteJaar(this.url));
    },
  },
  {
    id: "nl.staatscourant-indexering",
    carril: "norma",
    datos: ["nl.kinderbijslag", "nl.aow-bruto", "nl.aow-vakantiegeld", "nl.transitievergoeding-max", "nl.premies-werkgever", "nl.zvw-bijdrage"],
    metodo: "api-xml",
    url: sruUrl("Staatscourant", "kinderbijslag AOW-pensioen transitievergoeding premiepercentages Zorgverzekeringswet"),
    async traer(http) {
      return bekendmakingen(http, laatsteJaar(this.url));
    },
  },
];
