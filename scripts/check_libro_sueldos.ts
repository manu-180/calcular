// Verificación de la página del libro de sueldos y la presunción del art. 55 (LCT arts. 52 a 55 y
// 61, reescritos y derogados por la Ley 27.802). Correr con: npx tsx scripts/check_libro_sueldos.ts
//
// LOS ANCLAS:
//   1. **El disparador del art. 55 cambió, y ése es el hallazgo entero.** El texto vigente dice
//      «falta de registración»; el anterior decía «falta de exhibición». Si alguien mezcla los dos,
//      la página estaría diciéndole a un trabajador que tiene una presunción que no tiene (o al
//      revés). Se chequean las dos redacciones palabra por palabra.
//   2. **La celda que la reforma dio vuelta:** registrado + no exhibió. Antes SÍ, hoy NO. Es la
//      razón de ser de la página y el caso que un resumen copiado publica al revés.
//   3. **Las otras tres celdas NO cambian de signo** — si cambiaran, el motor estaría inventando.
//   4. **El art. 54 está derogado y el 55 vigente ya NO lo cita.** El texto anterior sí lo citaba:
//      es la remisión huérfana que sigue viva en los escritos.
//   5. **La fecha decide el régimen:** el 5/3/2026 rige el texto anterior; el 6/3/2026, el nuevo.
//      Un día de corrimiento cambia el resultado de un juicio.
//   6. **Los 10 años de conservación se cuentan sobre la fecha cargada**, y la página declara que
//      el artículo no fija el día inicial.
//   7. **Las citas son las oficiales**, incluidos los ocho incisos y las cuatro prohibiciones del
//      libro que ya no existe.

