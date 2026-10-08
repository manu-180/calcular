import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorNorma, DetectorSerie, HallazgoNorma, PuntoSerie } from "@/motor/tipos";

const INDICADOR_BCCR = "https://www.bccr.fi.cr/content/bccr/cr/es/home/jcr:content/root/container/container/economicindicators/cardindicador.indicator";

// La portada del BCCR lee estos JSON sin token; el servicio web de indicadores pide suscripción.
// Cada llamada trae solo el último valor publicado.
function detectorBccr(id: string, serie: string, indicador: number): DetectorSerie {
  return {
    id,
    carril: "serie",
    serie,
    metodo: "api-json",
    url: `${INDICADOR_BCCR}.${indicador}.json` as `https://${string}`,
    banda: { min: 350, max: 650, saltoRelativoMax: 0.05 },
    async traer(http) {
      const json = await http.json(this.url);
      if (typeof json !== "object" || json === null) return null;
      const { codigoIndicador, series } = json as { codigoIndicador?: unknown; series?: unknown };
      if (String(codigoIndicador) !== String(indicador) || !Array.isArray(series) || series.length === 0) return null;
      const puntos: PuntoSerie[] = [];
      for (const fila of series) {
        const { fecha, valorDatoPorPeriodo } = (fila ?? {}) as { fecha?: unknown; valorDatoPorPeriodo?: unknown };
        const f = typeof fecha === "string" ? fecha.slice(0, 10) : null;
        if (!esFechaISO(f) || typeof valorDatoPorPeriodo !== "number" || !Number.isFinite(valorDatoPorPeriodo)) return null;
        puntos.push({ fecha: f, valor: valorDatoPorPeriodo });
      }
      return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
    },
  };
}

const BUSQUEDA_SINALEVI =
  "https://sinalevi.go.cr/BusquedaSimple/Resultados?pagina=1&radioBtnGroup=1&opcionSelected=1&textAnnio=&selectedBuscarEn=F&TipoNorma_input=&TipoNorma=&TipoPronunciamiento=&ClaseAsunto_input=&ClaseAsunto=&cantidadResultados=-1&textBuscar=";

// SINALEVI (el SCIJ de la Procuraduría) arma la lista en el navegador, pero el HTML ya trae los
// resultados como JSON de Kendo. Se leen de ahí; si el formato cambia, no aparece ningún registro.
function detectorSinalevi(
  id: string,
  datos: readonly string[],
  busqueda: string,
  filtro: RegExp,
  conocidas: readonly number[],
  desde: string,
): DetectorNorma {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: `${BUSQUEDA_SINALEVI}${encodeURIComponent(busqueda)}` as `https://${string}`,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!html.includes("IdFichaNorma")) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const bloque of html.split('"IdFichaNorma":').slice(1)) {
        const ficha = /^(\d+)/.exec(bloque)?.[1];
        const numero = /"NumeroNormativa":(\d+)/.exec(bloque)?.[1];
        const nombre = /"NombreNormativa":"((?:[^"\\]|\\.)*)"/.exec(bloque)?.[1];
        const fecha = /"FechaNormativa":"(\d{4}-\d{2}-\d{2})/.exec(bloque)?.[1];
        const version = /"IdVersionNorma":(\d+)/.exec(bloque)?.[1];
        const tipo = /"NombreTipoNorma":"([^"]*)"/.exec(bloque)?.[1] ?? "Norma";
        if (!ficha || !numero || !nombre || !esFechaISO(fecha) || !version) continue;
        if (fecha < desde || conocidas.includes(Number(numero)) || !filtro.test(nombre)) continue;
        hallazgos.push({
          titulo: `${tipo} ${numero}: ${nombre}`,
          url: `https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=${ficha}&param2=${version}&param3=1`,
          fecha,
        });
      }
      return hallazgos;
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorBccr("cr.bccr-compra", "cr.tipo-cambio-compra", 317),
  detectorBccr("cr.bccr-venta", "cr.tipo-cambio-venta", 318),
  detectorSinalevi(
    "cr.sinalevi-salarios-minimos",
    ["cr.salario-minimo-mes", "cr.salario-minimo-jornada"],
    "salarios minimos",
    /salario/i,
    [45303],
    "2025-11-01",
  ),
  detectorSinalevi(
    "cr.sinalevi-tramos-renta",
    ["cr.impuesto-salario", "cr.credito-hijo", "cr.credito-conyuge"],
    "tramos del impuesto sobre la renta",
    /tramos|cr[eé]ditos fiscales/i,
    [45333],
    "2025-11-01",
  ),
];
