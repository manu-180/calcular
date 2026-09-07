// Verificación de la prestación por desempleo (src/data/desempleo.ts + src/lib/desempleo.ts).
// Correr con: npx tsx scripts/check_desempleo.ts
//
// EL CHECK QUE IMPORTA (ancla doble, sección 2): los montos de la prestación NO se cargan a mano
// acá — se derivan del SMVM (piso 50%, techo 100%). Esa derivación se verifica contra lo que ANSES
// publica por su cuenta para el 1/7/2026: piso $186.200 y techo $372.400. Dos fuentes oficiales
// independientes que cierran al peso ⇒ la regla está bien leída. Si el Consejo del Salario cambia
// la fórmula (pasó en 2023) y alguien sólo actualiza la escala, este check lo agarra.
//
// El resto verifica la forma de la escala del SMVM (una serie nominal argentina que baja es un
// tipeo, no un dato), los bordes de los dos tramos legales (art. 117 y 118) y casos completos
// calculados a mano.

import {
  DESEMPLEO_FUENTES,
  DESEMPLEO_FUENTES_LISTA,
  DESEMPLEO_TEXTOS,
  REGLAS_DESEMPLEO as R,
  SITUACION_LEGAL_DESEMPLEO,
  SMVM_SERIE,
  SMVM_ULTIMO,
  VIGENCIA_MUTUO_ACUERDO_ISO,
} from "../src/data/desempleo";
import {
  calcularDesempleo,
  cuotasPorCotizacion,
  porcentajeDeCuota,
  smvmVigente,
  DIAS_POR_CUOTA,
} from "../src/lib/desempleo";

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
// 1 · Forma de la escala del SMVM
// ===========================================================================
check(`escala con ${SMVM_SERIE.length} meses (≥ 10)`, SMVM_SERIE.length >= 10);

{
  let sinHuecos = true;
  let detalle = "";
  for (let i = 1; i < SMVM_SERIE.length; i++) {
    const [a, m] = SMVM_SERIE[i - 1].periodo.split("-").map(Number);
    const esperado = m === 12 ? `${a + 1}-01` : `${a}-${String(m + 1).padStart(2, "0")}`;
    if (SMVM_SERIE[i].periodo !== esperado) {
      sinHuecos = false;
      detalle = `esperaba ${esperado}, vino ${SMVM_SERIE[i].periodo}`;
      break;
    }
  }
  check("la escala es mensual, ordenada y sin huecos", sinHuecos, detalle);
}

check(
  "el SMVM nunca baja de un mes al siguiente",
  SMVM_SERIE.every((m, i) => i === 0 || m.mensual >= SMVM_SERIE[i - 1].mensual),
  SMVM_SERIE.map((m) => `${m.periodo}:${m.mensual}`).join(" "),
);

check(
  "el valor por hora es el mensual dividido 200, redondeado al peso",
  SMVM_SERIE.every((m) => Math.abs(m.porHora - m.mensual / 200) <= 1),
  SMVM_SERIE.filter((m) => Math.abs(m.porHora - m.mensual / 200) > 1),
);

// ===========================================================================
// 2 · ANCLA DOBLE — la derivación contra lo que publica ANSES por su cuenta
// ===========================================================================
{
  // ANSES, "Prestación por Desempleo para trabajadores en relación de dependencia":
  // "topes mínimo y máximo de $186.200 a $372.400 a partir del 1º de julio de 2026".
  const julio = SMVM_SERIE.find((m) => m.periodo === "2026-07");
  check("la escala tiene julio de 2026 (el mes del ancla de ANSES)", julio !== undefined);
  if (julio) {
    check(
      "piso de julio 2026 = 50% del SMVM = $186.200 (lo que publica ANSES)",
      casi(julio.mensual * R.pisoSobreSmvm, 186_200),
      julio.mensual * R.pisoSobreSmvm,
    );
    check(
      "techo de julio 2026 = 100% del SMVM = $372.400 (lo que publica ANSES)",
      casi(julio.mensual * R.techoSobreSmvm, 372_400),
      julio.mensual * R.techoSobreSmvm,
    );
  }
}

check("el porcentaje base es 75% (Res. 4/2026, art. 2)", R.porcentajeBase === 0.75);
check("el piso es el 50% del SMVM", R.pisoSobreSmvm === 0.5);

