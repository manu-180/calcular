// Verificación de /honorarios-periciales — Ley 27.423 (arts. 19, 51, 60, 61 y 61 bis) reformada por
// los arts. 95 a 97 de la Ley 27.802, y la serie oficial de la UMA de la CSJN.
// Correr con: npx -y tsx scripts/check_honorarios_periciales.ts
//
// LOS ANCLAS (por qué cada uno existe):
//   1. **El piso vigente son DOS UMA, y el anterior eran SEIS.** Es el hallazgo entero de la página:
//      los arts. 95 y 96 sustituyeron los arts. 60 y 61 cambiando una sola palabra. Si alguien
//      "corrige" el 2 por el 6 (o al revés) mirando una nota vieja, esto se pone rojo.
//   2. **La fecha parte la serie.** Una regulación anterior al 6/3/2026 tiene piso de 6 UMA. La
//      calculadora NO puede aplicar el número de hoy hacia atrás: se ancla con dos fechas testigo.
//   3. **El cuarto de UMA no existía antes de la reforma.** El art. 61 bis es incorporado, no
//      sustituido: para una fecha anterior el supuesto tiene que salir BLOQUEANTE, no devolver 0,25.
//   4. **La serie de la UMA es monótona, sin huecos en el tramo continuo y ordenada de nueva a
//      vieja.** El tramo continuo es el único que la página ofrece para convertir, a propósito.
//   5. **El art. 51 se calcula por UMA, no por pesos.** Actualizar una regulación tiene que dar
//      exactamente umaReguladas × UMA de hoy — cualquier "ajuste por inflación" propio sería inventar.
//   6. **Fuera del tramo verificado se devuelve null.** Nunca se interpola un valor de UMA.
//   7. **Los textos citados son los vigentes**, con las frases que la práctica anterior contradice.
//   8. **No se publica ningún honorario estimado**: el resultado solo tiene pisos, nunca un monto
//      "sugerido" — el art. 16 in fine deja el monto a la apreciación judicial.

import {
  COBERTURA_CONTINUA_DESDE,
  CONSULTADO_EL,
  FUENTES,
  PISO_ANTERIOR_UMA,
  SERIE_UMA,
  SUPUESTOS,
  TEXTO_19,
  TEXTO_51,
  TEXTO_61_BIS_DESVINCULACION,
  UMA_VIGENTE,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/uma";
import {
  actualizarRegulacion,
  calcularPiso,
  serieContinua,
  umaVigenteEn,
} from "../src/lib/honorarios-periciales";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) <= tol;

// ── 1. El piso: 2 UMA hoy, 6 UMA antes ────────────────────────────────────────────────────────
{
  const noPec = SUPUESTOS.find((s) => s.clave === "noPecuniario")!;
  const pec = SUPUESTOS.find((s) => s.clave === "pecuniario")!;
  const sinPericia = SUPUESTOS.find((s) => s.clave === "sinPericia")!;

  check("art. 60 — el piso vigente es de 2 UMA", noPec.uma === 2, noPec.uma);
  check("art. 61 — el piso vigente es de 2 UMA", pec.uma === 2, pec.uma);
  check("art. 60 — el piso anterior era de 6 UMA", noPec.umaAnterior === 6, noPec.umaAnterior);
  check("art. 61 — el piso anterior era de 6 UMA", pec.umaAnterior === 6, pec.umaAnterior);
  check("el piso anterior declarado es 6 UMA", PISO_ANTERIOR_UMA === 6, PISO_ANTERIOR_UMA);
  check("art. 61 bis — el proceso sin pericia son 0,25 UMA", sinPericia.uma === 0.25, sinPericia.uma);
  check(
    "art. 61 bis — es un supuesto NUEVO: no tenía piso anterior",
    sinPericia.umaAnterior === null,
    sinPericia.umaAnterior,
  );
  check(
    "el texto del art. 60 dice «dos (2) UMA» y no «seis (6)»",
    noPec.texto.includes("dos (2) UMA") && !noPec.texto.includes("seis (6)"),
  );
  check(
    "el texto del art. 61 dice «dos (2) UMA»",
    pec.texto.includes("dos (2) UMA"),
  );
  check(
    "el texto del art. 61 bis dice «un cuarto (1/4) de UMA»",
    sinPericia.texto.includes("un cuarto (1/4) de UMA"),
  );
  check(
    "cada supuesto cita el artículo que lo sustituye o incorpora",
    SUPUESTOS.every((s) => /Ley 27\.423/.test(s.articulo) && /Ley 27\.802/.test(s.articulo)),
  );
  check(
    "cada supuesto declara qué hace falta para tener derecho al piso",
    SUPUESTOS.every((s) => s.requisito.length > 40),
  );
}

