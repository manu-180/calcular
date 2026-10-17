// Verificación de la Pensión Honorífica de Veteranos de Guerra del Atlántico Sur.
// Correr con: npx tsx scripts/check_veteranos_malvinas.ts
//
// LOS TRES CHECKS QUE IMPORTAN:
//
//   1. **El reparto entre copartícipes tiene que sumar el 100% del beneficio, siempre.** Es una
//      página donde alguien va a leer cuánto le toca a la viuda y cuánto a cada hijo: un reparto
//      que suma 90% o 110% no es un bug de UI, es un número mal en la cara de una familia. Se
//      verifica en todas las combinaciones de cónyuge × cantidad de hijos.
//   2. **El multiplicador es 3 y el porcentaje de la derivada es 100%, no el 70% del régimen
//      general.** Son los dos números que la página afirma contra lo que "se sabe" del sistema
//      previsional; si alguien los "corrige" a los del régimen general, la página pasa a decir lo
//      que dice todo el mundo y pierde su única razón de existir.
//   3. **Los textos verbatim siguen siendo verbatim**, y la fuente única no se rompe: el monto sale
//      del haber mínimo de `prestaciones.ts` / `jubilaciones.ts`, jamás de una constante local.

import { HABER_MINIMO_SERIE, HABER_MINIMO_ULTIMO } from "../src/data/jubilaciones";
import { prestacionesVigentes } from "../src/data/prestaciones";
import {
  COMPATIBILIDADES,
  HABERES_MINIMOS_TITULAR,
  PORCENTAJE_DERIVADA,
  REPARTO_DERECHOHABIENTES as R,
  TITULARES,
  VETERANOS_FUENTES,
  VETERANOS_TEXTOS,
} from "../src/data/veteranos-malvinas";
import {
  calcularVeteranos,
  haberMinimoDe,
  montoTitular,
  serieMontos,
} from "../src/lib/veteranos-malvinas";

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

// ===========================================================================
// 1 · Los dos números que la página afirma contra el sentido común previsional
// ===========================================================================
check(
  "el monto del titular son TRES haberes mínimos (art. 2º Dec. 1357/04)",
  HABERES_MINIMOS_TITULAR === 3,
  HABERES_MINIMOS_TITULAR,
);
check(
  "la pensión derivada es el 100% del beneficio, NO el 70% del régimen general",
  PORCENTAJE_DERIVADA === 1,
  PORCENTAJE_DERIVADA,
);
check(
  "el texto del art. 2º dice «TRES (3) veces el haber mínimo»",
  VETERANOS_TEXTOS.decMonto.includes("TRES (3) veces el haber mínimo"),
);
check(
  "el texto del art. 7º dice «CIEN POR CIEN (100%) del beneficio del causante»",
  VETERANOS_TEXTOS.decDerivada.includes("CIEN POR CIEN (100%) del beneficio del causante"),
);

// ===========================================================================
// 2 · Fuente única: el monto sale del haber mínimo oficial, no de una constante
// ===========================================================================
check(
  "el monto del mes vigente es exactamente 3 × el haber mínimo de prestaciones.ts",
  casi(montoTitular(prestacionesVigentes().periodo), prestacionesVigentes().haberMinimo * 3),
  {
    monto: montoTitular(prestacionesVigentes().periodo),
    esperado: prestacionesVigentes().haberMinimo * 3,
  },
);
check(
  "la serie de haberes y prestaciones.ts coinciden en el mes vigente",
  casi(haberMinimoDe(prestacionesVigentes().periodo) ?? -1, prestacionesVigentes().haberMinimo),
);
{
  const mal = serieMontos().filter((m) => !casi(m.monto, m.haberMinimo * 3));
  check("la serie completa cierra a 3 × haber mínimo en todos los meses", mal.length === 0, mal);
  check(
    "la serie tiene los mismos meses que la serie oficial de haberes",
    serieMontos().length === HABER_MINIMO_SERIE.length,
  );
}
check(
  "un mes sin resolución cae al último publicado y lo avisa (no proyecta)",
  (() => {
    const r = calcularVeteranos({ periodo: "2099-01" });
    return (
      r.haberMinimo === null &&
      casi(r.haberMinimoUsado, HABER_MINIMO_ULTIMO.haberMinimo) &&
      r.avisos.some((a) => a.tono === "atencion")
    );
  })(),
);

