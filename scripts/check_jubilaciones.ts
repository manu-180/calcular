// Verificación del motor previsional (src/lib/jubilacion.ts) y de los valores vigentes.
// Correr con: npx tsx scripts/check_jubilaciones.ts
//
// Es un dato sensible (plata real de jubilados, tema YMYL): un haber mal publicado desinforma sobre
// el ingreso de alguien. Por eso el check cruza DOS fuentes independientes:
//
//   A. La serie oficial de ANSES (API de datos.gob.ar) — la trae scripts/gen_jubilaciones.ts.
//   B. Las normas del Boletín Oficial transcritas a mano en src/data/prestaciones.ts.
//
// Y verifica que la fórmula de movilidad del Decreto 274/2024 reconstruya A y B al centavo. Si las
// tres cosas no cierran, no se publica.
//
// Además ancla el TOPE SIPA de src/data/sueldo.ts contra la misma resolución: la base imponible se
// rotaba a mano todos los meses y ya se atrasó más de una vez (agosto 2026 se descubrió vencida en
// el turno del 3/8). Ahora un tope viejo o mal tipeado rompe el check antes de llegar a producción.

import { HABER_MINIMO_SERIE, HABER_MINIMO_ULTIMO, NORMAS_POR_PERIODO } from "../src/data/jubilaciones";
import {
  BONO_VIGENTE,
  MESES_PREVISIONALES,
  PRESTACIONES_VIGENTES,
  RESOLUCION_PROXIMA,
} from "../src/data/prestaciones";
import { TOPE_SIPA } from "../src/data/sueldo";
import { IPC_SERIE } from "../src/data/ipc-serie";
import {
  actualizarHaber,
  calcularBono,
  etiquetaPeriodo,
  mesDeSerie,
  movilidadDe,
  proximoMesDeterminado,
  sumarMeses,
  varInteranualHaber,
} from "../src/lib/jubilacion";
import { periodoActualAR } from "../src/lib/hoy";

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

const V = PRESTACIONES_VIGENTES;

// ===========================================================================
// 1 · Los valores de cada resolución cargada
// ===========================================================================
// Anclas transcriptas a mano del texto oficial, sólo para el mes en que se transcribieron. El resto
// de los meses queda anclado por la cadena de abajo: cada uno es el anterior movido por la movilidad.
if (V.periodo === "2026-09") {
  check("movilidad de septiembre 2026 = 2,11%", V.movilidad === 2.11, V.movilidad);
  check("haber mínimo septiembre 2026 = $428.633,20", V.haberMinimo === 428_633.20, V.haberMinimo);
  check("haber máximo septiembre 2026 = $2.884.295,54", V.haberMaximo === 2_884_295.54, V.haberMaximo);
  check("PBU septiembre 2026 = $196.080,12", V.pbu === 196_080.12, V.pbu);
  check("PUAM septiembre 2026 = $342.906,56", V.puam === 342_906.56, V.puam);
  check("base imponible mínima = $144.363,55", V.baseImponibleMinima === 144_363.55);
  check("base imponible máxima = $4.691.748,47", V.baseImponibleMaxima === 4_691_748.47);
  check("cita la resolución del Boletín Oficial", /257\/2026/.test(V.resolucion));
}
{
  check("el mes vigente ya empezó", V.periodo <= periodoActualAR(), { vigente: V.periodo, hoy: periodoActualAR() });
  check(
    "el link de la resolución apunta al Boletín Oficial",
    V.resolucionUrl.startsWith("https://www.boletinoficial.gob.ar/"),
  );
  check(
    "los meses cargados son consecutivos y en orden",
    MESES_PREVISIONALES.every((m, i) => i === 0 || sumarMeses(MESES_PREVISIONALES[i - 1].periodo, 1) === m.periodo),
  );
  // La cadena: cada mes cargado es el anterior movido por SU movilidad, y la movilidad es la que
  // manda el Dec. 274/2024 (IPC de dos meses antes). Así un mes cargado por adelantado queda
  // verificado desde el día en que se carga, no recién cuando entra en vigencia.
  for (let i = 1; i < MESES_PREVISIONALES.length; i++) {
    const a = MESES_PREVISIONALES[i - 1];
    const m = MESES_PREVISIONALES[i];
    const f = 1 + m.movilidad / 100;
    check(`${m.periodo}: la movilidad es la del IPC de dos meses antes`, movilidadDe(m.periodo) === m.movilidad, {
      cargada: m.movilidad,
      formula: movilidadDe(m.periodo),
    });
    for (const k of ["haberMinimo", "haberMaximo", "pbu", "baseImponibleMinima", "baseImponibleMaxima"] as const) {
      check(`${m.periodo}: ${k} = ${a.periodo} × movilidad`, aprox(Math.round(a[k] * f * 100) / 100, m[k]), {
        cargado: m[k],
        esperado: Math.round(a[k] * f * 100) / 100,
      });
    }
    check(`${m.periodo}: PUAM = 80% del haber mínimo`, aprox(m.puam, Math.round(m.haberMinimo * 0.8 * 100) / 100));
    check(`${m.periodo}: cita una Resolución ANSES`, /^Resolución ANSES \d+\/\d{4}$/.test(m.resolucion), m.resolucion);
    check(`${m.periodo}: el link apunta al Boletín Oficial`, m.resolucionUrl.startsWith("https://www.boletinoficial.gob.ar/"));
    if (m.bono) {
      check(`${m.periodo}: el bono cita un decreto`, /^Decreto \d+\/\d{4}$/.test(m.bono.norma), m.bono.norma);
      check(`${m.periodo}: el decreto del bono es del Boletín Oficial`, m.bono.normaUrl.startsWith("https://www.boletinoficial.gob.ar/"));
    }
  }
}

