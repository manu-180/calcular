// Verificación del salario mínimo, vital y móvil (src/data/salario-minimo.ts + src/lib/salario-minimo.ts).
// Correr con: npx tsx scripts/check_salario_minimo.ts
//
// LOS DOS CHECKS QUE IMPORTAN:
//
//   1. **La relación mensual ÷ porHora = 200 no es un supuesto nuestro.** La página afirma que el
//      valor por hora es el mensual dividido 200 horas, y de ahí sale todo el cálculo proporcional.
//      Eso se verifica mes por mes contra la escala publicada: si un mes no cierra, o la escala se
//      cargó mal o la resolución cambió el criterio, y en los dos casos hay que frenar.
//   2. **La tabla de derivados no puede divergir de las calculadoras que linkea.** Es una tabla que
//      dice "el piso del desempleo es el 50% del SMVM" al lado de una calculadora que usa su propia
//      constante: si alguien cambia una y no la otra, la página miente sobre su propio sitio. Acá
//      los factores se comparan contra las constantes REALES de cada módulo.

import { existsSync } from "node:fs";
import { join } from "node:path";

import { REGLAS_DESEMPLEO as R, SMVM_SERIE } from "../src/data/desempleo";
import { EMBARGO_ESCALON_SMVM, EMBARGO_PISO_SMVM } from "../src/data/descuentos-sueldo";
import { PRESTACIONES_PNC } from "../src/data/pnc";
import {
  DERIVADOS_SMVM,
  EDAD_ART_117,
  HORAS_MENSUALES_JORNADA_COMPLETA as HORAS_MES,
  JORNADA_LEGAL_SEMANAL as JORNADA,
  SMVM_FUENTES,
  SMVM_TEXTOS,
} from "../src/data/salario-minimo";
import { smvmVigente } from "../src/lib/desempleo";
import { calcularSalarioMinimo, mesDeEscala, variacionMensual } from "../src/lib/salario-minimo";

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
// 1 · La jornada legal y las horas mensuales que la resolución le asigna
// ===========================================================================
check("la jornada legal son 48 horas semanales", JORNADA === 48, JORNADA);
check("la jornada legal completa son 200 horas mensuales", HORAS_MES === 200, HORAS_MES);

{
  const fallan = SMVM_SERIE.filter((m) => m.mensual / m.porHora !== HORAS_MES);
  check(
    `el valor por hora es el mensual ÷ ${HORAS_MES} en los ${SMVM_SERIE.length} meses de la escala`,
    fallan.length === 0,
    fallan.map((m) => `${m.periodo}: ${m.mensual}/${m.porHora} = ${m.mensual / m.porHora}`),
  );
}

// ===========================================================================
// 2 · El cálculo proporcional — la respuesta que las notas no dan
// ===========================================================================
{
  const vig = smvmVigente().mes;

  const completa = calcularSalarioMinimo({ horasSemanales: JORNADA });
  check("jornada completa: el piso es el monto publicado", completa.mensual === vig.mensual, completa.mensual);
  check("jornada completa: la proporción es 1", completa.proporcion === 1);
  check("jornada completa: usa el mes vigente, no el último de la escala", completa.mes.periodo === vig.periodo, {
    usado: completa.mes.periodo,
    vigente: vig.periodo,
  });

  const media = calcularSalarioMinimo({ horasSemanales: JORNADA / 2 });
  check("media jornada: el piso es la mitad", casi(media.mensual, vig.mensual / 2), media.mensual);
  check("media jornada: el valor por hora NO se prorratea", media.porHora === vig.porHora, media.porHora);
  check(
    "media jornada: las dos vías (proporción y horas) dan el mismo piso",
    casi(media.mensual, media.mensualPorHoras, media.horasMensuales * 0.5),
    { porProporcion: media.mensual, porHoras: media.mensualPorHoras },
  );
  check("media jornada: 24 h semanales son 100 h mensuales", media.horasMensuales === 100, media.horasMensuales);

  const cuarto = calcularSalarioMinimo({ horasSemanales: 12 });
  check("un cuarto de jornada: el piso es el 25%", casi(cuarto.mensual, vig.mensual * 0.25), cuarto.mensual);

  const excede = calcularSalarioMinimo({ horasSemanales: 60 });
  check("por encima de la jornada legal el piso no sube", excede.mensual === vig.mensual, excede.mensual);
  check(
    "por encima de la jornada legal avisa que son horas extra",
    excede.avisos.some((a) => /horas extra/i.test(a.texto)),
  );

  const cero = calcularSalarioMinimo({ horasSemanales: 0 });
  check("con 0 horas el piso es 0 y no rompe", cero.mensual === 0 && cero.proporcion === 0);
}

