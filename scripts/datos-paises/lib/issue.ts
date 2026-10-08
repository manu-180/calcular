import { createHash } from "node:crypto";
import type { FechaISO } from "../../../src/motor/tipos";
import type { HallazgoNuevo, ResultadoDetector } from "./detectores";
import type { SemaforoPais } from "./semaforo";

export interface IssuePrevio {
  number?: number;
  state: string;
  body: string;
}

// "sin-publicar": la puerta salió verde pero el job publicar no llevó el parche a main (no aplicó,
// no pasó la validación de rutas o el push falló). Es la variante que elige el job de issues.
export interface Puerta {
  estado: "sin-cambios" | "verde" | "roja" | "sin-publicar";
  detalle: string;
}

const RE_ITEM_NORMA = /^- \[( |x|X)\] (.*?)\s*<!-- norma:([a-f0-9]{6,40}) -->\s*$/;
const RE_ESTADO = /^<!-- estado:([a-f0-9]+) -->[ \t]*$/gm;
const MAX_REVISADAS = 60;

export interface ItemNorma {
  clave: string;
  hecho: boolean;
  texto: string;
}

// Solo cuenta el marcador al final de una línea de ítem: un título de norma (texto de afuera) con un
// <!-- norma:... --> adentro no puede dar por vista otra norma.
export function leerIssues(previos: readonly IssuePrevio[]): { vistos: Set<string>; abierto: IssuePrevio | null; items: ItemNorma[] } {
  const vistos = new Set<string>();
  const abierto = previos.find((i) => i.state.toUpperCase() === "OPEN") ?? null;
  const items: ItemNorma[] = [];
  for (const i of previos) {
    for (const l of (i.body ?? "").split(/\r?\n/)) {
      const m = RE_ITEM_NORMA.exec(l.trim());
      if (!m) continue;
      vistos.add(m[3]);
      if (i === abierto && !items.some((x) => x.clave === m[3])) items.push({ clave: m[3], hecho: m[1] !== " ", texto: sinComentarios(m[2]) });
    }
  }
  return { vistos, abierto, items };
}

const sinSaltos = (s: string) => s.replace(/\s+/g, " ").trim();

// Títulos, URLs y mensajes de error vienen de sitios de afuera: nada de eso puede abrir o cerrar un
// comentario HTML (los marcadores son la memoria del issue), mencionar a alguien, linkear un issue ni
// romper el markdown del cuerpo.
export function sinComentarios(s: string): string {
  let t = s;
  while (/<!--|-->/.test(t)) t = t.replace(/<!--|-->/g, "");
  return t;
}

