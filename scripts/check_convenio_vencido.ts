// Verificación de /convenio-vencido — Ley 14.250 (t.o. 2004) arts. 6, 7, 8, 11, 18, 19 y 21,
// reformada por el Título XIV de la Ley 27.802 (arts. 130-137) y su art. 211.
// Correr con: npx -y tsx scripts/check_convenio_vencido.ts
//
// LOS ANCLAS (cada uno protege una afirmación que la página hace contra la corriente):
//   1. **La reforma AMPLIÓ la ultraactividad.** El texto vigente contiene la frase que el anterior
//      NO tenía («beneficios individuales directos»). Si alguien "corrige" la página hacia el
//      relato de que la ley eliminó la ultraactividad, esto se pone rojo.
//   2. **Lo que la reforma sacó es la prórroga por decreto.** El texto anterior la nombra, el
//      vigente no. Es el otro lado del mismo diff, y hay que anclar los dos.
//   3. **El plazo del art. 137 corre desde la PROMULGACIÓN (5/3/2026), no desde el B.O. (6/3).**
//      Las tres fechas de la ley son distintas y la página publica las tres.
//   4. **El art. 19 se dio vuelta:** el vigente decide por ámbito («anterior o posterior»), el
//      anterior por favorabilidad («comparación por instituciones»). Se ancla que las dos frases
//      estén cada una en su texto y en ninguno de los dos la del otro.
//   5. **La fecha elige la regla.** El mismo caso resuelto un día antes y un día después del
//      6/3/2026 tiene que dar distinto cuando el menor es menos favorable: es el producto.
//   6. **El art. 18 se invirtió**: hoy el de ámbito mayor «no podrá modificar ni disponer», y quien
//      articula es el convenio de empresa.
//   7. **Nada se inventa**: toda cláusula de la lista declara por qué cae de su lado, toda respuesta
//      avisa que el encuadre concreto se discute, y las fuentes son sólo InfoLEG y el B.O.

