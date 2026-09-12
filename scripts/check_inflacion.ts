// Casos de verificación de la lógica de inflación contra datos oficiales conocidos.
// Correr con: npx -y tsx scripts/check_inflacion.ts
//
// La vara: las inflaciones anuales calculadas desde la serie embebida tienen que
// coincidir (±0,15 p.p. por redondeo del índice) con las que publicó el INDEC.

import {
  actualizarMonto,
  ajustesAlquiler,
  aniosDisponibles,
  inflacionAcumuladaAnio,
  inflacionEntre,
  indiceDe,
  mesesEntre,
  sueldoVsInflacion,
  sumarMeses,
  tablaAnio,
  ultimosPeriodos,
  ULTIMO_PERIODO,
  variacionInteranual,
  variacionMensual,
} from "../src/lib/inflacion";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: string) {
  if (cond) {
    console.log(`  ✓ ${nombre}`);
  } else {
    fallas++;
    console.error(`  ✗ ${nombre}${detalle ? ` — ${detalle}` : ""}`);
  }
}
function cerca(a: number | null | undefined, b: number, tol: number): boolean {
  return typeof a === "number" && Math.abs(a - b) <= tol;
}

console.log("— check_inflacion —\n");

// 1) Inflaciones anuales publicadas por el INDEC (comunicados oficiales de cada año).
console.log("Anuales vs INDEC publicado:");
const PUBLICADAS: Record<number, number> = {
  2017: 24.8,
  2018: 47.6,
  2019: 53.8,
  2020: 36.1,
  2021: 50.9,
  2022: 94.8,
  2023: 211.4,
  2024: 117.8,
};
for (const [anio, esperado] of Object.entries(PUBLICADAS)) {
  const r = inflacionAcumuladaAnio(Number(anio));
  check(
    `inflación ${anio} ≈ ${esperado}%`,
    r !== null && r.completa && cerca(r.pct, esperado, 0.15),
    `calculado: ${r?.pct?.toFixed(2)}`
  );
}

// 2) Año en curso: acumulado parcial coherente con la serie.
console.log("\nAño en curso:");
const actual = inflacionAcumuladaAnio(2026);
const idxDic25 = indiceDe("2025-12");
const idxUlt = indiceDe(ULTIMO_PERIODO);
check(
  "acumulada 2026 es parcial y coincide con índices",
  actual !== null &&
    !actual.completa &&
    actual.hastaPeriodo === ULTIMO_PERIODO &&
    idxDic25 !== null &&
    idxUlt !== null &&
    cerca(actual.pct, (idxUlt / idxDic25 - 1) * 100, 1e-9)
);
// Variaciones mensuales tal como las PUBLICÓ el INDEC en su informe de cada mes (redondeadas
// a 1 decimal). Son el ancla oficial: la serie embebida tiene que reproducirlas.
// Al rotar el IPC se agrega la fila del mes nuevo; si falta, el check avisa pero NO pone rojo
// la suite (el dato de la serie ya viene de la API oficial vía gen_ipc_serie.ts).
const MENSUALES_PUBLICADAS: Record<string, number> = {
  "2026-05": 2.1, // informe ipc_06_26 (11/6/2026)
  "2026-06": 1.9, // informe ipc_07_26 (julio 2026)
  "2026-07": 2.1, // serie oficial 148.3_INIVELNAL_DICI_M_26 (12076,3937 vs 11826,4103 = 2,11%)
  "2026-08": 1.7, // informe ipc_09_26A1BE2DC4CD (11/9/2026): «alza mensual de 1,7% en agosto de 2026»
};
const publicadaUlt = MENSUALES_PUBLICADAS[ULTIMO_PERIODO];
if (publicadaUlt === undefined) {
  console.log(
    `  ⚠ AVISO: no hay variación publicada cargada para ${ULTIMO_PERIODO} — agregarla a ` +
      `MENSUALES_PUBLICADAS desde el informe del INDEC (calculado desde la serie: ` +
      `${variacionMensual(ULTIMO_PERIODO)?.toFixed(2)}%)`
  );
} else {
  check(
    `variación mensual de ${ULTIMO_PERIODO} ≈ ${publicadaUlt.toLocaleString("es-AR")}% (dato publicado por INDEC)`,
    cerca(variacionMensual(ULTIMO_PERIODO), publicadaUlt, 0.06),
    `calculado: ${variacionMensual(ULTIMO_PERIODO)?.toFixed(2)}`
  );
}
// Filas del año en curso = meses de la serie en ese año (se deriva del último período:
// así el check no se rompe solo cuando rota el IPC).
const anioUlt = Number(ULTIMO_PERIODO.slice(0, 4));
const mesesUlt = Number(ULTIMO_PERIODO.slice(5, 7));
check(
  `tablaAnio(${anioUlt}) tiene ${mesesUlt} filas (ene → ${ULTIMO_PERIODO})`,
  tablaAnio(anioUlt).length === mesesUlt
);
check(
  "interanual del último período = idx(abr26)/idx(abr25)",
  (() => {
    const a = indiceDe(sumarMeses(ULTIMO_PERIODO, -12));
    return a !== null && idxUlt !== null
      ? cerca(variacionInteranual(ULTIMO_PERIODO), (idxUlt / a - 1) * 100, 1e-9)
      : false;
  })()
);

