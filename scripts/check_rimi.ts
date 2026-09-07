// Verificación de la página del RIMI (Título XXIII de la Ley 27.802, arts. 177 a 188).
// Correr con: npx tsx scripts/check_rimi.ts
//
// LOS ANCLAS:
//   1. **Los cuatro montos mínimos del art. 181, en orden creciente.** Si alguien invierte dos, la
//      página le dice a una micro empresa que necesita nueve millones de dólares.
//   2. **La excepción del art. 180 alcanza a EXACTAMENTE cuatro bienes**, y son los mismos que se
//      amortizan en una sola cuota por los incisos c), d) y e) del art. 182. Esa coincidencia no es
//      casual y es el corazón de la página: se verifica que los dos conjuntos sean idénticos.
//   3. **Un bien exceptuado califica con CUALQUIER monto**, incluso uno ridículamente bajo. Es el
//      caso testigo (riego por USD 20.000 con piso de 150.000).
//   4. **Un bien NO exceptuado por debajo del piso NO califica**, y la calculadora dice cuánto
//      falta.
//   5. **La fórmula de las obras es «como mínimo» el 60% de la vida útil**, redondeado hacia
//      arriba: el artículo fija un piso de cuotas, no un techo.
//   6. **No se publica ningún ahorro en pesos.** El resultado no tiene ningún campo de plata en
//      moneda local: el beneficio es de timing y depende de la alícuota del contribuyente.
//   7. **La vigencia es la publicación (6/3/2026)**, no una fecha diferida: este Título no tiene
//      prórroga, a diferencia del Título II.
//   8. **Las fuentes son sólo oficiales**, con fecha de consulta.

import {
  ANIOS_PERMANENCIA,
  ANIOS_VENTANA,
  BIENES,
  ETIQUETAS_CATEGORIA,
  EXCLUSIONES,
  FACTOR_VIDA_UTIL_OBRA,
  MONTOS_MINIMOS,
  MULTA_MULTIPLO,
  PERIODOS_IVA,
  RIMI_FUENTES,
  RIMI_TEXTOS,
  VIGENCIA_RIMI,
  VIGENCIA_RIMI_ISO,
  type CategoriaPyme,
} from "../src/data/rimi";
import { calcularRimi } from "../src/lib/rimi";

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

// ── 1. Los cuatro montos mínimos del art. 181 ─────────────────────────────────────────────────
{
  check("micro empresa: USD 150.000", MONTOS_MINIMOS.micro === 150_000);
  check("pequeña empresa: USD 600.000", MONTOS_MINIMOS.pequena === 600_000);
  check("mediana Tramo 1: USD 3.500.000", MONTOS_MINIMOS.mediana1 === 3_500_000);
  check("mediana Tramo 2: USD 9.000.000", MONTOS_MINIMOS.mediana2 === 9_000_000);
  const orden: CategoriaPyme[] = ["micro", "pequena", "mediana1", "mediana2"];
  check(
    "los pisos son estrictamente crecientes",
    orden.every((c, i) => i === 0 || MONTOS_MINIMOS[c] > MONTOS_MINIMOS[orden[i - 1]]),
    orden.map((c) => MONTOS_MINIMOS[c]),
  );
  check(
    "hay una etiqueta para cada categoría",
    orden.every((c) => typeof ETIQUETAS_CATEGORIA[c] === "string" && ETIQUETAS_CATEGORIA[c].length > 0),
  );
}

// ── 2. La excepción del art. 180 y la amortización en una cuota son el MISMO conjunto ─────────
{
  const sinMinimo = BIENES.filter((b) => b.exentoDelMinimo).map((b) => b.id).sort();
  const unaCuota = BIENES.filter((b) => b.cuotas === 1).map((b) => b.id).sort();
  // El art. 180 nombra CUATRO categorías legales (riego, alta eficiencia energética, mallas
  // antigranizo y semovientes) pero el art. 182 inc. c) junta las dos primeras en un solo
  // tratamiento («equipos de riego agrícola y/o equipos de alta eficiencia energética»). Por eso
  // la calculadora ofrece TRES opciones y no cuatro: las categorías legales se verifican contra el
  // texto del artículo, más abajo.
  check("son tres las opciones exceptuadas del monto mínimo", sinMinimo.length === 3, sinMinimo);
  check(
    "los exceptuados del piso son exactamente los que se amortizan en una cuota",
    JSON.stringify(sinMinimo) === JSON.stringify(unaCuota),
    { sinMinimo, unaCuota },
  );
  check(
    "el texto del art. 180 nombra los cuatro y dice «independientemente del monto»",
    ["riego", "alta eficiencia energética", "mallas antigranizo", "semovientes"].every((t) =>
      RIMI_TEXTOS.excepcionDelMinimo.includes(t),
    ) && RIMI_TEXTOS.excepcionDelMinimo.includes("independientemente del monto"),
  );
  check(
    "el bien mueble va en dos cuotas y la obra se deriva de la vida útil",
    BIENES.find((b) => b.id === "mueble")?.cuotas === 2 &&
      BIENES.find((b) => b.id === "obra")?.cuotas === null,
  );
  check(
    "cada bien declara el inciso del art. 182 que lo rige",
    BIENES.every((b) => /art\. 182 inc\. [a-e]\)/.test(b.inciso)),
    BIENES.map((b) => b.inciso),
  );
}