// ── 2. La fecha parte la serie: el piso viejo NO se aplica hacia adelante ni al revés ──────────
{
  const hoy = calcularPiso("pecuniario", "2026-07-15")!;
  const antes = calcularPiso("pecuniario", "2026-01-15")!;

  check("regulación posterior a la reforma → 2 UMA", hoy.umaDelPiso === 2, hoy.umaDelPiso);
  check("regulación anterior a la reforma → 6 UMA", antes.umaDelPiso === 6, antes.umaDelPiso);
  check(
    "la reforma rige desde el 6/3/2026 (B.O. de la Ley 27.802)",
    VIGENCIA_REFORMA_ISO === "2026-03-06",
    VIGENCIA_REFORMA_ISO,
  );
  const justoAntes = calcularPiso("pecuniario", "2026-03-05")!;
  const elDia = calcularPiso("pecuniario", "2026-03-06")!;
  check("el 5/3/2026 todavía rige el piso de 6 UMA", justoAntes.umaDelPiso === 6);
  check("el 6/3/2026 ya rige el piso de 2 UMA", elDia.umaDelPiso === 2);
  check(
    "una regulación anterior avisa que rige la redacción vieja",
    antes.avisos.some((a) => a.tono === "atencion" && /piso era de 6 UMA/.test(a.texto)),
    antes.avisos,
  );
  check(
    "toda respuesta aclara que es un mínimo y no una estimación",
    [hoy, antes].every((r) => r.avisos.some((a) => /mínimo, no una estimación/.test(a.texto))),
  );
}

// ── 3. El cuarto de UMA no existe antes del 6/3/2026 ──────────────────────────────────────────
{
  const antes = calcularPiso("sinPericia", "2026-02-01")!;
  check("sin pericia, antes de la reforma → sin piso escrito", antes.totalPesos === 0, antes.totalPesos);
  check(
    "sin pericia, antes de la reforma → aviso BLOQUEANTE",
    antes.avisos.some((a) => a.tono === "bloqueante"),
    antes.avisos,
  );
  const despues = calcularPiso("sinPericia", "2026-07-01")!;
  check(
    "sin pericia, después de la reforma → 0,25 × UMA",
    casi(despues.totalPesos, 0.25 * despues.uma.valor),
    { total: despues.totalPesos, uma: despues.uma.valor },
  );
  check(
    "sin pericia NO se multiplica por cantidad de pericias (no hubo pericia)",
    calcularPiso("sinPericia", "2026-07-01", 5)!.pericias === 1,
  );
  check(
    "sin pericia exige haber aceptado el cargo",
    despues.avisos.some((a) => /aceptado el cargo/.test(a.texto)),
  );
}