// ── Res. 4/2026 (B.O. 2/9/2026) — los bordes de la escala nueva, al peso ──────────────────────
// El laudo fija OCHO meses de una vez: si un refactor recorta la serie, la página vuelve a
// depender de una negociación que ya ocurrió y publica un número viejo.
{
  const bordes: Array<[string, number, number]> = [
    ["2026-09", 383_800, 1_919],
    ["2026-12", 406_400, 2_032],
    ["2027-04", 437_000, 2_185],
  ];
  for (const [periodo, mensual, porHora] of bordes) {
    const m = SMVM_SERIE.find((x) => x.periodo === periodo);
    check(`Res. 4/2026 · ${periodo} = $${mensual.toLocaleString("es-AR")} y $${porHora}/hora`,
      m?.mensual === mensual && m?.porHora === porHora, m);
  }
  check("la escala llega hasta abril de 2027 (último mes del laudo)", SMVM_ULTIMO.periodo === "2027-04", SMVM_ULTIMO);
}
check("el techo es el 100% del SMVM", R.techoSobreSmvm === 1);

// ===========================================================================
// 3 · Duración por cotizaciones (Ley 24.013, art. 117) — los bordes
// ===========================================================================
{
  const casos: Array<[number, number]> = [
    [0, 0],
    [5, 0],
    [6, 2],
    [11, 2],
    [12, 4],
    [23, 4],
    [24, 8],
    [35, 8],
    [36, 12],
    [120, 12],
  ];
  for (const [meses, esperado] of casos) {
    check(
      `${meses} meses cotizados → ${esperado} cuotas`,
      cuotasPorCotizacion(meses) === esperado,
      cuotasPorCotizacion(meses),
    );
  }
}

// ===========================================================================
// 4 · Escalonamiento por cuota (Ley 24.013, art. 118) — los bordes
// ===========================================================================
{
  const casos: Array<[number, number]> = [
    [1, 1],
    [4, 1],
    [5, 0.85],
    [8, 0.85],
    [9, 0.7],
    [12, 0.7],
  ];
  for (const [cuota, pct] of casos) {
    check(`cuota ${cuota} → ${pct * 100}%`, porcentajeDeCuota(cuota) === pct, porcentajeDeCuota(cuota));
  }
}

// ===========================================================================
// 5 · Casos completos, calculados a mano contra la escala de julio de 2026
//     (fecha fija: el resultado no puede depender del día en que corra el check)
// ===========================================================================
const JULIO = new Date("2026-07-15T12:00:00Z");
const SMVM_JUL = 372_400;
const PISO_JUL = 186_200;

{
  // Sueldo neto alto: el 75% se pasa del techo → todas las cuotas arrancan topeadas.
  const r = calcularDesempleo({
    mejorRemuneracionNeta: 800_000,
    mesesCotizados: 40,
    edad: 35,
    fecha: JULIO,
  });
  check("caso A · elegible", r.elegible);
  check("caso A · 12 cuotas", r.cuotas.length === 12, r.cuotas.length);
  check("caso A · base = 75% de 800.000 = 600.000", casi(r.base, 600_000), r.base);
  check("caso A · queda topeada al techo", r.topeInicial === "techo" && casi(r.prestacionOriginal, SMVM_JUL));
  check("caso A · cuota 1 = techo", casi(r.cuotas[0].monto, SMVM_JUL), r.cuotas[0].monto);
  check(
    "caso A · cuota 5 = 85% del techo",
    casi(r.cuotas[4].monto, SMVM_JUL * 0.85),
    r.cuotas[4].monto,
  );
  check(
    "caso A · cuota 9 = 70% del techo",
    casi(r.cuotas[8].monto, SMVM_JUL * 0.7),
    r.cuotas[8].monto,
  );
  const totalEsperado = SMVM_JUL * 4 + SMVM_JUL * 0.85 * 4 + SMVM_JUL * 0.7 * 4;
  check("caso A · total = 4×100% + 4×85% + 4×70%", casi(r.total, totalEsperado, 0.05), {
    total: r.total,
    totalEsperado,
  });
  check("caso A · sin extensión (35 años)", r.cuotasExtension === 0);
}