// ── 3. Un bien exceptuado califica con cualquier monto ────────────────────────────────────────
{
  const riego = calcularRimi({
    categoria: "micro",
    tipoBien: "riego",
    montoUsd: 20_000,
    vidaUtilAnios: 10,
  });
  if (!riego) {
    check("el caso de riego devuelve resultado", false);
  } else {
    check("riego por USD 20.000 califica pese al piso de 150.000", riego.califica === true);
    check("y se marca como exento del mínimo", riego.exentoDelMinimo === true);
    check("no falta nada para el mínimo", riego.faltaParaElMinimo === 0);
    check("se amortiza en UNA cuota", riego.cuotasAceleradas === 1);
    check(
      "la cuota es el monto entero",
      casi(riego.cuotaAcelerada, 20_000),
      riego.cuotaAcelerada,
    );
    check(
      "adelanta 9 años respecto de una vida útil de 10",
      riego.aniosQueAdelanta === 9,
      riego.aniosQueAdelanta,
    );
    check(
      "hay un aviso que explica de dónde sale la excepción",
      riego.avisos.some((a) => a.tono === "ok" && a.texto.includes("artículo 180")),
    );
  }
}

// ── 4. Un bien NO exceptuado por debajo del piso no califica ──────────────────────────────────
{
  const corto = calcularRimi({
    categoria: "micro",
    tipoBien: "mueble",
    montoUsd: 90_000,
    vidaUtilAnios: 10,
  });
  if (!corto) {
    check("el caso corto devuelve resultado", false);
  } else {
    check("USD 90.000 no llega al piso de 150.000", corto.califica === false);
    check("faltan exactamente USD 60.000", casi(corto.faltaParaElMinimo, 60_000));
    check(
      "el aviso bloqueante recuerda que parte de la inversión puede entrar por el art. 180",
      corto.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("artículo 180")),
    );
  }

  const justo = calcularRimi({
    categoria: "micro",
    tipoBien: "mueble",
    montoUsd: 150_000,
    vidaUtilAnios: 10,
  });
  check("justo en el piso SÍ califica (el art. 181 dice «igual o superior»)", justo?.califica === true);
}

// ── 5. La fórmula de las obras: 60% de la vida útil, hacia arriba ─────────────────────────────
{
  check("el factor de vida útil de las obras es 0,6", FACTOR_VIDA_UTIL_OBRA === 0.6);
  const obra = calcularRimi({
    categoria: "pequena",
    tipoBien: "obra",
    montoUsd: 800_000,
    vidaUtilAnios: 20,
  });
  check(
    "una obra con 20 años de vida útil se amortiza en 12 cuotas",
    obra?.cuotasAceleradas === 12,
    obra?.cuotasAceleradas,
  );
  const impar = calcularRimi({
    categoria: "pequena",
    tipoBien: "obra",
    montoUsd: 800_000,
    vidaUtilAnios: 9,
  });
  check(
    "9 años × 0,6 = 5,4 → 6 cuotas (el artículo fija un mínimo, se redondea hacia arriba)",
    impar?.cuotasAceleradas === 6,
    impar?.cuotasAceleradas,
  );
  const cortita = calcularRimi({
    categoria: "pequena",
    tipoBien: "obra",
    montoUsd: 800_000,
    vidaUtilAnios: 1,
  });
  check("nunca menos de una cuota", cortita?.cuotasAceleradas === 1, cortita?.cuotasAceleradas);
  check(
    "hay un aviso que aclara que es un piso de cuotas y no un techo",
    obra?.avisos.some((a) => a.texto.includes("nunca en menos")) === true,
  );
}