// ===========================================================================
// 3 · Comparación contra el sueldo declarado
// ===========================================================================
{
  const vig = smvmVigente().mes;
  const debajo = calcularSalarioMinimo({ sueldoBruto: vig.mensual - 10_000 });
  check("un sueldo por debajo del piso se marca como tal", debajo.comparacion?.estado === "debajo");
  check(
    "la diferencia contra el piso es exacta",
    casi(debajo.comparacion?.diferencia ?? 0, -10_000),
    debajo.comparacion,
  );

  const igual = calcularSalarioMinimo({ sueldoBruto: vig.mensual });
  check("un sueldo igual al piso se marca 'igual'", igual.comparacion?.estado === "igual");

  const encima = calcularSalarioMinimo({ sueldoBruto: vig.mensual + 1 });
  check("un sueldo por encima del piso se marca 'encima'", encima.comparacion?.estado === "encima");

  const sinSueldo = calcularSalarioMinimo({});
  check("sin sueldo declarado no se compara nada", sinSueldo.comparacion === null);
}

// ===========================================================================
// 4 · Meses futuros: la escala mira hacia adelante y hay que decirlo
// ===========================================================================
{
  const ultimo = SMVM_SERIE[SMVM_SERIE.length - 1];
  const futuro = calcularSalarioMinimo({ periodo: ultimo.periodo });
  check(
    "un mes ya fijado por el laudo se resuelve con su propio monto",
    futuro.mes.periodo === ultimo.periodo && futuro.mensual === ultimo.mensual,
    futuro.mes,
  );
  check(
    "el último mes con norma avisa que después hace falta resolución nueva",
    futuro.avisos.some((a) => /resolución nueva/i.test(a.texto)),
  );
  check(
    "un período inexistente cae al mes vigente en vez de romper",
    mesDeEscala("1999-01").periodo === smvmVigente().mes.periodo,
  );
}

// ===========================================================================
// 5 · LOS DERIVADOS NO PUEDEN DIVERGIR DE LAS CALCULADORAS QUE LINKEAN
// ===========================================================================
{
  const factorDe = (concepto: string) =>
    DERIVADOS_SMVM.find((d) => d.concepto.includes(concepto))?.factor ?? null;

  check("piso del desempleo = el 50% que usa /desempleo", factorDe("Piso de la prestación") === R.pisoSobreSmvm);
  check("techo del desempleo = el 100% que usa /desempleo", factorDe("Techo de la prestación") === R.techoSobreSmvm);
  check(
    "parte inembargable = el piso que usa /descuentos-del-sueldo",
    factorDe("no se puede embargar") === EMBARGO_PISO_SMVM,
  );
  check(
    "escalón del embargo = el que usa /descuentos-del-sueldo",
    factorDe("Escalón del embargo") === EMBARGO_ESCALON_SMVM,
  );
  {
    const invalidez = PRESTACIONES_PNC.find((p) => p.topeIngresosEnSmvm !== null);
    check(
      "tope de la PNC = el que usa /pension-no-contributiva",
      factorDe("pensión no contributiva") === invalidez?.topeIngresosEnSmvm,
      { tabla: factorDe("pensión no contributiva"), pnc: invalidez?.topeIngresosEnSmvm },
    );
  }
  check("la garantía del art. 125 bis es del 82%", factorDe("82%") === 0.82);

  check("hay siete derivados listados", DERIVADOS_SMVM.length === 7, DERIVADOS_SMVM.length);
  const rotos = DERIVADOS_SMVM.filter(
    (d) => d.href !== null && !existsSync(join(process.cwd(), "src", "app", "(ar)", d.href.slice(1), "page.tsx")),
  );
  check("todos los derivados linkean a una página que existe", rotos.length === 0, rotos.map((d) => d.href));
  check(
    "todos los derivados citan una norma",
    DERIVADOS_SMVM.every((d) => d.norma.trim().length > 0),
  );
}

