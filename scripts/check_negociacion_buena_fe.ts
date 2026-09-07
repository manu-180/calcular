// Verificación de la página de negociación colectiva de buena fe.
// Arts. 4°, 6° y 7° de la Ley 23.546, sustituidos por los arts. 149, 150 y 151 de la Ley 27.802.
// Correr con: npx tsx scripts/check_negociacion_buena_fe.ts
//
// LOS ANCLAS:
//   1. **Los cinco números del inciso e): 20%, 10%, 5 días, 100% y 10 días.** Si alguien los
//      mezcla, la página publica una multa que no existe.
//   2. **El techo es un porcentaje de la masa salarial, y con reincidencia sube al 100%.**
//   3. **Los incrementos por mora van por bloques COMPLETOS de cinco días**: cuatro días de mora
//      no incrementan nada, cinco sí, nueve siguen siendo un solo bloque.
//   4. **Las dos lecturas del 10% dan lo mismo con cero o un bloque y difieren desde el segundo.**
//      Es la prueba de que la ambigüedad se está mostrando y no resolviendo en silencio.
//   5. **La página nunca afirma un importe de condena**: el resultado se llama techo y el aviso
//      bloqueante lo dice.
//   6. **Los plazos se cuentan en días hábiles administrativos** (art. 8°, intacto): la fecha
//      calculada nunca cae sábado, domingo ni feriado, y siempre es posterior a la de días
//      corridos equivalentes.
//   7. **Cada uno de los cinco cambios trae texto anterior, texto vigente y explicación**, y el
//      texto anterior nunca es igual al vigente.
//   8. **Las citas textuales conservan las palabras que hacen el hallazgo**: «sancionará» (no
//      «podrá sancionar»), «podrá ser eliminada», «no será válida» y «sin que existan
//      observaciones a cumplir por las partes».
//   9. **Las fuentes son sólo oficiales**, con fecha de consulta.

import {
  CAMBIOS,
  FUENTES,
  INFORMACION_OBLIGATORIA,
  REGLAS,
  TEXTOS,
  VIGENCIA,
  VIGENCIA_ISO,
} from "../src/data/negociacion-buena-fe";
import { calcularMulta, calcularPlazos } from "../src/lib/negociacion-buena-fe";

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

// ── 1. Los cinco números del inciso e) ────────────────────────────────────────────────────────
{
  check("tope: 20% de la masa salarial", REGLAS.topePorcentaje === 20);
  check("incremento: 10%", REGLAS.incrementoPorcentaje === 10);
  check("cada 5 días de mora", REGLAS.incrementoCadaDias === 5);
  check("tope agravado por reincidencia: 100%", REGLAS.topeReincidenciaPorcentaje === 100);
  check("10 días para que la multa pueda eliminarse", REGLAS.diasParaEliminar === 10);
  check("15 días para constituir la comisión negociadora", REGLAS.diasComisionNegociadora === 15);
  check("30 días para homologar o registrar", REGLAS.diasHomologacion === 30);
  check(
    "el tope agravado es mayor que el común",
    REGLAS.topeReincidenciaPorcentaje > REGLAS.topePorcentaje,
  );
}

// ── 2 y 3. El techo, la reincidencia y los bloques completos ─────────────────────────────────
{
  const base = calcularMulta({
    masaSalarial: 10_000_000,
    diasDeMora: 0,
    reincidencia: false,
    cesoEnDiez: false,
  })!;
  check("20% de 10.000.000 = 2.000.000", casi(base.topeImporte, 2_000_000), base.topeImporte);
  check("sin mora no hay bloques", base.bloquesDeMora === 0);
  check("sin mora las dos lecturas coinciden con el techo", casi(base.conMoraSimple, base.topeImporte) && casi(base.conMoraCompuesta, base.topeImporte));

  const reinc = calcularMulta({
    masaSalarial: 10_000_000,
    diasDeMora: 0,
    reincidencia: true,
    cesoEnDiez: false,
  })!;
  check("con reincidencia el techo es el 100%", reinc.topePorcentaje === 100 && casi(reinc.topeImporte, 10_000_000));
  check(
    "la reincidencia avisa que lo que sube es el techo, no el importe",
    reinc.avisos.some((a) => a.texto.includes("Lo que sube es el techo")),
  );

  const cuatro = calcularMulta({
    masaSalarial: 10_000_000,
    diasDeMora: 4,
    reincidencia: false,
    cesoEnDiez: false,
  })!;
  check("cuatro días de mora no completan un bloque", cuatro.bloquesDeMora === 0, cuatro.bloquesDeMora);

  const nueve = calcularMulta({
    masaSalarial: 10_000_000,
    diasDeMora: 9,
    reincidencia: false,
    cesoEnDiez: false,
  })!;
  check("nueve días de mora siguen siendo un solo bloque", nueve.bloquesDeMora === 1, nueve.bloquesDeMora);

  const diez = calcularMulta({
    masaSalarial: 10_000_000,
    diasDeMora: 10,
    reincidencia: false,
    cesoEnDiez: false,
  })!;
  check("diez días de mora son dos bloques", diez.bloquesDeMora === 2, diez.bloquesDeMora);
}

