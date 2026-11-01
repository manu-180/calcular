import { esFechaISO } from "@/motor/vigencia";
import type { BandaSerie, Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";
import series from "./series.json";

// cba.am corta la conexión; api.cba.am responde. El CSV por GET evita el SOAP, que pide POST con XML.
function cbaUrl(iso: string, ahora: Date): `https://${string}` {
  const d = (x: Date) => x.toISOString().slice(0, 10);
  return `https://api.cba.am/ExchangeRatesToCSV.ashx?DateFrom=${d(new Date(ahora.getTime() - 30 * 86400000))}&DateTo=${d(ahora)}&ISOCodes=${iso}`;
}

export function leerCsvCba(csv: string, iso: string): readonly PuntoSerie[] | null {
  const filas = csv.trim().split(/\r?\n/);
  if (!filas[0]?.includes(iso)) return null;
  const puntos: PuntoSerie[] = [];
  for (const fila of filas.slice(1)) {
    const m = /^(\d{2})\/(\d{2})\/(\d{4}),(\d+(?:\.\d+)?)/.exec(fila);
    if (!m) return null;
    const fecha = `${m[3]}-${m[2]}-${m[1]}`;
    if (!esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: Number(m[4]) });
  }
  return puntos.length ? puntos : null;
}

function detectorCba(iso: string, banda: BandaSerie): Detector {
  const k = iso.toLowerCase();
  return {
    id: `am.${k}-cba`,
    carril: "serie",
    serie: `am.${k}`,
    metodo: "html",
    url: `https://api.cba.am/ExchangeRatesToCSV.ashx?ISOCodes=${iso}`,
    banda,
    async traer(http) {
      return leerCsvCba(await http.texto(cbaUrl(iso, new Date())), iso);
    },
  };
}

const MESES: Readonly<Record<string, string>> = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

// La página NSDP de Armstat publica el IPC del último mes con base en diciembre del año anterior
// (el rótulo dice otra base, pero los valores son los del informe mensual). Se encadena con diciembre
// de series.json, como la serie cargada a mano.
export function leerIpcNsdp(html: string): readonly PuntoSerie[] | null {
  const texto = html.replace(/<[^>]+>/g, " ");
  const m = /Consumer Price Index[\s\S]{0,300}?([A-Z][a-z]{2})\/(\d{2})\s+(\d{2,3}\.\d)/.exec(texto);
  if (!m) return null;
  const mes = MESES[m[1]];
  if (!mes) return null;
  const anio = 2000 + Number(m[2]);
  const puntos = (series.series.find((s) => s.id === "am.gnach")?.puntos ?? []) as unknown as readonly (readonly [string, number])[];
  const base = puntos.find(([f]) => f === `${anio - 1}-12-01`)?.[1];
  const fecha = `${anio}-${mes}-01`;
  if (base === undefined || !esFechaISO(fecha)) return null;
  return [{ fecha, valor: Math.round(base * Number(m[3]) * 100) / 10000 }];
}

