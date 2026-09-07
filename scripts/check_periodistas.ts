// Verificación de la página de indemnización del periodista (Ley 12.908, art. 43) y de su fecha
// de muerte (art. 197 de la Ley 27.802). Correr con: npx tsx scripts/check_periodistas.ts
//
// LOS ANCLAS:
//   1. **Los tres rubros del art. 43 son tres, y se suman**: antigüedad (inc. c), sustitutiva del
//      preaviso (inc. b) y la especial de seis meses (inc. d). Si alguno se cae, la página publica
//      un número que puede ser la mitad del correcto.
//   2. **La especial se paga «haya o no mediado preaviso»**: tildar «me preavisaron» apaga la
//      sustitutiva y NO la especial.
//   3. **El piso de dos meses del inc. c)** manda por encima del cálculo por año.
//   4. **El corte de los tres años del inc. b)** parte la escala 2/4 meses, y el día exacto del
//      aniversario se avisa en vez de resolverse.
//   5. **La comparación con la LCT no se reimplementa**: sale de `calcularIndemnizacion`, el mismo
//      motor de /indemnizacion (regla de s85).
//   6. **El caso que da vuelta el resultado**: a los cuatro meses de antigüedad la LCT no paga
//      nada (período de prueba, art. 92 bis) y el estatuto paga diez sueldos. Es la diferencia más
//      grande que se pierde el 1/1/2027 y tiene que estar fija en un test.
//   7. **Las citas dicen lo que dice la norma**, empezando por el art. 197 de la Ley 27.802.

import {
  ANIOS_CORTE_ESCALA,
  ART43_VIGENTE_DESDE,
  DEROGACION_ISO,
  DIAS_MAXIMO_SUSPENSION,
  DIAS_PERIODO_PRUEBA,
  ESCALA_VACACIONES_HABILES,
  HORAS_EXTRAS_MAXIMAS_MENSUALES,
  HORAS_SEMANALES,
  MESES_ESPECIAL,
  MESES_PISO_ANTIGUEDAD,
  MESES_PREAVISO,
  MESES_PROMEDIO_BASE,
  MESES_SUSTITUTIVA,
  PERIODISTAS_FUENTES,
  QUE_SE_PIERDE,
  TEXTOS,
  ULTIMO_DIA_VIGENTE_ISO,
} from "../src/data/periodistas";
import { calcularIndemnizacion } from "../src/lib/indemnizacion";
import { calcularPeriodista } from "../src/lib/periodistas";

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

const BASE = 1_000_000;
const caso = (over: Partial<Parameters<typeof calcularPeriodista>[0]> = {}) =>
  calcularPeriodista({
    ingresoISO: "2016-06-30",
    despidoISO: "2026-06-30",
    base: BASE,
    preavisoOtorgado: false,
    ...over,
  });

// ── 1. Los tres rubros del art. 43 sobre un caso conocido ─────────────────────────────────────
{
  const r = caso()!;
  check("diez años justos son diez años computables", r.estatuto.aniosComputables === 10);
  check("inc. c): diez sueldos de antigüedad", casi(r.estatuto.antiguedad, 10 * BASE));
  check(
    "inc. b): con más de tres años, cuatro sueldos de sustitutiva",
    r.estatuto.mesesSustitutiva === 4 && casi(r.estatuto.sustitutiva, 4 * BASE),
  );
  check("inc. d): seis sueldos de indemnización especial", casi(r.estatuto.especial, 6 * BASE));
  check("el total del estatuto son veinte sueldos", casi(r.estatuto.total, 20 * BASE), r.estatuto);
  check(
    "el total es exactamente la suma de los tres rubros",
    casi(r.estatuto.total, r.estatuto.antiguedad + r.estatuto.sustitutiva + r.estatuto.especial),
  );
  check("inc. a): el preaviso de ese caso son dos meses", r.estatuto.mesesPreaviso === 2);
  check(
    "las constantes son las del artículo",
    MESES_ESPECIAL === 6 &&
      MESES_SUSTITUTIVA.hastaCorte === 2 &&
      MESES_SUSTITUTIVA.superaCorte === 4 &&
      MESES_PREAVISO.hastaCorte === 1 &&
      MESES_PREAVISO.superaCorte === 2 &&
      MESES_PISO_ANTIGUEDAD === 2 &&
      ANIOS_CORTE_ESCALA === 3 &&
      MESES_PROMEDIO_BASE === 6,
  );
}

