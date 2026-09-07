// Verificación de la página de temeridad y malicia (LCT art. 275 derogado por el art. 207 de la
// Ley 27.802, y art. 20 sustituido por su art. 10). Correr con:
//   npx tsx scripts/check_temeridad_malicia.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **El art. 275 tiene que seguir derogado, y sin fecha diferida.** Toda la página se apoya en
//      que ya no rige: si alguna vez la nota pasara a decir 1/1/2027, la respuesta cambia entera.
//   2. **El multiplicador es «de HASTA dos veces y media», no una tasa fija.** Es la razón por la
//      que la página pide la tasa en vez de traerla: si el dato se volviera un número único, la
//      página estaría publicando algo que la norma no dice.
//   3. **El tercer párrafo (Ley 26.696) tiene que conservar la calificación AUTOMÁTICA.** «Será
//      calificada como temeraria y maliciosa» + «el máximo del interés» es el hallazgo de la
//      página: sin esas dos frases, la derogación parece perder sólo una facultad del juez.
//   4. **El art. 20 vigente tiene que conservar las tres piezas**: gratuidad, vivienda no afectada
//      y —lo nuevo— costas solidarias entre la parte y el profesional por pluspetición inexcusable.
//      Si se cae la tercera, la página pierde la simetría que la hace distinta de cualquier nota.
//   5. **El número de hoy sale del motor del art. 276 que ya existe**, no de una copia: dos páginas
//      del sitio no pueden publicar dos importes distintos para el mismo crédito.
//   6. **La sanción escala LINEAL con el multiplicador** y el tramo de 2,5× es exactamente 2,5
//      veces el de 1×. Si un refactor mete un compuesto ahí, el número grande miente.
//   7. **Con acuerdo homologado incumplido el multiplicador se fuerza al máximo**, porque el
//      párrafo de la Ley 26.696 no dejaba margen.
//   8. **Sin tasa cargada, la sanción da CERO y se avisa** — nunca un número inventado.
//   9. **Higiene de fuentes:** todas oficiales, salvo la captura declarada del Internet Archive,
//      que tiene que envolver la URL de InfoLEG y ser anterior al 6/3/2026.

import {
  ARTICULO_DEROGADO,
  ARTICULO_DEROGATORIO,
  ARTICULO_SUSTITUTIVO_ART20,
  FUENTE_TEXTO_ANTERIOR,
  MULTIPLICADOR_MAXIMO,
  NOTA_DEROGACION_275,
  SUPUESTOS_ART_275,
  TEMERIDAD_FUENTES,
  TEMERIDAD_TEXTOS,
  TOPE_COSTAS,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/temeridad-malicia";
import { COSTAS_MAXIMAS, TASA_PURA_ANUAL } from "../src/data/actualizacion-creditos";
import { actualizarCreditoLaboral } from "../src/lib/actualizacion-creditos";
import { calcularTemeridad } from "../src/lib/temeridad-malicia";
import { ULTIMO_PERIODO, sumarMeses } from "../src/lib/inflacion";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 0.5) => Math.abs(a - b) <= tol;

const DESDE = sumarMeses(ULTIMO_PERIODO, -24);
const HASTA = ULTIMO_PERIODO;
const MONTO = 8_000_000;

// ── 1. La derogación, y que no sea diferida ────────────────────────────────────────────────────
{
  check("el artículo derogado es el 275 de la LCT", ARTICULO_DEROGADO === 275);
  check("lo derogó el art. 207 de la Ley 27.802", ARTICULO_DEROGATORIO === 207);
  check(
    "la nota cita el art. 207, la Ley 27.802 y el B.O. 6/3/2026",
    NOTA_DEROGACION_275.includes("art. 207") &&
      NOTA_DEROGACION_275.includes("27.802") &&
      NOTA_DEROGACION_275.includes("6/3/2026"),
    NOTA_DEROGACION_275,
  );
  check(
    "la vigencia es «a partir de su publicación», NO diferida a 2027",
    NOTA_DEROGACION_275.includes("a partir de su publicación en el Boletín Oficial") &&
      !/2027/.test(NOTA_DEROGACION_275),
  );
  check("la fecha ISO de vigencia es el 6/3/2026", VIGENCIA_REFORMA_ISO === "2026-03-06");
}

