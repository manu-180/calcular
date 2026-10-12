import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";
import { esFechaISO } from "@/motor/vigencia";

const API = "https://sidofqa.segob.gob.mx/dof/sidof";
const DIAS_HACIA_ATRAS = 10;

function fechaMexico(ahora: Date): FechaISO {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit" }).format(ahora) as FechaISO;
}

function haceDias(fecha: FechaISO, dias: number): FechaISO {
  const d = new Date(`${fecha}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - dias);
  return d.toISOString().slice(0, 10) as FechaISO;
}

// La API del DOF usa DD-MM-AAAA en las rutas y en las respuestas.
function aDof(f: FechaISO): string {
  const [a, m, d] = f.split("-");
  return `${d}-${m}-${a}`;
}

function deDof(f: unknown): FechaISO | null {
  if (typeof f !== "string") return null;
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(f);
  if (!m) return null;
  const iso = `${m[3]}-${m[2]}-${m[1]}`;
  return esFechaISO(iso) ? iso : null;
}

async function indicador(http: Http, codigo: number): Promise<PuntoSerie[] | null> {
  const hoy = fechaMexico(new Date());
  const json = await http.json(`${API}/indicadores/${codigo}/${aDof(haceDias(hoy, DIAS_HACIA_ATRAS))}/${aDof(hoy)}`);
  if (typeof json !== "object" || json === null) return null;
  const lista = (json as { ListaIndicadores?: unknown }).ListaIndicadores;
  if (!Array.isArray(lista)) return null;
  const puntos: PuntoSerie[] = [];
  for (const fila of lista as { codTipoIndicador?: unknown; fecha?: unknown; valor?: unknown }[]) {
    if (fila.codTipoIndicador !== codigo) continue;
    const fecha = deDof(fila.fecha);
    const valor = typeof fila.valor === "string" ? Number(fila.valor.replace(/[%,\s]/g, "")) : NaN;
    if (!fecha || !Number.isFinite(valor) || valor <= 0) return null;
    puntos.push({ fecha, valor });
  }
  return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

interface NotaDof {
  codNota?: unknown;
  titulo?: unknown;
}

const notasPorDia = new Map<string, Promise<unknown>>();

// Varios detectores de normas leen los mismos días: se pide cada día una sola vez por corrida.
async function notasRecientes(http: Http): Promise<{ fecha: FechaISO; notas: NotaDof[] }[] | null> {
  const hoy = fechaMexico(new Date());
  const salida: { fecha: FechaISO; notas: NotaDof[] }[] = [];
  for (let i = 0; i < 3; i++) {
    const fecha = haceDias(hoy, i);
    const url = `${API}/notas/${aDof(fecha)}`;
    if (!notasPorDia.has(url)) notasPorDia.set(url, http.json(url));
    const json = await notasPorDia.get(url);
    if (typeof json !== "object" || json === null || !("NotasMatutinas" in json)) return null;
    const j = json as Record<string, unknown>;
    const notas = ["NotasMatutinas", "NotasVespertinas", "NotasExtraordinarias"].flatMap((k) => (Array.isArray(j[k]) ? (j[k] as NotaDof[]) : []));
    salida.push({ fecha, notas });
  }
  return salida;
}

function detectorDof(id: string, datos: readonly string[], patron: RegExp): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "api-json",
    url: `${API}/notas/`,
    async traer(http) {
      const dias = await notasRecientes(http);
      if (!dias) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const { fecha, notas } of dias) {
        for (const n of notas) {
          if (typeof n.titulo !== "string" || typeof n.codNota !== "number") continue;
          if (!patron.test(n.titulo)) continue;
          hallazgos.push({ titulo: n.titulo, url: `https://dof.gob.mx/nota_detalle.php?codigo=${n.codNota}&fecha=${aDof(fecha).replace(/-/g, "/")}`, fecha });
        }
      }
      return hallazgos;
    },
  };
}

const LFT = [
  "mx.dias-aguinaldo",
  "mx.prima-vacacional",
  "mx.vacaciones-primer-anio",
  "mx.dias-prima-antiguedad",
  "mx.anios-prima-antiguedad-renuncia",
  "mx.tope-prima-antiguedad",
  "mx.meses-indemnizacion",
  "mx.dias-indemnizacion-anio",
  "mx.tope-ptu-meses",
  "mx.dias-minimos-ptu-eventual",
  "mx.horas-jornada",
  "mx.jornada-semanal",
  "mx.horas-extra-semana",
  "mx.recargo-hora-doble",
  "mx.recargo-hora-triple",
  "mx.horas-triples-semana",
  "mx.maximo-horas-dia",
  "mx.prima-dominical",
  "mx.pago-descanso-trabajado",
  "mx.aportacion-vivienda",
];

const LSS = [
  "mx.cuotas-imss-obrero",
  "mx.cuotas-imss-patron",
  "mx.tope-sbc-imss",
  "mx.umbral-excedente-imss",
  "mx.cesantia-vejez-patron",
  "mx.cesantia-vejez-patron-minimo",
  "mx.prima-riesgo-trabajo",
  "mx.prima-riesgo-minima",
  "mx.prima-riesgo-maxima",
  "mx.subsidio-incapacidad",
  "mx.dias-espera-enfermedad",
  "mx.dias-maternidad",
  "mx.retiro-desempleo",
  "mx.tope-retiro-desempleo",
  "mx.despensa-no-integra",
];