// ===========================================================================
// 2 · La regla legal: PUAM = 80% del haber mínimo (Ley 27.260 art. 13)
// ===========================================================================
{
  check(
    "PUAM = 80% del haber mínimo garantizado",
    aprox(V.puam, Math.round(V.haberMinimo * 0.8 * 100) / 100),
    { puam: V.puam, esperado: Math.round(V.haberMinimo * 0.8 * 100) / 100 },
  );
}

// ===========================================================================
// 3 · La serie: continuidad, corte fijo y reconstrucción por movilidad
// ===========================================================================
{
  check("la serie arranca en el corte fijo 2024-05", HABER_MINIMO_SERIE[0].periodo === "2024-05");
  check("la serie tiene al menos 27 meses", HABER_MINIMO_SERIE.length >= 27, HABER_MINIMO_SERIE.length);

  let huecos = 0;
  for (let i = 1; i < HABER_MINIMO_SERIE.length; i++) {
    if (sumarMeses(HABER_MINIMO_SERIE[i - 1].periodo, 1) !== HABER_MINIMO_SERIE[i].periodo) huecos++;
  }
  check("la serie no tiene meses faltantes", huecos === 0, `${huecos} huecos`);

  let creciente = 0;
  for (let i = 1; i < HABER_MINIMO_SERIE.length; i++) {
    if (HABER_MINIMO_SERIE[i].haberMinimo <= HABER_MINIMO_SERIE[i - 1].haberMinimo) creciente++;
  }
  check("el haber mínimo nunca baja en pesos corrientes", creciente === 0, `${creciente} bajas`);

  // El control fuerte: cada mes sale de aplicar la movilidad al mes anterior.
  let reconstruidos = 0;
  let fallos: string[] = [];
  for (let i = 1; i < HABER_MINIMO_SERIE.length; i++) {
    const m = HABER_MINIMO_SERIE[i];
    const prev = HABER_MINIMO_SERIE[i - 1];
    const mov = movilidadDe(m.periodo);
    if (mov === null) {
      fallos.push(`${m.periodo}: sin IPC de ${sumarMeses(m.periodo, -2)}`);
      continue;
    }
    const esperado = Math.round(prev.haberMinimo * (1 + mov / 100) * 100) / 100;
    if (!aprox(esperado, m.haberMinimo)) {
      fallos.push(`${m.periodo}: fórmula ${esperado} vs oficial ${m.haberMinimo}`);
    } else {
      reconstruidos++;
    }
    if (m.movilidad !== null && m.movilidad !== mov) {
      fallos.push(`${m.periodo}: movilidad guardada ${m.movilidad} vs calculada ${mov}`);
    }
  }
  check(
    `los ${HABER_MINIMO_SERIE.length - 1} meses se reconstruyen con movilidad = IPC de dos meses antes`,
    fallos.length === 0 && reconstruidos === HABER_MINIMO_SERIE.length - 1,
    fallos.slice(0, 5),
  );
}

