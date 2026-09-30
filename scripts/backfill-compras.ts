// Carga en ca_compras y ca_checkouts lo que pasó en MercadoPago antes de que existieran: los
// pagos de planillas (las dos cuentas) y las preferencias, que son los inicios de checkout.
// Sin esto, quien compró antes de las cuentas no ve su planilla al registrarse y el embudo del
// panel arranca en cero.
//
// Sólo toca pagos marcados como de planillas (prefijo `planilla-` en la referencia o
// `metadata.producto` del catálogo): la cuenta legado mezcla cobros que no son de calcular.
// Por defecto es un ensayo que imprime conteos, sin mails ni montos. `--aplicar` escribe, y es
// idempotente: una fila que ya existe no se pisa (salvo el estado de una compra devuelta).
//
//   envkit run -- npx tsx scripts/backfill-compras.ts [--aplicar] [--desde 2026-08-01]

import { createClient } from "@supabase/supabase-js";
import {
  buscarPago,
  checkoutIdDeReferencia,
  emailValido,
  esPagoDePlanilla,
  pagoAprobado,
  productoDePago,
  productoPorSlug,
  rutaDeReferencia,
  type MpPayment,
} from "../src/lib/mp";
import { estadoCheckout, estadoCompra, filaCompra, type FilaCompra } from "../src/lib/mp-webhook";
import { pagosDePlanillasDesde, preferenciasDesde, type PreferenciaMp } from "../src/lib/mp-recupero";

const aplicar = process.argv.includes("--aplicar");
const iDesde = process.argv.indexOf("--desde");
const desde = new Date(`${iDesde > -1 ? process.argv[iDesde + 1] : "2026-08-01"}T00:00:00-03:00`);
if (Number.isNaN(desde.getTime())) {
  console.error("❌ --desde tiene que ser una fecha AAAA-MM-DD");
  process.exit(2);
}

const TOKEN = process.env.MP_ACCESS_TOKEN;
const LEGADO = process.env.MP_ACCESS_TOKEN_LEGADO;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
if (!TOKEN) {
  console.error("❌ Falta MP_ACCESS_TOKEN. Correlo así: envkit run -- npx tsx scripts/backfill-compras.ts");
  process.exit(2);
}
if (aplicar && (!SUPABASE_URL || !SERVICE)) {
  console.error("❌ --aplicar necesita SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY");
  process.exit(2);
}

type Pago = { pago: MpPayment; legado: boolean };
type FilaCheckoutHistorica = {
  id: string;
  ts: string;
  producto: string;
  email: string | null;
  desde: string | null;
  estado: string;
  mp_payment_id: string | null;
  monto: number;
};

const PRIORIDAD: Record<string, number> = { pagado: 4, reembolsado: 3, pendiente: 2, rechazado: 1 };

function contar<T>(xs: T[], clave: (x: T) => string): string {
  const m = new Map<string, number>();
  for (const x of xs) m.set(clave(x), (m.get(clave(x)) ?? 0) + 1);
  return [...m].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k}: ${n}`).join(" · ") || "—";
}

async function idsEnRevenueEvents(): Promise<string[]> {
  if (!SUPABASE_URL || !SERVICE) return [];
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/revenue_events?select=note&project_slug=eq.planillas-ar&note=ilike.*${encodeURIComponent("[mp:")}*`,
    { headers: { apikey: SERVICE, Authorization: `Bearer ${SERVICE}` } },
  );
  if (!res.ok) throw new Error(`revenue_events ${res.status}`);
  const filas = (await res.json()) as { note: string | null }[];
  return [...new Set(filas.flatMap((f) => [...(f.note ?? "").matchAll(/\[mp:(\d+)\]/g)].map((m) => m[1])))];
}