// Los textos de ARLIS no traen fecha de cambio por artículo: se vigila que siga la cifra cargada.
function detectorNorma(id: string, datos: readonly string[], url: `https://${string}`, titulo: string, ley: RegExp, cifra: RegExp): Detector {
  return {
    id,
    carril: "norma",
    datos: [...datos],
    metodo: "html",
    url,
    async traer(http: Http): Promise<readonly HallazgoNorma[] | null> {
      const texto = (await http.texto(url)).replace(/<[^>]+>|&nbsp;/g, " ");
      if (!ley.test(texto)) return null;
      if (cifra.test(texto)) return [];
      return [{ titulo, url, fecha: new Date().toISOString().slice(0, 10) as FechaISO }];
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorCba("USD", { min: 280, max: 480, saltoRelativoMax: 0.05 }),
  detectorCba("EUR", { min: 320, max: 560, saltoRelativoMax: 0.05 }),
  detectorCba("RUB", { min: 2.5, max: 8, saltoRelativoMax: 0.1 }),
  detectorCba("GBP", { min: 380, max: 680, saltoRelativoMax: 0.05 }),
  detectorCba("GEL", { min: 100, max: 190, saltoRelativoMax: 0.05 }),
  {
    id: "am.gnach-armstat",
    carril: "serie",
    serie: "am.gnach",
    metodo: "html",
    url: "https://www.armstat.am/nsdp/",
    banda: { min: 100, max: 220, saltoRelativoMax: 0.05 },
    async traer(http) {
      return leerIpcNsdp(await http.texto(this.url));
    },
  },
  detectorNorma("am.norma-nvazaguyn", ["am.nvazaguyn", "am.nvazaguyn-zham"], "https://www.arlis.am/hy/acts/94713/latest", "Նվազագույն ամսական աշխատավարձի օրենքը փոխվել է", /ՆՎԱԶԱԳՈՒՅՆ ԱՄՍԱԿԱՆ ԱՇԽԱՏԱՎԱՐՁԻ/, /սահմանել\s+75000\s+դրամ/),
  detectorNorma("am.norma-hark", ["am.yekamtayin-hark", "am.aah", "am.shrjanarutyan-shem", "am.mikro-shem"], "https://www.arlis.am/hy/acts/123521/latest", "Հարկային օրենսգրքի դրույքաչափ կամ շեմ է փոխվել", /ՀԱՐԿԱՅԻՆ ՕՐԵՆՍԳԻՐՔ/, /115 միլիոն դրամը[\s\S]*24 միլիոն դրամը/),
  detectorNorma("am.norma-kutakayin", ["am.kutakayin-tsatsr", "am.kutakayin-bardzr", "am.kutakayin-shem"], "https://www.arlis.am/hy/acts/64546/latest", "Կուտակային կենսաթոշակների օրենքը փոխվել է", /ԿՈՒՏԱԿԱՅԻՆ ԿԵՆՍԱԹՈՇԱԿՆԵՐԻ/, /5 տոկոսի չափով[\s\S]*500 000 դրամը/),
  detectorNorma("am.norma-droshmanish", ["am.drosh-tsatsr", "am.drosh-bardzr"], "https://www.arlis.am/hy/acts/218669/latest", "Դրոշմանիշային վճարի չափն է փոխվել", /Դրոշմանիշային վճարների չափը/, /1000 դրամ[\s\S]*15000 դրամ/),
  detectorNorma("am.norma-aha", ["am.aha-vchar", "am.aha-amsakan"], "https://www.arlis.am/hy/acts/218650/latest", "Առողջության ապահովագրավճարի օրենքը փոխվել է", /ԱՌՈՂՋՈՒԹՅԱՆ ՀԱՄԸՆԴՀԱՆՈՒՐ/, /10 800/),
  detectorNorma("am.norma-npast", ["am.hivandutyan-tokos", "am.hivandutyan-gortatu-orer"], "https://www.arlis.am/hy/acts/205733/latest", "Անաշխատունակության նպաստների օրենքը փոխվել է", /ԺԱՄԱՆԱԿԱՎՈՐ ԱՆԱՇԽԱՏՈՒՆԱԿՈՒԹՅԱՆ/, /առաջին յոթ օրացուցային/),
  detectorNorma("am.norma-ashkhatanq", ["am.ardzakurd-orer", "am.ardzakman-orer", "am.tsanutsman-orer", "am.artazhamya-havelum"], "https://www.arlis.am/hy/acts/66489/latest", "Աշխատանքային օրենսգրքի ժամկետ կամ հավելում է փոխվել", /ԱՇԽԱՏԱՆՔԱՅԻՆ ՕՐԵՆՍԳԻՐՔ/, /20 աշխատանքային օր[\s\S]*50 տոկոսից/),
];
