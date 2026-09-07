// Verificación de los datos y la lógica del cluster de convenios.
// Correr con: npx tsx scripts/check_convenios.ts
//
// Chequea: (1) consistencias internas de la escala oficial de Comercio que el propio PDF
// de FAECYS exhibe, (2) las propiedades aritméticas de los acuerdos (tramos, incorporación
// de los $120.000 en julio, +1,8%/+2% de UOCRA), y (3) los casos borde de las calculadoras.

import {
  CATEGORIAS_COMERCIO,
  COMERCIO_ASIGNACION_EXTRAORDINARIA_TOTAL,
  COMERCIO_INCORPORACION,
  COMERCIO_TRAMOS_ACUERDO_2026,
  MESES_COMERCIO,
} from "../src/data/convenios/comercio";
import {
  CATEGORIAS_UOCRA,
  MESES_UOCRA,
  UOCRA_HORAS_MES_PROMEDIO,
  ZONAS_UOCRA,
} from "../src/data/convenios/uocra";
import {
  calcularAguinaldoComercio,
  calcularComercio,
  calcularUocra,
} from "../src/lib/convenios";

let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

function aprox(a: number, b: number, tol = 0.01) {
  return Math.abs(a - b) < tol;
}

// ===========================================================================
// COMERCIO — consistencia interna de la escala oficial
// ===========================================================================

for (const mes of MESES_COMERCIO) {
  const b = mes.basicos;
  check(
    `comercio ${mes.id}: Cajeros B = Administrativo C (propiedad de la escala FAECYS)`,
    b["cajeros-b"] === b["administrativo-c"]
  );
  check(
    `comercio ${mes.id}: Vendedor C = Administrativo E y Vendedor D = Administrativo F`,
    b["vendedor-c"] === b["administrativo-e"] && b["vendedor-d"] === b["administrativo-f"]
  );
  check(
    `comercio ${mes.id}: Vendedor A = Cajeros A = Auxiliar A`,
    b["vendedor-a"] === b["cajeros-a"] && b["cajeros-a"] === b["auxiliar-a"]
  );
}

check(
  "comercio: Auxiliar especializado B ≠ Vendedor B (difieren $3 en la escala oficial — no unificar)",
  MESES_COMERCIO[0].basicos["auxiliar-especializado-b"] === 1_117_922 &&
    MESES_COMERCIO[0].basicos["vendedor-b"] === 1_117_925
);

// Tramos de mayo y junio: ambos son 1,5% de la MISMA base (básico marzo + $100.000 no rem),
// así que el incremento en pesos de mayo y el de junio deben ser iguales (±$2 por redondeo
// de la tabla publicada).
const [abril, mayo, junio] = MESES_COMERCIO;
for (const cat of CATEGORIAS_COMERCIO) {
  const d1 = mayo.basicos[cat.id] - abril.basicos[cat.id];
  const d2 = junio.basicos[cat.id] - mayo.basicos[cat.id];
  if (Math.abs(d1 - d2) > 2) {
    check(`comercio tramos iguales mayo/junio — ${cat.id}`, false, { d1, d2 });
  }
}
check("comercio: tramos de mayo y junio iguales en las 21 categorías (±$2)", true);

check(
  "comercio: tramo Maestranza A = $17.337 = 1,5% de $1.155.795 (básico marzo + $100.000)",
  mayo.basicos["maestranza-a"] - abril.basicos["maestranza-a"] === 17_337 &&
    aprox(1_155_795 * 0.015, 17_336.93, 0.01)
);