// ===========================================================================
// 6 · Textos verbatim — el ancla contra el resumen
// ===========================================================================
check(
  "el art. 116 define el mínimo por la jornada legal",
  SMVM_TEXTOS.art116.includes("en su jornada legal de trabajo"),
);
check(
  "el art. 117 fija el derecho desde los dieciocho años",
  SMVM_TEXTOS.art117.includes("mayor de dieciocho (18) años") && EDAD_ART_117 === 18,
);
check(
  "el art. 118 dice mensuales, diarios u horarios y separa las asignaciones",
  SMVM_TEXTOS.art118.includes("montos mensuales, diarios u horarios") &&
    SMVM_TEXTOS.art118.includes("son independientes del derecho"),
);
check(
  "el art. 119 prohíbe pagar menos «por ninguna causa»",
  SMVM_TEXTOS.art119.startsWith("Por ninguna causa podrán abonarse salarios inferiores"),
);
check(
  "el art. 120 deja la inembargabilidad salvo deudas alimentarias",
  SMVM_TEXTOS.art120.includes("inembargable") && SMVM_TEXTOS.art120.includes("deudas alimentarias"),
);
check(
  "la resolución excluye las asignaciones familiares",
  SMVM_TEXTOS.resolucionArt1.includes("excluidas las asignaciones familiares"),
);
check(
  "la resolución manda la proporción para los arts. 92 ter y 198",
  SMVM_TEXTOS.resolucionProporcion.includes("artículos 92 ter y 198") &&
    SMVM_TEXTOS.resolucionProporcion.includes("en su debida proporción"),
);
check(
  "el considerando prueba que la 4/2026 es un laudo, no un acuerdo",
  SMVM_TEXTOS.considerandoLaudo.includes("no se logró alcanzar un acuerdo") &&
    SMVM_TEXTOS.considerandoLaudo.includes("artículo 137"),
);

// ===========================================================================
// 7 · Variación y fuentes
// ===========================================================================
check("el primer mes de la escala no tiene variación", variacionMensual(SMVM_SERIE[0].periodo) === null);
{
  const segundo = SMVM_SERIE[1];
  const esperado =
    Math.round(((segundo.mensual / SMVM_SERIE[0].mensual) - 1) * 1000) / 10;
  check("la variación mensual se calcula contra el mes anterior", variacionMensual(segundo.periodo) === esperado);
}
check(
  "todas las variaciones de la escala son positivas (una serie nominal que baja es un tipeo)",
  SMVM_SERIE.slice(1).every((m) => (variacionMensual(m.periodo) ?? 0) > 0),
);

check(
  "todas las fuentes son oficiales (boletinoficial / infoleg)",
  SMVM_FUENTES.lista.every((f) =>
    /^https:\/\/(www\.)?(boletinoficial|servicios\.infoleg)\.gob\.ar\//.test(f.url),
  ),
  SMVM_FUENTES.lista.map((f) => f.url),
);
check(
  "la Res. 4/2026 es la primera fuente y apunta a su aviso del B.O.",
  SMVM_FUENTES.lista[0].nombre.includes("Resolución 4/2026") &&
    SMVM_FUENTES.lista[0].url.includes("346775/20260902"),
);
check("la fecha de consulta es una fecha ISO", /^\d{4}-\d{2}-\d{2}$/.test(SMVM_FUENTES.consultadoEl));

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log(
    `Todos los checks del salario mínimo OK (LCT arts. 116-120 · Res. CNEPySMVM 4/2026 · escala con norma hasta ${SMVM_SERIE[SMVM_SERIE.length - 1].periodo}).`,
  );
}