import {
  ANIOS_CONSERVACION,
  CAMBIOS_DEL_BLOQUE,
  INCISOS_LIBRO_ANTERIOR,
  LIBRO_FUENTES,
  LIBRO_TEXTOS,
  PROHIBICIONES_LIBRO_ANTERIOR,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/libro-sueldos";
import { MATRIZ_CASOS, evaluarPresuncion } from "../src/lib/libro-sueldos";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const POST = "2026-08-31";
const PRE = "2026-03-05";

// ── 1. El disparador del art. 55: las dos redacciones, sin mezclarse ───────────────────────────
{
  check(
    "el texto VIGENTE del art. 55 se dispara por la falta de registración",
    LIBRO_TEXTOS.art55Vigente.includes("Omisión de registración") &&
      LIBRO_TEXTOS.art55Vigente.includes("La falta de registración en los términos del artículo 52"),
    LIBRO_TEXTOS.art55Vigente,
  );
  check(
    "…y NO menciona la exhibición ni las planillas",
    !LIBRO_TEXTOS.art55Vigente.includes("exhibición") &&
      !LIBRO_TEXTOS.art55Vigente.includes("planilla"),
    LIBRO_TEXTOS.art55Vigente,
  );
  check(
    "el texto ANTERIOR se disparaba por la falta de exhibición",
    LIBRO_TEXTOS.art55Anterior.includes("Omisión de su exhibición") &&
      LIBRO_TEXTOS.art55Anterior.includes(
        "La falta de exhibición o requerimiento judicial o administrativo",
      ),
    LIBRO_TEXTOS.art55Anterior,
  );
  check(
    "el texto ANTERIOR remitía a los artículos 52 Y 54 — el vigente, sólo al 52",
    LIBRO_TEXTOS.art55Anterior.includes("previstos por los artículos 52 y 54") &&
      LIBRO_TEXTOS.art55Vigente.includes("del artículo 52") &&
      !LIBRO_TEXTOS.art55Vigente.includes("54"),
    { anterior: LIBRO_TEXTOS.art55Anterior, vigente: LIBRO_TEXTOS.art55Vigente },
  );
  check(
    "el alcance cambió de «tales asientos» a «el pertinente registro»",
    LIBRO_TEXTOS.art55Anterior.includes("las circunstancias que debían constar en tales asientos") &&
      LIBRO_TEXTOS.art55Vigente.includes(
        "las circunstancias que debieron constar en el pertinente registro",
      ),
  );
  check(
    "la nota del art. 55 cita la sustitución por el art. 22 de la Ley 27.802",
    LIBRO_TEXTOS.art55Nota.includes("art. 22") && LIBRO_TEXTOS.art55Nota.includes("27.802"),
    LIBRO_TEXTOS.art55Nota,
  );
}

// ── 2. Los artículos derogados y el libro que ya no existe ─────────────────────────────────────
{
  check(
    "el art. 54 está derogado por el art. 207",
    LIBRO_TEXTOS.art54Nota.includes("derogado por art. 207") &&
      LIBRO_TEXTOS.art54Nota.includes("27.802"),
    LIBRO_TEXTOS.art54Nota,
  );
  check(
    "el art. 61 está derogado por el art. 207",
    LIBRO_TEXTOS.art61Nota.includes("derogado por art. 207") &&
      LIBRO_TEXTOS.art61Nota.includes("27.802"),
    LIBRO_TEXTOS.art61Nota,
  );
  check(
    "el art. 61 derogado traía la regla de interpretación a favor del trabajador",
    LIBRO_TEXTOS.art61Derogado.includes("se apreciarán por los jueces, en cada caso, en favor del trabajador"),
    LIBRO_TEXTOS.art61Derogado,
  );
  check(
    "el art. 52 VIGENTE manda registrar ante ARCA y declara suficiente esa registración",
    LIBRO_TEXTOS.art52Vigente.includes("Agencia de Recaudación y Control Aduanero (ARCA)") &&
      LIBRO_TEXTOS.art52Vigente.includes(
        "sin que puedan exigirse requisitos adicionales por parte de ninguna otra autoridad",
      ),
    LIBRO_TEXTOS.art52Vigente,
  );
  check(
    "…y trae los diez años de conservación con la validez de la copia digital",
    LIBRO_TEXTOS.art52Vigente.includes("diez (10) años") &&
      LIBRO_TEXTOS.art52Vigente.includes(
        "las copias digitales tendrán la misma validez legal que los originales en formato papel",
      ),
    LIBRO_TEXTOS.art52Vigente,
  );
  check("la constante de conservación son 10 años", ANIOS_CONSERVACION === 10);
  check(
    "el art. 52 ANTERIOR es el del libro especial rubricado",
    LIBRO_TEXTOS.art52Anterior.includes(
      "un libro especial, registrado y rubricado, en las mismas condiciones que se exigen para los libros principales de comercio",
    ),
    LIBRO_TEXTOS.art52Anterior.slice(0, 120),
  );
  check("el libro anterior tenía ocho incisos", INCISOS_LIBRO_ANTERIOR.length === 8);
  check("y cuatro prohibiciones", PROHIBICIONES_LIBRO_ANTERIOR.length === 4);
  check(
    "los ocho incisos citados están todos en el texto anterior del art. 52",
    INCISOS_LIBRO_ANTERIOR.every((i) => LIBRO_TEXTOS.art52Anterior.includes(i)),
    INCISOS_LIBRO_ANTERIOR.filter((i) => !LIBRO_TEXTOS.art52Anterior.includes(i)),
  );
  check(
    "las cuatro prohibiciones citadas están todas en el texto anterior del art. 52",
    PROHIBICIONES_LIBRO_ANTERIOR.every((p) => LIBRO_TEXTOS.art52Anterior.includes(p)),
    PROHIBICIONES_LIBRO_ANTERIOR.filter((p) => !LIBRO_TEXTOS.art52Anterior.includes(p)),
  );
  check(
    "el art. 53 cambió de objeto: de los LIBROS defectuosos a la registración",
    LIBRO_TEXTOS.art53Anterior.includes("los libros que carezcan de algunas de las formalidades") &&
      LIBRO_TEXTOS.art53Vigente.includes("la omisión de formalidades en la registración"),
  );
}

// ── 3. La tabla del bloque: cinco artículos, tres sustituidos y dos derogados ──────────────────
{
  check("el bloque tiene los cinco artículos", CAMBIOS_DEL_BLOQUE.length === 5);
  const arts = CAMBIOS_DEL_BLOQUE.map((c) => c.articulo);
  check("son los arts. 52, 53, 54, 55 y 61", JSON.stringify(arts) === "[52,53,54,55,61]", arts);
  const derogados = CAMBIOS_DEL_BLOQUE.filter((c) => c.accion === "derogado");
  check(
    "los derogados son el 54 y el 61, los dos por el art. 207",
    derogados.length === 2 &&
      derogados.every((c) => c.porArticulo === 207) &&
      derogados.map((c) => c.articulo).join(",") === "54,61",
    derogados,
  );
  const sustituidos = CAMBIOS_DEL_BLOQUE.filter((c) => c.accion === "sustituido");
  check(
    "los sustituidos son el 52, 53 y 55, por los arts. 20, 21 y 22",
    sustituidos.map((c) => `${c.articulo}:${c.porArticulo}`).join(",") === "52:20,53:21,55:22",
    sustituidos.map((c) => `${c.articulo}:${c.porArticulo}`),
  );
  check(
    "todo artículo derogado se publica sin epígrafe vigente",
    derogados.every((c) => c.epigrafeVigente === null),
  );
  check(
    "el art. 55 figura con el cambio de epígrafe que es el hallazgo",
    CAMBIOS_DEL_BLOQUE.some(
      (c) =>
        c.articulo === 55 &&
        c.epigrafeAnterior === "Omisión de su exhibición" &&
        c.epigrafeVigente === "Omisión de registración",
    ),
  );
}

// ── 4. El motor: la celda que la reforma dio vuelta, y las tres que no ─────────────────────────
{
  const vuelta = evaluarPresuncion({
    fechaHecho: POST,
    registracion: "registrado",
    exhibicion: "no_exhibio",
  })!;
  check("registrado + no exhibió: con el texto ANTERIOR la presunción se disparaba", vuelta.antes.aplica);
  check("…y con el texto VIGENTE no", !vuelta.hoy.aplica);
  check("el motor lo marca como resultado que cambió", vuelta.cambiaElResultado);
  check(
    "…y lo avisa como bloqueante, nombrando la derogación del art. 54",
    vuelta.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("art. 54")),
    vuelta.avisos.map((a) => a.tono),
  );

  const negro = evaluarPresuncion({
    fechaHecho: POST,
    registracion: "sin_registrar",
    exhibicion: "no_exhibio",
  })!;
  check("sin registrar + no exhibió: se dispara en los dos textos", negro.hoy.aplica && negro.antes.aplica);
  check("…y por eso no cambia el resultado", !negro.cambiaElResultado);

  const todoBien = evaluarPresuncion({
    fechaHecho: POST,
    registracion: "registrado",
    exhibicion: "exhibio",
  })!;
  check(
    "registrado + exhibió: no se dispara en ninguno de los dos",
    !todoBien.hoy.aplica && !todoBien.antes.aplica,
  );

  const negroQueExhibe = evaluarPresuncion({
    fechaHecho: POST,
    registracion: "sin_registrar",
    exhibicion: "exhibio",
  })!;
  check(
    "sin registrar pero exhibió: hoy SÍ (falta de registración), antes NO (había exhibido)",
    negroQueExhibe.hoy.aplica && !negroQueExhibe.antes.aplica,
  );

  const malRegistrado = evaluarPresuncion({
    fechaHecho: POST,
    registracion: "mal_registrado",
    exhibicion: "exhibio",
  })!;
  check(
    "la registración deficiente cuenta como falta de registración en el texto vigente",
    malRegistrado.hoy.aplica,
  );

  // Exactamente dos de las cuatro celdas de la matriz cambian de signo.
  const cambian = MATRIZ_CASOS.filter((c) => {
    const r = evaluarPresuncion({
      fechaHecho: POST,
      registracion: c.registracion,
      exhibicion: c.exhibicion,
    })!;
    return r.cambiaElResultado;
  });
  check(
    "sólo cambian de signo las dos celdas cruzadas, no más",
    cambian.length === 2 &&
      cambian.every((c) => c.registracion === "registrado" || c.exhibicion === "exhibio"),
    cambian.map((c) => c.etiqueta),
  );
}

