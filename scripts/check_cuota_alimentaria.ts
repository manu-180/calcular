// Verificación del motor de cuota alimentaria (src/lib/cuota-alimentaria.ts).
// Correr con: npx tsx scripts/check_cuota_alimentaria.ts
//
// Es un tema YMYL y sensible: acá se verifica que la aritmética sea exacta contra los valores
// oficiales del INDEC y que los bordes NO devuelvan números inventados (que es el modo en que
// una herramienta así hace daño). Chequea: (1) el costo de un hijo por tramo sale igual a la
// canasta publicada; (2) varios hijos suman; (3) el prorrateo por capacidad (art. 666) da lo
// que dice la fórmula, incluidos los extremos 50/50 y "el otro no tiene ingresos"; (4) los
// hijos mayores de 12 NO se extrapolan; (5) los bordes devuelven null en vez de un número.

import { CANASTA_CRIANZA, CANASTA_CRIANZA_ULTIMO } from "../src/data/canasta-crianza";
import { calcularCuotaAlimentaria } from "../src/lib/cuota-alimentaria";
import {
  CUOTA_MES_DESDE,
  MESES_CUOTA,
  actualizacionHastaHoy,
  mesPorSlug,
  slugDeMes,
  varMensualCanasta,
  varMensualIPC,
} from "../src/lib/canasta-meses";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const aprox = (a: number, b: number, tol = 0.02) => Math.abs(a - b) < tol;

const U = CANASTA_CRIANZA_ULTIMO;

// ===========================================================================
// 1 · El costo sale de la canasta oficial, sin retoques
// ===========================================================================
for (const tramo of ["menor-1", "1-a-3", "4-a-5", "6-a-12"] as const) {
  const r = calcularCuotaAlimentaria({
    hijos: [{ tramo }],
    ingresoAlimentante: 1_000_000,
    ingresoOtro: null,
  });
  check(
    `un hijo ${tramo}: costo = canasta del INDEC (${U.valores[tramo].total})`,
    r !== null && aprox(r.costoTotal, U.valores[tramo].total),
    r?.costoTotal,
  );
  check(
    `un hijo ${tramo}: el desglose bienes + cuidado reconstruye el total`,
    r !== null && aprox(r.costoBienes + r.costoCuidado, r.costoTotal),
  );
}

// ===========================================================================
// 2 · Varios hijos suman (y el detalle acompaña)
// ===========================================================================
{
  const r = calcularCuotaAlimentaria({
    hijos: [{ tramo: "menor-1" }, { tramo: "6-a-12" }, { tramo: "6-a-12" }],
    ingresoAlimentante: 2_000_000,
    ingresoOtro: null,
  });
  const esperado = U.valores["menor-1"].total + U.valores["6-a-12"].total * 2;
  check("tres hijos: el costo total es la suma de sus tramos", r !== null && aprox(r.costoTotal, esperado), {
    dio: r?.costoTotal,
    esperado,
  });
  check("tres hijos: hijosComputados = 3", r?.hijosComputados === 3);
  check("tres hijos: detalle con 3 filas", r?.detalle.length === 3);
}