async function main() {
  const desdeISO = desde.toISOString();
  console.log(`\n🧾 Backfill de compras y checkouts — ${aplicar ? "APLICANDO" : "ensayo (no escribe nada)"} · desde ${desdeISO.slice(0, 10)}\n`);

  const cuentas: { nombre: string; token: string; legado: boolean }[] = [{ nombre: "actual", token: TOKEN!, legado: false }];
  if (LEGADO && LEGADO !== TOKEN) cuentas.push({ nombre: "legado", token: LEGADO, legado: true });

  const pagos = new Map<string, Pago>();
  const prefs: PreferenciaMp[] = [];
  for (const c of cuentas) {
    const [ps, pgs] = await Promise.all([preferenciasDesde(desdeISO, c.token), pagosDePlanillasDesde(desdeISO, c.token)]);
    const enRango = ps.filter((p) => Date.parse(p.date_created ?? "") >= desde.getTime());
    prefs.push(...enRango);
    for (const p of pgs) if (p.id !== undefined) pagos.set(String(p.id), { pago: p, legado: c.legado });
    console.log(`   Cuenta ${c.nombre}: ${enRango.length} preferencias de planillas · ${pgs.length} pagos (${contar(pgs, (p) => p.status ?? "?")})`);
  }

  // Las ventas ya asentadas son la red de seguridad: si la búsqueda de MP no devolvió alguna
  // (paginación, fecha de creación anterior al rango), se consulta una por una.
  const asentadas = await idsEnRevenueEvents().catch((e) => {
    console.warn(`   ⚠️  no pude leer revenue_events (${e instanceof Error ? e.message : e}): sigo sólo con MP`);
    return [] as string[];
  });
  const faltantes = asentadas.filter((id) => !pagos.has(id));
  let recuperados = 0;
  for (const id of faltantes) {
    const r = await buscarPago(id).catch(() => null);
    if (r && esPagoDePlanilla(r.pago)) {
      pagos.set(id, r);
      recuperados++;
    }
  }
  console.log(
    `   revenue_events: ${asentadas.length} ventas asentadas · ${asentadas.length - faltantes.length} ya en la búsqueda · ` +
      `${recuperados} recuperadas una por una · ${faltantes.length - recuperados} sin encontrar`,
  );

  const emailPorRef = new Map<string, string>();
  for (const p of prefs) {
    const e = emailValido(p.payer_email);
    if (e && p.external_reference) emailPorRef.set(p.external_reference, e);
  }

  const compras: FilaCompra[] = [];
  let descartadas = 0;
  for (const [id, { pago, legado }] of pagos) {
    const producto = productoDePago(pago);
    const estado = estadoCompra(pago.status);
    if (!producto || !estado) continue;
    if (estado === "aprobado" && !pagoAprobado(pago, producto)) {
      descartadas++;
      continue;
    }
    compras.push(
      filaCompra(pago, { paymentId: id, legado, producto, estado, emailCheckout: emailPorRef.get(pago.external_reference ?? "") }),
    );
  }

  const checkouts = new Map<string, FilaCheckoutHistorica>();
  for (const p of prefs) {
    const ref = p.external_reference ?? "";
    const id = checkoutIdDeReferencia(ref);
    const producto = productoPorSlug(ref.split(":")[0]);
    if (!id || !producto) continue;
    checkouts.set(id, {
      id,
      ts: p.date_created ?? new Date().toISOString(),
      producto: producto.slug,
      email: emailValido(p.payer_email),
      desde: rutaDeReferencia(ref),
      estado: "iniciado",
      mp_payment_id: null,
      monto: producto.precio,
    });
  }
  for (const [pid, { pago }] of pagos) {
    const id = checkoutIdDeReferencia(pago.external_reference);
    const estado = estadoCheckout(pago.status);
    const producto = productoDePago(pago);
    if (!id || !estado || !producto) continue;
    const c =
      checkouts.get(id) ??
      ({
        id,
        ts: pago.date_created ?? new Date().toISOString(),
        producto: producto.slug,
        email: emailValido(pago.payer?.email),
        desde: rutaDeReferencia(pago.external_reference),
        estado: "iniciado",
        mp_payment_id: null,
        monto: producto.precio,
      } satisfies FilaCheckoutHistorica);
    if ((PRIORIDAD[estado] ?? 0) > (PRIORIDAD[c.estado] ?? 0)) {
      c.estado = estado;
      c.mp_payment_id = pid;
    }
    checkouts.set(id, c);
  }

  const aprobadas = compras.filter((c) => c.estado === "aprobado");
  const sinAsentar = aprobadas.filter((c) => !asentadas.includes(c.mp_payment_id)).length;
  console.log(`\n   A cargar en ca_compras:   ${compras.length} (${contar(compras, (c) => `${c.producto} ${c.estado}`)})`);
  console.log(`                             con mail: ${compras.filter((c) => c.email).length} · de la cuenta legado: ${compras.filter((c) => c.legado).length}`);
  if (descartadas) console.log(`   ⚠️  ${descartadas} pagos aprobados que no cierran con el precio del producto: quedan afuera`);
  if (sinAsentar) console.log(`   ⚠️  ${sinAsentar} compras aprobadas sin la marca [mp:id] en revenue_events (una carga a mano, como la del 8/8, no la lleva)`);
  const lista = [...checkouts.values()];
  console.log(`   A cargar en ca_checkouts: ${lista.length} (${contar(lista, (c) => c.estado)})`);
  console.log(`                             con mail: ${lista.filter((c) => c.email).length} · con origen: ${lista.filter((c) => c.desde).length}`);

  if (!SUPABASE_URL || !SERVICE) {
    console.log("\n   (sin credenciales de Supabase: no puedo mirar qué hay ya cargado)\n");
    return;
  }
  const db = createClient(SUPABASE_URL, SERVICE, { auth: { persistSession: false, autoRefreshToken: false } });
  for (const t of ["ca_checkouts", "ca_compras"]) {
    // GET y no HEAD: sin cuerpo, supabase-js no ve el error de una tabla que no existe y dice «0».
    const { count, error } = await db.from(t).select("*", { count: "exact" }).limit(1);
    console.log(`   ${t}: ${error ? `no disponible (${error.code ?? error.message})` : `${count ?? 0} filas hoy`}`);
  }

  if (!aplicar) {
    console.log("\n   Ensayo: no se escribió nada. Para cargar: --aplicar\n");
    return;
  }

  let errores = 0;
  const lotes = <T>(xs: T[]) => Array.from({ length: Math.ceil(xs.length / 100) }, (_, i) => xs.slice(i * 100, i * 100 + 100));
  for (const l of lotes(lista)) {
    const { error } = await db.from("ca_checkouts").upsert(l, { onConflict: "id", ignoreDuplicates: true });
    if (error) {
      errores++;
      console.error("   ❌ ca_checkouts:", error.code, error.message);
    }
  }
  for (const [filas, merge] of [
    [compras.filter((c) => c.estado === "aprobado"), false],
    [compras.filter((c) => c.estado !== "aprobado"), true],
  ] as const) {
    for (const l of lotes([...filas])) {
      const { error } = await db.from("ca_compras").upsert(l, { onConflict: "mp_payment_id", ignoreDuplicates: !merge });
      if (error) {
        errores++;
        console.error("   ❌ ca_compras:", error.code, error.message);
      }
    }
  }
  console.log(errores ? `\n   ❌ Terminó con ${errores} lotes fallidos (se puede volver a correr: es idempotente)\n` : "\n   ✅ Listo\n");
  if (errores) process.exit(1);
}

main().catch((e) => {
  console.error("❌", e instanceof Error ? e.message : e);
  process.exit(1);
});