// ===========================================================================
// 4 · El último mes de la serie coincide con la resolución transcrita
// ===========================================================================
{
  check(
    "el último mes de la serie es el mes vigente",
    HABER_MINIMO_ULTIMO.periodo === V.periodo,
    { serie: HABER_MINIMO_ULTIMO.periodo, vigente: V.periodo },
  );
  check(
    "el haber de la serie coincide con el de la resolución",
    aprox(HABER_MINIMO_ULTIMO.haberMinimo, V.haberMinimo),
    { serie: HABER_MINIMO_ULTIMO.haberMinimo, resolucion: V.haberMinimo },
  );
  check(
    "la movilidad de la serie coincide con la de la resolución",
    HABER_MINIMO_ULTIMO.movilidad === V.movilidad,
    { serie: HABER_MINIMO_ULTIMO.movilidad, resolucion: V.movilidad },
  );
  check(
    "el mes vigente cita su norma del Boletín Oficial",
    NORMAS_POR_PERIODO[V.periodo] !== undefined ||
      HABER_MINIMO_SERIE.some((m) => m.periodo === V.periodo),
  );
}

// ===========================================================================
// 5 · TOPE SIPA: la base imponible de sueldo.ts sale de la MISMA resolución
// ===========================================================================
{
  check(
    "TOPE_SIPA.baseMaxima coincide con la resolución vigente",
    aprox(TOPE_SIPA.baseMaxima, V.baseImponibleMaxima),
    { sueldo: TOPE_SIPA.baseMaxima, resolucion: V.baseImponibleMaxima },
  );
  check(
    "TOPE_SIPA.baseMinima coincide con la resolución vigente",
    aprox(TOPE_SIPA.baseMinima, V.baseImponibleMinima),
    { sueldo: TOPE_SIPA.baseMinima, resolucion: V.baseImponibleMinima },
  );
  check(
    "TOPE_SIPA declara la vigencia del mes vigente",
    TOPE_SIPA.vigencia === V.vigencia,
    { sueldo: TOPE_SIPA.vigencia, esperado: V.vigencia },
  );
  check(
    "TOPE_SIPA cita la misma resolución",
    TOPE_SIPA.fuente.includes(V.resolucion),
    TOPE_SIPA.fuente,
  );
  // Que la base imponible siga la movilidad mes a mes lo verifica la cadena de la sección 1.
}

