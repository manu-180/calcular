import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";
import { esFechaISO } from "@/motor/vigencia";

const DIAS_HACIA_ATRAS = 3;

function fechaMadrid(ahora: Date): FechaISO {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit" }).format(ahora) as FechaISO;
}

function haceDias(fecha: FechaISO, dias: number): FechaISO {
  const d = new Date(`${fecha}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - dias);
  return d.toISOString().slice(0, 10) as FechaISO;
}

interface ItemBoe {
  titulo: string;
  url: string;
}

// El sumario del BOE anida secciones, departamentos, epígrafes e ítems como objeto cuando hay uno
// solo y como lista cuando hay varios: se recorre todo y se juntan los objetos con título e id BOE-A.
function itemsDelSumario(nodo: unknown, salida: ItemBoe[]): void {
  if (Array.isArray(nodo)) {
    for (const x of nodo) itemsDelSumario(x, salida);
    return;
  }
  if (typeof nodo !== "object" || nodo === null) return;
  const o = nodo as Record<string, unknown>;
  if (typeof o.titulo === "string" && typeof o.identificador === "string" && o.identificador.startsWith("BOE-A-")) {
    salida.push({ titulo: o.titulo, url: `https://www.boe.es/diario_boe/txt.php?id=${o.identificador}` });
  }
  for (const v of Object.values(o)) itemsDelSumario(v, salida);
}

const sumarios = new Map<string, Promise<unknown>>();

async function sumariosRecientes(http: Http): Promise<{ fecha: FechaISO; items: ItemBoe[] }[] | null> {
  const hoy = fechaMadrid(new Date());
  const salida: { fecha: FechaISO; items: ItemBoe[] }[] = [];
  for (let i = 0; i < DIAS_HACIA_ATRAS; i++) {
    const fecha = haceDias(hoy, i);
    const url = `https://www.boe.es/datosabiertos/api/boe/sumario/${fecha.replace(/-/g, "")}`;
    if (!sumarios.has(url)) sumarios.set(url, http.json(url).catch(() => null));
    const json = await sumarios.get(url);
    // Domingos y festivos no hay BOE y la API responde 404: ese día se salta, no invalida la corrida.
    if (json === null) continue;
    if (typeof json !== "object" || !("data" in json)) return null;
    const items: ItemBoe[] = [];
    itemsDelSumario((json as { data: unknown }).data, items);
    salida.push({ fecha, items });
  }
  return salida.length ? salida : null;
}

