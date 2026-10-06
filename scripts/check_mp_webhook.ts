// Verificación del webhook de MercadoPago (/api/mp/webhook) — la pieza que asienta sola cada
// venta en revenue_events. Se prueba la lógica PURA (firma, parseo del evento, dedupe), que es
// donde están las formas de fallar en silencio:
//
//   · aceptar una notificación falsificada (firma mal verificada)  → ingreso inventado
//   · registrar dos veces el mismo pago (MP reintenta y manda created + updated) → ingreso inflado
//   · confundir un merchant_order con un pago                       → ingreso inventado
//   · no entender el formato viejo de IPN (?topic=payment&id=N)     → venta perdida
//
// El único número que no se testea acá es la respuesta de MP (eso es red): la ruta re-consulta
// SIEMPRE el pago con obtenerPago() y gatea con pagoAprobado(), que ya tiene su propia cobertura.
//
// Correr con: npx tsx scripts/check_mp_webhook.ts  (o vía scripts/check-all.ts)

import "./sin-server-only";
import {
  extraerPaymentId,
  firmar,
  firmaValida,
  manifiesto,
  marcaPago,
  marcarEntrega,
  parsearFirma,
  registrarVenta,
  type Http,
} from "../src/lib/mp-webhook";
import {
  METADATA_MAX,
  crearPreferencia,
  metadataPreferencia,
  PRODUCTOS,
  habilitaDescarga,
  pagoAprobado,
  productoDePago,
  productoPorSlug,
  referenciaExterna,
  type MpPayment,
} from "../src/lib/mp";
import { DATOS_MAX, datosDelPago, datosParaCheckout } from "../src/lib/prefill/servidor";
import { PREFILLS } from "../src/lib/prefill";
import type { Prefill } from "../src/lib/prefill/tipos";

let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const u = (qs: string) => new URL(`https://calcular.ar/api/mp/webhook${qs}`);

// ── 1. Extracción del payment id en las formas que MP usa de verdad ──────────────────
check(
  "webhook moderno: cuerpo {type:payment, data:{id}}",
  extraerPaymentId(u(""), { type: "payment", data: { id: "123456789" } }) === "123456789",
);
check(
  "webhook moderno: id numérico (MP lo manda sin comillas a veces)",
  extraerPaymentId(u(""), { type: "payment", data: { id: 123456789 } }) === "123456789",
);
check(
  "action payment.updated sin type",
  extraerPaymentId(u(""), { action: "payment.updated", data: { id: "42" } }) === "42",
);
check(
  "query moderna ?type=payment&data.id=N sin cuerpo",
  extraerPaymentId(u("?type=payment&data.id=555"), null) === "555",
);
check("IPN viejo ?topic=payment&id=N", extraerPaymentId(u("?topic=payment&id=777"), null) === "777");

// ── 2. Lo que NO es una venta tiene que devolver null (o inventamos ingresos) ─────────
check(
  "merchant_order NO es un pago",
  extraerPaymentId(u("?topic=merchant_order&id=999"), { type: "merchant_order", data: { id: "999" } }) === null,
);
check(
  "topic=merchant_order en query, sin cuerpo",
  extraerPaymentId(u("?topic=merchant_order&id=999"), null) === null,
);
check("evento de payment sin id", extraerPaymentId(u("?type=payment"), { type: "payment" }) === null);
check(
  "id no numérico se descarta (no se consulta basura a MP)",
  extraerPaymentId(u(""), { type: "payment", data: { id: "abc; drop" } }) === null,
);
check("notificación vacía", extraerPaymentId(u(""), null) === null);
check(
  "un ?id= suelto sin topic=payment NO se toma como pago",
  extraerPaymentId(u("?id=123"), null) === null,
);

// ── 3. Firma x-signature ─────────────────────────────────────────────────────────────
const SECRET = "secreto-de-prueba-no-es-el-real";
const ts = "1755300000";
const reqId = "b7a1f0e2-0000-4000-8000-000000000000";

check("parsearFirma: ts + v1", (() => {
  const f = parsearFirma(`ts=${ts},v1=abc123`);
  return f?.ts === ts && f?.v1 === "abc123";
})());
check("parsearFirma: tolera espacios y orden invertido", (() => {
  const f = parsearFirma(` v1=abc123 , ts=${ts} `);
  return f?.ts === ts && f?.v1 === "abc123";
})());
check("parsearFirma: header ausente → null", parsearFirma(null) === null);
check("parsearFirma: header incompleto → null", parsearFirma("ts=1755300000") === null);