// ===========================================================================
// 3 · Prorrateo por capacidad económica (art. 666)
// ===========================================================================
{
  // Ingresos iguales ⇒ mitad y mitad, y la cuota coincide con la referencia "mitad".
  const r = calcularCuotaAlimentaria({
    hijos: [{ tramo: "6-a-12" }],
    ingresoAlimentante: 1_000_000,
    ingresoOtro: 1_000_000,
  });
  check("ingresos iguales: participación 50%", r !== null && aprox(r.participacion!, 0.5, 0.005));
  check(
    "ingresos iguales: la cuota estimada = la mitad del costo",
    r !== null && aprox(r.cuotaEstimada!, r.refMitad, 0.02),
  );
  check(
    "ingresos iguales: el % del ingreso está bien calculado",
    r !== null && aprox(r.pctIngreso!, (r.cuotaEstimada! / 1_000_000) * 100, 0.02),
  );
}
{
  // 75/25: el que gana el triple carga el 75% del costo.
  const r = calcularCuotaAlimentaria({
    hijos: [{ tramo: "1-a-3" }],
    ingresoAlimentante: 1_500_000,
    ingresoOtro: 500_000,
  });
  check("ingresos 3:1: participación 75%", r !== null && aprox(r.participacion!, 0.75, 0.005));
  check(
    "ingresos 3:1: cuota = 75% del costo del tramo",
    r !== null && aprox(r.cuotaEstimada!, U.valores["1-a-3"].total * 0.75, 0.05),
  );
}
{
  // El otro progenitor sin ingresos: el modelo llega a su límite correcto (costo completo),
  // no a un número mayor al costo.
  const r = calcularCuotaAlimentaria({
    hijos: [{ tramo: "4-a-5" }],
    ingresoAlimentante: 900_000,
    ingresoOtro: 0,
  });
  check("el otro sin ingresos: participación 100%", r !== null && aprox(r.participacion!, 1, 0.005));
  check(
    "el otro sin ingresos: la cuota nunca supera el costo total",
    r !== null && r.cuotaEstimada! <= r.costoTotal + 0.01,
  );
}
{
  // Sin el ingreso del otro no se prorratea: se devuelven referencias, no un número inventado.
  const r = calcularCuotaAlimentaria({
    hijos: [{ tramo: "6-a-12" }],
    ingresoAlimentante: 800_000,
    ingresoOtro: null,
  });
  check("sin ingreso del otro: no hay cuota estimada (null)", r !== null && r.cuotaEstimada === null);
  check("sin ingreso del otro: no hay participación (null)", r !== null && r.participacion === null);
  check(
    "sin ingreso del otro: quedan las referencias mitad y total",
    r !== null && aprox(r.refMitad, r.costoTotal / 2) && aprox(r.refTotal, r.costoTotal),
  );
}

// ===========================================================================
// 4 · Cuidado en especie (art. 660)
// ===========================================================================
{
  const conCuidadoDelOtro = calcularCuotaAlimentaria({
    hijos: [{ tramo: "menor-1" }],
    ingresoAlimentante: 1_000_000,
    ingresoOtro: 1_000_000,
    cuidadoLoEjerceElOtro: true,
  })!;
  const compartido = calcularCuotaAlimentaria({
    hijos: [{ tramo: "menor-1" }],
    ingresoAlimentante: 1_000_000,
    ingresoOtro: 1_000_000,
    cuidadoLoEjerceElOtro: false,
  })!;
  check(
    "cuidado del otro: su aporte en especie = todo el componente cuidado",
    aprox(conCuidadoDelOtro.aporteEnEspecieDelOtro, conCuidadoDelOtro.costoCuidado),
  );
  check(
    "cuidado compartido: el aporte en especie del otro es la mitad",
    aprox(compartido.aporteEnEspecieDelOtro, compartido.costoCuidado / 2),
  );
  check(
    "el régimen de cuidado no cambia el COSTO de crianza (sólo quién lo aporta)",
    aprox(conCuidadoDelOtro.costoTotal, compartido.costoTotal),
  );
}

// ===========================================================================
// 5 · Hijos sin tramo oficial: no se extrapola
// ===========================================================================
{
  const r = calcularCuotaAlimentaria({
    hijos: [{ tramo: "6-a-12" }, { tramo: "mayor-12" }],
    ingresoAlimentante: 1_000_000,
    ingresoOtro: 1_000_000,
  });
  check(
    "un hijo >12 no suma costo (el INDEC no publica ese tramo)",
    r !== null && aprox(r.costoTotal, U.valores["6-a-12"].total),
    r?.costoTotal,
  );
  check("un hijo >12 se reporta como sinTramoOficial", r?.hijosSinTramoOficial === 1);
  check("un hijo >12 no cuenta como computado", r?.hijosComputados === 1);
}
{
  const r = calcularCuotaAlimentaria({
    hijos: [{ tramo: "mayor-12" }],
    ingresoAlimentante: 1_000_000,
    ingresoOtro: 1_000_000,
  });
  check("todos los hijos >12: devuelve null (no hay nada oficial que estimar)", r === null);
}

// ===========================================================================
// 6 · Bordes: null en vez de números raros
// ===========================================================================
check(
  "sin hijos → null",
  calcularCuotaAlimentaria({ hijos: [], ingresoAlimentante: 1_000_000, ingresoOtro: null }) === null,
);
check(
  "ingreso del alimentante en 0 → null",
  calcularCuotaAlimentaria({ hijos: [{ tramo: "1-a-3" }], ingresoAlimentante: 0, ingresoOtro: null }) === null,
);
check(
  "ingreso del alimentante negativo → null",
  calcularCuotaAlimentaria({ hijos: [{ tramo: "1-a-3" }], ingresoAlimentante: -5, ingresoOtro: null }) === null,
);
check(
  "ingreso del alimentante NaN → null",
  calcularCuotaAlimentaria({ hijos: [{ tramo: "1-a-3" }], ingresoAlimentante: NaN, ingresoOtro: null }) === null,
);
check(
  "ingreso del otro negativo → null",
  calcularCuotaAlimentaria({ hijos: [{ tramo: "1-a-3" }], ingresoAlimentante: 100, ingresoOtro: -1 }) === null,
);

