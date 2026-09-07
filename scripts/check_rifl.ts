// Verificación de la página del RIFL (Ley 27.802, Título XX, arts. 156-164 · Ley 27.541
// arts. 19, 22 y 23). Correr con: npx tsx scripts/check_rifl.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **La ventana del art. 156 se DERIVA de la fecha de publicación.** Si alguna vez alguien la
//      escribe a mano, o si el cálculo se corre un mes, la página miente sobre la única fecha que
//      obliga a actuar. Se verifica contra las dos puntas: 1/5/2026 y 30/4/2027.
//   2. **Los dos relojes no se pisan.** El beneficio de un alta hecha el último día de la ventana
//      llega hasta marzo de 2031 (48 meses contados desde el mes de inicio, ese mes inclusive).
//      Es la confusión que la página existe para deshacer.
//   3. **Las alícuotas comparadas son las de los MISMOS cuatro subsistemas.** El art. 19 de la
//      27.541 nombra INSSJP, FNE, SIPA y AAFF; el art. 159 adecua esos y sólo esos. Si el texto
//      guardado del art. 19 dejara de nombrarlos, la comparación deja de ser legítima.
//   4. **El ahorro no puede incluir obra social ni ART.** Se verifica que la reducción porcentual
//      sea exactamente (general − 5%) / general, sin ningún punto extra.
//   5. **La detracción no cambia el ahorro** (el art. 159 sólo reemplaza alícuotas): con y sin
//      detracción, la diferencia entre escenarios tiene que seguir el mismo porcentaje.
//   6. **El art. 162 tiene que seguir diciendo que NO hay uso retroactivo**, y el 160 que la
//      reincorporación dentro de los 12 meses queda afuera: son los dos «no» que más plata valen.
//   7. **Las cuatro puertas del art. 157 son cuatro y son alternativas.**

import {
  ALICUOTAS_GENERALES,
  ALICUOTA_RIFL_INSSJP,
  ALICUOTA_RIFL_SIPA_FNE_AAFF,
  ALICUOTA_RIFL_TOTAL,
  ANIOS_VENTANA,
  DETRACCION_ART22,
  DETRACCION_ART22_ESPECIAL,
  DETRACCION_ART23_NOMINA_CHICA,
  DETRACCION_ART23_TOPE_EMPLEADOS,
  EXCLUSIONES_ART160,
  LEY_PUBLICADA_ISO,
  MESES_BENEFICIO,
  PUERTAS_ART157,
  RIFL_FUENTES,
  RIFL_TEXTOS,
} from "../src/data/rifl";
import { calcularRifl, ventanaRifl } from "../src/lib/rifl";

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

