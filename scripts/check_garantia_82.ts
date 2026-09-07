// Verificación de la garantía del 82% del SMVM (src/data/garantia-82.ts + src/lib/garantia-82.ts).
// Correr con: npx tsx scripts/check_garantia_82.ts
//
// LOS TRES CHECKS QUE IMPORTAN:
//
//   1. **La afirmación central de la página es una comparación, no una opinión.** La página dice
//      que el suplemento del art. 125 bis da cero. Eso se sostiene sólo mientras el 82% del SMVM
//      esté por debajo del haber mínimo garantizado, y las dos series se rotan por separado (una
//      por el Consejo del Salario, otra por resolución mensual de ANSES). Si algún mes se da
//      vuelta, la página tiene que decir lo contrario — y este check es el que avisa: NO falla,
//      informa. Fallar por un cambio legítimo de la realidad sería un check mentiroso.
//   2. **El mecanismo "hasta alcanzar" no puede convertirse nunca en un pago negativo** ni en un
//      pago a un excluido por moratoria. Son las dos formas de que esta calculadora le mienta a
//      alguien sobre plata que cree que le deben.
//   3. **Los textos verbatim tienen que seguir siendo verbatim.** Es una página YMYL que cita
//      normas: si alguien "mejora" la redacción de una cita, la fuente deja de respaldar lo que se
//      afirma. Se anclan las frases exactas que sostienen cada conclusión.

import { SMVM_SERIE } from "../src/data/desempleo";
import { HABER_MINIMO_SERIE, HABER_MINIMO_ULTIMO } from "../src/data/jubilaciones";
import { PRESTACIONES_VIGENTES } from "../src/data/prestaciones";
import {
  ANIOS_SERVICIOS,
  FACTOR_GARANTIA,
  GARANTIA_82_FUENTES,
  GARANTIA_82_TEXTOS,
  MORATORIAS_EXCLUIDAS,
  UNIVERSOS,
} from "../src/data/garantia-82";
import { smvmVigente } from "../src/lib/desempleo";
import {
  calcularGarantia82,
  comparativaMensual,
  haberMinimoDe,
  horizonteSinSuplemento,
  nivelGarantizado,
  pagaHoy,
  pisoPropio,
  universoPorId,
} from "../src/lib/garantia-82";

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

// ===========================================================================
// 1 · Las constantes salen del texto de la ley
// ===========================================================================
check("el factor de la garantía es 82%", FACTOR_GARANTIA === 0.82, FACTOR_GARANTIA);
check("el art. 125 bis exige 30 años de servicios", ANIOS_SERVICIOS === 30, ANIOS_SERVICIOS);
check(
  "el texto del art. 125 bis dice «treinta (30) años o más de servicios con aportes efectivos»",
  GARANTIA_82_TEXTOS.art125bis.includes("treinta (30) años o más de servicios con aportes efectivos"),
);
check(
  "el texto del art. 125 bis dice «hasta alcanzar» — el mecanismo entero de la página",
  GARANTIA_82_TEXTOS.art125bis.includes("suplemento dinerario hasta alcanzar"),
);
check(
  "el texto del art. 125 bis dice «ochenta y dos por ciento (82%)»",
  GARANTIA_82_TEXTOS.art125bis.includes("ochenta y dos por ciento (82%)"),
);
check(
  "la exclusión nombra las tres moratorias de la ley",
  ["24.476", "25.994", "26.970"].every((n) => GARANTIA_82_TEXTOS.art125bisExclusion.includes(n)),
);
check(
  "MORATORIAS_EXCLUIDAS enumera las mismas tres normas que el texto",
  MORATORIAS_EXCLUIDAS.length === 3 &&
    ["24.476", "25.994", "26.970"].every((n) => MORATORIAS_EXCLUIDAS.some((m) => m.includes(n))),
  MORATORIAS_EXCLUIDAS,
);
check(
  "el inciso h) fija el nivel en TRES salarios mínimos",
  GARANTIA_82_TEXTOS.reglamentacionIncisoH.includes("tres (3) Salarios Mínimos"),
);
check(
  "el inciso i) fija UN salario mínimo y bloquea la moratoria",
  GARANTIA_82_TEXTOS.reglamentacionIncisoI.includes("un (1) Salario Mínimo") &&
    GARANTIA_82_TEXTOS.reglamentacionIncisoI.includes("moratorias"),
);
check(
  "el art. 2º de la reglamentación dice que entra el que tiene MENOS de treinta años",
  GARANTIA_82_TEXTOS.reglamentacionArt2.includes("menor a TREINTA (30)"),
);