// ── 4. Las dos lecturas del 10% ──────────────────────────────────────────────────────────────
{
  const unBloque = calcularMulta({
    masaSalarial: 10_000_000,
    diasDeMora: 5,
    reincidencia: false,
    cesoEnDiez: false,
  })!;
  check(
    "con un bloque, simple y compuesta dan lo mismo (2.200.000)",
    casi(unBloque.conMoraSimple, 2_200_000) && casi(unBloque.conMoraCompuesta, 2_200_000),
    [unBloque.conMoraSimple, unBloque.conMoraCompuesta],
  );

  const dosBloques = calcularMulta({
    masaSalarial: 10_000_000,
    diasDeMora: 10,
    reincidencia: false,
    cesoEnDiez: false,
  })!;
  check("con dos bloques la simple da 2.400.000", casi(dosBloques.conMoraSimple, 2_400_000), dosBloques.conMoraSimple);
  check("con dos bloques la compuesta da 2.420.000", casi(dosBloques.conMoraCompuesta, 2_420_000), dosBloques.conMoraCompuesta);
  check(
    "desde el segundo bloque la compuesta supera a la simple",
    dosBloques.conMoraCompuesta > dosBloques.conMoraSimple,
  );
  check(
    "y la página avisa que la ley no elige entre las dos",
    dosBloques.avisos.some((a) => a.texto.includes("no aclara si ese porcentaje")),
  );
}

// ── 5. La página no afirma un importe de condena ─────────────────────────────────────────────
{
  const r = calcularMulta({
    masaSalarial: 5_000_000,
    diasDeMora: 0,
    reincidencia: false,
    cesoEnDiez: true,
  })!;
  check(
    "hay un aviso bloqueante que dice que es un techo, no una condena",
    r.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("techo, no una condena")),
  );
  check("si cesó en plazo, el resultado marca que puede eliminarse", r.puedeEliminarse);
  check(
    "y lo explica contra el texto anterior (50%)",
    r.avisos.some((a) => a.texto.includes("50%")),
  );
  check(
    "la base es la masa salarial del ámbito personal de la negociación",
    r.avisos.some((a) => a.texto.includes("ámbito personal de la negociación")),
  );
  check(
    "avisa la actualización de la remisión al art. 804 del CCyC",
    r.avisos.some((a) => a.texto.includes("804") && a.texto.includes("666 bis")),
  );
}

// ── 6. Los plazos, en días hábiles administrativos ───────────────────────────────────────────
{
  const p = calcularPlazos({
    fechaNotificacionISO: "2026-09-01",
    fechaSolicitudHomologacionISO: "2026-09-10",
  })!;
  check("hay cuatro hitos cuando se declara la solicitud", p.plazos.length === 4, p.plazos.length);
  check("el primer hito es la notificación", p.plazos[0].fecha === "2026-09-01");

  const comision = p.plazos[1].fecha;
  check("la comisión negociadora tiene fecha calculada", Boolean(comision), comision);
  if (comision) {
    const d = new Date(`${comision}T00:00:00Z`).getUTCDay();
    check("esa fecha no cae sábado ni domingo", d !== 0 && d !== 6, comision);
    const corridos = new Date(Date.UTC(2026, 8, 1) + REGLAS.diasComisionNegociadora * 86_400_000)
      .toISOString()
      .slice(0, 10);
    check(
      "contar hábiles siempre da una fecha posterior a contar corridos",
      comision > corridos,
      [comision, corridos],
    );
  }

  const homologacion = p.plazos[3].fecha;
  check("la homologación tiene fecha calculada", Boolean(homologacion), homologacion);
  if (homologacion && comision) {
    check("la homologación es posterior a la comisión", homologacion > comision);
  }
  check(
    "el hito de homologación explica la condición nueva de la tácita",
    p.plazos[3].detalle.includes("sin que existan observaciones"),
  );
  check(
    "sin solicitud de homologación sólo hay dos hitos",
    calcularPlazos({ fechaNotificacionISO: "2026-09-01" })!.plazos.length === 2,
  );
  check(
    "una fecha inválida devuelve null",
    calcularPlazos({ fechaNotificacionISO: "2026-13-01" }) === null,
  );
  check(
    "masa salarial cero devuelve null",
    calcularMulta({
      masaSalarial: 0,
      diasDeMora: 0,
      reincidencia: false,
      cesoEnDiez: false,
    }) === null,
  );
}

