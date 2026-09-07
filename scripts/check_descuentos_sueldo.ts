// Verificación de la página de descuentos y embargo del sueldo (LCT arts. 131 a 133 con el texto
// del art. 37 de la Ley 27.802 · art. 9º de la Ley 14.250 según el art. 133 de la misma ley ·
// Decreto 484/87 · Res. MTEySS 436/2004). Correr con: npx tsx scripts/check_descuentos_sueldo.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **El tope nuevo del 2% tiene que existir en el texto vigente y NO en el anterior.** Todo el
//      valor de la página es esa asimetría: si alguna vez las citas se cruzan o se resumen, la
//      página pasa a afirmar lo mismo que las notas que vino a corregir.
//   2. **La oración que desapareció del art. 133** («con intervención de la asociación
//      profesional…») tiene que seguir estando en la cita del texto anterior y ausente en la del
//      vigente. Es el segundo cambio verificable y el más fácil de perder en un "resumen".
//   3. **El 20% NO se movió**: los dos textos lo dicen. Si un refactor cambia el número, la página
//      empieza a inventar una reforma que no pasó.
//   4. **La excepción de Ganancias no tiene techo**: la Res. 436/2004 derogó la que ponía el 30%.
//      Publicar un 30% sería resucitar una norma derogada.
//   5. **El embargo se deriva del SMVM de `data/desempleo.ts`**, no de un número escrito a mano
//      acá: es la regla de s74/s75 (publicar la regla, no el monto del mes).
//   6. **La aritmética del Decreto 484/87 en sus tres tramos**, con el escalón exacto en el doble
//      del SMVM y el piso inembargable en uno.
//   7. **El embargo se calcula sobre el BRUTO** (art. 2º) y las indemnizaciones sobre el importe
//      entero, no sobre el excedente (art. 3º): son dos bases distintas y se confunden solas.
//   8. **La cuota alimentaria queda fuera de los límites** (art. 4º) y la página lo dice como aviso
//      bloqueante, no como nota al pie.