// Acuerdo del 22/7/2026 (circular ACUERDO 07/2026): +1,9% julio, +3,8% agosto y +5,7%
// septiembre, NO acumulativos, sobre el total de junio (básico + $120.000). Este check no
// está anclado al calendario: sale de COMERCIO_TRAMOS_ACUERDO_2026 y de la escala de junio,
// que se verificó contra la circular anterior. Si algún básico se carga mal, no cierra.
{
  let exacto = true;
  for (const tramo of COMERCIO_TRAMOS_ACUERDO_2026) {
    const mes = MESES_COMERCIO.find((m) => m.id === tramo.mesId);
    if (!mes) {
      check(`comercio: falta el mes ${tramo.mesId} del acuerdo 07/2026`, false);
      exacto = false;
      continue;
    }
    for (const cat of CATEGORIAS_COMERCIO) {
      const baseJunio = junio.basicos[cat.id] + junio.noRemunerativo;
      const esperado = baseJunio * (1 + tramo.porcentaje / 100);
      const real = mes.basicos[cat.id] + mes.noRemunerativo;
      if (Math.abs(real - esperado) > 1) {
        exacto = false;
        check(`comercio ${tramo.mesId} = junio × ${tramo.porcentaje}% — ${cat.id}`, false, {
          esperado: Math.round(esperado),
          real,
        });
      }
    }
  }
  check(
    "comercio: los tramos +1,9% / +3,8% / +5,7% del acuerdo 07/2026 cierran en las 21 categorías (±$1)",
    exacto
  );
}

// La asignación extraordinaria por única vez: $25.000 en julio y agosto, y en ningún otro
// mes. Las dos cuotas tienen que sumar el bono de $50.000 que anunció el acuerdo.
{
  const conAsignacion = MESES_COMERCIO.filter((m) => (m.asignacionExtraordinaria ?? 0) > 0);
  const suma = conAsignacion.reduce((a, m) => a + (m.asignacionExtraordinaria ?? 0), 0);
  check(
    "comercio: la asignación extraordinaria está solo en julio y agosto de 2026",
    conAsignacion.length === 2 &&
      conAsignacion[0].id === "julio-2026" &&
      conAsignacion[1].id === "agosto-2026",
    { meses: conAsignacion.map((m) => m.id) }
  );
  check(
    `comercio: las dos cuotas suman el bono de ${COMERCIO_ASIGNACION_EXTRAORDINARIA_TOTAL}`,
    suma === COMERCIO_ASIGNACION_EXTRAORDINARIA_TOTAL,
    { suma }
  );
}

// Septiembre a noviembre: la circular publica UNA sola escala para los tres meses.
{
  const sep = MESES_COMERCIO.find((m) => m.id === "septiembre-2026")!;
  let iguales = true;
  for (const id of ["octubre-2026", "noviembre-2026"]) {
    const mes = MESES_COMERCIO.find((m) => m.id === id)!;
    for (const cat of CATEGORIAS_COMERCIO) {
      if (mes.basicos[cat.id] !== sep.basicos[cat.id]) iguales = false;
    }
    if (mes.noRemunerativo !== sep.noRemunerativo) iguales = false;
  }
  check("comercio: octubre y noviembre = septiembre (fila «SEPT.-NOV./2026»)", iguales);
}

// Diciembre: primer tramo de incorporación. $20.000 pasan al básico y el TOTAL no cambia.
{
  const sep = MESES_COMERCIO.find((m) => m.id === "septiembre-2026")!;
  const dic = MESES_COMERCIO.find((m) => m.id === "diciembre-2026")!;
  let ok = dic.noRemunerativo === sep.noRemunerativo - 20_000;
  for (const cat of CATEGORIAS_COMERCIO) {
    if (dic.basicos[cat.id] !== sep.basicos[cat.id] + 20_000) ok = false;
    if (
      dic.basicos[cat.id] + dic.noRemunerativo !==
      sep.basicos[cat.id] + sep.noRemunerativo
    )
      ok = false;
  }
  check("comercio: diciembre incorpora $20.000 al básico sin mover el total", ok);
}

// El cronograma de incorporación baja de a $20.000 hasta cero, sin saltos.
{
  let ok = COMERCIO_INCORPORACION[0].noRemunerativo === 120_000;
  for (let i = 1; i < COMERCIO_INCORPORACION.length; i++) {
    const salto =
      COMERCIO_INCORPORACION[i - 1].noRemunerativo - COMERCIO_INCORPORACION[i].noRemunerativo;
    if (salto !== 20_000) ok = false;
  }
  check(
    "comercio: el cronograma va de $120.000 a $0 de a $20.000 por mes",
    ok && COMERCIO_INCORPORACION.at(-1)!.noRemunerativo === 0
  );
}

// ===========================================================================
// COMERCIO — calculadora
// ===========================================================================

