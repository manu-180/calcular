// Verificación de la PLANILLA de Ganancias de sociedades — abre el .xlsx que se entrega, evalúa sus
// fórmulas con HyperFormula y compara impuesto, alícuotas, dividendos, carga total y quebrantos
// actualizados contra los motores del sitio (calcularGananciasSociedades y calcularQuebranto).
//
// POR QUÉ ASÍ: replicar las fórmulas en TypeScript deja afuera justo los bugs que importan (un
// MATCH contra el rango equivocado, una referencia corrida). Acá se evalúa el archivo real.
//
// Los bordes que más duelen en esta liquidación:
//   · la ganancia EXACTA en el límite de un tramo, y un peso más;
//   · el cierre en diciembre (año de inicio = año de cierre) contra cualquier otro mes;
//   · un quebranto cuyo ejercicio se inició antes del 1/1/2025 (no se actualiza) y uno vencido.
//
// Correr con: npx tsx scripts/check_planilla_ganancias_sociedades.ts  (o vía scripts/check-all.ts)

import path from "node:path";
import { existsSync } from "node:fs";
import {
  ALICUOTA_DIVIDENDOS,
  ULTIMO_ANIO_ESCALA,
  escalaDe,
  escalasDisponibles,
} from "../src/data/ganancias-sociedades";
import { calcularGananciasSociedades } from "../src/lib/ganancias-sociedades";
import { calcularQuebranto } from "../src/lib/quebrantos";
import {
  ARCHIVO_SOCIEDADES,
  CELDAS_SOC as C,
  COL_QUEBRANTO,
  FILA_TOTAL_QUEBRANTOS,
  HOJAS_SOC,
  MESES_SOC,
  QUEBRANTOS_FILAS,
  QUEBRANTO_F0,
} from "./gen_planilla_ganancias_sociedades";
import { abrirLibro, type LibroEvaluable } from "./evaluar_xlsx";

const ARCHIVO = path.join(process.cwd(), "private", ARCHIVO_SOCIEDADES);
let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const igual = (a: number, b: number) => Math.abs(a - b) < 0.005;
const casiIgual = (a: number, b: number) => Math.abs(a - b) < 1e-9;
/** Igual hasta donde llega el evaluador, con la misma tolerancia relativa que check_planilla_plazo_fijo.ts.
 *
 *  El impuesto determinado —el número que se declara— coincide al centavo en los 2.520 casos y se
 *  compara con `igual`. Lo que cuelga de él (ganancia después de impuesto, dividendos, retención,
 *  carga total) arrastra unos centavos sobre ganancias de miles de millones, y el desvío NO es del
 *  archivo: es de HyperFormula, el motor de fórmulas con el que este check evalúa el .xlsx. Resuelve
 *  `2000000000-626567197.85` como 1.373.432.802,2 donde Excel y JavaScript dan 1.373.432.802,15.
 *  El caso «el desvío que queda es del evaluador» de más abajo lo deja probado con esa resta literal,
 *  así que no se vuelve a buscar en las fórmulas.
 *
 *  1e-9 relativo son $1,37 sobre 1.373 millones. Un error de fórmula de verdad (un MATCH corrido, el
 *  tramo equivocado, el año de inicio mal) mueve millones: queda ocho órdenes de magnitud afuera. */
const cerca = (a: number, b: number) => Math.abs(a - b) <= Math.max(0.005, Math.abs(b) * 1e-9);
/** El desvío relativo más grande visto entre el archivo y el motor en toda la matriz. */
let desvioRelativo = 0;
/** El mismo desvío en pesos, para poder leerlo. */
let desvioMaximo = 0;
const ESCALAS = escalasDisponibles();
const L = HOJAS_SOC.liquidador;

/** Carga un ejercicio en el liquidador. El mes de cierre decide el año de inicio. */
function cargar(libro: LibroEvaluable, p: { mes: number; anioCierre: number; ganancia: number; quebrantos: number; distribuido: number }) {
  libro.cargar(L, {
    [C.mesCierre]: MESES_SOC[p.mes - 1],
    [C.anioCierre]: p.anioCierre,
    [C.ganancia]: p.ganancia,
    [C.quebrantos]: p.quebrantos,
    [C.distribuido]: p.distribuido,
  });
}

