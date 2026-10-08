import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, PuntoSerie } from "@/motor/tipos";

function comoFecha(texto: string): FechaISO | null {
  const f = texto.slice(0, 10);
  return esFechaISO(f) ? f : null;
}

export const detectores: readonly Detector[] = [
  {
    id: "co.trm-datos-gov",
    carril: "serie",
    serie: "co.trm",
    metodo: "api-json",
    url: "https://www.datos.gov.co/resource/32sa-8pi3.json?$limit=15&$order=vigenciadesde%20DESC",
    banda: { min: 2500, max: 6500, saltoRelativoMax: 0.05 },
    async traer(http) {
      const json = await http.json(this.url);
      if (!Array.isArray(json) || json.length === 0) return null;
      const puntos: PuntoSerie[] = [];
      for (const fila of json) {
        if (typeof fila !== "object" || fila === null) return null;
        const { valor, vigenciadesde } = fila as { valor?: unknown; vigenciadesde?: unknown };
        const fecha = typeof vigenciadesde === "string" ? comoFecha(vigenciadesde) : null;
        const numero = typeof valor === "string" ? Number(valor) : NaN;
        if (!fecha || !Number.isFinite(numero)) return null;
        puntos.push({ fecha, valor: numero });
      }
      return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
    },
  },
  {
    id: "co.uvr-banrep",
    carril: "serie",
    serie: "co.uvr",
    metodo: "api-xml",
    url: "https://totoro.banrep.gov.co/nsi-jax-ws/rest/data/ESTAT,DF_UVR_DAILY_HIST,1.0/all/ALL?detail=dataonly&dimensionAtObservation=TIME_PERIOD&lastNObservations=20",
    banda: { min: 350, max: 550, saltoRelativoMax: 0.005 },
    async traer(http) {
      // Sin encabezado Accept el servidor SDMX del Banco de la República responde 500.
      const xml = await http.texto(this.url, { encabezados: { Accept: "application/xml" } });
      // El flujo trae dos series: la variación anual (UNIT_MEASURE APC) y el valor en pesos (CRVU).
      // Solo la segunda es la UVR; tomar la primera daría valores de 5 o 6 y la banda los frenaría.
      const series = xml.split("<generic:Series>").slice(1);
      const uvr = series.find((s) => /id="UNIT_MEASURE" value="CRVU"/.test(s));
      if (!uvr) return null;
      const puntos: PuntoSerie[] = [];
      for (const m of uvr.matchAll(/<generic:ObsDimension value="(\d{4})(\d{2})(\d{2})"\s*\/>\s*<generic:ObsValue value="([\d.]+)"/g)) {
        const fecha = `${m[1]}-${m[2]}-${m[3]}`;
        const valor = Number(m[4]);
        if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
        puntos.push({ fecha, valor });
      }
      return puntos.length ? puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1)) : null;
    },
  },
  {
    id: "co.funcion-publica-salario-minimo",
    carril: "norma",
    datos: ["co.smmlv", "co.auxilio-transporte", "co.auxilio-tope"],
    metodo: "html",
    url: "https://www.funcionpublica.gov.co/dafpIndexerBGN/norma/index?find=FindNext&query=salario+minimo&ordenarPor=FECHA_EXPEDICION",
    // funcionpublica.gov.co no manda el intermedio: tlsTolerante lo completa con scripts/datos-paises/certs.
    tlsTolerante: true,
    async traer(http) {
      const html = await http.texto(this.url, { tlsTolerante: true, userAgentNavegador: true });
      if (!html.includes("norma-titulo")) return null;
      const hallazgos: HallazgoNorma[] = [];
      const re = /norma-titulo"><a href="([^"]+)"[^>]*>\s*(Decreto \d+ de (\d{4}))[^<]*<\/a><\/p>\s*<p class="norma-resumen">([^<]*)/g;
      for (const m of html.matchAll(re)) {
        const anio = Number(m[3]);
        if (anio < 2026 || !/salario m[ií]nimo|auxilio de transporte/i.test(m[4])) continue;
        // El buscador no da el día de expedición: se usa el 1 de enero del año del decreto, solo para ordenar.
        hallazgos.push({ titulo: `${m[2]}: ${m[4].trim()}`, url: m[1], fecha: `${anio}-01-01` as FechaISO });
      }
      return hallazgos;
    },
  },
];
