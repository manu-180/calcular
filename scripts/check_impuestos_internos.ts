// Verificación de la página de impuestos internos (art. 195 de la Ley 27.802 + Ley 24.674).
// Correr con: npx tsx scripts/check_impuestos_internos.ts
//
// LOS ANCLAS:
//   1. **La fecha de la eliminación es el 1/4/2026, no el 6/3/2026.** El art. 195 dice «a partir del
//      primer día del mes inmediato siguiente al de la entrada en vigencia», y la ley entra en
//      vigencia con su publicación (art. 217). Confundir las dos fechas es el error que la página
//      existe para corregir: se ancla que la fecha publicada NO sea la del B.O.
//   2. **La tasa efectiva es t/(1−t) y siempre es mayor que la nominal.** Los tres casos testigo:
//      20% → 25%, 35% → 53,85%, 5% → 5,2632%. Si alguien "simplifica" la fórmula a la nominal, esto
//      se pone rojo.
//   3. **El impuesto contenido + el precio limpio = el importe.** La aritmética tiene que cerrar
//      exactamente, o el número publicado es inconsistente consigo mismo.
//   4. **Las alícuotas son las del texto oficial**, una por una y con su artículo: 1‰ y 2,5% del
//      art. 27, 23% del asegurador del exterior, 5% del art. 30, 20% del art. 35, y la escala del
//      art. 39 (35/20 autos, 30 motos, 20 embarcaciones y aeronaves) más las reducidas del
//      Decreto 50/2025 (18 y 15).
//   5. **Suntuarios es el ÚNICO rubro de todas las etapas.** El art. 2° exceptúa exclusivamente al
//      Capítulo VIII: si mañana alguien marca otro, la página estaría contradiciendo al art. 2°.
//   6. **Aeronaves NO está entre los suspendidos por el Decreto 50/2025** y NO tiene monto exento.
//      Es el hallazgo de la página: el decreto enumera a) a e) y el art. 39 dice «sin aplicarse
//      monto exento para el inciso f)».
//   7. **No se publica ningún monto exento vigente.** Los importes del art. 39 son los de 2019 y se
//      actualizan por IPIM: el resultado no tiene ningún campo con un piso "vigente".
//   8. **Las fuentes son sólo oficiales**, con fecha de consulta.

import {
  BO_LEY_27802,
  IMPUESTOS_INTERNOS_FUENTES,
  IMPUESTOS_INTERNOS_TEXTOS,
  MESES_ACTUALIZACION_MONTOS,
  MONTOS_EXENTOS_2019,
  RUBROS,
  VIGENCIA_ELIMINACION,
  VIGENCIA_ELIMINACION_ISO,
} from "../src/data/impuestos-internos";
import { calcularImpuestoInterno } from "../src/lib/impuestos-internos";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) <= tol;

const porId = (id: string) => RUBROS.find((r) => r.id === id);

// ── 1. La fecha: el mes siguiente, no el de la ley ────────────────────────────────────────────
{
  check("la eliminación rige desde el 1/4/2026", VIGENCIA_ELIMINACION_ISO === "2026-04-01");
  check(
    "la fecha publicada en texto coincide con el ISO",
    VIGENCIA_ELIMINACION.includes("abril") && VIGENCIA_ELIMINACION.includes("2026"),
    VIGENCIA_ELIMINACION,
  );
  check(
    "la fecha de la eliminación NO es la del B.O. de la ley",
    !VIGENCIA_ELIMINACION_ISO.startsWith("2026-03"),
    { VIGENCIA_ELIMINACION_ISO, BO_LEY_27802 },
  );
  check("el B.O. de la Ley 27.802 es el 6 de marzo de 2026", BO_LEY_27802.includes("6 de marzo"));
  check(
    "el art. 195 citado dice «primer día del mes inmediato siguiente»",
    IMPUESTOS_INTERNOS_TEXTOS.art195.includes("primer día del mes inmediato siguiente"),
  );
  check(
    "el art. 195 citado nombra los cinco rubros",
    ["seguros", "telefonía celular", "objetos suntuarios", "embarcaciones", "aeronaves"].every((r) =>
      IMPUESTOS_INTERNOS_TEXTOS.art195.includes(r),
    ),
  );
  check(
    "el art. 217 explica por qué la ley rige desde la publicación",
    IMPUESTOS_INTERNOS_TEXTOS.art217.includes("a partir de su publicación"),
  );
}