// ── 7. Los cinco cambios, completos y con antes distinto de ahora ────────────────────────────
{
  check("hay cinco cambios documentados", CAMBIOS.length === 5, CAMBIOS.length);
  check(
    "cada cambio trae antes, ahora y el porqué",
    CAMBIOS.every(
      (c) => c.antes.length > 40 && c.ahora.length > 40 && c.porQue.length > 60,
    ),
  );
  check(
    "el texto anterior nunca es idéntico al vigente",
    CAMBIOS.every((c) => c.antes !== c.ahora),
  );
  check("no hay ids repetidos", new Set(CAMBIOS.map((c) => c.id)).size === CAMBIOS.length);
  check(
    "el cambio del verbo está documentado en las dos direcciones",
    CAMBIOS.some(
      (c) =>
        c.id === "multa-obligatoria" &&
        c.antes.includes("podrá, además, sancionar") &&
        c.ahora.includes("sancionará"),
    ),
  );
  check(
    "el cambio de la eliminación contrasta el 50% con la eliminación total",
    CAMBIOS.some(
      (c) =>
        c.id === "eliminacion" &&
        c.antes.includes("CINCUENTA POR CIENTO (50%)") &&
        c.ahora.includes("podrá ser eliminada"),
    ),
  );
}

// ── 8. Las citas conservan las palabras del hallazgo ─────────────────────────────────────────
{
  check(
    "la cita de la multa dice «sancionará», no «podrá sancionar»",
    TEXTOS.multa.includes("y sancionará a la parte incumplidora") &&
      !TEXTOS.multa.includes("podrá, además, sancionar"),
  );
  check(
    "la cita de la multa trae el 20%, el 10% cada 5 días y el 100%",
    TEXTOS.multa.includes("veinte por ciento (20%)") &&
      TEXTOS.multa.includes("diez por ciento (10%)") &&
      TEXTOS.multa.includes("cinco (5) días") &&
      TEXTOS.multa.includes("cien por ciento (100%)"),
  );
  check(
    "la cita de la eliminación trae los diez días y el verbo",
    TEXTOS.eliminacion.includes("diez (10) días") &&
      TEXTOS.eliminacion.includes("podrá ser eliminada"),
  );
  check(
    "la cita de quién negocia conserva el orden público y el «no será válida»",
    TEXTOS.quienNegocia.includes("de orden público") &&
      TEXTOS.quienNegocia.includes("no será válida"),
  );
  check(
    "la cita de la homologación trae la condición nueva",
    TEXTOS.homologacion.includes("sin que existan observaciones a cumplir por las partes"),
  );
  check(
    "el art. 8° citado dice días hábiles administrativos",
    TEXTOS.plazosHabiles.includes("días hábiles administrativos"),
  );
  check(
    "la información obligatoria de siempre son tres temas y la de empresa siete",
    INFORMACION_OBLIGATORIA.siempre.length === 3 &&
      INFORMACION_OBLIGATORIA.aNivelEmpresa.length === 7,
    [INFORMACION_OBLIGATORIA.siempre.length, INFORMACION_OBLIGATORIA.aNivelEmpresa.length],
  );
  check(
    "las listas de crisis y concurso están completas (7 y 5)",
    INFORMACION_OBLIGATORIA.enCrisis.length === 7 &&
      INFORMACION_OBLIGATORIA.enConcurso.length === 5,
  );
}

// ── 9. Vigencia y fuentes ────────────────────────────────────────────────────────────────────
{
  check("la vigencia es el 6 de marzo de 2026", VIGENCIA_ISO === "2026-03-06");
  check("la vigencia en texto coincide", VIGENCIA === "6 de marzo de 2026");
  check("hay fecha de consulta", /^\d{4}-\d{2}-\d{2}$/.test(FUENTES.consultadoEl));
  check("hay al menos cuatro fuentes", FUENTES.lista.length >= 4);
  check(
    "todas las fuentes son oficiales",
    FUENTES.lista.every(
      (f) =>
        f.url.includes("infoleg.gob.ar") ||
        f.url.includes("boletinoficial.gob.ar") ||
        (f.url.includes("web.archive.org") && f.url.includes("infoleg.gob.ar")),
    ),
    FUENTES.lista.map((f) => f.url),
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de negociación de buena fe OK (Ley 23.546 arts. 4, 6, 7 y 8 · Ley 27.802 arts. 149 a 151)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
