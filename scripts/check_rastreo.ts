// Medición propia (/api/e) y embudo de compra: validación del endpoint, parseo de dispositivo y
// fuente, y las piezas del webhook que escriben ca_checkouts / ca_compras / devoluciones.
// Sin red. Correr con: npx tsx scripts/check_rastreo.ts  (o vía scripts/check-all.ts)

import assert from "node:assert/strict";
import {
  MAX_CUERPO,
  MAX_ITEMS,
  claveCliente,
  dentroDelLimite,
  dispositivo,
  esBot,
  leerCuerpo,
  limpiarHost,
  limpiarPath,
  limpiarProps,
  limpiarTexto,
  limpiarUtm,
  origenPermitido,
  pais,
  sitioDeOrigen,
  validarLote,
  type Lote,
} from "../src/app/api/e/protocolo";
import { TIPOS_EVENTO, esTipoEvento, hostExterno, normalizarRuta } from "../src/lib/rastreo";
import { codigoCompartido, origenCorto, REF_VALIDO } from "../src/motor/compartir/ref";
import {
  PRODUCTOS,
  checkoutIdDeReferencia,
  esPagoDePlanilla,
  filaCheckout,
  referenciaExterna,
  rutaDeReferencia,
  type MpPayment,
} from "../src/lib/mp";
import {
  esPagoAjeno,
  estadoCheckout,
  estadoCompra,
  filaCompra,
  marcaDevolucion,
  marcaPago,
  registrarDevolucion,
  registrarVenta,
  type Http,
} from "../src/lib/mp-webhook";

let fallas = 0;
let total = 0;
async function prueba(nombre: string, fn: () => void | Promise<void>) {
  total++;
  try {
    await fn();
    console.log(`OK   ${nombre}`);
  } catch (e) {
    fallas++;
    console.error(`FAIL ${nombre}\n     ${e instanceof Error ? e.message : e}`);
  }
}

const ctx = { dispositivo: "movil" as const, pais: "AR" };
const VID = "11111111-1111-4111-8111-111111111111";
const SID = "22222222-2222-4222-8222-222222222222";
const VISTA = "33333333-3333-4333-8333-333333333333";
const lote = (i: unknown[], extra: Record<string, unknown> = {}) => ({ vid: VID, sid: SID, i, ...extra });
const ok = (r: ReturnType<typeof validarLote>): Lote => {
  assert.ok(!("error" in r), `se esperaba un lote válido y vino ${JSON.stringify(r)}`);
  return r as Lote;
};
const error = (r: ReturnType<typeof validarLote>) => ("error" in r ? r.error : null);