// ── 4. La aritmética del piso ─────────────────────────────────────────────────────────────────
{
  const r = calcularPiso("pecuniario", "2026-07-10", 3)!;
  check("el piso en pesos es UMA × cantidad de UMA", casi(r.pisoPesos, 2 * r.uma.valor), r.pisoPesos);
  check("el total multiplica por las pericias (art. 61 bis)", casi(r.totalPesos, r.pisoPesos * 3));
  check("las pericias se redondean hacia abajo y nunca bajan de 1", calcularPiso("pecuniario", "2026-07-10", 0)!.pericias === 1);
  check(
    "la comparación con la reforma usa el mismo valor de UMA",
    r.comparacionReforma !== null && casi(r.comparacionReforma.pisoAnteriorPesos, 6 * r.uma.valor * 3),
    r.comparacionReforma,
  );
  check(
    "la caída del piso es de dos tercios (de 6 a 2 UMA)",
    r.comparacionReforma !== null && casi(r.comparacionReforma.caidaPorcentual, 2 / 3),
    r.comparacionReforma?.caidaPorcentual,
  );
  check(
    "una regulación anterior no compara contra sí misma",
    calcularPiso("pecuniario", "2026-01-10")!.comparacionReforma === null,
  );
  check(
    "el piso vigente de la UMA de hoy son $208.440 (2 × $104.220)",
    casi(calcularPiso("pecuniario", UMA_VIGENTE.desde)!.pisoPesos, 2 * UMA_VIGENTE.valor),
  );
}

// ── 5. La serie de la UMA: ordenada, sin huecos en el tramo continuo, y creciente ──────────────
{
  check("la serie no está vacía", SERIE_UMA.length > 0);
  check(
    "la serie va de la más nueva a la más vieja",
    SERIE_UMA.every((f, i) => i === 0 || SERIE_UMA[i - 1].desde > f.desde),
  );
  check(
    "todo valor es un entero positivo (art. 19: «eliminando las fracciones decimales»)",
    SERIE_UMA.every((f) => Number.isInteger(f.valor) && f.valor > 0),
  );
  check(
    "los valores crecen con el tiempo (la UMA nunca bajó)",
    SERIE_UMA.every((f, i) => i === 0 || SERIE_UMA[i - 1].valor > f.valor),
  );
  check(
    "toda fila declara su resolución, su fecha y el docId del PDF",
    SERIE_UMA.every(
      (f) => /^\d+\/\d{4}$/.test(f.resolucion) && /^\d{4}-\d{2}-\d{2}$/.test(f.resolucionFecha) && f.docId > 0,
    ),
  );
  check(
    "la resolución siempre es posterior a la vigencia que fija (la Corte publica después)",
    SERIE_UMA.every((f) => f.resolucionFecha > f.desde),
  );
  check("UMA_VIGENTE es la primera de la serie", UMA_VIGENTE === SERIE_UMA[0]);

  // El tramo continuo tiene que ser mes a mes, sin saltos.
  const continua = serieContinua();
  const meses = continua.map((f) => f.desde.slice(0, 7));
  const huecos = meses.filter((m, i) => {
    if (i === 0) return false;
    const [a, b] = [meses[i - 1], m].map((x) => {
      const [y, mm] = x.split("-").map(Number);
      return y * 12 + mm;
    });
    return a - b !== 1;
  });
  check("el tramo continuo es mes a mes, sin huecos", huecos.length === 0, huecos);
  check(
    "el tramo continuo arranca en la fecha declarada",
    continua[continua.length - 1].desde === COBERTURA_CONTINUA_DESDE,
    { primera: continua[continua.length - 1]?.desde, declarada: COBERTURA_CONTINUA_DESDE },
  );
  check("todas las filas del tramo continuo empiezan el día 1", continua.every((f) => f.desde.endsWith("-01")));
}

// ── 6. Fuera del tramo verificado: null, nunca un valor interpolado ───────────────────────────
{
  check("una fecha anterior al tramo continuo devuelve null", umaVigenteEn("2024-08-15") === null);
  check("una fecha mal formada devuelve null", umaVigenteEn("15/08/2026") === null);
  check("calcularPiso devuelve null fuera del tramo", calcularPiso("pecuniario", "2020-01-01") === null);
  check("actualizarRegulacion devuelve null fuera del tramo", actualizarRegulacion(10, "2020-01-01") === null);
  check(
    "una fecha del tramo devuelve la vigencia que la contiene, no la próxima",
    umaVigenteEn("2026-07-31")?.desde === "2026-07-01",
    umaVigenteEn("2026-07-31"),
  );
  check(
    "el día exacto de una vigencia ya usa el valor nuevo",
    umaVigenteEn("2026-07-01")?.valor === 104_220,
    umaVigenteEn("2026-07-01"),
  );
}