function detectorBoe(id: string, datos: readonly string[], patron: RegExp): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "api-json",
    url: "https://www.boe.es/datosabiertos/api/boe/sumario/",
    async traer(http) {
      const dias = await sumariosRecientes(http);
      if (!dias) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const { fecha, items } of dias) for (const it of items) if (patron.test(it.titulo)) hallazgos.push({ titulo: it.titulo, url: it.url, fecha });
      return hallazgos;
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "es.ipc-ine",
    carril: "serie",
    serie: "es.ipc",
    metodo: "api-json",
    url: "https://servicios.ine.es/wstempus/js/ES/DATOS_SERIE/IPC290751?nult=6",
    banda: { min: 90, max: 130, saltoRelativoMax: 0.03 },
    async traer(http) {
      const json = await http.json(this.url);
      if (typeof json !== "object" || json === null) return null;
      const data = (json as { Data?: unknown }).Data;
      if (!Array.isArray(data)) return null;
      const puntos: PuntoSerie[] = [];
      for (const fila of data as { Anyo?: unknown; FK_Periodo?: unknown; Valor?: unknown }[]) {
        if (typeof fila.Anyo !== "number" || typeof fila.FK_Periodo !== "number" || typeof fila.Valor !== "number") return null;
        if (fila.FK_Periodo < 1 || fila.FK_Periodo > 12) return null;
        const fecha = `${fila.Anyo}-${String(fila.FK_Periodo).padStart(2, "0")}-01`;
        if (!esFechaISO(fecha)) return null;
        puntos.push({ fecha, valor: fila.Valor });
      }
      return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
    },
  },
  {
    id: "es.euribor-bde",
    carril: "serie",
    serie: "es.euribor",
    metodo: "api-json",
    url: "https://app.bde.es/bierest/resources/srdatosapp/listaSeries?idioma=es&series=D_1NBAF472&rango=30M",
    // El euríbor se mueve en puntos básicos de un mes a otro, pero puede quedar cerca de cero o
    // negativo (en 2021 llegó a -0,505 %): por eso el salto relativo es amplio y la banda baja de cero.
    banda: { min: -1, max: 8, saltoRelativoMax: 0.6 },
    async traer(http) {
      const json = await http.json(this.url);
      if (!Array.isArray(json) || json.length !== 1) return null;
      const s = json[0] as { serie?: unknown; fechas?: unknown; valores?: unknown };
      if (s.serie !== "D_1NBAF472" || !Array.isArray(s.fechas) || !Array.isArray(s.valores) || s.fechas.length !== s.valores.length) return null;
      const puntos: PuntoSerie[] = [];
      for (let i = 0; i < s.fechas.length; i++) {
        const f = s.fechas[i];
        const v = s.valores[i];
        if (v === null) continue;
        if (typeof f !== "string" || typeof v !== "number") return null;
        const fecha = `${f.slice(0, 7)}-01`;
        if (!esFechaISO(fecha)) return null;
        puntos.push({ fecha, valor: v });
      }
      return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
    },
  },
  detectorBoe("es.boe-smi", ["es.smi-mensual", "es.smi-diario", "es.smi-anual", "es.smi-hora-hogar", "es.smi-eventuales"], /salario m[ií]nimo interprofesional/i),
  detectorBoe(
    "es.boe-cotizacion",
    [
      "es.cotizacion-trabajador",
      "es.cotizacion-empresa",
      "es.base-maxima-cotizacion",
      "es.solidaridad-trabajador",
      "es.solidaridad-empresa",
      "es.autonomos-limite-tramo",
      "es.autonomos-base-minima",
      "es.autonomos-base-maxima",
      "es.autonomos-tipos",
    ],
    /normas legales de cotizaci[oó]n|bases y tipos de cotizaci[oó]n/i,
  ),
  detectorBoe(
    "es.boe-irpf",
    [
      "es.irpf-escala-retencion",
      "es.irpf-minimo-contribuyente",
      "es.irpf-minimo-descendientes",
      "es.irpf-reduccion-trabajo",
      "es.irpf-otros-gastos",
      "es.irpf-reduccion-hijos",
      "es.irpf-limites-exclusion",
      "es.irpf-limite-cuota",
      "es.irpf-tipo-minimo-temporal",
      "es.irpf-retencion-profesionales",
    ],
    /Impuesto sobre la Renta de las Personas F[ií]sicas/i,
  ),
  detectorBoe("es.boe-iva", ["es.iva-tipos", "es.recargo-equivalencia"], /Impuesto sobre el Valor A[nñ]adido/i),
  detectorBoe(
    "es.boe-pensiones-iprem",
    ["es.pension-maxima", "es.iprem-mensual", "es.paro-cuantia-minima", "es.paro-cuantia-maxima", "es.jubilacion-porcentajes", "es.edad-jubilacion"],
    /revalorizaci[oó]n de las pensiones|indicador p[uú]blico de renta de efectos m[uú]ltiples|Presupuestos Generales del Estado/i,
  ),
  detectorBoe(
    "es.boe-estatuto",
    [
      "es.vacaciones-dias",
      "es.pagas-extra-minimo",
      "es.horas-extra-maximo",
      "es.fin-contrato-dias",
      "es.despido-objetivo-dias",
      "es.despido-objetivo-tope",
      "es.despido-improcedente-dias",
      "es.despido-improcedente-tope",
      "es.despido-anterior-2012-dias",
      "es.despido-anterior-2012-tope-dias",
      "es.despido-anterior-2012-tope-maximo",
      "es.autonomos-gastos-genericos",
      "es.paro-duracion",
      "es.paro-porcentajes",
      "es.it-porcentajes",
    ],
    /Estatuto de los Trabajadores|Ley General de la Seguridad Social|prestaci[oó]n por desempleo|incapacidad temporal/i,
  ),
];
