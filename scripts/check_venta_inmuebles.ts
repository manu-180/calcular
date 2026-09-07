// Verificación de la página de venta de inmuebles (LIG arts. 26 inc. n), 99 y 100 · Ley 27.430
// art. 86 inc. a) · Ley 27.743 art. 67 · Ley 27.802 art. 192).
// Correr con: npx tsx scripts/check_venta_inmuebles.ts
//
// LOS ANCLAS:
//   1. **Las dos fechas que deciden todo:** el 1/1/2018 de la COMPRA (art. 86 inc. a) de la Ley
//      27.430) y el 1/1/2026 de la VENTA (art. 26 inc. n)). Confundir cuál mira cada norma es el
//      error central que la página corrige, así que las cuatro combinaciones se anclan una por una.
//   2. **La derogación del ITI es del 8/7/2024**, no del 6/3/2026: es de OTRA ley (27.743, art. 67)
//      y de dos años antes. Un inmueble comprado antes de 2018 y vendido después de esa fecha no
//      paga nada, y eso pasó mucho antes de la reforma laboral.
//   3. **El costo se actualiza por IPC oficial**, y la actualización cambia el resultado. Se ancla
//      que el coeficiente sea exactamente IPC(venta)/IPC(compra) de la serie del INDEC embebida, y
//      que el impuesto sin actualizar sea sustancialmente mayor: si alguien "simplifica" la cuenta,
//      esto se pone rojo.
//   4. **La alícuota es 15%** sobre (precio − costo actualizado − gastos), y nunca sobre el precio.
//   5. **Nunca se publica una alícuota del ITI**: su texto está derogado y no se puede leer en la
//      fuente vigente.
//   6. **La página no promete un impuesto cero universal**: una venta anterior a 2026 de un
//      inmueble comprado desde 2018 sigue dando impuesto, y el aviso de la reglamentación pendiente
//      tiene que estar en el resultado exento.
//   7. **Las fuentes son sólo oficiales**, con fecha de consulta, y están las cuatro normas.

import {
  ALICUOTA_CEDULAR,
  DEROGACION_ITI,
  DEROGACION_ITI_MES,
  PRIMER_MES_ADQUISICION_CEDULAR,
  PRIMER_MES_EXENCION,
  VENTA_INMUEBLES_FUENTES,
  VENTA_INMUEBLES_TEXTOS,
} from "../src/data/venta-inmuebles";
import { calcularVentaInmueble } from "../src/lib/venta-inmuebles";
import { indiceDe } from "../src/lib/inflacion";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 0.01) => Math.abs(a - b) <= tol;

const base = { precioVenta: 250_000_000, costoAdquisicion: 4_500_000, gastos: 7_500_000 };