// ── 6. No se publica ningún ahorro en pesos ───────────────────────────────────────────────────
{
  const r = calcularRimi({
    categoria: "micro",
    tipoBien: "mueble",
    montoUsd: 250_000,
    vidaUtilAnios: 10,
  });
  if (!r) {
    check("el caso base devuelve resultado", false);
  } else {
    const claves = Object.keys(r);
    check(
      "el resultado no tiene ningún campo de ahorro, beneficio o pesos",
      !claves.some((k) => /ahorro|beneficio|pesos|ars|impuesto/i.test(k)),
      claves,
    );
    check(
      "la cuota acelerada es el monto dividido por las cuotas",
      casi(r.cuotaAcelerada, 250_000 / r.cuotasAceleradas),
    );
    check("un bien mueble va en 2 cuotas", r.cuotasAceleradas === 2);
  }
}

// ── 7. Vigencia, plazos y sanciones ───────────────────────────────────────────────────────────
{
  check("el Título XXIII rige desde el 6/3/2026", VIGENCIA_RIMI_ISO === "2026-03-06");
  check(
    "la fecha en prosa coincide con la ISO",
    VIGENCIA_RIMI === "6 de marzo de 2026",
    VIGENCIA_RIMI,
  );
  check(
    "el art. 217 explica por qué: vigencia desde la publicación salvo disposición en contrario",
    RIMI_TEXTOS.art217.includes("salvo disposición en contrario".replace("s", "S")) ||
      RIMI_TEXTOS.art217.startsWith("Salvo disposición en contrario"),
    RIMI_TEXTOS.art217,
  );
  check("la devolución de IVA espera 3 períodos mensuales", PERIODOS_IVA === 3);
  check("la permanencia del bien es de 2 años fiscales", ANIOS_PERMANENCIA === 2);
  check("la ventana de inversión es de 2 años", ANIOS_VENTANA === 2);
  check("la multa del art. 187 es de hasta el doble", MULTA_MULTIPLO === 2);
  check(
    "el texto del art. 183 cita los tres períodos fiscales mensuales",
    RIMI_TEXTOS.iva.includes("tres (3) períodos fiscales mensuales"),
  );
  check(
    "el art. 186 trae las tres excepciones a la caducidad",
    RIMI_TEXTOS.caducidad.includes("a)") &&
      RIMI_TEXTOS.caducidad.includes("b)") &&
      RIMI_TEXTOS.caducidad.includes("c)"),
  );
  check(
    "la exclusión del RIGI está entre las causales",
    EXCLUSIONES.some((e) => e.titulo.includes("RIGI")),
  );
  check(
    "el art. 180 excluye automóviles, activos financieros y bienes de cambio",
    RIMI_TEXTOS.inversionProductiva.includes("excepto automóviles") &&
      RIMI_TEXTOS.inversionProductiva.includes("activos financieros") &&
      RIMI_TEXTOS.inversionProductiva.includes("bienes de cambio"),
  );
}

// ── 8. Entradas inválidas ─────────────────────────────────────────────────────────────────────
{
  check(
    "monto cero devuelve null",
    calcularRimi({ categoria: "micro", tipoBien: "mueble", montoUsd: 0, vidaUtilAnios: 10 }) === null,
  );
  check(
    "vida útil cero devuelve null",
    calcularRimi({ categoria: "micro", tipoBien: "mueble", montoUsd: 250_000, vidaUtilAnios: 0 }) ===
      null,
  );
}

// ── 9. Fuentes ────────────────────────────────────────────────────────────────────────────────
{
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    RIMI_FUENTES.lista.some((f) => f.url.includes("423680")),
    RIMI_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citada la Ley 24.467 (id 15932), a la que remite el art. 179",
    RIMI_FUENTES.lista.some((f) => f.url.includes("15932")),
    RIMI_FUENTES.lista.map((f) => f.url),
  );
  check(
    "ninguna fuente es un blog o una nota de prensa",
    RIMI_FUENTES.lista.every(
      (f) => f.url.includes("infoleg.gob.ar") || f.url.includes("boletinoficial.gob.ar"),
    ),
    RIMI_FUENTES.lista.map((f) => f.url),
  );
  check(
    "la fecha de consulta está declarada",
    /^\d{4}-\d{2}-\d{2}$/.test(RIMI_FUENTES.consultadoEl),
    RIMI_FUENTES.consultadoEl,
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks del RIMI OK (Ley 27.802 Título XXIII · pisos del art. 181, excepción del art. 180 y amortización del art. 182)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
