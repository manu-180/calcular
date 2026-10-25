// Casos del índice de horas: lectura de precios, paso a horas, vencimiento, robots.txt y el índice
// armado con los datos de hoy. Falla con código 1 si alguno no da.
//   npx tsx scripts/horas/casos.ts
import "../sin-server-only";
import { diasEntre, duracion, horasDe, porHoraDe, precioVigente, VIGENCIA_PRECIO_DIAS } from "../../src/motor/horas/calculo";
import { leerApple, leerSpotify, monedaDeMarca, montosDeTexto, numeroDeTexto, robotsPermite } from "../../src/motor/horas/leer";
import { MINIMOS } from "../../src/motor/horas/minimos";
import { PRODUCTOS, urlProducto } from "../../src/motor/horas/productos";
import { construirInformeHoras } from "../../src/lib/horas/indice";
import { minimoAr } from "../../src/lib/horas/ar";

let fallas = 0;
let total = 0;
function caso(nombre: string, obtenido: unknown, esperado: unknown) {
  total++;
  const ok = typeof esperado === "number" && typeof obtenido === "number" ? Math.abs(obtenido - esperado) < 1e-6 * Math.max(1, Math.abs(esperado)) : JSON.stringify(obtenido) === JSON.stringify(esperado);
  if (!ok) {
    fallas++;
    console.log(`  FALLA ${nombre}: dio ${JSON.stringify(obtenido)}, se esperaba ${JSON.stringify(esperado)}`);
  }
}

// Números como los escribe cada país.
for (const [t, n] of [
  ["1,390", 1390],
  ["115.84", 115.84],
  ["4.499", 4499],
  ["23,90", 23.9],
  ["1.390,00", 1390],
  ["1,390.50", 1390.5],
  ["1 299,00", 1299],
  ["59.990", 59990],
  ["12", 12],
  ["1,2345", null],
] as const) caso(`número «${t}»`, numeroDeTexto(t), n);

// Precios de Spotify tal como aparecen (leídos el 2026-10-23).
for (const [t, monto, moneda] of [
  ["Después, cuesta $139 por mes", 139, "LOC"],
  ["Después, cuesta $ 4.499*** al mes", 4499, "LOC"],
  ["Después, US$ 8,99 por mes", 8.99, "USD"],
  ["Después, USD 6,99*** por mes", 6.99, "USD"],
  ["Depois é só R$ 23,90/mês", 23.9, "LOC"],
  ["12,14 €/mois ensuite", 12.14, "EUR"],
  ["Daarna € 13,99 per maand", 13.99, "EUR"],
  ["£12.99/month after", 12.99, "GBP"],
  ["キャンペーン期間終了後は月額￥1,080", 1080, "LOC"],
  ["₦1,600/month after", 1600, "LOC"],
  ["Ksh 419/month after", 419, "LOC"],
  ["Después, S/ 20.90 por mes", 20.9, "LOC"],
  ["45 MAD/mois ensuite", 45, "MAD"],
  ["3,29 $US/mois ensuite", 3.29, "USD"],
] as const) {
  const m = montosDeTexto(t).find((x) => x.monto > 0);
  caso(`monto «${t}»`, m ? [m.monto, monedaDeMarca(m.marca, "LOC")] : null, [monto, moneda]);
}
caso("sin marca no es precio", montosDeTexto("Probá 2 meses gratis").length, 0);

// Apple: el Product exacto del JSON-LD, en la moneda del país.
const apple = (nombre: string, low: number, moneda: string) =>
  `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"${nombre}","offers":[{"@type":"AggregateOffer","lowPrice":${low},"highPrice":${low * 2},"priceCurrency":"${moneda}"}]}</script>`;
caso("apple lee lowPrice", leerApple(apple("iPhone 17", 21999, "MXN"), "iPhone 17", "MXN"), { ok: true, precio: { monto: 21999, moneda: "MXN" } });
caso("apple no confunde iPhone 17e con iPhone 17", leerApple(apple("iPhone 17e", 599, "USD"), "iPhone 17", "USD").ok, false);
caso("apple rechaza otra moneda", leerApple(apple("iPhone 17", 1099, "USD"), "iPhone 17", "EUR").ok, false);

// Spotify: con oferta de entrada vale el precio de después; sin oferta, el principal.
const spotify = (plan: object) => `<script id="__NEXT_DATA__" type="application/json">${JSON.stringify({ props: { pageProps: { components: [{ attributes: { plans: [plan] } }] } } })}</script>`;
caso(
  "spotify con oferta",
  leerSpotify(spotify({ planId: "PREMIUM_INDIVIDUAL", offerTypeId: "intro", primaryPriceDescription: "$19 por 2 meses", secondaryPriceDescription: "Después, cuesta $139 por mes" }), "MXN"),
  { ok: true, precio: { monto: 139, moneda: "MXN" } },
);
caso("spotify sin oferta", leerSpotify(spotify({ planId: "PREMIUM_INDIVIDUAL", offerTypeId: null, primaryPriceDescription: "$189/mes" }), "MXN"), { ok: true, precio: { monto: 189, moneda: "MXN" } });
caso("spotify sin plan individual", leerSpotify(spotify({ planId: "PREMIUM_STANDARD", primaryPriceDescription: "₹119" }), "INR").ok, false);