// ── 5. La fecha decide el régimen, y el corte es el 6/3/2026 ───────────────────────────────────
{
  check("la vigencia es el 6 de marzo de 2026", VIGENCIA_REFORMA_ISO === "2026-03-06");
  check("el texto largo coincide con el ISO", VIGENCIA_REFORMA === "6 de marzo de 2026");

  const anterior = evaluarPresuncion({
    fechaHecho: PRE,
    registracion: "registrado",
    exhibicion: "no_exhibio",
  })!;
  check("el 5/3/2026 rige el texto anterior", anterior.regimen === "anterior" && anterior.esAnteriorALaReforma);
  check("…y con él la presunción SÍ ampara al trabajador", anterior.aplicable.aplica);

  const justoElDia = evaluarPresuncion({
    fechaHecho: VIGENCIA_REFORMA_ISO,
    registracion: "registrado",
    exhibicion: "no_exhibio",
  })!;
  check("el 6/3/2026 ya rige el texto vigente", justoElDia.regimen === "vigente");
  check("…y con él la presunción ya no lo ampara", !justoElDia.aplicable.aplica);

  check(
    "el motor avisa qué régimen aplicó, sin dejarlo implícito",
    justoElDia.avisos.some((a) => a.texto.includes("posterior al")) &&
      anterior.avisos.some((a) => a.texto.includes("anterior al")),
  );
  check("una fecha inválida no calcula", evaluarPresuncion({
    fechaHecho: "no-es-fecha",
    registracion: "registrado",
    exhibicion: "exhibio",
  }) === null);
}