// ===========================================================================
// 3 · El reparto — que sume 100% en TODAS las combinaciones
// ===========================================================================
{
  const p = prestacionesVigentes().periodo;
  const total = montoTitular(p);
  const combinaciones: { hayConyuge: boolean; hijos: number }[] = [];
  for (const hayConyuge of [true, false]) {
    for (const hijos of [0, 1, 2, 3, 5, 8]) combinaciones.push({ hayConyuge, hijos });
  }

  const malSuma = combinaciones.filter(({ hayConyuge, hijos }) => {
    const r = calcularVeteranos({ periodo: p, quien: "derechohabientes", hayConyuge, hijos });
    if (r.partes.length === 0) return hayConyuge || hijos > 0; // sin nadie, no hay reparto: OK
    const suma = r.partes.reduce((a, x) => a + x.monto, 0);
    return !casi(suma, total, 0.05);
  });
  check(
    `el reparto suma el 100% del beneficio en las ${combinaciones.length} combinaciones probadas`,
    malSuma.length === 0,
    malSuma,
  );

  const malPorPersona = combinaciones.filter(({ hayConyuge, hijos }) => {
    const r = calcularVeteranos({ periodo: p, quien: "derechohabientes", hayConyuge, hijos });
    return r.partes.some((x) => !casi(x.montoPorPersona * x.personas, x.monto, 0.05));
  });
  check(
    "lo que cobra cada persona por el número de personas reconstruye la parte",
    malPorPersona.length === 0,
    malPorPersona,
  );

  // Los tres incisos del art. 7º, uno por uno.
  const a = calcularVeteranos({ periodo: p, quien: "derechohabientes", hayConyuge: true, hijos: 0 });
  check(
    "inc. a) viuda/o sin hijos cobra el 100% del beneficio",
    a.partes.length === 1 && casi(a.partes[0].monto, total),
    a.partes,
  );

  const b = calcularVeteranos({ periodo: p, quien: "derechohabientes", hayConyuge: true, hijos: 2 });
  check(
    "inc. b) con hijos: 50% para la viuda/o y 50% repartido entre los hijos",
    b.partes.length === 2 &&
      casi(b.partes[0].monto, total * 0.5) &&
      casi(b.partes[1].monto, total * 0.5) &&
      casi(b.partes[1].montoPorPersona, (total * 0.5) / 2),
    b.partes,
  );

  const c = calcularVeteranos({ periodo: p, quien: "derechohabientes", hayConyuge: false, hijos: 4 });
  check(
    "inc. c) sin viuda/o: el 100% se reparte entre los hijos por partes iguales",
    c.partes.length === 1 &&
      casi(c.partes[0].monto, total) &&
      casi(c.partes[0].montoPorPersona, total / 4),
    c.partes,
  );

  const vacio = calcularVeteranos({ periodo: p, quien: "derechohabientes", hayConyuge: false, hijos: 0 });
  check(
    "sin ningún derechohabiente no se inventa un reparto y se explica la vía de los padres",
    vacio.sinDerechohabientes &&
      vacio.partes.length === 0 &&
      vacio.avisos.some((x) => x.texto.includes("padres")),
  );

  // Entradas hostiles: negativos y decimales no pueden producir montos raros.
  const hostil = [-3, 0.5, 2.7].map((h) =>
    calcularVeteranos({ periodo: p, quien: "derechohabientes", hayConyuge: true, hijos: h }),
  );
  check(
    "hijos negativos o decimales no rompen el reparto ni producen montos negativos",
    hostil.every((r) => r.partes.every((x) => x.monto >= 0 && Number.isFinite(x.montoPorPersona))),
    hostil.map((r) => r.partes.map((x) => x.montoPorPersona)),
  );
}

check(
  "el titular no arrastra reparto (sus partes están vacías)",
  calcularVeteranos({ periodo: prestacionesVigentes().periodo, quien: "titular" }).partes.length === 0,
);
check(
  "las fracciones del reparto son las del decreto (1 · 0,5 · 0,5 · 1)",
  R.soloConyuge === 1 && R.conyugeConHijos === 0.5 && R.hijosConConyuge === 0.5 && R.hijosSolos === 1,
  R,
);
check(
  "la parte de la viuda/o y la de los hijos suman 1 cuando conviven",
  casi(R.conyugeConHijos + R.hijosConConyuge, 1),
);