check(
  "manifiesto: formato exacto de MP",
  manifiesto("123", reqId, ts) === `id:123;request-id:${reqId};ts:${ts};`,
  manifiesto("123", reqId, ts),
);
check(
  "manifiesto: sin x-request-id se omite ese tramo",
  manifiesto("123", null, ts) === `id:123;ts:${ts};`,
  manifiesto("123", null, ts),
);

const firmaOk = firmar(manifiesto("123", reqId, ts), SECRET);
check("firma válida se acepta", firmaValida(firmaOk, firmaOk));
check(
  "firma de OTRO pago se rechaza (no se puede reusar una notificación real)",
  !firmaValida(firmar(manifiesto("999", reqId, ts), SECRET), firmaOk),
);
check(
  "firma con otro secret se rechaza",
  !firmaValida(firmar(manifiesto("123", reqId, ts), "otro-secreto"), firmaOk),
);
check("firma de largo distinto se rechaza sin explotar", !firmaValida(firmaOk, "corta"));
check("hmac es hex de 64 chars", /^[0-9a-f]{64}$/.test(firmaOk), firmaOk);

// ── 4. Marca de dedupe (la idempotencia se apoya en este formato) ─────────────────────
check("marcaPago: formato estable", marcaPago("123456789") === "[mp:123456789]");
// El corchete de cierre es lo que hace segura la búsqueda por substring: sin él, el pago
// 1234 se leería como "ya registrado" porque su nota contiene la marca del 123.
check(
  "la marca de un pago NO está contenida en la de otro más largo",
  !marcaPago("1234").includes(marcaPago("123")),
);
// El dedupe consulta con note=ilike.*[mp:N]*, así que la marca no puede traer caracteres que
// rompan el filtro de PostgREST (coma, paréntesis) ni comodines de LIKE (% _).
check("marca sin caracteres que rompan el filtro PostgREST", !/[,()%_]/.test(marcaPago("123456789")));

// -- 5. Catalogo multi-producto: que se compro --------------------------------------
// A partir del 4/9/2026 hay mas de un producto al mismo precio. Si el webhook o la descarga
// confunden cual se pago, el comprador de UOCRA recibe la planilla de Comercio.
const COMERCIO = PRODUCTOS["planilla-comercio"];
const UOCRA = PRODUCTOS["planilla-uocra"];

const pago = (extra: Partial<MpPayment> = {}): MpPayment => ({
  status: "approved",
  transaction_amount: 14900,
  currency_id: "ARS",
  ...extra,
});

check("referenciaExterna trae el slug adelante", referenciaExterna("planilla-uocra").startsWith("planilla-uocra:"));
check(
  "referenciaExterna no repite el uuid entre llamadas",
  referenciaExterna("planilla-uocra") !== referenciaExterna("planilla-uocra"),
);

check(
  "external_reference resuelve UOCRA",
  productoDePago(pago({ external_reference: "planilla-uocra:2c1f" }))?.slug === "planilla-uocra",
);
check(
  "external_reference resuelve Comercio",
  productoDePago(pago({ external_reference: "planilla-comercio:9ab0" }))?.slug === "planilla-comercio",
);
check(
  "metadata.producto con el slug LEGADO sigue resolviendo (la compra del 8/8/2026)",
  productoDePago(
    pago({ external_reference: "e2f3-uuid-suelto", metadata: { producto: "planilla-comercio-2026" } }),
  )?.slug === "planilla-comercio",
);
check(
  "pago viejo sin marca alguna cae en Comercio, nunca en un producto nuevo",
  productoDePago(pago({ external_reference: "e2f3-uuid-suelto" }))?.slug === "planilla-comercio",
);
check(
  "un external_reference trucho NO habilita el producto nuevo",
  productoDePago(pago({ external_reference: "planilla-uocra-trucha:1" }))?.slug === "planilla-comercio",
);
check("productoPorSlug con slug inexistente da null", productoPorSlug("planilla-camioneros") === null);
check("productoPorSlug con vacio da null", productoPorSlug("") === null && productoPorSlug(null) === null);

