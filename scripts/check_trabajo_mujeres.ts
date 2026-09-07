// Verificación de la página de trabajo de mujeres (LCT Título VII, Capítulo I: arts. 174, 175 y
// 176 derogados por el art. 207 de la Ley 27.802). Correr con:
//   npx tsx scripts/check_trabajo_mujeres.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **Los tres artículos derogados son 174, 175 y 176 y ninguno más.** Si alguna vez alguien
//      agrega el 113 (propinas, que tiene página propia) o el 172 (que está intacto), la página
//      pasa a afirmar que se derogó algo que no se derogó.
//   2. **La nota de derogación tiene que decir «a partir de su publicación»**, que es lo que
//      separa a estos tres de las leyes enteras del Título XXVI, diferidas al 1/1/2027. Es la
//      diferencia entre «ya no rige» y «va a dejar de regir».
//   3. **El texto del art. 176 tiene que conservar la remisión al art. 195.** Esa oración es el
//      hallazgo entero de la página: sin ella, la derogación parece sólo la caída de una
//      prohibición y no la pérdida de una presunción de responsabilidad.
//   4. **El art. 172 y el art. 195 se citan como VIGENTES.** Si el texto guardado del 172 pierde
//      la igualdad de retribución por trabajo de igual valor, la página deja de mostrar lo que
//      quedó en pie, que es la mitad de su valor informativo.
//   5. **Los topes de jornada no se inventan**: 8/48 en el régimen general y 6/36 con
//      insalubridad DECLARADA. El motor tiene que elegir el par correcto según la declaración, no
//      según la tarea.
//   6. **Sacar el descanso no agrega horas trabajadas.** La amplitud baja exactamente lo que
//      duraba el descanso y las horas semanales quedan iguales: si un refactor mezcla las dos
//      cosas, el número grande de la página miente.
//   7. **El excedente por encima del tope se paga con el recargo del 50%** (art. 201) y se
//      valoriza con el valor de la hora real, no con un divisor inventado.
//   8. **Higiene de fuentes:** todas oficiales, salvo UNA excepción declarada y acotada — la
//      captura del Internet Archive, que tiene que envolver la URL de InfoLEG y ser anterior al
//      6/3/2026. Es la única forma honesta de citar un texto que la fuente viva ya no muestra.

