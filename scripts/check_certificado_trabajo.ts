// Verificación de la página del certificado de trabajo (LCT art. 80, texto de la Ley 27.802,
// reglamentado por la RG ARCA 5848/2026, con los dos regímenes anteriores).
// Correr con: npx tsx scripts/check_certificado_trabajo.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **El texto vigente NO puede contener la multa.** Todo el valor de la página es esa ausencia:
//      si alguna vez la cita guardada del art. 80 volviera a traer «tres veces la mejor
//      remuneración», la página estaría publicando lo mismo que copia el resto de la web.
//   2. **Las dos fechas bisagra son inamovibles**: 9/7/2024 (art. 99 de la Ley 27.742, «al día
//      siguiente» de su B.O.) y 6/3/2026 (art. 25 de la Ley 27.802). De ellas sale el régimen, y
//      un corrimiento de un día cambia la respuesta para quien se extinguió justo ese día.
//   3. **El régimen se decide por la fecha de extinción y por nada más.** Se prueban los bordes
//      exactos: el día anterior, el día mismo y el día siguiente de cada bisagra.
//   4. **Los 45 días son HÁBILES y los 30 son CORRIDOS.** Confundirlos es el error más fácil y el
//      más caro: el plazo de entrega tiene que saltear sábados, domingos y feriados; el del
//      decreto, no.
//   5. **El cómputo arranca al día siguiente** (art. 6 CCyC), nunca el mismo día.
//   6. **La indemnización es 3 × la mejor remuneración**, y sólo se muestra como derecho firme
//      para extinciones anteriores al 9/7/2024.
//   7. **Ningún plazo cae en día no hábil**: si el vencimiento cayera sábado o feriado, el motor
//      contó mal.
//   8. **Las fuentes son todas oficiales** y está citado el texto ACTUALIZADO de la LCT.