// -- 6. El gate de descarga no deja cruzar productos --------------------------------
const pagoUocra = pago({ external_reference: "planilla-uocra:abc" });
const pagoComercio = pago({ external_reference: "planilla-comercio:abc" });

check("un pago de UOCRA habilita la planilla de UOCRA", habilitaDescarga(pagoUocra, UOCRA));
check(
  "un pago de UOCRA NO habilita la planilla de Comercio (mismo precio, distinto producto)",
  !habilitaDescarga(pagoUocra, COMERCIO),
);
check("un pago de Comercio NO habilita la de UOCRA", !habilitaDescarga(pagoComercio, UOCRA));
check(
  "pago aprobado por un monto menor no habilita nada",
  !habilitaDescarga(pago({ external_reference: "planilla-uocra:abc", transaction_amount: 1 }), UOCRA),
);
check(
  "pago pendiente no habilita",
  !habilitaDescarga(pago({ external_reference: "planilla-uocra:abc", status: "pending" }), UOCRA),
);
check(
  "pago en otra moneda no habilita",
  !habilitaDescarga(pago({ external_reference: "planilla-uocra:abc", currency_id: "USD" }), UOCRA),
);
check("pagoAprobado con campos vacios es false", !pagoAprobado({}, UOCRA));

// -- 7. Idempotencia REAL: la misma notificacion dos veces = una sola venta ----------
// Se corre contra un Supabase falso en memoria. MP reintenta hasta recibir 2xx y ademas manda
// payment.created y payment.updated del mismo pago: sin este gate el dashboard infla los
// ingresos y el comprador recibe el mail de entrega tres veces.
async function pruebaIdempotencia() {
  const insertados: { id: number; note: string }[] = [];
  const fetchFalso: Http = async (url, init) => {
    if ((init?.method ?? "GET") === "GET") {
      const m = decodeURIComponent(url).match(/\[mp:(\d+)\]/);
      const marca = m ? `[mp:${m[1]}]` : "";
      const hay = insertados.filter((f) => f.note.includes(marca));
      return new Response(JSON.stringify(hay.map((f) => ({ id: f.id }))), { status: 200 });
    }
    const fila = {
      id: insertados.length + 1,
      note: String(JSON.parse(String(init?.body ?? "{}")).note ?? ""),
    };
    insertados.push(fila);
    return new Response(JSON.stringify([{ id: fila.id }]), { status: 201 });
  };

  const deps = {
    fetch: fetchFalso,
    supabaseUrl: "https://falso.supabase.co",
    serviceRole: "clave-falsa",
  };
  const venta = {
    paymentId: "123456789",
    monto: 14900,
    moneda: "ARS",
    email: "compradora@example.com",
    productoTitulo: UOCRA.titulo,
    productoSlug: UOCRA.slug,
  };

  const primera = await registrarVenta(deps, venta);
  const segunda = await registrarVenta(deps, venta);
  const tercera = await registrarVenta(deps, venta);

  check("primera notificacion: se registra la venta", primera.duplicado === false);
  check("primera notificacion: devuelve el id de la fila propia", primera.filaId === 1, primera);
  check("segunda notificacion del MISMO pago: duplicado, no inserta", segunda.duplicado === true);
  check("segunda notificacion duplicada: no devuelve filaId", segunda.filaId === undefined, segunda);
  check("tercera notificacion del mismo pago: sigue siendo duplicado", tercera.duplicado === true);
  check("tercera notificacion duplicada: tampoco devuelve filaId", tercera.filaId === undefined, tercera);
  check(`quedo UNA sola fila en revenue_events (hubo ${insertados.length})`, insertados.length === 1);
  check(
    "la entrega se manda una sola vez (una sola respuesta con duplicado=false)",
    [primera, segunda, tercera].filter((r) => !r.duplicado).length === 1,
  );

  const otra = await registrarVenta(deps, { ...venta, paymentId: "987654321" });
  check("un pago distinto SI se registra", otra.duplicado === false && insertados.length === 2);

  const conPrefijo = await registrarVenta(deps, { ...venta, paymentId: "1234567891" });
  check(
    "un payment_id que EMPIEZA igual que otro no se confunde con un duplicado",
    conPrefijo.duplicado === false && insertados.length === 3,
  );

  check("la nota guarda el slug del producto (auditable en el dashboard)", insertados[0].note.includes(UOCRA.slug));
  check("la nota guarda el email del comprador", insertados[0].note.includes("compradora@example.com"));

  // Supabase caido tiene que TIRAR, no devolver "duplicado": si se traga el error, la venta se
  // pierde para siempre porque MP recibe un 200 y no reintenta.
  const fetchRoto: Http = async () => new Response("boom", { status: 500 });
  let tiro = false;
  try {
    await registrarVenta({ ...deps, fetch: fetchRoto }, venta);
  } catch {
    tiro = true;
  }
  check("si Supabase falla, registrarVenta TIRA (para que MP reintente)", tiro);
}


