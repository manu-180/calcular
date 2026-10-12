import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorNorma, DetectorSerie, HallazgoNorma, PuntoSerie } from "@/motor/tipos";

const INDICADOR_BCCR = "https://www.bccr.fi.cr/content/bccr/cr/es/home/jcr:content/root/container/container/economicindicators/cardindicador.indicator";

// La portada del BCCR lee estos JSON sin token; el servicio web de indicadores pide suscripción.
// Cada llamada trae solo el último valor publicado.
function detectorBccr(id: string, serie: string, indicador: number, banda: DetectorSerie["banda"]): DetectorSerie {
  return {
    id,
    carril: "serie",
    serie,
    metodo: "api-json",
    url: `${INDICADOR_BCCR}.${indicador}.json` as `https://${string}`,
    banda,
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

const MESES: Readonly<Record<string, number>> = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  setiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12,
};

// Se redondea a 6 decimales para que la semilla de series.json y lo que trae el cron sean el mismo
// número: el cron rechaza un punto ya publicado que vuelve con otro valor.
const seisDecimales = (n: number) => Math.round(n * 1e6) / 1e6;

// El cuadro 2732 del BCCR (nivel del IPC del INEC, base diciembre 2020 = 100) se exporta como una
// tabla HTML con extensión xls. Cada fila empieza con «Mes/Año» y sigue con el nivel, en formato 93,36925676.
export function parsearIpcBccr(html: string): PuntoSerie[] | null {
  if (!html.includes("Nivel")) return null;
  const texto = html.replace(/<[^>]*>/g, "|").replace(/&nbsp;/g, " ");
  const puntos = new Map<string, number>();
  for (const m of texto.matchAll(/([A-Za-z]+)\/(\d{4})[\s|]*(-?\d+,\d+)/g)) {
    const mes = MESES[m[1].toLowerCase()];
    const valor = Number(m[3].replace(",", "."));
    if (!mes || !Number.isFinite(valor)) continue;
    const f = `${m[2]}-${String(mes).padStart(2, "0")}-01`;
    if (esFechaISO(f)) puntos.set(f, seisDecimales(valor));
  }
  if (puntos.size === 0) return null;
  return [...puntos.entries()].sort(([a], [b]) => (a < b ? -1 : 1)).map(([fecha, valor]) => ({ fecha: fecha as PuntoSerie["fecha"], valor }));
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

const CAMBIO = { min: 350, max: 650, saltoRelativoMax: 0.05 };

export const detectores: readonly Detector[] = [
  detectorBccr("cr.bccr-compra", "cr.tipo-cambio-compra", 317, CAMBIO),
  detectorBccr("cr.bccr-venta", "cr.tipo-cambio-venta", 318, CAMBIO),
  // La TBP se mueve de a décimas por semana: un salto de 15 % ya es algo raro que conviene revisar.
  detectorBccr("cr.bccr-tbp", "cr.tbp", 423, { min: 0.5, max: 15, saltoRelativoMax: 0.15 }),
  {
    id: "cr.bccr-ipc",
    carril: "serie",
    serie: "cr.ipc",
    metodo: "html",
    url: "https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?CodCuadro=2732&Idioma=1&FecInicial=2025/01/01&FecFinal=2035/12/31&Filtro=0&Exportar=True",
    banda: { min: 90, max: 140, saltoRelativoMax: 0.03 },
    async traer(http) {
      const puntos = parsearIpcBccr(await http.texto(this.url));
      return puntos ? puntos.slice(-12) : null;
    },
  },
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