// ── 1. Las cuatro combinaciones de fechas ─────────────────────────────────────────────────────
{
  check("la línea de la compra es enero de 2018", PRIMER_MES_ADQUISICION_CEDULAR === "2018-01");
  check("la línea de la venta exenta es enero de 2026", PRIMER_MES_EXENCION === "2026-01");

  const compraNueva_ventaVieja = calcularVentaInmueble({
    ...base,
    adquisicion: "2019-06",
    venta: "2025-12",
  });
  check(
    "comprado en 2019 y vendido en dic-2025 → cedular",
    compraNueva_ventaVieja?.regimen === "cedular",
    compraNueva_ventaVieja?.regimen,
  );
  check(
    "y ese caso SÍ paga impuesto",
    (compraNueva_ventaVieja?.impuesto ?? 0) > 0,
    compraNueva_ventaVieja?.impuesto,
  );

  const compraNueva_ventaNueva = calcularVentaInmueble({
    ...base,
    adquisicion: "2019-06",
    venta: "2026-01",
  });
  check(
    "comprado en 2019 y vendido en ene-2026 → exento (el primer mes ya cuenta)",
    compraNueva_ventaNueva?.regimen === "exento",
    compraNueva_ventaNueva?.regimen,
  );
  check("y no paga nada", compraNueva_ventaNueva?.impuesto === 0);
  check(
    "pero muestra cuánto habría sido, para dimensionar",
    (compraNueva_ventaNueva?.impuestoSiNoEstuvieraExento ?? 0) > 0,
    compraNueva_ventaNueva?.impuestoSiNoEstuvieraExento,
  );

  const compraVieja_ventaNueva = calcularVentaInmueble({
    ...base,
    adquisicion: "2017-12",
    venta: "2025-06",
  });
  check(
    "comprado en dic-2017 y vendido en 2025 → sin impuesto (nunca entró al cedular, y el ITI está derogado)",
    compraVieja_ventaNueva?.regimen === "sinImpuesto",
    compraVieja_ventaNueva?.regimen,
  );
  check("y no paga nada", compraVieja_ventaNueva?.impuesto === 0);

  const compraVieja_ventaAnterior = calcularVentaInmueble({
    ...base,
    adquisicion: "2017-12",
    venta: "2024-06",
  });
  check(
    "comprado en dic-2017 y vendido en jun-2024 (antes de la derogación) → ITI",
    compraVieja_ventaAnterior?.regimen === "iti",
    compraVieja_ventaAnterior?.regimen,
  );

  // El mes exacto del corte de la compra: dic-2017 y ene-2018 tienen que dar regímenes distintos.
  const dic17 = calcularVentaInmueble({ ...base, adquisicion: "2017-12", venta: "2025-06" });
  const ene18 = calcularVentaInmueble({ ...base, adquisicion: "2018-01", venta: "2025-06" });
  check(
    "el corte de la compra separa dic-2017 de ene-2018",
    dic17?.regimen === "sinImpuesto" && ene18?.regimen === "cedular",
    { dic17: dic17?.regimen, ene18: ene18?.regimen },
  );

  // El mes exacto del corte de la venta: dic-2025 grava, ene-2026 exime.
  const dic25 = calcularVentaInmueble({ ...base, adquisicion: "2019-06", venta: "2025-12" });
  const ene26 = calcularVentaInmueble({ ...base, adquisicion: "2019-06", venta: "2026-01" });
  check(
    "el corte de la venta separa dic-2025 de ene-2026",
    dic25?.regimen === "cedular" && ene26?.regimen === "exento",
    { dic25: dic25?.regimen, ene26: ene26?.regimen },
  );
}

// ── 2. La derogación del ITI es de 2024 y de otra ley ─────────────────────────────────────────
{
  check("el mes de la derogación del ITI es julio de 2024", DEROGACION_ITI_MES === "2024-07");
  check(
    "la fecha en texto dice 8 de julio de 2024",
    DEROGACION_ITI.includes("8 de julio") && DEROGACION_ITI.includes("2024"),
    DEROGACION_ITI,
  );
  check(
    "la nota citada atribuye la derogación al art. 67 de la Ley 27.743",
    VENTA_INMUEBLES_TEXTOS.derogacionIti.includes("artículo 67") &&
      VENTA_INMUEBLES_TEXTOS.derogacionIti.includes("27.743"),
  );
  check(
    "la nota citada abarca los artículos 7° a 18 del Título VII",
    VENTA_INMUEBLES_TEXTOS.derogacionIti.includes("artículos 7° a 18"),
  );
  check(
    "el art. 86 citado exige haber adquirido desde el 1/1/2018",
    VENTA_INMUEBLES_TEXTOS.art86Ley27430.includes("a partir del 1° de enero de 2018"),
  );
  check(
    "y deja expresamente afuera al Título VII de la Ley 23.905 en esos casos",
    VENTA_INMUEBLES_TEXTOS.art86Ley27430.includes(
      "no estarán alcanzadas por el Título VII de la ley 23.905",
    ),
  );
  check(
    "el art. 86 citado resuelve también herencias y donaciones por la fecha del causante",
    VENTA_INMUEBLES_TEXTOS.art86Ley27430.includes("causante o donante"),
  );
}

