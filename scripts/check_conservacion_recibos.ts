// Verificación de la página de conservación de recibos (LCT art. 143, sustituido por el art. 40 de
// la Ley 27.802). Correr con: npx tsx scripts/check_conservacion_recibos.ts
//
// LOS ANCLAS:
//   1. **El texto anterior NO tenía número** y el vigente tiene DOS. Es todo el hallazgo: si el
//      texto viejo apareciera con un plazo, la página estaría inventando la reforma.
//   2. **Los 2 años están anclados contra el art. 256**, que los declara de orden público. Un
//      número no se publica sin cruzarlo contra otra norma.
//   3. **Sólo cambió la PRIMERA oración**: las otras dos —archivo digital y pagos anteriores— son
//      idénticas en los dos textos. Se verifica por sustitución, no a ojo.
//   4. **Manda el plazo más largo.** El límite que la página publica como "hasta cuándo" nunca
//      puede ser el de 2 años.
//   5. **La aritmética de fechas aguanta el 29 de febrero** (+2 y +10 años desde un bisiesto).

import {
  ANIOS_LABORAL,
  ANIOS_PREVISIONAL,
  ARTICULO_SUSTITUYENTE,
  CONSERVACION_FUENTES,
  CONSERVACION_TEXTOS,
  MESES_INTERRUPCION_ART257,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/conservacion-recibos";
import { calcularConservacion } from "../src/lib/conservacion-recibos";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

// ── 1. La sustitución ──────────────────────────────────────────────────────────────────────────
{
  check("lo sustituyó el art. 40 de la Ley 27.802", ARTICULO_SUSTITUYENTE === 40);
  check(
    "la nota cita el art. 40, la ley y la fecha del B.O., y dice sustituido",
    CONSERVACION_TEXTOS.art143Nota.includes(`art. ${ARTICULO_SUSTITUYENTE}`) &&
      CONSERVACION_TEXTOS.art143Nota.includes("27.802") &&
      CONSERVACION_TEXTOS.art143Nota.includes("6/3/2026") &&
      CONSERVACION_TEXTOS.art143Nota.includes("sustituido"),
    CONSERVACION_TEXTOS.art143Nota,
  );
  check("la vigencia es el 6 de marzo de 2026", VIGENCIA_REFORMA === "6 de marzo de 2026");
  check("el ISO de la vigencia coincide", VIGENCIA_REFORMA_ISO === "2026-03-06");
}

// ── 2. El hallazgo: el texto viejo no traía números, el nuevo trae dos ─────────────────────────
{
  check(
    "el texto ANTERIOR remite a la prescripción sin dar ningún plazo",
    CONSERVACION_TEXTOS.art143Anterior.includes(CONSERVACION_TEXTOS.reglaAnterior),
  );
  check(
    "y NO contiene ninguno de los dos números",
    !CONSERVACION_TEXTOS.art143Anterior.includes("dos (2) años") &&
      !CONSERVACION_TEXTOS.art143Anterior.includes("diez (10) años"),
    CONSERVACION_TEXTOS.art143Anterior,
  );
  check(
    "el texto VIGENTE trae los dos plazos escritos",
    CONSERVACION_TEXTOS.art143Vigente.includes(CONSERVACION_TEXTOS.reglaVigente) &&
      CONSERVACION_TEXTOS.art143Vigente.includes("dos (2) años") &&
      CONSERVACION_TEXTOS.art143Vigente.includes("diez (10) años"),
  );
  check(
    "y ya no remite a «la prescripción liberatoria del beneficio de que se trate»",
    !CONSERVACION_TEXTOS.art143Vigente.includes(CONSERVACION_TEXTOS.reglaAnterior),
  );
  check(
    "las constantes coinciden con lo que dice el artículo",
    ANIOS_LABORAL === 2 && ANIOS_PREVISIONAL === 10,
  );
  check(
    "sólo cambió la primera oración: sustituyéndola, los dos textos quedan idénticos",
    CONSERVACION_TEXTOS.art143Vigente.replace(
      CONSERVACION_TEXTOS.reglaVigente,
      CONSERVACION_TEXTOS.reglaAnterior,
    ) === CONSERVACION_TEXTOS.art143Anterior,
    {
      vigenteConvertido: CONSERVACION_TEXTOS.art143Vigente
        .replace(CONSERVACION_TEXTOS.reglaVigente, CONSERVACION_TEXTOS.reglaAnterior)
        .slice(0, 160),
      anterior: CONSERVACION_TEXTOS.art143Anterior.slice(0, 160),
    },
  );
  check(
    "las dos oraciones que sobrevivieron están en los dos textos",
    [CONSERVACION_TEXTOS.art143Vigente, CONSERVACION_TEXTOS.art143Anterior].every(
      (t) =>
        t.includes(CONSERVACION_TEXTOS.digitalizacion) &&
        t.includes(CONSERVACION_TEXTOS.sinPresuncionDePagosAnteriores),
    ),
  );
}

// ── 3. El control cruzado contra el art. 256 ───────────────────────────────────────────────────
{
  check(
    "el art. 256 confirma los dos años y los declara de orden público",
    CONSERVACION_TEXTOS.art256.includes("Prescriben a los dos (2) años") &&
      CONSERVACION_TEXTOS.art256.includes("carácter de orden público"),
  );
  check(
    "el art. 257 topea la interrupción en seis meses",
    CONSERVACION_TEXTOS.art257.includes("mayor de seis (6) meses") &&
      MESES_INTERRUPCION_ART257 === 6,
  );
}

// ── 4. El motor: fechas y cuál manda ───────────────────────────────────────────────────────────
{
  const r = calcularConservacion({ pagoISO: "2024-06-05", hoyISO: "2026-08-26" })!;
  check("el límite laboral es pago + 2 años", r.limiteLaboralISO === "2026-06-05", r.limiteLaboralISO);
  check(
    "el límite previsional es pago + 10 años",
    r.limitePrevisionalISO === "2034-06-05",
    r.limitePrevisionalISO,
  );
  check(
    "el que manda es el previsional, nunca el laboral",
    r.limiteQueMandaISO === r.limitePrevisionalISO,
    r.limiteQueMandaISO,
  );
  check("el plazo laboral ya venció al 26/8/2026", r.laboralVencido, r.laboralVencido);
  check("el previsional no", !r.previsionalVencido);
  check(
    "avisa que el plazo laboral pasó pero el previsional sigue corriendo",
    r.avisos.some((a) => a.texto.includes("sigue corriendo")),
  );
  check(
    "avisa que hay que conservarlo hasta la fecha larga",
    r.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes(r.limitePrevisionalISO)),
  );
  check(
    "menciona la interrupción del art. 257 y su tope de 6 meses",
    r.avisos.some((a) => a.texto.includes("artículo 257") && a.texto.includes("6 meses")),
  );
  check(
    "menciona que el archivo digitalizado vale igual",
    r.avisos.some((a) => a.texto.includes("digitalizados")),
  );

  const reciente = calcularConservacion({ pagoISO: "2026-08-05", hoyISO: "2026-08-26" })!;
  check(
    "un recibo reciente no tiene ningún plazo vencido",
    !reciente.laboralVencido && !reciente.previsionalVencido && reciente.aniosRestantes > 9,
    reciente.aniosRestantes,
  );

  const viejo = calcularConservacion({ pagoISO: "2010-01-15", hoyISO: "2026-08-26" })!;
  check(
    "un recibo de 2010 tiene los dos plazos vencidos",
    viejo.laboralVencido && viejo.previsionalVencido && viejo.aniosRestantes < 0,
    viejo.aniosRestantes,
  );
  check(
    "y aun así no dice «destruilo»: avisa que la ley ya no obliga a conservarlo",
    viejo.avisos.some(
      (a) => a.texto.includes("ya no obliga a conservarlo") && a.texto.includes("no que convenga"),
    ),
  );

  const bisiesto = calcularConservacion({ pagoISO: "2024-02-29", hoyISO: "2026-08-26" })!;
  check(
    "el 29 de febrero + 2 años cae el 28/2/2026 (año no bisiesto)",
    bisiesto.limiteLaboralISO === "2026-02-28",
    bisiesto.limiteLaboralISO,
  );
  check(
    "y + 10 años cae el 29/2/2034... que no existe: 28/2/2034",
    bisiesto.limitePrevisionalISO === "2034-02-28",
    bisiesto.limitePrevisionalISO,
  );

  check(
    "una fecha mal formada no devuelve resultado",
    calcularConservacion({ pagoISO: "2024/06/05", hoyISO: "2026-08-26" }) === null,
  );
}