{
  // Sueldo bajo: el 75% cae por debajo del piso → el piso sostiene TODAS las cuotas y el
  // escalonamiento no descuenta nada. Es la regla que casi nadie explica.
  const r = calcularDesempleo({
    mejorRemuneracionNeta: 200_000,
    mesesCotizados: 40,
    edad: 30,
    fecha: JULIO,
  });
  check("caso B · base = 150.000 y queda elevada al piso", r.topeInicial === "piso" && casi(r.base, 150_000));
  check("caso B · todas las cuotas valen el piso", r.cuotas.every((c) => casi(c.monto, PISO_JUL)));
  check("caso B · total = 12 × piso", casi(r.total, PISO_JUL * 12, 0.05), r.total);
}

{
  // Extensión del Decreto 267/2006: 45 años suma 6 cuotas al 70% de la prestación original.
  const r = calcularDesempleo({
    mejorRemuneracionNeta: 800_000,
    mesesCotizados: 40,
    edad: 45,
    fecha: JULIO,
  });
  check("caso C · 18 cuotas (12 + 6 de extensión)", r.cuotas.length === 18, r.cuotas.length);
  check("caso C · las últimas 6 son de extensión", r.cuotas.slice(12).every((c) => c.tramo === "extension45"));
  check(
    "caso C · la cuota 13 vale el 70% de la prestación original",
    casi(r.cuotas[12].monto, SMVM_JUL * 0.7),
    r.cuotas[12].monto,
  );
  const r44 = calcularDesempleo({
    mejorRemuneracionNeta: 800_000,
    mesesCotizados: 40,
    edad: 44,
    fecha: JULIO,
  });
  check("caso C · a los 44 no hay extensión (el borde exacto)", r44.cuotas.length === 12);
}

{
  // Art. 115: los días que exceden los 90 se descuentan del total del período.
  const enPlazo = calcularDesempleo({
    mejorRemuneracionNeta: 800_000,
    mesesCotizados: 18,
    edad: 30,
    diasDesdeCese: 90,
    fecha: JULIO,
  });
  check("caso D · a los 90 días todavía no se descuenta nada", enPlazo.diasDescontados === 0 && enPlazo.cuotas.length === 4);

  const tarde = calcularDesempleo({
    mejorRemuneracionNeta: 800_000,
    mesesCotizados: 18,
    edad: 30,
    diasDesdeCese: 90 + DIAS_POR_CUOTA,
    fecha: JULIO,
  });
  check("caso D · 30 días de exceso se comen una cuota entera", tarde.cuotas.length === 3, tarde.cuotas.length);
  check(
    "caso D · el total en plazo se informa completo aunque se haya perdido una cuota",
    casi(tarde.totalSinDemora, enPlazo.total, 0.05),
    { totalSinDemora: tarde.totalSinDemora, enPlazo: enPlazo.total },
  );

  const parcial = calcularDesempleo({
    mejorRemuneracionNeta: 800_000,
    mesesCotizados: 18,
    edad: 30,
    diasDesdeCese: 90 + 15,
    fecha: JULIO,
  });
  check("caso D · 15 días de exceso dejan la última cuota a la mitad", parcial.cuotas.length === 4 && parcial.cuotas[3].dias === 15);
  check(
    "caso D · esa última cuota vale la mitad",
    casi(parcial.cuotas[3].monto, parcial.cuotas[2].monto / 2, 0.05),
    parcial.cuotas[3].monto,
  );
}

{
  // Menos de 6 meses cotizados: no corresponde (art. 113 inc. b).
  const r = calcularDesempleo({
    mejorRemuneracionNeta: 800_000,
    mesesCotizados: 5,
    edad: 30,
    fecha: JULIO,
  });
  check("caso E · con 5 meses de aportes no es elegible", !r.elegible && r.motivo !== null);
  check("caso E · no devuelve cuotas ni total", r.cuotas.length === 0 && r.total === 0);
}

// ===========================================================================
// 6 · El SMVM vigente se resuelve por fecha y avisa cuando la escala se quedó corta
// ===========================================================================
check(
  "smvmVigente(15/7/2026) devuelve el mes de julio",
  smvmVigente(JULIO).mes.periodo === "2026-07" && smvmVigente(JULIO).vencido === false,
  smvmVigente(JULIO).mes.periodo,
);
{
  const futuro = new Date(`${SMVM_ULTIMO.periodo}-01T12:00:00Z`);
  futuro.setMonth(futuro.getMonth() + 2);
  const v = smvmVigente(futuro);
  check(
    "dos meses después del último mes con norma, smvmVigente marca `vencido`",
    v.vencido === true && v.mes.periodo === SMVM_ULTIMO.periodo,
    v,
  );
}

