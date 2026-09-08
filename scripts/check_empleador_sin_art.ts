// Verificación de «quién responde sin ART en regla» (Ley 24.557, arts. 27 ap. 6, 28 y 29).
// Correr con: npx tsx scripts/check_empleador_sin_art.ts
//
// LO QUE ESTE CHECK EXISTE PARA IMPEDIR:
//
//   1. **Que «el empleador no paga la ART» se publique como «no estás cubierto».** Es el error que
//      más daño hace acá: el art. 28 ap. 4 manda a la ART a otorgar las prestaciones igual y a
//      ejecutar después las cotizaciones adeudadas. Un trabajador que lea lo contrario no reclama.
//   2. **Que «trabajar en negro» se confunda con «trabajar sin ART».** Si la empresa tiene contrato
//      vivo, el no declarado cobra de la ART (ap. 2). Si la empresa nunca se afilió, responde el
//      empleador (ap. 1). El check exige que las dos ramas den responsables distintos.
//   3. **Que se pierda la ventana de tres meses del art. 27 ap. 6**, o que se publique como si
//      cubriera todo. Cubre sólo las prestaciones EN ESPECIE del Capítulo V.
//   4. **Que el borde de la ventana se corra.** El accidente del mes 3 está adentro; el del mes 4,
//      afuera. Un `<` en lugar de un `<=` deja sin atención médica a alguien que la ley cubre.
//   5. **Que el Fondo de Garantía parezca automático.** El art. 29 exige la insuficiencia
//      patrimonial **declarada judicialmente**, por el procedimiento sumarísimo.
//   6. **Que las citas se parafraseen.**
//
// MUTACIONES MUERTAS (cambios plausibles que este check tiene que atrapar):
//   · la falta de pago cortando la cobertura · el no declarado saliendo a cargo del empleador ·
//     la ventana con `<` en vez de `<=` · la ventana devolviendo alcance «completo» ·
//     el Fondo de Garantía sin exigir la declaración judicial.

