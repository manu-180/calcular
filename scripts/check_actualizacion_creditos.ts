// Verificación de la actualización de créditos laborales (art. 276 LCT, texto de la Ley 27.802).
// Correr con: npx tsx scripts/check_actualizacion_creditos.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **El coeficiente es el cociente de índices oficiales**, no un acumulado de variaciones
//      mensuales redondeadas. Se cruza contra la serie cruda de data/ipc-serie.ts.
//   2. **El 3% corre sobre el capital ACTUALIZADO, no sobre el nominal.** Es la decisión de
//      lectura que más plata mueve: si un refactor la invierte, el interés se licua y nadie lo ve.
//   3. **El interés es SIMPLE y el compuesto siempre es mayor** (para períodos > 1 año). Si
//      alguna vez el "simple" empieza a dar más que el compuesto, hay un signo dado vuelta.
//   4. **La actualización se topea en el último IPC publicado, el interés no.** Un pago futuro
//      tiene que dar el mismo capital actualizado que uno hecho en el último mes publicado, con
//      más interés. Es el desfasaje del INDEC, que es el hallazgo de la página.
//   5. **Fuera de la serie no se inventa**: un crédito anterior a diciembre de 2016 devuelve null
//      con motivo explicado, nunca un número.
//   6. **Las citas textuales siguen siendo las de la ley**, verificadas por frases ancla — y el
//      contraste del art. 277 (las cuotas de las grandes empresas remiten al art. 276 y las de
//      las MiPyME no) es justamente el hallazgo: si el texto guardado deja de tener esa
//      asimetría, la página estaría afirmando algo que su fuente ya no dice.

import { IPC_SERIE } from "../src/data/ipc-serie";
import {
  COSTAS_MAXIMAS,
  CREDITOS_TEXTOS,
  CUOTAS_GRANDES_EMPRESAS,
  CUOTAS_PYME,
  CUOTA_LITIS_MAXIMA,
  TASA_PURA_ANUAL,
} from "../src/data/actualizacion-creditos";
import {
  actualizarCreditoLaboral,
  cuotasSinAjuste,
  motivoImposible,
} from "../src/lib/actualizacion-creditos";
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
const casi = (a: number, b: number, tol = 0.01) => Math.abs(a - b) <= tol;

const INDICE = new Map<string, number>(IPC_SERIE.map(([p, v]) => [p, v]));

// ── 1. El coeficiente sale de los índices oficiales, sin intermediarios ────────────────────────
{
  const desde = sumarMeses(ULTIMO_PERIODO, -24);
  const r = actualizarCreditoLaboral({ monto: 1_000_000, desde, hasta: ULTIMO_PERIODO });
  check("actualización de 24 meses devuelve resultado", r !== null);
  if (r) {
    const esperado = INDICE.get(ULTIMO_PERIODO)! / INDICE.get(desde)!;
    check(
      "coeficiente = índice(hasta) / índice(desde) de la serie del INDEC",
      casi(r.coeficiente, esperado, 1e-9),
      { calculado: r.coeficiente, esperado },
    );
    check(
      "capital actualizado = monto × coeficiente",
      casi(r.capitalActualizado, 1_000_000 * esperado),
      r.capitalActualizado,
    );
    check("índices reportados son los de la serie", r.indiceDesde === INDICE.get(desde));
  }
}

// ── 2. El 3% corre sobre el capital actualizado, no sobre el nominal ──────────────────────────
{
  const desde = sumarMeses(ULTIMO_PERIODO, -12);
  const r = actualizarCreditoLaboral({ monto: 1_000_000, desde, hasta: ULTIMO_PERIODO })!;
  const sobreActualizado = r.capitalActualizado * TASA_PURA_ANUAL * 1;
  const sobreNominal = 1_000_000 * TASA_PURA_ANUAL * 1;
  check(
    "el interés puro se calcula sobre el capital ya repotenciado",
    casi(r.interesPuro, sobreActualizado),
    { interes: r.interesPuro, sobreActualizado, sobreNominal },
  );
  check(
    "y por lo tanto es mayor que el mismo 3% sobre el nominal",
    r.interesPuro > sobreNominal,
    { interes: r.interesPuro, sobreNominal },
  );
  check("total = capital actualizado + interés", casi(r.total, r.capitalActualizado + r.interesPuro));
  check("la tasa de la norma sigue siendo 3% anual", TASA_PURA_ANUAL === 0.03, TASA_PURA_ANUAL);
}

// ── 3. Simple vs. compuesto: el compuesto siempre paga más en plazos largos ────────────────────
{
  const r = actualizarCreditoLaboral({
    monto: 1_000_000,
    desde: sumarMeses(ULTIMO_PERIODO, -60),
    hasta: ULTIMO_PERIODO,
  })!;
  check("a 5 años, el interés compuesto supera al simple", r.interesCompuesto > r.interesPuro, {
    simple: r.interesPuro,
    compuesto: r.interesCompuesto,
  });
  check(
    "y la brecha entre las dos lecturas es menor al 1% del total (tasa pura chica)",
    (r.totalCompuesto - r.total) / r.total < 0.01,
    { brechaPct: ((r.totalCompuesto - r.total) / r.total) * 100 },
  );
}