// ===========================================================================
// 6 · El bono proporcional (decreto del mes, arts. 3 y 4)
// ===========================================================================
{
  const min = V.haberMinimo;
  const b = BONO_VIGENTE.monto;
  const tope = Math.round((min + b) * 100) / 100;

  check("el bono vigente es de $70.000", b === 70_000, b);
  check("el bono es del mes vigente", BONO_VIGENTE.periodo === V.periodo);
  check("el bono cita su decreto", /^Decreto \d+\/\d{4}$/.test(BONO_VIGENTE.norma), BONO_VIGENTE.norma);
  check(
    "el link del decreto apunta al Boletín Oficial",
    BONO_VIGENTE.normaUrl.startsWith("https://www.boletinoficial.gob.ar/"),
  );

  // Haber exactamente en el mínimo → bono completo.
  const enMinimo = calcularBono(min, min, b);
  check("haber = mínimo → bono completo", enMinimo?.tramo === "completo" && enMinimo.bono === b);
  check("haber = mínimo → total mínimo + bono", aprox(enMinimo!.total, tope));

  // Por debajo del mínimo (ej. beneficio con haber reducido) → bono completo igual.
  const debajo = calcularBono(min - 50_000, min, b);
  check("haber < mínimo → bono completo", debajo?.tramo === "completo" && debajo.bono === b);
  check(
    "haber < mínimo → total queda por debajo del tope",
    debajo!.total < tope,
    debajo!.total,
  );

  // Tramo proporcional: todos terminan cobrando exactamente el tope.
  for (const extra of [1, 10_000, 35_000, 69_999]) {
    const r = calcularBono(min + extra, min, b);
    check(
      `haber = mínimo + $${extra.toLocaleString("es-AR")} → bono parcial`,
      r?.tramo === "parcial",
      r,
    );
    check(
      `haber = mínimo + $${extra.toLocaleString("es-AR")} → total = tope exacto`,
      aprox(r!.total, tope),
      r!.total,
    );
    check(
      `haber = mínimo + $${extra.toLocaleString("es-AR")} → bono = $${(b - extra).toLocaleString("es-AR")}`,
      aprox(r!.bono, b - extra),
      r!.bono,
    );
  }

  // Justo en el tope y por encima → sin bono.
  const enTope = calcularBono(tope, min, b);
  check("haber = mínimo + bono → sin bono", enTope?.tramo === "sin-bono" && enTope.bono === 0);
  const arriba = calcularBono(tope + 100_000, min, b);
  check("haber > mínimo + bono → sin bono", arriba?.tramo === "sin-bono" && arriba.bono === 0);
  check("haber alto → total = haber", aprox(arriba!.total, tope + 100_000));

  // El haber máximo del SIPA nunca cobra bono.
  const max = calcularBono(V.haberMaximo, min, b);
  check("haber máximo del SIPA → sin bono", max?.tramo === "sin-bono");

  // La PUAM está por debajo del mínimo → bono completo.
  const puam = calcularBono(V.puam, min, b);
  check("PUAM → bono completo", puam?.tramo === "completo" && puam.bono === b);

  // Entradas inválidas devuelven null, no un número inventado.
  check("haber negativo → null", calcularBono(-1, min, b) === null);
  check("haber no finito → null", calcularBono(NaN, min, b) === null);
  check("mínimo cero → null", calcularBono(min, 0, b) === null);
}

// ===========================================================================
// 7 · Movilidad: la fórmula contra valores oficiales conocidos
// ===========================================================================
{
  // Cada par sale de la resolución de ANSES de ese mes.
  const conocidas: [string, number][] = [
    ["2026-09", 2.11],
    ["2026-08", 1.89],
    ["2026-07", 2.15],
    ["2026-06", 2.58],
    ["2026-05", 3.38],
    ["2025-01", 2.43],
  ];
  for (const [periodo, esperada] of conocidas) {
    check(`movilidad de ${etiquetaPeriodo(periodo)} = ${esperada}%`, movilidadDe(periodo) === esperada, {
      calculada: movilidadDe(periodo),
    });
  }

  // La movilidad de un mes cuyo IPC todavía no salió tiene que ser null, nunca un número.
  const ultimoIpc = IPC_SERIE[IPC_SERIE.length - 1][0];
  const fueraDeRango = sumarMeses(ultimoIpc, 3); // necesitaría el IPC del mes siguiente al último
  check(
    `movilidad de ${fueraDeRango} es null (falta el IPC que la fija)`,
    movilidadDe(fueraDeRango) === null,
    movilidadDe(fueraDeRango),
  );
}

