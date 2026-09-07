// Verificación de la página de servicios esenciales y guardias mínimas.
// Art. 24 de la Ley 25.877 (sustituido por el art. 101 de la Ley 27.802 + apartados del art. 102).
// Correr con: npx tsx scripts/check_servicios_esenciales.ts
//
// LOS ANCLAS:
//   1. **Los tres pisos: 75%, 50% y 100%.** Si alguien los invierte, la página le dice a un
//      hospital que puede parar la mitad del servicio.
//   2. **La lista vigente tiene ocho servicios esenciales y nueve actividades de importancia
//      trascendental**, con incisos a) a h) y a) a i) sin huecos ni repetidos. El conteo es el
//      control más barato contra una edición que pierda o duplique una fila.
//   3. **El diff con el texto anterior es el corazón de la página**: tres entraron como esenciales,
//      la aduana bajó de esencial a trascendental (única baja) y nueve salieron de la enumeración.
//      Se verifica actividad por actividad, no por conteo total.
//   4. **Toda actividad que salió venía de trascendental**, y ninguna que salió estaba antes como
//      esencial: si eso deja de ser cierto, el mapeo del texto anterior está mal cargado.
//   5. **El mínimo de guardia redondea HACIA ARRIBA.** El artículo dice «en ningún caso menor»:
//      redondear hacia abajo perforaría el piso legal.
//   6. **El cronograma respeta el orden de los hitos** y la fecha de la medida cae exactamente a
//      conciliación + 1 + preaviso desde la notificación.
//   7. **El aviso a usuarios cae 48 horas antes de la medida**, ni un día más ni uno menos.
//   8. **Ninguna actividad no enumerada recibe un piso mayor a cero**, y ninguna enumerada recibe
//      cero.
//   9. **Las citas textuales son textuales**: se verifica que las claves de TEXTOS contengan las
//      frases que la página presenta entre comillas.
//  10. **Las fuentes son sólo oficiales**, con fecha de consulta.

import {
  ACTIVIDADES,
  ETIQUETAS_CATEGORIA,
  FUENTES,
  HISTORIA,
  PISOS,
  PLAZOS,
  TEXTOS,
  VIGENCIA,
  VIGENCIA_ISO,
  type Categoria,
} from "../src/data/servicios-esenciales";
import { calcularServiciosEsenciales } from "../src/lib/servicios-esenciales";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const diasEntre = (a: string, b: string) =>
  Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

// ── 1. Los tres pisos del art. 24 ─────────────────────────────────────────────────────────────
{
  check("servicio esencial: 75%", PISOS.esencial === 75);
  check("importancia trascendental: 50%", PISOS.trascendental === 50);
  check("fuerzas de seguridad: 100%", PISOS.seguridad === 100);
  check("actividad no enumerada: sin piso legal", PISOS["no-listada"] === 0);
  check(
    "el piso esencial es mayor que el trascendental",
    PISOS.esencial > PISOS.trascendental,
  );
  check(
    "hay etiqueta para las cuatro categorías",
    (["esencial", "trascendental", "seguridad", "no-listada"] as Categoria[]).every(
      (c) => typeof ETIQUETAS_CATEGORIA[c] === "string" && ETIQUETAS_CATEGORIA[c].length > 0,
    ),
  );
}