const CHROME = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const IPAD = "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const ANDROID = "Mozilla/5.0 (Linux; Android 14; SM-A546E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36";
const ANDROID_TABLET = "Mozilla/5.0 (Linux; Android 13; SM-X200) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const CUBOT = "Mozilla/5.0 (Linux; Android 10; CUBOT X30 Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36";

async function main() {
  // ── Lote bueno ────────────────────────────────────────────────────────────────────────
  await prueba("lote completo: una vista, un evento y un cierre", () => {
    const r = ok(
      validarLote(
        lote([
          { t: "v", id: VISTA, p: "/aguinaldo/", r: "www.Google.com", us: "Google Ads", um: "cpc", uc: "Aguinaldo {id}" },
          { t: "e", k: "cta_compra", v: VISTA, p: "/aguinaldo", pr: "planilla-comercio", pp: { ubicacion: "calculadora" } },
          { t: "x", id: VISTA, a: 12_000, n: 3, s: 80, u: true },
        ]),
        ctx,
      ),
    );
    assert.equal(r.vistas.length, 1);
    assert.deepEqual(r.vistas[0], {
      id: VISTA,
      vid: VID,
      sid: SID,
      path: "/aguinaldo",
      ref_host: "google.com",
      utm_source: "google ads",
      utm_medium: "cpc",
      utm_campaign: "aguinaldo -id-",
      dispositivo: "movil",
      pais: "AR",
    });
    assert.deepEqual(r.eventos[0], {
      vid: VID,
      sid: SID,
      vista_id: VISTA,
      tipo: "cta_compra",
      path: "/aguinaldo",
      producto: "planilla-comercio",
      valor: null,
      props: { ubicacion: "calculadora" },
      user_id: null,
      pais: "AR",
    });
    assert.deepEqual(r.cierres[0], { p_id: VISTA, p_activo_ms: 12_000, p_interacciones: 3, p_scroll: 80, p_uso: true });
    assert.equal(r.descartados.length, 0);
  });

  await prueba("los productos de calcularya (<mercado>/<slug>) entran; una ruta trucha no", () => {
    const intl = { ...ctx, sitio: "intl" as const };
    const ev = (pr: string) => ({ t: "e", k: "vista_oferta", p: "/mx/aguinaldo", pr, m: "mx" });
    const r = ok(validarLote({ vid: VID, sid: SID, i: [ev("mx/sueldo-y-liquidacion"), ev("ca-fr/plan-prestamo"), ev("mx/../x"), ev("evil.com/x"), ev("MX/x")] }, intl));
    assert.deepEqual(r.eventos.map((e) => e.producto), ["mx/sueldo-y-liquidacion", "ca-fr/plan-prestamo"]);
    assert.equal(r.descartados.length, 3);
  });

  await prueba("los uuids se guardan en minúscula (el cliente puede mandarlos en mayúscula)", () => {
    const r = ok(validarLote({ vid: VID.toUpperCase(), sid: SID, i: [{ t: "v", id: VISTA.toUpperCase(), p: "/" }] }, ctx));
    assert.equal(r.vistas[0].id, VISTA);
    assert.equal(r.vistas[0].vid, VID);
  });

  await prueba("el cierre se manda varias veces: en el mismo lote gana el mayor de cada valor", () => {
    const r = ok(
      validarLote(
        lote([
          { t: "x", id: VISTA, a: 5000, n: 4, s: 30, u: true },
          { t: "x", id: VISTA, a: 9000, n: 2, s: 60, u: false },
        ]),
        ctx,
      ),
    );
    assert.deepEqual(r.cierres, [{ p_id: VISTA, p_activo_ms: 9000, p_interacciones: 4, p_scroll: 60, p_uso: true }]);
  });

  await prueba("números fuera de rango se acotan: 4 h de activo, 100% de scroll", () => {
    const r = ok(validarLote(lote([{ t: "x", id: VISTA, a: 1e12, n: 5e6, s: 250, u: false }]), ctx));
    assert.equal(r.cierres[0].p_activo_ms, 4 * 3_600_000);
    assert.equal(r.cierres[0].p_interacciones, 10_000);
    assert.equal(r.cierres[0].p_scroll, 100);
  });

  // ── Lotes malos: se rechaza entero ────────────────────────────────────────────────────
  await prueba("cuerpo que no es objeto → rechazado", () => {
    for (const c of [null, 42, "hola", [], true]) assert.equal(error(validarLote(c, ctx)), "cuerpo");
  });
  await prueba("vid o sid que no son uuid → rechazado", () => {
    assert.equal(error(validarLote({ vid: "x", sid: SID, i: [{ t: "v", id: VISTA, p: "/" }] }, ctx)), "ids");
    assert.equal(error(validarLote({ vid: VID, sid: 5, i: [{ t: "v", id: VISTA, p: "/" }] }, ctx)), "ids");
    assert.equal(error(validarLote({ vid: `${VID}x`, sid: SID, i: [{ t: "v", id: VISTA, p: "/" }] }, ctx)), "ids");
  });
  await prueba(`lista de items vacía, que no es lista o con más de ${MAX_ITEMS} → rechazado`, () => {
    assert.equal(error(validarLote(lote([]), ctx)), "items");
    assert.equal(error(validarLote({ vid: VID, sid: SID, i: {} }, ctx)), "items");
    const muchos = Array.from({ length: MAX_ITEMS + 1 }, () => ({ t: "e", k: "imprimir" }));
    assert.equal(error(validarLote(lote(muchos), ctx)), "items");
  });

  // ── Items malos: se descarta el item, no el lote ──────────────────────────────────────
  await prueba("tipo de evento fuera de la lista → descartado", () => {
    const r = ok(validarLote(lote([{ t: "e", k: "compra_inventada" }, { t: "e", k: "imprimir" }]), ctx));
    assert.equal(r.eventos.length, 1);
    assert.deepEqual(r.descartados, ["evento"]);
  });
  await prueba("props anidadas, con claves raras o demasiadas → descartado", () => {
    const malos = [
      { a: { b: 1 } },
      { a: [1] },
      { "Clave-Rara": 1 },
      { __proto__x: 1, ["a b"]: 2 },
      Object.fromEntries(Array.from({ length: 9 }, (_, i) => [`k${i}`, i])),
      { a: Number.NaN },
      "texto",
    ];
    for (const pp of malos) {
      const r = ok(validarLote(lote([{ t: "e", k: "busqueda", pp }]), ctx));
      assert.equal(r.eventos.length, 0, `props aceptadas y no debían: ${JSON.stringify(pp)}`);
    }
  });
  await prueba("vista sin id, con path inválido o con query que no se puede limpiar → descartada", () => {
    const r = ok(
      validarLote(
        lote([
          { t: "v", p: "/a" },
          { t: "v", id: VISTA, p: "sin-barra" },
          { t: "v", id: VISTA, p: "/<script>" },
          { t: "v", id: VISTA, p: `/${"a".repeat(400)}` },
        ]),
        ctx,
      ),
    );
    assert.equal(r.vistas.length, 0);
    assert.equal(r.descartados.length, 4);
  });
  await prueba("más de 3 vistas en un lote → las de más se descartan", () => {
    const ids = ["a", "b", "c", "d"].map((x) => `${x.repeat(8)}-aaaa-4aaa-8aaa-${x.repeat(12)}`);
    const r = ok(validarLote(lote(ids.map((id) => ({ t: "v", id, p: "/" }))), ctx));
    assert.equal(r.vistas.length, 3);
  });
  await prueba("cierre con números inválidos o sin uso booleano → descartado", () => {
    const r = ok(
      validarLote(
        lote([
          { t: "x", id: VISTA, a: -1, n: 0, s: 0, u: false },
          { t: "x", id: VISTA, a: "10", n: 0, s: 0, u: false },
          { t: "x", id: VISTA, a: 1, n: 0, s: 0, u: "true" },
          { t: "x", id: VISTA, a: Infinity, n: 0, s: 0, u: false },
        ]),
        ctx,
      ),
    );
    assert.equal(r.cierres.length, 0);
  });
  await prueba("evento con producto, valor o vista inválidos → descartado", () => {
    const r = ok(
      validarLote(
        lote([
          { t: "e", k: "checkout", pr: "Planilla Comercio" },
          { t: "e", k: "checkout", va: "14900" },
          { t: "e", k: "checkout", va: 1e20 },
          { t: "e", k: "checkout", v: "no-uuid" },
        ]),
        ctx,
      ),
    );
    assert.equal(r.eventos.length, 0);
  });

  // ── Privacidad: nada personal llega a la base ─────────────────────────────────────────
  await prueba("props de texto: mails, CUIT, tarjetas y queries de URL se tapan", () => {
    const p = limpiarProps({
      q: "soy juan.perez@gmail.com cuit 20-12345678-9 tarjeta 4111 1111 1111 1111 https://x.com/a?token=abc",
    });
    assert.ok(p && typeof p.q === "string");
    const q = p.q as string;
    assert.ok(!q.includes("@") && !q.includes("12345678") && !q.includes("4111") && !q.includes("token"), q);
    assert.ok(q.includes("[email]") && q.includes("[num]") && q.includes("https://x.com/a"), q);
  });
  await prueba("un sueldo con puntos no se confunde con un documento", () => {
    assert.equal(limpiarTexto("sueldo 1.500.000 en 2026"), "sueldo 1.500.000 en 2026");
  });
  await prueba("utm con un mail adentro se descarta entera", () => {
    assert.equal(limpiarUtm("juan@gmail.com"), null);
    assert.equal(limpiarUtm("Newsletter Septiembre!"), "newsletter septiembre-");
  });
  await prueba("props de más de 1,5 KB → descartadas (el check de la tabla mide con espacios)", () => {
    const grande = Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`k${i}`, "é".repeat(100)]));
    assert.equal(limpiarProps(grande), undefined);
    const justa = Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`k${i}`, "a".repeat(200)]));
    assert.ok(limpiarProps(justa));
  });

  // ── Fuente ────────────────────────────────────────────────────────────────────────────
  await prueba("ref_host: sin www, en minúscula, y el propio sitio no cuenta como fuente", () => {
    assert.equal(limpiarHost("WWW.Google.com.ar"), "google.com.ar");
    assert.equal(limpiarHost("com.google.android.gm"), "com.google.android.gm");
    assert.equal(limpiarHost("calcular.ar"), null);
    assert.equal(limpiarHost("www.calcular.ar"), null);
    assert.equal(limpiarHost("calcular-ar-git-x.vercel.app"), null);
    assert.equal(limpiarHost("localhost"), null);
    assert.equal(limpiarHost("no es un host"), null);
    assert.equal(limpiarHost(`${"a".repeat(101)}.com`), null);
  });
  await prueba("hostExterno (cliente): referrer externo sí, interno no, ilegible no", () => {
    assert.equal(hostExterno("https://www.google.com/", "calcular.ar"), "google.com");
    assert.equal(hostExterno("https://calcular.ar/aguinaldo", "calcular.ar"), "");
    assert.equal(hostExterno("https://www.calcular.ar/aguinaldo", "calcular.ar"), "");
    assert.equal(hostExterno("", "calcular.ar"), "");
    assert.equal(hostExterno("android-app://com.google.android.gm/", "calcular.ar"), "com.google.android.gm");
  });
  await prueba("normalizarRuta y limpiarPath: sin query, sin hash, sin barra final", () => {
    assert.equal(normalizarRuta("/aguinaldo/"), "/aguinaldo");
    assert.equal(normalizarRuta("/"), "/");
    assert.equal(normalizarRuta("/planillas?desde=x#comprar"), "/planillas");
    assert.equal(limpiarPath("/planillas?email=juan@gmail.com"), "/planillas");
    assert.equal(limpiarPath("/convenios/comercio/2026-09/"), "/convenios/comercio/2026-09");
    assert.equal(limpiarPath("/a b"), null);
  });
  await prueba("rutas: `//evil.com` no sale como URL de otro sitio, la barra invertida y las relativas no pasan", () => {
    assert.equal(limpiarPath("//evil.com"), "/evil.com");
    assert.equal(limpiarPath("///evil.com/x//y/"), "/evil.com/x/y");
    assert.equal(limpiarPath(String.raw`/\evil.com`), null);
    assert.equal(limpiarPath("evil.com"), null);
    assert.equal(limpiarPath("https://evil.com/"), null);
    assert.equal(limpiarPath("//"), "/");
  });

  // ── Bots y dispositivo ────────────────────────────────────────────────────────────────
  await prueba("bots conocidos, scripts y UA vacío → bot", () => {
    for (const ua of [
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0)",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0.0.0 Safari/537.36",
      "curl/8.4.0",
      "python-requests/2.31.0",
      "Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)",
      "Mozilla/5.0 (Linux; Android 11) Chrome-Lighthouse",
      "",
      null,
    ]) {
      assert.ok(esBot(ua), `no lo detectó: ${ua}`);
    }
  });
  await prueba("navegadores reales (Cubot incluido) → no son bot", () => {
    for (const ua of [CHROME, IPHONE, IPAD, ANDROID, ANDROID_TABLET, CUBOT]) assert.ok(!esBot(ua), ua);
  });
  await prueba("dispositivo: celular, tablet y escritorio", () => {
    assert.equal(dispositivo(IPHONE), "movil");
    assert.equal(dispositivo(ANDROID), "movil");
    assert.equal(dispositivo(CUBOT), "movil");
    assert.equal(dispositivo(IPAD), "tablet");
    assert.equal(dispositivo(ANDROID_TABLET), "tablet");
    assert.equal(dispositivo(CHROME), "escritorio");
    assert.equal(dispositivo(CHROME, "?1"), "movil");
    assert.equal(dispositivo(null), "escritorio");
  });
  await prueba("país: sólo dos letras mayúsculas y nunca «XX»", () => {
    assert.equal(pais("AR"), "AR");
    assert.equal(pais("ar"), null);
    assert.equal(pais("XX"), null);
    assert.equal(pais(null), null);
    assert.equal(pais("ARG"), null);
  });

  // ── Origen, límite y tamaño ───────────────────────────────────────────────────────────
  await prueba("origen: calcular.ar sí; otro sitio, un parecido y la ausencia no", () => {
    assert.ok(origenPermitido("https://calcular.ar", null, false));
    assert.ok(origenPermitido(null, "https://calcular.ar/aguinaldo", false));
    assert.ok(!origenPermitido("https://evil.example", "https://calcular.ar/", false));
    assert.ok(!origenPermitido(null, "https://calcular.ar.evil.example/", false));
    assert.ok(!origenPermitido(null, null, false));
    assert.ok(!origenPermitido("http://localhost:3107", null, false), "localhost en producción");
    assert.ok(origenPermitido("http://localhost:3107", null, true));
  });
  await prueba("sitio por origen: calcularya es intl, calcular.ar es ar, el cuerpo no decide en producción", () => {
    const intl = ["https://calcularya.com", "https://www.calcularya.com"];
    assert.equal(sitioDeOrigen("https://calcular.ar", null, false, intl), "ar");
    assert.equal(sitioDeOrigen("https://calcularya.com", null, false, intl), "intl");
    assert.equal(sitioDeOrigen("https://www.calcularya.com", null, false, intl), "intl");
    assert.equal(sitioDeOrigen(null, "https://calcularya.com/mx/aguinaldo", false, intl), "intl");
    assert.equal(sitioDeOrigen(null, "https://calcularya.com.evil.example/", false, intl), null);
    assert.equal(sitioDeOrigen("https://calcularya.com", null, false, []), null, "sin sitio intl prendido no se acepta");
    assert.equal(sitioDeOrigen("http://localhost:3107", null, true, intl), "dev");
    assert.equal(sitioDeOrigen("http://localhost:3107", null, false, intl), null);
  });
  await prueba("intl: vistas y eventos llevan sitio y mercado validados; AR no lleva columnas", () => {
    const intl = { ...ctx, sitio: "intl" as const };
    const r = ok(
      validarLote(
        lote([
          { t: "v", id: VISTA, p: "/mx/aguinaldo", m: "mx" },
          { t: "e", k: "compartir", p: "/mx/aguinaldo", m: "mx", pp: { canal: "copiar" } },
          { t: "e", k: "busqueda", p: "/do/salario" },
          { t: "e", k: "imprimir" },
          { t: "v", id: VISTA.replace("3333-4", "4444-4"), p: "/", m: "global" },
        ]),
        intl,
      ),
    );
    assert.deepEqual(r.vistas.map((v) => [v.path, v.sitio, v.mercado]), [["/mx/aguinaldo", "intl", "mx"], ["/", "intl", "global"]]);
    assert.deepEqual(r.eventos.map((e) => [e.sitio, e.mercado]), [["intl", "mx"], ["intl", "do"], ["intl", "global"]], "sin m, sale del path");
    const malos = ok(validarLote(lote([{ t: "v", id: VISTA, p: "/x", m: "zz" }, { t: "e", k: "imprimir", m: "ar" }, { t: "e", k: "imprimir", m: "MX" }]), intl));
    assert.deepEqual([malos.vistas.length, malos.eventos.length, malos.descartados], [0, 0, ["vista", "evento", "evento"]], "zz, ar o mayúsculas no pasan");
    const ar = ok(validarLote(lote([{ t: "v", id: VISTA, p: "/mx/aguinaldo", m: "mx" }, { t: "e", k: "imprimir", m: "mx" }]), ctx));
    assert.ok(!("sitio" in ar.vistas[0]) && !("mercado" in ar.vistas[0]), "en AR el m del cliente se ignora");
    assert.ok(!("sitio" in ar.eventos[0]) && !("mercado" in ar.eventos[0]));
  });
  // ── Boca en boca: props cerradas por tipo ─────────────────────────────────────────────
  const props = (i: unknown[]) => ok(validarLote(lote(i), ctx)).eventos.map((e) => e.props);
  const cuantos = (i: unknown[]) => ok(validarLote(lote(i), ctx)).eventos.length;
  await prueba("compartir: Facebook e Instagram son canales válidos; uno inventado se descarta", () => {
    for (const canal of ["facebook", "instagram"]) {
      assert.deepEqual(props([{ t: "e", k: "compartir", pp: { canal, origen: "horas", ref: "ab12cd34" } }]), [{ canal, origen: "horas", ref: "ab12cd34" }]);
    }
    assert.equal(cuantos([{ t: "e", k: "compartir", pp: { canal: "tiktok" } }]), 0);
  });
  await prueba("llegada: ref, origen corto y nuevo; una clave de más se tira", () => {
    assert.deepEqual(props([{ t: "e", k: "llegada", pp: { ref: "ab12cd34", origen: "c", nuevo: true, monto: 123456, nombre: "Ana" } }]), [
      { ref: "ab12cd34", origen: "c", nuevo: true },
    ]);
    assert.deepEqual(props([{ t: "e", k: "llegada", pp: { ref: "ab12cd34" } }]), [{ ref: "ab12cd34" }]);
  });
  await prueba("llegada con ref, origen o nuevo inválidos, o sin ref → descartada", () => {
    for (const pp of [
      { ref: "<b>hola</b>" },
      { ref: "AB12CD34" },
      { ref: "ab12" },
      { ref: 12345678 },
      { ref: "ab12cd34", origen: "zz" },
      { ref: "ab12cd34", origen: "" },
      { ref: "ab12cd34", nuevo: "true" },
      { origen: "c", nuevo: true },
      undefined,
      "ab12cd34",
    ])
      assert.equal(cuantos([{ t: "e", k: "llegada", pp }]), 0, `entró y no debía: ${JSON.stringify(pp)}`);
    assert.equal(cuantos([{ t: "e", k: "llegada", pp: { ref: "ab12cd34" }, va: 5000 }]), 0, "valor numérico en un evento del boca en boca");
    assert.equal(cuantos([{ t: "e", k: "llegada", pp: { ref: "ab12cd34" }, pr: "mx/sueldo" }]), 0);
  });
  await prueba("puente_visto y puente_clic: solo v ∈ {con, sin}", () => {
    assert.deepEqual(props([{ t: "e", k: "puente_visto", pp: { v: "con", monto: 99 } }, { t: "e", k: "puente_clic", pp: { v: "sin" } }]), [{ v: "con" }, { v: "sin" }]);
    for (const pp of [{ v: "otra" }, { v: 1 }, {}, undefined]) {
      assert.equal(cuantos([{ t: "e", k: "puente_visto", pp }]), 0, JSON.stringify(pp));
      assert.equal(cuantos([{ t: "e", k: "puente_clic", pp }]), 0, JSON.stringify(pp));
    }
  });
  await prueba("compartir del motor, de la barra de calcular.ar y del botón de WhatsApp entran", () => {
    assert.deepEqual(
      props([
        { t: "e", k: "compartir", pp: { origen: "calculadora", canal: "nativo", calc: "mx.sueldo-neto", ref: "k3j9x0aa", v: "con" } },
        { t: "e", k: "compartir", pp: { origen: "mundo", canal: "whatsapp", ref: "k3j9x0ab" } },
        { t: "e", k: "compartir", pp: { origen: "duelo", canal: "copiar", ref: "k3j9x0ac" } },
        { t: "e", k: "compartir", pp: { canal: "link" } },
        { t: "e", k: "compartir", pp: { canal: "whatsapp" } },
        { t: "e", k: "compartir", pp: { origen: "calculadora", canal: "x", calc: "pk.short-term-savings-certificate-calculator", ref: "k3j9x0ad", monto: 123456, html: "<script>" } },
      ]),
      [
        { origen: "calculadora", canal: "nativo", calc: "mx.sueldo-neto", ref: "k3j9x0aa", v: "con" },
        { origen: "mundo", canal: "whatsapp", ref: "k3j9x0ab" },
        { origen: "duelo", canal: "copiar", ref: "k3j9x0ac" },
        { canal: "link" },
        { canal: "whatsapp" },
        { origen: "calculadora", canal: "x", calc: "pk.short-term-savings-certificate-calculator", ref: "k3j9x0ad" },
      ],
    );
  });
  await prueba("compartir con canal, origen, calc, ref o v inválidos → descartado", () => {
    for (const pp of [
      {},
      undefined,
      { canal: "fax" },
      { canal: "x", origen: "evil" },
      { canal: "x", calc: "../etc" },
      { canal: "x", calc: "mx.<b>" },
      { canal: "x", calc: 42 },
      { canal: "x", ref: "<img src=x onerror=alert(1)>" },
      { canal: "x", ref: 123456 },
      { canal: "x", v: "talvez" },
    ])
      assert.equal(cuantos([{ t: "e", k: "compartir", pp }]), 0, `entró y no debía: ${JSON.stringify(pp)}`);
    assert.equal(cuantos([{ t: "e", k: "compartir", pp: { canal: "x" }, va: 123456 }]), 0);
  });
  await prueba("ningún evento del boca en boca guarda un número", () => {
    const r = ok(
      validarLote(
        lote([
          { t: "e", k: "llegada", pp: { ref: "ab12cd34", origen: "m", nuevo: false, a: 1, b: 2.5 } },
          { t: "e", k: "compartir", pp: { canal: "copiar", ref: "ab12cd35", monto: 1e6, sueldo: 45000 } },
          { t: "e", k: "puente_visto", pp: { v: "sin", bruto: 30000 } },
        ]),
        ctx,
      ),
    );
    assert.equal(r.eventos.length, 3);
    for (const e of r.eventos) {
      assert.equal(e.valor, null);
      for (const v of Object.values(e.props ?? {})) assert.notEqual(typeof v, "number", JSON.stringify(e.props));
    }
  });
  await prueba("el código de un compartido es nuevo cada vez y pasa la validación del servidor", () => {
    const codigos = new Set(Array.from({ length: 200 }, codigoCompartido));
    assert.equal(codigos.size, 200);
    for (const c of codigos) assert.match(c, REF_VALIDO);
    assert.equal(origenCorto("calculadora:mx.sueldo-neto"), "c");
    assert.equal(origenCorto("mundo"), "m");
    assert.equal(origenCorto("duelo"), "d");
    assert.equal(origenCorto("cualquiera"), null);
  });
  await prueba("calcularya como referer no es una fuente", () => {
    assert.equal(limpiarHost("calcularya.com"), null);
    assert.equal(limpiarHost("www.calcularya.com"), null);
  });
  await prueba("límite por minuto por cliente, y se reinicia en la ventana siguiente", () => {
    const k = claveCliente("203.0.113.9");
    assert.notEqual(k, "203.0.113.9");
    assert.ok(!k.includes("203"));
    const t0 = 1_000_000_000;
    for (let i = 0; i < 5; i++) assert.ok(dentroDelLimite(k, t0 + i, 5));
    assert.ok(!dentroDelLimite(k, t0 + 10, 5));
    assert.ok(dentroDelLimite(k, t0 + 60_001, 5));
  });
  await prueba(`cuerpo de más de ${MAX_CUERPO} bytes → no se lee`, async () => {
    const chico = new Request("http://x/api/e", { method: "POST", body: "a".repeat(100) });
    assert.equal(await leerCuerpo(chico), "a".repeat(100));
    const grande = new Request("http://x/api/e", { method: "POST", body: "a".repeat(MAX_CUERPO + 1) });
    assert.equal(await leerCuerpo(grande), null);
    const mentiroso = new Request("http://x/api/e", {
      method: "POST",
      body: new ReadableStream({
        start(c) {
          for (let i = 0; i < 10; i++) c.enqueue(new TextEncoder().encode("b".repeat(1000)));
          c.close();
        },
      }),
      duplex: "half",
    } as RequestInit);
    assert.equal(await leerCuerpo(mentiroso), null, "un stream sin content-length también se corta");
  });
  await prueba("la lista de tipos de eventos es la del SPEC", () => {
    assert.deepEqual(
      [...TIPOS_EVENTO].sort(),
      [
        "afiliado_clic", "busqueda", "checkout", "compartir", "copiar_resultado", "cta_compra", "descarga", "dialogo_compra",
        "error", "guardar_calculo", "imprimir", "llegada", "login", "puente_clic", "puente_visto", "registro", "suscripcion", "vista_oferta",
      ],
    );
    assert.ok(esTipoEvento("checkout") && !esTipoEvento("planilla_compra_completada"));
  });

  // ── Checkout ──────────────────────────────────────────────────────────────────────────
  const COMERCIO = PRODUCTOS["planilla-comercio"];
  await prueba("el uuid de la referencia es la PK del checkout, y el desde es el de la referencia", () => {
    const ref = referenciaExterna("planilla-comercio", "google.com_/planillas");
    const id = checkoutIdDeReferencia(ref);
    assert.ok(id && /^[0-9a-f-]{36}$/.test(id));
    const f = filaCheckout({ referencia: ref, producto: COMERCIO, ruta: "/planillas/", email: " Juan@Gmail.com ", vid: VID, userId: null });
    assert.deepEqual(f, {
      id,
      producto: "planilla-comercio",
      email: "juan@gmail.com",
      vid: VID,
      user_id: null,
      desde: "/planillas",
      estado: "iniciado",
      monto: 14900,
    });
    assert.ok(ref.endsWith(":google.com_/planillas"), "la marca sigue viajando en la referencia de MP");
  });
  await prueba("ca_checkouts.desde es siempre una ruta limpia o null, nunca la marca", () => {
    const base = { referencia: referenciaExterna("planilla-comercio"), producto: COMERCIO };
    assert.equal(filaCheckout({ ...base, ruta: "aguinaldo_/planillas" })?.desde, null);
    assert.equal(filaCheckout({ ...base, ruta: "//evil.com" })?.desde, "/evil.com");
    assert.equal(filaCheckout({ ...base, ruta: "/aguinaldo?x=1" })?.desde, "/aguinaldo");
    assert.equal(filaCheckout({ ...base })?.desde, null);
  });
  await prueba("ruta desde la referencia (webhook y backfill): sólo si la marca la trae entera", () => {
    assert.equal(rutaDeReferencia(`planilla-comercio:${VISTA}:google.com_/planillas`), "/planillas");
    assert.equal(rutaDeReferencia(`planilla-comercio:${VISTA}:aguinaldo_/planillas`), "/planillas");
    assert.equal(rutaDeReferencia(`planilla-uocra:${VISTA}:cta-uocra`), null, "un slug de CTA no es una ruta");
    assert.equal(rutaDeReferencia(`planilla-uocra:${VISTA}`), null);
    assert.equal(rutaDeReferencia(`planilla-comercio:${VISTA}:${"www.google.com_/convenios/comercio/escala-salarial-septiembre-2026".slice(0, 60)}`), null, "pudo cortarse en 60");
  });
  await prueba("checkout con vid trucho o mail inválido: se guardan en null, no se rechaza", () => {
    const f = filaCheckout({ referencia: referenciaExterna("planilla-uocra"), producto: PRODUCTOS["planilla-uocra"], email: "no", vid: "x" });
    assert.ok(f && f.email === null && f.vid === null && f.desde === null);
  });
  await prueba("referencias viejas sin uuid no generan checkout", () => {
    assert.equal(checkoutIdDeReferencia("planilla-comercio"), null);
    assert.equal(checkoutIdDeReferencia("abc:def"), null);
    assert.equal(filaCheckout({ referencia: "planilla-comercio:123", producto: COMERCIO }), null);
  });

  // ── Webhook: qué es de planillas, estados y fila de compra ────────────────────────────
  await prueba("sólo los pagos marcados por nosotros cuentan como de planillas", () => {
    assert.ok(esPagoDePlanilla({ external_reference: `planilla-uocra:${VISTA}` }));
    assert.ok(esPagoDePlanilla({ metadata: { producto: "planilla-comercio-2026" } }), "la primera venta (slug legado)");
    assert.ok(!esPagoDePlanilla({}), "un cobro ajeno de la cuenta legado, sin marca");
    assert.ok(!esPagoDePlanilla({ external_reference: "apex-web:123", metadata: { producto: "sitio" } }));
  });
  await prueba("cuenta legado: un pago sin marca de planilla es ajeno; las ventas viejas no", () => {
    const apex: MpPayment = { status: "approved", transaction_amount: 14900, currency_id: "ARS", external_reference: "apex-web-123" };
    assert.ok(esPagoAjeno({ pago: apex, legado: true }), "un cobro de APEX de $14.900 no puede entregar Comercio");
    assert.ok(esPagoAjeno({ pago: { ...apex, external_reference: undefined }, legado: true }));
    const primeraVenta: MpPayment = {
      status: "approved",
      transaction_amount: 14900,
      currency_id: "ARS",
      external_reference: "2fadd97f-af8a-401b-9183-1c5a2fcfbc06",
      metadata: { producto: "planilla-comercio-2026" },
    };
    assert.ok(!esPagoAjeno({ pago: primeraVenta, legado: true }), "la venta del 8/8 sigue siendo nuestra");
    assert.ok(!esPagoAjeno({ pago: { ...apex, external_reference: `planilla-comercio:${VISTA}` }, legado: true }));
    assert.ok(!esPagoAjeno({ pago: apex, legado: false }), "la cuenta nueva sólo cobra planillas");
  });
  await prueba("estados de MP → estado del checkout y de la compra", () => {
    assert.equal(estadoCheckout("approved"), "pagado");
    assert.equal(estadoCheckout("in_process"), "pendiente");
    assert.equal(estadoCheckout("rejected"), "rechazado");
    assert.equal(estadoCheckout("charged_back"), "reembolsado");
    assert.equal(estadoCheckout("otro"), null);
    assert.equal(estadoCompra("approved"), "aprobado");
    assert.equal(estadoCompra("refunded"), "reembolsado");
    assert.equal(estadoCompra("charged_back"), "contracargo");
    assert.equal(estadoCompra("pending"), null);
  });
  await prueba("fila de compra: mail del pagador o, si MP no lo da, el del checkout", () => {
    const pago: MpPayment = {
      status: "approved",
      transaction_amount: 14900,
      currency_id: "ARS",
      external_reference: `planilla-comercio:${VISTA}:google.com`,
      date_approved: "2026-09-30T12:00:00.000-03:00",
      payer: { email: "Compradora@Example.com" },
    };
    const f = filaCompra(pago, { paymentId: "999", legado: true, producto: COMERCIO, estado: "aprobado", emailCheckout: "otra@example.com" });
    assert.deepEqual(f, {
      mp_payment_id: "999",
      producto: "planilla-comercio",
      email: "compradora@example.com",
      monto: 14900,
      moneda: "ARS",
      estado: "aprobado",
      legado: true,
      checkout_id: VISTA,
      pagado_at: "2026-09-30T12:00:00.000-03:00",
    });
    const sinMail = filaCompra({ ...pago, payer: {} }, { paymentId: "999", legado: false, producto: COMERCIO, estado: "aprobado", emailCheckout: "otra@example.com" });
    assert.equal(sinMail.email, "otra@example.com");
    const sinFecha = filaCompra({ ...pago, date_approved: undefined, date_created: undefined }, { paymentId: "999", legado: false, producto: COMERCIO, estado: "reembolsado" });
    assert.ok(!Number.isNaN(Date.parse(sinFecha.pagado_at)), "pagado_at es NOT NULL en la tabla: nunca puede ir vacío");
  });

  // ── Devolución negativa en revenue_events: una sola vez y sólo si hubo venta ──────────
  function supabaseFalso(barrera = 0) {
    const tabla: { id: number; note: string; amount: number }[] = [];
    let proximo = 1;
    let pendientes = barrera;
    let abrir: () => void = () => {};
    const puerta = new Promise<void>((r) => (abrir = r));
    const fetchFalso: Http = async (url, init) => {
      const metodo = init?.method ?? "GET";
      if (metodo === "GET") {
        const marca = (decodeURIComponent(url).match(/\*(\[[^\]]+\])\*/) ?? ["", ""])[1];
        if (pendientes > 0 && marca.startsWith("[mp-devuelto")) {
          pendientes--;
          if (pendientes === 0) abrir();
          await puerta;
        }
        const filas = tabla.filter((f) => f.note.includes(marca)).sort((a, b) => a.id - b.id);
        return new Response(JSON.stringify(filas.map((f) => ({ id: f.id }))), { status: 200 });
      }
      if (metodo === "POST") {
        const b = JSON.parse(String(init?.body ?? "{}"));
        const fila = { id: proximo++, note: String(b.note), amount: Number(b.amount) };
        tabla.push(fila);
        return new Response(JSON.stringify([{ id: fila.id }]), { status: 201 });
      }
      if (metodo === "DELETE") {
        const ids = (decodeURIComponent(url).match(/id=in\.\(([^)]*)\)/) ?? ["", ""])[1].split(",").map(Number);
        for (const id of ids) {
          const i = tabla.findIndex((f) => f.id === id);
          if (i !== -1) tabla.splice(i, 1);
        }
        return new Response(null, { status: 204 });
      }
      return new Response("", { status: 405 });
    };
    return { tabla, deps: { fetch: fetchFalso, supabaseUrl: "https://falso.supabase.co", serviceRole: "clave-falsa" } };
  }
  const venta = { paymentId: "5550001", monto: 14900, moneda: "ARS", email: "c@example.com", productoTitulo: COMERCIO.titulo, productoSlug: COMERCIO.slug };
  const devolucion = { paymentId: "5550001", monto: 14900, moneda: "ARS", motivo: "reembolso" as const, productoTitulo: COMERCIO.titulo, productoSlug: COMERCIO.slug };

  await prueba("devolución sin venta asentada: no descuenta nada", async () => {
    const { tabla, deps } = supabaseFalso();
    const r = await registrarDevolucion(deps, devolucion);
    assert.equal(r.sinVenta, true);
    assert.equal(tabla.length, 0);
  });
  await prueba("devolución: una fila negativa, idempotente ante reintentos", async () => {
    const { tabla, deps } = supabaseFalso();
    await registrarVenta(deps, venta);
    const a = await registrarDevolucion(deps, devolucion);
    const b = await registrarDevolucion(deps, { ...devolucion, motivo: "contracargo" });
    assert.equal(a.duplicado, false);
    assert.equal(b.duplicado, true);
    assert.equal(tabla.length, 2);
    assert.equal(tabla[1].amount, -14900);
    assert.ok(tabla[1].note.includes(marcaDevolucion("5550001")));
    assert.ok(!tabla[1].note.includes(marcaPago("5550001")), "la devolución no puede llevar la marca de la venta");
    const otraVez = await registrarVenta(deps, venta);
    assert.equal(otraVez.duplicado, true, "el reintento de la venta sigue viendo UNA venta");
  });
  await prueba("devolución: dos avisos en paralelo dejan una sola fila negativa", async () => {
    const { tabla, deps } = supabaseFalso(2);
    await registrarVenta(deps, venta);
    const [a, b] = await Promise.all([registrarDevolucion(deps, devolucion), registrarDevolucion(deps, devolucion)]);
    assert.equal(tabla.filter((f) => f.amount < 0).length, 1, JSON.stringify(tabla));
    assert.equal([a, b].filter((r) => !r.duplicado).length, 1);
  });

  console.log(`\n${total - fallas}/${total} verdes`);
  if (fallas) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
