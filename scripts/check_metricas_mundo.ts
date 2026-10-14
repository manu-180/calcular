// Lo de las métricas del mundo que no necesita base: el tipo de cambio del BCRA (lectura y carga con
// días sin cotización), el checkout intl con país y vid, y la forma de los mercados. El SQL y el panel
// con datos se prueban en scripts/check_panel_sql.ts.
//
// Correr con: npx tsx scripts/check_metricas_mundo.ts
// Con --vivo además le pide al BCRA la cotización de hoy.

import type { SupabaseClient } from "@supabase/supabase-js";

let pasadas = 0;
const fallas: string[] = [];
function ok(cond: boolean, que: string, detalle?: unknown) {
  if (cond) pasadas++;
  else fallas.push(`${que}${detalle === undefined ? "" : ` → ${JSON.stringify(detalle)}`}`);
}
const igual = (a: unknown, b: unknown, que: string) => ok(JSON.stringify(a) === JSON.stringify(b), que, { esperaba: b, vino: a });

const RESPUESTA_BCRA = {
  status: 200,
  results: {
    fecha: "2026-10-13",
    detalle: [
      { codigoMoneda: "ARS", descripcion: "PESO", tipoPase: 0.000661, tipoCotizacion: 0 },
      { codigoMoneda: "USD", descripcion: "DOLAR E.E.U.U.", tipoPase: 0, tipoCotizacion: 1512.5 },
      { codigoMoneda: "EUR", descripcion: "EURO", tipoPase: 1.1195, tipoCotizacion: 1693.24375 },
      { codigoMoneda: "BRL", descripcion: "REAL", tipoPase: 0.199382, tipoCotizacion: 301.565148 },
      { codigoMoneda: "XAU", descripcion: "ORO FINO", tipoPase: 4150.06, tipoCotizacion: 0 },
      { codigoMoneda: "JPY", descripcion: "YEN", tipoPase: 150.2, tipoCotizacion: 10.07 },
      { codigoMoneda: "ZZZ", descripcion: "SIN COTIZACION", tipoPase: 0, tipoCotizacion: 0 },
    ],
  },
};

function dbFalsa(pendientes: string[] | { code: string; message: string }) {
  const cargas: { dia: string; tasas: Record<string, number> }[] = [];
  const db = {
    rpc: async (nombre: string, args: Record<string, unknown>) => {
      if (nombre === "ca_usd_pendientes") {
        return Array.isArray(pendientes)
          ? { data: pendientes.map((dia) => ({ dia, moneda: "ARS" })), error: null }
          : { data: null, error: pendientes };
      }
      if (nombre === "ca_tipo_cambio_cargar") {
        cargas.push({ dia: String(args.p_dia), tasas: args.p_tasas as Record<string, number> });
        return { data: 1, error: null };
      }
      return { data: null, error: { code: "PGRST202", message: "no existe" } };
    },
  } as unknown as SupabaseClient;
  return { db, cargas };
}