// ── 1. Las citas textuales dicen lo que dice la norma ──────────────────────────────────────────
{
  const t = RIFL_TEXTOS;
  check(
    "el art. 156 crea el RIFL con vigencia de un año desde el 2º mes siguiente",
    t.art156.includes("Régimen de Incentivo a la Formalización Laboral (RIFL)") &&
      t.art156.includes("vigencia de un (1) año") &&
      t.art156.includes("primer día del segundo mes inmediato siguiente"),
    t.art156,
  );
  check(
    "el art. 157 lista las cuatro puertas y las une con «o»",
    t.art157.includes("relación laboral registrada al 10 de diciembre de 2025") &&
      t.art157.includes("desempleado en los últimos seis (6) meses") &&
      t.art157.includes("Régimen Simplificado para Pequeños Contribuyentes") &&
      t.art157.includes("sector público nacional"),
    t.art157,
  );
  check(
    "el art. 158 pone el techo del 80% de la nómina para empleadores nuevos",
    t.art158.includes("ochenta por ciento (80%) de la nómina"),
    t.art158,
  );
  check(
    "ANCLA: el art. 159 fija 2% para SIPA + FNE + AAFF por 48 meses",
    t.art159.includes("alícuota del dos por ciento (2%)") &&
      t.art159.includes("Sistema Integrado Previsional Argentino (SIPA)") &&
      t.art159.includes("Fondo Nacional de Empleo") &&
      t.art159.includes("Régimen de Asignaciones Familiares") &&
      t.art159.includes("cuarenta y ocho (48) meses"),
    t.art159,
  );
  check(
    "ANCLA: el art. 159 fija 3% para el INSSJP (ley 19.032), también por 48 meses",
    t.art159.includes("alícuota del tres por ciento (3%)") && t.art159.includes("ley 19.032"),
  );
  check(
    "…y los 48 meses corren desde el MES DE INICIO de la relación, no desde la ley",
    t.art159.includes("a partir del mes de inicio de la nueva relación laboral"),
  );
  check(
    "…y deja afuera las alícuotas de regímenes diferenciales o especiales",
    t.art159.includes("regímenes previsionales diferenciales"),
  );
  check(
    "ANCLA: el art. 160 excluye la reincorporación dentro de los 12 meses",
    t.art160.includes("reincorporados por el mismo empleador dentro de los doce (12) meses"),
    t.art160,
  );
  check(
    "…y define el uso abusivo, con exclusión automática",
    t.art160.includes("uso abusivo") &&
      t.art160.includes("sustituciones de personal") &&
      t.art160.includes("en forma automática"),
  );
  check(
    "…y el REPSAL está entre las causales",
    t.art160.includes("REPSAL"),
  );
  check(
    "el art. 161 obliga a devolver las contribuciones no abonadas más intereses",
    t.art161.includes("no abonadas por haberse acogido al régimen") &&
      t.art161.includes("intereses y sanciones"),
    t.art161,
  );
  check(
    "ANCLA: el art. 162 dice que el beneficio es optativo y NO retroactivo",
    t.art162.includes("optativo para el empleador") &&
      t.art162.includes("obstará a que pueda hacer uso retroactivo"),
    t.art162,
  );
  check(
    "el art. 163 hace que opere de forma automática al dar el alta",
    t.art163.includes("operará de forma automática al momento de darse de alta"),
    t.art163,
  );
  check(
    "el art. 164 mantiene los planes y programas de empleo hasta un año",
    t.art164.includes("continuarán percibiendo dichas prestaciones") &&
      t.art164.includes("un (1) año desde la registración"),
    t.art164,
  );
  check(
    "ANCLA: el art. 19 de la 27.541 nombra los MISMOS cuatro subsistemas que adecua el 159",
    ["19.032 (INSSJP)", "24.013 (Fondo Nacional de Empleo)", "24.241", "24.714"].every((x) =>
      t.ley27541Art19.includes(x),
    ),
    t.ley27541Art19,
  );
  check(
    "…y sus dos alícuotas son 20,40% y 18%",
    t.ley27541Art19.includes("Veinte con cuarenta centésimos (20,40%)") &&
      t.ley27541Art19.includes("Dieciocho por ciento (18%)"),
  );
  check(
    "el art. 22 de la 27.541 detrae $ 7.003,68 por trabajador y por mes",
    t.ley27541Art22.includes("siete mil tres con sesenta y ocho centavos ($ 7.003,68)") &&
      t.ley27541Art22.includes("por cada uno de los trabajadores"),
    t.ley27541Art22,
  );
  check(
    "el art. 23 detrae $ 10.000 sobre la base TOTAL, no por trabajador",
    t.ley27541Art23.includes("hasta veinticinco (25) empleados") &&
      t.ley27541Art23.includes("diez mil ($ 10.000)") &&
      t.ley27541Art23.includes("sobre la totalidad de la base imponible"),
    t.ley27541Art23,
  );
  check(
    "el art. 217 hace regir la ley desde su publicación en el B.O.",
    t.art217Vigencia.includes("a partir de su publicación en el Boletín Oficial"),
  );
}