// -- 8. La carrera REAL que ya se cobro una venta ------------------------------------
// El 25/8/2026 la segunda venta del imperio entro DOS VECES en revenue_events (filas id=2 e
// id=3, mismo [mp:175627733834], 1,2 ms de diferencia): MP disparo payment.created y
// payment.updated casi a la vez, los dos SELECT de dedupe corrieron ANTES de que cualquiera de
// los dos INSERT aterrizara, y los dos vieron la tabla vacia. El dedupe "SELECT y despues
// INSERT" no es atomico, asi que la prueba secuencial de arriba lo daba por bueno.
//
// Con la entrega por mail colgada del mismo booleano, esta carrera manda DOS mails al mismo
// comprador ademas de inflar los ingresos del dashboard.
//
// Esta prueba fuerza el interleaving exacto con una barrera: ningun SELECT contesta hasta que
// llegaron los dos.
async function pruebaCarrera() {
  type Fila = { id: number; note: string };
  const tabla: Fila[] = [];
  let proximoId = 1;

  let abrirBarrera: () => void;
  const barrera = new Promise<void>((r) => (abrirBarrera = r));
  let selectsPendientes = 2;

  const fetchFalso: Http = async (url, init) => {
    const metodo = init?.method ?? "GET";
    const marca = (decodeURIComponent(url).match(/\[mp:\d+\]/) ?? [""])[0];

    if (metodo === "GET") {
      // Solo el primer par de SELECT espera: los de la fase de limpieza tienen que contestar.
      if (selectsPendientes > 0) {
        selectsPendientes--;
        if (selectsPendientes === 0) abrirBarrera!();
        await barrera;
      }
      const filas = tabla.filter((f) => f.note.includes(marca)).sort((a, b) => a.id - b.id);
      return new Response(JSON.stringify(filas.map((f) => ({ id: f.id }))), { status: 200 });
    }
    if (metodo === "POST") {
      const fila = { id: proximoId++, note: String(JSON.parse(String(init?.body ?? "{}")).note ?? "") };
      tabla.push(fila);
      return new Response(JSON.stringify([{ id: fila.id }]), { status: 201 });
    }
    if (metodo === "DELETE") {
      const ids = (decodeURIComponent(url).match(/id=in\.\(([^)]*)\)/) ?? ["", ""])[1]
        .split(",")
        .filter(Boolean)
        .map(Number);
      for (const id of ids) {
        const i = tabla.findIndex((f) => f.id === id);
        if (i !== -1) tabla.splice(i, 1);
      }
      return new Response(null, { status: 204 });
    }
    return new Response("", { status: 405 });
  };

  const deps = {
    fetch: fetchFalso,
    supabaseUrl: "https://falso.supabase.co",
    serviceRole: "clave-falsa",
  };
  const venta = {
    paymentId: "175627733834",
    monto: 14900,
    moneda: "ARS",
    email: "compradora@example.com",
    productoTitulo: COMERCIO.titulo,
    productoSlug: COMERCIO.slug,
  };

  // payment.created y payment.updated, en paralelo: la carrera de produccion.
  const [a, b] = await Promise.all([registrarVenta(deps, venta), registrarVenta(deps, venta)]);

  check(
    `dos notificaciones EN PARALELO dejan UNA sola fila (quedaron ${tabla.length})`,
    tabla.length === 1,
    tabla,
  );
  check(
    "solo UNA de las dos manda la entrega por mail",
    [a, b].filter((r) => !r.duplicado).length === 1,
    { a, b },
  );
  const ganador = [a, b].find((r) => !r.duplicado);
  const perdedor = [a, b].find((r) => r.duplicado);
  check("el ganador de la carrera devuelve el id superviviente", ganador?.filaId === tabla[0]?.id, { a, b, tabla });
  check("el perdedor de la carrera no devuelve filaId", perdedor?.filaId === undefined, { a, b });
}