// ── 2. La tasa efectiva: t/(1−t), y los tres casos testigo ────────────────────────────────────
{
  const casos: [number, number][] = [
    [0.2, 0.25],
    [0.35, 0.538461538],
    [0.05, 0.052631578],
    [0.025, 0.025641025],
    [0.001, 0.001001001],
  ];
  for (const [nominal, esperada] of casos) {
    const r = RUBROS.find((x) => x.alicuota === nominal);
    if (!r) {
      fallas++;
      console.error(`FAIL no hay ningún rubro con alícuota ${nominal}`);
      continue;
    }
    const res = calcularImpuestoInterno({ rubroId: r.id, importe: 1_000_000 });
    check(
      `tasa efectiva de ${nominal * 100}% = ${(esperada * 100).toFixed(4)}%`,
      res !== null && casi(res.tasaEfectiva, esperada, 1e-6),
      res?.tasaEfectiva,
    );
  }
  check(
    "la tasa efectiva es SIEMPRE mayor que la nominal",
    RUBROS.every((r) => r.alicuota / (1 - r.alicuota) > r.alicuota),
  );
}

// ── 3. La aritmética cierra: impuesto + precio limpio = importe ───────────────────────────────
{
  for (const r of RUBROS) {
    const importe = 1_234_567;
    const res = calcularImpuestoInterno({ rubroId: r.id, importe });
    check(
      `${r.id}: impuesto + precio sin impuesto = importe`,
      res !== null && casi(res.impuestoContenido + res.importeSinImpuesto, importe, 1e-6),
      res && { c: res.impuestoContenido, s: res.importeSinImpuesto },
    );
    check(
      `${r.id}: el impuesto contenido es importe × alícuota`,
      res !== null && casi(res.impuestoContenido, importe * r.alicuota, 1e-6),
      res?.impuestoContenido,
    );
    // El precio limpio, acrecentado por la tasa efectiva, tiene que devolver el importe original.
    // Es el control cruzado de la fórmula: si t/(1−t) estuviera mal, esto no cerraría.
    check(
      `${r.id}: precio limpio × (1 + tasa efectiva) = importe`,
      res !== null && casi(res.importeSinImpuesto * (1 + res.tasaEfectiva), importe, 1e-6),
      res && res.importeSinImpuesto * (1 + res.tasaEfectiva),
    );
  }
  check("importe cero no calcula", calcularImpuestoInterno({ rubroId: "celular", importe: 0 }) === null);
  check(
    "un rubro inexistente no calcula",
    calcularImpuestoInterno({ rubroId: "tabaco", importe: 100 }) === null,
  );
}

// ── 4. Las alícuotas del texto oficial, una por una ───────────────────────────────────────────
{
  const esperadas: [string, number, string][] = [
    ["art", 0.025, "art. 27"],
    ["seguros", 0.001, "art. 27"],
    ["seguros_exterior", 0.23, "art. 27"],
    ["celular", 0.05, "art. 30"],
    ["suntuarios", 0.2, "art. 35"],
    ["autos_35", 0.35, "art. 39"],
    ["autos_18", 0.18, "art. 39"],
    ["autos_20", 0.2, "art. 39"],
    ["motos_30", 0.3, "art. 39"],
    ["motos_15", 0.15, "art. 39"],
    ["embarcaciones", 0.2, "art. 39"],
    ["aeronaves", 0.2, "art. 39"],
  ];
  for (const [id, alicuota, articulo] of esperadas) {
    const r = porId(id);
    check(`${id}: alícuota ${alicuota}`, r?.alicuota === alicuota, r?.alicuota);
    check(`${id}: cita ${articulo}`, !!r && r.articulo.includes(articulo), r?.articulo);
  }
  check("hay exactamente 12 rubros publicados", RUBROS.length === esperadas.length, RUBROS.length);
  check(
    "no hay ids repetidos",
    new Set(RUBROS.map((r) => r.id)).size === RUBROS.length,
    RUBROS.map((r) => r.id),
  );
  check(
    "toda alícuota está entre 0 y 1 (la fórmula efectiva se rompe con t ≥ 1)",
    RUBROS.every((r) => r.alicuota > 0 && r.alicuota < 1),
  );
  check(
    "el 2,5% de ART es veinticinco veces el 1‰ general",
    casi((porId("art")?.alicuota ?? 0) / (porId("seguros")?.alicuota ?? 1), 25, 1e-9),
  );
  check(
    "el art. 27 citado trae las dos alícuotas del seguro contratado en el país",
    IMPUESTOS_INTERNOS_TEXTOS.art27.includes("uno por mil") &&
      IMPUESTOS_INTERNOS_TEXTOS.art27.includes("dos con cinco por ciento"),
  );
  check(
    "el art. 30 citado dice 5% sobre el importe facturado al usuario",
    IMPUESTOS_INTERNOS_TEXTOS.art30.includes("cinco por ciento") &&
      IMPUESTOS_INTERNOS_TEXTOS.art30.includes("importe facturado"),
  );
  check(
    "el art. 31 citado incluye las tarjetas prepagas y recargables",
    IMPUESTOS_INTERNOS_TEXTOS.art31.includes("prepagas"),
  );
}