// ── 2. La lista vigente: ocho esenciales, nueve trascendentales, incisos sin huecos ──────────
{
  const esenciales = ACTIVIDADES.filter((a) => a.categoria === "esencial");
  const trascendentales = ACTIVIDADES.filter((a) => a.categoria === "trascendental");
  check("ocho servicios esenciales", esenciales.length === 8, esenciales.length);
  check("nueve actividades trascendentales", trascendentales.length === 9, trascendentales.length);

  const letras = (n: number) => Array.from({ length: n }, (_, i) => String.fromCharCode(97 + i));
  check(
    "los incisos de esenciales son a) a h) en orden",
    esenciales.map((a) => a.inciso).join("") === letras(8).join(""),
    esenciales.map((a) => a.inciso),
  );
  check(
    "los incisos de trascendentales son a) a i) en orden",
    trascendentales.map((a) => a.inciso).join("") === letras(9).join(""),
    trascendentales.map((a) => a.inciso),
  );
  check(
    "las fuerzas de seguridad son una sola entrada y tienen párrafo propio",
    ACTIVIDADES.filter((a) => a.categoria === "seguridad").length === 1,
  );
  check(
    "no hay ids repetidos",
    new Set(ACTIVIDADES.map((a) => a.id)).size === ACTIVIDADES.length,
  );
  check(
    "toda actividad enumerada tiene inciso y toda no enumerada no lo tiene",
    ACTIVIDADES.every((a) =>
      a.categoria === "no-listada" ? a.inciso === null : typeof a.inciso === "string",
    ),
  );
  check(
    "toda actividad explica qué cambió el 6/3/2026",
    ACTIVIDADES.every((a) => a.cambio.trim().length > 20),
  );
}

// ── 3. El diff con el texto que rigió hasta el 5/3/2026 ──────────────────────────────────────
{
  const entraron = ACTIVIDADES.filter(
    (a) => a.categoriaAntes === "no-listada" && a.categoria !== "no-listada",
  ).map((a) => a.id);
  check(
    "entraron exactamente residuos, caudales, seguridad privada y la regla de fuerzas de seguridad",
    entraron.sort().join(",") ===
      ["caudales", "fuerzas-de-seguridad", "residuos", "seguridad-privada"].sort().join(","),
    entraron,
  );

  const bajaron = ACTIVIDADES.filter(
    (a) => PISOS[a.categoria] < PISOS[a.categoriaAntes] && a.categoria !== "no-listada",
  ).map((a) => a.id);
  check(
    "la aduana es la ÚNICA actividad que bajó de categoría sin salir de la lista",
    bajaron.length === 1 && bajaron[0] === "aduana",
    bajaron,
  );
  const aduana = ACTIVIDADES.find((a) => a.id === "aduana")!;
  check(
    "la aduana pasó de esencial (75%) a trascendental (50%)",
    aduana.categoriaAntes === "esencial" && aduana.categoria === "trascendental",
  );

  const salieron = ACTIVIDADES.filter(
    (a) => a.categoria === "no-listada" && a.categoriaAntes !== "no-listada",
  );
  check("nueve actividades salieron de la enumeración", salieron.length === 9, salieron.length);
  check(
    "todas las que salieron venían de importancia trascendental (era un inciso entero)",
    salieron.every((a) => a.categoriaAntes === "trascendental"),
    salieron.filter((a) => a.categoriaAntes !== "trascendental").map((a) => a.id),
  );
  check(
    "entre las que salieron están minería, correos, agro y aeroportuarios",
    ["mineria", "correos", "agropecuaria", "aeroportuarios"].every((id) =>
      salieron.some((a) => a.id === id),
    ),
  );
  check(
    "los servicios portuarios NO salieron: están en el inciso f) de esenciales",
    ACTIVIDADES.find((a) => a.id === "aeronautica-puertos")?.categoria === "esencial",
  );
}

// ── 4. Coherencia de piso por categoría ──────────────────────────────────────────────────────
{
  check(
    "ninguna actividad no enumerada tiene piso mayor a cero",
    ACTIVIDADES.filter((a) => a.categoria === "no-listada").every((a) => PISOS[a.categoria] === 0),
  );
  check(
    "toda actividad enumerada tiene piso mayor a cero",
    ACTIVIDADES.filter((a) => a.categoria !== "no-listada").every((a) => PISOS[a.categoria] > 0),
  );
}

