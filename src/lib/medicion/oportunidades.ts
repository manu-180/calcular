import type { Lectura } from "@/lib/panel/tipos";

// Lo que `scripts/medicion/oportunidades.ts` le pasa al agente de oportunidades y el registro de lo
// que ya se hizo (docs/medicion/oportunidades.json).
//
// El buscador y los paths los escribe cualquiera y el agente pushea a main en un repo público. Por
// eso esto valida en vez de copiar: al agente sólo llega lo que pasa estos filtros, y un texto de
// búsqueda nunca se guarda en el registro ni se imprime en el log (el id va con hash).

export type Familia = "candidata" | "busqueda" | "poco-uso" | "vende";
const SE_ACCIONAN: ReadonlySet<string> = new Set<Familia>(["candidata", "busqueda", "poco-uso", "vende"]);

export type LecturaConFamilia = Lectura & { familia: string; peso: number };

export type Oportunidad = {
  id: string;
  familia: Familia;
  peso: number;
  titulo: string;
  detalle: string;
  path?: string;
  consulta?: string;
};

export type EntradaRegistro = {
  id: string;
  fecha: string;
  resultado: "publicado" | "descartado";
  resumen: string;
};

export type Registro = { entradas: EntradaRegistro[] };

const DIA = 86_400_000;
export const ENFRIAMIENTO_DIAS = 60;
export const MAXIMO_POR_SEMANA = 3;
export const DIAS_EN_EL_PANEL = 14;

const RUTA = /^\/[a-z0-9-]+(\/[a-z0-9-]+)*$/;
// Sólo letras y espacios: un mail, un DNI o un teléfono buscados no pasan, y tampoco una instrucción larga.
const CONSULTA = /^\p{L}+( \p{L}+){0,4}$/u;

export function rutaValida(path: string | undefined): path is string {
  return typeof path === "string" && path.length <= 80 && RUTA.test(path);
}

export function consultaValida(q: string): boolean {
  return q.length >= 3 && q.length <= 40 && CONSULTA.test(q);
}

function huella(texto: string): string {
  let h = 0x811c9dc5;
  for (const c of texto) {
    h ^= c.codePointAt(0)!;
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function aOportunidad(l: LecturaConFamilia): Oportunidad | null {
  if (!SE_ACCIONAN.has(l.familia)) return null;
  const familia = l.familia as Familia;
  const base = { familia, peso: l.peso };

  if (familia === "busqueda") {
    const consulta = l.id.slice("busqueda-".length).trim().toLowerCase();
    if (!consultaValida(consulta)) return null;
    return {
      ...base,
      id: `busqueda-${huella(consulta)}`,
      consulta,
      titulo: `Nadie encuentra «${consulta}» en el buscador`,
      detalle: "La gente lo busca y no aparece nada.",
    };
  }

  const path = l.accion?.href;
  if (!rutaValida(path)) return null;
  return { ...base, id: l.id, path, titulo: l.titulo, detalle: l.detalle };
}

export function elegir(oportunidades: Oportunidad[], registro: Registro, hoy: Date): Oportunidad | null {
  const atras = (dias: number) => hoy.getTime() - dias * DIA;
  const fecha = (e: EntradaRegistro) => new Date(`${e.fecha}T12:00:00Z`).getTime();

  const estaSemana = registro.entradas.filter((e) => e.resultado === "publicado" && fecha(e) > atras(7));
  if (estaSemana.length >= MAXIMO_POR_SEMANA) return null;

  const enfriadas = new Set(registro.entradas.filter((e) => fecha(e) > atras(ENFRIAMIENTO_DIAS)).map((e) => e.id));
  return (
    [...oportunidades]
      .filter((o) => !enfriadas.has(o.id))
      .sort((a, b) => b.peso - a.peso || a.id.localeCompare(b.id))[0] ?? null
  );
}

export function yaHechas(registro: Registro, hoy: Date): Lectura[] {
  const desde = hoy.getTime() - DIAS_EN_EL_PANEL * DIA;
  return registro.entradas
    .filter((e) => e.resultado === "publicado" && new Date(`${e.fecha}T12:00:00Z`).getTime() > desde)
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, 2)
    .map((e) => ({
      id: `hecha-${e.id}`,
      tono: "logro" as const,
      titulo: e.resumen,
      detalle: `Lo vi en los números y lo publiqué solo el ${e.fecha.split("-").reverse().join("/")}. El resultado queda en la bitácora de mejora.`,
    }));
}