// ── 2. Las constantes coinciden con las citas ──────────────────────────────────────────────────
{
  check("el 2% del inc. a) está cargado como 0,02", ALICUOTA_RIFL_SIPA_FNE_AAFF === 0.02);
  check("el 3% del inc. b) está cargado como 0,03", ALICUOTA_RIFL_INSSJP === 0.03);
  check("el total del RIFL es 5%", casi(ALICUOTA_RIFL_TOTAL, 0.05, 1e-12), ALICUOTA_RIFL_TOTAL);
  check("el beneficio dura 48 meses", MESES_BENEFICIO === 48);
  check("la ventana dura 1 año", ANIOS_VENTANA === 1);
  check("la ley se publicó el 6/3/2026", LEY_PUBLICADA_ISO === "2026-03-06");
  check(
    "las dos alícuotas generales son 20,40% y 18%, con su inciso",
    ALICUOTAS_GENERALES.length === 2 &&
      ALICUOTAS_GENERALES[0].inciso === "a" &&
      ALICUOTAS_GENERALES[0].valor === 0.204 &&
      ALICUOTAS_GENERALES[1].inciso === "b" &&
      ALICUOTAS_GENERALES[1].valor === 0.18,
    ALICUOTAS_GENERALES,
  );
  check(
    "las detracciones son las tres del texto (7.003,68 · 17.509,20 · 10.000 hasta 25 empleados)",
    DETRACCION_ART22 === 7003.68 &&
      DETRACCION_ART22_ESPECIAL === 17509.2 &&
      DETRACCION_ART23_NOMINA_CHICA === 10000 &&
      DETRACCION_ART23_TOPE_EMPLEADOS === 25,
  );
  check("las cuatro puertas del art. 157 están las cuatro", PUERTAS_ART157.length === 4);
  check(
    "los incisos de las puertas son a) b) c) d)",
    PUERTAS_ART157.map((p) => p.inciso).join("") === "a)b)c)d)",
    PUERTAS_ART157.map((p) => p.inciso),
  );
  check("las exclusiones del art. 160 son tres", EXCLUSIONES_ART160.length === 3);
}

// ── 3. ANCLA: la ventana del art. 156, derivada ────────────────────────────────────────────────
{
  const v = ventanaRifl(new Date("2026-08-21T09:00:00Z"));
  check(
    "la ventana abre el 1/5/2026 (segundo mes siguiente al de la publicación)",
    v.aperturaISO === "2026-05-01",
    v.aperturaISO,
  );
  check("la ventana cierra el 30/4/2027 (un año)", v.cierreISO === "2027-04-30", v.cierreISO);
  check(
    "los textos en castellano coinciden con las fechas ISO",
    v.aperturaTexto === "1 de mayo de 2026" && v.cierreTexto === "30 de abril de 2027",
    { a: v.aperturaTexto, c: v.cierreTexto },
  );
  check("al 21/8/2026 la ventana está abierta", v.abierta === true);
  check(
    "…y faltan 252 días para el cierre",
    v.diasParaElCierre === 252,
    v.diasParaElCierre,
  );
  check(
    "ANCLA: los dos relojes no se pisan — un alta del último día llega a marzo de 2031",
    v.ultimoMesDelBeneficio === "marzo de 2031",
    v.ultimoMesDelBeneficio,
  );

  const antes = ventanaRifl(new Date("2026-04-30T09:00:00Z"));
  check("antes del 1/5/2026 la ventana todavía no estaba abierta", antes.abierta === false);
  const despues = ventanaRifl(new Date("2027-05-01T09:00:00Z"));
  check("después del 30/4/2027 la ventana está cerrada", despues.abierta === false);
  const ultimoDia = ventanaRifl(new Date("2027-04-30T09:00:00Z"));
  check(
    "el último día de la ventana todavía cuenta como abierta",
    ultimoDia.abierta === true && ultimoDia.diasParaElCierre === 0,
    ultimoDia,
  );
}

