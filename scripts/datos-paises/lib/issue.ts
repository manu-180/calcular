import { createHash } from "node:crypto";
import type { FechaISO } from "../../../src/motor/tipos";
import type { HallazgoNuevo, ResultadoDetector } from "./detectores";
import type { SemaforoPais } from "./semaforo";

export interface IssuePrevio {
  number?: number;
  state: string;
  body: string;
}

export interface Puerta {
  estado: "sin-cambios" | "verde" | "roja";
  detalle: string;
}

const RE_ITEM_NORMA = /^- \[( |x|X)\] (.*?)\s*<!-- norma:([a-f0-9]{6,40}) -->\s*$/;
const RE_ESTADO = /<!-- estado:([a-f0-9]+) -->/;
const MAX_REVISADAS = 60;

export interface ItemNorma {
  clave: string;
  hecho: boolean;
  texto: string;
}

export function leerIssues(previos: readonly IssuePrevio[]): { vistos: Set<string>; abierto: IssuePrevio | null; items: ItemNorma[] } {
  const vistos = new Set<string>();
  for (const i of previos) for (const m of (i.body ?? "").matchAll(/<!-- norma:([a-f0-9]{6,40}) -->/g)) vistos.add(m[1]);
  const abierto = previos.find((i) => i.state.toUpperCase() === "OPEN") ?? null;
  const items: ItemNorma[] = [];
  for (const l of (abierto?.body ?? "").split(/\r?\n/)) {
    const m = RE_ITEM_NORMA.exec(l.trim());
    if (m && !items.some((x) => x.clave === m[3])) items.push({ clave: m[3], hecho: m[1] !== " ", texto: m[2] });
  }
  return { vistos, abierto, items };
}

const sinSaltos = (s: string) => s.replace(/\s+/g, " ").trim();
const escaparMd = (s: string) => sinSaltos(s).replace(/([[\]])/g, "\\$1");

export function textoHallazgo(h: HallazgoNuevo): string {
  return `${h.fecha} · [${escaparMd(h.titulo)}](${h.url}) · revisar: ${h.datos.map((d) => `\`${d}\``).join(", ")} · detector \`${h.detector}\``;
}

export interface EntradaIssue {
  mercado: string;
  nombrePais: string;
  hoy: FechaISO;
  corrida?: string;
  resultados: readonly ResultadoDetector[];
  hallazgosNuevos: readonly HallazgoNuevo[];
  semaforo: SemaforoPais;
  puerta: Puerta;
  previos: readonly IssuePrevio[];
}

export interface SalidaIssue {
  cuerpo: string;
  comentario: string;
  titulo: string;
  etiqueta: string;
  pendientes: number;
}

const PROBLEMAS: readonly ResultadoDetector["estado"][] = ["rechazado", "fuente-caida", "error"];