// ── 2. La especial se paga aunque haya preaviso ───────────────────────────────────────────────
{
  const conPreaviso = caso({ preavisoOtorgado: true })!;
  check("con preaviso no hay sustitutiva", conPreaviso.estatuto.sustitutiva === 0);
  check(
    "…pero la especial de seis meses se paga igual",
    casi(conPreaviso.estatuto.especial, 6 * BASE),
  );
  check(
    "…y la antigüedad tampoco se toca",
    casi(conPreaviso.estatuto.antiguedad, 10 * BASE),
  );
  check(
    "la cita del inc. d) trae el «haya o no mediado preaviso»",
    TEXTOS.art43.includes("haya o no mediado preaviso") &&
      TEXTOS.art43.includes("indemnización especial equivalente a seis meses de sueldo"),
  );
}

// ── 3. El piso de dos meses del inc. c) ───────────────────────────────────────────────────────
{
  // 1 año y 1 mes: 1 año computable, pero el piso manda dos meses.
  const unAnio = caso({ ingresoISO: "2025-05-30", despidoISO: "2026-06-30" })!;
  check("un año computable", unAnio.estatuto.aniosComputables === 1);
  check("el piso lleva la antigüedad a dos sueldos", casi(unAnio.estatuto.antiguedad, 2 * BASE));
  check(
    "la cita del inc. c) trae el piso",
    TEXTOS.art43.includes("En ningún caso esta indemnización será inferior a dos meses de sueldo"),
  );
}

// ── 4. El corte de los tres años del inc. b) ──────────────────────────────────────────────────
{
  const antes = caso({ ingresoISO: "2024-01-01", despidoISO: "2026-06-30" })!; // 2 años y medio
  const justo = caso({ ingresoISO: "2023-06-30", despidoISO: "2026-06-30" })!; // 3 años justos
  const despues = caso({ ingresoISO: "2023-06-29", despidoISO: "2026-06-30" })!; // 3 años y 1 día

  check("con menos de tres años, dos meses de sustitutiva", antes.estatuto.mesesSustitutiva === 2);
  check("con más de tres años, cuatro meses", despues.estatuto.mesesSustitutiva === 4);
  check("a los tres años justos la página avisa el hueco de la ley", justo.enElCorte === true);
  check("…y en el aniversario todavía aplica el tramo bajo", justo.estatuto.mesesSustitutiva === 2);
  check("el preaviso del inc. a) sigue la misma escala", antes.estatuto.mesesPreaviso === 1 && despues.estatuto.mesesPreaviso === 2);
  check(
    "la cita del inc. b) trae los dos o cuatro meses",
    TEXTOS.art43.includes("dos o cuatro meses de retribución"),
  );
}

// ── 5. El corte del 1° de enero de 2027 (art. 197 de la Ley 27.802) ───────────────────────────
{
  const ultimoDia = caso({ despidoISO: ULTIMO_DIA_VIGENTE_ISO })!;
  const derogado = caso({ despidoISO: DEROGACION_ISO })!;

  check("el 31/12/2026 el estatuto todavía paga", ultimoDia.estatuto.total > 0);
  check("el 1/1/2027 el estatuto ya no paga nada", derogado.estatuto.total === 0);
  check("…y la marca de vigencia lo dice", derogado.vigenteAlDespido === false);
  check("…pero la LCT sí paga", derogado.lctTotal > 0);
  check("…y la diferencia pasa a ser negativa (se pierde plata)", derogado.diferencia < 0);
  check("la fecha de derogación es el 1/1/2027", DEROGACION_ISO === "2027-01-01");
  check(
    "el texto del art. 197 trae la ley y la fecha",
    TEXTOS.art197Ley27802.includes("12.908") &&
      TEXTOS.art197Ley27802.includes("1º de enero de 2027"),
    TEXTOS.art197Ley27802,
  );
}

// ── 6. El caso que da vuelta el resultado: cuatro meses de antigüedad ─────────────────────────
{
  const r = caso({ ingresoISO: "2026-02-28", despidoISO: "2026-06-30" })!;
  check("a los cuatro meses la LCT no paga indemnización (art. 92 bis)", r.lctTotal === 0);
  check(
    "…y el estatuto paga diez sueldos (2 de piso + 2 de sustitutiva + 6 de especial)",
    casi(r.estatuto.total, 10 * BASE),
    r.estatuto,
  );
  check("…así que no hay múltiplo que mostrar", r.vecesLct === null);
  check("…y la diferencia es de diez sueldos", casi(r.diferencia, 10 * BASE));
}

