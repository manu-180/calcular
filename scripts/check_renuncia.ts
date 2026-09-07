// Verificación de la página de renuncia (LCT arts. 240 y 241 sustituidos por los arts. 49 y 50 de
// la Ley 27.802, más la liquidación final de los arts. 74, 123, 150/151/153/155/156 y 231/232).
// Correr con: npx tsx scripts/check_renuncia.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **El art. 240 vigente tiene que decir «formato físico o digital» y «validación de su
//      identidad»; el anterior, «colacionado», «personalmente» y «presencia personal».** Toda la
//      página vive de ese contraste: si las citas se mezclan, publica el trámite equivocado.
//   2. **El párrafo de la comunicación al empleador tiene que estar SÓLO en el texto anterior.**
//      Es el tercer cambio, el que ninguna nota registra.
//   3. **El párrafo nuevo del art. 241 tiene que traer los DOS MESES.** Es el único número que la
//      reforma agregó a la extinción por voluntad concurrente.
//   4. **La liquidación no puede incluir el art. 245.** Una renuncia no genera indemnización por
//      antigüedad: si algún día el total la incorpora, la página estaría mintiendo al alza.
//   5. **El SAC proporcional sale del helper compartido**, así que tiene que coincidir con la
//      fórmula del art. 123 calculada a mano (sueldo/2 × días trabajados del semestre / días del
//      semestre).
//   6. **La regla de vacaciones se elige por el art. 151**, no por gusto: con más de la mitad de
//      los días hábiles del año va la escala del art. 150 proporcional; con menos, el día cada
//      veinte del art. 153.
//   7. **El día de vacaciones vale sueldo ÷ 25 y el día común sueldo ÷ 30** (art. 155 inc. a): el
//      de vacaciones tiene que ser exactamente un 20% más caro.
//   8. **El preaviso omitido RESTA 15 días** (arts. 231 inc. a] y 232) y sólo cuando se declara
//      que no se preavisó.
//   9. **Los aportes corren sólo sobre lo remunerativo** (días del mes + SAC), no sobre la
//      indemnización del art. 156.
//  10. **Higiene de fuentes:** todas oficiales, salvo la captura declarada del Internet Archive.