import {
  CERTIFICADO_FUENTES,
  CERTIFICADO_TEXTOS,
  DIAS_CORRIDOS_PARA_INTIMAR,
  DIAS_HABILES_DEL_REQUERIMIENTO,
  EN_TRABAJO_EN_BLANCO,
  FORMAS_DE_CUMPLIR,
  FORMULARIO,
  MULTIPLICADOR_MULTA,
  PLAZO_ENTREGA_DIAS_HABILES,
  VIGENCIA_BASES_ISO,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/certificado-trabajo";
import {
  calcularCertificado,
  formatFechaLarga,
  regimenDe,
  sumarDiasHabiles,
} from "../src/lib/certificado-trabajo";
import { esHabil } from "../src/lib/feriados";
import { parseFechaISO } from "../src/lib/licencias";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const HOY = "2026-08-17";

// ── 1. El texto vigente dice lo que dice la norma, y NO dice lo que ya no dice ────────────────
{
  const t = CERTIFICADO_TEXTOS;
  check(
    "el art. 80 vigente fija el plazo de cuarenta y cinco (45) días hábiles",
    t.art80Vigente.includes("cuarenta y cinco (45) días hábiles"),
    t.art80Vigente.slice(0, 120),
  );
  check(
    "…y enumera las capacitaciones realizadas, que es lo nuevo del texto de 2026",
    t.art80Vigente.includes("las capacitaciones realizadas"),
  );
  check(
    "…y admite el cumplimiento por la información publicada por ARCA",
    /Agencia de Recaudación y Control Aduanero \(ARCA\)/.test(t.art80Vigente) &&
      t.art80Vigente.includes("también se considerará cumplida"),
  );
  check(
    "EL ANCLA: el texto vigente NO contiene la indemnización de tres remuneraciones",
    !/tres veces la mejor remuneración/i.test(t.art80Vigente),
    t.art80Vigente,
  );
  check(
    "la nota del art. 80 cita la sustitución por el art. 25 de la Ley 27.802",
    t.art80Nota.includes("art. 25") && t.art80Nota.includes("27.802"),
    t.art80Nota,
  );
  check(
    "la nota de InfoLEG remite a la RG ARCA 5848/2026",
    t.art80NotaArca.includes("5848/2026") && t.art80NotaArca.includes("18/05/2026"),
  );
  check(
    "el párrafo derogado se guarda textual, con sus dos días hábiles y sus tres remuneraciones",
    t.parrafoDerogado.includes("dos (2) días hábiles") &&
      t.parrafoDerogado.includes("tres veces la mejor remuneración mensual, normal y habitual"),
  );
  check(
    "…y su nota dice que lo derogó el art. 99 de la Ley 27.742",
    t.parrafoDerogadoNota.includes("art. 99") && t.parrafoDerogadoNota.includes("27.742"),
    t.parrafoDerogadoNota,
  );
  check(
    "el art. 3 del Decreto 146/2001 exige TREINTA (30) días corridos",
    t.dec146art3.includes("TREINTA (30) días corridos"),
  );
  check(
    "la cita de la RG 5848 nombra el F.984 y Simplificación Registral",
    t.rg5848art1.includes("F.984") && t.rg5848art1.includes("Simplificación Registral"),
  );
}

// ── 2. Las constantes son las de la norma ──────────────────────────────────────────────────────
{
  check("el plazo de entrega es de 45 días hábiles", PLAZO_ENTREGA_DIAS_HABILES === 45);
  check("la habilitación para intimar era a los 30 días corridos", DIAS_CORRIDOS_PARA_INTIMAR === 30);
  check("el requerimiento daba 2 días hábiles", DIAS_HABILES_DEL_REQUERIMIENTO === 2);
  check("la indemnización derogada era de 3 remuneraciones", MULTIPLICADOR_MULTA === 3);
  check("el formulario es el F. 984", FORMULARIO === "F. 984");
  check("la Ley Bases rige desde el 9/7/2024 (día siguiente al B.O.)", VIGENCIA_BASES_ISO === "2024-07-09");
  check("la Ley 27.802 rige desde el 6/3/2026", VIGENCIA_REFORMA_ISO === "2026-03-06");
  check("hay tres formas de cumplir, y ninguna vacía", FORMAS_DE_CUMPLIR.length === 3 &&
    FORMAS_DE_CUMPLIR.every((f) => f.detalle.length > 60));
  check("Trabajo en Blanco lista cuatro operaciones", EN_TRABAJO_EN_BLANCO.length === 4);
}

// ── 3. El régimen sale de la fecha de extinción, y los bordes son exactos ─────────────────────
{
  check("una extinción de 2020 cae en el régimen anterior", regimenDe("2020-05-01") === "anterior");
  check("el 8/7/2024 todavía es régimen anterior", regimenDe("2024-07-08") === "anterior");
  check("el 9/7/2024 ya es la zona gris", regimenDe("2024-07-09") === "transicion");
  check("el 5/3/2026 sigue siendo zona gris", regimenDe("2026-03-05") === "transicion");
  check("el 6/3/2026 ya es el régimen vigente", regimenDe("2026-03-06") === "vigente");
  check("una extinción posterior también", regimenDe("2026-12-31") === "vigente");
}

// ── 4. Días hábiles vs. días corridos ──────────────────────────────────────────────────────────
{
  // Viernes 3/7/2026. El 9/7 (Independencia) y el 10/7 (turístico) caen dentro del tramo.
  const p = sumarDiasHabiles("2026-07-03", 5);
  check("suma de hábiles: devuelve resultado", p !== null);
  if (p) {
    check(
      "arranca al día siguiente y saltea el fin de semana (art. 6 CCyC)",
      p.salteados.some((s) => s.fecha === "2026-07-04" && s.motivo === "sábado") &&
        p.salteados.some((s) => s.fecha === "2026-07-05" && s.motivo === "domingo"),
      p.salteados,
    );
    check(
      "saltea el 9 de julio por ser feriado, no por ser fin de semana",
      p.salteados.some((s) => s.fecha === "2026-07-09" && /Independencia/i.test(s.motivo)),
      p.salteados,
    );
    check("el vencimiento nunca cae en día no hábil", esHabil(parseFechaISO(p.vence)!, false), p.vence);
  }

  // 45 días hábiles siempre abarcan más de 45 corridos: hay al menos 18 días de fin de semana.
  for (const desde of ["2026-03-06", "2026-06-30", "2026-01-02"]) {
    const largo = sumarDiasHabiles(desde, PLAZO_ENTREGA_DIAS_HABILES);
    check(`45 hábiles desde ${desde} abarcan más de 60 corridos`, (largo?.diasCorridos ?? 0) > 60, largo);
    check(
      `…y salteó al menos 18 días no hábiles desde ${desde}`,
      (largo?.salteados.length ?? 0) >= 18,
      largo?.salteados.length,
    );
    check(`…y no vence en día no hábil (${desde})`, !!largo && esHabil(parseFechaISO(largo.vence)!, false));
  }

  check("una cantidad de días inválida no rompe", sumarDiasHabiles("2026-07-03", 0) === null);
  check("una fecha inválida no rompe", sumarDiasHabiles("no-es-fecha", 5) === null);
}

// ── 5. El régimen vigente: plazo sí, tarifa no ────────────────────────────────────────────────
{
  const r = calcularCertificado({
    fechaExtincion: "2026-06-30",
    mejorRemuneracion: 1_200_000,
    hoy: HOY,
  });
  check("calcula", r !== null);
  if (r) {
    check("el régimen es el vigente", r.regimen === "vigente");
    check("hay plazo de entrega", r.plazoEntrega !== null);
    check("no hay habilitación para intimar en el régimen nuevo", r.habilitadoAIntimarDesde === null);
    check("la procedencia de la tarifa es 'sin-tarifa'", r.procedencia === "sin-tarifa");
    check(
      "avisa, con todas las letras, que la multa tarifada no está en el texto vigente",
      r.avisos.some(
        (a) => a.tono === "bloqueante" && /no prevé ninguna indemnización tarifada/i.test(a.texto),
      ),
      r.avisos,
    );
    check(
      "…y aclara que la obligación sigue existiendo (no dice 'ya no te deben nada')",
      r.avisos.some((a) => /La obligación no desapareció/i.test(a.texto)),
    );
    check(
      "el cronograma tiene la extinción y el vencimiento del plazo",
      r.cronograma.length === 2 && r.cronograma[0].fecha === "2026-06-30",
      r.cronograma.map((p) => p.fecha),
    );
    check(
      "el cronograma está ordenado por fecha",
      r.cronograma.every((p, i) => i === 0 || r.cronograma[i - 1].fecha <= p.fecha),
    );
  }
}

// ── 6. El régimen anterior: la indemnización y sus dos requisitos ─────────────────────────────
{
  const sinIntimar = calcularCertificado({
    fechaExtincion: "2024-01-15",
    mejorRemuneracion: 500_000,
    hoy: HOY,
  });
  check("régimen anterior detectado", sinIntimar?.regimen === "anterior");
  check("el monto es 3 × la mejor remuneración", sinIntimar?.montoIndemnizacion === 1_500_000);
  check("la procedencia es plena", sinIntimar?.procedencia === "vigente");
  check(
    "los 30 días corridos se cuentan corridos, no hábiles",
    sinIntimar?.habilitadoAIntimarDesde === "2024-02-14",
    sinIntimar?.habilitadoAIntimarDesde,
  );
  check(
    "sin requerimiento, avisa que no hay indemnización devengada",
    !!sinIntimar?.avisos.some((a) => /no hay indemnización devengada/i.test(a.texto)),
  );

  const conIntimacion = calcularCertificado({
    fechaExtincion: "2024-01-15",
    mejorRemuneracion: 500_000,
    fechaRequerimiento: "2024-02-20",
    hoy: HOY,
  });
  check("con requerimiento, se calcula el vencimiento de los 2 días hábiles", !!conIntimacion?.venceRequerimiento);
  check(
    "…y esos 2 días arrancan al día siguiente de la recepción",
    conIntimacion?.venceRequerimiento?.vence === "2024-02-22",
    conIntimacion?.venceRequerimiento?.vence,
  );
  check("el cronograma del régimen anterior tiene cuatro pasos", conIntimacion?.cronograma.length === 4);

  const prematura = calcularCertificado({
    fechaExtincion: "2024-01-15",
    mejorRemuneracion: 500_000,
    fechaRequerimiento: "2024-01-20",
    hoy: HOY,
  });
  check(
    "una intimación anterior a los 30 días se marca como prematura, y en rojo",
    !!prematura?.avisos.some((a) => a.tono === "bloqueante" && /prematura/i.test(a.texto)),
    prematura?.avisos,
  );
}

// ── 7. La zona gris se declara gris, no se resuelve ───────────────────────────────────────────
{
  const gris = calcularCertificado({
    fechaExtincion: "2025-05-10",
    mejorRemuneracion: 800_000,
    hoy: HOY,
  });
  check("régimen de transición detectado", gris?.regimen === "transicion");
  check("la procedencia es 'discutida'", gris?.procedencia === "discutida");
  check(
    "el aviso dice que hay fallos en los dos sentidos y que el importe es de referencia",
    !!gris?.avisos.some(
      (a) => /fallos en los dos sentidos/i.test(a.texto) && /referencia/i.test(a.texto),
    ),
    gris?.avisos,
  );
  check(
    "el importe se sigue mostrando (es lo que se reclama), pero no como derecho firme",
    gris?.montoIndemnizacion === 2_400_000,
  );
}

// ── 8. Degradación elegante ────────────────────────────────────────────────────────────────────
{
  check("una fecha imposible devuelve null en vez de un cálculo inventado",
    calcularCertificado({ fechaExtincion: "2026-02-31", mejorRemuneracion: 1, hoy: HOY }) === null);
  check("una fecha vacía devuelve null",
    calcularCertificado({ fechaExtincion: "", mejorRemuneracion: 1, hoy: HOY }) === null);

  const negativo = calcularCertificado({
    fechaExtincion: "2023-05-05",
    mejorRemuneracion: -900_000,
    hoy: HOY,
  });
  check("una remuneración negativa se trata como cero", negativo?.montoIndemnizacion === 0);
  check(
    "…y se pide el dato en vez de mostrar un cero mudo",
    !!negativo?.avisos.some((a) => /Cargá la mejor remuneración/i.test(a.texto)),
  );

  const siempre = calcularCertificado({
    fechaExtincion: "2026-06-30",
    mejorRemuneracion: 1_000_000,
    hoy: HOY,
  });
  check(
    "siempre se explicita el criterio de días hábiles usado",
    !!siempre?.avisos.some((a) => /no aclara qué calendario/i.test(a.texto)),
  );
}

// ── 9. Formato de fechas en UTC (con fecha local, Argentina muestra el día anterior) ──────────
{
  check("formatea con día de la semana", formatFechaLarga("2026-08-17") === "lunes 17 de agosto de 2026");
  check("y sin él cuando se pide", formatFechaLarga("2026-03-06", false) === "6 de marzo de 2026");
  check("una fecha inválida se devuelve tal cual, sin romper", formatFechaLarga("xx") === "xx");
}

// ── 10. Higiene de fuentes ─────────────────────────────────────────────────────────────────────
{
  check(
    "todas las fuentes son oficiales (infoleg / boletinoficial / argentina.gob.ar)",
    CERTIFICADO_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina)\.gob\.ar\//.test(f.url),
    ),
    CERTIFICADO_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto ACTUALIZADO de la LCT, no sólo el original",
    CERTIFICADO_FUENTES.lista.some((f) => f.url.includes("25552") && f.url.endsWith("texact.htm")),
  );
  check(
    "está citada la RG ARCA 5848/2026",
    CERTIFICADO_FUENTES.lista.some((f) => f.nombre.includes("5848")),
  );
  check(
    "está citado el Decreto 146/2001",
    CERTIFICADO_FUENTES.lista.some((f) => f.nombre.includes("146/2001")),
  );
  check(
    "están citadas las dos versiones de la Ley 25.345 (la original y la derogada)",
    CERTIFICADO_FUENTES.lista.filter((f) => f.url.includes("65015")).length === 2,
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(CERTIFICADO_FUENTES.consultadoEl),
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log("\nTodos los checks del certificado de trabajo OK (LCT art. 80 · Ley 27.802 · RG ARCA 5848/2026).");