import { SMVM_SERIE, SMVM_ULTIMO } from "../src/data/desempleo";
import { smvmVigente } from "../src/lib/desempleo";
import { TOTAL_APORTES } from "../src/data/sueldo";
import {
  CONCEPTOS_PERMITIDOS,
  DESCUENTOS_FUENTES,
  DESCUENTOS_TEXTOS,
  EMBARGO_ESCALON_SMVM,
  EMBARGO_PISO_SMVM,
  EMBARGO_TRAMO_1,
  EMBARGO_TRAMO_2,
  TOPE_CAMARAS_EMPRESARIAS,
  TOPE_CUOTA_SOLIDARIA,
  TOPE_GENERAL,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/descuentos-sueldo";
import { calcularDescuentos, smvmDe } from "../src/lib/descuentos-sueldo";

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

const T = DESCUENTOS_TEXTOS;

// ── 1. El tope del 2%: está en el texto vigente y no existía en el anterior ─────────────────────
{
  check(
    "el art. 9º VIGENTE de la Ley 14.250 fija el 2% para asociaciones de trabajadores",
    T.ley14250Art9Vigente.includes("no podrán superar el dos por ciento (2%)"),
  );
  check(
    "el art. 9º VIGENTE fija el 0,5% para cámaras empresarias",
    T.ley14250Art9Vigente.includes("cero coma cinco por ciento (0,5%)"),
  );
  check(
    "el art. 9º VIGENTE excluye del tope a las cuotas de afiliación sindical",
    T.ley14250Art9Vigente.includes("Quedan excluidas las cuotas de afiliación sindical"),
  );
  check(
    "el art. 9º ANTERIOR no contiene ningún porcentaje (ése es el hallazgo)",
    !/por ciento|%/.test(T.ley14250Art9Anterior),
    T.ley14250Art9Anterior,
  );
  check(
    "el art. 9º ANTERIOR sí declaraba válidas las contribuciones para los no afiliados",
    T.ley14250Art9Anterior.includes("sino también para los no afiliados"),
  );
  check("la constante del tope de cuota solidaria es 2%", TOPE_CUOTA_SOLIDARIA === 0.02);
  check("la constante del tope de cámaras es 0,5%", TOPE_CAMARAS_EMPRESARIAS === 0.005);
}

// ── 2. La oración que la reforma borró del art. 133 ────────────────────────────────────────────
{
  const frase = "con intervención de la asociación profesional de trabajadores representativa";
  check("el texto ANTERIOR del art. 133 exigía la intervención del sindicato", T.art133Anterior.includes(frase));
  check("el texto VIGENTE del art. 133 ya NO la exige", !T.art133Vigente.includes(frase), T.art133Vigente);
  check(
    "el texto VIGENTE remite al tope del 2% de la Ley de Modernización Laboral",
    T.art133Vigente.includes("tope del dos por ciento (2%) establecido en el artículo 133 de la Ley de Modernización Laboral"),
  );
  check(
    "el texto ANTERIOR no podía remitir a una ley de 2026",
    !/Modernización Laboral|2%/.test(T.art133Anterior),
  );
  check(
    "la nota de vigencia identifica al art. 37 de la Ley 27.802 y su B.O.",
    T.notaVigencia133.includes("art. 37 de la Ley Nº 27.802") && T.notaVigencia133.includes("6/3/2026"),
  );
  check("la fecha de vigencia es el 6/3/2026", VIGENCIA_REFORMA_ISO === "2026-03-06");
}

// ── 3. El 20% no se movió ──────────────────────────────────────────────────────────────────────
{
  check("el texto VIGENTE dice veinte por ciento (20%)", T.art133Vigente.includes("veinte por ciento (20%)"));
  check("el texto ANTERIOR también decía veinte por ciento", T.art133Anterior.includes("veinte por ciento (20 %)"));
  check("la constante del tope general es 20%", TOPE_GENERAL === 0.2);
  check(
    "el art. 133 sólo exceptúa del tope al adelanto del art. 130",
    T.art133Vigente.startsWith("Porcentaje máximo de retención") && T.art133Vigente.includes("Salvo lo dispuesto en el artículo 130"),
  );
  check(
    "el art. 131 prohíbe las multas al trabajador (lo que NO se puede descontar)",
    T.art131.includes("No se podrá imponer multas al trabajador"),
  );
}

// ── 4. La excepción de Ganancias: sin techo, y la del 30% está derogada ─────────────────────────
{
  check(
    "la Res. 436/2004 permite exceder el tope del primer párrafo del art. 133",
    T.res436Articulo1.includes("podrá ser excedido") && T.res436Articulo1.includes("primer párrafo del artículo 133"),
  );
  check(
    "y lo permite SIN otro límite que la tasa máxima del impuesto",
    T.res436Articulo1.includes("sin otro límite que el que la legislación en vigencia"),
  );
  check(
    "en ninguna cita aparece el 30% de la Res. 930/1993 (derogada)",
    !/30\s?%|treinta por ciento/i.test(T.res436Articulo1) && !/30\s?%|treinta por ciento/i.test(T.res436Considerando),
  );
  check(
    "el considerando es el que prueba que las retenciones legales cuentan para el tope",
    T.res436Considerando.includes("con más las otras retenciones legalmente permitidas"),
  );
}

// ── 5. El embargo se deriva del SMVM, no de un número escrito a mano ────────────────────────────
{
  const bruto = 1_000_000;
  const res = calcularDescuentos({ bruto, periodo: SMVM_ULTIMO.periodo });
  check(
    "el SMVM que usa el cálculo es el de data/desempleo.ts",
    res.smvm === SMVM_ULTIMO.mensual && res.smvmPeriodo === SMVM_ULTIMO.periodo,
    { usado: res.smvm, esperado: SMVM_ULTIMO.mensual },
  );
  // Sin período, smvmDe() tiene que dar el mes VIGENTE — no el último de la escala. Desde la
  // Res. 4/2026 (B.O. 2/9/2026) la serie llega hasta abril de 2027: si esto se rompe, la
  // calculadora de embargos empieza a contestar con el salario mínimo de un mes que no llegó.
  {
    const vig = smvmVigente().mes;
    const sinPeriodo = smvmDe();
    check(
      "smvmDe() sin período devuelve el mes vigente, no el último de la escala",
      sinPeriodo.periodo === vig.periodo && sinPeriodo.mensual === vig.mensual,
      { sinPeriodo, vigente: vig.periodo, ultimo: SMVM_ULTIMO.periodo },
    );
  }

  const primero = SMVM_SERIE[0];
  check(
    "un período anterior de la serie devuelve su propio SMVM",
    smvmDe(primero.periodo).mensual === primero.mensual,
  );
  check(
    "un período posterior al último con norma NO se proyecta: reusa el último y lo avisa",
    smvmDe("2099-12").mensual === SMVM_ULTIMO.mensual && smvmDe("2099-12").proyectado,
  );
  check("no hay ningún SMVM hardcodeado en el módulo de datos", !/3\d{2}[._]\d{3}/.test(String(TOPE_GENERAL) + String(TOPE_CUOTA_SOLIDARIA)));
}

// ── 6. La aritmética de los tres tramos del Decreto 484/87 ──────────────────────────────────────
{
  const smvm = SMVM_ULTIMO.mensual;
  const periodo = SMVM_ULTIMO.periodo;
  check("el piso inembargable es UN SMVM", EMBARGO_PISO_SMVM === 1);
  check("el escalón está en el DOBLE del SMVM", EMBARGO_ESCALON_SMVM === 2);
  check("los porcentajes son 10% y 20%", EMBARGO_TRAMO_1 === 0.1 && EMBARGO_TRAMO_2 === 0.2);

  const bajo = calcularDescuentos({ bruto: smvm - 1, periodo });
  check("por debajo del SMVM: inembargable, tramo 0", bajo.embargo.tramo === 0 && bajo.embargo.maximoSobreExcedente === 0);
  check("y la porción inembargable es todo el sueldo", casi(bajo.embargo.inembargable, smvm - 1));

  const justo = calcularDescuentos({ bruto: smvm, periodo });
  check("exactamente un SMVM sigue siendo inembargable (el decreto dice «hasta»)", justo.embargo.tramo === 0);

  const medio = calcularDescuentos({ bruto: smvm * 1.5, periodo });
  check("entre uno y dos SMVM: tramo 1 al 10%", medio.embargo.tramo === 1 && medio.embargo.porcentaje === 0.1);
  check(
    "y el 10% se aplica al EXCEDENTE del SMVM, no al total",
    casi(medio.embargo.maximoSobreExcedente, smvm * 0.5 * 0.1),
    { calculado: medio.embargo.maximoSobreExcedente, esperado: smvm * 0.5 * 0.1 },
  );

  const dobleJusto = calcularDescuentos({ bruto: smvm * 2, periodo });
  check("el doble exacto del SMVM todavía es tramo 1 (el inc. 2 dice «superiores»)", dobleJusto.embargo.tramo === 1);

  const alto = calcularDescuentos({ bruto: smvm * 3, periodo });
  check("por encima del doble: tramo 2 al 20%", alto.embargo.tramo === 2 && alto.embargo.porcentaje === 0.2);
  check(
    "la lectura principal aplica el 20% al excedente del SMVM",
    casi(alto.embargo.maximoSobreExcedente, smvm * 2 * 0.2),
  );
  check(
    "y la lectura alternativa (20% del total) se publica también: el inc. 2 no repite la base",
    alto.embargo.maximoSobreTotal !== null && casi(alto.embargo.maximoSobreTotal as number, smvm * 3 * 0.2),
  );
  check("en tramo 1 no se ofrece la lectura alternativa", medio.embargo.maximoSobreTotal === null);
}

// ── 7. Las dos bases distintas: bruto para el embargo, importe entero para la indemnización ─────
{
  const smvm = SMVM_ULTIMO.mensual;
  const periodo = SMVM_ULTIMO.periodo;
  check(
    "el art. 2º del decreto manda tomar el importe BRUTO",
    T.dec484Art2.includes("por su importe bruto") && T.dec484Art2.includes("con independencia de lo dispuesto en el artículo 133"),
  );
  const alto = calcularDescuentos({ bruto: smvm * 3, periodo });
  check(
    "sobre la indemnización el 20% se aplica al importe entero (art. 3º), no al excedente",
    casi(alto.embargoIndemnizacion.maximo, smvm * 3 * 0.2) &&
      alto.embargoIndemnizacion.maximo > alto.embargo.maximoSobreExcedente,
  );
  const medio = calcularDescuentos({ bruto: smvm * 1.5, periodo });
  check(
    "y hasta el doble del SMVM, el 10% del importe entero",
    casi(medio.embargoIndemnizacion.maximo, smvm * 1.5 * 0.1),
  );
  check(
    "el art. 3º manda considerar juntos todos los conceptos de la extinción",
    T.dec484Art3.includes("deberán considerarse conjuntamente todos los conceptos derivados de la extinción"),
  );
}

// ── 8. Alimentos fuera de los límites, y los aportes de ley contra el tope ──────────────────────
{
  const res = calcularDescuentos({ bruto: 1_000_000, periodo: SMVM_ULTIMO.periodo });
  check(
    "la página avisa como BLOQUEANTE que los alimentos no tienen estos límites",
    res.avisos.some((a) => a.tono === "bloqueante" && /aliment/i.test(a.texto)),
  );
  check(
    "el art. 4º del decreto es el que lo dice",
    T.dec484Art4.includes("no serán de aplicación en el caso de cuotas por alimentos"),
  );
  check(
    "y el art. 120 de la LCT lo confirma desde el otro lado",
    T.art120.includes("salvo por deudas alimentarias"),
  );
  check(
    "siempre se avisa que Ganancias puede exceder el 20%",
    res.avisos.some((a) => /Ganancias/.test(a.texto) && /20%/.test(a.texto)),
  );

  check(
    "los aportes de ley salen de data/sueldo.ts, no escritos a mano",
    casi(res.aportesDeLey.total, 1_000_000 * TOTAL_APORTES),
  );
  check(
    "con 17% de aportes y tope del 20%, el margen que queda son 3 puntos",
    casi(res.margenSobreTope, 1_000_000 * (TOPE_GENERAL - TOTAL_APORTES)),
    { margen: res.margenSobreTope },
  );
  check("el tope general en pesos es el 20% del bruto", casi(res.topeGeneral, 200_000));
  check("el tope de cuota solidaria en pesos es el 2% del bruto", casi(res.topeCuotaSolidaria, 20_000));
}

// ── 9. Los nueve incisos del art. 132 y las fuentes ─────────────────────────────────────────────
{
  check("están los nueve incisos del art. 132", CONCEPTOS_PERMITIDOS.length === 9);
  check(
    "los incisos van de la a) a la i), sin saltos ni repetidos",
    CONCEPTOS_PERMITIDOS.map((c) => c.inciso).join("") === "a)b)c)d)e)f)g)h)i)",
    CONCEPTOS_PERMITIDOS.map((c) => c.inciso),
  );
  check(
    "el inc. c) recuerda que el consentimiento tiene que ser EXPLÍCITO (DNU 70/2023)",
    T.art132IncC.includes("solo si existe un consentimiento explícito del empleado"),
  );
  check(
    "el inc. f) está identificado como reescrito por el art. 36 de la Ley 27.802",
    CONCEPTOS_PERMITIDOS.some((c) => c.inciso === "f)" && c.nota.includes("art. 36 de la Ley 27.802")),
  );

  const urls = DESCUENTOS_FUENTES.lista.map((f) => f.url);
  check("está citado el texto ACTUALIZADO de la LCT", urls.some((u) => u.includes("25552") && u.endsWith("texact.htm")));
  check("está citado el texto ORIGINAL de la Ley 20.744 (prueba del texto anterior)", urls.some((u) => u.includes("25552") && u.endsWith("norma.htm")));
  check("está citada la Ley 27.802 (id 423680)", urls.some((u) => u.includes("423680")));
  check("está citada la Ley 14.250 t.o. 2004 (id 98232)", urls.some((u) => u.includes("98232")));
  check("está citado el Decreto 484/87 (id 77255)", urls.some((u) => u.includes("77255")));
  check("está citada la Res. MTEySS 436/2004 (id 101307)", urls.some((u) => u.includes("101307")));
  check("todas las fuentes son de InfoLEG", urls.every((u) => u.startsWith("https://servicios.infoleg.gob.ar/")));
  check("la fecha de consulta es una fecha ISO", /^\d{4}-\d{2}-\d{2}$/.test(DESCUENTOS_FUENTES.consultadoEl));
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  "\nTodos los checks de descuentos y embargo del sueldo OK (LCT arts. 131-133 · Ley 14.250 art. 9º · Dec. 484/87 · Res. MTEySS 436/2004).",
);