const LISR = [
  "mx.exencion-aguinaldo",
  "mx.exencion-prima-vacacional",
  "mx.exencion-ptu",
  "mx.exencion-indemnizacion",
  "mx.exencion-prima-dominical",
  "mx.tasas-resico",
  "mx.tope-resico",
  "mx.retencion-isr-honorarios",
  "mx.retencion-isr-arrendamiento",
  "mx.retencion-isr-resico",
  "mx.deduccion-ciega-arrendamiento",
  "mx.tope-deducciones-uma",
  "mx.tope-deducciones-porcentaje",
  "mx.exencion-horas-extra-porcentaje",
  "mx.exencion-horas-extra-uma",
  "mx.tope-fondo-ahorro-porcentaje",
  "mx.tope-fondo-ahorro-uma",
  "mx.factor-mensual-174",
];

// La gráfica pública del SIE devuelve JSON sin token (la API SieAPIRest sí lo pide). Trae toda la
// historia: se devuelven solo los últimos puntos, porque la banda compara cada punto con el último
// guardado y uno viejo parecería un salto. Probado el 12/10/2026: cerca de la mitad de las respuestas
// llegan con estado 200 y cuerpo vacío, por eso se reintenta antes de dar la fuente por caída.
async function sieGrafica(http: Http, url: string, serie: string, ultimos: number): Promise<PuntoSerie[] | null> {
  let json: unknown = null;
  for (let intento = 0; intento < 6 && json === null; intento++) {
    if (intento > 0) await new Promise((r) => setTimeout(r, 1500 * intento));
    const cuerpo = (await http.texto(url, { userAgentNavegador: true })).trim();
    if (!cuerpo) continue;
    try {
      json = JSON.parse(cuerpo);
    } catch {
      return null;
    }
  }
  const valores = (json as { serie?: unknown; valores?: unknown } | null)?.valores;
  if ((json as { serie?: unknown } | null)?.serie !== serie || !Array.isArray(valores)) return null;
  const puntos: PuntoSerie[] = [];
  // -989898 es como el SIE marca un periodo sin dato (semana sin subasta).
  for (const fila of valores.filter((f) => Array.isArray(f) && f[1] !== -989898).slice(-ultimos)) {
    if (!Array.isArray(fila) || !esFechaISO(fila[0]) || typeof fila[1] !== "number" || !Number.isFinite(fila[1]) || fila[1] <= 0) return null;
    puntos.push({ fecha: fila[0], valor: fila[1] });
  }
  return puntos.length ? puntos : null;
}

function detectorCetes(dias: string, serie: string): Detector {
  return {
    id: `mx.cetes-${dias}-banxico`,
    carril: "serie",
    serie: `mx.cetes-${dias}`,
    metodo: "api-json",
    url: `https://www.banxico.org.mx/SieInternet/consultaSerieGrafica.do?s=${serie},CF107,1&versionSerie=LA-MAS-RECIENTE&l=es`,
    userAgentNavegador: true,
    // Un recorte de la tasa objetivo de medio punto mueve el CETES alrededor de 8 % de su valor.
    banda: { min: 1, max: 20, saltoRelativoMax: 0.2 },
    traer(http) {
      return sieGrafica(http, this.url, serie, 4);
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "mx.udis-dof",
    carril: "serie",
    serie: "mx.udis",
    metodo: "api-json",
    url: `${API}/indicadores/`,
    banda: { min: 7.5, max: 11, saltoRelativoMax: 0.005 },
    traer: (http) => indicador(http, 159),
  },
  {
    id: "mx.dolar-fix-dof",
    carril: "serie",
    serie: "mx.dolar-fix",
    metodo: "api-json",
    url: `${API}/indicadores/`,
    banda: { min: 14, max: 26, saltoRelativoMax: 0.05 },
    traer: (http) => indicador(http, 158),
  },
  {
    id: "mx.inpc-banxico",
    carril: "serie",
    serie: "mx.inpc",
    metodo: "api-json",
    url: "https://www.banxico.org.mx/SieInternet/consultaSerieGrafica.do?s=SP1,CP154,1&versionSerie=LA-MAS-RECIENTE&l=es",
    userAgentNavegador: true,
    banda: { min: 120, max: 200, saltoRelativoMax: 0.03 },
    traer(http) {
      return sieGrafica(http, this.url, "SP1", 3);
    },
  },
  detectorCetes("28", "SF43936"),
  detectorCetes("91", "SF43939"),
  detectorCetes("182", "SF43942"),
  detectorCetes("364", "SF43945"),
  detectorDof("mx.dof-salario-minimo", ["mx.salario-minimo", "mx.salario-minimo-hogar", "mx.salarios-minimos-profesionales", "mx.salarios-minimos-profesionales-frontera"], /salarios? m[ií]nimos?/i),
  detectorDof("mx.dof-uma", ["mx.uma-diaria", "mx.uma-mensual"], /unidad de medida y actualizaci[oó]n/i),
  detectorDof("mx.dof-subsidio-empleo", ["mx.subsidio-empleo", "mx.subsidio-empleo-limite"], /subsidio para el empleo/i),
  detectorDof("mx.dof-tarifas-isr", ["mx.tarifa-isr-semanal", "mx.tarifa-isr-decenal", "mx.tarifa-isr-quincenal", "mx.tarifa-isr-mensual", "mx.tarifa-isr-anual"], /Miscel[aá]nea Fiscal/i),
  detectorDof("mx.dof-lft", LFT, /Ley Federal del Trabajo/i),
  detectorDof("mx.dof-lss", LSS, /Ley del Seguro Social/i),
  detectorDof("mx.dof-lisr", LISR, /Ley del Impuesto sobre la Renta/i),
  detectorDof("mx.dof-ley-ingresos", ["mx.retencion-isr-intereses"], /Ley de Ingresos de la Federaci[oó]n/i),
  detectorDof("mx.dof-iva", ["mx.iva-general", "mx.iva-frontera", "mx.retencion-iva-fraccion"], /Impuesto al Valor Agregado|regi[oó]n fronteriza norte/i),
];