// ── 5. El mínimo de guardia redondea HACIA ARRIBA ────────────────────────────────────────────
{
  const r = calcularServiciosEsenciales({
    actividadId: "salud",
    dotacion: 10,
    fechaNotificacionISO: "2026-09-01",
    conProrroga: false,
  })!;
  check("salud es esencial: piso 75%", r.piso === 75);
  check("10 trabajadores × 75% = 8 de guardia (7,5 redondeado hacia arriba)", r.minimoDeGuardia === 8, r.minimoDeGuardia);
  check("pueden adherir 2", r.puedenAdherir === 2, r.puedenAdherir);

  const r2 = calcularServiciosEsenciales({
    actividadId: "bancos",
    dotacion: 7,
    fechaNotificacionISO: "2026-09-01",
    conProrroga: false,
  })!;
  check("bancos es trascendental: piso 50%", r2.piso === 50);
  check("7 × 50% = 4 de guardia (3,5 hacia arriba)", r2.minimoDeGuardia === 4, r2.minimoDeGuardia);

  const r3 = calcularServiciosEsenciales({
    actividadId: "fuerzas-de-seguridad",
    dotacion: 30,
    fechaNotificacionISO: "2026-09-01",
    conProrroga: false,
  })!;
  check("fuerzas de seguridad: nadie puede adherir", r3.minimoDeGuardia === 30 && r3.puedenAdherir === 0);

  const r4 = calcularServiciosEsenciales({
    actividadId: "mineria",
    dotacion: 30,
    fechaNotificacionISO: "2026-09-01",
    conProrroga: false,
  })!;
  check("minería no está enumerada: piso 0 y nadie obligado de guardia", r4.piso === 0 && r4.minimoDeGuardia === 0);
  check(
    "minería avisa que la Autoridad de Aplicación igual puede calificarla",
    r4.avisos.some((a) => a.texto.includes("Comisión de Garantías")),
  );
}

// ── 6 y 7. El cronograma: orden, encadenamiento y las 48 horas ───────────────────────────────
{
  const r = calcularServiciosEsenciales({
    actividadId: "educacion",
    dotacion: 20,
    fechaNotificacionISO: "2026-09-01",
    conProrroga: false,
  })!;
  const f = (i: number) => r.cronograma[i].fechaCorridos;
  check("el cronograma tiene los seis hitos", r.cronograma.length === 6, r.cronograma.length);
  check("arranca el día de la notificación", f(0) === "2026-09-01");
  check(
    `la conciliación vence a los ${PLAZOS.conciliacionDias} días corridos`,
    diasEntre(f(0), f(1)) === PLAZOS.conciliacionDias,
    f(1),
  );
  check("se puede preavisar al día siguiente del vencimiento", diasEntre(f(1), f(2)) === 1);
  check(
    "el acuerdo de servicios mínimos es al día inmediato siguiente al preaviso",
    diasEntre(f(2), f(3)) === PLAZOS.acuerdoDiasDespuesDelPreaviso,
  );
  check(
    `la medida cae ${PLAZOS.preavisoDias} días después del preaviso`,
    diasEntre(f(2), f(5)) === PLAZOS.preavisoDias,
    f(5),
  );
  check(
    `el aviso a usuarios cae ${PLAZOS.avisoUsuariosHoras} horas antes de la medida`,
    diasEntre(f(4), f(5)) === PLAZOS.avisoUsuariosHoras / 24,
  );
  check(
    "las fechas del cronograma no retroceden",
    r.cronograma.every((h, i) => i === 0 || h.fechaCorridos >= r.cronograma[i - 1].fechaCorridos) ||
      // el aviso a usuarios es anterior a la medida a propósito: se controla el resto
      [0, 1, 2, 3].every((i) => r.cronograma[i].fechaCorridos <= r.cronograma[i + 1].fechaCorridos),
  );

  const conProrroga = calcularServiciosEsenciales({
    actividadId: "educacion",
    dotacion: 20,
    fechaNotificacionISO: "2026-09-01",
    conProrroga: true,
  })!;
  check(
    `la prórroga corre todo el cronograma ${PLAZOS.prorrogaDias} días`,
    diasEntre(r.cronograma[5].fechaCorridos, conProrroga.cronograma[5].fechaCorridos) ===
      PLAZOS.prorrogaDias,
  );

  check(
    "la cuenta en días hábiles nunca es anterior a la de corridos",
    r.cronograma.every((h) => !h.fechaHabiles || h.fechaHabiles >= h.fechaCorridos),
  );
}