// Caso oficial: Vendedor B junio, sin antigüedad, jornada completa, sin presentismo →
// bruto = total de la tabla FAECYS (básico + $120.000).
{
  const r = calcularComercio({
    mesId: "junio-2026",
    categoriaId: "vendedor-b",
    aniosAntiguedad: 0,
    jornadaFactor: 1,
    conPresentismo: false,
  });
  check(
    "calculadora comercio: Vendedor B junio sin extras = total oficial $1.273.746",
    r !== null && aprox(r.bruto, 1_273_746)
  );
}

// Antigüedad 10 años: 10% sobre básico Y no remunerativo (instrucción FAECYS).
{
  const r = calcularComercio({
    mesId: "junio-2026",
    categoriaId: "maestranza-a",
    aniosAntiguedad: 10,
    jornadaFactor: 1,
    conPresentismo: false,
  });
  check(
    "calculadora comercio: antigüedad 10 años Maestranza A junio = 10% de (básico + $120.000)",
    r !== null && aprox(r.antiguedadTotal, (1_113_585 + 120_000) * 0.1)
  );
}

// Presentismo: 1/12 de (básico + no rem + antigüedad).
{
  const r = calcularComercio({
    mesId: "junio-2026",
    categoriaId: "maestranza-a",
    aniosAntiguedad: 0,
    jornadaFactor: 1,
    conPresentismo: true,
  });
  check(
    "calculadora comercio: presentismo sin antigüedad = (básico + no rem) / 12",
    r !== null && aprox(r.presentismoTotal, (1_113_585 + 120_000) / 12)
  );
}

// Jornada de 6 horas: 75% del básico y de las sumas (evidencia: escala de menores FAECYS,
// $75.000 + $15.000 = 75% de $100.000 + $20.000).
{
  const r = calcularComercio({
    mesId: "junio-2026",
    categoriaId: "vendedor-b",
    aniosAntiguedad: 0,
    jornadaFactor: 0.75,
    conPresentismo: false,
  });
  check(
    "calculadora comercio: jornada 6 hs = 75% de básico y de no remunerativo",
    r !== null && aprox(r.basico, 1_153_746 * 0.75) && aprox(r.noRemunerativo, 90_000)
  );
}

// Media jornada (4 hs): 50%.
{
  const r = calcularComercio({
    mesId: "junio-2026",
    categoriaId: "vendedor-b",
    aniosAntiguedad: 0,
    jornadaFactor: 0.5,
    conPresentismo: false,
  });
  check(
    "calculadora comercio: media jornada = 50%",
    r !== null && aprox(r.noRemunerativo, 60_000) && aprox(r.basico, 576_873)
  );
}

// Neto estimado: 17% sobre remunerativo, 3% sobre no remunerativo.
{
  const r = calcularComercio({
    mesId: "junio-2026",
    categoriaId: "maestranza-a",
    aniosAntiguedad: 0,
    jornadaFactor: 1,
    conPresentismo: false,
  });
  check(
    "calculadora comercio: neto = rem × 0,83 + no rem × 0,97",
    r !== null && aprox(r.neto, 1_113_585 * 0.83 + 120_000 * 0.97)
  );
}

// Agosto: bruto sin extras = el TOTAL de la tabla oficial (básico + no rem + asignación).
{
  const agosto = MESES_COMERCIO.find((m) => m.id === "agosto-2026")!;
  const r = calcularComercio({
    mesId: "agosto-2026",
    categoriaId: "vendedor-b",
    aniosAntiguedad: 0,
    jornadaFactor: 1,
    conPresentismo: false,
  });
  const totalOficial =
    agosto.basicos["vendedor-b"] + agosto.noRemunerativo + agosto.asignacionExtraordinaria!;
  check(
    `calculadora comercio: Vendedor B agosto sin extras = total oficial ${totalOficial}`,
    r !== null && aprox(r.bruto, totalOficial) && r.asignacionExtraordinaria === 25_000
  );
}

