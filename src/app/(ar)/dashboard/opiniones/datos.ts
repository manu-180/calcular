import "server-only";
import { esMercadoMedido } from "@/lib/medicion/mercados";
import { servicio } from "@/lib/supabase/servicio";
import { ESTADOS_OPINION, type EstadoOpinion, type OpinionAdmin } from "@/lib/opiniones";

export const FILTROS = ["nuevas", "leidas", "resueltas", "todas"] as const;
export type Filtro = (typeof FILTROS)[number];

export const ESTADO_DE_FILTRO: Record<Exclude<Filtro, "todas">, EstadoOpinion> = {
  nuevas: "nueva",
  leidas: "leida",
  resueltas: "resuelta",
};

export type Cuentas = Record<EstadoOpinion, number>;

export type OpinionConMercado = OpinionAdmin & { mercado?: string };

// porMercado = la tabla ya tiene la columna mercado (migración 20261008120000).
export type BandejaDatos = { opiniones: OpinionConMercado[]; cuentas: Cuentas; porMercado: boolean; mercado: string | null };

const LIMITE = 100;
const SIN_COLUMNA = "42703";

export function leerFiltro(valor: unknown): Filtro {
  return typeof valor === "string" && (FILTROS as readonly string[]).includes(valor) ? (valor as Filtro) : "nuevas";
}

export function leerMercadoOpiniones(valor: unknown): string | null {
  return typeof valor === "string" && esMercadoMedido(valor) ? valor : null;
}

async function contar(estado: EstadoOpinion, mercado: string | null): Promise<number> {
  let q = servicio().from("ca_opiniones").select("id", { count: "exact", head: true }).eq("estado", estado);
  if (mercado) q = q.eq("mercado", mercado);
  const { count, error } = await q;
  if (error) throw Object.assign(new Error(`ca_opiniones (${estado}): ${error.message}`), { code: error.code });
  return count ?? 0;
}

export async function contarNuevas(): Promise<number> {
  return contar("nueva", null);
}

async function leer(filtro: Filtro, mercado: string | null, conMercado: boolean) {
  let consulta = servicio()
    .from("ca_opiniones")
    .select(conMercado ? "id, user_id, tipo, mensaje, desde, estado, created_at, mercado" : "id, user_id, tipo, mensaje, desde, estado, created_at")
    .order("created_at", { ascending: false })
    .limit(LIMITE);
  if (filtro !== "todas") consulta = consulta.eq("estado", ESTADO_DE_FILTRO[filtro]);
  if (mercado) consulta = consulta.eq("mercado", mercado);
  return Promise.all([consulta, ...ESTADOS_OPINION.map((e) => contar(e, mercado))]);
}

// Service role: sólo se llama después de requireAdmin (triple barrera del SPEC, decisión 9).
// Sin la columna mercado todas las opiniones son de calcular.ar: Argentina las ve todas y un país
// de CalcularYa ninguna.
export async function cargarOpiniones(filtro: Filtro, mercado: string | null = null): Promise<BandejaDatos> {
  let porMercado = true;
  let resultado: Awaited<ReturnType<typeof leer>>;
  try {
    resultado = await leer(filtro, mercado, true);
    if (resultado[0].error?.code === SIN_COLUMNA) throw Object.assign(new Error(resultado[0].error.message), { code: SIN_COLUMNA });
  } catch (e) {
    if ((e as { code?: string }).code !== SIN_COLUMNA) throw e;
    porMercado = false;
    if (mercado && mercado !== "ar") {
      return { opiniones: [], cuentas: { nueva: 0, leida: 0, resuelta: 0 }, porMercado, mercado };
    }
    resultado = await leer(filtro, null, false);
  }
  const [lista, ...numeros] = resultado;
  if (lista.error) throw new Error(`ca_opiniones: ${lista.error.message}`);
  const filas = (lista.data ?? []) as unknown as (Omit<OpinionConMercado, "email"> & { user_id: string })[];

  // ca_opiniones y ca_perfiles cuelgan los dos de auth.users, sin FK entre ellas: PostgREST no
  // puede embeber, así que el mail sale en una segunda lectura sólo de los usuarios de la página.
  const ids = [...new Set(filas.map((f) => f.user_id))];
  const emails = new Map<string, string>();
  if (ids.length) {
    const { data, error } = await servicio().from("ca_perfiles").select("user_id, email").in("user_id", ids);
    if (error) console.error("[opiniones] no pude leer los mails:", error.message);
    for (const p of data ?? []) emails.set(String(p.user_id), String(p.email));
  }

  return {
    opiniones: filas.map(({ user_id, ...f }) => ({ ...f, email: emails.get(user_id) ?? null })),
    cuentas: { nueva: numeros[0], leida: numeros[1], resuelta: numeros[2] },
    porMercado,
    mercado,
  };
}
