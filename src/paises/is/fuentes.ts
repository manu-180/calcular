import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

function dagsetning(d: Date): FechaISO {
  return d.toISOString().slice(0, 10) as FechaISO;
}

// Seðlabankinn lætur röð í té sem CSV: «...;10/30/2026 12:00:00 AM;136.000000». Dagsetningin er á
// bandarísku sniði. Röð án gagna skilar einni línu „No data found“.
async function gengisrod(http: Http, rod: number): Promise<readonly PuntoSerie[] | null> {
  const nu = new Date();
  const fra = dagsetning(new Date(nu.getTime() - 20 * 86400000));
  const texti = await http.texto(`https://sedlabanki.is/xmltimeseries/Default.aspx?DagsFra=${fra}&DagsTil=${dagsetning(nu)}&TimeSeriesID=${rod}&Type=csv`);
  const punktar: PuntoSerie[] = [];
  for (const m of texti.matchAll(/;(\d{1,2})\/(\d{1,2})\/(\d{4}) [^;]*;(\d+\.\d+)/g)) {
    const fecha = `${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
    if (!esFechaISO(fecha)) return null;
    punktar.push({ fecha, valor: Number(m[4]) });
  }
  return punktar.length ? punktar : null;
}

function gengi(mynt: string, rod: number, banda: DetectorSerie["banda"]): Detector {
  return {
    id: `is.${mynt}-sedlabanki`,
    carril: "serie",
    serie: `is.${mynt}`,
    metodo: "html",
    url: `https://sedlabanki.is/xmltimeseries/Default.aspx?TimeSeriesID=${rod}&Type=csv`,
    banda,
    traer(http) {
      return gengisrod(http, rod);
    },
  };
}

const PX = "https://px.hagstofa.is/pxis/api/v1/is/Efnahagur/visitolur/1_vnv/1_vnv/";

interface SvarPx {
  data?: readonly { key?: readonly string[]; values?: readonly string[] }[];
}

// PXWeb Hagstofunnar svarar aðeins POST með fyrirspurn í JSON.
async function pxRod(http: Http, tafla: string, breytur: readonly { code: string; selection: { filter: string; values: readonly string[] } }[]): Promise<readonly PuntoSerie[] | null> {
  if (!http.postJson) return null;
  const svar = (await http.postJson(`${PX}${tafla}`, {
    query: [{ code: "Mánuður", selection: { filter: "top", values: ["6"] } }, ...breytur],
    response: { format: "json" },
  })) as SvarPx;
  const punktar: PuntoSerie[] = [];
  for (const lina of svar.data ?? []) {
    const m = /^(\d{4})M(\d{2})$/.exec(lina.key?.[0] ?? "");
    const valor = Number(lina.values?.[0]);
    if (!m || !Number.isFinite(valor)) return null;
    const fecha = `${m[1]}-${m[2]}-01`;
    if (!esFechaISO(fecha)) return null;
    punktar.push({ fecha, valor });
  }
  return punktar.length ? punktar : null;
}

// Ef þekkt tala hverfur af síðu stofnunar hefur fjárhæðin líklega breyst. Síða sem hefur ekki
// lengur einkennisorðið sitt er talin breytt eða niðri og skilar null.
function norma(id: string, url: `https://${string}`, datos: readonly string[], kennimark: string, tolur: readonly string[], titill: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url,
    async traer(http): Promise<readonly HallazgoNorma[] | null> {
      const texti = await http.texto(url);
      if (!texti.includes(kennimark)) return null;
      const horfnar = tolur.filter((t) => !texti.includes(t));
      if (!horfnar.length) return [];
      return [{ titulo: `${titill}: horfin tala ${horfnar.join(", ")}`, url, fecha: dagsetning(new Date()) }];
    },
  };
}

const RSS_SEDLABANKA = "https://sedlabanki.is/api/documents/views/greinasafn-si/RSS/Frettatilkynningar";
// Tilkynningar sem þegar eru lesnar: til og með nr. 10/2026 og yfirlýsingu október 2026. Það sem kemur
// á eftir birtist sem hallazgo til yfirferðar.
const LESID = /nr-(?:0\d|10)-2026|-(?:januar|februar|mars|april|mai|juni|juli|agust|september|oktober)-2026|-20(?:1\d|2[0-5])(?:\D|$)/;