// La asignación extraordinaria NO integra la base de antigüedad ni de presentismo: la
// circular la excluye textualmente de las dos. Con 10 años, la antigüedad de agosto tiene
// que ser exactamente el 10% de (básico + no rem), sin tocar los $25.000.
{
  const agosto = MESES_COMERCIO.find((m) => m.id === "agosto-2026")!;
  const r = calcularComercio({
    mesId: "agosto-2026",
    categoriaId: "maestranza-a",
    aniosAntiguedad: 10,
    jornadaFactor: 1,
    conPresentismo: true,
  })!;
  const base = agosto.basicos["maestranza-a"] + agosto.noRemunerativo;
  check(
    "calculadora comercio: la asignación extraordinaria no suma antigüedad",
    aprox(r.antiguedadTotal, base * 0.1)
  );
  check(
    "calculadora comercio: la asignación extraordinaria no suma presentismo",
    aprox(r.presentismoTotal, (base * 1.1) / 12)
  );
  check(
    "calculadora comercio: el bruto de agosto = base × 1,1 × (1 + 1/12) + los $25.000 sueltos",
    aprox(r.bruto, base * 1.1 * (1 + 1 / 12) + 25_000)
  );

  // Y tampoco entra en el aguinaldo: el SAC de agosto tiene que dar igual que si la
  // asignación no existiera.
  const sac = calcularAguinaldoComercio(r);
  check(
    "aguinaldo comercio: la asignación extraordinaria queda fuera de la base del SAC",
    aprox(sac.sacBruto, (r.bruto - 25_000) / 2)
  );

  // Media jornada: la asignación también se paga proporcional (la escala de jornada
  // reducida de la circular la muestra en $18.750, el 75% de $25.000).
  const medio = calcularComercio({
    mesId: "agosto-2026",
    categoriaId: "maestranza-a",
    aniosAntiguedad: 0,
    jornadaFactor: 0.5,
    conPresentismo: false,
  })!;
  check(
    "calculadora comercio: la asignación extraordinaria es proporcional a la jornada",
    aprox(medio.asignacionExtraordinaria, 12_500)
  );
}

// Inválidos.
check(
  "calculadora comercio: mes inexistente → null",
  calcularComercio({
    mesId: "marzo-2026",
    categoriaId: "vendedor-b",
    aniosAntiguedad: 0,
    jornadaFactor: 1,
    conPresentismo: true,
  }) === null
);
check(
  "calculadora comercio: categoría inexistente → null",
  calcularComercio({
    mesId: "junio-2026",
    categoriaId: "gerente",
    aniosAntiguedad: 0,
    jornadaFactor: 1,
    conPresentismo: true,
  }) === null
);
check(
  "calculadora comercio: antigüedad negativa o absurda → null",
  calcularComercio({
    mesId: "junio-2026",
    categoriaId: "vendedor-b",
    aniosAntiguedad: -1,
    jornadaFactor: 1,
    conPresentismo: true,
  }) === null &&
    calcularComercio({
      mesId: "junio-2026",
      categoriaId: "vendedor-b",
      aniosAntiguedad: 80,
      jornadaFactor: 1,
      conPresentismo: true,
    }) === null
);

// ===========================================================================
// COMERCIO — aguinaldo (SAC) con sumas no remunerativas incluidas
// ===========================================================================

// Mejor mes del 1er semestre 2026 = junio (la escala sube cada mes). Vendedor B, jornada
// completa, sin antigüedad, con presentismo → mejor bruto = $1.379.892 (= total tabla × 13/12).
{
  const junioVB = calcularComercio({
    mesId: "junio-2026",
    categoriaId: "vendedor-b",
    aniosAntiguedad: 0,
    jornadaFactor: 1,
    conPresentismo: true,
  })!;
  const sac = calcularAguinaldoComercio(junioVB);

  check(
    "aguinaldo comercio: SAC = 50% del mejor bruto del semestre (incluye $120.000)",
    aprox(sac.sacBruto, junioVB.bruto / 2)
  );
  check(
    "aguinaldo comercio: SAC bruto Vendedor B junio 2026 = $689.946 (número del blog)",
    aprox(sac.sacBruto, 689_945.75, 1)
  );
  check(
    "aguinaldo comercio: SAC neto Vendedor B junio 2026 ≈ $581.755 (aportes duales 17%/3%)",
    aprox(sac.sacNeto, 581_754.97, 1)
  );
  // Diferenciador 1: incluir los $120.000 suma $65.000 de SAC bruto que muchos olvidan.
  check(
    "aguinaldo comercio: incluir el no remunerativo aporta $65.000 al SAC bruto",
    aprox(sac.sacNoRemunerativo, 65_000)
  );
  // Diferenciador 2: aplicar 17% plano sobre TODO el SAC descuenta de más (neto correcto mayor).
  check(
    "aguinaldo comercio: el neto dual es mayor que el del 17% plano (≈ +$9.100)",
    sac.sacNeto > junioVB.bruto / 2 * (1 - 0.17) &&
      aprox(sac.sacNeto - junioVB.bruto / 2 * (1 - 0.17), 9_100, 50)
  );
  // Proporcional por semestre incompleto: medio semestre → mitad del SAC.
  check(
    "aguinaldo comercio: medio semestre (proporción 0,5) = mitad del SAC",
    aprox(calcularAguinaldoComercio(junioVB, 0.5).sacBruto, sac.sacBruto / 2)
  );
}