// ===========================================================================
// 2 · Los universos y sus niveles
// ===========================================================================
{
  const ids = UNIVERSOS.map((u) => u.id);
  check("hay cuatro universos y ninguno repetido", new Set(ids).size === 4, ids);
  check(
    "el universo de la pensión honorífica de veteranos vale 3 SMVM",
    universoPorId("pension-veterano").smvm === 3,
  );
  check(
    "los otros tres universos valen 1 SMVM",
    UNIVERSOS.filter((u) => u.id !== "pension-veterano").every((u) => u.smvm === 1),
  );
  check(
    "un id desconocido cae al universo general, no rompe",
    universoPorId("no-existe").id === "general",
  );
}

{
  const p = smvmVigente().mes;
  check(
    `el nivel general del mes vigente es 82% del SMVM (${p.periodo})`,
    casi(nivelGarantizado(p.periodo), p.mensual * 0.82),
    { nivel: nivelGarantizado(p.periodo), esperado: p.mensual * 0.82 },
  );
  check(
    "el nivel de veteranos es exactamente el triple del general",
    casi(nivelGarantizado(p.periodo, "pension-veterano"), nivelGarantizado(p.periodo) * 3),
  );
}

// ===========================================================================
// 2b · El piso PROPIO de cada beneficio — la mina del 3/9/2026
// ===========================================================================
// Casi se publica que la pensión honorífica de Veteranos "sí cobra suplemento", porque su nivel
// (82% × 3 SMVM) se había comparado contra el haber mínimo SIMPLE. Esa pensión ya vale TRES
// haberes mínimos por el Dec. 1357/2004: el numerador y el denominador están multiplicados por el
// mismo número y la proporción es idéntica a la del caso general. Estos checks impiden que la
// comparación vuelva a hacerse contra el piso equivocado.
{
  const p = smvmVigente().mes.periodo;
  const hm = haberMinimoDe(p) ?? HABER_MINIMO_ULTIMO.haberMinimo;

  check(
    "la pensión honorífica de Veteranos declara un piso propio de 3 haberes mínimos",
    universoPorId("pension-veterano").haberesMinimos === 3,
    universoPorId("pension-veterano").haberesMinimos,
  );
  check(
    "y ese piso en pesos es exactamente tres veces el haber mínimo del mes",
    casi(pisoPropio(p, "pension-veterano") ?? -1, hm * 3),
    { piso: pisoPropio(p, "pension-veterano"), esperado: hm * 3 },
  );
  check(
    "la jubilación de ex soldados combatientes NO declara múltiplo fijo (no se inventa un piso)",
    universoPorId("jubilacion-excombatiente").haberesMinimos === null &&
      pisoPropio(p, "jubilacion-excombatiente") === null &&
      pagaHoy(p, "jubilacion-excombatiente") === null,
  );

  // EL CHECK QUE CIERRA LA MINA: escalar nivel y piso por el mismo factor no puede cambiar la
  // respuesta. Si algún universo con múltiplo fijo contesta distinto al general, alguien rompió la
  // proporción o comparó contra el piso equivocado.
  const conMultiplo = UNIVERSOS.filter((u) => u.haberesMinimos !== null);
  const distintos = conMultiplo.filter(
    (u) => (u.smvm === u.haberesMinimos ? pagaHoy(p, u.id) !== pagaHoy(p, "general") : false),
  );
  check(
    "un universo cuyo nivel y piso escalan por el mismo factor da la MISMA respuesta que el general",
    distintos.length === 0,
    distintos.map((u) => `${u.id}: ${pagaHoy(p, u.id)} vs general ${pagaHoy(p, "general")}`),
  );
  check(
    "todo universo con múltiplo fijo tiene declarada la norma de su piso",
    conMultiplo.every((u) => typeof u.normaPiso === "string" && u.normaPiso.length > 10),
    conMultiplo.map((u) => [u.id, u.normaPiso]),
  );

  // Sin haber cargado, la base de un beneficio triple tiene que ser el piso triple: si se asumiera
  // el mínimo simple, la calculadora inventaría un suplemento de dos haberes mínimos.
  const vet = calcularGarantia82({ periodo: p, universoId: "pension-veterano" });
  check(
    "sin haber cargado, la base de la pensión de Veteranos es su piso triple, no el mínimo simple",
    casi(vet.haberBase, hm * 3),
    { base: vet.haberBase, minimoSimple: hm },
  );
  check(
    "y por eso su suplemento también da cero, igual que el general",
    vet.suplemento === calcularGarantia82({ periodo: p }).suplemento,
    { veterano: vet.suplemento },
  );
}

