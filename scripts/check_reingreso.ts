// Verificación de la página de reingreso al mismo empleador (LCT arts. 18 y 255, los dos
// sustituidos por la Ley 27.802). Correr con: npx tsx scripts/check_reingreso.ts
//
// LOS ANCLAS:
//   1. **El corte de los DOS AÑOS del art. 18 es la regla que decide el caso**: a los 24 meses
//      justos ya no se computa la antigüedad vieja, y a los 23 sí. Si ese umbral se corre, la
//      página publica una indemnización que puede ser el doble o la mitad de la correcta.
//   2. **Cuando el corte se aplica, no se deduce nada** (lectura declarada de la página): si el
//      tramo viejo no entra al cálculo, deducir lo cobrado sería descontarlo dos veces.
//   3. **La deducción del art. 255 se ACTUALIZA por IPC**: nunca puede salir igual al nominal
//      cuando hubo inflación en el medio. Es el hallazgo de la página.
//   4. **El piso del art. 255 es inviolable**: el resultado nunca puede quedar por debajo de la
//      indemnización del último período solo, por grande que sea la deducción actualizada.
//   5. **El art. 245 no se reimplementa**: sale de `nucleoArt245`, el mismo que usan
//      /indemnizacion y /indemnizacion-por-fallecimiento (regla de s85: dos páginas no pueden
//      publicar dos importes distintos para el mismo caso).
//   6. **Las citas dicen lo que dice la norma**, incluida la diferencia exacta entre el texto
//      vigente y el del DNU 70/2023: las nueve palabras del 3% anual.