// ── 3. La actualización por IPC oficial, y que cambia el resultado ────────────────────────────
{
  const r = calcularVentaInmueble({ ...base, adquisicion: "2019-06", venta: "2025-12" });
  const iCompra = indiceDe("2019-06");
  const iVenta = indiceDe("2025-12");
  check("la serie tiene el índice de jun-2019 y el de dic-2025", !!iCompra && !!iVenta, {
    iCompra,
    iVenta,
  });
  check(
    "el coeficiente es exactamente IPC(venta)/IPC(compra)",
    !!r && !!iCompra && !!iVenta && casi(r.coeficiente, iVenta / iCompra, 1e-9),
    { coef: r?.coeficiente, esperado: iCompra && iVenta ? iVenta / iCompra : null },
  );
  check(
    "el costo actualizado es el costo nominal por ese coeficiente",
    !!r && casi(r.costoActualizado, base.costoAdquisicion * r.coeficiente, 0.01),
  );
  check(
    "actualizar el costo baja el impuesto respecto de no actualizarlo",
    !!r &&
      r.impuesto <
        (base.precioVenta - base.costoAdquisicion - base.gastos) * ALICUOTA_CEDULAR,
    r?.impuesto,
  );
  check(
    "el coeficiente de un tramo largo es claramente mayor que 1",
    (r?.coeficiente ?? 0) > 5,
    r?.coeficiente,
  );
  // El texto del art. 99 inc. a) y el del párrafo del IPC tienen que estar publicados: son la
  // prueba de por qué se actualiza y con qué índice.
  check(
    "está citado el art. 99 inc. a) con la palabra «actualizado»",
    VENTA_INMUEBLES_TEXTOS.art99IncA.includes("actualizado"),
  );
  check(
    "está citado el párrafo que fija el IPC para las adquisiciones desde 2018",
    VENTA_INMUEBLES_TEXTOS.actualizacionIpc.includes("índice de precios al consumidor") &&
      VENTA_INMUEBLES_TEXTOS.actualizacionIpc.includes("1° de enero de 2018"),
  );
}

// ── 4. La alícuota y la base ──────────────────────────────────────────────────────────────────
{
  check("la alícuota del cedular es 15%", ALICUOTA_CEDULAR === 0.15);
  check(
    "el art. 99 citado dice QUINCE POR CIENTO y habla de personas humanas y sucesiones indivisas",
    VENTA_INMUEBLES_TEXTOS.art99.includes("QUINCE POR CIENTO") &&
      VENTA_INMUEBLES_TEXTOS.art99.includes("personas humanas y de las sucesiones indivisas"),
  );
  const r = calcularVentaInmueble({ ...base, adquisicion: "2019-06", venta: "2025-12" });
  check(
    "el impuesto es el 15% de la ganancia gravada, no del precio",
    !!r && casi(r.impuesto, r.gananciaGravada * ALICUOTA_CEDULAR, 0.01),
  );
  check(
    "la ganancia gravada es precio − costo actualizado − gastos",
    !!r &&
      casi(
        r.gananciaGravada,
        Math.max(0, base.precioVenta - r.costoActualizado - base.gastos),
        0.01,
      ),
  );
  check(
    "los gastos bajan la ganancia (art. 99, último párrafo)",
    (() => {
      const sin = calcularVentaInmueble({ ...base, gastos: 0, adquisicion: "2019-06", venta: "2025-12" });
      return !!r && !!sin && r.gananciaGravada < sin.gananciaGravada;
    })(),
  );
  check(
    "una venta a pérdida en pesos constantes no genera impuesto negativo",
    (() => {
      const p = calcularVentaInmueble({
        adquisicion: "2019-06",
        venta: "2025-12",
        precioVenta: 1_000_000,
        costoAdquisicion: 4_500_000,
        gastos: 0,
      });
      return p !== null && p.gananciaGravada === 0 && p.impuesto === 0;
    })(),
  );
  check(
    "está citado el art. 100: no se deducen los arts. 29, 30 y 85",
    VENTA_INMUEBLES_TEXTOS.art100.includes("artículos 29, 30 y 85"),
  );
}