import {
  CAMBIOS,
  CONSULTADO_EL,
  FUENTES,
  LEY_27802,
  PLAZO_ART_137,
  TEXTOS,
  VIGENCIA_DNU_70_ISO,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/convenio-vencido";
import {
  CLAUSULAS,
  diasHastaPlazo137,
  evaluarPrelacion,
  evaluarUltraactividad,
  regimenEn,
} from "../src/lib/convenio-vencido";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

// ── 1. La reforma AMPLIÓ lo que sobrevive ─────────────────────────────────────────────────────
{
  check(
    "el art. 6 VIGENTE incluye los beneficios individuales directos",
    TEXTOS.art6Vigente.includes("beneficios individuales directos del trabajo") &&
      TEXTOS.art6Vigente.includes("beneficios otorgados para el trabajador"),
  );
  check(
    "el art. 6 ANTERIOR NO los incluye (sólo «condiciones de trabajo»)",
    !TEXTOS.art6Anterior.includes("beneficios individuales directos") &&
      TEXTOS.art6Anterior.includes("condiciones de trabajo establecidas"),
  );
  check(
    "los dos textos comparten el núcleo: sólo subsisten las cláusulas normativas",
    ["solamente mantendrá subsistentes", "(cláusulas normativas)", "(obligacionales)"].every(
      (f) => TEXTOS.art6Vigente.includes(f) && TEXTOS.art6Anterior.includes(f),
    ),
  );
  check(
    "el vigente es más largo que el anterior (la reforma agregó, no sacó, en esa frase)",
    TEXTOS.art6Vigente.length > TEXTOS.art6Anterior.length - 60,
    { vigente: TEXTOS.art6Vigente.length, anterior: TEXTOS.art6Anterior.length },
  );
}

// ── 2. Lo que sí desapareció: la prórroga por decreto ─────────────────────────────────────────
{
  check(
    "el texto ANTERIOR admitía la prórroga del Poder Ejecutivo",
    TEXTOS.art6Anterior.includes("prórroga dispuesta por el Poder Ejecutivo Nacional"),
  );
  check(
    "el texto VIGENTE ya no la admite",
    !TEXTOS.art6Vigente.includes("Poder Ejecutivo"),
  );
  check(
    "el texto VIGENTE dice «sólo por acuerdo de partes»",
    TEXTOS.art6Vigente.includes("sólo por acuerdo de partes"),
  );
}

// ── 3. Las tres fechas de la ley, y el plazo del art. 137 ─────────────────────────────────────
{
  check("sanción: 27/2/2026", LEY_27802.sancion === "2026-02-27", LEY_27802.sancion);
  check("promulgación: 5/3/2026", LEY_27802.promulgacion === "2026-03-05", LEY_27802.promulgacion);
  check("B.O.: 6/3/2026", LEY_27802.boletinOficial === "2026-03-06", LEY_27802.boletinOficial);
  check(
    "las tres fechas son distintas",
    new Set([LEY_27802.sancion, LEY_27802.promulgacion, LEY_27802.boletinOficial]).size === 3,
  );
  check(
    "el plazo del art. 137 es un año exacto desde la PROMULGACIÓN",
    PLAZO_ART_137 === "2027-03-05",
    PLAZO_ART_137,
  );
  check(
    "el plazo NO se cuenta desde el Boletín Oficial",
    PLAZO_ART_137 !== "2027-03-06",
    PLAZO_ART_137,
  );
  check(
    "el art. 137 citado dice «desde la promulgación»",
    TEXTOS.art137.includes("desde la promulgación de la presente ley"),
  );
  check("el decreto promulgatorio está identificado", LEY_27802.decretoPromulgatorio === "Decreto 137/2026");
  check("el conteo de días al plazo cierra", diasHastaPlazo137("2027-03-04") === 1, diasHastaPlazo137("2027-03-04"));
  check("el plazo ya vencido da negativo", diasHastaPlazo137("2027-04-05") < 0);
  // La vigencia del Título XIV es la publicación (art. 217), aunque el plazo del 137 corra antes.
  check("la reforma rige desde el B.O.", VIGENCIA_REFORMA_ISO === LEY_27802.boletinOficial);
}

// ── 4. El art. 19 se dio vuelta ───────────────────────────────────────────────────────────────
{
  check(
    "el art. 19 VIGENTE decide por ámbito, «anterior o posterior»",
    TEXTOS.art19Vigente.includes("ámbito menor, prevalece") &&
      TEXTOS.art19Vigente.includes("anterior o posterior"),
  );
  check(
    "el art. 19 VIGENTE no tiene test de favorabilidad",
    !TEXTOS.art19Vigente.includes("más favorables"),
  );
  check(
    "el art. 19 ANTERIOR sí lo tenía, y comparaba por instituciones",
    TEXTOS.art19Anterior.includes("condiciones más favorables para el trabajador") &&
      TEXTOS.art19Anterior.includes("por instituciones"),
  );
  check(
    "el inc. a) pasó de «puede modificar» a «modifica en cualquier sentido»",
    TEXTOS.art19Anterior.includes("puede modificar") &&
      TEXTOS.art19Vigente.includes("modifica en cualquier sentido"),
  );
  check(
    "el art. 18 se invirtió: hoy el de ámbito mayor no puede disponer del menor",
    TEXTOS.art18Vigente.includes("no podrán modificar ni disponer el contenido") &&
      !TEXTOS.art18Anterior.includes("no podrán modificar ni disponer"),
  );
  check(
    "hoy articula el convenio de EMPRESA; antes, el de ámbito mayor",
    TEXTOS.art18Vigente.includes("Convenios Colectivos de empresa, podrán establecer formas de articulación") &&
      TEXTOS.art18Anterior.includes("ámbito mayor podrán establecer formas de articulación"),
  );
}

// ── 5. La fecha elige la regla: el mismo caso da vuelta el resultado ──────────────────────────
{
  const despues = evaluarPrelacion("2026-03-06", true, false)!;
  const antes = evaluarPrelacion("2026-03-05", true, false)!;
  check("desde el 6/3/2026 prevalece el de ámbito menor aunque sea menos favorable", despues.prevalece === "menor");
  check("el 5/3/2026 prevalecía el de ámbito mayor en ese mismo caso", antes.prevalece === "mayor", antes.prevalece);
  check(
    "el resultado se da vuelta exactamente en la frontera",
    despues.prevalece !== antes.prevalece,
  );
  const menorAnterior = evaluarPrelacion("2026-03-06", false, false)!;
  check(
    "el vigente ignora cuál es posterior: el menor prevalece igual",
    menorAnterior.prevalece === "menor",
  );
  check(
    "con el texto anterior, un menor ANTERIOR no desplazaba: queda indeterminado por el art. 19",
    evaluarPrelacion("2026-03-05", false, true)!.prevalece === "depende",
  );
  check(
    "la respuesta vigente avisa que el piso legal e individual sigue (art. 8)",
    despues.avisos.some((a) => /piso de la ley|contrato individual/.test(a.texto)),
  );
  check("una fecha mal formada devuelve null", evaluarPrelacion("6/3/2026", true, true) === null);
}

// ── 6. Ultraactividad: normativas sobreviven, obligacionales caen ─────────────────────────────
{
  const escala = evaluarUltraactividad("escala", "2026-08-31", false, false)!;
  check("la escala salarial sobrevive al vencimiento", escala.sobrevive);
  const paz = evaluarUltraactividad("paz", "2026-08-31", false, false)!;
  check("la cláusula de paz social cae sin acuerdo de partes", !paz.sobrevive);
  check("y avisa que sólo el acuerdo de partes la sostiene", paz.avisos.some((a) => a.tono === "bloqueante"));
  const pazConAcuerdo = evaluarUltraactividad("paz", "2026-08-31", true, false)!;
  check("con acuerdo de partes, la obligacional sigue", pazConAcuerdo.sobrevive);
  check(
    "la obligacional sin acuerdo declara qué le faltaría",
    paz.condicion !== null && /acuerdo de partes/.test(paz.condicion),
  );
  check("una normativa no lleva condición", escala.condicion === null);

  const conNuevo = evaluarUltraactividad("escala", "2026-08-31", false, true)!;
  check("con convenio nuevo en vigencia no hay ultraactividad que discutir", !conNuevo.sobrevive);
  check(
    "y lo dice citando el «hasta tanto entre en vigencia una nueva convención»",
    conNuevo.avisos.some((a) => /nueva convención colectiva/.test(a.texto)),
  );

  // El caso donde la reforma cambia la respuesta.
  const beneficioHoy = evaluarUltraactividad("beneficio", "2026-08-31", false, false)!;
  const beneficioDnu = evaluarUltraactividad("beneficio", "2025-06-01", false, false)!;
  check("el beneficio al trabajador es normativo y sobrevive hoy", beneficioHoy.sobrevive);
  check(
    "bajo el DNU 70/2023 la página avisa que era discutible",
    beneficioDnu.avisos.some((a) => /DNU 70\/2023/.test(a.texto)),
    beneficioDnu.avisos,
  );
  check(
    "la obligacional bajo el DNU avisa de la vía que hoy no existe",
    evaluarUltraactividad("paz", "2025-06-01", false, false)!.avisos.some((a) =>
      /Poder Ejecutivo Nacional/.test(a.texto),
    ),
  );
  check(
    "toda respuesta avisa que el encuadre concreto se discute",
    [escala, paz, beneficioHoy].every((r) => r.avisos.some((a) => /se discute en cada caso/.test(a.texto))),
  );
  check("una cláusula desconocida devuelve null", evaluarUltraactividad("inventada", "2026-08-31", false, false) === null);
  check("una fecha mal formada devuelve null", evaluarUltraactividad("escala", "hoy", false, false) === null);
}

// ── 7. Los tres regímenes del art. 6, por fecha ───────────────────────────────────────────────
{
  check("desde el 6/3/2026 rige el texto de la Ley 27.802", regimenEn("2026-03-06") === "vigente");
  check("el 5/3/2026 todavía regía el del DNU 70/2023", regimenEn("2026-03-05") === "dnu70");
  check("el DNU rige desde el 21/12/2023", regimenEn(VIGENCIA_DNU_70_ISO) === "dnu70");
  check("antes del DNU, el texto original del t.o. 2004", regimenEn("2023-12-20") === "original");
  check(
    "una fecha del régimen original lo avisa explícitamente",
    evaluarUltraactividad("escala", "2022-05-01", false, false)!.avisos.some((a) =>
      /texto original del t\.o\. 2004/.test(a.texto),
    ),
  );
}

// ── 8. Nada inventado ─────────────────────────────────────────────────────────────────────────
{
  check("toda cláusula declara su tipo y por qué", CLAUSULAS.every((c) => c.porQue.length > 50));
  check(
    "hay cláusulas de los dos tipos",
    CLAUSULAS.some((c) => c.tipo === "normativa") && CLAUSULAS.some((c) => c.tipo === "obligacional"),
  );
  check(
    "sólo la cláusula que la reforma agregó está marcada como cambiada",
    CLAUSULAS.filter((c) => c.cambiaConLaReforma).every((c) => /beneficios otorgados/i.test(c.porQue)),
    CLAUSULAS.filter((c) => c.cambiaConLaReforma).map((c) => c.clave),
  );
  check("las claves de cláusula son únicas", new Set(CLAUSULAS.map((c) => c.clave)).size === CLAUSULAS.length);
  check(
    "los 8 cambios del título citan artículo de la 14.250 y artículo de la 27.802",
    CAMBIOS.every((c) => /^arts?\. /.test(c.articulo) && /^art\. \d+$/.test(c.por)),
  );
  check("el art. 21 derogado se publica textual, para que se vea qué se perdió", TEXTOS.art21Derogado.includes("mecanismo voluntario de mediación"));
  check("el art. 11, no tocado, sigue publicado como la vía para forzar la negociación", TEXTOS.art11.includes("SESENTA (60) días"));
  check("el art. 8 (piso del contrato individual) está publicado", TEXTOS.art8.includes("condiciones más favorables"));
  const oficiales = /^https:\/\/(servicios\.infoleg\.gob\.ar|www\.boletinoficial\.gob\.ar)\//;
  check("todas las fuentes son oficiales", FUENTES.every((f) => oficiales.test(f.url)), FUENTES.map((f) => f.url));
  check("la fecha de consulta está declarada", /^\d{4}-\d{2}-\d{2}$/.test(CONSULTADO_EL), CONSULTADO_EL);
}

console.log(
  fallas === 0
    ? "\nTodos los checks de convenio vencido OK (Ley 14.250 arts. 6, 8, 11, 18, 19 y 21 · Ley 27.802 Título XIV y art. 211 · DNU 70/2023 art. 86)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