async function pruebaRastroEntrega() {
  const fecha = new Date().toISOString().slice(0, 10);
  const notaOriginal =
    "Venta automatica de Planilla UOCRA [mp:24680] · producto planilla-uocra · comprador compradora@example.com.";
  let note = notaOriginal;
  let patches = 0;

  const fetchFalso: Http = async (_url, init) => {
    const metodo = init?.method ?? "GET";
    if (metodo === "GET") {
      return new Response(JSON.stringify([{ note }]), { status: 200 });
    }
    if (metodo === "PATCH") {
      patches++;
      note = String(JSON.parse(String(init?.body ?? "{}")).note ?? "");
      return new Response(null, { status: 204 });
    }
    return new Response("", { status: 405 });
  };

  const deps = {
    fetch: fetchFalso,
    supabaseUrl: "https://falso.supabase.co",
    serviceRole: "clave-falsa",
  };

  const ok = await marcarEntrega(deps, 7, "ok", "compradora@example.com");
  check("rastro ok: devuelve true", ok === true, ok);
  check("rastro ok: agrega el texto fechado", note.includes(` · Entregado por email el ${fecha}.`), note);
  check("rastro ok: conserva la marca de MercadoPago", note.includes("[mp:24680]"), note);
  check("rastro ok: conserva el email original", note.includes("compradora@example.com"), note);
  check("rastro ok: agrega sin reemplazar la nota anterior", note.startsWith(notaOriginal), note);

  const okRepetido = await marcarEntrega(deps, 7, "ok", "compradora@example.com");
  check("rastro ok repetido: devuelve true", okRepetido === true, okRepetido);
  check("rastro ok repetido: no ejecuta otro PATCH", patches === 1, patches);
  check(
    "rastro ok repetido: deja un solo sufijo",
    note.split("Entregado por email el").length - 1 === 1,
    note,
  );

  note = notaOriginal;
  const fallo = await marcarEntrega(deps, 8, "fallo", "compradora@example.com");
  check("rastro fallo: devuelve true", fallo === true, fallo);
  check(
    "rastro fallo: agrega alerta fechada y email para reenvio",
    note.includes(` · ENTREGA POR EMAIL FALLÓ el ${fecha} — reenviar a mano a compradora@example.com.`),
    note,
  );
  check("rastro fallo: conserva la nota previa completa", note.startsWith(notaOriginal), note);

  note = notaOriginal;
  const sinEmail = await marcarEntrega(deps, 9, "sin-email");
  check("rastro sin-email: devuelve true", sinEmail === true, sinEmail);
  check(
    "rastro sin-email: explica que la unica entrega fue la pagina de gracias",
    note.includes(
      " · MercadoPago no expuso el email del comprador: la única entrega fue el botón de la página de gracias.",
    ),
    note,
  );
  check("rastro sin-email: conserva la marca original", note.includes("[mp:24680]"), note);

  let tiro = false;
  const fetchPatchRoto: Http = async (_url, init) => {
    if ((init?.method ?? "GET") === "GET") {
      return new Response(JSON.stringify([{ note: notaOriginal }]), { status: 200 });
    }
    return new Response("boom", { status: 500 });
  };
  let resultadoRoto: boolean | undefined;
  try {
    resultadoRoto = await marcarEntrega({ ...deps, fetch: fetchPatchRoto }, 10, "ok");
  } catch {
    tiro = true;
  }
  check("PATCH 500: marcarEntrega no tira", tiro === false, tiro);
  check("PATCH 500: marcarEntrega devuelve false", resultadoRoto === false, resultadoRoto);
}