// ── 4. El desfasaje del IPC: la actualización se topea, el interés no ──────────────────────────
{
  const desde = sumarMeses(ULTIMO_PERIODO, -12);
  const alDia = actualizarCreditoLaboral({ monto: 1_000_000, desde, hasta: ULTIMO_PERIODO })!;
  const futuro = actualizarCreditoLaboral({
    monto: 1_000_000,
    desde,
    hasta: sumarMeses(ULTIMO_PERIODO, 3),
  })!;

  check("un pago futuro reporta los meses de IPC que faltan", futuro.mesesSinIpc === 3, futuro.mesesSinIpc);
  check("y el pago al día no reporta ninguno", alDia.mesesSinIpc === 0, alDia.mesesSinIpc);
  check(
    "el capital actualizado NO crece con meses sin índice publicado",
    casi(futuro.capitalActualizado, alDia.capitalActualizado),
    { futuro: futuro.capitalActualizado, alDia: alDia.capitalActualizado },
  );
  check(
    "pero el interés del 3% SÍ corre por esos meses",
    futuro.interesPuro > alDia.interesPuro,
    { futuro: futuro.interesPuro, alDia: alDia.interesPuro },
  );
  check(
    "el tope de la actualización es el último período publicado",
    futuro.hastaIpc === ULTIMO_PERIODO,
    futuro.hastaIpc,
  );
  check(
    "hay un aviso que lo explica en la propia calculadora",
    futuro.avisos.some((a) => a.texto.includes("todavía no publicó")),
    futuro.avisos,
  );
}

// ── 5. Fuera de la serie no se inventa un número ───────────────────────────────────────────────
{
  const r = actualizarCreditoLaboral({ monto: 1_000_000, desde: "2015-06", hasta: ULTIMO_PERIODO });
  check("un crédito anterior a la serie del IPC no devuelve resultado", r === null);
  const motivo = motivoImposible("2015-06", ULTIMO_PERIODO);
  check("y sí devuelve un motivo explicado", typeof motivo === "string" && motivo.length > 60, motivo);

  check(
    "pago anterior a la deuda tampoco devuelve número",
    actualizarCreditoLaboral({
      monto: 1_000_000,
      desde: ULTIMO_PERIODO,
      hasta: sumarMeses(ULTIMO_PERIODO, -3),
    }) === null,
  );
  check(
    "monto cero o negativo tampoco",
    actualizarCreditoLaboral({ monto: 0, desde: sumarMeses(ULTIMO_PERIODO, -6), hasta: ULTIMO_PERIODO }) ===
      null,
  );

  const mismoMes = actualizarCreditoLaboral({
    monto: 1_000_000,
    desde: ULTIMO_PERIODO,
    hasta: ULTIMO_PERIODO,
  })!;
  check("sin demora, el crédito no se mueve", casi(mismoMes.total, 1_000_000), mismoMes.total);
}

// ── 6. Cuota litis: se topea en el 20% y se descuenta del trabajador ───────────────────────────
{
  const r = actualizarCreditoLaboral({
    monto: 1_000_000,
    desde: sumarMeses(ULTIMO_PERIODO, -12),
    hasta: ULTIMO_PERIODO,
    cuotaLitisPct: 35,
  })!;
  check(
    "un pacto por encima del tope legal se recorta al 20%",
    casi(r.cuotaLitis, r.total * CUOTA_LITIS_MAXIMA),
    { cuotaLitis: r.cuotaLitis, tope: r.total * CUOTA_LITIS_MAXIMA },
  );
  check("el neto es el total menos el pacto", casi(r.neto, r.total - r.cuotaLitis));
  check("los topes del art. 277 son 20% y 25%", CUOTA_LITIS_MAXIMA === 0.2 && COSTAS_MAXIMAS === 0.25);
}

// ── 7. Las cuotas del art. 277 sin ajuste se licuan ────────────────────────────────────────────
{
  const c = cuotasSinAjuste(10_000_000, CUOTAS_PYME);
  check("el cálculo de cuotas sin ajuste devuelve resultado", c !== null);
  if (c) {
    check("12 cuotas mensuales", c.cuotas === 12 && CUOTAS_PYME === 12);
    check("la última cuota vale menos que la primera en términos reales", c.valorRealUltimaCuota < c.valorCuotaNominal);
    check("y el total se licua algo", c.perdidaPct > 0, c.perdidaPct);
    check("pero nunca más del 100%", c.perdidaPct < 100, c.perdidaPct);
  }
  check("las grandes empresas pagan en 6 cuotas", CUOTAS_GRANDES_EMPRESAS === 6);
}

// ── 8. Las citas textuales son las de la ley ───────────────────────────────────────────────────
{
  const t = CREDITOS_TEXTOS;
  check(
    "el art. 276 nombra el IPC Nivel General del INDEC",
    t.art276.includes("Índice de Precios al Consumidor (IPC) - Nivel General") &&
      t.art276.includes("Instituto Nacional de Estadística y Censos (INDEC)"),
  );
  check(
    "y la tasa del tres por ciento anual",
    t.art276.includes("tasa de interés del tres por ciento (3%) anual"),
  );
  check(
    "y el tramo temporal completo",
    t.art276.includes("desde que cada suma sea debida y hasta el momento del efectivo pago"),
  );
  check(
    "la cuota litis se topea en el veinte por ciento",
    t.cuotaLitis.includes(
      "en ningún caso podrá exceder del veinte por ciento (20%) del monto del proceso",
    ),
  );
  check(
    "las costas en el veinticinco por ciento",
    t.costas.includes("no excederán del veinticinco por ciento (25%)"),
  );
  // El hallazgo de la página: la remisión al art. 276 está SÓLO en el supuesto de 6 cuotas.
  check(
    "las 6 cuotas de grandes empresas remiten expresamente al art. 276",
    t.cuotasGrandes.includes("ajustadas conforme la pauta establecida en el artículo 276"),
  );
  check(
    "y las 12 cuotas de las MiPyME NO repiten esa remisión (es el hallazgo de la página)",
    !t.cuotasPyme.includes("artículo 276") && t.cuotasPyme.includes("doce (12) cuotas"),
    t.cuotasPyme,
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log("\nTodos los checks de actualización de créditos laborales OK (art. 276 LCT).");
