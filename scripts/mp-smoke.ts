// Verificacion REAL contra la API de MercadoPago. Necesita MP_ACCESS_TOKEN en .env.local.
// Crea una preferencia de prueba POR CADA producto del catalogo y confirma que MP devuelve
// init_point. NO cobra nada: una preferencia es solo un link de checkout, no genera un pago.
// Reusable para revalidar el cobro cuando rote el token o cuando se agrega un producto.
//
//   Correr desde calcular-ar:  npx -y tsx scripts/mp-smoke.ts
//   Un solo producto:          npx -y tsx scripts/mp-smoke.ts planilla-uocra
import { readFileSync } from "node:fs";
import path from "node:path";

// Cargar las env vars del .env.local (este script corre fuera de Next).
const envPath = path.join(process.cwd(), ".env.local");
for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)$/);
  if (m && !process.env[m[1]]) {
    process.env[m[1]] = m[2].trim().replace(/^["']/, "").replace(/["']$/, "");
  }
}

async function main() {
  const tok = process.env.MP_ACCESS_TOKEN ?? "";
  console.log(`MP_ACCESS_TOKEN: ${tok ? `presente (${tok.slice(0, 8)}..., len=${tok.length})` : "VACIO"}`);
  if (!tok) {
    console.error("Falta MP_ACCESS_TOKEN en .env.local");
    process.exit(1);
  }

  const { crearPreferencia, PRODUCTOS, productoPorSlug, referenciaExterna } = await import("../src/lib/mp");

  const pedido = process.argv[2];
  const productos = pedido
    ? [productoPorSlug(pedido)].filter((p) => p !== null)
    : Object.values(PRODUCTOS);

  if (productos.length === 0) {
    console.error(`No existe el producto "${pedido}". Slugs: ${Object.keys(PRODUCTOS).join(", ")}`);
    process.exit(1);
  }

  let fallas = 0;
  for (const producto of productos) {
    console.log(`\n── ${producto.slug} · ${producto.titulo} · $${producto.precio} ──`);
    try {
      const ref = referenciaExterna(producto.slug);
      const pref = await crearPreferencia({
        producto,
        externalReference: ref,
        backUrls: {
          success: "https://calcular.ar/planillas/gracias",
          pending: "https://calcular.ar/planillas/gracias",
          failure: `https://calcular.ar${producto.rutaLanding}?pago=fallido`,
        },
        notificationUrl: "https://calcular.ar/api/mp/webhook",
      });

      console.log("  id:                 ", pref.id);
      console.log("  init_point:         ", pref.init_point);
      console.log("  external_reference: ", ref);

      if (!pref.init_point) {
        console.error("  FALLA: MP no devolvio init_point");
        fallas++;
        continue;
      }
      // El slug tiene que viajar en la referencia o el webhook no sabe que entregar.
      if (!ref.startsWith(`${producto.slug}:`)) {
        console.error("  FALLA: la referencia externa no lleva el slug adelante");
        fallas++;
        continue;
      }
      console.log("  OK: el token funciona y la preferencia queda marcada con el producto.");
    } catch (e) {
      console.error("  FALLA:", e instanceof Error ? e.message : e);
      fallas++;
    }
  }

  console.log(
    fallas === 0
      ? `\nOK: ${productos.length} producto(s) del catalogo cobran bien.`
      : `\n${fallas} producto(s) con problemas.`,
  );
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("\nFALLO:", e instanceof Error ? e.message : e);
  process.exit(1);
});