import {
  CUOTAS_PARA_EXTINGUIR,
  MESES_ESPECIE_TRAS_EXTINCION,
  PRESTACIONES_EN_ESPECIE,
  SIN_ART_FUENTES,
  SIN_ART_TEXTOS,
  VIGENCIA_SIN_ART,
} from "../src/data/empleador-sin-art";
import {
  calcularResponsable,
  dentroDeLaVentana,
  type Entrada,
} from "../src/lib/empleador-sin-art";
import {
  CUOTAS_PARA_EXTINGUIR as CUOTAS_CM,
  MESES_ESPECIE_TRAS_EXTINCION as MESES_CM,
} from "../src/data/comision-medica";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FALLA ${nombre}`, detalle ?? "");
  }
}

const caso = (extra: Partial<Entrada> = {}): Entrada => ({
  afiliadoAlgunaVez: true,
  contratoExtinguido: false,
  trabajadorDeclarado: true,
  cuotasAlDia: true,
  insuficienciaDeclarada: false,
  ...extra,
});

// --- 1. Constantes y no duplicación -----------------------------------------------------------
check("son 2 cuotas para extinguir", CUOTAS_PARA_EXTINGUIR === 2, CUOTAS_PARA_EXTINGUIR);
check("y 3 meses de prestaciones en especie", MESES_ESPECIE_TRAS_EXTINCION === 3, MESES_ESPECIE_TRAS_EXTINCION);
check(
  "las constantes NO están duplicadas: son las mismas que las de la comisión médica",
  CUOTAS_PARA_EXTINGUIR === CUOTAS_CM && MESES_ESPECIE_TRAS_EXTINCION === MESES_CM,
);
check("las prestaciones en especie del Capítulo V son cinco", PRESTACIONES_EN_ESPECIE.length === 5);
check(
  "y son las del art. 20: cada una figura en la cita textual",
  PRESTACIONES_EN_ESPECIE.every((p) =>
    SIN_ART_TEXTOS.art20Especie.toLowerCase().includes(p.toLowerCase().slice(0, 12)),
  ),
);

// --- 2. Nunca se afilió: responde el empleador ------------------------------------------------
const nuncaAfiliado = calcularResponsable(caso({ afiliadoAlgunaVez: false }));
check("sin afiliación, responde el empleador", nuncaAfiliado.responsable === "empleador");
check("y se cita el art. 28 ap. 1", nuncaAfiliado.norma.includes("28 ap. 1"), nuncaAfiliado.norma);
check("por todas las prestaciones, no sólo las médicas", nuncaAfiliado.alcance === "completo");
check(
  "y se avisa que sin registrar no hace falta agotar la comisión médica",
  nuncaAfiliado.avisos.some((a) => a.texto.includes("27.348")),
);

// --- 3. Sin declarar pero con ART: responde la ART ---------------------------------------------
const enNegroConArt = calcularResponsable(caso({ trabajadorDeclarado: false }));
check("con ART viva, el no declarado cobra de la ART", enNegroConArt.responsable === "art");
check("y se cita el ap. 2", enNegroConArt.norma.includes("ap. 2"), enNegroConArt.norma);
check("con derecho de repetición contra el empleador", enNegroConArt.repeticion.includes("repetir"));
check(
  "las dos ramas dan responsables DISTINTOS: es el hallazgo de la página",
  enNegroConArt.responsable !== nuncaAfiliado.responsable,
);
check(
  "y el ap. 3 (cuotas omitidas al Fondo de Garantía de la ART) está en la respuesta",
  enNegroConArt.repeticion.includes("Fondo de Garantía de la ART"),
);

// --- 4. Cuotas impagas con contrato vivo: la cobertura NO se corta -----------------------------
const debeCuotas = calcularResponsable(caso({ cuotasAlDia: false }));
check("con cuotas impagas y contrato vivo, responde la ART", debeCuotas.responsable === "art");
check("y se cita el ap. 4", debeCuotas.norma.includes("ap. 4"), debeCuotas.norma);
check("con alcance completo, no recortado", debeCuotas.alcance === "completo");
check(
  "ejecuta las cotizaciones adeudadas, no repite el costo",
  debeCuotas.repeticion.includes("ejecutar"),
);
check(
  "y se explica que sólo la extinción corta, con sus dos cuotas",
  debeCuotas.avisos.some((a) => a.texto.includes("extinguir")),
);
const negroYDeudor = calcularResponsable(caso({ trabajadorDeclarado: false, cuotasAlDia: false }));
check(
  "no declarado + cuotas impagas sigue siendo la ART",
  negroYDeudor.responsable === "art",
  negroYDeudor.responsable,
);

// --- 5. La ventana de tres meses ---------------------------------------------------------------
check("el mes 0 está adentro", dentroDeLaVentana(0));
check("el mes 3 está adentro — el texto dice «dentro de los tres (3) meses»", dentroDeLaVentana(3));
check("el mes 4 está afuera", !dentroDeLaVentana(4));
check("un valor ausente se trata como fuera de la ventana", !dentroDeLaVentana(undefined));
const extinguidoDentro = calcularResponsable(
  caso({ contratoExtinguido: true, mesesDesdeExtincion: 2 }),
);
check(
  "extinguido y dentro de la ventana: la ART atiende igual",
  extinguidoDentro.responsable === "art-parcial",
);
check(
  "pero SÓLO en especie — no las dinerarias",
  extinguidoDentro.alcance === "solo-en-especie",
  extinguidoDentro.alcance,
);
check("y se cita el art. 27 ap. 6", extinguidoDentro.norma.includes("27 ap. 6"));
check(
  "se aclara que por lo dinerario responde el empleador",
  extinguidoDentro.avisos.some((a) => a.texto.includes("28 ap. 1")),
);
check(
  "y que la aseguradora puede repetir lo que otorgó",
  extinguidoDentro.repeticion.includes("repetir"),
);
const extinguidoFuera = calcularResponsable(
  caso({ contratoExtinguido: true, mesesDesdeExtincion: 5 }),
);
check(
  "vencida la ventana, responde el empleador",
  extinguidoFuera.responsable === "empleador",
  extinguidoFuera.responsable,
);
check("con alcance completo", extinguidoFuera.alcance === "completo");
check(
  "y se avisa que la ventana se cerró",
  extinguidoFuera.avisos.some((a) => a.tono === "bloqueante"),
);
check(
  "el borde exacto: mes 3 cubre, mes 4 no",
  calcularResponsable(caso({ contratoExtinguido: true, mesesDesdeExtincion: 3 })).responsable ===
    "art-parcial" &&
    calcularResponsable(caso({ contratoExtinguido: true, mesesDesdeExtincion: 4 })).responsable ===
      "empleador",
);

// --- 6. El Fondo de Garantía no es automático --------------------------------------------------
check(
  "sin declaración judicial NO se llega al Fondo de Garantía",
  calcularResponsable(caso({ afiliadoAlgunaVez: false, insuficienciaDeclarada: false }))
    .responsable === "empleador",
);
const fondo = calcularResponsable(caso({ afiliadoAlgunaVez: false, insuficienciaDeclarada: true }));
check("con la declaración judicial, sí", fondo.responsable === "fondo-de-garantia");
check("y se cita el art. 29", fondo.norma.includes("29"), fondo.norma);
check(
  "y se aclara que se prueba por el procedimiento sumarísimo",
  fondo.avisos.some((a) => a.texto.includes("sumarísimo")),
);
check(
  "también aplica al contrato extinguido con la ventana vencida",
  calcularResponsable(
    caso({ contratoExtinguido: true, mesesDesdeExtincion: 9, insuficienciaDeclarada: true }),
  ).responsable === "fondo-de-garantia",
);
check(
  "pero NO si el accidente cae dentro de la ventana: ahí la ART sigue debiendo la atención",
  calcularResponsable(
    caso({ contratoExtinguido: true, mesesDesdeExtincion: 1, insuficienciaDeclarada: true }),
  ).responsable === "art-parcial",
);

// --- 7. El caso normal --------------------------------------------------------------------------
const normal = calcularResponsable(caso());
check("todo en regla: responde la ART", normal.responsable === "art");
check("sin repetición contra nadie", normal.repeticion === "");
check("y con alcance completo", normal.alcance === "completo");

// --- 8. Ningún resultado sale mudo ---------------------------------------------------------------
const combos: Entrada[] = [];
for (const afiliado of [true, false])
  for (const extinguido of [true, false])
    for (const declarado of [true, false])
      for (const alDia of [true, false])
        for (const insuf of [true, false])
          for (const meses of [0, 3, 4, 12])
            combos.push({
              afiliadoAlgunaVez: afiliado,
              contratoExtinguido: extinguido,
              trabajadorDeclarado: declarado,
              cuotasAlDia: alDia,
              insuficienciaDeclarada: insuf,
              mesesDesdeExtincion: meses,
            });
check(`se barren ${combos.length} combinaciones`, combos.length === 128, combos.length);
check(
  "ninguna sale sin responsable, sin norma, sin título ni sin detalle",
  combos.every((c) => {
    const r = calcularResponsable(c);
    return (
      r.responsable.length > 0 &&
      r.norma.length > 0 &&
      r.titulo.length > 0 &&
      r.detalle.length > 20
    );
  }),
);
check(
  "el alcance recortado aparece SÓLO en la ventana del art. 27 ap. 6",
  combos.every((c) => {
    const r = calcularResponsable(c);
    return (
      r.alcance === "completo" ||
      (c.afiliadoAlgunaVez && c.contratoExtinguido && dentroDeLaVentana(c.mesesDesdeExtincion))
    );
  }),
);
check(
  "con contrato vivo, el responsable es SIEMPRE la ART, pase lo que pase con las cuotas",
  combos
    .filter((c) => c.afiliadoAlgunaVez && !c.contratoExtinguido)
    .every((c) => calcularResponsable(c).responsable === "art"),
);

// --- 9. Las citas son citas ----------------------------------------------------------------------
check(
  "el ap. 6 conserva las dos cuotas y la deuda equivalente",
  SIN_ART_TEXTOS.art27ap6Extincion.includes("dos (2) cuotas mensuales, consecutivas o alternadas") &&
    SIN_ART_TEXTOS.art27ap6Extincion.includes("la de mayor valor en el último año"),
);
check(
  "y los tres meses, con «prestaciones en especie» y el Capítulo V",
  SIN_ART_TEXTOS.art27ap6TresMeses.includes("tres (3) meses posteriores a la extinción") &&
    SIN_ART_TEXTOS.art27ap6TresMeses.includes("prestaciones en especie") &&
    SIN_ART_TEXTOS.art27ap6TresMeses.includes("Capítulo V"),
);
check(
  "el ap. 1 conserva el «responderá directamente ante los beneficiarios»",
  SIN_ART_TEXTOS.art28ap1.includes("responderá directamente ante los beneficiarios"),
);
check(
  "el ap. 2 conserva que la ART otorga y puede repetir",
  SIN_ART_TEXTOS.art28ap2.includes("la ART otorgará las prestaciones") &&
    SIN_ART_TEXTOS.art28ap2.includes("repetir del empleador"),
);
check(
  "el ap. 4 conserva el «total o parcialmente» y la ejecución",
  SIN_ART_TEXTOS.art28ap4.includes("total o parcialmente") &&
    SIN_ART_TEXTOS.art28ap4.includes("ejecutar contra el empleador las cotizaciones adeudadas"),
);
check(
  "el art. 29 conserva la declaración judicial y el procedimiento sumarísimo",
  SIN_ART_TEXTOS.art29.includes("Declarada judicialmente") &&
    SIN_ART_TEXTOS.art29.includes("procedimiento sumarísimo"),
);
check(
  "la reglamentación delegada está citada, porque es lo que NO publicamos",
  SIN_ART_TEXTOS.art27ap6Reglamentacion.includes("requisitos, modalidades y plazos que determine la reglamentación"),
);

// --- 10. Vigencia y fuentes ----------------------------------------------------------------------
check(
  "el apartado 6 lo incorporó la Ley 27.348 en 2017",
  VIGENCIA_SIN_ART.incorporadoPor.includes("27.348") && VIGENCIA_SIN_ART.boletin.includes("2017"),
);
check(
  "y se declara su regla de aplicación temporal (manda la fecha del accidente)",
  VIGENCIA_SIN_ART.aplicacion.includes("primer manifestación invalidante"),
);
check("hay al menos 3 fuentes", SIN_ART_FUENTES.length >= 3, SIN_ART_FUENTES.length);
check(
  "todas por https y de infoleg",
  SIN_ART_FUENTES.every((f) => f.url.startsWith("https://") && f.url.includes("infoleg.gob.ar")),
);
check("ninguna sin detalle", SIN_ART_FUENTES.every((f) => f.detalle.trim().length > 30));
check("la fecha de consulta está declarada", VIGENCIA_SIN_ART.consultadoEl.includes("2026"));

if (fallas > 0) {
  console.error(`\n❌ ${fallas} falla(s) en los checks de empleador sin ART.`);
  process.exit(1);
}
console.log("\n✅ Todos los checks de empleador sin ART OK (Ley 24.557, arts. 20, 27 ap. 6, 28 y 29).");