// ── 5. Fuentes ─────────────────────────────────────────────────────────────────────────────────
{
  check(
    "está citado el texto actualizado de la LCT en InfoLEG (id 25552)",
    CONSERVACION_FUENTES.lista.some((f) => f.url.includes("25552/texact.htm")),
  );
  check(
    "está citada la captura de la que sale el texto anterior",
    CONSERVACION_FUENTES.lista.some(
      (f) => f.url.includes("web.archive.org") && f.url.includes("25552/texact.htm"),
    ),
  );
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    CONSERVACION_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "ninguna fuente es un blog o una nota de prensa",
    CONSERVACION_FUENTES.lista.every(
      (f) =>
        f.url.includes("infoleg.gob.ar") ||
        f.url.includes("boletinoficial.gob.ar") ||
        f.url.includes("web.archive.org"),
    ),
    CONSERVACION_FUENTES.lista.map((f) => f.url),
  );
  check(
    "la fecha de consulta está declarada",
    /^\d{4}-\d{2}-\d{2}$/.test(CONSERVACION_FUENTES.consultadoEl),
    CONSERVACION_FUENTES.consultadoEl,
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de conservación de recibos OK (LCT art. 143 sustituido por el art. 40 de la Ley 27.802 · 2 años laborales, 10 previsionales)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