// Un issue por país. El cuerpo se regenera en cada corrida conservando las normas ya listadas (y sus
// casillas); los marcadores <!-- norma:... --> de issues abiertos o cerrados son la memoria de lo ya
// avisado, así que cerrar el issue equivale a dar todo por revisado.
export function armarIssue(e: EntradaIssue): SalidaIssue {
  const etiqueta = `datos-${e.mercado}`;
  const titulo = `datos-paises: ${e.nombrePais} (${e.mercado}) tiene datos que revisar`;
  const { abierto, items } = leerIssues(e.previos);
  const nuevos: ItemNorma[] = e.hallazgosNuevos.filter((h) => !items.some((i) => i.clave === h.clave)).map((h) => ({ clave: h.clave, hecho: false, texto: textoHallazgo(h) }));
  const pendientes = [...items.filter((i) => !i.hecho), ...nuevos];
  const revisadas = items.filter((i) => i.hecho).slice(-MAX_REVISADAS);
  const problemas = e.resultados.filter((r) => PROBLEMAS.includes(r.estado));
  const semaforo = e.semaforo.items;

  const necesario = pendientes.length > 0 || problemas.length > 0 || semaforo.length > 0 || e.puerta.estado === "roja";

  const huella = createHash("sha1")
    .update(
      JSON.stringify({
        n: pendientes.map((p) => p.clave).sort(),
        p: problemas.map((p) => `${p.id}:${p.estado}`).sort(),
        s: semaforo.map((s) => `${s.clave}:${s.nivel}`).sort(),
        g: e.puerta.estado === "roja",
      }),
    )
    .digest("hex")
    .slice(0, 12);

  const secciones: string[] = [];
  secciones.push(
    `Corrida del ${e.hoy} (fecha de ${e.nombrePais})${e.corrida ? `, ${e.corrida}` : ""}. Mientras esto siga abierto, ${e.nombrePais} muestra el último dato bueno con su fecha a la vista: nada de esta lista se publica solo.`,
  );
  if (e.puerta.estado === "roja") {
    secciones.push(`## La puerta de checks salió roja\n\nLos puntos nuevos de las series no se publicaron.\n\n\`\`\`\n${e.puerta.detalle.slice(0, 3000)}\n\`\`\``);
  }
  if (pendientes.length || revisadas.length) {
    const lista = pendientes.map((p) => `- [ ] ${p.texto} <!-- norma:${p.clave} -->`).join("\n");
    const hechas = revisadas.length
      ? `\n\n<details><summary>Ya revisadas (${revisadas.length})</summary>\n\n${revisadas.map((p) => `- [x] ${p.texto} <!-- norma:${p.clave} -->`).join("\n")}\n\n</details>`
      : "";
    secciones.push(
      `## Normas para verificar (${pendientes.length})\n\nUna norma nunca se publica sola. Abrí el link y fijate si cambia alguno de los datos que dice. Si cambia, cargá el tramo nuevo en \`src/paises/${e.mercado}/datos.json\` con la fuente primaria, en un PR. Después marcá la casilla: la próxima corrida la pasa a revisadas y no la vuelve a avisar.\n\n${lista || "Ninguna pendiente."}${hechas}`,
    );
  }
  if (problemas.length) {
    secciones.push(
      `## Detectores con problemas (${problemas.length})\n\nNo se escribió nada de estos. Si la fuente cambió de forma, hay que ajustar \`src/paises/${e.mercado}/fuentes.ts\`.\n\n${problemas.map((p) => `- \`${p.id}\` (${p.carril}: ${p.objetivo}) · **${p.estado}** · ${sinSaltos(p.detalle)}`).join("\n")}`,
    );
  }
  if (semaforo.length) {
    secciones.push(`## Semáforo (${semaforo.length})\n\n${semaforo.map((s) => `- **${s.nivel}** · ${sinSaltos(s.texto)}`).join("\n")}\n\nDetalle: \`npx tsx scripts/datos-paises/semaforo.ts --mercado ${e.mercado}\``);
  }
  secciones.push(`<!-- datos-paises:${e.mercado} -->\n<!-- estado:${huella} -->`);
  const cuerpo = necesario ? `${secciones.join("\n\n")}\n` : "";

  let comentario = "";
  const huellaPrevia = RE_ESTADO.exec(abierto?.body ?? "")?.[1];
  if (necesario && abierto && huellaPrevia !== huella) {
    const partes: string[] = [];
    if (nuevos.length) partes.push(`${nuevos.length} norma(s) nueva(s) para verificar:\n${nuevos.map((n) => `- ${n.texto}`).join("\n")}`);
    partes.push(`Estado actual: ${pendientes.length} norma(s) pendiente(s), ${problemas.length} detector(es) con problemas, ${semaforo.length} alerta(s) del semáforo${e.puerta.estado === "roja" ? ", puerta de checks roja" : ""}.`);
    comentario = `Cambió el estado${e.corrida ? ` (${e.corrida})` : ""}. ${partes.join("\n\n")}\n`;
  }
  return { cuerpo, comentario, titulo, etiqueta, pendientes: pendientes.length };
}