// ── Datos de la calculadora: del formulario a la metadata de MP y de vuelta en el pago ──────────
// `datos` lo manda el navegador: input hostil. Se prueba con un prefill de prueba enchufado en el
// registro, así el check no depende de cómo valide cada producto.
async function pruebaMetadata() {
  type D = { sueldo: number; nombre: string };
  const PRUEBA: Prefill<D> = {
    validar(raw) {
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
      const r = raw as Record<string, unknown>;
      if (typeof r.sueldo !== "number" || !Number.isFinite(r.sueldo) || r.sueldo < 0 || r.sueldo > 1e9) return null;
      if (typeof r.nombre !== "string" || r.nombre.length > 60) return null;
      return { sueldo: r.sueldo, nombre: r.nombre };
    },
  };
  const original = { uocra: PREFILLS["planilla-uocra"], casas: PREFILLS["planilla-casas-particulares"] };
  const fetchReal = globalThis.fetch;
  process.env.MP_ACCESS_TOKEN ??= "APP_USR-token-de-prueba-no-es-el-real";
  try {
    PREFILLS["planilla-uocra"] = PRUEBA as Prefill<unknown>;
    PREFILLS["planilla-casas-particulares"] = {
      validar: () => {
        throw new Error("roto");
      },
    };
    const UOCRA = PRODUCTOS["planilla-uocra"];

    const bueno = JSON.stringify({ sueldo: 850000, nombre: "Ana" });
    check("datos válidos → JSON canónico", datosParaCheckout("planilla-uocra", bueno) === bueno);
    check(
      "campos extra (y __proto__) se descartan: viaja sólo lo que devolvió validar",
      datosParaCheckout("planilla-uocra", '{"sueldo":1,"nombre":"Ana","__proto__":{"admin":true},"extra":"<script>"}') ===
        '{"sueldo":1,"nombre":"Ana"}',
    );
    const hostiles: Array<[string, string, unknown]> = [
      ["JSON roto", "planilla-uocra", "{sueldo:"],
      ["más de 2 KB", "planilla-uocra", JSON.stringify({ sueldo: 1, nombre: "a", relleno: "x".repeat(DATOS_MAX) })],
      ["slug desconocido", "planilla-trucha", bueno],
      ["producto sin prefill (monotributo)", "planilla-monotributo", bueno],
      ["fuera de rango", "planilla-uocra", JSON.stringify({ sueldo: -5, nombre: "Ana" })],
      ["tipo equivocado", "planilla-uocra", JSON.stringify({ sueldo: "850000", nombre: "Ana" })],
      ["un array", "planilla-uocra", "[1,2,3]"],
      ["null", "planilla-uocra", "null"],
      ["vacío", "planilla-uocra", ""],
      ["no es texto (un File del form)", "planilla-uocra", { name: "x" }],
      ["validar que tira", "planilla-casas-particulares", bueno],
    ];
    for (const [nombre, slug, crudo] of hostiles) {
      let r: string | null = "tiró";
      try {
        r = datosParaCheckout(slug, crudo);
      } catch {
        r = "tiró";
      }
      check(`datos hostiles: ${nombre} → null, sin tirar`, r === null, r);
    }

    // Metadata: `datos` como texto y claves de una palabra (MP pasa las del pago a snake_case).
    const meta = metadataPreferencia(UOCRA, bueno);
    check("metadata lleva producto y datos", meta.producto === "planilla-uocra" && meta.datos === bueno, meta);
    check("metadata sin datos queda como siempre", JSON.stringify(metadataPreferencia(UOCRA, null)) === '{"producto":"planilla-uocra"}');
    check("las claves de la metadata no cambian con snake_case", Object.keys(meta).every((k) => /^[a-z]+$/.test(k)));
    const enorme = metadataPreferencia(UOCRA, JSON.stringify({ x: '"'.repeat(DATOS_MAX) }));
    check(
      `metadata que no entra en el tope de MP (${METADATA_MAX}) sale sin datos`,
      !("datos" in enorme) && JSON.stringify(enorme).length <= METADATA_MAX,
    );

    // crearPreferencia: los datos van en el cuerpo; si MP rechaza la preferencia por ellos, se cobra igual sin ellos.
    const cuerpos: Record<string, unknown>[] = [];
    let respuestas: Array<[number, unknown]> = [];
    globalThis.fetch = (async (_u: RequestInfo | URL, init?: RequestInit) => {
      cuerpos.push(JSON.parse(String(init?.body ?? "{}")));
      const [status, body] = respuestas.shift() ?? [201, { id: "p", init_point: "https://mp/ok" }];
      return new Response(JSON.stringify(body), { status });
    }) as typeof fetch;
    const params = {
      producto: UOCRA,
      externalReference: "planilla-uocra:x",
      backUrls: { success: "s", pending: "p", failure: "f" },
      datos: bueno,
    };
    const ok = await crearPreferencia(params);
    check("preferencia con datos: una sola llamada", cuerpos.length === 1 && ok.init_point === "https://mp/ok");
    check("y la metadata enviada trae los datos", (cuerpos[0].metadata as Record<string, string>)?.datos === bueno, cuerpos[0].metadata);

    cuerpos.length = 0;
    respuestas = [[400, { message: "metadata field is invalid" }]];
    const reintento = await crearPreferencia(params);
    check("MP rechaza con datos (400) → reintenta sin datos y cobra igual", cuerpos.length === 2 && reintento.init_point === "https://mp/ok");
    const meta2 = (cuerpos[1]?.metadata ?? {}) as Record<string, string>;
    check("el reintento no lleva datos", !("datos" in meta2) && meta2.producto === "planilla-uocra", meta2);

    cuerpos.length = 0;
    respuestas = [[500, { message: "boom" }]];
    let tiro = false;
    try {
      await crearPreferencia(params);
    } catch {
      tiro = true;
    }
    check("un 500 de MP no se reintenta (el checkout vuelve a la landing con error, como siempre)", tiro && cuerpos.length === 1);

    for (const status of [401, 403, 404, 429]) {
      cuerpos.length = 0;
      respuestas = [[status, { message: "no es por los datos" }]];
      let tiroOtro = false;
      try {
        await crearPreferencia(params);
      } catch {
        tiroOtro = true;
      }
      check(`un ${status} de MP no se reintenta sin datos (no es culpa de los datos)`, tiroOtro && cuerpos.length === 1, cuerpos.length);
    }

    // Ida y vuelta: lo que se guardó en la preferencia vuelve en el pago y se re-valida.
    const pagoCon = (metadata: Record<string, unknown>, ref = "planilla-uocra:abc"): MpPayment => ({
      status: "approved",
      transaction_amount: UOCRA.precio,
      currency_id: "ARS",
      external_reference: ref,
      metadata,
    });
    const vuelta = datosDelPago(pagoCon({ producto: "planilla-uocra", datos: bueno }), UOCRA);
    check("ida y vuelta: los datos del pago son los que se mandaron", JSON.stringify(vuelta) === bueno, vuelta);
    check(
      "datos del pago de OTRO producto no se usan",
      datosDelPago(pagoCon({ producto: "planilla-comercio", datos: bueno }, "planilla-comercio:abc"), UOCRA) === null,
    );
    check("pago sin datos → null", datosDelPago(pagoCon({ producto: "planilla-uocra" }), UOCRA) === null);
    check("datos corruptos en el pago → null", datosDelPago(pagoCon({ producto: "planilla-uocra", datos: "{x" }), UOCRA) === null);
    check(
      "datos de más de 2 KB en el pago → null",
      datosDelPago(pagoCon({ producto: "planilla-uocra", datos: JSON.stringify({ sueldo: 1, nombre: "y".repeat(DATOS_MAX) }) }), UOCRA) === null,
    );
    check(
      "datos que ya no pasan validar → null",
      datosDelPago(pagoCon({ producto: "planilla-uocra", datos: JSON.stringify({ sueldo: 1e12, nombre: "Ana" }) }), UOCRA) === null,
    );
    check(
      "si MP los devolviera parseados, también sirven",
      JSON.stringify(datosDelPago(pagoCon({ producto: "planilla-uocra", datos: { sueldo: 5, nombre: "Bo" } }), UOCRA)) ===
        '{"sueldo":5,"nombre":"Bo"}',
    );
    check(
      "la metadata nunca habilita: un pago pendiente con datos sigue sin habilitar la descarga",
      !habilitaDescarga({ ...pagoCon({ producto: "planilla-uocra", datos: bueno }), status: "pending" }, UOCRA),
    );
  } finally {
    PREFILLS["planilla-uocra"] = original.uocra;
    PREFILLS["planilla-casas-particulares"] = original.casas;
    globalThis.fetch = fetchReal;
  }
}

pruebaMetadata()
  .then(pruebaIdempotencia)
  .then(pruebaCarrera)
  .then(pruebaRastroEntrega)
  .then(() => {
console.log(
  fallas === 0
    ? "\n✅ check_mp_webhook: todo OK"
    : `\n❌ check_mp_webhook: ${fallas} falla(s)`,
);
process.exit(fallas === 0 ? 0 : 1);
});