// 3) Actualizador de montos: propiedades matemáticas.
console.log("\nActualizador de montos:");
const ida = actualizarMonto(100_000, "2024-01", ULTIMO_PERIODO);
check("actualizar 100k desde ene-2024 da un monto mayor", ida !== null && ida.montoActualizado > 100_000);
const vuelta = ida && actualizarMonto(ida.montoActualizado, ULTIMO_PERIODO, "2024-01");
check(
  "ida y vuelta devuelve el monto original",
  vuelta !== null && cerca(vuelta!.montoActualizado, 100_000, 1e-6)
);
const mismo = actualizarMonto(5000, "2023-05", "2023-05");
check("mismo período → factor 1", mismo !== null && cerca(mismo.factor, 1, 1e-12));
check("período inexistente → null", actualizarMonto(1000, "2010-01", "2024-01") === null);
check("monto inválido → null", actualizarMonto(0, "2024-01", "2024-02") === null);
check(
  "inflacionEntre coincide con el cociente de índices",
  (() => {
    const a = indiceDe("2022-12");
    const b = indiceDe("2023-12");
    return a !== null && b !== null
      ? cerca(inflacionEntre("2022-12", "2023-12"), (b / a - 1) * 100, 1e-9)
      : false;
  })()
);

// 4) Sueldo vs inflación.
console.log("\nSueldo vs inflación:");
const sueldo = sueldoVsInflacion(800_000, "2025-04", 1_000_000);
const factor12m = idxUlt !== null ? idxUlt / (indiceDe("2025-04") ?? NaN) : NaN;
check(
  "sueldo equivalente = sueldo × factor del período",
  sueldo !== null && cerca(sueldo.sueldoEquivalente, 800_000 * factor12m, 1e-6)
);
check(
  "gana ⟺ sueldoHoy ≥ equivalente",
  sueldo !== null && sueldo.gana === (1_000_000 >= sueldo.sueldoEquivalente)
);
const empata = sueldoVsInflacion(100, "2025-04", 100 * factor12m);
check("empate exacto → diferencia real 0%", empata !== null && cerca(empata.diferenciaRealPct, 0, 1e-9));
check("sueldo 0 → null", sueldoVsInflacion(0, "2025-04", 1) === null);