// ── 5. Suntuarios es el único de todas las etapas (art. 2°) ───────────────────────────────────
{
  const todasLasEtapas = RUBROS.filter((r) => r.todasLasEtapas).map((r) => r.id);
  check("un solo rubro se grava en todas las etapas", todasLasEtapas.length === 1, todasLasEtapas);
  check("y es objetos suntuarios", todasLasEtapas[0] === "suntuarios", todasLasEtapas);
  check(
    "el art. 2° citado exceptúa exactamente al Capítulo VIII",
    IMPUESTOS_INTERNOS_TEXTOS.art2.includes("una sola de las etapas") &&
      IMPUESTOS_INTERNOS_TEXTOS.art2.includes("Capítulo VIII"),
  );
  check(
    "el art. 35 citado dice «en cada una de las etapas de su comercialización»",
    IMPUESTOS_INTERNOS_TEXTOS.art35.includes("en cada una de las etapas de su comercialización"),
  );
  check(
    "el art. 37 (pago a cuenta) está citado: sin él, la página sugeriría una cascada que la ley no manda",
    IMPUESTOS_INTERNOS_TEXTOS.art37.includes("pago a cuenta"),
  );
  check(
    "la calculadora avisa del arrastre cuando el rubro es de todas las etapas",
    calcularImpuestoInterno({ rubroId: "suntuarios", importe: 100_000 })?.avisos.some((a) =>
      a.texto.includes("cada etapa"),
    ) === true,
  );
  check(
    "los anillos de alianza matrimonial figuran entre las exenciones del art. 36",
    IMPUESTOS_INTERNOS_TEXTOS.art36Exenciones.includes("anillos de alianza matrimonial"),
  );
}

// ── 6. Aeronaves: fuera del Decreto 50/2025 y sin monto exento ────────────────────────────────
{
  const aero = porId("aeronaves");
  check("aeronaves no figura como suspendida por decreto", aero?.yaSuspendidoPorDecreto === false);
  check("aeronaves no tiene monto exento", aero?.tieneMontoExento === false);
  check(
    "el Decreto 50/2025 citado enumera los incisos a) a e)",
    IMPUESTOS_INTERNOS_TEXTOS.decreto50.includes("incisos a), b), c), d) y e)"),
  );
  check(
    "el Decreto 50/2025 citado NO nombra al inciso f)",
    !/inciso f\)/i.test(IMPUESTOS_INTERNOS_TEXTOS.decreto50),
    IMPUESTOS_INTERNOS_TEXTOS.decreto50,
  );
  check(
    "la calculadora destaca el caso de las aeronaves",
    calcularImpuestoInterno({ rubroId: "aeronaves", importe: 10_000_000 })?.avisos.some((a) =>
      a.texto.includes("f)"),
    ) === true,
  );
  // Los rubros del Capítulo IX que el decreto sí alcanzó tienen que avisar que el ahorro real no se
  // mide contra la alícuota de la ley. Es la corrección del titular.
  for (const id of ["autos_35", "autos_20", "motos_30", "embarcaciones"]) {
    check(
      `${id}: avisa que el Decreto 50/2025 ya la había dejado sin efecto o reducido`,
      calcularImpuestoInterno({ rubroId: id, importe: 30_000_000 })?.avisos.some((a) =>
        a.texto.includes("Decreto 50/2025"),
      ) === true,
    );
  }
  check(
    "las alícuotas reducidas del decreto (18% y 15%) no se marcan como suspendidas",
    porId("autos_18")?.yaSuspendidoPorDecreto === false &&
      porId("motos_15")?.yaSuspendidoPorDecreto === false,
  );
}