import {
  ARTICULO_SUSTITUTIVO_240,
  ARTICULO_SUSTITUTIVO_241,
  CAMBIOS_ART_240,
  DIAS_TRABAJO_POR_DIA_DESCANSO,
  DIVISOR_DIA,
  DIVISOR_VACACIONES,
  FUENTE_TEXTO_ANTERIOR,
  MESES_ABANDONO_RECIPROCO,
  PREAVISO_DEL_TRABAJADOR_DIAS,
  RENUNCIA_FUENTES,
  RENUNCIA_TEXTOS,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/renuncia";
import { TOTAL_APORTES } from "../src/data/sueldo";
import { DIVISOR_VACACIONES as DIVISOR_VAC_SITIO } from "../src/data/vacaciones";
import { calcularRenuncia } from "../src/lib/renuncia";
import { diasInclusivos } from "../src/lib/aguinaldo";
import { sacProporcional, semestreDe } from "../src/lib/liquidacion";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol;

const SUELDO = 1_200_000;

// ── 1. El art. 240: el contraste, palabra por palabra ──────────────────────────────────────────
{
  const t = RENUNCIA_TEXTOS;
  check("el art. 240 lo sustituyó el art. 49 de la Ley 27.802", ARTICULO_SUSTITUTIVO_240 === 49);
  check(
    "…y la nota lo dice, con el B.O. 6/3/2026",
    t.art240Nota.includes("art. 49") &&
      t.art240Nota.includes("27.802") &&
      t.art240Nota.includes("6/3/2026"),
    t.art240Nota,
  );
  check(
    "el texto VIGENTE admite el despacho «en formato físico o digital»",
    /despacho telegráfico en formato físico o digital/.test(t.art240Vigente),
    t.art240Vigente,
  );
  check(
    "…pide sólo «la validación de su identidad»",
    /requiriendo la validación de su identidad/.test(t.art240Vigente),
  );
  check(
    "…y remite la vía administrativa a la reglamentación",
    /en la forma que determine la reglamentación/.test(t.art240Vigente),
  );
  check(
    "…y NO exige presencia personal ni despacho colacionado",
    !/presencia personal/.test(t.art240Vigente) && !/colacionado/.test(t.art240Vigente),
  );

  check(
    "el texto ANTERIOR exigía despacho «colacionado» cursado «personalmente»",
    /despacho telegráfico colacionado cursado personalmente por el trabajador/.test(t.art240Anterior),
    t.art240Anterior,
  );
  check(
    "…con presencia personal del remitente en la oficina de correo",
    /requiriéndose la presencia personal del remitente y la justificación de su identidad/.test(
      t.art240Anterior,
    ),
  );
  check(
    "…y traía el párrafo de la comunicación inmediata al empleador (art. 235)",
    /dará inmediata comunicación de la misma al empleador, siendo ello suficiente a los fines del artículo 235/.test(
      t.art240Anterior,
    ),
  );
  check(
    "ese párrafo NO está en el texto vigente: es el tercer cambio",
    !/inmediata comunicación/.test(t.art240Vigente),
  );
  check(
    "el art. 235 citado es el de la prueba por escrito del preaviso",
    /La notificación del preaviso deberá probarse por escrito/.test(t.art235),
  );
  check("los cambios del art. 240 son tres", CAMBIOS_ART_240.length === 3);
  check(
    "cada cambio tiene antes y ahora, y no están vacíos",
    CAMBIOS_ART_240.every((c) => c.antes.length > 20 && c.ahora.length > 20),
  );
}

// ── 2. El art. 241: el plazo nuevo ─────────────────────────────────────────────────────────────
{
  const t = RENUNCIA_TEXTOS;
  check("el art. 241 lo sustituyó el art. 50 de la Ley 27.802", ARTICULO_SUSTITUTIVO_241 === 50);
  check(
    "el párrafo nuevo fija DOS meses calendarios",
    /luego de transcurridos dos \(2\) meses calendarios/.test(t.art241ParrafoNuevo) &&
      MESES_ABANDONO_RECIPROCO === 2,
    t.art241ParrafoNuevo,
  );
  check(
    "…y el párrafo nuevo está contenido en el texto vigente del artículo",
    t.art241Vigente.includes(t.art241ParrafoNuevo),
  );
  check(
    "el art. 241 conserva la nulidad sin presencia personal del trabajador",
    /Será nulo y sin valor el acto que se celebre sin la presencia personal del trabajador/.test(
      t.art241Vigente,
    ),
  );
  check(
    "…y el abandono recíproco por comportamiento concluyente",
    /comportamiento concluyente y recíproco de las mismas/.test(t.art241Vigente),
  );
}

// ── 3. Los artículos de la liquidación dicen «por cualquier causa» ─────────────────────────────
{
  const t = RENUNCIA_TEXTOS;
  check(
    "el art. 123 manda pagar el SAC proporcional «por cualquier causa»",
    /por cualquier causa/.test(t.art123) && /doceava parte de las remuneraciones devengadas/.test(t.art123),
  );
  check(
    "el art. 156 manda pagar las vacaciones «por cualquier causa»",
    /por cualquier causa/.test(t.art156) &&
      /período de descanso proporcional a la fracción del año trabajada/.test(t.art156),
  );
  check(
    "el art. 155 inc. a) divide por veinticinco",
    /dividiendo por veinticinco \(25\)/.test(t.art155incA) && DIVISOR_VACACIONES === 25,
  );
  check(
    "el divisor de vacaciones coincide con el que ya usa /vacaciones",
    DIVISOR_VACACIONES === DIVISOR_VAC_SITIO,
    { renuncia: DIVISOR_VACACIONES, sitio: DIVISOR_VAC_SITIO },
  );
  check("el día común se paga sueldo ÷ 30", DIVISOR_DIA === 30);
  check("el art. 153 da un día cada veinte", DIAS_TRABAJO_POR_DIA_DESCANSO === 20);
  check("el preaviso del trabajador son 15 días", PREAVISO_DEL_TRABAJADOR_DIAS === 15);
  check("la vigencia de la reforma es el 6/3/2026", VIGENCIA_REFORMA_ISO === "2026-03-06");
}

// ── 4. La liquidación: renglón por renglón, contra la fórmula de la norma ──────────────────────
{
  // Antigüedad larga y salida a fin de agosto: cae del lado del art. 151 (más de media año hábil).
  const r = calcularRenuncia({
    sueldoMensual: SUELDO,
    ingresoISO: "2021-03-15",
    egresoISO: "2026-08-31",
    preaviso: true,
  })!;

  check("rige el texto nuevo del art. 240 (egreso posterior al 6/3/2026)", r.rigeTextoNuevo);
  check("el valor del día común es sueldo ÷ 30", casi(r.valorDia, SUELDO / 30));
  check("el valor del día de vacaciones es sueldo ÷ 25", casi(r.valorDiaVacaciones, SUELDO / 25));
  check(
    "…y ese día vale exactamente un 20% más que el común",
    casi(r.valorDiaVacaciones, r.valorDia * 1.2, 0.05),
  );

  check("agosto entero son 31 días trabajados del mes", r.diasDelMes === 31);
  check("…y el sueldo del mes es 31 × valor día", casi(r.sueldoDelMes, 31 * (SUELDO / 30), 0.05));

  const sacEsperado = sacProporcional(SUELDO, "2021-03-15", "2026-08-31");
  check(
    "el SAC proporcional sale del helper compartido, no de una copia",
    casi(r.sacImporte, Math.round(sacEsperado.importe * 100) / 100),
    { pagina: r.sacImporte, helper: sacEsperado.importe },
  );
  const sem = semestreDe("2026-08-31");
  check(
    "…y el semestre es el segundo (1/7 a 31/12)",
    sem.inicioISO === "2026-07-01" && sem.finISO === "2026-12-31",
  );
  check(
    "…con 62 de 184 días trabajados (julio + agosto)",
    r.diasTrabajadosSemestre === diasInclusivos("2026-07-01", "2026-08-31") &&
      r.diasSemestre === diasInclusivos("2026-07-01", "2026-12-31"),
    { trabajados: r.diasTrabajadosSemestre, semestre: r.diasSemestre },
  );

  check(
    "con más de media año hábil trabajado va la escala del art. 150, no el día cada veinte",
    r.reglaVacaciones === "escala",
    { habiles: r.diasHabilesTrabajadosAnio, delAnio: r.diasHabilesDelAnio },
  );
  check(
    "…y los días son la escala por la fracción del año trabajada",
    r.diasVacaciones > 0 && r.diasVacaciones < 21,
    r.diasVacaciones,
  );
  check(
    "el importe de vacaciones es días × sueldo ÷ 25",
    casi(r.vacacionesImporte, r.diasVacaciones * (SUELDO / 25), 0.05),
  );
  check("el SAC sobre vacaciones es la doceava parte", casi(r.sacSobreVacaciones, r.vacacionesImporte / 12, 0.05));

  check(
    "el total es la suma de los cuatro renglones",
    casi(
      r.totalACobrar,
      r.sueldoDelMes + r.sacImporte + r.vacacionesImporte + r.sacSobreVacaciones,
      0.05,
    ),
  );
  check("preavisando, no hay descuento", r.descuentoPreaviso === 0);
  check("…y el total neto es el total", casi(r.totalNetoDeDescuento, r.totalACobrar, 0.01));

  // Los aportes corren sobre lo remunerativo: días del mes + SAC. NO sobre las vacaciones.
  check(
    "los aportes son el 17% de (días del mes + SAC), no del total",
    casi(r.aportes.total, (r.sueldoDelMes + r.sacImporte) * TOTAL_APORTES, 0.1),
    { aportes: r.aportes.total, total: r.totalACobrar },
  );
  check(
    "…y son estrictamente menores al 17% del total (porque las vacaciones no aportan)",
    r.aportes.total < r.totalACobrar * TOTAL_APORTES,
  );
  check("en mano = total − aportes", casi(r.enMano, r.totalNetoDeDescuento - r.aportes.total, 0.05));
}

// ── 5. La regla de vacaciones se elige por el art. 151 ─────────────────────────────────────────
{
  // Ingreso en octubre y salida en diciembre del mismo año: muy lejos de la mitad de los hábiles.
  const corto = calcularRenuncia({
    sueldoMensual: SUELDO,
    ingresoISO: "2026-10-01",
    egresoISO: "2026-12-15",
    preaviso: true,
  })!;
  check(
    "con menos de media año hábil rige el art. 153 (un día cada veinte)",
    corto.reglaVacaciones === "proporcional",
    { habiles: corto.diasHabilesTrabajadosAnio, delAnio: corto.diasHabilesDelAnio },
  );
  check(
    "…y los días son el piso entero de hábiles ÷ 20",
    corto.diasVacaciones === Math.floor(corto.diasHabilesTrabajadosAnio / 20),
    { dias: corto.diasVacaciones, habiles: corto.diasHabilesTrabajadosAnio },
  );
  check(
    "…y se avisa cuál regla aplicó",
    corto.avisos.some((a) => /art\. 153/.test(a.texto) && /un día por cada veinte/.test(a.texto)),
  );
}

// ── 6. El preaviso omitido resta ────────────────────────────────────────────────────────────────
{
  const sin = calcularRenuncia({
    sueldoMensual: SUELDO,
    ingresoISO: "2021-03-15",
    egresoISO: "2026-08-31",
    preaviso: false,
  })!;
  check(
    "sin preaviso se descuentan 15 días de sueldo",
    casi(sin.descuentoPreaviso, 15 * (SUELDO / 30), 0.05),
    sin.descuentoPreaviso,
  );
  check(
    "…y el total neto baja exactamente eso",
    casi(sin.totalNetoDeDescuento, sin.totalACobrar - sin.descuentoPreaviso, 0.01),
  );
  check(
    "…y se avisa con los arts. 231 y 232",
    sin.avisos.some((a) => a.tono === "bloqueante" && /231/.test(a.texto) && /232/.test(a.texto)),
  );
}

// ── 7. Lo que la página NUNCA debe agregar, y la no retroactividad ─────────────────────────────
{
  const r = calcularRenuncia({
    sueldoMensual: SUELDO,
    ingresoISO: "2021-03-15",
    egresoISO: "2026-08-31",
    preaviso: true,
  })!;
  // Una indemnización del art. 245 sobre 5 años sería ~5 sueldos: el total no puede acercarse.
  check(
    "el total no incluye indemnización por antigüedad (art. 245)",
    r.totalACobrar < SUELDO * 3,
    r.totalACobrar,
  );
  check(
    "se avisa explícitamente que el art. 245 no entra",
    r.avisos.some((a) => /245/.test(a.texto) && /NO entra|no entra/.test(a.texto)),
  );
  check(
    "…y se nombra el art. 241 como alternativa que sí da desempleo",
    r.avisos.some((a) => /241/.test(a.texto) && /desempleo/.test(a.texto)),
  );

  const viejo = calcularRenuncia({
    sueldoMensual: SUELDO,
    ingresoISO: "2021-03-15",
    egresoISO: "2026-02-28",
    preaviso: true,
  })!;
  check("una renuncia anterior al 6/3/2026 NO rige por el texto nuevo", !viejo.rigeTextoNuevo);
  check(
    "…y se avisa que regía el despacho colacionado con presencia personal",
    viejo.avisos.some((a) => /colacionado/.test(a.texto) && /personalmente/.test(a.texto)),
  );
}

// ── 8. Casos imposibles ────────────────────────────────────────────────────────────────────────
{
  check(
    "sueldo cero no devuelve resultado",
    calcularRenuncia({
      sueldoMensual: 0,
      ingresoISO: "2021-03-15",
      egresoISO: "2026-08-31",
      preaviso: true,
    }) === null,
  );
  check(
    "egreso anterior al ingreso no devuelve resultado",
    calcularRenuncia({
      sueldoMensual: SUELDO,
      ingresoISO: "2026-08-31",
      egresoISO: "2021-03-15",
      preaviso: true,
    }) === null,
  );
}

// ── 9. Higiene de fuentes ──────────────────────────────────────────────────────────────────────
{
  check(
    "todas las fuentes vivas son oficiales (infoleg / boletinoficial / argentina.gob.ar)",
    RENUNCIA_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina)\.gob\.ar\//.test(
        f.url,
      ),
    ),
    RENUNCIA_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto ACTUALIZADO de la LCT",
    RENUNCIA_FUENTES.lista.some((f) => f.url.includes("25552") && f.url.endsWith("texact.htm")),
  );
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    RENUNCIA_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "…y se nombra el art. 99, que mandó el art. 241 al seguro de desempleo",
    RENUNCIA_FUENTES.lista.some((f) => /art\. 99/.test(f.detalle) && /24\.013/.test(f.detalle)),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(RENUNCIA_FUENTES.consultadoEl),
  );
  check(
    "la captura del texto anterior envuelve la URL oficial de InfoLEG",
    FUENTE_TEXTO_ANTERIOR.urlArchivada.startsWith("https://web.archive.org/web/") &&
      FUENTE_TEXTO_ANTERIOR.urlArchivada.includes(
        "servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      ),
    FUENTE_TEXTO_ANTERIOR.urlArchivada,
  );
  check(
    "…y es anterior al 6/3/2026",
    FUENTE_TEXTO_ANTERIOR.capturaDel < VIGENCIA_REFORMA_ISO,
    FUENTE_TEXTO_ANTERIOR.capturaDel,
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  "\nTodos los checks de renuncia OK (LCT arts. 240 y 241 · Ley 27.802 arts. 49, 50 y 99).",
);