// ── 7. La columna de la LCT sale del motor compartido ─────────────────────────────────────────
{
  for (const [ingresoISO, despidoISO] of [
    ["2016-06-30", "2026-06-30"],
    ["2019-03-11", "2026-11-20"],
    ["2024-02-29", "2026-05-01"],
  ]) {
    const r = caso({ ingresoISO, despidoISO })!;
    const ind = calcularIndemnizacion({
      ingresoISO,
      despidoISO,
      mejorRemuneracion: BASE,
      preavisoOtorgado: false,
    })!;
    check(
      `${ingresoISO} → ${despidoISO}: la columna LCT es la de /indemnizacion`,
      casi(r.lctTotal, ind.totalIndemnizatorio),
      { pagina: r.lctTotal, indemnizacion: ind.totalIndemnizatorio },
    );
    check(
      `${ingresoISO} → ${despidoISO}: el estatuto paga más que la LCT`,
      r.estatuto.total > r.lctTotal,
      { estatuto: r.estatuto.total, lct: r.lctTotal },
    );
  }
}

// ── 8. Entradas inválidas ─────────────────────────────────────────────────────────────────────
{
  check("fechas invertidas devuelven null", caso({ despidoISO: "2015-01-01" }) === null);
  check("base cero devuelve null", caso({ base: 0 }) === null);
}

// ── 9. Los textos, la tabla comparativa y las fuentes ─────────────────────────────────────────
{
  check(
    "el art. 43 se cita completo, con sus cinco incisos",
    ["a)", "b)", "c)", "d)", "e)"].every((i) => TEXTOS.art43.includes(i)) &&
      TEXTOS.art43.length > 1500,
  );
  check(
    "el inc. e) explica que la base es un promedio de seis meses",
    TEXTOS.art43.includes("el promedio que resulte de lo percibido por el dependiente en los últimos seis meses"),
  );
  check(
    "el art. 2 define quién es periodista profesional",
    TEXTOS.art2.includes("en forma regular, mediante retribución pecuniaria"),
  );
  check(
    "el art. 25 trae el período de prueba de treinta días",
    TEXTOS.art25.includes("no deberá ser mayor de treinta días") && DIAS_PERIODO_PRUEBA === 30,
  );
  check(
    "el art. 34 trae las 36 horas y el recargo del 100%",
    TEXTOS.art34.includes("treinta y seis horas semanales") &&
      TEXTOS.art34.includes("recargo del cien por ciento") &&
      HORAS_SEMANALES === 36 &&
      HORAS_EXTRAS_MAXIMAS_MENSUALES === 20,
  );
  check(
    "el art. 35 cuenta las vacaciones en días HÁBILES",
    TEXTOS.art35.includes("Quince días hábiles") &&
      ESCALA_VACACIONES_HABILES.map((e) => e.dias).join(",") === "15,20,30",
  );
  check("el tope de suspensión del art. 41 son 30 días", DIAS_MAXIMO_SUSPENSION === 30);
  check(
    "la tabla comparativa tiene sus dos columnas completas",
    QUE_SE_PIERDE.length >= 8 &&
      QUE_SE_PIERDE.every(
        (f) => /^Arts?\. /.test(f.articulo) && f.estatuto.length > 40 && f.lct.length > 20,
      ),
  );
  check(
    "la fecha del texto vigente del art. 43 es la de la Ley 16.792",
    ART43_VIGENTE_DESDE.includes("1965"),
  );
  check(
    "todas las fuentes son oficiales",
    PERIODISTAS_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina)\.gob\.ar\//.test(
        f.url,
      ),
    ),
    PERIODISTAS_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto ACTUALIZADO de la Ley 12.908",
    PERIODISTAS_FUENTES.lista.some((f) => f.url.includes("43608") && f.url.endsWith("texact.htm")),
  );
  check(
    "está citada la Ley 27.802 como fuente de la derogación",
    PERIODISTAS_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(PERIODISTAS_FUENTES.consultadoEl),
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log("\nTodos los checks del estatuto del periodista OK (Ley 12.908 art. 43 · Ley 27.802 art. 197).");