// ── 7. No se publica ningún monto exento vigente ──────────────────────────────────────────────
{
  const res = calcularImpuestoInterno({ rubroId: "autos_18", importe: 50_000_000 });
  check(
    "el resultado no expone ningún piso/monto exento como si fuera vigente",
    res !== null && !Object.keys(res).some((k) => /exento|piso|minimo|mínimo/i.test(k)),
    res && Object.keys(res),
  );
  check(
    "un rubro con monto exento avisa que el valor vigente no está en la ley",
    res?.avisos.some((a) => a.texto.includes("no está en la ley")) === true,
  );
  check(
    "los montos de 2019 quedan como referencia histórica, con los tres valores del art. 39",
    MONTOS_EXENTOS_2019.autosYMotores === 1_300_000 &&
      MONTOS_EXENTOS_2019.motociclos === 390_000 &&
      MONTOS_EXENTOS_2019.embarcaciones === 1_700_000,
    MONTOS_EXENTOS_2019,
  );
  check("la actualización es trimestral", MESES_ACTUALIZACION_MONTOS === 3);
  check(
    "el art. 39 citado dice que la actualización es trimestral y por IPIM",
    IMPUESTOS_INTERNOS_TEXTOS.actualizacionMontos.includes("trimestralmente") &&
      IMPUESTOS_INTERNOS_TEXTOS.actualizacionMontos.includes("IPIM"),
  );
  check(
    "el art. 4° citado es la oración que mete al impuesto en su propia base",
    IMPUESTOS_INTERNOS_TEXTOS.art4.includes(
      "En ningún caso se podrá descontar valor alguno en concepto del impuesto de esta ley",
    ),
  );
  // Ningún resultado puede publicar un "precio final después de la eliminación": eso es un
  // pronóstico comercial, no un efecto legal.
  check(
    "el resultado no publica ningún precio posterior a la eliminación",
    res !== null && !Object.keys(res).some((k) => /precioNuevo|precioFinal|ahorro/i.test(k)),
    res && Object.keys(res),
  );
}

// ── 8. Fuentes ────────────────────────────────────────────────────────────────────────────────
{
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    IMPUESTOS_INTERNOS_FUENTES.lista.some((f) => f.url.includes("423680")),
    IMPUESTOS_INTERNOS_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto actualizado de la Ley 24.674 (id 38621)",
    IMPUESTOS_INTERNOS_FUENTES.lista.some((f) => f.url.includes("38621")),
    IMPUESTOS_INTERNOS_FUENTES.lista.map((f) => f.url),
  );
  check(
    "ninguna fuente es un blog o una nota de prensa",
    IMPUESTOS_INTERNOS_FUENTES.lista.every(
      (f) => f.url.includes("infoleg.gob.ar") || f.url.includes("boletinoficial.gob.ar"),
    ),
    IMPUESTOS_INTERNOS_FUENTES.lista.map((f) => f.url),
  );
  check(
    "la fecha de consulta está declarada",
    /^\d{4}-\d{2}-\d{2}$/.test(IMPUESTOS_INTERNOS_FUENTES.consultadoEl),
    IMPUESTOS_INTERNOS_FUENTES.consultadoEl,
  );
  check(
    "todo rubro tiene etiqueta, artículo y detalle",
    RUBROS.every(
      (r) => r.etiqueta.length > 0 && r.articulo.length > 0 && r.detalle.length > 40,
    ),
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de impuestos internos OK (Ley 27.802 art. 195 · Ley 24.674 arts. 2, 4, 27, 30, 31, 35-37 y 39)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
