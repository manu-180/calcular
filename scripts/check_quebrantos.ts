// Verificación de la actualización de quebrantos (LIG art. 25, undécimo párrafo · art. 93 · Ley
// 24.073 art. 39 · Ley 27.802 art. 190).
// Correr con: npx tsx scripts/check_quebrantos.ts
//
// LOS ANCLAS:
//   1. **La fecha de corte se mide sobre el INICIO del ejercicio, no sobre el cierre.** Es el error
//      que la página corrige y el que más plata mueve para quien no cierra en diciembre: un cierre
//      de junio de 2025 corresponde a un ejercicio iniciado en julio de 2024 y NO se actualiza. Las
//      cuatro combinaciones de la tabla de la página se anclan una por una.
//   2. **El coeficiente es exactamente IPC(cierre liquidado) / IPC(cierre de origen)** de la serie
//      oficial del INDEC embebida en el repo. Si alguien "simplifica" la cuenta, esto se pone rojo.
//   3. **Los cinco años del noveno párrafo siguen siendo cinco**, la actualización no los estira, y
//      pasado el plazo el quebranto computable es cero — no un número actualizado que ya no sirve.
//   4. **El texto anterior y el vigente son distintos en tres cosas** (índice, fecha de corte y la
//      exclusión del art. 93). Si alguien "moderniza" el texto viejo y borra el IPIM, el diff que
//      es todo el valor de la página se pierde: se ancla que el anterior diga IPIM y no diga IPC.
//   5. **La cadena del congelamiento está citada entera**: art. 93 → art. 39 de la Ley 24.073 →
//      marzo de 1992. Sin esas tres piezas, la afirmación central de la página no se puede probar.
//   6. **Las fuentes son sólo oficiales**, con fecha de consulta ISO.

import {
  ANIOS_DE_VIDA,
  PRIMER_INICIO_ACTUALIZABLE,
  QUEBRANTOS_ESPECIFICOS,
  QUEBRANTOS_FUENTES,
  QUEBRANTOS_TEXTOS,
} from "../src/data/quebrantos";
import { calcularQuebranto } from "../src/lib/quebrantos";
import { indiceDe } from "../src/lib/inflacion";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const aprox = (a: number, b: number, tol = 0.01) => Math.abs(a - b) < tol;

// ===========================================================================
// 1 · Las constantes de la norma
// ===========================================================================
{
  check(
    "el primer ejercicio alcanzado se inicia en enero de 2025",
    PRIMER_INICIO_ACTUALIZABLE === "2025-01",
    PRIMER_INICIO_ACTUALIZABLE,
  );
  check("el quebranto vive cinco años", ANIOS_DE_VIDA === 5, ANIOS_DE_VIDA);
}

// ===========================================================================
// 2 · EL ANCLA: la fecha de corte se mide sobre el INICIO del ejercicio
// ===========================================================================
{
  const casos: { cierre: string; alcanzado: boolean; inicio: string }[] = [
    { cierre: "2024-12", alcanzado: false, inicio: "2024-01" },
    // El caso que decide la página: cierra DENTRO de 2025 y aun así queda afuera.
    { cierre: "2025-06", alcanzado: false, inicio: "2024-07" },
    { cierre: "2025-12", alcanzado: true, inicio: "2025-01" },
    { cierre: "2026-06", alcanzado: true, inicio: "2025-07" },
  ];
  for (const c of casos) {
    const r = calcularQuebranto({
      monto: 10_000_000,
      cierreOrigen: c.cierre,
      cierreLiquidado: "2026-12",
    });
    check(
      `cierre ${c.cierre} → ejercicio iniciado en ${c.inicio}`,
      r?.inicioEjercicio === c.inicio,
      r?.inicioEjercicio,
    );
    check(
      `cierre ${c.cierre} → ${c.alcanzado ? "se actualiza" : "NO se actualiza"}`,
      r?.alcanzado === c.alcanzado,
      { alcanzado: r?.alcanzado, esperado: c.alcanzado },
    );
  }

  // Y el corolario que hace visible el error: dos ejercicios que cierran en 2025 con distinta
  // suerte, sólo por el mes de cierre.
  const junio = calcularQuebranto({
    monto: 10_000_000,
    cierreOrigen: "2025-06",
    cierreLiquidado: "2026-06",
  });
  const diciembre = calcularQuebranto({
    monto: 10_000_000,
    cierreOrigen: "2025-12",
    cierreLiquidado: "2026-06",
  });
  check(
    "el cierre de junio 2025 se computa nominal y el de diciembre 2025 actualizado",
    junio?.actualizado === 10_000_000 && (diciembre?.actualizado ?? 0) > 10_000_000,
    { junio: junio?.actualizado, diciembre: diciembre?.actualizado },
  );
}