// ===========================================================================
// UOCRA — propiedades aritméticas de los acuerdos
// ===========================================================================

const [uAbril, uMayo, uJunio, uJulio] = MESES_UOCRA;
const catsJornal = ["oficial-especializado", "oficial", "medio-oficial", "ayudante"] as const;

// Mayo = abril × 1,018 (zona A, redondeo de la tabla oficial ±$1).
for (const cat of catsJornal) {
  check(
    `uocra: mayo = abril × 1,018 — ${cat} zona A (±1)`,
    aprox(uMayo.jornales[cat].a, uAbril.jornales[cat].a * 1.018, 1)
  );
}
check(
  "uocra: sereno mayo zona A = abril × 1,018 (±1)",
  aprox(uMayo.serenoMensual.a, uAbril.serenoMensual.a * 1.018, 1)
);

// Julio = junio × 1,02 (zona A, ±$1).
for (const cat of catsJornal) {
  check(
    `uocra: julio = junio × 1,02 — ${cat} zona A (±1)`,
    aprox(uJulio.jornales[cat].a, uJunio.jornales[cat].a * 1.02, 1)
  );
}
check(
  "uocra: sereno julio zona A = junio × 1,02 (±1)",
  aprox(uJulio.serenoMensual.a, uJunio.serenoMensual.a * 1.02, 1)
);

// La SNR del sereno es igual a la del ayudante (así figura en las tablas firmadas).
{
  let igual = true;
  for (const mes of MESES_UOCRA) {
    for (const z of ZONAS_UOCRA) {
      if (mes.snr.sereno[z.id] !== mes.snr.ayudante[z.id]) igual = false;
    }
  }
  check("uocra: SNR del sereno = SNR del ayudante en todos los meses y zonas", igual);
}

// Lookup puntual contra la tabla firmada: Oficial junio zona C = $9.595.
check("uocra: Oficial junio zona C = $9.595 (tabla firmada)", uJunio.jornales.oficial.c === 9_595);

// ===========================================================================
// UOCRA — calculadora
// ===========================================================================

// Oficial junio zona A, mes promedio, sin extras: básico = jornal × 190,67 hs; bruto = básico + SNR.
{
  const r = calcularUocra({
    mesId: "junio-2026",
    categoriaId: "oficial",
    zonaId: "a",
    horasMes: UOCRA_HORAS_MES_PROMEDIO,
    conAsistencia: false,
    conAporteSindical: false,
  });
  const basicoEsperado = 5_703 * UOCRA_HORAS_MES_PROMEDIO;
  check(
    "calculadora uocra: Oficial junio zona A = jornal × horas + SNR",
    r !== null && aprox(r.basicoMensual, basicoEsperado) && aprox(r.bruto, basicoEsperado + 58_300)
  );
}

// Asistencia perfecta: +20% del básico.
{
  const r = calcularUocra({
    mesId: "junio-2026",
    categoriaId: "oficial",
    zonaId: "a",
    horasMes: 190,
    conAsistencia: true,
    conAporteSindical: false,
  });
  check(
    "calculadora uocra: asistencia perfecta = 20% del básico mensual",
    r !== null && aprox(r.asistenciaPerfecta, 5_703 * 190 * 0.2)
  );
}

