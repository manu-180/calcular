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
];

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
  detectorDof("mx.dof-salario-minimo", ["mx.salario-minimo"], /salarios? m[ií]nimos?/i),
  detectorDof("mx.dof-uma", ["mx.uma-diaria", "mx.uma-mensual"], /unidad de medida y actualizaci[oó]n/i),
  detectorDof("mx.dof-subsidio-empleo", ["mx.subsidio-empleo", "mx.subsidio-empleo-limite"], /subsidio para el empleo/i),
  detectorDof("mx.dof-tarifas-isr", ["mx.tarifa-isr-semanal", "mx.tarifa-isr-decenal", "mx.tarifa-isr-quincenal", "mx.tarifa-isr-mensual"], /Miscel[aá]nea Fiscal/i),
  detectorDof("mx.dof-lft", LFT, /Ley Federal del Trabajo/i),
  detectorDof("mx.dof-lss", ["mx.cuotas-imss-obrero", "mx.tope-sbc-imss", "mx.umbral-excedente-imss"], /Ley del Seguro Social/i),
  detectorDof(
    "mx.dof-lisr",
    ["mx.exencion-aguinaldo", "mx.exencion-prima-vacacional", "mx.exencion-ptu", "mx.exencion-indemnizacion", "mx.tasas-resico", "mx.tope-resico"],
    /Ley del Impuesto sobre la Renta/i,
  ),
  detectorDof("mx.dof-iva", ["mx.iva-general", "mx.iva-frontera"], /Impuesto al Valor Agregado|regi[oó]n fronteriza norte/i),
];