async function main() {
  check("el archivo entregable existe", existsSync(ARCHIVO), ARCHIVO);
  if (!existsSync(ARCHIVO)) process.exit(1);
  const libro = await abrirLibro(ARCHIVO);

  check(
    "tiene las hojas prometidas",
    [...Object.values(HOJAS_SOC), "Fuentes"].every((h) => libro.hojas.includes(h)),
    libro.hojas,
  );

  // ── 1. La tabla de escalas del archivo == src/data/ganancias-sociedades.ts ────────────
  let malTabla = 0;
  ESCALAS.forEach((e, i) => {
    const r = 3 + i;
    const esperado: (string | number | null)[] = [
      e.anio, e.tramos[0].hasta, e.tramos[1].hasta, e.tramos[1].fijo, e.tramos[2].fijo,
    ];
    esperado.forEach((v, j) => {
      const leido = libro.crudo(HOJAS_SOC.escalas, `${String.fromCharCode(65 + j)}${r}`);
      if (typeof v === "number" && typeof leido === "number" ? !casiIgual(v, leido) : leido !== v) malTabla++;
    });
    const coef = libro.crudo(HOJAS_SOC.escalas, `G${r}`);
    if (e.coeficiente === null ? coef !== null : !(typeof coef === "number" && casiIgual(coef, e.coeficiente))) malTabla++;
  });
  check("tabla de escalas del archivo == src/data/ganancias-sociedades.ts", malTabla === 0);
  check(
    "la tabla trae todos los años con escala y ninguno de más",
    libro.crudo(HOJAS_SOC.escalas, `A${3 + ESCALAS.length}`) === null && libro.crudo(HOJAS_SOC.escalas, "A3") === ESCALAS[0].anio,
  );

  // ── 2. MATRIZ del impuesto contra el motor ────────────────────────────────────────────
  // Las ganancias de borde: 0, un peso, cada límite exacto de cada escala, un peso más y uno menos.
  const bordes = new Set<number>([0, 1]);
  for (const e of ESCALAS) {
    for (const t of e.tramos) {
      if (t.hasta === null) continue;
      bordes.add(t.hasta);
      bordes.add(Math.round((t.hasta + 1) * 100) / 100);
      bordes.add(Math.round((t.hasta - 1) * 100) / 100);
    }
  }
  bordes.add(500_000_000);
  bordes.add(2_000_000_000);

  let casos = 0;
  let mal = 0;
  const primeros: string[] = [];
  // Meses de cierre: diciembre (inicio el mismo año) y junio (inicio el año anterior).
  for (const mes of [12, 6, 1]) {
    for (const anioCierre of ESCALAS.map((e) => e.anio).concat(ULTIMO_ANIO_ESCALA + 1)) {
      for (const distribuido of [0, 0.5, 1]) {
        for (const ganancia of bordes) {
          casos++;
          cargar(libro, { mes, anioCierre, ganancia, quebrantos: 0, distribuido });
          const anioInicio = mes === 12 ? anioCierre : anioCierre - 1;
          check0: {
            if (libro.numero(L, C.anioInicio) !== anioInicio) {
              mal++;
              if (primeros.length < 5) primeros.push(`año de inicio mal con cierre ${mes}/${anioCierre}`);
              break check0;
            }
            const esperado = calcularGananciasSociedades({
              gananciaNetaImponible: ganancia,
              anioInicioEjercicio: anioInicio,
              porcentajeDistribuido: distribuido,
            });
            if (!esperado) {
              // Sin escala para ese año de inicio, la planilla no puede inventar un impuesto.
              if (libro.numero(L, C.impuesto) !== 0) {
                mal++;
                if (primeros.length < 5) primeros.push(`inicio ${anioInicio} sin escala pero la planilla cobró impuesto`);
              }
              break check0;
            }
            const pares: [string, number, number][] = [
              ["impuesto", libro.numero(L, C.impuesto), esperado.impuesto],
              ["alícuota efectiva", libro.numero(L, C.efectiva), esperado.alicuotaEfectiva],
              ["alícuota marginal", libro.numero(L, C.marginal), esperado.alicuotaMarginal],
              ["después de impuesto", libro.numero(L, C.despuesImpuesto), esperado.gananciaDespuesDeImpuesto],
              ["dividendos", libro.numero(L, C.dividendos), esperado.dividendos],
              ["retención", libro.numero(L, C.retencion), esperado.retencionDividendos],
              ["carga total", libro.numero(L, C.cargaTotal), esperado.cargaTotal],
              ["carga total efectiva", libro.numero(L, C.cargaEfectiva), esperado.cargaTotalEfectiva],
            ];
            for (const [que, enArchivo, enMotor] of pares) {
              const porcentaje = que.includes("alícuota") || que.includes("efectiva");
              // El impuesto es el numero que se declara: tiene que dar al centavo. Lo que se deriva
              // de el se compara hasta donde llega el double (ver `cerca`).
              const exacto = que === "impuesto";
              const ok = porcentaje ? casiIgual(enArchivo, enMotor) : exacto ? igual(enArchivo, enMotor) : cerca(enArchivo, enMotor);
              if (!porcentaje) {
                desvioMaximo = Math.max(desvioMaximo, Math.abs(enArchivo - enMotor));
                if (Math.abs(enMotor) > 1) desvioRelativo = Math.max(desvioRelativo, Math.abs(enArchivo - enMotor) / Math.abs(enMotor));
              }
              if (!ok) {
                mal++;
                if (primeros.length < 5) {
                  primeros.push(`${que}: archivo ${enArchivo} vs motor ${enMotor} (cierre ${mes}/${anioCierre}, ganancia ${ganancia}, reparte ${distribuido})`);
                }
              }
            }
            const tramo = libro.valor(L, C.tramo);
            const esperadoTramo = `${Math.round(esperado.tramo.alicuota * 100)}%`;
            if (tramo !== esperadoTramo) {
              mal++;
              if (primeros.length < 5) primeros.push(`tramo: archivo ${String(tramo)} vs motor ${esperadoTramo}`);
            }
          }
        }
      }
    }
  }
  check(`la planilla da lo mismo que la calculadora en ${casos} casos`, mal === 0, primeros);
  // Las dos redes que hacen que `cerca` no pueda tapar un error de fórmula. Si alguna se pone roja,
  // no es redondeo: es una fórmula.
  check(
    `el desvío relativo máximo contra el motor es el del evaluador (${desvioRelativo.toExponential(1)}, máx. $${desvioMaximo.toFixed(2)})`,
    desvioRelativo < 1e-9,
    { desvioRelativo, desvioMaximo },
  );
  check("y en pesos no pasa de uno", desvioMaximo <= 1, desvioMaximo);
  // La prueba de que ese resto es del evaluador y no del .xlsx: la misma resta, escrita a mano.
  const hoja = libro.hf.getSheetId(L)!;
  libro.hf.setCellContents({ sheet: hoja, row: 200, col: 1 }, [["=2000000000-626567197.85"]]);
  const restaHF = libro.hf.getCellValue({ sheet: hoja, row: 200, col: 1 });
  check(
    "el desvío que queda es del evaluador: HyperFormula resuelve «2000000000-626567197.85» como 1373432802,2",
    restaHF === 1373432802.2 && 2000000000 - 626567197.85 === 1373432802.15,
    restaHF,
  );

  // ── 3. Los quebrantos descuentan de la base, y nunca más que la ganancia ──────────────
  cargar(libro, { mes: 12, anioCierre: ULTIMO_ANIO_ESCALA, ganancia: 500_000_000, quebrantos: 120_000_000, distribuido: 0 });
  const conQuebranto = calcularGananciasSociedades({
    gananciaNetaImponible: 380_000_000,
    anioInicioEjercicio: ULTIMO_ANIO_ESCALA,
    porcentajeDistribuido: 0,
  })!;
  check("la base resta el quebranto computado", igual(libro.numero(L, C.base), 380_000_000), libro.numero(L, C.base));
  check("el impuesto con quebranto == el motor sobre la base neta", igual(libro.numero(L, C.impuesto), conQuebranto.impuesto));

  cargar(libro, { mes: 12, anioCierre: ULTIMO_ANIO_ESCALA, ganancia: 100_000_000, quebrantos: 400_000_000, distribuido: 0 });
  check("un quebranto mayor que la ganancia no deja base negativa", libro.numero(L, C.base) === 0, libro.numero(L, C.base));
  check("sin base, no hay impuesto", libro.numero(L, C.impuesto) === 0);
  check("el quebranto computado se topea en la ganancia", igual(libro.numero(L, C.quebrantoComputado), 100_000_000));

  // ── 4. El error más caro: la tabla del año de cierre ──────────────────────────────────
  const GANANCIA = 500_000_000;
  cargar(libro, { mes: 6, anioCierre: ULTIMO_ANIO_ESCALA, ganancia: GANANCIA, quebrantos: 0, distribuido: 0 });
  const conInicio = calcularGananciasSociedades({ gananciaNetaImponible: GANANCIA, anioInicioEjercicio: ULTIMO_ANIO_ESCALA - 1, porcentajeDistribuido: 0 })!;
  const conCierre = calcularGananciasSociedades({ gananciaNetaImponible: GANANCIA, anioInicioEjercicio: ULTIMO_ANIO_ESCALA, porcentajeDistribuido: 0 })!;
  check("el impuesto de la fila «tabla correcta» es el del año de inicio", igual(libro.numero(L, C.impuestoInicio), conInicio.impuesto));
  check("el impuesto con la tabla del año de cierre es el de ese año", igual(libro.numero(L, C.impuestoCierre), conCierre.impuesto));
  check(
    "la diferencia es lo que se declararía de menos con la tabla equivocada",
    igual(libro.numero(L, C.diferenciaTabla), conInicio.impuesto - conCierre.impuesto),
    libro.numero(L, C.diferenciaTabla),
  );
  check("con la tabla equivocada se paga de MENOS (la diferencia es positiva)", libro.numero(L, C.diferenciaTabla) > 0);

  cargar(libro, { mes: 12, anioCierre: ULTIMO_ANIO_ESCALA, ganancia: GANANCIA, quebrantos: 0, distribuido: 0 });
  check("cerrando en diciembre no hay dos tablas: la diferencia es cero", libro.numero(L, C.diferenciaTabla) === 0);
  check("y el aviso lo dice", String(libro.valor(L, C.avisoTabla)).includes("diciembre"), libro.valor(L, C.avisoTabla));

  // ── 5. Quebrantos: la hoja replica calcularQuebranto ─────────────────────────────────
  const Q = HOJAS_SOC.quebrantos;
  const MONTO = 50_000_000;
  // Un quebranto por fila: alcanzado por el art. 190, no alcanzado (ejercicio iniciado en 2024),
  // vencido, en el último año computable, y con el cierre posterior al que se liquida.
  const origenes: { mes: number; anio: number; que: string }[] = [
    { mes: 12, anio: 2025, que: "ejercicio 2025 completo: se actualiza" },
    { mes: 6, anio: 2025, que: "cierra en junio de 2025: se inició en 2024, NO se actualiza" },
    { mes: 12, anio: 2019, que: "vencido: pasaron más de cinco ejercicios" },
    { mes: 12, anio: ULTIMO_ANIO_ESCALA - 5, que: "último ejercicio computable" },
    { mes: 12, anio: ULTIMO_ANIO_ESCALA + 1, que: "cierra después del ejercicio que se liquida" },
  ];
  const cierreLiquidado = `${ULTIMO_ANIO_ESCALA}-12`;
  cargar(libro, { mes: 12, anioCierre: ULTIMO_ANIO_ESCALA, ganancia: 0, quebrantos: 0, distribuido: 0 });

  let malQ = 0;
  const detalleQ: string[] = [];
  origenes.forEach((o, i) => {
    const r = QUEBRANTO_F0 + i;
    const vacias: Record<string, string | number> = {};
    for (let j = 0; j < QUEBRANTOS_FILAS; j++) vacias[`${COL_QUEBRANTO.monto}${QUEBRANTO_F0 + j}`] = 0;
    libro.cargar(Q, {
      ...vacias,
      [`${COL_QUEBRANTO.mes}${r}`]: MESES_SOC[o.mes - 1],
      [`${COL_QUEBRANTO.anio}${r}`]: o.anio,
      [`${COL_QUEBRANTO.monto}${r}`]: MONTO,
    });
    const computable = libro.numero(Q, `${COL_QUEBRANTO.computable}${r}`);
    const cierreOrigen = `${o.anio}-${String(o.mes).padStart(2, "0")}`;
    const esperado = calcularQuebranto({ monto: MONTO, cierreOrigen, cierreLiquidado });
    // Un cierre de origen posterior al liquidado no se puede computar: el motor devuelve null.
    const esperadoMonto = esperado === null ? 0 : esperado.actualizado;
    if (!igual(computable, esperadoMonto)) {
      malQ++;
      detalleQ.push(`${o.que}: archivo ${computable} vs motor ${esperadoMonto}`);
    }
    if (esperado && !igual(libro.numero(Q, `H${r}`), esperado.coeficiente)) {
      malQ++;
      detalleQ.push(`${o.que}: coeficiente ${libro.numero(Q, `H${r}`)} vs motor ${esperado.coeficiente}`);
    }
    if (igual(computable, esperadoMonto) && esperado && !esperado.vencido) {
      // El total de la hoja es lo único que ve el liquidador.
      if (!igual(libro.numero(Q, `${COL_QUEBRANTO.computable}${FILA_TOTAL_QUEBRANTOS}`), esperadoMonto)) {
        malQ++;
        detalleQ.push(`${o.que}: el total no coincide con la única fila cargada`);
      }
    }
  });
  check(`los ${origenes.length} quebrantos de borde dan lo mismo que calcularQuebranto`, malQ === 0, detalleQ);

  // El quebranto no alcanzado se computa nominal, el vencido en cero: lo que la hoja promete.
  libro.cargar(Q, { [`${COL_QUEBRANTO.monto}${QUEBRANTO_F0 + 1}`]: MONTO, [`${COL_QUEBRANTO.monto}${QUEBRANTO_F0 + 4}`]: 0 });
  check(
    "el quebranto de un ejercicio iniciado antes del corte se computa nominal",
    igual(libro.numero(Q, `${COL_QUEBRANTO.computable}${QUEBRANTO_F0 + 1}`), MONTO),
  );
  check(
    "y la hoja explica por qué no se actualiza",
    String(libro.valor(Q, `F${QUEBRANTO_F0 + 1}`)).startsWith("No:"),
    libro.valor(Q, `F${QUEBRANTO_F0 + 1}`),
  );
  check("el quebranto vencido computa cero", libro.numero(Q, `${COL_QUEBRANTO.computable}${QUEBRANTO_F0 + 2}`) === 0);

  // Varios quebrantos juntos: el total es la suma de los computables, y llega al liquidador.
  const todos: Record<string, string | number> = {};
  origenes.forEach((o, i) => {
    const r = QUEBRANTO_F0 + i;
    todos[`${COL_QUEBRANTO.mes}${r}`] = MESES_SOC[o.mes - 1];
    todos[`${COL_QUEBRANTO.anio}${r}`] = o.anio;
    todos[`${COL_QUEBRANTO.monto}${r}`] = MONTO;
  });
  libro.cargar(Q, todos);
  const sumaEsperada = origenes.reduce((acc, o) => {
    const e = calcularQuebranto({ monto: MONTO, cierreOrigen: `${o.anio}-${String(o.mes).padStart(2, "0")}`, cierreLiquidado });
    return acc + (e === null ? 0 : e.actualizado);
  }, 0);
  const total = libro.numero(Q, `${COL_QUEBRANTO.computable}${FILA_TOTAL_QUEBRANTOS}`);
  check("el total de la hoja es la suma de los computables", igual(total, sumaEsperada), { total, sumaEsperada });

  // ── 6. El 7% de los dividendos sale del dato, no de un número escrito a mano ──────────
  cargar(libro, { mes: 12, anioCierre: ULTIMO_ANIO_ESCALA, ganancia: 1_000_000_000, quebrantos: 0, distribuido: 1 });
  const todoRepartido = calcularGananciasSociedades({ gananciaNetaImponible: 1_000_000_000, anioInicioEjercicio: ULTIMO_ANIO_ESCALA, porcentajeDistribuido: 1 })!;
  check(
    `la retención es el ${Math.round(ALICUOTA_DIVIDENDOS * 100)}% de los dividendos`,
    igual(libro.numero(L, C.retencion), todoRepartido.retencionDividendos) &&
      igual(libro.numero(L, C.retencion), Math.round(libro.numero(L, C.dividendos) * ALICUOTA_DIVIDENDOS * 100) / 100),
  );
  check("lo que queda en mano es el dividendo menos la retención", igual(libro.numero(L, C.enMano), todoRepartido.dividendos - todoRepartido.retencionDividendos));

  // ── 7. Un año sin escala no inventa un impuesto ───────────────────────────────────────
  cargar(libro, { mes: 12, anioCierre: 2020, ganancia: 500_000_000, quebrantos: 0, distribuido: 0 });
  check("un ejercicio iniciado antes de la Ley 27.630 no tiene escala en el motor", escalaDe(2020) === undefined);
  check("y la planilla no cobra impuesto", libro.numero(L, C.impuesto) === 0, libro.numero(L, C.impuesto));
  check("la planilla lo dice en vez de mostrar un cero sin explicación", String(libro.valor(L, C.escala)).includes("no está en esta planilla"), libro.valor(L, C.escala));

  // ── 8. Los desplegables de mes traen los doce, sin comas ─────────────────────────────
  const v = libro.validacion(L, C.mesCierre);
  check("el mes de cierre es un desplegable en línea con los 12 meses", v?.type === "list" && MESES_SOC.every((m) => String(v.formulae?.[0] ?? "").includes(m)), v?.formulae);
}

main()
  .catch((e) => {
    fallas++;
    console.error(e);
  })
  .finally(() => {
    console.log(fallas === 0 ? "\n✅ check_planilla_ganancias_sociedades: todo OK" : `\n❌ check_planilla_ganancias_sociedades: ${fallas} falla(s)`);
    process.exit(fallas === 0 ? 0 : 1);
  });