// ── 2. El texto derogado dice lo que la página afirma ──────────────────────────────────────────
{
  const t = TEMERIDAD_TEXTOS;
  check(
    "el art. 275 hablaba de un interés «de hasta dos veces y media» el bancario",
    /un interés de hasta dos veces y media el que cobren los bancos oficiales/.test(t.art275Primero),
    t.art275Primero,
  );
  check(
    "…de operaciones corrientes de descuento de documentos comerciales (la tasa que la ley NO publica)",
    /operaciones corrientes de descuento de documentos comerciales/.test(t.art275Primero),
  );
  check(
    "…y lo graduaba el juez según la conducta procesal",
    /graduado por los jueces, atendiendo a la conducta procesal asumida/.test(t.art275Primero),
  );
  check(
    "el multiplicador máximo de la constante coincide con el texto (2,5)",
    MULTIPLICADOR_MAXIMO === 2.5,
  );
  check(
    "el tercer párrafo califica la conducta como temeraria y maliciosa de oficio",
    /dicha conducta será calificada como ‘temeraria y maliciosa’/.test(t.art275AcuerdoHomologado),
    t.art275AcuerdoHomologado,
  );
  check(
    "…y manda aplicar el MÁXIMO del interés desde la mora",
    /desde la fecha de la mora y hasta su efectiva cancelación, el máximo del interés/.test(
      t.art275AcuerdoHomologado,
    ),
  );
  check(
    "…y el supuesto es un acuerdo homologado en sede judicial o administrativa",
    /acuerdo homologado en sede judicial o administrativa/.test(t.art275AcuerdoHomologado),
  );
  check("los supuestos enumerados son cinco", SUPUESTOS_ART_275.length === 5);
  check(
    "cada supuesto de la lista está contenido en la cita textual del artículo",
    SUPUESTOS_ART_275.every((s) => {
      const cita = s.detalle.match(/«([^»]+)»/);
      return cita ? t.art275Supuestos.includes(cita[1]) : false;
    }),
    SUPUESTOS_ART_275.map((s) => s.titulo),
  );
}

// ── 3. El art. 20 vigente: gratuidad + vivienda + pluspetición ─────────────────────────────────
{
  const t = TEMERIDAD_TEXTOS;
  check("el art. 20 lo sustituyó el art. 10 de la Ley 27.802", ARTICULO_SUSTITUTIVO_ART20 === 10);
  check(
    "…y la nota lo dice",
    t.art20Nota.includes("art. 10") && t.art20Nota.includes("27.802"),
    t.art20Nota,
  );
  check(
    "el art. 20 conserva el beneficio de la gratuidad",
    /gozarán del beneficio de la gratuidad/.test(t.art20),
  );
  check(
    "…y que la vivienda no puede afectarse al pago de costas",
    /Su vivienda no podrá ser afectada al pago de costas en caso alguno/.test(t.art20),
  );
  check(
    "…y trae la pluspetición inexcusable configurada de manera OBJETIVA",
    /pluspetición inexcusable, configurándose ésta de manera objetiva/.test(t.art20),
  );
  check(
    "…con costas SOLIDARIAS entre la parte y el profesional actuante",
    /soportadas solidariamente entre la parte y el profesional actuante/.test(t.art20),
  );
  check(
    "el tope de costas es el 25% y coincide con el que ya usaba /actualizacion-creditos-laborales",
    TOPE_COSTAS === 0.25 && TOPE_COSTAS === COSTAS_MAXIMAS,
    { TOPE_COSTAS, COSTAS_MAXIMAS },
  );
  check(
    "…y el texto del art. 277 lo dice con letras",
    /no excederán del veinticinco por ciento \(25%\) del monto de la sentencia/.test(t.art277Costas),
  );
  check(
    "el art. 276 vigente actualiza por IPC Nivel General del INDEC más el 3% anual",
    /Índice de Precios al Consumidor \(IPC\) - Nivel General/.test(t.art276) &&
      /tasa de interés del tres por ciento \(3%\) anual/.test(t.art276) &&
      TASA_PURA_ANUAL === 0.03,
  );
}

// ── 4. El número de hoy sale del motor del art. 276, no de una copia ───────────────────────────
{
  const res = calcularTemeridad({
    monto: MONTO,
    desde: DESDE,
    hasta: HASTA,
    tasaAnualPct: 50,
    multiplicador: 2.5,
    acuerdoHomologadoIncumplido: false,
  })!;
  const oficial = actualizarCreditoLaboral({ monto: MONTO, desde: DESDE, hasta: HASTA })!;
  check(
    "el total de hoy es exactamente el que publica /actualizacion-creditos-laborales",
    res.hoy.total === oficial.total,
    { temeridad: res.hoy.total, art276: oficial.total },
  );
  check("los años son los mismos que usa el art. 276", casi(res.anios, oficial.meses / 12, 0.01));
  check(
    "el crédito de 24 meses da 2 años",
    casi(res.anios, 2, 0.01),
    res.anios,
  );
}