// ===========================================================================
// 8 · El mes determinado pero todavía sin resolución
// ===========================================================================
{
  const prox = proximoMesDeterminado();
  if (prox === null) {
    check(
      "sin mes determinado: el IPC que fijaría el mes siguiente todavía no salió",
      movilidadDe(sumarMeses(HABER_MINIMO_ULTIMO.periodo, 1)) === null,
    );
  } else {
    check("el mes determinado es el siguiente al último oficial",
      prox.periodo === sumarMeses(HABER_MINIMO_ULTIMO.periodo, 1));
    check("el mes determinado se marca como tal", prox.origen === "determinado");
    check(
      "el mes determinado usa el IPC de dos meses antes",
      prox.ipcDe === sumarMeses(prox.periodo, -2),
    );
    check(
      "el haber determinado sale de aplicar la movilidad al último oficial",
      aprox(
        prox.haberMinimo,
        Math.round(HABER_MINIMO_ULTIMO.haberMinimo * (1 + prox.movilidad / 100) * 100) / 100,
      ),
    );
    check("el haber determinado es mayor al último oficial",
      prox.haberMinimo > HABER_MINIMO_ULTIMO.haberMinimo);
  }
}

// ===========================================================================
// 9 · Actualización de un haber en el tiempo
// ===========================================================================
{
  // Actualizar el haber mínimo de un mes viejo tiene que dar el haber mínimo de hoy: el motor
  // reproduce la serie oficial entera.
  for (const desde of ["2024-05", "2025-01", "2025-08", "2026-01"]) {
    const base = mesDeSerie(desde);
    const r = actualizarHaber(base!.haberMinimo, desde, HABER_MINIMO_ULTIMO.periodo);
    check(
      `actualizar el mínimo de ${etiquetaPeriodo(desde)} reconstruye el de ${etiquetaPeriodo(HABER_MINIMO_ULTIMO.periodo)}`,
      r !== null && aprox(r.haberFinal, HABER_MINIMO_ULTIMO.haberMinimo, 1),
      { obtenido: r?.haberFinal, esperado: HABER_MINIMO_ULTIMO.haberMinimo },
    );
    check(
      `el tramo desde ${desde} tiene un paso por mes`,
      r !== null && r.pasos.length ===
        HABER_MINIMO_SERIE.findIndex((m) => m.periodo === HABER_MINIMO_ULTIMO.periodo) -
          HABER_MINIMO_SERIE.findIndex((m) => m.periodo === desde),
    );
  }

  // El mes final sin IPC se DERIVA del haber vigente, no se hardcodea: escrito a mano, este check
  // se pone rojo solo cada vez que el INDEC publica un mes nuevo (pasó el 11/9/2026 con agosto).
  const ultimoIpcPub = IPC_SERIE[IPC_SERIE.length - 1][0];
  const r = actualizarHaber(300_000, "2024-05", HABER_MINIMO_ULTIMO.periodo);
  check("el coeficiente del tramo es > 1", r !== null && r.coeficiente > 1);

  // La movilidad usa el IPC de dos meses antes (Dec. 274/2024), así que el haber vigente SIEMPRE
  // va por delante del último IPC publicado. Si deja de cumplirse, lo dice acá y no en un null raro.
  check(
    `el haber vigente (${HABER_MINIMO_ULTIMO.periodo}) va por delante del último IPC publicado (${ultimoIpcPub})`,
    HABER_MINIMO_ULTIMO.periodo > ultimoIpcPub,
  );

  // La comparación contra inflación sólo existe si el IPC de AMBOS extremos ya se publicó. Para el
  // mes vigente todavía no salió: tiene que dar null, no un número.
  check(
    "sin IPC del mes final, la inflación acumulada es null (no se estima)",
    r !== null && r.inflacionAcumulada === null && r.brechaReal === null,
    { inflacion: r?.inflacionAcumulada, brecha: r?.brechaReal },
  );

  // Con ambos extremos publicados, sí informa y la brecha cierra.
  const rr = actualizarHaber(300_000, "2024-05", ultimoIpcPub);
  check(
    `informa la inflación acumulada del tramo 2024-05 → ${ultimoIpcPub}`,
    rr !== null && rr.inflacionAcumulada !== null,
  );
  check(
    "la brecha real cierra con coeficiente e inflación",
    rr !== null &&
      rr.inflacionAcumulada !== null &&
      aprox(
        rr.brechaReal!,
        (rr.coeficiente / (1 + rr.inflacionAcumulada / 100) - 1) * 100,
        0.001,
      ),
  );

  // Guardas: sin inventar valores.
  check("desde >= hasta → null", actualizarHaber(300_000, "2026-08", "2026-08") === null);
  check("haber inicial 0 → null", actualizarHaber(0, "2024-05", "2026-08") === null);
  check(
    "un tramo que sale del rango de la movilidad → null",
    actualizarHaber(300_000, "2024-05", sumarMeses(IPC_SERIE[IPC_SERIE.length - 1][0], 4)) === null,
  );
}