// Salario por hora.
caso("hora", porHoraDe({ tipo: "hora", monto: 7.25 }), 7.25);
caso("Chile: mensual con 42 horas", porHoraDe({ tipo: "mes", monto: 553553, horasSemana: 42 }), (553553 * 12) / 52 / 42);
caso("Portugal: 14 pagas", porHoraDe({ tipo: "mes", monto: 920, horasSemana: 40, pagas: 14 }), (920 * 14) / 52 / 40);
caso("España: anual", porHoraDe({ tipo: "anio", monto: 17094, horasSemana: 40 }), 17094 / 52 / 40);
caso("México: diario que paga 7 días por 48 horas", porHoraDe({ tipo: "dia", monto: 315.04, diasPagados: 7, horasSemana: 48 }), (315.04 * 7) / 48);
caso("Costa Rica: jornada ÷ 8", porHoraDe({ tipo: "dia", monto: 12436.41, horasDia: 8 }), 12436.41 / 8);
caso("Uruguay: divisor 200", porHoraDe({ tipo: "divisor", monto: 25383, divisor: 200 }), 126.915);
let tiro = false;
try {
  porHoraDe({ tipo: "mes", monto: 1000 });
} catch {
  tiro = true;
}
caso("mensual sin jornada tira (el índice lo excluye)", tiro, true);
caso("horas", horasDe(21999, (315.04 * 7) / 48), 21999 / ((315.04 * 7) / 48));
caso("duración en minutos", duracion(0.5), { unidad: "min", valor: 30 });
caso("duración con decimal", duracion(3.46), { unidad: "h", valor: 3.5, decimales: 1 });
caso("duración entera", duracion(312.4), { unidad: "h", valor: 312, decimales: 0 });

// Vencimiento: 120 días todavía publica, 121 ya no.
caso("días entre fechas", diasEntre("2026-01-01", "2026-03-01"), 59);
caso("precio de 120 días vigente", precioVigente("2026-06-25", "2026-10-23"), diasEntre("2026-06-25", "2026-10-23") <= VIGENCIA_PRECIO_DIAS);
caso("precio de 121 días vencido", precioVigente("2026-06-24", "2026-10-23"), false);
caso("precio del futuro no vale", precioVigente("2026-10-30", "2026-10-23"), false);

// robots.txt.
const robotsApple = "User-agent: *\nDisallow: /*shop/browse/overlay/*\nDisallow: /tmall*\n\nUser-agent: Baiduspider\nDisallow: /*";
caso("robots de Apple deja leer la tienda", robotsPermite(robotsApple, "CalcularYaBot", "/mx/shop/buy-iphone/iphone-17"), true);
caso("robots de Apple bloquea el overlay", robotsPermite(robotsApple, "CalcularYaBot", "/mx/shop/browse/overlay/x"), false);
caso("robots de Netflix bloquea a cualquier bot", robotsPermite("User-agent: *\nDisallow: /\n\nUser-agent: googlebot\nAllow: /", "CalcularYaBot", "/mx/"), false);
caso("Allow más largo gana", robotsPermite("User-agent: *\nDisallow: /a\nAllow: /a/b", "CalcularYaBot", "/a/b/c"), true);

// URLs de las tiendas.
caso("url Apple EE. UU.", urlProducto(PRODUCTOS[0], "US"), "https://www.apple.com/shop/buy-iphone/iphone-17");
caso("url Apple Reino Unido", urlProducto(PRODUCTOS[0], "GB"), "https://www.apple.com/uk/shop/buy-iphone/iphone-17");
caso("url Spotify Reino Unido", urlProducto(PRODUCTOS[3], "GB"), "https://www.spotify.com/uk/premium/");

// La jornada de México vence el 31/12/2026 (la reforma baja a 46 horas desde 2027): ese día sale del índice.
const mx = MINIMOS.mx;
caso("México declara vencimiento de la jornada", "jornada" in mx && mx.jornada && "hasta" in mx.jornada ? mx.jornada.hasta : null, "2026-12-31");
const prev = process.env.CALCULAR_HOY;
process.env.CALCULAR_HOY = "2027-01-02";
const futuro = construirInformeHoras(new Date("2027-01-02T12:00:00Z"));
caso("en 2027 México queda excluido (salario y jornada de 2026 vencidos)", !futuro.indice.filas.some((f) => f.mercado === "mx") && futuro.excluidos.some((e) => e.mercado === "mx" && !e.producto), true);
caso("en 2027 ningún precio leído en 2026-10 se publica", futuro.indice.filas.every((f) => Object.values(f.celdas).every((c) => precioVigente(c.precio.consultadoEl, "2027-01-02"))), true);
if (prev === undefined) delete process.env.CALCULAR_HOY;
else process.env.CALCULAR_HOY = prev;

// Argentina: el SMVM por hora de la resolución vigente; fuera de la escala, sin valor.
const ar = minimoAr("2026-10-23");
caso("Argentina octubre 2026", typeof ar === "string" ? ar : ar.porHora, 1956);
caso("Argentina fuera de la escala", typeof minimoAr("2031-01-01"), "string");
const arNov = minimoAr("2026-11-02");
caso("Argentina noviembre 2026 (Res. 4/2026)", typeof arNov === "string" ? arNov : arNov.porHora, 1994);
const arAbr = minimoAr("2027-04-15");
caso("Argentina: el último mes de la escala vence el 2027-04-30", typeof arAbr === "string" ? arAbr : arAbr.vigenteHasta, "2027-04-30");
caso("Argentina: mayo de 2027 sin resolución", typeof minimoAr("2027-05-01"), "string");

// El índice de hoy: todo lo publicado está vigente y las horas cierran con precio ÷ salario por hora.
const hoy = construirInformeHoras();
for (const f of hoy.indice.filas)
  for (const c of Object.values(f.celdas)) {
    total++;
    const esperado = c.precioLocal / f.minimo.porHora;
    if (Math.abs(c.horas - esperado) > 1e-9 || !(c.horas > 0)) {
      fallas++;
      console.log(`  FALLA ${f.iso} ${c.producto}: ${c.horas} horas`);
    }
  }

console.log(`${total - fallas}/${total} casos bien`);
if (fallas) process.exit(1);