// ── 6. Los 10 años de conservación ─────────────────────────────────────────────────────────────
{
  const r = evaluarPresuncion({
    fechaHecho: POST,
    registracion: "registrado",
    exhibicion: "exhibio",
    ultimoAsientoPapel: "2026-03-05",
  })!;
  check(
    "diez años sobre el último asiento cargado",
    r.conservacionHasta === "2036-03-05",
    r.conservacionHasta,
  );
  const sinFecha = evaluarPresuncion({
    fechaHecho: POST,
    registracion: "registrado",
    exhibicion: "exhibio",
  })!;
  check("sin fecha de último asiento no se inventa un plazo", sinFecha.conservacionHasta === null);
  check(
    "la página declara que el artículo no fija el día inicial del plazo",
    r.avisos.some((a) => a.texto.includes("no dice desde qué día")),
    r.avisos.map((a) => a.texto.slice(0, 50)),
  );
  check(
    "…y avisa sobre la remisión huérfana a «arts. 52 y 54»",
    r.avisos.some((a) => a.texto.includes("arts. 52 y 54")),
  );
}

// ── 7. Fuentes oficiales y fechadas ────────────────────────────────────────────────────────────
{
  check("hay fecha de consulta", /^\d{4}-\d{2}-\d{2}$/.test(LIBRO_FUENTES.consultadoEl));
  check("hay al menos cuatro fuentes", LIBRO_FUENTES.lista.length >= 4);
  check(
    "todas las fuentes son oficiales o la captura del texto oficial",
    LIBRO_FUENTES.lista.every(
      (f) =>
        f.url.startsWith("https://servicios.infoleg.gob.ar/") ||
        f.url.startsWith("https://www.boletinoficial.gob.ar/") ||
        f.url.startsWith("https://web.archive.org/web/"),
    ),
    LIBRO_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citada la captura de la que salen los textos anteriores",
    LIBRO_FUENTES.lista.some(
      (f) => f.url.includes("web.archive.org") && f.url.includes("25552/texact.htm"),
    ),
  );
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    LIBRO_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "la Ley 27.321 se cita con el id que devuelve InfoLEG (269015), no de memoria",
    LIBRO_FUENTES.lista.some((f) => f.url.includes("id=269015")),
    LIBRO_FUENTES.lista.map((f) => f.url),
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks del libro de sueldos OK (LCT arts. 52, 53 y 55 sustituidos · arts. 54 y 61 derogados por la Ley 27.802)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