// ── 7. Art. 51: el pago cancelatorio se mide en UMA, no en pesos nominales ────────────────────
{
  const r = actualizarRegulacion(8, "2025-06-15")!;
  check("el monto de entonces es UMA de entonces × cantidad", casi(r.montoEntonces, 8 * 74_376), r.montoEntonces);
  check("el monto de hoy es UMA de hoy × cantidad", casi(r.montoHoy, 8 * UMA_VIGENTE.valor), r.montoHoy);
  check("la diferencia cierra", casi(r.diferencia, r.montoHoy - r.montoEntonces));
  check("la variación es el cociente de las dos UMA", casi(r.variacion, UMA_VIGENTE.valor / 74_376 - 1));
  check("una cantidad de UMA no positiva devuelve null", actualizarRegulacion(0, "2025-06-15") === null);
  check(
    "avisa que el valor que cancela es el del momento del pago",
    r.avisos.some((a) => /momento del pago/.test(a.texto)),
  );
  check(
    "avisa que la resolución debe expresar las UMA bajo pena de nulidad",
    r.avisos.some((a) => /pena de nulidad/.test(a.texto)),
  );
}

// ── 8. Los textos citados son los vigentes ────────────────────────────────────────────────────
{
  check(
    "el art. 61 bis publica la desvinculación de la cuantía del juicio",
    TEXTO_61_BIS_DESVINCULACION.includes("no estarán vinculados a la cuantía del respectivo juicio"),
  );
  check(
    "el art. 61 bis publica la desvinculación del porcentaje de incapacidad",
    TEXTO_61_BIS_DESVINCULACION.includes("porcentaje de incapacidad"),
  );
  check(
    "el art. 61 bis fija dos UMA por cada pericia",
    TEXTO_61_BIS_DESVINCULACION.includes("Por cada pericia") &&
      TEXTO_61_BIS_DESVINCULACION.includes("dos (2) UMA"),
  );
  check("el art. 51 exige el monto en pesos Y la cantidad de UMA", TEXTO_51.includes("cantidad de UMA"));
  check("el art. 51 dice «según su valor vigente al momento del pago»", TEXTO_51.includes("al momento del pago"));
  check("el art. 19 define la UMA como el 3% del sueldo del juez federal", TEXTO_19.includes("tres por ciento"));
  check("el art. 19 manda eliminar las fracciones decimales", TEXTO_19.includes("eliminando las fracciones decimales"));
}

// ── 9. Nada inventado: ni honorario estimado, ni fuentes no oficiales ─────────────────────────
{
  const r = calcularPiso("pecuniario", "2026-07-10", 2)!;
  const campos = Object.keys(r);
  check(
    "el resultado no publica ningún honorario 'estimado' ni 'sugerido'",
    !campos.some((c) => /estimad|sugerid|probable/i.test(c)),
    campos,
  );
  const oficiales = /^https:\/\/(servicios\.infoleg\.gob\.ar|www\.csjn\.gov\.ar)\//;
  check("todas las fuentes son oficiales (InfoLEG o CSJN)", FUENTES.every((f) => oficiales.test(f.url)), FUENTES.map((f) => f.url));
  check("hay fuente de la Ley 27.423, de la 27.802 y de la CSJN", FUENTES.length >= 4);
  check("la fecha de consulta está declarada", /^\d{4}-\d{2}-\d{2}$/.test(CONSULTADO_EL), CONSULTADO_EL);
  check(
    "la fuente de la UMA vigente apunta al PDF de SU resolución",
    FUENTES.some((f) => f.url.includes(String(UMA_VIGENTE.docId))),
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de honorarios periciales OK (Ley 27.423 arts. 19, 51, 60, 61 y 61 bis · Ley 27.802 arts. 95-97 · serie UMA de la CSJN)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
