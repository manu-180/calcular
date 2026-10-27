import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-26";

const DTK = "https://cystatdb.cystat.gov.cy/api/v1/el/8.CYSTAT-DB/Price%20Indices/Consumer%20Price%20Index/0410055G.px";
const KDP = "https://www.cylaw.org/KDP/";
const ANAKOINOSEIS_YKA = "https://www.mlsi.gov.cy/mlsi/sid/sidv2.nsf/page10_gr/page10_gr?OpenDocument";

// La PxWeb de la ΣΥΚ solo da datos con un POST. Se pide la serie con base 2015 (índice 3 de «ΕΤΟΣ
// ΒΑΣΗΣ»), la misma de series.json; json-stat2 trae los meses como «2026M09».
async function dtk(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  if (!http.postJson) return null;
  const consulta = { query: [{ code: "ΕΤΟΣ ΒΑΣΗΣ", selection: { filter: "item", values: ["3"] } }], response: { format: "json-stat2" } };
  const r = (await http.postJson(url, consulta)) as {
    dimension?: Record<string, { category?: { index?: Record<string, number>; label?: Record<string, string> } }>;
    value?: (number | null)[];
  };
  const cat = r.dimension?.["ΜΗΝΑΣ"]?.category;
  if (!cat?.index || !cat.label || !Array.isArray(r.value)) return null;
  const puntos: PuntoSerie[] = [];
  for (const [clave, i] of Object.entries(cat.index)) {
    const m = /^(\d{4})M(\d{2})$/.exec(cat.label[clave] ?? "");
    const valor = r.value[i];
    const fecha = m ? `${m[1]}-${m[2]}-01` : "";
    if (!m || typeof valor !== "number" || !esFechaISO(fecha)) continue;
    puntos.push({ fecha, valor });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

const PALABRAS_KDP = /Κατωτάτου Ορίου Μισθών|Φόρου Προστιθέμενης Αξίας|Φορολογίας του Εισοδήματος|Κοινωνικών Ασφαλίσεων|Γενικού Συστήματος Υγείας|Τερματισμού Απασχολήσεως|Ετησίων Αδειών/;

// El índice anual de ΚΔΠ de cylaw lista cada acto con su fecha de publicación al final
// («…, 31/12/2025»). Se buscan los decretos que tocan salario mínimo, IVA, renta o cotizaciones.
async function kdp(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const anio = Number(VERIFICADO.slice(0, 4));
  const hallazgos: HallazgoNorma[] = [];
  for (const a of [anio, anio + 1]) {
    let html: string;
    try {
      html = await http.texto(`${url}${a}.html`);
    } catch {
      if (a === anio) return null;
      continue;
    }
    if (a === anio && !/KDP\/data\//.test(html)) return null;
    for (const m of html.matchAll(/<a[^>]*href="(\/KDP\/data\/[^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/g)) {
      const titulo = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      const f = /(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(titulo);
      if (!f) continue;
      const fecha = `${f[3]}-${f[2].padStart(2, "0")}-${f[1].padStart(2, "0")}`;
      if (!esFechaISO(fecha) || fecha <= VERIFICADO || !PALABRAS_KDP.test(titulo)) continue;
      hallazgos.push({ titulo, url: `https://www.cylaw.org${m[1]}`, fecha });
    }
  }
  return hallazgos;
}

// Los anuncios de las Υπηρεσίες Κοινωνικών Ασφαλίσεων no traen fecha en la lista; los que cambian
// topes o porcentajes hablan de «ασφαλιστέων αποδοχών» o de «ποσοστ… εισφορ…». Se marcan con la
// fecha del día en que el cron los ve por primera vez.
async function anakoinoseis(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!/sidv2\.nsf/.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(/<a[^>]*href="(\/mlsi\/sid\/sidv2\.nsf\/All\/[0-9A-F]+\?OpenDocument)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const titulo = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!/ασφαλιστέων αποδοχών|ποσοστ\S* εισφορ|ανώτατ\S* όρι/i.test(titulo)) continue;
    hallazgos.push({ titulo, url: `https://www.mlsi.gov.cy${m[1]}`, fecha: VERIFICADO });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "cy.dtk-cystat",
    carril: "serie",
    serie: "cy.dtk",
    metodo: "api-json",
    url: DTK,
    banda: { min: 90, max: 160, saltoRelativoMax: 0.04 },
    traer(http) {
      return dtk(http, this.url);
    },
  },
  {
    id: "cy.kdp-cylaw",
    carril: "norma",
    datos: ["cy.katotatos-misthos", "cy.katotatos-misthos-proslipsis", "cy.fpa", "cy.klimaka-forou", "cy.eisfora-ka-misthotou", "cy.eisfores-gesy", "cy.imeres-adeias"],
    metodo: "html",
    url: KDP,
    traer(http) {
      return kdp(http, this.url);
    },
  },
  {
    id: "cy.yka-anakoinoseis",
    carril: "norma",
    datos: ["cy.anotato-orio-ka", "cy.anotato-orio-ka-evdomada", "cy.vasikes-asfalistees-evdomada", "cy.syntelestes-ae", "cy.eisfora-ka-ergodoti", "cy.eisfora-ka-autotelos"],
    metodo: "html",
    url: ANAKOINOSEIS_YKA,
    userAgentNavegador: true,
    traer(http) {
      return anakoinoseis(http, this.url);
    },
  },
];
