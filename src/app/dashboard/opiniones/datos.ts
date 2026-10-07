import "server-only";
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

export type BandejaDatos = { opiniones: OpinionAdmin[]; cuentas: Cuentas };

const LIMITE = 100;

export function leerFiltro(valor: unknown): Filtro {
  return typeof valor === "string" && (FILTROS as readonly string[]).includes(valor) ? (valor as Filtro) : "nuevas";
}

async function contar(estado: EstadoOpinion): Promise<number> {
  const { count, error } = await servicio().from("ca_opiniones").select("id", { count: "exact", head: true }).eq("estado", estado);
  if (error) throw new Error(`ca_opiniones (${estado}): ${error.message}`);
  return count ?? 0;
}

export async function contarNuevas(): Promise<number> {
  return contar("nueva");
}

// Service role: sólo se llama después de requireAdmin (triple barrera del SPEC, decisión 9).
export async function cargarOpiniones(filtro: Filtro): Promise<BandejaDatos> {
  let consulta = servicio()
    .from("ca_opiniones")
    .select("id, user_id, tipo, mensaje, desde, estado, created_at")
    .order("created_at", { ascending: false })
    .limit(LIMITE);
  if (filtro !== "todas") consulta = consulta.eq("estado", ESTADO_DE_FILTRO[filtro]);

  const [lista, ...numeros] = await Promise.all([consulta, ...ESTADOS_OPINION.map(contar)]);
  if (lista.error) throw new Error(`ca_opiniones: ${lista.error.message}`);
  const filas = (lista.data ?? []) as (Omit<OpinionAdmin, "email"> & { user_id: string })[];

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
  };
}