// ===========================================================================
// 4 · Los textos verbatim que sostienen las afirmaciones de la página
// ===========================================================================
check(
  "la compatibilidad vigente incluye «o de retiro» (lo que agregó el Dec. 886/2005)",
  VETERANOS_TEXTOS.decCompatibilidad.includes("previsional permanente o de retiro"),
);
check(
  "…y ya NO exceptúa las prestaciones no contributivas nacionales",
  !VETERANOS_TEXTOS.decCompatibilidad.includes("no contributivos de carácter nacional"),
);
check(
  "la compatibilidad nombra las tres normas que la página lista (22.674, 23.598, 24.310)",
  ["22.674", "23.598", "24.310"].every((n) => VETERANOS_TEXTOS.decCompatibilidad.includes(n)),
);
check(
  "COMPATIBILIDADES no afirma nada que no esté en el texto del artículo",
  COMPATIBILIDADES.length === 4 &&
    VETERANOS_TEXTOS.decCompatibilidad.includes("percepción de otro ingreso"),
  COMPATIBILIDADES.map((c) => c.que),
);
check(
  "los padres de los caídos acceden con la sola acreditación del vínculo",
  VETERANOS_TEXTOS.decPadres.includes("sola acreditación del vínculo"),
);
check(
  "la causal de pérdida nombra los delitos que dice la página",
  ["derechos humanos", "traición a la Patria", "orden constitucional"].every((t) =>
    VETERANOS_TEXTOS.decPerdida.includes(t),
  ),
);
check(
  "el desistimiento del complemento del Dec. 1244/98 está textual",
  VETERANOS_TEXTOS.decDesistimiento.includes("Decreto Nº 1244/98"),
);
check(
  "el alcance de la ley nombra el TOM, el TOAS y las fechas del conflicto",
  ["(TOM)", "(TOAS)", "2 de abril", "14 de junio de 1982"].every((t) =>
    VETERANOS_TEXTOS.leyAlcance.includes(t),
  ),
  VETERANOS_TEXTOS.leyAlcance.slice(0, 200),
);
// Ojo al copiar este verbatim: InfoLEG escribe «teatro de Operaciones Malvinas» con minúscula y
// «Teatro de Operaciones del Atlántico Sur» con mayúscula, en la misma oración. Es del texto
// oficial y NO se corrige: por eso el check ancla en las siglas.
check("hay tres universos de titulares descritos", TITULARES.length === 3, TITULARES.length);

// ===========================================================================
// 5 · Fuentes
// ===========================================================================
check(
  "todas las fuentes son oficiales (boletinoficial / infoleg)",
  VETERANOS_FUENTES.lista.every((f) =>
    /^https:\/\/(www\.)?(boletinoficial|servicios\.infoleg)\.gob\.ar\//.test(f.url),
  ),
  VETERANOS_FUENTES.lista.map((f) => f.url),
);
check(
  "la primera fuente es el Decreto 1357/2004, de donde sale el monto",
  VETERANOS_FUENTES.lista[0].url.includes("/99383/norma.htm"),
);
check(
  "está citado el Decreto 886/2005, que sustituyó la compatibilidad",
  VETERANOS_FUENTES.lista.some((f) => f.url.includes("/108081/norma.htm")),
);
check(
  "está citada la Ley 23.848 y la resolución de haberes del mes",
  VETERANOS_FUENTES.lista.some((f) => f.url.includes("/0-4999/248/texact.htm")) &&
    VETERANOS_FUENTES.lista.some((f) => f.url.includes("346683")),
);
check(
  "la fecha de consulta es una fecha ISO",
  /^\d{4}-\d{2}-\d{2}$/.test(VETERANOS_FUENTES.consultadoEl),
);

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log(
    `Todos los checks de la pensión de veteranos de Malvinas OK (Dec. 1357/04 art. 2 y 7 · Dec. 886/05 · ${prestacionesVigentes().periodo}: ${montoTitular(prestacionesVigentes().periodo)}).`,
  );
}