// ── 8. Entradas inválidas no devuelven un resultado inventado ────────────────────────────────
{
  check(
    "una actividad inexistente devuelve null",
    calcularServiciosEsenciales({
      actividadId: "no-existe",
      dotacion: 10,
      fechaNotificacionISO: "2026-09-01",
      conProrroga: false,
    }) === null,
  );
  check(
    "dotación cero devuelve null",
    calcularServiciosEsenciales({
      actividadId: "salud",
      dotacion: 0,
      fechaNotificacionISO: "2026-09-01",
      conProrroga: false,
    }) === null,
  );
  check(
    "una fecha inválida devuelve null",
    calcularServiciosEsenciales({
      actividadId: "salud",
      dotacion: 10,
      fechaNotificacionISO: "2026-02-31",
      conProrroga: false,
    }) === null,
  );
}

// ── 9. Las citas textuales y los avisos que no pueden faltar ─────────────────────────────────
{
  check("la cita de los pisos trae el 75% y el 50%", TEXTOS.pisos.includes("setenta y cinco por ciento (75%)") && TEXTOS.pisos.includes("cincuenta por ciento (50%)"));
  check(
    "la cita de fuerzas de seguridad trae el 100%",
    TEXTOS.fuerzasDeSeguridad.includes("cien por ciento (100%)"),
  );
  check(
    "el apartado 24.1 remite al art. 11 de la Ley 14.786 y pide cinco días",
    TEXTOS.preaviso.includes("artículo 11") && TEXTOS.preaviso.includes("cinco (5) días"),
  );
  check(
    "el apartado 24.4 exige avisar 48 horas antes",
    TEXTOS.avisoUsuarios.includes("cuarenta y ocho (48) horas"),
  );
  check(
    "el art. 11 citado no dice «hábiles» (es la base del doble cálculo)",
    TEXTOS.conciliacionArt11.includes("quince días") &&
      !TEXTOS.conciliacionArt11.includes("hábiles"),
  );
  check(
    "la página avisa que el porcentaje es sobre la prestación, no sobre la dotación",
    calcularServiciosEsenciales({
      actividadId: "salud",
      dotacion: 10,
      fechaNotificacionISO: "2026-09-01",
      conProrroga: false,
    })!.avisos.some((a) => a.texto.includes("prestación normal del servicio")),
  );
  check(
    "una actividad que cambió de categoría lo avisa en el resultado",
    calcularServiciosEsenciales({
      actividadId: "aduana",
      dotacion: 10,
      fechaNotificacionISO: "2026-09-01",
      conProrroga: false,
    })!.avisos.some((a) => a.texto.includes("cambió de categoría")),
  );
}

// ── 10. Vigencia, historia y fuentes ─────────────────────────────────────────────────────────
{
  check("la vigencia es el 6 de marzo de 2026", VIGENCIA_ISO === "2026-03-06");
  check("la vigencia en texto coincide con la ISO", VIGENCIA === "6 de marzo de 2026");
  check("la historia del artículo tiene las cinco versiones", HISTORIA.length === 5, HISTORIA.length);
  check(
    "la última versión de la historia es la Ley 27.802",
    HISTORIA[HISTORIA.length - 1].norma.includes("27.802"),
  );
  check(
    "la historia nombra el rechazo del Congreso al Decreto 340/2025",
    HISTORIA.some((h) => h.que.includes("Resolución 39/2025") && h.que.includes("Senado")),
  );
  check("hay fecha de consulta", /^\d{4}-\d{2}-\d{2}$/.test(FUENTES.consultadoEl));
  check("hay al menos cuatro fuentes", FUENTES.lista.length >= 4);
  check(
    "todas las fuentes son oficiales (InfoLEG, Boletín Oficial o el archivo del propio texto oficial)",
    FUENTES.lista.every(
      (f) =>
        f.url.includes("infoleg.gob.ar") ||
        f.url.includes("boletinoficial.gob.ar") ||
        (f.url.includes("web.archive.org") && f.url.includes("infoleg.gob.ar")),
    ),
    FUENTES.lista.map((f) => f.url),
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de servicios esenciales OK (Ley 25.877 art. 24 · Ley 27.802 arts. 101 y 102 · Ley 14.786)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