// ── 5. El abanico del art. 275: lineal, con el máximo marcado ──────────────────────────────────
{
  const res = calcularTemeridad({
    monto: MONTO,
    desde: DESDE,
    hasta: HASTA,
    tasaAnualPct: 50,
    multiplicador: 2,
    acuerdoHomologadoIncumplido: false,
  })!;
  check("el abanico tiene cuatro tramos", res.tramos.length === 4);
  check(
    "van de 1× a 2,5×",
    res.tramos.map((t) => t.multiplicador).join(",") === "1,1.5,2,2.5",
    res.tramos.map((t) => t.multiplicador),
  );
  check("sólo el último está marcado como máximo", res.tramos.filter((t) => t.esMaximo).length === 1);
  const uno = res.tramos[0].importe;
  check(
    "la sanción escala LINEAL: 2,5× es exactamente 2,5 veces 1×",
    casi(res.tramos[3].importe, uno * 2.5, 1),
    { uno, dosYMedio: res.tramos[3].importe },
  );
  check(
    "1× es capital actualizado × tasa × años",
    casi(uno, res.hoy.capitalActualizado * 0.5 * res.anios, 1),
    uno,
  );
  check(
    "el tramo elegido (2×) coincide con el del abanico",
    casi(res.elegido.importe, res.tramos[2].importe, 0.01),
  );
  check(
    "el total con sanción es el del art. 276 más la sanción elegida",
    casi(res.totalConSancion, res.hoy.total + res.elegido.importe, 0.02),
  );
  check("la diferencia es exactamente lo que se perdió", casi(res.diferencia, res.elegido.importe, 0.01));
  check(
    "el peor caso de costas es el 25% del total actualizado",
    casi(res.costasMaximas, res.hoy.total * 0.25, 0.02),
  );
}

// ── 6. El acuerdo homologado incumplido fuerza el máximo ───────────────────────────────────────
{
  const res = calcularTemeridad({
    monto: MONTO,
    desde: DESDE,
    hasta: HASTA,
    tasaAnualPct: 50,
    multiplicador: 1, // el usuario pide 1×…
    acuerdoHomologadoIncumplido: true, // …pero el párrafo de la Ley 26.696 no dejaba margen
  })!;
  check("el multiplicador se fuerza a 2,5", res.elegido.multiplicador === MULTIPLICADOR_MAXIMO);
  check("…y queda marcado como máximo", res.elegido.esMaximo);
  check(
    "…y se avisa que la calificación era automática, no una facultad del juez",
    res.avisos.some(
      (a) => a.tono === "bloqueante" && /automátic|de oficio/i.test(a.texto) && /26\.696/.test(a.texto),
    ),
    res.avisos.map((a) => a.texto),
  );
}

// ── 7. Sin tasa no se inventa nada; los avisos que no pueden faltar ────────────────────────────
{
  const res = calcularTemeridad({
    monto: MONTO,
    desde: DESDE,
    hasta: HASTA,
    tasaAnualPct: 0,
    multiplicador: 2.5,
    acuerdoHomologadoIncumplido: false,
  })!;
  check("sin tasa, la sanción da cero", res.elegido.importe === 0 && res.diferencia === 0);
  check(
    "…y se dice que la ley nunca publicó esa tasa",
    res.avisos.some((a) => /nunca publicó|no publicó/.test(a.texto)),
  );
  check(
    "siempre se avisa que la derogación NO es retroactiva",
    res.avisos.some((a) => /no es retroactiva/.test(a.texto)),
  );
  check(
    "siempre se avisa el riesgo nuevo del art. 20 (costas solidarias)",
    res.avisos.some((a) => /pluspetición inexcusable/.test(a.texto) && /solidariamente/.test(a.texto)),
  );
}

// ── 8. Casos imposibles ────────────────────────────────────────────────────────────────────────
{
  check(
    "un monto cero no devuelve resultado",
    calcularTemeridad({
      monto: 0,
      desde: DESDE,
      hasta: HASTA,
      tasaAnualPct: 50,
      multiplicador: 2.5,
      acuerdoHomologadoIncumplido: false,
    }) === null,
  );
  check(
    "un pago anterior a la deuda no devuelve resultado",
    calcularTemeridad({
      monto: MONTO,
      desde: HASTA,
      hasta: DESDE,
      tasaAnualPct: 50,
      multiplicador: 2.5,
      acuerdoHomologadoIncumplido: false,
    }) === null,
  );
}

// ── 9. Higiene de fuentes ──────────────────────────────────────────────────────────────────────
{
  check(
    "todas las fuentes vivas son oficiales (infoleg / boletinoficial / argentina.gob.ar)",
    TEMERIDAD_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina)\.gob\.ar\//.test(
        f.url,
      ),
    ),
    TEMERIDAD_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto ACTUALIZADO de la LCT",
    TEMERIDAD_FUENTES.lista.some((f) => f.url.includes("25552") && f.url.endsWith("texact.htm")),
  );
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    TEMERIDAD_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "está citada la Ley 26.696 por su id real de InfoLEG (186021), no deducido",
    TEMERIDAD_FUENTES.lista.some((f) => f.nombre.includes("26.696") && f.url.includes("186021")),
    TEMERIDAD_FUENTES.lista.filter((f) => f.nombre.includes("26.696")).map((f) => f.url),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(TEMERIDAD_FUENTES.consultadoEl),
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
  "\nTodos los checks de temeridad y malicia OK (LCT art. 275 derogado · art. 20 sustituido · Ley 27.802).",
);