// ── 4. El cálculo ──────────────────────────────────────────────────────────────────────────────
{
  for (const alicuota of [0.18, 0.204]) {
    for (const bruto of [900_000, 1_500_000, 4_000_000]) {
      const r = calcularRifl({ bruto, alicuotaGeneral: alicuota, aplicarDetraccion: true });

      check(
        `caso ${bruto} al ${alicuota}: la base es bruto menos la detracción`,
        casi(r.base, bruto - DETRACCION_ART22),
        r.base,
      );
      check(
        `caso ${bruto} al ${alicuota}: el RIFL es 2% + 3% sobre esa base`,
        casi(r.riflSipaFneAaff, r.base * 0.02) &&
          casi(r.riflInssjp, r.base * 0.03) &&
          casi(r.contribucionRifl, r.base * 0.05),
        r,
      );
      check(
        `caso ${bruto} al ${alicuota}: el ahorro es general menos RIFL`,
        casi(r.ahorroMensual, r.contribucionGeneral - r.contribucionRifl),
      );
      check(
        `caso ${bruto} al ${alicuota}: ANCLA — el ahorro NO incluye obra social ni ART`,
        casi(r.ahorroMensual, r.base * (alicuota - 0.05)),
        { ahorro: r.ahorroMensual, esperado: r.base * (alicuota - 0.05) },
      );
      check(
        `caso ${bruto} al ${alicuota}: el ahorro anual son 12 meses y el total, ${MESES_BENEFICIO}`,
        casi(r.ahorroAnual, r.ahorroMensual * 12) &&
          casi(r.ahorroTotalBeneficio, r.ahorroMensual * MESES_BENEFICIO),
      );
      check(
        `caso ${bruto} al ${alicuota}: la reducción porcentual no depende del sueldo`,
        casi(r.reduccionPorcentual, ((alicuota - 0.05) / alicuota) * 100, 1e-9),
        r.reduccionPorcentual,
      );
    }
  }

  // La reducción es del 72,2% al 18% y del 75,5% al 20,40%: los dos números que titula la página.
  const b = calcularRifl({ bruto: 1_500_000, alicuotaGeneral: 0.18, aplicarDetraccion: true });
  const a = calcularRifl({ bruto: 1_500_000, alicuotaGeneral: 0.204, aplicarDetraccion: true });
  check(
    "al 18% la contribución baja ~72% y al 20,40% ~75%",
    b.reduccionPorcentual > 72 && b.reduccionPorcentual < 73 &&
      a.reduccionPorcentual > 75 && a.reduccionPorcentual < 76,
    { b: b.reduccionPorcentual, a: a.reduccionPorcentual },
  );
}

// ── 5. ANCLA: la detracción no cambia el AHORRO (el art. 159 sólo reemplaza alícuotas) ─────────
{
  const con = calcularRifl({ bruto: 1_500_000, alicuotaGeneral: 0.18, aplicarDetraccion: true });
  const sin = calcularRifl({ bruto: 1_500_000, alicuotaGeneral: 0.18, aplicarDetraccion: false });
  check(
    "sin detracción la base es el bruto entero",
    sin.detraccion === 0 && casi(sin.base, 1_500_000),
    sin.base,
  );
  check(
    "la reducción porcentual es idéntica con y sin detracción",
    casi(con.reduccionPorcentual, sin.reduccionPorcentual, 1e-9),
    { con: con.reduccionPorcentual, sin: sin.reduccionPorcentual },
  );
  check(
    "la detracción sí baja los importes absolutos, en la proporción exacta",
    casi(con.ahorroMensual, sin.ahorroMensual - DETRACCION_ART22 * (0.18 - 0.05)),
    { con: con.ahorroMensual, sin: sin.ahorroMensual },
  );
}

// ── 6. Bordes ──────────────────────────────────────────────────────────────────────────────────
{
  const chico = calcularRifl({ bruto: 5_000, alicuotaGeneral: 0.18, aplicarDetraccion: true });
  check(
    "un bruto menor que la detracción no da base negativa",
    chico.base === 0 && chico.contribucionGeneral === 0 && chico.ahorroMensual === 0,
    chico,
  );
  const negativo = calcularRifl({ bruto: -1, alicuotaGeneral: 0.18, aplicarDetraccion: false });
  check("un bruto negativo se trata como cero", negativo.bruto === 0 && negativo.base === 0);
}

// ── 7. Fuentes ─────────────────────────────────────────────────────────────────────────────────
{
  check(
    "todas las fuentes son de InfoLEG",
    RIFL_FUENTES.lista.every((f) =>
      f.url.startsWith("https://servicios.infoleg.gob.ar/infolegInternet/"),
    ),
    RIFL_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citada la Ley 27.802 por su id",
    RIFL_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "ANCLA: la Ley 27.541 se cita por su texto ACTUALIZADO, no el original",
    RIFL_FUENTES.lista.some((f) => f.url.includes("333564") && f.url.endsWith("texact.htm")),
    RIFL_FUENTES.lista.map((f) => f.url),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(RIFL_FUENTES.consultadoEl),
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  "\nTodos los checks del RIFL OK (Ley 27.802 arts. 156-164 · Ley 27.541 arts. 19, 22 y 23).",
);