// ===========================================================================
// 7 · Un mes histórico explícito produce el costo de ESE mes
// ===========================================================================
{
  const dic25 = CANASTA_CRIANZA.find((m) => m.periodo === "2025-12")!;
  const r = calcularCuotaAlimentaria({
    hijos: [{ tramo: "6-a-12" }],
    ingresoAlimentante: 1_000_000,
    ingresoOtro: null,
    mes: dic25,
  });
  check(
    "mes explícito (diciembre 2025): usa la canasta de ese mes, no la última",
    r !== null && aprox(r.costoTotal, dic25.valores["6-a-12"].total) && r.mesEtiqueta === "diciembre 2025",
    r?.costoTotal,
  );
}

// ===========================================================================
// 6 · Páginas por mes (/cuota-alimentaria/[mes]) — URLs, slugs y aritmética derivada
// ===========================================================================
{
  check(
    "MESES_CUOTA arranca en el período de corte y llega al último mes publicado",
    MESES_CUOTA.length > 0 &&
      MESES_CUOTA[0].periodo === CUOTA_MES_DESDE &&
      MESES_CUOTA[MESES_CUOTA.length - 1].periodo === U.periodo,
    { primero: MESES_CUOTA[0]?.periodo, ultimo: MESES_CUOTA[MESES_CUOTA.length - 1]?.periodo },
  );

  check(
    "los meses publicados son un tramo contiguo de la serie oficial (sin huecos)",
    MESES_CUOTA.every(
      (m, i) => i === 0 || CANASTA_CRIANZA.indexOf(m) === CANASTA_CRIANZA.indexOf(MESES_CUOTA[i - 1]) + 1,
    ),
  );

  const slugs = MESES_CUOTA.map(slugDeMes);
  check("todos los slugs son únicos", new Set(slugs).size === slugs.length);
  check(
    "los slugs son URL-safe (minúsculas, sin espacios ni acentos raros)",
    slugs.every((s) => /^[a-záéíóú]+-\d{4}$/.test(s)),
    slugs.filter((s) => !/^[a-záéíóú]+-\d{4}$/.test(s)),
  );
  check(
    "mesPorSlug encuentra cada mes publicado y sólo esos",
    slugs.every((s, i) => mesPorSlug(s)?.periodo === MESES_CUOTA[i].periodo) &&
      mesPorSlug("enero-2019") === undefined,
  );

  // La variación mensual tiene que reconstruir el valor del mes desde el anterior.
  for (const m of MESES_CUOTA) {
    const prev = CANASTA_CRIANZA[CANASTA_CRIANZA.indexOf(m) - 1];
    const v = varMensualCanasta(m, "6-a-12");
    check(
      `variación mensual de ${m.periodo} reconstruye el total desde ${prev.periodo}`,
      v !== null && aprox(prev.valores["6-a-12"].total * (1 + v / 100), m.valores["6-a-12"].total, 0.5),
      v,
    );
  }

  // El coeficiente de actualización tiene que llevar el monto viejo al último publicado.
  for (const m of MESES_CUOTA) {
    const a = actualizacionHastaHoy(m, "6-a-12");
    check(
      `actualización ${m.periodo} → ${a.hasta.periodo} lleva el monto al valor de hoy`,
      a.hasta.periodo === U.periodo &&
        aprox(m.valores["6-a-12"].total * a.coeficiente, U.valores["6-a-12"].total, 0.5),
      a.coeficiente,
    );
  }
  check(
    "el último mes publicado no se 'actualiza' a sí mismo (coeficiente 1)",
    aprox(actualizacionHastaHoy(U, "6-a-12").coeficiente, 1, 1e-9),
  );

  // El IPC tiene que existir para cada mes publicado: sin eso la comparación no se muestra.
  const sinIPC = MESES_CUOTA.filter((m) => varMensualIPC(m.periodo) === null).map((m) => m.periodo);
  check("hay IPC mensual para todos los meses publicados", sinIPC.length === 0, sinIPC);
}

// ===========================================================================

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log(`Todos los checks de cuota alimentaria OK (canasta: ${U.etiqueta})`);
}