// 5) Ajuste de alquiler.
console.log("\nAjuste de alquiler:");
// Contrato julio 2025, trimestral: ajustes en oct-25 (jul/ago/sep), ene-26, abr-26, jul-26…
// Un ajuste con efecto en el mes E necesita el IPC de E-1: si todavía no salió, es el "próximo".
// Los esperados se derivan del último período de la serie para que el check no se rompie solo
// cuando rota el IPC (antes había que editarlo a mano cada mes).
const efectosEsperados: string[] = [];
let efecto = "2025-10";
while (sumarMeses(efecto, -1) <= ULTIMO_PERIODO) {
  efectosEsperados.push(efecto);
  efecto = sumarMeses(efecto, 3);
}
const proximoEsperado = efecto; // el primero que todavía no tiene IPC
const alq = ajustesAlquiler({ alquilerInicial: 500_000, periodoInicio: "2025-07", cadaMeses: 3 });
check(
  `trimestral jul-25: ${efectosEsperados.length} ajustes aplicados`,
  alq !== null && alq.ajustes.length === efectosEsperados.length
);
check(
  "fechas de efecto correctas",
  alq !== null &&
    alq.ajustes.map((a) => a.periodoEfecto).join(",") === efectosEsperados.join(",")
);
const f1 = (indiceDe("2025-09")! / indiceDe("2025-06")!) as number;
check(
  "primer ajuste usa IPC jun→sep 2025",
  alq !== null && cerca(alq.ajustes[0].alquilerNuevo, 500_000 * f1, 1e-6)
);
// Producto de los factores de cada ajuste: índice del mes previo al efecto sobre el de 3 meses antes.
const fTotal = efectosEsperados.reduce(
  (acc, e) => acc * (indiceDe(sumarMeses(e, -1))! / indiceDe(sumarMeses(e, -4))!),
  1
);
check(
  "alquiler vigente = inicial × producto de factores",
  alq !== null && cerca(alq.alquilerVigente, 500_000 * fTotal, 1e-6)
);
// `esperandoIpcDe` = el próximo IPC que falta publicar (último de la serie + 1), que es el
// primero de los que le faltan al ajuste pendiente.
const ipcQueFalta = sumarMeses(ULTIMO_PERIODO, 1);
check(
  `próximo ajuste ${proximoEsperado} esperando IPC de ${ipcQueFalta}, con estimación`,
  alq !== null &&
    alq.proximo !== null &&
    alq.proximo.periodoEfecto === proximoEsperado &&
    alq.proximo.esperandoIpcDe === ipcQueFalta &&
    alq.proximo.estimado !== null
);
// Contrato marzo 2026, trimestral: primer ajuste jun-26 usa IPC feb→may (ya publicado) → aplicado.
// Igual que arriba, los esperados se derivan del último período de la serie.
const efectos2: string[] = [];
let efecto2 = "2026-06";
while (sumarMeses(efecto2, -1) <= ULTIMO_PERIODO) {
  efectos2.push(efecto2);
  efecto2 = sumarMeses(efecto2, 3);
}
const f2Total = efectos2.reduce(
  (acc, e) => acc * (indiceDe(sumarMeses(e, -1))! / indiceDe(sumarMeses(e, -4))!),
  1
);
const alq2 = ajustesAlquiler({ alquilerInicial: 300_000, periodoInicio: "2026-03", cadaMeses: 3 });
check(
  `contrato nuevo: primer ajuste jun-26 aplicado con IPC de mayo (${efectos2.length} aplicado/s)`,
  alq2 !== null &&
    alq2.ajustes.length === efectos2.length &&
    alq2.ajustes[0].periodoEfecto === "2026-06" &&
    cerca(alq2.alquilerVigente, 300_000 * f2Total, 1e-6) &&
    alq2.proximo?.periodoEfecto === efecto2
);
// Semestral arrancando antes del inicio de la serie → null (falta índice base).
check(
  "inicio fuera de la serie → null",
  ajustesAlquiler({ alquilerInicial: 100, periodoInicio: "2016-12", cadaMeses: 6 }) === null
);
check(
  "periodicidad inválida → null",
  ajustesAlquiler({ alquilerInicial: 100, periodoInicio: "2025-01", cadaMeses: 0 }) === null
);
// Anual con historia larga: 2020-01 → ajustes en cada enero 2021..2026 = 6.
const alq3 = ajustesAlquiler({ alquilerInicial: 20_000, periodoInicio: "2020-01", cadaMeses: 12 });
check("anual 2020: 6 ajustes (ene-21 a ene-26)", alq3 !== null && alq3.ajustes.length === 6);

// 6) Utilitarios.
console.log("\nUtilitarios:");
check("sumarMeses cruza el año", sumarMeses("2025-11", 3) === "2026-02");
check("sumarMeses negativo", sumarMeses("2026-01", -2) === "2025-11");
check("mesesEntre", mesesEntre("2025-04", "2026-04") === 12 && mesesEntre("2026-04", "2025-04") === -12);
check("aniosDisponibles arranca en 2017 y llega a 2026", (() => {
  const a = aniosDisponibles();
  return a[0] === 2017 && a[a.length - 1] === 2026;
})());
check("ultimosPeriodos(13) devuelve 13 filas terminando en el último", (() => {
  const u = ultimosPeriodos(13);
  return u.length === 13 && u[u.length - 1].periodo === ULTIMO_PERIODO;
})());

console.log(fallas === 0 ? "\n✅ Todos los casos OK" : `\n❌ ${fallas} caso(s) fallaron`);
process.exit(fallas === 0 ? 0 : 1);