async function main() {
  const tc = await import("../src/lib/panel/tipo-cambio");

  const cot = tc.tasasDelBcra(RESPUESTA_BCRA);
  ok(!!cot && cot.fecha === "2026-10-13", "lee la fecha");
  ok(!!cot && Math.abs(cot.tasas.ARS - 1 / 1512.5) < 1e-12, "un peso = 1/1512,5 dólares", cot?.tasas.ARS);
  ok(!!cot && Math.abs(cot.tasas.EUR - 1.1195) < 1e-6, "el euro sale de pesos por euro / pesos por dólar", cot?.tasas.EUR);
  ok(!!cot && Math.abs(cot.tasas.JPY - 10.07 / 1512.5) < 1e-9, "el yen no depende de tipoPase (que el BCRA da al revés)", cot?.tasas.JPY);
  ok(!!cot && !("XAU" in cot.tasas) && !("ZZZ" in cot.tasas) && !("USD" in cot.tasas), "sin metales, sin monedas en cero y sin el dólar");
  igual(tc.tasasDelBcra({ status: 200, results: { fecha: null, detalle: [] } }), null, "un día sin cotización (fin de semana) da null");
  igual(tc.tasasDelBcra({ results: { fecha: "2026-10-13", detalle: [{ codigoMoneda: "USD", tipoCotizacion: 3 }] } }), null, "un dólar fuera de la banda se descarta");
  igual(tc.tasasDelBcra("<html>"), null, "una respuesta rara no rompe");

  const pedidos: (string | null)[] = [];
  const traer = async (fecha: string | null) => {
    pedidos.push(fecha);
    if (fecha === null || fecha === "2026-10-13") return { fecha: "2026-10-13", tasas: { ARS: 0.00066 } };
    if (fecha === "2026-10-09") return { fecha: "2026-10-09", tasas: { ARS: 0.00067 } };
    return null;
  };
  const a = dbFalsa(["2026-10-11"]);
  const r = await tc.actualizarTipoCambio(a.db, traer);
  igual(r, { cargados: ["2026-10-13", "2026-10-09"], pendientes: 1 }, "carga hoy y, para la venta del domingo, el día hábil anterior");
  igual(pedidos, [null, "2026-10-11", "2026-10-10", "2026-10-09"], "busca hacia atrás hasta encontrar cotización");
  igual(a.cargas.map((c) => c.dia), ["2026-10-13", "2026-10-09"], "le pasa a la base el día que publicó el BCRA");

  const b = dbFalsa({ code: "PGRST202", message: "Could not find the function" });
  igual((await tc.actualizarTipoCambio(b.db, traer)).omitido, "falta la migración 20261014120000", "sin la migración no hace nada y lo dice");
  const c = dbFalsa(["2026-10-13"]);
  igual((await tc.actualizarTipoCambio(c.db, traer)).cargados, ["2026-10-13"], "no carga dos veces el mismo día");
  const d = dbFalsa([]);
  const caido = await tc.actualizarTipoCambio(d.db, async () => {
    throw new Error("timeout");
  });
  igual([caido.cargados, caido.error], [[], "timeout"], "con el BCRA caído devuelve el error sin tirar");

  const vi = await import("../src/lib/pagos/ventas-intl");
  const cat = await import("../src/lib/pagos/catalogo-intl");
  const producto = cat.catalogoIntl().find((p) => p.mercado === "mx");
  ok(!!producto, "hay un producto de México para probar");
  if (producto) {
    const vid = "AAAAAAAA-0000-4000-8000-000000000001";
    const fila = vi.filaCheckoutIntl({ checkoutId: "11111111-0000-4000-8000-000000000001", producto, proveedor: "paypal", vid, pais: "CO" });
    igual([fila.vid, fila.pais, fila.mercado, fila.sitio], [vid.toLowerCase(), "CO", "mx", "intl"], "el checkout intl guarda vid y país real");
    igual(vi.filaCheckoutIntl({ checkoutId: "x", producto, proveedor: "paypal", pais: "XX" }).pais, undefined, "XX (país desconocido de Vercel) no se guarda");
    igual(vi.filaCheckoutIntl({ checkoutId: "x", producto, proveedor: "paypal", pais: "co" }).pais, undefined, "un país que no es ISO en mayúsculas no se guarda");
    igual(vi.filaCheckoutIntl({ checkoutId: "x", producto, proveedor: "paypal", vid: "no-es-uuid" }).vid, null, "un vid trucho queda en null");
  }

  const m = await import("../src/lib/medicion/mercados");
  ok(m.FORMA_MERCADO.test("ca-fr") && m.FORMA_MERCADO.test("global") && !m.FORMA_MERCADO.test("ca-francais") && !m.FORMA_MERCADO.test("x"), "forma de mercado");

  if (process.argv.includes("--vivo")) {
    const hoy = await tc.traerCotizaciones(null);
    ok(!!hoy && hoy.tasas.ARS > 0 && hoy.tasas.ARS < 0.01 && Object.keys(hoy.tasas).length > 10, "el BCRA responde con cotizaciones", hoy && { fecha: hoy.fecha, ARS: hoy.tasas.ARS, n: Object.keys(hoy.tasas).length });
  }

  if (fallas.length) {
    for (const f of fallas) console.error(`  ✗ ${f}`);
    console.error(`❌ check_metricas_mundo: ${pasadas} ok, ${fallas.length} fallas`);
    process.exit(1);
  }
  console.log(`✅ check_metricas_mundo: ${pasadas} ok`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