// Sereno: mensual directo, las horas no influyen.
{
  const r = calcularUocra({
    mesId: "junio-2026",
    categoriaId: "sereno",
    zonaId: "a",
    horasMes: 1, // irrelevante para el sereno
    conAsistencia: false,
    conAporteSindical: false,
  });
  check(
    "calculadora uocra: sereno junio zona A = $881.193 mensuales (jornal null)",
    r !== null && r.basicoMensual === 881_193 && r.jornal === null && r.esMensual
  );
}

// Neto: 17% (+2% sindical opcional) sobre remunerativo; 3% sobre la SNR.
{
  const r = calcularUocra({
    mesId: "junio-2026",
    categoriaId: "ayudante",
    zonaId: "b",
    horasMes: 190,
    conAsistencia: false,
    conAporteSindical: true,
  });
  const rem = 5_409 * 190;
  check(
    "calculadora uocra: neto = rem × (1 − 0,19) + SNR × 0,97",
    r !== null && aprox(r.neto, rem * (1 - 0.19) + 55_900 * 0.97)
  );
}

// Zona C-Austral: lookup correcto (Of. especializado abril = $12.022).
{
  const r = calcularUocra({
    mesId: "abril-2026",
    categoriaId: "oficial-especializado",
    zonaId: "c-austral",
    horasMes: 100,
    conAsistencia: false,
    conAporteSindical: false,
  });
  check(
    "calculadora uocra: Of. especializado abril C-Austral usa jornal $12.022",
    r !== null && r.jornal === 12_022
  );
}

// Inválidos.
check(
  "calculadora uocra: zona inexistente → null",
  calcularUocra({
    mesId: "junio-2026",
    categoriaId: "oficial",
    zonaId: "d",
    horasMes: 190,
    conAsistencia: true,
    conAporteSindical: true,
  }) === null
);
check(
  "calculadora uocra: horas inválidas → null (0 y >300)",
  calcularUocra({
    mesId: "junio-2026",
    categoriaId: "oficial",
    zonaId: "a",
    horasMes: 0,
    conAsistencia: true,
    conAporteSindical: true,
  }) === null &&
    calcularUocra({
      mesId: "junio-2026",
      categoriaId: "oficial",
      zonaId: "a",
      horasMes: 500,
      conAsistencia: true,
      conAporteSindical: true,
    }) === null
);
// El id inválido es sintético a propósito: anclarlo a un mes real (era "agosto-2026") hace que
// el check se rompa solo el día que ese mes se carga. Regla 2-2: los checks no dependen del calendario.
check(
  "calculadora uocra: mes inexistente → null",
  calcularUocra({
    mesId: "mes-que-no-existe",
    categoriaId: "oficial",
    zonaId: "a",
    horasMes: 190,
    conAsistencia: true,
    conAporteSindical: true,
  }) === null
);
// Agosto 2026 sin SNR: el bruto tiene que ser 100% remunerativo (la SNR se absorbió al básico).
{
  const ago = calcularUocra({
    mesId: "agosto-2026",
    categoriaId: "oficial",
    zonaId: "a",
    horasMes: 190,
    conAsistencia: true,
    conAporteSindical: true,
  });
  check(
    "calculadora uocra: agosto 2026 calcula y su bruto no tiene SNR",
    ago !== null && ago.snr === 0 && ago.bruto > 0 && Math.abs(ago.bruto - ago.totalRemunerativo) < 1,
  );
}