export function codigoEnLinea(s: string): string {
  const t = sinComentarios(sinSaltos(s)).replace(/`/g, "'").trim();
  return t ? `\`${t}\`` : "(vacío)";
}

export function bloqueDeCodigo(s: string): string {
  const t = sinComentarios(s);
  const racha = Math.max(0, ...[...t.matchAll(/`+/g)].map((m) => m[0].length));
  const cerca = "`".repeat(Math.max(4, racha + 1));
  return `${cerca}\n${t}\n${cerca}`;
}

const CODIFICAR_URL: Record<string, string> = { "(": "%28", ")": "%29", "`": "%60", "<": "%3C", ">": "%3E", '"': "%22", "'": "%27" };

export function urlSegura(url: string): string | null {
  let u: URL;
  try {
    u = new URL(url.trim());
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  return u.href.replace(/[()`<>"'\s]/g, (c) => CODIFICAR_URL[c] ?? encodeURIComponent(c));
}

export function textoHallazgo(h: HallazgoNuevo): string {
  const url = urlSegura(h.url);
  const titulo = codigoEnLinea(h.titulo);
  const enlace = url ? `[${titulo}](${url})` : `${titulo} (url inválida: ${codigoEnLinea(h.url)})`;
  return `${h.fecha} · ${enlace} · revisar: ${h.datos.map((d) => `\`${d}\``).join(", ")} · detector \`${h.detector}\``;
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

  const puertaMala = e.puerta.estado === "roja" || e.puerta.estado === "sin-publicar";
  const necesario = pendientes.length > 0 || problemas.length > 0 || semaforo.length > 0 || puertaMala;

  const huella = createHash("sha1")
    .update(
      JSON.stringify({
        n: pendientes.map((p) => p.clave).sort(),
        p: problemas.map((p) => `${p.id}:${p.estado}`).sort(),
        s: semaforo.map((s) => `${s.clave}:${s.nivel}`).sort(),
        g: puertaMala ? e.puerta.estado : false,
      }),
    )
    .digest("hex")
    .slice(0, 12);

  const secciones: string[] = [];
  secciones.push(
    `Corrida del ${e.hoy} (fecha de ${e.nombrePais})${e.corrida ? `, ${e.corrida}` : ""}. Mientras esto siga abierto, ${e.nombrePais} muestra el último dato bueno con su fecha a la vista: nada de esta lista se publica solo.`,
  );
  if (e.puerta.estado === "roja") {
    secciones.push(`## La puerta de checks salió roja\n\nLos puntos nuevos de las series no se publicaron.\n\n${bloqueDeCodigo(e.puerta.detalle.slice(0, 3000))}`);
  }
  if (e.puerta.estado === "sin-publicar") {
    secciones.push(
      `## Los puntos nuevos no llegaron a main\n\nPasaron la banda y todos los checks, pero el job publicar no los llevó a main: el parche no aplicó sobre el main de ese momento, no pasó la validación de rutas o el push falló. La próxima corrida los vuelve a intentar. Si se repite, mirá el job publicar de la corrida.${e.puerta.detalle ? `\n\n${bloqueDeCodigo(e.puerta.detalle.slice(0, 3000))}` : ""}`,
    );
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
      `## Detectores con problemas (${problemas.length})\n\nNo se escribió nada de estos. Si la fuente cambió de forma, hay que ajustar \`src/paises/${e.mercado}/fuentes.ts\`.\n\n${problemas.map((p) => `- \`${p.id}\` (${p.carril}: ${p.objetivo}) · **${p.estado}** · ${codigoEnLinea(p.detalle)}`).join("\n")}`,
    );
  }
  if (semaforo.length) {
    secciones.push(`## Semáforo (${semaforo.length})\n\n${semaforo.map((s) => `- **${s.nivel}** · ${sinComentarios(sinSaltos(s.texto))}`).join("\n")}\n\nDetalle: \`npx tsx scripts/datos-paises/semaforo.ts --mercado ${e.mercado}\``);
  }
  secciones.push(`<!-- datos-paises:${e.mercado} -->\n<!-- estado:${huella} -->`);
  const cuerpo = necesario ? `${secciones.join("\n\n")}\n` : "";

  let comentario = "";
  const huellaPrevia = [...(abierto?.body ?? "").matchAll(RE_ESTADO)].at(-1)?.[1];
  if (necesario && abierto && huellaPrevia !== huella) {
    const partes: string[] = [];
    if (nuevos.length) partes.push(`${nuevos.length} norma(s) nueva(s) para verificar:\n${nuevos.map((n) => `- ${n.texto}`).join("\n")}`);
    partes.push(`Estado actual: ${pendientes.length} norma(s) pendiente(s), ${problemas.length} detector(es) con problemas, ${semaforo.length} alerta(s) del semáforo${e.puerta.estado === "roja" ? ", puerta de checks roja" : ""}${e.puerta.estado === "sin-publicar" ? ", puntos nuevos sin publicar" : ""}.`);
    comentario = `Cambió el estado${e.corrida ? ` (${e.corrida})` : ""}. ${partes.join("\n\n")}\n`;
  }
  return { cuerpo, comentario, titulo, etiqueta, pendientes: pendientes.length };
}
