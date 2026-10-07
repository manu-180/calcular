import { resolverValores } from "../../../src/motor/registro";
import { diasEntre, sumarDias, ultimoPunto, vigente } from "../../../src/motor/vigencia";
import type { FechaISO, PaisDefinido } from "../../../src/motor/tipos";

export const DIAS_HORIZONTE = 30;

export type Nivel = "rojo" | "amarillo";
export type Tipo = "revision" | "tramo" | "serie" | "calculadora" | "pais";

export interface ItemSemaforo {
  clave: string;
  nivel: Nivel;
  tipo: Tipo;
  texto: string;
}

export interface SemaforoPais {
  mercado: string;
  nombre: string;
  hoy: FechaISO;
  items: ItemSemaforo[];
}

// Antes de que una serie se caiga de lo publicable: con la mitad de margen para una diaria (que el
// cron refresca tres veces por día) ya es una fuente caída varios días seguidos.
function margenSerie(maxAntiguedadDias: number): number {
  return Math.max(2, Math.round(maxAntiguedadDias * 0.15));
}

export function semaforoPais(pais: PaisDefinido, hoy: FechaISO, horizonte = DIAS_HORIZONTE): SemaforoPais {
  const items: ItemSemaforo[] = [];
  const cod = pais.mercado.codigo;
  const limite = sumarDias(hoy, horizonte);

  if (pais.errores.length) {
    items.push({ clave: `${cod}:errores`, nivel: "rojo", tipo: "pais", texto: `${pais.errores.length} error(es) de datos: el país no se publica hasta corregirlos (${pais.errores.slice(0, 2).join("; ")})` });
  }

  for (const d of pais.datos) {
    if (d.proximaRevision) {
      if (d.proximaRevision < hoy) items.push({ clave: `${d.id}:revision`, nivel: "rojo", tipo: "revision", texto: `${d.id}: la próxima revisión era el ${d.proximaRevision} y ya pasó` });
      else if (d.proximaRevision <= limite) items.push({ clave: `${d.id}:revision`, nivel: "amarillo", tipo: "revision", texto: `${d.id}: próxima revisión el ${d.proximaRevision} (en ${diasEntre(hoy, d.proximaRevision)} días)` });
    }
    for (const region of d.regiones ?? [undefined]) {
      const nombre = `${d.id}${region ? `@${region}` : ""}`;
      const hoyV = vigente(d, hoy, region);
      if (hoyV) {
        let corte: FechaISO | null = null;
        for (let i = 1; i <= horizonte; i++) {
          const f = sumarDias(hoy, i);
          if (!vigente(d, f, region)) {
            corte = f;
            break;
          }
        }
        if (corte) items.push({ clave: `${nombre}:tramo`, nivel: "amarillo", tipo: "tramo", texto: `${nombre}: el tramo vigente termina el ${sumarDias(corte, -1)} y no hay uno verificado desde el ${corte}` });
      } else {
        const previos = d.tramos.filter((t) => t.estado === "verificado" && (region === undefined || t.region === region) && t.desde <= hoy);
        if (previos.length) {
          const ultimo = previos[previos.length - 1];
          items.push({ clave: `${nombre}:tramo`, nivel: "rojo", tipo: "tramo", texto: `${nombre}: hoy no tiene tramo verificado${ultimo.hasta ? ` (el último venció el ${ultimo.hasta})` : ""}` });
        }
      }
    }
  }

  for (const s of pais.series) {
    const ultimo = ultimoPunto(s);
    if (!ultimo) continue;
    const edad = diasEntre(ultimo.fecha, hoy);
    if (edad > s.maxAntiguedadDias) {
      items.push({ clave: `${s.id}:serie`, nivel: "rojo", tipo: "serie", texto: `${s.id}: el último punto es del ${ultimo.fecha} (${edad} días, máximo ${s.maxAntiguedadDias}): las calculadoras que la usan no se publican` });
    } else if (s.maxAntiguedadDias - edad <= margenSerie(s.maxAntiguedadDias)) {
      items.push({ clave: `${s.id}:serie`, nivel: "amarillo", tipo: "serie", texto: `${s.id}: el último punto es del ${ultimo.fecha}; si no llega uno nuevo, vence el ${sumarDias(ultimo.fecha, s.maxAntiguedadDias + 1)}` });
    }
  }

  // Para mirar adelante las series se dan por frescas: su vencimiento ya lo cubre el ítem de serie, y
  // sin esto cada calculadora con una serie diaria saldría en amarillo todos los días.
  const seriesFrescas = { ...pais, series: pais.series.map((s) => ({ ...s, maxAntiguedadDias: Number.POSITIVE_INFINITY })) };
  for (const c of pais.calculadoras) {
    const def = c.definicion;
    if (def.estado === "borrador") continue;
    const r = resolverValores(pais, def, hoy);
    if (!r.ok) {
      items.push({ clave: `${def.id}:calculadora`, nivel: "rojo", tipo: "calculadora", texto: `${def.id} (${def.estado}) hoy no se puede publicar: ${r.motivos.join("; ")}` });
      continue;
    }
    for (let i = 1; i <= horizonte; i++) {
      const f = sumarDias(hoy, i);
      const rf = resolverValores(seriesFrescas, def, f);
      if (!rf.ok) {
        items.push({ clave: `${def.id}:calculadora`, nivel: "amarillo", tipo: "calculadora", texto: `${def.id} (${def.estado}) deja de ser publicable el ${f}: ${rf.motivos.join("; ")}` });
        break;
      }
    }
  }

  items.sort((a, b) => (a.nivel === b.nivel ? a.clave.localeCompare(b.clave) : a.nivel === "rojo" ? -1 : 1));
  return { mercado: cod, nombre: pais.mercado.nombre, hoy, items };
}

export function semaforoMarkdown(semaforos: readonly SemaforoPais[]): string {
  const rojos = semaforos.reduce((n, s) => n + s.items.filter((i) => i.nivel === "rojo").length, 0);
  const amarillos = semaforos.reduce((n, s) => n + s.items.filter((i) => i.nivel === "amarillo").length, 0);
  const filas = semaforos.map((s) => {
    const r = s.items.filter((i) => i.nivel === "rojo").length;
    const a = s.items.filter((i) => i.nivel === "amarillo").length;
    return `| ${s.mercado} | ${s.nombre} | ${s.hoy} | ${r} | ${a} | ${r ? "rojo" : a ? "amarillo" : "verde"} |`;
  });
  const detalle = semaforos
    .filter((s) => s.items.length)
    .map((s) => `### ${s.nombre} (${s.mercado})\n${s.items.map((i) => `- **${i.nivel}** · ${i.texto}`).join("\n")}`);
  return [
    `## Semáforo de datos de los países · ${semaforos.length} país(es)`,
    "",
    `Total: **${rojos} rojo(s)**, **${amarillos} amarillo(s)**. Rojo: algo ya no se publica o ya venció. Amarillo: vence en los próximos ${DIAS_HORIZONTE} días.`,
    "",
    "| mercado | país | hoy | rojos | amarillos | estado |",
    "|---|---|---|---|---|---|",
    ...filas,
    ...(detalle.length ? ["", ...detalle] : []),
    "",
  ].join("\n");
}