// ===========================================================================
// 3 · El coeficiente sale de la serie oficial del IPC, sin atajos
// ===========================================================================
{
  const origen = "2025-12";
  const liquidado = "2026-06";
  const iOrigen = indiceDe(origen);
  const iLiquidado = indiceDe(liquidado);
  check("la serie del IPC tiene los dos meses del caso", iOrigen !== null && iLiquidado !== null, {
    iOrigen,
    iLiquidado,
  });

  const r = calcularQuebranto({
    monto: 25_000_000,
    cierreOrigen: origen,
    cierreLiquidado: liquidado,
  });
  const esperado = (iLiquidado as number) / (iOrigen as number);
  check(
    "el coeficiente es IPC(liquidado) / IPC(origen)",
    aprox(r?.coeficiente ?? 0, esperado, 1e-9),
    { calculado: r?.coeficiente, esperado },
  );
  check(
    "el monto actualizado es el nominal por el coeficiente",
    aprox(r?.actualizado ?? 0, Math.round(25_000_000 * esperado * 100) / 100),
    r?.actualizado,
  );
  check(
    "la diferencia es lo que agrega la actualización",
    aprox((r?.diferencia ?? 0) + 25_000_000, r?.actualizado ?? 0),
    { diferencia: r?.diferencia, actualizado: r?.actualizado },
  );
  check("la actualización no achica el quebranto", (r?.actualizado ?? 0) > 25_000_000);

  // Un ejercicio no alcanzado tiene coeficiente exactamente 1: es el escenario "antes de la
  // reforma", y es la prueba de que el nominal no se toca.
  const viejo = calcularQuebranto({
    monto: 25_000_000,
    cierreOrigen: "2024-12",
    cierreLiquidado: liquidado,
  });
  check("sin alcance, el coeficiente es exactamente 1", viejo?.coeficiente === 1, viejo?.coeficiente);
  check("sin alcance, no hay diferencia", viejo?.diferencia === 0, viejo?.diferencia);
}

// ===========================================================================
// 4 · Los cinco años: la actualización no los estira
// ===========================================================================
{
  const enElLimite = calcularQuebranto({
    monto: 5_000_000,
    cierreOrigen: "2025-12",
    cierreLiquidado: "2030-12",
  });
  const unAnioMas = calcularQuebranto({
    monto: 5_000_000,
    cierreOrigen: "2025-12",
    cierreLiquidado: "2031-12",
  });
  check("a los cinco ejercicios todavía se computa", enElLimite?.vencido === false, enElLimite);
  check(
    "el último ejercicio computable es el que cierra en 2030",
    enElLimite?.ultimoAnioComputable === 2030,
    enElLimite?.ultimoAnioComputable,
  );
  check("al sexto ejercicio ya está vencido", unAnioMas?.vencido === true, unAnioMas);
  check("un quebranto vencido computa cero", unAnioMas?.actualizado === 0, unAnioMas?.actualizado);
  check(
    "el último ejercicio computable avisa que se agota el plazo",
    (enElLimite?.avisos ?? []).some((a) => a.tono === "atencion" && /cinco años/.test(a.texto)),
    enElLimite?.avisos,
  );
}