// ===========================================================================
// 3 · El mecanismo "hasta alcanzar" — que nunca pague de menos ni de más
// ===========================================================================
{
  const p = smvmVigente().mes.periodo;
  const nivel = nivelGarantizado(p);

  // Haber por debajo del nivel: paga la diferencia exacta.
  const bajo = calcularGarantia82({ periodo: p, haberActual: nivel - 10_000 });
  check("con haber por debajo del nivel, el suplemento es la diferencia", casi(bajo.suplemento, 10_000), bajo.suplemento);

  // Haber por encima: cero, nunca negativo.
  const alto = calcularGarantia82({ periodo: p, haberActual: nivel + 10_000 });
  check("con haber por encima del nivel, el suplemento es cero", alto.suplemento === 0, alto.suplemento);

  // Haber exactamente igual: cero.
  const igual = calcularGarantia82({ periodo: p, haberActual: nivel });
  check("con haber igual al nivel, el suplemento es cero", igual.suplemento === 0, igual.suplemento);

  // Ningún haber posible produce un suplemento negativo.
  const negativos = [0, 1, nivel / 2, nivel, nivel * 2, nivel * 10]
    .map((h) => calcularGarantia82({ periodo: p, haberActual: h }))
    .filter((r) => r.suplemento < 0);
  check("ningún haber produce un suplemento negativo", negativos.length === 0, negativos.length);

  // La exclusión por moratoria manda sobre cualquier haber.
  const mora = calcularGarantia82({ periodo: p, haberActual: 1, porMoratoria: true });
  check(
    "un excluido por moratoria no recibe suplemento aunque su haber sea ínfimo",
    mora.suplemento === 0 && mora.excluido,
    mora,
  );
  check(
    "y el aviso de la exclusión cita el segundo párrafo del art. 125 bis",
    mora.avisos.some((a) => a.tono === "alerta" && a.texto.includes("segundo párrafo")),
  );

  // Sin haber cargado se asume el haber mínimo, no cero: es el piso del art. 125.
  const vacio = calcularGarantia82({ periodo: p });
  check(
    "sin haber cargado, la base es el haber mínimo garantizado del mes",
    vacio.haberAsumido && casi(vacio.haberBase, haberMinimoDe(p) ?? HABER_MINIMO_ULTIMO.haberMinimo),
    { base: vacio.haberBase, minimo: haberMinimoDe(p) },
  );
}

// ===========================================================================
// 4 · La afirmación central de la página, verificada contra las dos series
// ===========================================================================
{
  const p = smvmVigente().mes.periodo;
  const nivel = nivelGarantizado(p);
  const minimo = PRESTACIONES_VIGENTES.haberMinimo;

  check(
    "prestaciones.ts y la serie de haberes coinciden en el mes vigente (fuente única)",
    casi(haberMinimoDe(PRESTACIONES_VIGENTES.periodo) ?? -1, minimo),
    { serie: haberMinimoDe(PRESTACIONES_VIGENTES.periodo), prestaciones: minimo },
  );

  // NO es un fallo si se da vuelta: es un aviso para reescribir la página. Fallar acá sería
  // pedirle al mundo que no cambie.
  if (nivel > minimo) {
    console.log(
      `\n⚠️  ATENCIÓN: el 82% del SMVM (${nivel}) SUPERÓ al haber mínimo (${minimo}) en ${p}.\n` +
        "   La garantía del art. 125 bis pasó a pagar. La página /82-por-ciento-movil afirma lo\n" +
        "   contrario en el H1, la respuesta corta, el título y varias FAQ: hay que reescribirla.\n",
    );
  } else {
    console.log(
      `OK   el haber mínimo (${minimo}) sigue por encima del 82% del SMVM (${nivel}) en ${p} — la página dice la verdad`,
    );
  }
}