import {
  ARTICULOS_DEROGADOS,
  ARTICULO_DEROGATORIO,
  FUENTE_TEXTO_ANTERIOR,
  JORNADA_INSALUBRE_DIARIA,
  JORNADA_INSALUBRE_SEMANAL,
  JORNADA_MAXIMA_DIARIA,
  JORNADA_MAXIMA_SEMANAL,
  NOTA_DEROGACION,
  PAUSA_ENTRE_JORNADAS,
  RECARGO_COMUN,
  SEMANAS_POR_MES,
  TEXTOS_DEROGADOS,
  TEXTOS_VIGENTES,
  TRABAJO_A_DOMICILIO_12713,
  TRABAJO_MUJERES_FUENTES,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/trabajo-mujeres";
import { calcularTrabajoMujeres } from "../src/lib/trabajo-mujeres";

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

// ── 1. Qué se derogó, exactamente ──────────────────────────────────────────────────────────────
{
  check(
    "los artículos derogados en este capítulo son 174, 175 y 176",
    ARTICULOS_DEROGADOS.join(",") === "174,175,176",
    ARTICULOS_DEROGADOS,
  );
  check("el artículo derogatorio de la Ley 27.802 es el 207", ARTICULO_DEROGATORIO === 207);
  check(
    "hay un texto guardado por cada artículo derogado",
    TEXTOS_DEROGADOS.length === ARTICULOS_DEROGADOS.length &&
      ARTICULOS_DEROGADOS.every((n) => TEXTOS_DEROGADOS.some((t) => t.articulo === n)),
  );
  const derogados: number[] = [...ARTICULOS_DEROGADOS];
  check(
    "ninguno de los tres es el art. 113, que ya tiene página propia en /propinas",
    !derogados.includes(113),
  );
  check("el art. 172 NO figura como derogado (está intacto)", !derogados.includes(172));
}

// ── 2. La vigencia: sin fecha diferida ─────────────────────────────────────────────────────────
{
  check(
    "la nota de derogación cita el art. 207 de la Ley 27.802 y el B.O. 6/3/2026",
    NOTA_DEROGACION.includes("art. 207") &&
      NOTA_DEROGACION.includes("27.802") &&
      NOTA_DEROGACION.includes("6/3/2026"),
    NOTA_DEROGACION,
  );
  check(
    "la vigencia es «a partir de su publicación», NO diferida al 1/1/2027",
    NOTA_DEROGACION.includes("a partir de su publicación en el Boletín Oficial") &&
      !/1\/1\/2027|1º de enero de 2027/.test(NOTA_DEROGACION),
  );
  check("la fecha ISO de vigencia es el 6/3/2026", VIGENCIA_REFORMA_ISO === "2026-03-06");
}

// ── 3. El hallazgo: la remisión del art. 176 al art. 195 ───────────────────────────────────────
{
  const art176 = TEXTOS_DEROGADOS.find((t) => t.articulo === 176)!;
  check(
    "el texto del art. 176 conserva la remisión al artículo 195",
    /Regirá con respecto al empleo de mujeres lo dispuesto en el artículo 195/.test(art176.texto),
    art176.texto,
  );
  check(
    "el art. 176 prohibía tareas penosas, peligrosas o insalubres",
    /penoso, peligroso o insalubre/.test(art176.texto),
  );
  check(
    "el «lo que rige hoy» del 176 avisa que se perdió la presunción del art. 195",
    /195/.test(art176.loQueRigeHoy) && /prueba en contrario/.test(art176.loQueRigeHoy),
  );
  check(
    "el art. 195 vigente presume la responsabilidad del empleador sin admitir prueba en contrario",
    TEXTOS_VIGENTES.art195.includes("por ese solo hecho") &&
      TEXTOS_VIGENTES.art195.includes("sin admitirse prueba en contrario"),
  );
  check(
    "…y su alcance es «comprendida en el presente título» (por eso hacía falta el puente del 176)",
    TEXTOS_VIGENTES.art195.includes("comprendida en el presente título"),
  );
}

// ── 4. Los otros dos textos derogados ──────────────────────────────────────────────────────────
{
  const art174 = TEXTOS_DEROGADOS.find((t) => t.articulo === 174)!;
  const art175 = TEXTOS_DEROGADOS.find((t) => t.articulo === 175)!;
  check(
    "el art. 174 fijaba un descanso de DOS horas al mediodía",
    /descanso de dos \(2\) horas al mediodía/.test(art174.texto),
    art174.texto,
  );
  check(
    "…y su epígrafe es «Descanso al mediodía»",
    art174.epigrafe === "Descanso al mediodía",
  );
  check(
    "el «lo que rige hoy» del 174 remite al convenio (art. 8) y a los topes de jornada",
    /art\. 8/.test(art174.loQueRigeHoy) && /48/.test(art174.loQueRigeHoy),
  );
  check(
    "el art. 175 prohibía encargar trabajo a domicilio a la mujer ocupada en el local",
    /prohibido encargar la ejecución de trabajos a domicilio/.test(art175.texto),
  );
  check(
    "el «lo que rige hoy» del 175 nombra la Ley 12.713 y ARCA",
    /12\.713/.test(art175.loQueRigeHoy) && /ARCA/.test(art175.loQueRigeHoy),
  );
}

// ── 5. Lo que quedó en pie ─────────────────────────────────────────────────────────────────────
{
  check(
    "el art. 172 vigente prohíbe la discriminación por sexo o estado civil",
    /ningún tipo de discriminación en su empleo fundada en el sexo o estado civil/.test(
      TEXTOS_VIGENTES.art172,
    ),
  );
  check(
    "…y garantiza igual retribución por trabajo de igual valor",
    /igualdad de retribución por trabajo de igual valor/.test(TEXTOS_VIGENTES.art172),
  );
  check(
    "el art. 173 figura como derogado por la Ley 24.013 en 1991, no por la 27.802",
    TEXTOS_VIGENTES.art173Nota.includes("24.013") &&
      TEXTOS_VIGENTES.art173Nota.includes("17/12/1991") &&
      !TEXTOS_VIGENTES.art173Nota.includes("27.802"),
  );
  check(
    "el art. 200 exige declaración previa de la autoridad para que exista insalubridad",
    /La insalubridad no existirá sin declaración previa de la autoridad de aplicación/.test(
      TEXTOS_VIGENTES.art200Insalubre,
    ),
  );
  check(
    "…y aclara que la reducción de jornada no baja la remuneración",
    /La reducción de jornada no importará disminución de las remuneraciones/.test(
      TEXTOS_VIGENTES.art200Insalubre,
    ),
  );
  check(
    "el art. 196 remite a la Ley 11.544",
    /regirá por la ley 11\.544/i.test(TEXTOS_VIGENTES.art196),
  );
  check(
    "el art. 8 dice que las convenciones más favorables son válidas y de aplicación",
    /serán válidas y de aplicación/.test(TEXTOS_VIGENTES.art8),
  );
  check(
    "la pausa entre jornadas del art. 197 son 12 horas y coincide con la constante",
    PAUSA_ENTRE_JORNADAS === 12 && /doce \(12\) horas/.test(TEXTOS_VIGENTES.art197Pausa),
  );
}

// ── 6. El Título IX: trabajo a domicilio (Ley 12.713) ──────────────────────────────────────────
{
  check("son dos artículos de la Ley 27.802", TRABAJO_A_DOMICILIO_12713.length === 2);
  check(
    "son el 105 y el 106",
    TRABAJO_A_DOMICILIO_12713.map((t) => t.articulo).join(",") === "105,106",
  );
  check(
    "el 105 sustituye el art. 6° de la Ley 12.713 y manda registrar por ARCA",
    TRABAJO_A_DOMICILIO_12713[0].sustituye.includes("6°") &&
      TRABAJO_A_DOMICILIO_12713[0].que.includes("ARCA"),
  );
  check(
    "el 106 sustituye el art. 31 y remite al Anexo II de la Ley 25.212",
    TRABAJO_A_DOMICILIO_12713[1].sustituye.includes("31") &&
      TRABAJO_A_DOMICILIO_12713[1].que.includes("25.212"),
  );
}

// ── 7. Los topes de jornada, y que el motor elija el par correcto ──────────────────────────────
{
  check(
    "el tope general es 8 diarias / 48 semanales",
    JORNADA_MAXIMA_DIARIA === 8 && JORNADA_MAXIMA_SEMANAL === 48,
  );
  check(
    "el tope con insalubridad declarada es 6 diarias / 36 semanales",
    JORNADA_INSALUBRE_DIARIA === 6 && JORNADA_INSALUBRE_SEMANAL === 36,
  );

  const general = calcularTrabajoMujeres({
    horasDiarias: 8,
    diasPorSemana: 5,
    descansoMediodia: 2,
    insalubreDeclarada: false,
    enConvenio: false,
  });
  check("sin declaración, el régimen es general", general.regimen === "general");
  check("…y los topes son 8 y 48", general.topeDiario === 8 && general.topeSemanal === 48);

  const insalubre = calcularTrabajoMujeres({
    horasDiarias: 8,
    diasPorSemana: 5,
    descansoMediodia: 2,
    insalubreDeclarada: true,
    enConvenio: false,
  });
  check("con declaración, el régimen es insalubre", insalubre.regimen === "insalubre");
  check("…y los topes bajan a 6 y 36", insalubre.topeDiario === 6 && insalubre.topeSemanal === 36);
  check(
    "…y 40 horas semanales pasan a ser 4 de excedente sobre el tope de 36",
    casi(insalubre.excedenteSemanal, 4),
    insalubre.excedenteSemanal,
  );
  check(
    "…y se avisa que cayó la presunción del art. 195",
    insalubre.avisos.some((a) => /195/.test(a.texto) && a.tono === "bloqueante"),
  );
}

// ── 8. Sacar el descanso no agrega horas trabajadas ────────────────────────────────────────────
{
  const r = calcularTrabajoMujeres({
    horasDiarias: 8,
    diasPorSemana: 5,
    descansoMediodia: 2,
    insalubreDeclarada: false,
    enConvenio: false,
  });
  check("las horas trabajadas por día no cambian", casi(r.horasDiarias, 8));
  check("las horas semanales son 8 × 5 = 40", casi(r.horasSemanales, 40));
  check("la amplitud anterior era jornada + descanso = 10 h", casi(r.amplitudAntes, 10));
  check("la amplitud de hoy es la jornada pelada = 8 h", casi(r.amplitudAhora, 8));
  check("se liberan exactamente las 2 h del descanso", casi(r.liberadasPorDia, 2));
  check("…10 h por semana", casi(r.liberadasPorSemana, 10));
  check("…y 10 × 52/12 por mes", casi(r.liberadasPorMes, 10 * SEMANAS_POR_MES, 0.1));
  check(
    "con 40 h semanales y tope 48 no hay excedente",
    r.excedenteSemanal === 0,
    r.excedenteSemanal,
  );
  check(
    "sin cláusula de convenio se avisa que no queda pausa legal",
    r.avisos.some((a) => a.tono === "atencion" && /pausa legal obligatoria/.test(a.texto)),
  );

  const conConvenio = calcularTrabajoMujeres({
    horasDiarias: 8,
    diasPorSemana: 5,
    descansoMediodia: 2,
    insalubreDeclarada: false,
    enConvenio: true,
  });
  check(
    "con cláusula de convenio se avisa que el descanso sobrevive por el art. 8",
    conConvenio.avisos.some((a) => a.tono === "ok" && /art\. 8/.test(a.texto)),
  );
}

// ── 9. El excedente se paga con el recargo del art. 201 ────────────────────────────────────────
{
  check("el recargo de días comunes es el 50%", RECARGO_COMUN === 0.5);

  // 9 h × 6 días = 54 semanales: 6 por encima del tope general de 48.
  const r = calcularTrabajoMujeres({
    horasDiarias: 9,
    diasPorSemana: 6,
    descansoMediodia: 2,
    insalubreDeclarada: false,
    enConvenio: false,
    sueldoMensual: 1_000_000,
  });
  check("54 horas semanales dan 6 de excedente", casi(r.excedenteSemanal, 6));
  const horasMensuales = 54 * SEMANAS_POR_MES;
  const valorHoraEsperado = 1_000_000 / horasMensuales;
  check(
    "el valor hora sale del sueldo dividido las horas mensuales REALES (no un divisor inventado)",
    casi(r.valorHora, Math.round(valorHoraEsperado * 100) / 100, 0.02),
    { esperado: valorHoraEsperado, obtenido: r.valorHora },
  );
  check(
    "el excedente mensual es horas × 52/12 × valor hora × 1,5",
    casi(r.excedenteMensualEnPesos, 6 * SEMANAS_POR_MES * r.valorHora * 1.5, 1),
    r.excedenteMensualEnPesos,
  );
  check(
    "se avisa que el excedente son horas suplementarias del art. 201",
    r.avisos.some((a) => a.tono === "bloqueante" && /201/.test(a.texto)),
  );
  check(
    "…y que superar el tope diario también se marca",
    r.avisos.some((a) => a.tono === "bloqueante" && /tope de 8 horas/.test(a.texto)),
  );
}

{
  const sinSueldo = calcularTrabajoMujeres({
    horasDiarias: 9,
    diasPorSemana: 6,
    descansoMediodia: 2,
    insalubreDeclarada: false,
    enConvenio: false,
  });
  check(
    "sin sueldo cargado, el valor hora y el importe quedan en cero",
    sinSueldo.valorHora === 0 && sinSueldo.excedenteMensualEnPesos === 0,
  );
}

// ── 10. Higiene de fuentes ─────────────────────────────────────────────────────────────────────
{
  check(
    "todas las fuentes vivas son oficiales (infoleg / boletinoficial / argentina.gob.ar)",
    TRABAJO_MUJERES_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina)\.gob\.ar\//.test(
        f.url,
      ),
    ),
    TRABAJO_MUJERES_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto ACTUALIZADO de la LCT",
    TRABAJO_MUJERES_FUENTES.lista.some(
      (f) => f.url.includes("25552") && f.url.endsWith("texact.htm"),
    ),
  );
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    TRABAJO_MUJERES_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(TRABAJO_MUJERES_FUENTES.consultadoEl),
  );

  // La única excepción admitida: la captura del texto anterior. Tiene que envolver la URL oficial
  // de InfoLEG y ser ANTERIOR a la vigencia de la reforma, o no prueba nada.
  check(
    "la captura del texto anterior envuelve la URL oficial de InfoLEG",
    FUENTE_TEXTO_ANTERIOR.urlArchivada.startsWith("https://web.archive.org/web/") &&
      FUENTE_TEXTO_ANTERIOR.urlArchivada.includes(
        "servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      ),
    FUENTE_TEXTO_ANTERIOR.urlArchivada,
  );
  check(
    "…y la captura es anterior al 6/3/2026",
    FUENTE_TEXTO_ANTERIOR.capturaDel < VIGENCIA_REFORMA_ISO,
    FUENTE_TEXTO_ANTERIOR.capturaDel,
  );
  check(
    "…y la fuente explica el control cruzado contra el texto original de la Ley 20.744",
    /20\.744/.test(FUENTE_TEXTO_ANTERIOR.detalle) &&
      /390\/1976/.test(FUENTE_TEXTO_ANTERIOR.detalle),
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  "\nTodos los checks de trabajo de mujeres OK (LCT arts. 174, 175 y 176 derogados · Ley 27.802 art. 207).",
);
