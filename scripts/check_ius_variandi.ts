// Verificación de la página de ius variandi (LCT arts. 65, 66, 68 y 246; los arts. 66 y 68
// sustituidos por los arts. 23 y 24 de la Ley 27.802).
// Correr con: npx tsx scripts/check_ius_variandi.ts
//
// LOS ANCLAS:
//   1. **Los arts. 66 y 68 están SUSTITUIDOS, no derogados**, y por artículos distintos de la misma
//      ley (23 y 24). Las notas se chequean una por una.
//   2. **Las tres frases que salieron del art. 66** —«ejercicio irrazonable», «ni moral» y la acción
//      de restablecimiento— tienen que estar en el texto ANTERIOR y NO en el vigente. Si se cruzan,
//      la página miente sobre la reforma. Y **la frase que entró** —«previa intimación y si ésta
//      fuere desoída»— al revés.
//   3. **La cláusula de dignidad y abuso del derecho salió del art. 68.**
//   4. **El art. 65 está INTACTO** y no se le inventa una nota: es la única base textual que le
//      queda a un planteo de razonabilidad, y decirlo mal en cualquiera de las dos direcciones
//      arruina la página.
//   5. **La tabla de motivos refleja el texto**: exactamente dos vedan hoy (esenciales, material) y
//      exactamente dos ya no (moral, irrazonable).
//   6. **Un cambio que sólo vedaba antes NO habilita hoy** a considerarse despedido, y la página
//      tiene que decirlo con un aviso bloqueante en vez de liquidar igual.
//   7. **Sin intimación desoída no hay liquidación**: es el requisito que la reforma agregó.
//   8. **El art. 245 no se reimplementa** (regla de s85): la liquidación del despido indirecto es,
//      peso por peso, la de /indemnizacion. El art. 246 remite a los arts. 232, 233 y 245.