// ===========================================================================
// 5 · Entradas inválidas: no se inventa un resultado
// ===========================================================================
{
  check("monto cero → null", calcularQuebranto({ monto: 0, cierreOrigen: "2025-12", cierreLiquidado: "2026-12" }) === null);
  check("monto negativo → null", calcularQuebranto({ monto: -1, cierreOrigen: "2025-12", cierreLiquidado: "2026-12" }) === null);
  check(
    "liquidar un ejercicio anterior al de origen → null",
    calcularQuebranto({ monto: 1_000_000, cierreOrigen: "2026-12", cierreLiquidado: "2025-12" }) === null,
  );
  check(
    "el mismo ejercicio → null (no hay nada que trasladar)",
    calcularQuebranto({ monto: 1_000_000, cierreOrigen: "2026-12", cierreLiquidado: "2026-12" }) === null,
  );
  check(
    "un período mal formado → null",
    calcularQuebranto({ monto: 1_000_000, cierreOrigen: "2025", cierreLiquidado: "2026-12" }) === null,
  );
}

// ===========================================================================
// 6 · El diff es el producto: el texto anterior tiene que seguir siendo el anterior
// ===========================================================================
{
  // Se widenan a `string`: con `as const` los dos literales tienen tipos disjuntos y TypeScript
  // rechaza la comparación final por "no overlap" — que es justo lo que este check quiere probar.
  const antes: string = QUEBRANTOS_TEXTOS.parrafoAnterior;
  const ahora: string = QUEBRANTOS_TEXTOS.parrafoVigente;
  check("el texto anterior habla de IPIM", /Precios Internos al por Mayor \(IPIM\)/.test(antes));
  check("el texto anterior NO menciona el IPC", !/\(IPC\)/.test(antes));
  check("el texto anterior NO tiene fecha de corte", !/1° de enero de 2025/.test(antes));
  check("el texto anterior NO excluye el art. 93", !/art[íi]culo 93/.test(antes));
  check("el texto vigente habla de IPC nivel general", /Precios al Consumidor Nivel General \(IPC\)/.test(ahora));
  check("el texto vigente pone la fecha de corte en el inicio del ejercicio", /ejercicios fiscales que se inicien a partir del 1° de enero de 2025/.test(ahora));
  check(
    "el texto vigente excluye el primer párrafo del art. 93",
    /sin que resulte de aplicación lo dispuesto en el primer párrafo del artículo 93/.test(ahora),
  );
  check("los dos textos son distintos", antes !== ahora);
}

// ===========================================================================
// 7 · La cadena del congelamiento, citada entera
// ===========================================================================
{
  check(
    "el art. 93 remite al art. 39 de la Ley 24.073",
    /artículo 39 de la Ley N° 24\.073/.test(QUEBRANTOS_TEXTOS.art93PrimerParrafo),
    QUEBRANTOS_TEXTOS.art93PrimerParrafo,
  );
  check(
    "el art. 39 topea las tablas en marzo de 1992",
    /límite máximo las variaciones operadas hasta el mes de marzo de 1992/.test(
      QUEBRANTOS_TEXTOS.art39Ley24073,
    ),
  );
  check(
    "el noveno párrafo publica el plazo de cinco años",
    /CINCO \(5\) años/.test(QUEBRANTOS_TEXTOS.cincoAnios),
  );
  check(
    "el décimo párrafo publica la regla de los específicos",
    /misma fuente/.test(QUEBRANTOS_TEXTOS.especificos),
  );
  check("están listados los quebrantos específicos", QUEBRANTOS_ESPECIFICOS.length >= 5, QUEBRANTOS_ESPECIFICOS.length);
}

// ===========================================================================
// 8 · Fuentes oficiales, con fecha
// ===========================================================================
{
  const urls = QUEBRANTOS_FUENTES.lista.map((f) => f.url);
  check("hay al menos cinco fuentes", urls.length >= 5, urls.length);
  check(
    "todas las fuentes son oficiales (.gob.ar)",
    urls.every((u) => /^https:\/\/[a-z.]*gob\.ar\//.test(u)),
    urls,
  );
  check(
    "están citadas las cuatro normas de la cadena",
    ["332890", "423680", "472", "datos.gob.ar"].every((n) => urls.some((u) => u.includes(n))),
    urls,
  );
  check(
    "la fecha de consulta está declarada en ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(QUEBRANTOS_FUENTES.consultadoEl),
    QUEBRANTOS_FUENTES.consultadoEl,
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de actualización de quebrantos OK (LIG arts. 25 y 93 · Ley 24.073 art. 39 · Ley 27.802 art. 190)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