// ── 5. Nunca se publica una alícuota del ITI ──────────────────────────────────────────────────
{
  const iti = calcularVentaInmueble({ ...base, adquisicion: "2017-12", venta: "2024-06" });
  check("el caso ITI no calcula ningún impuesto", iti?.impuesto === 0, iti?.impuesto);
  check(
    "y avisa que no se publica su alícuota porque el texto está derogado",
    iti?.avisos.some((a) => a.texto.includes("derogado")) === true,
  );
  const textos = Object.values(VENTA_INMUEBLES_TEXTOS).join(" ");
  check(
    "ningún texto publicado trae un porcentaje del ITI",
    !/1[,.]5\s?%/.test(textos) && !/uno con cinco por ciento/i.test(textos),
    textos.match(/1[,.]5\s?%/g),
  );
}

// ── 6. La página no promete cero universal ────────────────────────────────────────────────────
{
  const exento = calcularVentaInmueble({ ...base, adquisicion: "2019-06", venta: "2026-06" });
  check(
    "el resultado exento avisa que el inciso remite a la reglamentación",
    exento?.avisos.some((a) => a.texto.includes("reglamentación")) === true,
  );
  check(
    "la exención citada dice «a partir del 1° de enero de 2026»",
    VENTA_INMUEBLES_TEXTOS.exencion.includes("a partir del 1° de enero de 2026"),
  );
  check(
    "y remite a las operaciones alcanzadas por el art. 99 (o sea, no alcanza a las empresas)",
    VENTA_INMUEBLES_TEXTOS.exencion.includes("alcanzados por las disposiciones del artículo 99"),
  );
  check(
    "el caso cedular avisa que no entran las deducciones personales",
    calcularVentaInmueble({ ...base, adquisicion: "2019-06", venta: "2025-12" })?.avisos.some((a) =>
      a.texto.includes("artículos 29, 30 y 85"),
    ) === true,
  );
  // Entradas inválidas
  check(
    "una venta anterior a la compra no calcula",
    calcularVentaInmueble({ ...base, adquisicion: "2020-01", venta: "2019-01" }) === null,
  );
  check(
    "un precio de venta cero no calcula",
    calcularVentaInmueble({ ...base, precioVenta: 0, adquisicion: "2019-06", venta: "2025-12" }) ===
      null,
  );
  check(
    "una venta posterior al último IPC publicado avisa que la actualización quedó corta",
    (() => {
      const f = calcularVentaInmueble({ ...base, adquisicion: "2019-06", venta: "2027-01" });
      return f !== null && f.indiceTopeado && f.avisos.some((a) => a.texto.includes("todavía no publicó"));
    })(),
  );
}

// ── 7. Fuentes ────────────────────────────────────────────────────────────────────────────────
{
  const urls = VENTA_INMUEBLES_FUENTES.lista.map((f) => f.url);
  check("está citado el t.o. 2019 de Ganancias (id 332890)", urls.some((u) => u.includes("332890")), urls);
  check("está citada la Ley 27.430 (id 305262)", urls.some((u) => u.includes("305262")), urls);
  check("está citada la Ley 23.905 (id 305)", urls.some((u) => /\/305\/texact/.test(u)), urls);
  check("está citada la Ley 27.802 (id 423680)", urls.some((u) => u.includes("423680")), urls);
  check(
    "ninguna fuente es un blog o una nota de prensa",
    urls.every((u) => u.includes("infoleg.gob.ar") || u.includes("boletinoficial.gob.ar")),
    urls,
  );
  check(
    "la fecha de consulta está declarada",
    /^\d{4}-\d{2}-\d{2}$/.test(VENTA_INMUEBLES_FUENTES.consultadoEl),
    VENTA_INMUEBLES_FUENTES.consultadoEl,
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de venta de inmuebles OK (LIG arts. 26 inc. n, 99 y 100 · Ley 27.430 art. 86 · Ley 27.743 art. 67 · Ley 27.802 art. 192)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
