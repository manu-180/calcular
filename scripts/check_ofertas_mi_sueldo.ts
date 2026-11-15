// Las cinco calculadoras del empleado que venden la Planilla Mi Sueldo: que vendan de verdad, que
// la venta se pueda atribuir y que la oferta esté en el HTML del server.
//
// POR QUÉ (15/11/2026): el panel avisó que /aguinaldo se usaba 51 veces por mes y «no vendía nada».
// Vendía: montaba la oferta de la planilla desde junio. Lo que no hacía era DECLARARLO —el panel
// mira el campo `vende` de PAGINAS (src/lib/panel/datos.ts, productoDePagina)— y, peor, la montaba
// sólo con el sueldo ya cargado. Eso tiene dos costos que no fallan nunca:
//
//   1. Quien no completa el formulario (la mayoría) no se entera de que hay algo a la venta.
//   2. `vista_oferta` no se mide NUNCA. El observador de ofertas de src/lib/rastreo.ts barre
//      `[data-oferta]` al cargar y a los 2,5 s, y no vuelve: una oferta que monta recién cuando
//      aparece el resultado no está en ninguno de los dos barridos. Con `interesCompra` clavado en
//      0 y sin `vende`, la regla de lecturas.ts da la página por muda y la manda a Kairo como
//      oportunidad todos los días.
//
// Las cuatro páginas sin declarar eran /aguinaldo, /salario-minimo, /descuentos-del-sueldo y
// /asignaciones-familiares: la clase, no el caso. Esta suite es la puerta para que no vuelva.
//
// Correr con: npx tsx scripts/check_ofertas_mi_sueldo.ts

import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PAGINAS } from "../src/data/navegacion";
import { vendeAlgo } from "../src/lib/paginas-que-venden";
import { PRODUCTOS } from "../src/lib/mp";
import { datosOferta } from "../src/lib/oferta";
import { OfertaMiSueldo } from "../src/components/mi-sueldo/OfertaMiSueldo";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const SLUG = "planilla-mi-sueldo";

/** Las páginas que montan esta oferta, con la marca `?desde=` de su CTA y quién la monta. */
const PAGINAS_QUE_LA_MONTAN = [
  { ruta: "/sueldo-neto", desde: "sueldo-neto", calculadora: "src/components/CalculadoraSueldoNeto.tsx", pagina: "src/app/(ar)/sueldo-neto/page.tsx" },
  { ruta: "/aguinaldo", desde: "aguinaldo", calculadora: "src/components/CalculadoraAguinaldo.tsx", pagina: "src/app/(ar)/aguinaldo/page.tsx" },
  { ruta: "/salario-minimo", desde: "salario-minimo", calculadora: "src/components/CalculadoraSalarioMinimo.tsx", pagina: "src/app/(ar)/salario-minimo/page.tsx" },
  { ruta: "/descuentos-del-sueldo", desde: "descuentos-del-sueldo", calculadora: "src/components/CalculadoraDescuentos.tsx", pagina: "src/app/(ar)/descuentos-del-sueldo/page.tsx" },
  { ruta: "/asignaciones-familiares", desde: "asignaciones-familiares", calculadora: "src/components/CalculadoraAsignaciones.tsx", pagina: "src/app/(ar)/asignaciones-familiares/page.tsx" },
] as const;

// ─── 1. El producto existe y se puede cobrar ─────────────────────────────────

const producto = PRODUCTOS[SLUG];
check("la planilla está en el catálogo", producto !== undefined);
check("tiene precio en pesos", producto.precio > 0 && producto.moneda === "ARS");
check("es una planilla con archivo (no un informe)", producto.entrega === "xlsx");

// ─── 2. Las cuatro piezas de cada página, enganchadas ───────────────────────

// El mismo filtro de origen() en src/components/compra/directa.ts: si `desde` no lo pasa, el
// checkout se cae al referrer en silencio y la venta queda atribuida a Google.
const FILTRO_ORIGEN = /^[a-z0-9-]{1,40}$/i;

for (const p of PAGINAS_QUE_LA_MONTAN) {
  const pagina = PAGINAS.find((x) => x.href === p.ruta);
  const calc = readFileSync(p.calculadora, "utf8");
  const pag = readFileSync(p.pagina, "utf8");

  check(`${p.ruta} está en la navegación`, pagina !== undefined);
  check(`${p.ruta} declara que vende la planilla Mi Sueldo`, pagina?.vende === SLUG, {
    vende: pagina?.vende,
    esperado: SLUG,
  });
  check(`${p.ruta} no sirve anuncios (compiten con el CTA)`, vendeAlgo(p.ruta));
  check(`${p.ruta} monta la oferta`, calc.includes("<OfertaMiSueldo"));
  check(
    `${p.ruta} saca el precio del catálogo, no escrito a mano`,
    pag.includes(`datosOferta("${SLUG}")`),
  );
  check(`${p.ruta} marca ?desde=${p.desde}`, p.desde === "sueldo-neto" || calc.includes(`desde="${p.desde}"`));
  check(`«${p.desde}» pasa el filtro de origen() y no se cae al referrer`, FILTRO_ORIGEN.test(p.desde));

  // ─── La puerta que importa: la oferta NO cuelga del dato cargado ──────────
  //
  // La guarda del montaje es todo lo que hay entre el `{oferta` y el `<OfertaMiSueldo`. Si ahí
  // aparece `datosCompra`, la oferta volvió a esperar el resultado: el marcador se cae del HTML
  // del server, `vista_oferta` deja de medirse y la mayoría de las visitas no ve que hay producto.
  const i = calc.indexOf("<OfertaMiSueldo");
  const abre = calc.lastIndexOf("{oferta", i);
  const guarda = i > 0 && abre > 0 ? calc.slice(abre, i) : "";
  check(`${p.ruta} monta la oferta sin esperar el dato de la persona`, guarda !== "" && !guarda.includes("datosCompra"), {
    guarda: guarda.trim(),
  });
}

// ─── 3. La versión sin datos se pinta de verdad ──────────────────────────────

// No es un grep: se renderiza el componente con `datos: null`, que es lo que el server tiene cuando
// nadie tocó nada todavía. Si el estado corto se rompiera (o alguien volviera a exigir `datos`),
// esto se cae acá y no en producción.
const html = renderToStaticMarkup(
  createElement(OfertaMiSueldo, {
    producto: datosOferta(SLUG),
    datos: null,
    onUltimoAumento: () => {},
    desde: "aguinaldo",
  }),
);

check("sin datos cargados la oferta trae el marcador que mide y vigila el smoke", html.includes(`data-oferta="${SLUG}"`));
check("sin datos cargados muestra el precio del catálogo", html.includes(producto.precio.toLocaleString("es-AR")));
check("sin datos cargados el botón lleva al checkout de la planilla", html.includes(`/planillas/comprar?p=${SLUG}`));
check("sin datos cargados el link a la landing conserva el ?desde=", html.includes(`${producto.rutaLanding}?desde=aguinaldo`));
// Sin el sueldo de la persona no hay previa ni termómetro: lo que se afirma no sale de ningún dato
// suyo. Si apareciera el select del último aumento, estaría pidiendo un dato que no usa.
check("sin datos cargados no pide el mes del último aumento", !html.includes("¿Desde qué mes cobrás este sueldo?"));

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de las ofertas de la Planilla Mi Sueldo OK");
}