import {
  ANIO_LEY_26088,
  ARTICULO_SUSTITUYENTE_66,
  ARTICULO_SUSTITUYENTE_68,
  CAMINOS,
  IUS_VARIANDI_FUENTES,
  IUS_VARIANDI_TEXTOS,
  LEY_QUE_CREO_EL_RESTABLECIMIENTO,
  MOTIVOS_VEDA,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/ius-variandi";
import { calcularIndemnizacion } from "../src/lib/indemnizacion";
import { evaluarIusVariandi } from "../src/lib/ius-variandi";

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

const BASE = 1_400_000;
const INGRESO = "2019-05-06";
const EGRESO = "2026-08-20";

// ── 1. Las dos sustituciones ───────────────────────────────────────────────────────────────────
{
  check("el art. 66 lo sustituyó el art. 23 de la Ley 27.802", ARTICULO_SUSTITUYENTE_66 === 23);
  check("el art. 68 lo sustituyó el art. 24 de la Ley 27.802", ARTICULO_SUSTITUYENTE_68 === 24);
  check(
    "la nota del art. 66 cita su artículo sustituyente y la fecha del B.O.",
    IUS_VARIANDI_TEXTOS.art66Nota.includes(`art. ${ARTICULO_SUSTITUYENTE_66}`) &&
      IUS_VARIANDI_TEXTOS.art66Nota.includes("27.802") &&
      IUS_VARIANDI_TEXTOS.art66Nota.includes("6/3/2026"),
    IUS_VARIANDI_TEXTOS.art66Nota,
  );
  check(
    "la nota del art. 68 cita su artículo sustituyente y la fecha del B.O.",
    IUS_VARIANDI_TEXTOS.art68Nota.includes(`art. ${ARTICULO_SUSTITUYENTE_68}`) &&
      IUS_VARIANDI_TEXTOS.art68Nota.includes("27.802") &&
      IUS_VARIANDI_TEXTOS.art68Nota.includes("6/3/2026"),
    IUS_VARIANDI_TEXTOS.art68Nota,
  );
  check(
    "las dos notas dicen SUSTITUIDO, no derogado",
    [IUS_VARIANDI_TEXTOS.art66Nota, IUS_VARIANDI_TEXTOS.art68Nota].every(
      (n) => n.includes("sustituido") && !n.includes("derogado"),
    ),
  );
  check("la vigencia es el 6 de marzo de 2026", VIGENCIA_REFORMA === "6 de marzo de 2026");
  check("el ISO de la vigencia coincide", VIGENCIA_REFORMA_ISO === "2026-03-06");
  check(
    "la ley que había creado la acción de restablecimiento es la 26.088, de 2006",
    LEY_QUE_CREO_EL_RESTABLECIMIENTO === "26.088" && ANIO_LEY_26088 === 2006,
  );
}

// ── 2. Lo que salió y lo que entró en el art. 66 ───────────────────────────────────────────────
{
  check(
    "«ejercicio irrazonable» está en el texto anterior y NO en el vigente",
    IUS_VARIANDI_TEXTOS.art66Anterior.includes(IUS_VARIANDI_TEXTOS.estandarQueSalio) &&
      !IUS_VARIANDI_TEXTOS.art66Vigente.includes("irrazonable"),
  );
  check(
    "el perjuicio «material ni moral» está en el anterior; el vigente sólo nombra el material",
    IUS_VARIANDI_TEXTOS.art66Anterior.includes("perjuicio material ni moral") &&
      IUS_VARIANDI_TEXTOS.art66Vigente.includes("perjuicio material al trabajador") &&
      !IUS_VARIANDI_TEXTOS.art66Vigente.includes("moral"),
  );
  check(
    "la acción de restablecimiento está en el anterior y NO en el vigente",
    IUS_VARIANDI_TEXTOS.art66Anterior.includes(IUS_VARIANDI_TEXTOS.opcionQueDesaparecio) &&
      !IUS_VARIANDI_TEXTOS.art66Vigente.includes("restablecimiento"),
  );
  check(
    "el texto anterior daba a OPTAR entre dos caminos; el vigente ofrece uno solo",
    IUS_VARIANDI_TEXTOS.art66Anterior.includes("optar por considerarse despedido") &&
      !IUS_VARIANDI_TEXTOS.art66Vigente.includes("optar"),
  );
  check(
    "la intimación previa está en el vigente y NO en el anterior",
    IUS_VARIANDI_TEXTOS.art66Vigente.includes(IUS_VARIANDI_TEXTOS.requisitoNuevo) &&
      !IUS_VARIANDI_TEXTOS.art66Anterior.includes("previa intimación"),
  );
  check(
    "los dos textos conservan los dos límites que sobrevivieron",
    [IUS_VARIANDI_TEXTOS.art66Vigente, IUS_VARIANDI_TEXTOS.art66Anterior].every(
      (t) => t.includes("modalidades esenciales del contrato") && t.includes("perjuicio material"),
    ),
  );
}

// ── 3. Lo que salió del art. 68, y el art. 65 intacto ──────────────────────────────────────────
{
  check(
    "la cláusula de dignidad y abuso del derecho está en el art. 68 anterior y no en el vigente",
    IUS_VARIANDI_TEXTOS.art68Anterior.includes(IUS_VARIANDI_TEXTOS.clausulaDeDignidadQueSalio) &&
      !IUS_VARIANDI_TEXTOS.art68Vigente.includes("abuso del derecho") &&
      !IUS_VARIANDI_TEXTOS.art68Vigente.includes("dignidad"),
  );
  check(
    "los consejos de empresa y los reglamentos internos también salieron del art. 68",
    IUS_VARIANDI_TEXTOS.art68Anterior.includes("consejos de empresa") &&
      !IUS_VARIANDI_TEXTOS.art68Vigente.includes("consejos de empresa"),
  );
  check(
    "el art. 68 vigente conserva la referencia a ley, estatutos y convenios",
    IUS_VARIANDI_TEXTOS.art68Vigente.includes(
      "la ley, los estatutos profesionales y las convenciones colectivas de trabajo",
    ),
  );
  check(
    "el art. 65 conserva el ejercicio funcional y la preservación de los derechos del trabajador",
    IUS_VARIANDI_TEXTOS.art65.includes("carácter funcional") &&
      IUS_VARIANDI_TEXTOS.art65.includes(
        "preservación y mejora de los derechos personales y patrimoniales del trabajador",
      ),
  );
  check(
    "al art. 65 no se le inventa una nota de sustitución",
    !IUS_VARIANDI_TEXTOS.art65.includes("sustituido") && !IUS_VARIANDI_TEXTOS.art65.includes("27.802"),
  );
  check(
    "el art. 69 sigue excluyendo la modificación del contrato como sanción",
    IUS_VARIANDI_TEXTOS.art69.includes("No podrán aplicarse sanciones disciplinarias"),
  );
  check(
    "el art. 246 remite a los arts. 232, 233 y 245",
    IUS_VARIANDI_TEXTOS.art246.includes("artículos 232, 233 y 245"),
  );
}

// ── 4. La tabla de motivos refleja el texto ────────────────────────────────────────────────────
{
  const hoy = MOTIVOS_VEDA.filter((m) => m.vedaHoy).map((m) => m.id);
  const ya_no = MOTIVOS_VEDA.filter((m) => !m.vedaHoy).map((m) => m.id);
  check("son cuatro motivos en total", MOTIVOS_VEDA.length === 4, MOTIVOS_VEDA.length);
  check(
    "vedan hoy exactamente: modalidades esenciales y perjuicio material",
    hoy.length === 2 && hoy.includes("esenciales") && hoy.includes("material"),
    hoy,
  );
  check(
    "ya no vedan: perjuicio moral y ejercicio irrazonable",
    ya_no.length === 2 && ya_no.includes("moral") && ya_no.includes("irrazonable"),
    ya_no,
  );
  check(
    "hay dos caminos y sólo uno sigue disponible",
    CAMINOS.length === 2 && CAMINOS.filter((c) => c.disponibleHoy).length === 1,
    CAMINOS.map((c) => [c.id, c.disponibleHoy]),
  );
  check(
    "el camino que sigue disponible es el despido indirecto",
    CAMINOS.find((c) => c.disponibleHoy)?.id === "despido-indirecto",
  );
}

// ── 5. El motor: la brecha de la reforma ───────────────────────────────────────────────────────
{
  const soloAntes = evaluarIusVariandi({
    motivos: ["moral", "irrazonable"],
    intimacion: "intimo-desoida",
    ingresoISO: INGRESO,
    egresoISO: EGRESO,
    mejorRemuneracion: BASE,
  });
  check(
    "un cambio que sólo vedaba antes: vedadoAntes sí, vedadoHoy no",
    soloAntes.vedadoAntes && !soloAntes.vedadoHoy && soloAntes.cambioDeLado,
    { antes: soloAntes.vedadoAntes, hoy: soloAntes.vedadoHoy },
  );
  check(
    "y NO habilita a considerarse despedido, ni liquida",
    !soloAntes.habilitadoAConsiderarseDespedido && soloAntes.liquidacion === null,
  );
  check(
    "lo dice con un aviso bloqueante que nombra al art. 65",
    soloAntes.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("artículo 65")),
    soloAntes.avisos.map((a) => a.tono),
  );

  const vedadoHoy = evaluarIusVariandi({
    motivos: ["esenciales"],
    intimacion: "intimo-desoida",
    ingresoISO: INGRESO,
    egresoISO: EGRESO,
    mejorRemuneracion: BASE,
  });
  check(
    "un cambio que altera modalidades esenciales sigue vedado hoy y habilita",
    vedadoHoy.vedadoHoy && vedadoHoy.habilitadoAConsiderarseDespedido && !!vedadoHoy.liquidacion,
  );

  for (const estado of ["no-intimo", "intimo-rectificaron"] as const) {
    const sinIntimacion = evaluarIusVariandi({
      motivos: ["esenciales", "material"],
      intimacion: estado,
      ingresoISO: INGRESO,
      egresoISO: EGRESO,
      mejorRemuneracion: BASE,
    });
    check(
      `sin intimación desoída (${estado}) no hay liquidación: es el requisito que agregó la reforma`,
      !sinIntimacion.habilitadoAConsiderarseDespedido && sinIntimacion.liquidacion === null,
    );
  }
  check(
    "sin intimar, el aviso bloqueante cita la frase nueva del artículo",
    evaluarIusVariandi({
      motivos: ["esenciales"],
      intimacion: "no-intimo",
      ingresoISO: INGRESO,
      egresoISO: EGRESO,
      mejorRemuneracion: BASE,
    }).avisos.some(
      (a) => a.tono === "bloqueante" && a.texto.includes("previa intimación y si ésta fuere desoída"),
    ),
  );

  const sinMotivos = evaluarIusVariandi({
    motivos: [],
    intimacion: "intimo-desoida",
    ingresoISO: INGRESO,
    egresoISO: EGRESO,
    mejorRemuneracion: BASE,
  });
  check(
    "sin motivos marcados, el cambio no está vedado y no se liquida nada",
    !sinMotivos.vedadoHoy && !sinMotivos.vedadoAntes && sinMotivos.liquidacion === null,
  );

  check(
    "el aviso sobre el camino que se cerró aparece siempre",
    [soloAntes, vedadoHoy, sinMotivos].every((r) =>
      r.avisos.some((a) => a.texto.includes("restablecimiento")),
    ),
  );
}