{
  const filas = comparativaMensual();
  check(
    "la comparativa tiene una fila por cada mes de la escala del SMVM",
    filas.length === SMVM_SERIE.length,
    { filas: filas.length, escala: SMVM_SERIE.length },
  );
  check(
    "ninguna fila con las dos normas dictadas tiene suplemento negativo",
    filas.filter((f) => f.suplemento !== null && f.suplemento < 0).length === 0,
  );
  const conNorma = filas.filter((f) => f.haberMinimo !== null);
  check(
    "hay al menos un mes con las dos normas dictadas para comparar",
    conNorma.length > 0,
    conNorma.length,
  );
  check(
    "los meses sin resolución de haberes se marcan null, no se proyectan",
    filas.every((f) => (f.haberMinimo === null) === (haberMinimoDe(f.periodo) === null)),
  );
}

{
  const h = horizonteSinSuplemento();
  check(
    "el horizonte toma el último mes de la escala del SMVM",
    h.ultimoPeriodo === SMVM_SERIE[SMVM_SERIE.length - 1].periodo,
    h.ultimoPeriodo,
  );
  check(
    "el haber mínimo de referencia del horizonte es el último publicado",
    casi(h.haberMinimoHoy, HABER_MINIMO_ULTIMO.haberMinimo),
  );
  if (h.inoperante) {
    check(
      "la caída necesaria del haber mínimo es positiva y menor a 100%",
      h.caidaNecesariaPct > 0 && h.caidaNecesariaPct < 100,
      h.caidaNecesariaPct,
    );
  }
}

// ===========================================================================
// 5 · La serie del haber mínimo y la del SMVM se solapan de verdad
// ===========================================================================
{
  const periodosSmvm = new Set(SMVM_SERIE.map((m) => m.periodo));
  const solapan = HABER_MINIMO_SERIE.filter((m) => periodosSmvm.has(m.periodo));
  check(
    "las dos series se solapan en al menos 6 meses (si no, la tabla queda vacía)",
    solapan.length >= 6,
    solapan.length,
  );
}

// ===========================================================================
// 6 · Fuentes
// ===========================================================================
check(
  "todas las fuentes son oficiales (boletinoficial / infoleg)",
  GARANTIA_82_FUENTES.lista.every((f) =>
    /^https:\/\/(www\.)?(boletinoficial|servicios\.infoleg)\.gob\.ar\//.test(f.url),
  ),
  GARANTIA_82_FUENTES.lista.map((f) => f.url),
);
check(
  "la primera fuente es el texto actualizado de la Ley 24.241",
  GARANTIA_82_FUENTES.lista[0].url.includes("/0-4999/639/texact.htm"),
);
check(
  "está citada la reglamentación (Res. SSS 25-E/2017, InfoLEG 305749)",
  GARANTIA_82_FUENTES.lista.some((f) => f.url.includes("305749")),
);
check(
  "está citada la Ley 23.848 / Dec. 1357/2004, de donde sale el piso triple",
  GARANTIA_82_FUENTES.lista.some((f) => f.url.includes("/0-4999/248/texact.htm")),
);
check(
  "está citada la resolución del SMVM vigente y la de haberes de ANSES",
  GARANTIA_82_FUENTES.lista.some((f) => f.url.includes("346775")) &&
    GARANTIA_82_FUENTES.lista.some((f) => f.url.includes("346683")),
);
check(
  "la fecha de consulta es una fecha ISO",
  /^\d{4}-\d{2}-\d{2}$/.test(GARANTIA_82_FUENTES.consultadoEl),
);

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  const p = smvmVigente().mes.periodo;
  console.log(
    `Todos los checks de la garantía del 82% OK (Ley 24.241 art. 125 bis · Res. SSS 25-E/2017 · ${p}: nivel ${nivelGarantizado(p)} vs haber mínimo ${PRESTACIONES_VIGENTES.haberMinimo}).`,
  );
}