import {
  ARTICULO_ANTIGUEDAD,
  ARTICULO_SUSTITUTIVO,
  ARTICULO_SUSTITUTIVO_ANTIGUEDAD,
  CORTE_ANIOS,
  INDEMNIZACIONES_ALCANZADAS,
  REINGRESO_FUENTES,
  REINGRESO_TEXTOS,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/reingreso";
import { antiguedadEntre, nucleoArt245 } from "../src/lib/indemnizacion";
import { ULTIMO_PERIODO, actualizarMonto } from "../src/lib/inflacion";
import { calcularReingreso } from "../src/lib/reingreso";

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

// ── 1. El corte de los dos años (art. 18) ──────────────────────────────────────────────────────
{
  check("el corte del art. 18 son dos años", CORTE_ANIOS === 2);
  check(
    "la cita del art. 18 trae la oración nueva del corte",
    REINGRESO_TEXTOS.art18.includes(
      "Si transcurriese un plazo de dos (2) años entre el cese del vínculo laboral",
    ) && REINGRESO_TEXTOS.art18.includes("no será computada"),
    REINGRESO_TEXTOS.art18,
  );
  check(
    "…y su nota cita la sustitución por el art. 9º de la Ley 27.802",
    REINGRESO_TEXTOS.art18Nota.includes(`art. ${ARTICULO_SUSTITUTIVO_ANTIGUEDAD}`) &&
      REINGRESO_TEXTOS.art18Nota.includes("27.802"),
    REINGRESO_TEXTOS.art18Nota,
  );
  check("el artículo de la antigüedad es el 18", ARTICULO_ANTIGUEDAD === 18);

  // 23 meses de corte: la antigüedad vieja SÍ se computa.
  const dentro = calcularReingreso({
    mejorRemuneracion: BASE,
    ingresoAnterior: "2015-03-01",
    ceseAnterior: "2021-06-30",
    reingreso: "2023-05-30", // 23 meses después
    despido: "2026-08-31",
    cobradoAntes: 900_000,
  })!;
  check("a los 23 meses de corte, la antigüedad vieja se computa", !dentro.cortaLaAntiguedad, {
    meses: dentro.mesesDeCorte,
  });

  // 24 meses justos: ya no se computa.
  const fuera = calcularReingreso({
    mejorRemuneracion: BASE,
    ingresoAnterior: "2015-03-01",
    ceseAnterior: "2021-06-30",
    reingreso: "2023-06-30", // 24 meses justos
    despido: "2026-08-31",
    cobradoAntes: 900_000,
  })!;
  check("a los 24 meses justos, la antigüedad vieja QUEDA AFUERA", fuera.cortaLaAntiguedad, {
    meses: fuera.mesesDeCorte,
  });
  check(
    "y en ese caso sólo se computa la última etapa",
    fuera.antiguedadComputada.totalMeses === fuera.etapaActual.totalMeses,
    fuera.antiguedadComputada,
  );
  check(
    "el caso del corte levanta un aviso bloqueante que nombra al art. 18",
    fuera.avisos.some((a) => a.tono === "bloqueante" && /artículo 18/.test(a.texto)),
    fuera.avisos,
  );
  check(
    "cortar la antigüedad achica la indemnización frente al caso que no corta",
    fuera.indemnizacionBruta < dentro.indemnizacionBruta,
    { fuera: fuera.indemnizacionBruta, dentro: dentro.indemnizacionBruta },
  );

  // ── 2. Cortada la antigüedad, no se deduce nada ──────────────────────────────────────────────
  check("cortada la antigüedad, la deducción es cero", fuera.deduccionNominal === 0);
  check(
    "…y la página lo dice explícitamente en vez de esconderlo",
    fuera.avisos.some((a) => /tampoco se deduce/.test(a.texto)),
  );
  check(
    "cortada la antigüedad, el resultado es la indemnización de la última etapa",
    casi(fuera.indemnizacionFinal, fuera.pisoUltimoPeriodo),
  );
}

// ── 3. La deducción se actualiza por IPC ───────────────────────────────────────────────────────
{
  const r = calcularReingreso({
    mejorRemuneracion: BASE,
    ingresoAnterior: "2015-03-01",
    ceseAnterior: "2021-06-30",
    reingreso: "2022-09-01",
    despido: "2026-08-31",
    cobradoAntes: 900_000,
  })!;
  const esperado = actualizarMonto(900_000, "2021-06", ULTIMO_PERIODO)!;
  check(
    "la deducción actualizada usa el IPC entre el mes del cese y el último publicado",
    casi(r.deduccionActualizada, esperado.montoActualizado, 1),
    { calc: r.deduccionActualizada, esperado: esperado.montoActualizado },
  );
  check(
    "la actualización es MUCHO mayor que el nominal (es todo el punto de la página)",
    r.deduccionActualizada > r.deduccionNominal * 2,
    { nominal: r.deduccionNominal, actualizada: r.deduccionActualizada },
  );
  check(
    "el efecto de la actualización se informa como partida propia",
    casi(r.efectoActualizacion, r.deduccionActualizada - r.deduccionNominal),
  );
  check("se actualiza hasta el último IPC publicado", r.actualizadoHasta === ULTIMO_PERIODO);
  check(
    "la página avisa que el IPC llega hasta el último mes publicado",
    r.avisos.some((a) => /último IPC publicado/.test(a.texto)),
  );
  check(
    "la página avisa que la deducción NO es lo que se cobró, sino lo actualizado",
    r.avisos.some((a) => /no es lo que cobraste/.test(a.texto)),
  );
}

// ── 4. El piso del art. 255 es inviolable ──────────────────────────────────────────────────────
{
  // Deducción gigante: sin el piso, el resultado sería negativo.
  const r = calcularReingreso({
    mejorRemuneracion: BASE,
    ingresoAnterior: "2005-01-01",
    ceseAnterior: "2020-01-31",
    reingreso: "2021-01-01",
    despido: "2026-08-31",
    cobradoAntes: 5_000_000,
  })!;
  check("con una deducción enorme, el resultado crudo queda por debajo del piso", r.resultadoSinPiso < r.pisoUltimoPeriodo, {
    crudo: r.resultadoSinPiso,
    piso: r.pisoUltimoPeriodo,
  });
  check("…y el piso se aplica", r.pisoAplicado && casi(r.indemnizacionFinal, r.pisoUltimoPeriodo));
  check("el resultado final nunca es negativo", r.indemnizacionFinal > 0);
  check(
    "la página explica que ese piso es el que definió el resultado",
    r.avisos.some((a) => /piso del artículo 255/.test(a.texto)),
  );
  check(
    "el piso es la indemnización del último período calculada con el mismo núcleo del art. 245",
    casi(
      r.pisoUltimoPeriodo,
      nucleoArt245({
        ant: antiguedadEntre("2021-01-01", "2026-08-31"),
        mejorRemuneracion: BASE,
        enPeriodoPrueba: false,
      }).monto,
    ),
  );
}

// ── 5. El núcleo del art. 245 es el compartido ─────────────────────────────────────────────────
{
  const r = calcularReingreso({
    mejorRemuneracion: BASE,
    ingresoAnterior: "2015-03-01",
    ceseAnterior: "2021-06-30",
    reingreso: "2022-09-01",
    despido: "2026-08-31",
    cobradoAntes: 0,
  })!;
  check(
    "la indemnización bruta es base × años computables del núcleo compartido",
    casi(r.indemnizacionBruta, BASE * r.aniosComputables),
    { bruta: r.indemnizacionBruta, anios: r.aniosComputables },
  );
  check(
    "la antigüedad computada es la suma de las dos etapas",
    r.antiguedadComputada.totalMeses === r.etapaAnterior.totalMeses + r.etapaActual.totalMeses,
  );
  check("sin nada cobrado antes, no hay deducción", r.deduccionNominal === 0);
  check(
    "fechas incoherentes devuelven null en vez de un número inventado",
    calcularReingreso({
      mejorRemuneracion: BASE,
      ingresoAnterior: "2015-03-01",
      ceseAnterior: "2021-06-30",
      reingreso: "2026-09-01",
      despido: "2026-08-31",
      cobradoAntes: 0,
    }) === null,
  );
  check(
    "sueldo en cero devuelve null",
    calcularReingreso({
      mejorRemuneracion: 0,
      ingresoAnterior: "2015-03-01",
      ceseAnterior: "2021-06-30",
      reingreso: "2022-09-01",
      despido: "2026-08-31",
      cobradoAntes: 0,
    }) === null,
  );
}

// ── 6. Las citas y las fuentes ─────────────────────────────────────────────────────────────────
{
  const t = REINGRESO_TEXTOS;
  check(
    "el art. 255 vigente actualiza por IPC",
    t.vigente.includes("actualizado por el Índice de Precios al Consumidor (IPC)"),
  );
  check(
    "…y NO trae la tasa del 3% anual",
    !t.vigente.includes("3% anual"),
    t.vigente,
  );
  check(
    "el texto del DNU 70/2023 SÍ traía el 3% anual (es la única diferencia)",
    t.anteriorDnu.includes("con más una tasa de interés pura del 3% anual"),
  );
  check(
    "las dos versiones sólo se diferencian en esas nueve palabras",
    t.anteriorDnu.replace(" con más una tasa de interés pura del 3% anual", "") === t.vigente,
    { vigente: t.vigente.length, anterior: t.anteriorDnu.length },
  );
  check(
    "el piso del último período está en la cita",
    t.vigente.includes("En ningún caso la indemnización resultante podrá ser inferior"),
  );
  check(
    "la nota del art. 255 cita la sustitución por el art. 53 de la Ley 27.802",
    t.vigenteNota.includes(`art. ${ARTICULO_SUSTITUTIVO}`) && t.vigenteNota.includes("27.802"),
  );
  check(
    "la lista de indemnizaciones alcanzadas es la del artículo, taxativa",
    INDEMNIZACIONES_ALCANZADAS.map((i) => i.articulo).join(",") === "245,246,247,250,251,253,254",
    INDEMNIZACIONES_ALCANZADAS.map((i) => i.articulo),
  );
  check(
    "todas esas indemnizaciones están nombradas en la cita del artículo",
    INDEMNIZACIONES_ALCANZADAS.every((i) => t.vigente.includes(String(i.articulo))),
  );
  check(
    "la fecha de la reforma es el 6/3/2026 en las dos formas en que se publica",
    VIGENCIA_REFORMA === "6 de marzo de 2026" && VIGENCIA_REFORMA_ISO === "2026-03-06",
  );
  check(
    "todas las fuentes son oficiales",
    REINGRESO_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina|indec)\.gob\.ar\//.test(
        f.url,
      ),
    ),
    REINGRESO_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto ACTUALIZADO de la LCT",
    REINGRESO_FUENTES.lista.some((f) => f.url.includes("25552") && f.url.endsWith("texact.htm")),
  );
  check(
    "está citado el DNU 70/2023 como fuente del texto anterior",
    REINGRESO_FUENTES.lista.some((f) => f.url.includes("395521")),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(REINGRESO_FUENTES.consultadoEl),
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log("\nTodos los checks de reingreso OK (LCT arts. 18 y 255 · Ley 27.802).");
