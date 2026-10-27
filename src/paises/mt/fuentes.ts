import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-26";
const FEED = "https://legislation.mt/eli/eli-update-feed.atom";

// El feed Atom de legislation.mt lista las normas publicadas o consolidadas en las últimas semanas,
// con títulos en maltés. Cada detector se queda con las de su tema por la ruta ELI (cap/123) o por
// palabras del título, y solo con las publicadas después de la última verificación.
async function novedadesFeed(http: Http, url: string, capitulos: readonly string[], titulo: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const xml = await http.texto(url, { userAgentNavegador: true });
  const entradas = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
  if (entradas.length === 0) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const [, e] of entradas) {
    const id = /<id>(https:\/\/legislation\.mt\/eli\/[^<]+)<\/id>/.exec(e)?.[1];
    const nombre = /<title[^>]*>([^<]*)<\/title>/.exec(e)?.[1]?.replace(/\s+/g, " ").trim();
    const fecha = /<published>(\d{4}-\d{2}-\d{2})/.exec(e)?.[1];
    if (!id || !nombre || !fecha || !esFechaISO(fecha)) return null;
    const ruta = id.replace("https://legislation.mt/eli/", "");
    const delTema = capitulos.some((c) => ruta === c || ruta.startsWith(`${c}/`)) || titulo.test(nombre);
    if (delTema && fecha > VERIFICADO) hallazgos.push({ titulo: nombre, url: id, fecha });
  }
  return hallazgos;
}

function feed(id: string, datos: readonly string[], capitulos: readonly string[], titulo: RegExp): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "api-xml",
    url: FEED,
    userAgentNavegador: true,
    traer(http) {
      return novedadesFeed(http, this.url, capitulos, titulo);
    },
  };
}

export const detectores: readonly Detector[] = [
  feed(
    "mt.legislation-income-tax",
    [
      "mt.income-tax-single",
      "mt.income-tax-married",
      "mt.income-tax-parent",
      "mt.income-tax-parent-one-child",
      "mt.income-tax-parent-two-children",
      "mt.income-tax-married-one-child",
      "mt.income-tax-married-two-children",
      "mt.property-transfer-tax",
      "mt.part-time-tax-rate",
      "mt.part-time-limits",
      "mt.overtime-tax-rate",
      "mt.overtime-tax-limits",
    ],
    ["cap/123", "sl/123.39", "sl/123.200", "act"],
    /Taxxa fuq l-Income|Income Tax|Xog[ħh]ol Part-Time|Sahra|Mi[żz]uri tal-Ba[ġg]it/i,
  ),
  feed(
    "mt.legislation-wages",
    ["mt.minimum-wage", "mt.cola", "mt.statutory-bonuses", "mt.annual-leave-hours", "mt.overtime", "mt.notice-weeks", "mt.probation-months"],
    ["cap/452", "sl/452.71", "sl/452.87", "sl/452.115"],
    /Paga Minima|[ŻZ]ieda fil-Pag|Minimum Wage|Wage Increase|Organizzazzjoni tal-[ĦH]in tax-Xog[ħh]ol|Liv Annwali|Bonus/i,
  ),
  feed(
    "mt.legislation-vat-duty",
    ["mt.vat-rates", "mt.duty-rates", "mt.duty-thresholds"],
    ["cap/406", "cap/364", "sl/364.12"],
    /Valur Mi[żz]jud|Value Added Tax|Dokumenti u Trasferimenti|Duty on Documents/i,
  ),
  feed(
    "mt.legislation-social-security",
    ["mt.ssc-rate", "mt.ssc-weekly", "mt.maternity-fund-rate", "mt.pension-age"],
    ["cap/318"],
    /Sigurt[àa] So[ċc]jali|Social Security/i,
  ),
  feed("mt.legislation-inflation-index", ["mt.inflation-index"], ["cap/158"], /Indi[ċc]i tal-Inflazzjoni|Index of Inflation/i),
];