// Sanidad de datos: las 21 categorías de comercio existen en los 4 meses; las 4+1 de UOCRA
// tienen jornal/mensual y SNR en las 4 zonas de los 4 meses.
{
  let completos = true;
  for (const mes of MESES_COMERCIO) {
    for (const cat of CATEGORIAS_COMERCIO) {
      if (typeof mes.basicos[cat.id] !== "number" || mes.basicos[cat.id] <= 0) completos = false;
    }
  }
  check(
    `datos comercio: 21 categorías × ${MESES_COMERCIO.length} meses completos y positivos`,
    completos
  );
}
{
  let completos = true;
  // La SNR puede ser 0 legítimamente (cuando el acuerdo la absorbe al básico, como en agosto
  // 2026), pero SOLO si el mes lo declara en `cambios` — así un 0 por olvido sigue siendo rojo.
  let snrCoherente = true;
  for (const mes of MESES_UOCRA) {
    const declaraAbsorcion = /absor/i.test(mes.cambios) && /no tiene SNR|NO tiene SNR/i.test(mes.cambios);
    for (const z of ZONAS_UOCRA) {
      for (const cat of CATEGORIAS_UOCRA) {
        const v = cat.mensual
          ? mes.serenoMensual[z.id]
          : mes.jornales[cat.id as (typeof catsJornal)[number]][z.id];
        if (typeof v !== "number" || v <= 0) completos = false;
        const snr = mes.snr[cat.id][z.id];
        if (typeof snr !== "number" || snr < 0) completos = false;
        if (snr === 0 && !declaraAbsorcion) snrCoherente = false;
      }
    }
  }
  check(
    `datos uocra: 5 categorías × 4 zonas × ${MESES_UOCRA.length} meses completos y positivos (jornal + SNR)`,
    completos,
  );
  check("datos uocra: si un mes tiene SNR en 0, lo declara explícitamente en `cambios`", snrCoherente);
}

// El acuerdo del 19/5/2026 fija agosto como +1,9% sobre julio MÁS la absorción de la SNR: por
// eso el salto es único y uniforme. Si alguna categoría/zona se cargara mal, el factor se
// desalinea — este check lo detecta sin depender de un valor hardcodeado por mes.
{
  const julio = MESES_UOCRA.find((m) => m.id === "julio-2026");
  const agosto = MESES_UOCRA.find((m) => m.id === "agosto-2026");
  if (julio && agosto) {
    const factores: number[] = [];
    for (const z of ZONAS_UOCRA) {
      for (const cat of catsJornal) factores.push(agosto.jornales[cat][z.id] / julio.jornales[cat][z.id]);
      factores.push(agosto.serenoMensual[z.id] / julio.serenoMensual[z.id]);
    }
    const min = Math.min(...factores);
    const max = Math.max(...factores);
    check(
      `uocra agosto 2026: el salto sobre julio es uniforme (${(min * 100 - 100).toFixed(2)}%–${(max * 100 - 100).toFixed(2)}%)`,
      max - min < 0.004 && min > 1.05 && max < 1.13,
    );
    check("uocra agosto 2026: sin SNR (absorbida al básico)", agosto.snr.ayudante.a === 0);
  } else {
    check("uocra: existen julio y agosto 2026", false);
  }
}

// ===========================================================================
// SUELDO-NETO/COMERCIO — valores de la página y diferenciador no-rem
// ===========================================================================

// Vendedor B junio con presentismo: neto de la tabla de referencia ≈ $1.163.510.
{
  const r = calcularComercio({
    mesId: "junio-2026",
    categoriaId: "vendedor-b",
    aniosAntiguedad: 0,
    jornadaFactor: 1,
    conPresentismo: true,
  });
  check(
    "sueldo-neto/comercio: Vendedor B junio neto ≈ $1.163.510 (con presentismo, jornada completa)",
    r !== null && aprox(r.neto, 1_163_510, 1)
  );
  // El neto real supera al que daría la fórmula del 83% (diferenciador de la página).
  check(
    "sueldo-neto/comercio: neto > bruto × 0,83 (no-remunerativo corrige la fórmula plana)",
    r !== null && r.neto > r.bruto * 0.83
  );
}

// Sanidad: las 21 categorías de junio tienen neto positivo (la tabla es completa).
{
  let todas = true;
  for (const cat of CATEGORIAS_COMERCIO) {
    const r = calcularComercio({
      mesId: "junio-2026",
      categoriaId: cat.id,
      aniosAntiguedad: 0,
      jornadaFactor: 1,
      conPresentismo: true,
    });
    if (!r || r.neto <= 0) todas = false;
  }
  check("sueldo-neto/comercio: las 21 categorías de junio tienen neto positivo", todas);
}

console.log(fallas === 0 ? "\nTODO OK" : `\n${fallas} FALLAS`);
process.exit(fallas === 0 ? 0 : 1);