// ── 6. El art. 245 no se reimplementa: es peso por peso el de /indemnizacion ───────────────────
{
  const r = evaluarIusVariandi({
    motivos: ["esenciales"],
    intimacion: "intimo-desoida",
    ingresoISO: INGRESO,
    egresoISO: EGRESO,
    mejorRemuneracion: BASE,
  });
  const directo = calcularIndemnizacion({
    ingresoISO: INGRESO,
    despidoISO: EGRESO,
    mejorRemuneracion: BASE,
    preavisoOtorgado: false,
  })!;
  check(
    "el despido indirecto paga exactamente lo mismo que el directo (art. 246)",
    !!r.liquidacion && casi(r.liquidacion.totalGeneral, directo.totalGeneral),
    { indirecto: r.liquidacion?.totalGeneral, directo: directo.totalGeneral },
  );
  check(
    "y sus tres rubros son los de los arts. 232, 233 y 245",
    !!r.liquidacion &&
      r.liquidacion.indemnizacionAntiguedad === directo.indemnizacionAntiguedad &&
      r.liquidacion.preaviso?.monto === directo.preaviso?.monto,
  );
}

// ── 7. Fuentes ─────────────────────────────────────────────────────────────────────────────────
{
  check(
    "está citado el texto actualizado de la LCT en InfoLEG (id 25552)",
    IUS_VARIANDI_FUENTES.lista.some((f) => f.url.includes("25552/texact.htm")),
  );
  check(
    "está citada la captura de la que salen los textos anteriores",
    IUS_VARIANDI_FUENTES.lista.some(
      (f) => f.url.includes("web.archive.org") && f.url.includes("25552/texact.htm"),
    ),
  );
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    IUS_VARIANDI_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "está citada la Ley 26.088, la que la reforma revirtió (id 115745)",
    IUS_VARIANDI_FUENTES.lista.some((f) => f.url.includes("115745")),
    IUS_VARIANDI_FUENTES.lista.map((f) => f.url),
  );
  check(
    "ninguna fuente es un blog o una nota de prensa",
    IUS_VARIANDI_FUENTES.lista.every(
      (f) =>
        f.url.includes("infoleg.gob.ar") ||
        f.url.includes("boletinoficial.gob.ar") ||
        f.url.includes("web.archive.org"),
    ),
    IUS_VARIANDI_FUENTES.lista.map((f) => f.url),
  );
  check(
    "la fecha de consulta está declarada",
    /^\d{4}-\d{2}-\d{2}$/.test(IUS_VARIANDI_FUENTES.consultadoEl),
    IUS_VARIANDI_FUENTES.consultadoEl,
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de ius variandi OK (LCT arts. 66 y 68 sustituidos por los arts. 23 y 24 de la Ley 27.802 · art. 65 intacto)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