export const detectores: readonly Detector[] = [
  gengi("eur", 4064, { min: 110, max: 190, saltoRelativoMax: 0.05 }),
  gengi("usd", 4055, { min: 90, max: 180, saltoRelativoMax: 0.06 }),
  gengi("gbp", 4103, { min: 130, max: 220, saltoRelativoMax: 0.06 }),
  gengi("nok", 4091, { min: 9, max: 18, saltoRelativoMax: 0.06 }),
  gengi("sek", 4109, { min: 9, max: 18, saltoRelativoMax: 0.06 }),
  gengi("chf", 4106, { min: 110, max: 210, saltoRelativoMax: 0.06 }),
  {
    id: "is.vnv-hagstofa",
    carril: "serie",
    serie: "is.vnv",
    metodo: "api-json",
    url: `${PX}VIS01000.px`,
    banda: { min: 650, max: 900, saltoRelativoMax: 0.03 },
    traer(http) {
      return pxRod(http, "VIS01000.px", [
        { code: "Vísitala", selection: { filter: "item", values: ["CPI"] } },
        { code: "Liður", selection: { filter: "item", values: ["index"] } },
      ]);
    },
  },
  {
    id: "is.verdtrygging-hagstofa",
    carril: "serie",
    serie: "is.verdtrygging",
    metodo: "api-json",
    url: `${PX}VIS01004.px`,
    banda: { min: 650, max: 900, saltoRelativoMax: 0.03 },
    traer(http) {
      return pxRod(http, "VIS01004.px", [{ code: "Vísitala", selection: { filter: "item", values: ["financial_indexation"] } }]);
    },
  },
  norma("is.skatturinn-stadgreidsla", "https://www.skatturinn.is/einstaklingar/stadgreidsla/stadgreidsla/2026/", ["is.skattthrep-man", "is.personuafslattur-man", "is.utsvar-stadgreidsla", "is.tryggingagjald"], "Persónuafsláttur", ["498.122", "72.492", "14,94"], "Staðgreiðsla Skattsins"),
  norma("is.skatturinn-helstu-tolur", "https://www.skatturinn.is/einstaklingar/helstutolur/2026/helstu-tolur-og-prosentur-2026", ["is.vsk", "is.fjarmagnstekjuskattur", "is.dagpeningar", "is.erfdafjarskattur-fritekjumark"], "Helstu tölur", ["6.789.790", "42.100"], "Helstu tölur Skattsins"),
  norma("is.skatturinn-barnabaetur", "https://www.skatturinn.is/einstaklingar/vaxtabaetur-og-barnabaetur/barnabaetur/", ["is.barnabaetur", "is.barnabaetur-vidbot"], "Barnabætur", ["514.500", "345.000"], "Barnabætur"),
  norma("is.vmst-atvinnuleysisbaetur", "https://island.is/redirects/www.vinnumalastofnun.is/atvinnuleitandi/fjarhaedir-og-greidslur-atvinnuleysisbota/fjarhaedir-atvinnuleysisbota", ["is.atvinnuleysi-grunn", "is.atvinnuleysi-hamark"], "Atvinnuleysis", ["383.870", "605.159"], "Atvinnuleysisbætur"),
  norma("is.faedingarorlof", "https://island.is/umsokn-um-faedingarorlof/upphaedir-og-utreikningur", ["is.faedingarorlof-hamark", "is.faedingarorlof-lagmark"], "orlof", ["900.000", "275.688"], "Fæðingarorlof"),
  norma("is.tr-ellilifeyrir", "https://island.is/umsokn-um-ellilifeyri/fjarhaedir", ["is.ellilifeyrir", "is.elli-fritekjumark"], "llilífeyri", ["365.592", "43.658"], "Ellilífeyrir"),
  {
    id: "is.sedlabanki-tilkynningar",
    carril: "norma",
    datos: ["is.meginvextir", "is.drattarvextir", "is.vextir-peningakrofur"],
    metodo: "html",
    url: RSS_SEDLABANKA,
    async traer(http) {
      const texti = await http.texto(RSS_SEDLABANKA);
      if (!texti.includes("<rss")) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const m of texti.matchAll(/<link>(https:\/\/[^<]*(?:tilkynning-um-drattarvexti|yfirlysing-peningastefnunefndar)[^<]*)<\/link>/g)) {
        if (LESID.test(m[1])) continue;
        hallazgos.push({ titulo: "Ný tilkynning Seðlabankans um vexti", url: m[1], fecha: dagsetning(new Date()) });
      }
      return hallazgos;
    },
  },
];