// ===========================================================================
// 7 · Higiene de fuentes
// ===========================================================================
check(
  "todas las fuentes tienen URL oficial (boletinoficial / infoleg / argentina.gob / anses)",
  DESEMPLEO_FUENTES_LISTA.every((f) =>
    /^https:\/\/(www\.)?(boletinoficial|servicios\.infoleg|infoleg|argentina|anses)\.gob\.ar\//.test(f.url),
  ),
  DESEMPLEO_FUENTES_LISTA.map((f) => f.url),
);
check("las 6 fuentes están listadas", DESEMPLEO_FUENTES_LISTA.length === 6);
check(
  "la fuente del SMVM es la Resolución 4/2026 y apunta a su aviso del B.O.",
  DESEMPLEO_FUENTES.smvm.nombre.includes("Resolución 4/2026") &&
    DESEMPLEO_FUENTES.smvm.url.includes("346775/20260902"),
  DESEMPLEO_FUENTES.smvm,
);
check(
  "la resolución anterior queda citada (los meses hasta agosto de 2026 salen de ella)",
  DESEMPLEO_FUENTES.smvmAnterior.nombre.includes("Resolución 9/2025"),
);

// ── Situación legal de desempleo (art. 114) — el inciso i) del 6/3/2026 ────────────────────────
// ANCLA: todo el valor agregado de la página en s89 es que el mutuo acuerdo ENTRÓ en la lista.
// Si el inciso se pierde en un refactor, la página vuelve a decir lo que dice el resto de la web
// («por mutuo acuerdo no cobrás»), que hace cinco meses es falso. Y la renuncia del art. 240 tiene
// que seguir AFUERA: confundir las dos cosas sería el error simétrico, igual de caro.
check("el art. 114 tiene nueve supuestos", SITUACION_LEGAL_DESEMPLEO.length === 9);
check(
  "los incisos van de la a) a la i), sin saltos ni repetidos",
  SITUACION_LEGAL_DESEMPLEO.map((c) => c.inciso).join("") === "abcdefghi",
  SITUACION_LEGAL_DESEMPLEO.map((c) => c.inciso),
);
check(
  "el único marcado como nuevo es el i), el del mutuo acuerdo",
  SITUACION_LEGAL_DESEMPLEO.filter((c) => c.esNuevo).length === 1 &&
    SITUACION_LEGAL_DESEMPLEO.find((c) => c.esNuevo)?.inciso === "i" &&
    /mutuo acuerdo/i.test(SITUACION_LEGAL_DESEMPLEO.find((c) => c.esNuevo)?.supuesto ?? ""),
);
check(
  "la renuncia del art. 240 NO figura entre los supuestos",
  !SITUACION_LEGAL_DESEMPLEO.some((c) => /renuncia|240/i.test(`${c.supuesto} ${c.norma}`)),
);
check(
  "la cita del inciso i) remite al art. 241 de la 20.744",
  DESEMPLEO_TEXTOS.art114IncisoI.includes("mutuo acuerdo de las partes en los términos del artículo 241"),
);
check(
  "la nota de vigencia identifica al art. 99 de la Ley 27.802 y su B.O.",
  DESEMPLEO_TEXTOS.notaVigenciaIncisoI.includes("art. 99 de la Ley N° 27.802") &&
    DESEMPLEO_TEXTOS.notaVigenciaIncisoI.includes("06/03/2026"),
);
check("la fecha de vigencia es el 6/3/2026", VIGENCIA_MUTUO_ACUERDO_ISO === "2026-03-06");
check(
  "está citada la Ley 27.802 como fuente del inciso nuevo",
  DESEMPLEO_FUENTES_LISTA.some((f) => f.nombre.includes("27.802") && f.url.includes("423680")),
);
check(
  "la fecha de consulta de las fuentes es una fecha ISO",
  /^\d{4}-\d{2}-\d{2}$/.test(DESEMPLEO_FUENTES.consultadoEl),
);

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log(
    `Todos los checks de prestación por desempleo OK (SMVM con norma hasta ${SMVM_ULTIMO.periodo}).`,
  );
}
