// Recupero de compras que no se terminaron: UN recordatorio a quien dejó el mail en el diálogo
// de compra, pasó a MercadoPago y no pagó.
//
// POR QUÉ ASÍ. Entre el 4/9 y el 27/9/2026 hubo 40 preferencias creadas (gente que tocó
// «Comprar» y llegó a MP) y 1 sola venta. Recuperar aunque sea una parte de esas es la palanca
// más barata del embudo: ese tráfico ya está pago con SEO.
//
// SIN TABLA PROPIA: la preferencia de MP ya guarda el mail (`payer_email`) y la referencia, y
// los pagos dicen quién terminó. La idempotencia sale de la ventana de tiempo: el cron corre una
// vez por día y solo mira preferencias creadas entre 48 y 24 horas antes, así que cada una cae
// en exactamente una corrida. Si un día el cron no corre, esas se pierden — es preferible a
// escribirle dos veces a alguien.

import { esPagoDePlanilla, productoPorSlug, type MpPayment, type Producto } from "@/lib/mp";

const MP_API = "https://api.mercadopago.com";
const HORA = 3_600_000;

export const VENTANA = { desdeHoras: 48, hastaHoras: 24 } as const;

/** Techo de mails por corrida. Con el tráfico real (~2 inicios por día) nunca se toca; existe para
 *  que un abuso del formulario (mails ajenos cargados a mano) no convierta al sitio en spammer. */
export const MAXIMO_POR_CORRIDA = 25;

export type PreferenciaMp = {
  id?: string;
  date_created?: string;
  external_reference?: string;
  payer_email?: string | null;
};

export type PagoMp = {
  status?: string;
  external_reference?: string;
  payer?: { email?: string | null };
  date_created?: string;
};

export type Recordatorio = { email: string; producto: Producto; referencia: string };

// Un pago en curso (ticket de Rapipago sin pagar todavía, tarjeta en revisión) no es abandono:
// recordarle a esa persona que "no terminó" sería decirle algo falso.
const ESTADOS_QUE_CUENTAN = new Set(["approved", "authorized", "pending", "in_process", "in_mediation"]);

const slugDeRef = (ref: string | undefined) => (ref ?? "").split(":")[0];

/** Función pura: qué preferencias merecen recordatorio en esta corrida. */
export function elegirRecordatorios(
  preferencias: PreferenciaMp[],
  pagos: PagoMp[],
  ahora: Date,
): Recordatorio[] {
  const desde = ahora.getTime() - VENTANA.desdeHoras * HORA;
  const hasta = ahora.getTime() - VENTANA.hastaHoras * HORA;

  const refsConPago = new Set<string>();
  const compradores = new Set<string>();
  for (const p of pagos) {
    if (!p.status || !ESTADOS_QUE_CUENTAN.has(p.status)) continue;
    if (p.external_reference) refsConPago.add(p.external_reference);
    const mail = p.payer?.email?.trim().toLowerCase();
    if (mail) compradores.add(`${mail}|${slugDeRef(p.external_reference)}`);
  }

  const elegidos = new Map<string, Recordatorio>();
  const ordenadas = [...preferencias].sort((a, b) =>
    (b.date_created ?? "").localeCompare(a.date_created ?? ""),
  );
  for (const pref of ordenadas) {
    const email = pref.payer_email?.trim().toLowerCase();
    const ref = pref.external_reference ?? "";
    const producto = productoPorSlug(slugDeRef(ref));
    const creada = Date.parse(pref.date_created ?? "");
    if (!email || !producto || !ref.startsWith(`${producto.slug}:`)) continue;
    if (!Number.isFinite(creada) || creada < desde || creada >= hasta) continue;
    if (refsConPago.has(ref)) continue;
    // Tocó «Comprar» dos veces y pagó en el segundo intento: la primera preferencia no es abandono.
    if (compradores.has(`${email}|${producto.slug}`)) continue;
    // Un solo mail por persona y corrida, del intento más reciente.
    if (elegidos.has(email)) continue;
    elegidos.set(email, { email, producto, referencia: ref });
    if (elegidos.size >= MAXIMO_POR_CORRIDA) break;
  }
  return [...elegidos.values()];
}

async function mpGet<T>(ruta: string, token: string): Promise<T> {
  const res = await fetch(`${MP_API}${ruta}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`MP ${ruta.split("?")[0]} ${res.status}: ${await res.text().catch(() => "")}`);
  return (await res.json()) as T;
}

/** Preferencias de planillas creadas desde `desdeISO`. MP las devuelve de la más nueva a la más
 *  vieja: se pagina hasta pasar la fecha. La cuenta de MP es compartida con otros cobros de
 *  Manuel, por eso se filtra por el prefijo de la referencia y nunca se mira otra cosa. */
export async function preferenciasDesde(desdeISO: string, token: string): Promise<PreferenciaMp[]> {
  const limite = Date.parse(desdeISO);
  const salida: PreferenciaMp[] = [];
  for (let offset = 0; offset < 1000; offset += 50) {
    const pagina = await mpGet<{ elements?: PreferenciaMp[] }>(
      `/checkout/preferences/search?limit=50&offset=${offset}`,
      token,
    );
    const el = pagina.elements ?? [];
    for (const p of el) {
      if (slugDeRef(p.external_reference).startsWith("planilla-")) salida.push(p);
    }
    const ultima = Date.parse(el.at(-1)?.date_created ?? "");
    if (el.length < 50 || (Number.isFinite(ultima) && ultima < limite)) break;
  }
  return salida;
}

/** Pagos de planillas desde `desdeISO`, en cualquier estado: el filtro lo hace elegirRecordatorios. */
export async function pagosDesde(desdeISO: string, token: string): Promise<PagoMp[]> {
  const salida: PagoMp[] = [];
  for (let offset = 0; offset < 1000; offset += 100) {
    const q = new URLSearchParams({
      sort: "date_created",
      criteria: "desc",
      range: "date_created",
      begin_date: desdeISO,
      end_date: "NOW",
      limit: "100",
      offset: String(offset),
    });
    const pagina = await mpGet<{ results?: PagoMp[] }>(`/v1/payments/search?${q}`, token);
    const res = pagina.results ?? [];
    for (const p of res) {
      if (slugDeRef(p.external_reference).startsWith("planilla-")) salida.push(p);
    }
    if (res.length < 100) break;
  }
  return salida;
}

/** Pagos de planillas desde `desdeISO`, completos, incluidos los previos al catálogo (marcados sólo
 *  en `metadata`, sin prefijo en la referencia): la primera venta del 8/8/2026 es de esos. */
export async function pagosDePlanillasDesde(desdeISO: string, token: string): Promise<MpPayment[]> {
  const salida: MpPayment[] = [];
  for (let offset = 0; offset < 5000; offset += 100) {
    const q = new URLSearchParams({
      sort: "date_created",
      criteria: "desc",
      range: "date_created",
      begin_date: desdeISO,
      end_date: "NOW",
      limit: "100",
      offset: String(offset),
    });
    const pagina = await mpGet<{ results?: MpPayment[] }>(`/v1/payments/search?${q}`, token);
    const res = pagina.results ?? [];
    salida.push(...res.filter(esPagoDePlanilla));
    if (res.length < 100) break;
  }
  return salida;
}