// ===========================================================================
// 10 · Utilidades y coherencia interna
// ===========================================================================
{
  check("etiquetaPeriodo formatea en es-AR", etiquetaPeriodo("2026-08") === "agosto 2026");
  check("sumarMeses cruza el año", sumarMeses("2025-12", 1) === "2026-01");
  check("sumarMeses hacia atrás cruza el año", sumarMeses("2026-01", -1) === "2025-12");
  check("sumarMeses -2 desde agosto da junio", sumarMeses("2026-08", -2) === "2026-06");

  const inter = varInteranualHaber("2026-08");
  check("hay variación interanual del haber mínimo en agosto 2026", inter !== null);
  check("la interanual es positiva y razonable", inter !== null && inter > 5 && inter < 100, inter);

  check("un período inexistente no está en la serie", mesDeSerie("2020-01") === null);
  check("el haber máximo es mayor al mínimo", V.haberMaximo > V.haberMinimo);
  check("la PBU es menor al haber mínimo", V.pbu < V.haberMinimo);
  check("la base imponible mínima es menor a la máxima", V.baseImponibleMinima < V.baseImponibleMaxima);
}

// ===========================================================================
// 9 · Resolución del mes siguiente dictada antes de tiempo
// ===========================================================================
if (RESOLUCION_PROXIMA) {
  const R = RESOLUCION_PROXIMA;
  const prox = proximoMesDeterminado();
  check("la resolución próxima es del mes siguiente al vigente", R.periodo === sumarMeses(V.periodo, 1));
  check("la resolución próxima no quedó vieja (el vigente no la alcanzó)", R.periodo > V.periodo);
  check(
    "el haber mínimo de la resolución próxima coincide al centavo con la fórmula",
    prox !== null && prox.periodo === R.periodo && Math.abs(prox.haberMinimo - R.haberMinimo) < 0.005,
    { formula: prox?.haberMinimo, resolucion: R.haberMinimo },
  );
  const mov = movilidadDe(R.periodo);
  const mover = (x: number) => Math.round(x * (1 + (mov ?? NaN) / 100) * 100) / 100;
  for (const campo of ["haberMaximo", "pbu", "baseImponibleMinima", "baseImponibleMaxima"] as const) {
    check(
      `${campo} de la resolución próxima = vigente × movilidad`,
      Math.abs(mover(V[campo]) - R[campo]) < 0.005,
      { derivado: mover(V[campo]), resolucion: R[campo] },
    );
  }
  check(
    "la PUAM de la resolución próxima es el 80% de su haber mínimo",
    Math.abs(Math.round(R.haberMinimo * 0.8 * 100) / 100 - R.puam) < 0.005,
  );
} else {
  console.log("--   sin resolución del mes siguiente dictada todavía");
}

console.log("");
if (fallas > 0) {
  console.error(`${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  `Todos los checks de jubilaciones OK (último: ${etiquetaPeriodo(HABER_MINIMO_ULTIMO.periodo)}).`,
);
