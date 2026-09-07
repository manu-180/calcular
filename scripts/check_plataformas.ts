// Verificación de la página de repartidores y conductores de apps (Ley 27.802, Título XII,
// arts. 119 a 128 · LCT art. 2° inc. f). Correr con: npx tsx scripts/check_plataformas.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **El art. 2° inc. f) de la LCT tiene que seguir excluyendo a estas personas.** Toda la
//      página cuelga de esa exclusión: si el inciso cambia, la mitad de las respuestas se
//      invierten (volverían el aguinaldo, las vacaciones y la indemnización).
//   2. **El art. 125 inc. 2 tiene que seguir poniendo los aportes como OBLIGACIÓN.** Es lo que
//      justifica descontar la cuota del monotributo del ingreso en vez de mencionarla al pasar.
//   3. **El art. 126 inc. 7 tiene que seguir diciendo «cien por ciento (100%)» de las propinas**,
//      y el inc. 6 tiene que seguir hablando de seguro de accidentes personales y NO de ART.
//   4. **El art. 128 tiene que seguir remitiendo al Código Civil y Comercial**, no a la LCT: es
//      la prueba de que el derecho supletorio cambió.
//   5. **La categoría y la cuota salen de la escala de ARCA ya verificada**, no de números
//      escritos a mano acá: se cruzan contra `categoriaParaFacturacion`/`cuotaMensual`.
//   6. **El neto es bruto − cuota, y el % nunca puede ser negativo ni pasar del 100%.**
//   7. **La brecha con el empleado es 13 pagos + el plus vacacional**, derivada de las constantes
//      de `data/vacaciones` (divisor 25 vs 30 y los 14 días del art. 150), nunca un 9% hardcodeado.
//   8. **Quien además es empleado en blanco paga sólo el impuesto integrado** (sin SIPA ni obra
//      social): es la única bifurcación de la calculadora y la más fácil de romper en un refactor.

import {
  ARTICULOS_REGIMEN,
  PLATAFORMAS_FUENTES,
  PLATAFORMAS_TEXTOS,
  QUE_DA_Y_QUE_NO,
  VIGENCIA_REGIMEN,
  VIGENCIA_REGIMEN_ISO,
} from "../src/data/plataformas";
import { CATEGORIAS, TOPE_MAXIMO } from "../src/data/monotributo";
import { DIVISOR_DIA_NORMAL, DIVISOR_VACACIONES, ESCALA_VACACIONES } from "../src/data/vacaciones";
import { categoriaParaFacturacion, cuotaMensual } from "../src/lib/monotributo";
import {
  DIAS_VACACIONES_BASE,
  PAGOS_ANUALES_EMPLEADO,
  PAGOS_ANUALES_PRESTADOR,
  PAGOS_EQUIVALENTES_EMPLEADO,
  PLUS_VACACIONAL_EN_SUELDOS,
  calcularPlataforma,
} from "../src/lib/plataformas";

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

// ── 1. Las citas textuales dicen lo que dice la norma ──────────────────────────────────────────
{
  const t = PLATAFORMAS_TEXTOS;

  check(
    "el art. 2° inc. f) de la LCT excluye a los prestadores independientes de plataformas",
    t.art2IncFLct.includes("prestadores independientes de plataformas tecnológicas") &&
      t.art2IncFLct.includes("conforme la regulación específica"),
    t.art2IncFLct,
  );
  check(
    "el art. 217 hace regir la ley desde su publicación en el Boletín Oficial",
    t.art217Vigencia.includes("entrarán en vigencia a partir de su publicación en el Boletín Oficial"),
    t.art217Vigencia,
  );
  check(
    "el art. 119 declara el objeto: asegurar la independencia de quienes prestan",
    t.art119.includes("asegurando la independencia"),
    t.art119,
  );
  check(
    "el art. 120 define «prestador independiente» como persona humana que contrata de forma independiente",
    t.art120.includes("Prestador independiente de plataformas tecnológicas") &&
      t.art120.includes("persona humana"),
  );
  check(
    "el art. 121 garantiza la libertad de conectarse en los horarios que quiera",
    t.art121.includes("durante los horarios y en el tiempo que estime convenientes") &&
      t.art121.includes("aceptar y/o rechazar solicitudes"),
  );
  check(
    "el art. 123 consagra la libertad de formas del contrato",
    t.art123.includes("Las partes podrán acordar libremente los términos del contrato"),
    t.art123,
  );
  check(
    "el art. 124 obliga a la plataforma a tener un mecanismo digital de reclamos",
    t.art124.includes("mecanismo digital de reporte de quejas"),
  );
  check(
    "ANCLA: el art. 125 inc. 2 pone la inscripción fiscal como OBLIGACIÓN del prestador",
    t.art125.includes("Estar inscripto debidamente ante las autoridades fiscales"),
    t.art125,
  );
  check(
    "…y nombra los aportes y lo que compran (PBU, invalidez, pensión, Seguro de Salud)",
    t.art125.includes("hacer los pagos de los aportes respectivos") &&
      t.art125.includes("Prestación Básica Universal") &&
      t.art125.includes("artículo 17 de la ley 24.241") &&
      t.art125.includes("Sistema Nacional del Seguro de Salud"),
  );
  check(
    "ANCLA: el art. 126 inc. 7 da el CIEN POR CIENTO de las propinas",
    t.art126.includes("cien por ciento (100%) del monto que los usuarios agreguen") &&
      t.art126.includes("gratificación, recompensa o propina"),
  );
  check(
    "ANCLA: el art. 126 inc. 6 manda un seguro de accidentes personales, NO una ART",
    t.art126.includes("seguro de accidentes personales") && !/Ley\s*24\.?557/i.test(t.art126),
  );
  check(
    "…y ese seguro cubre fallecimiento, incapacidad, gastos médicos y costos funerarios",
    t.art126.includes("fallecimiento accidental") &&
      t.art126.includes("incapacidad total y/o parcial permanente") &&
      t.art126.includes("costos funerarios"),
  );
  check(
    "el art. 126 aclara que ejercer estos derechos no es indicio de relación laboral",
    t.art126.includes("sin que éstos impliquen un indicio de relación laboral"),
  );
  check(
    "el art. 126 inc. 8 prohíbe exigir una frecuencia mínima de conexión",
    t.art126.includes("sin tener la exigibilidad de una periodicidad o frecuencia mínima"),
  );
  check(
    "el art. 127 deja la autoridad de aplicación a la reglamentación (todavía no dictada)",
    t.art127.includes("vía reglamentación, determinará la autoridad de aplicación"),
    t.art127,
  );
  check(
    "ANCLA: el art. 128 remite supletoriamente al Código Civil y Comercial, no a la LCT",
    t.art128.includes("Código Civil y Comercial de la Nación") &&
      !/Contrato de Trabajo/i.test(t.art128),
    t.art128,
  );
  check(
    "los diez artículos del régimen están cargados y ninguno quedó vacío",
    [
      t.art119, t.art120, t.art121, t.art122, t.art123,
      t.art124, t.art125, t.art126, t.art127, t.art128,
    ].every((x) => typeof x === "string" && x.trim().length > 80),
  );
  check(
    "el régimen declarado va del art. 119 al 128",
    ARTICULOS_REGIMEN.desde === 119 && ARTICULOS_REGIMEN.hasta === 128,
    ARTICULOS_REGIMEN,
  );
  check(
    "la vigencia es el 6/3/2026 y el ISO coincide con el texto en castellano",
    VIGENCIA_REGIMEN === "6 de marzo de 2026" && VIGENCIA_REGIMEN_ISO === "2026-03-06",
    { VIGENCIA_REGIMEN, VIGENCIA_REGIMEN_ISO },
  );
}

// ── 2. La tabla de «qué da y qué no» no puede contradecir a la ley ─────────────────────────────
{
  const conceptos = QUE_DA_Y_QUE_NO.map((i) => i.concepto.toLowerCase());
  check(
    "la tabla tiene las dos columnas pobladas",
    QUE_DA_Y_QUE_NO.some((i) => i.tiene) && QUE_DA_Y_QUE_NO.some((i) => !i.tiene),
  );
  for (const nombre of ["aguinaldo", "vacaciones", "indemnización", "art ("]) {
    const item = QUE_DA_Y_QUE_NO.find((i) => i.concepto.toLowerCase().includes(nombre));
    check(`«${nombre}» figura como NO incluido`, item !== undefined && item.tiene === false, item);
  }
  const propinas = QUE_DA_Y_QUE_NO.find((i) => i.concepto.toLowerCase().includes("propina"));
  check("las propinas figuran como SÍ incluidas", propinas?.tiene === true, propinas);
  check(
    "cada fila cita el artículo del que sale",
    QUE_DA_Y_QUE_NO.every((i) => /art/i.test(i.fuente) && i.detalle.length > 40),
    conceptos,
  );
}

// ── 3. Las constantes del contraste con un empleado son DERIVADAS, no escritas a mano ──────────
{
  check("el empleado cobra 13 pagos (12 + SAC)", PAGOS_ANUALES_EMPLEADO === 13);
  check("el prestador cobra 12", PAGOS_ANUALES_PRESTADOR === 12);
  check(
    "los días de vacaciones base salen de la escala del art. 150 (14 días, hasta 5 años)",
    DIAS_VACACIONES_BASE === ESCALA_VACACIONES[0].dias && DIAS_VACACIONES_BASE === 14,
    DIAS_VACACIONES_BASE,
  );
  const plusEsperado = 14 * (1 / DIVISOR_VACACIONES - 1 / DIVISOR_DIA_NORMAL);
  check(
    "el plus vacacional se deriva de los divisores 25 y 30, no de un porcentaje hardcodeado",
    casi(PLUS_VACACIONAL_EN_SUELDOS, plusEsperado, 1e-12) &&
      DIVISOR_VACACIONES === 25 &&
      DIVISOR_DIA_NORMAL === 30,
    { PLUS_VACACIONAL_EN_SUELDOS, plusEsperado },
  );
  check(
    "el plus vale ~0,0933 sueldos (14 días pagados por 25 en vez de por 30)",
    casi(PLUS_VACACIONAL_EN_SUELDOS, 0.093333, 1e-5),
    PLUS_VACACIONAL_EN_SUELDOS,
  );
  check(
    "los pagos equivalentes del empleado son 13 + el plus",
    casi(PAGOS_EQUIVALENTES_EMPLEADO, 13 + PLUS_VACACIONAL_EN_SUELDOS, 1e-12),
    PAGOS_EQUIVALENTES_EMPLEADO,
  );
  check(
    "la brecha anual queda en el 9,1% y pico, que es lo que afirma la página",
    (() => {
      const p = (PAGOS_EQUIVALENTES_EMPLEADO / PAGOS_ANUALES_PRESTADOR - 1) * 100;
      return p > 9 && p < 9.3;
    })(),
    (PAGOS_EQUIVALENTES_EMPLEADO / PAGOS_ANUALES_PRESTADOR - 1) * 100,
  );
}

// ── 4. El cálculo, contra la escala oficial ────────────────────────────────────────────────────
{
  for (const brutoMensual of [350_000, 900_000, 1_800_000, 3_500_000]) {
    const r = calcularPlataforma({ brutoMensual, otroEmpleo: false });
    if (r.tipo !== "ok") {
      check(`caso ${brutoMensual}: debería entrar en el monotributo`, false, r);
      continue;
    }
    const catEsperada = categoriaParaFacturacion(brutoMensual * 12);
    const cuotaEsperada = cuotaMensual(catEsperada!, "servicios", false);

    check(
      `caso ${brutoMensual}: la categoría es la de la escala de ARCA (${catEsperada?.cat})`,
      r.categoria.cat === catEsperada?.cat,
      { obtenida: r.categoria.cat, esperada: catEsperada?.cat },
    );
    check(
      `caso ${brutoMensual}: la cuota es impuesto integrado + SIPA + obra social`,
      casi(r.cuota.total, cuotaEsperada.total) &&
        casi(
          r.cuota.total,
          r.cuota.impuestoIntegrado + r.cuota.sipa + r.cuota.obraSocial,
        ),
      r.cuota,
    );
    check(
      `caso ${brutoMensual}: el neto es el bruto menos la cuota`,
      casi(r.netoMensual, brutoMensual - r.cuota.total),
      r.netoMensual,
    );
    check(
      `caso ${brutoMensual}: el % de la cuota está entre 0 y 100`,
      r.porcentajeCuota > 0 && r.porcentajeCuota < 100,
      r.porcentajeCuota,
    );
    check(
      `caso ${brutoMensual}: la facturación anual no supera el tope de la categoría`,
      r.facturacionAnual <= r.categoria.ingresosBrutosMax && r.margenHastaTope >= 0,
      { anual: r.facturacionAnual, tope: r.categoria.ingresosBrutosMax },
    );
    check(
      `caso ${brutoMensual}: el ingreso anual del prestador son 12 netos`,
      casi(r.brecha.ingresoAnualPrestador, r.netoMensual * 12),
    );
    check(
      `caso ${brutoMensual}: la brecha es aguinaldo + plus vacacional, ni un peso más`,
      casi(
        r.brecha.brechaAnual,
        r.brecha.aguinaldoNoCobrado + r.brecha.plusVacacionalNoCobrado,
      ),
      r.brecha,
    );
    check(
      `caso ${brutoMensual}: la cuota anual son 12 cuotas`,
      casi(r.cuotaAnual, r.cuota.total * 12),
    );
  }
}

// ── 4b. La cuota es FIJA, así que muerde más abajo (es lo que afirma la respuesta rápida) ──────
{
  const bajo = calcularPlataforma({ brutoMensual: 350_000, otroEmpleo: false });
  const alto = calcularPlataforma({ brutoMensual: 3_500_000, otroEmpleo: false });
  if (bajo.tipo !== "ok" || alto.tipo !== "ok") {
    check("los dos extremos calculan", false);
  } else {
    check(
      "la cuota pesa MÁS sobre la facturación baja que sobre la alta (importe fijo por categoría)",
      bajo.porcentajeCuota > alto.porcentajeCuota,
      { bajo: bajo.porcentajeCuota, alto: alto.porcentajeCuota },
    );
    check(
      "…y en las categorías de abajo pasa el 10%, como dice la página",
      bajo.porcentajeCuota > 10,
      bajo.porcentajeCuota,
    );
    check(
      "…mientras que arriba baja al orden del 4%",
      alto.porcentajeCuota < 6,
      alto.porcentajeCuota,
    );
  }
}

// ── 5. La bifurcación de quien además es empleado en blanco ────────────────────────────────────
{
  const solo = calcularPlataforma({ brutoMensual: 900_000, otroEmpleo: false });
  const conEmpleo = calcularPlataforma({ brutoMensual: 900_000, otroEmpleo: true });
  if (solo.tipo !== "ok" || conEmpleo.tipo !== "ok") {
    check("los dos casos calculan", false);
  } else {
    check(
      "quien ya aporta por un sueldo paga SOLO el impuesto integrado",
      conEmpleo.cuota.sipa === 0 &&
        conEmpleo.cuota.obraSocial === 0 &&
        casi(conEmpleo.cuota.total, conEmpleo.cuota.impuestoIntegrado),
      conEmpleo.cuota,
    );
    check(
      "…y por eso le queda más neto que a quien vive sólo de la app",
      conEmpleo.netoMensual > solo.netoMensual,
      { conEmpleo: conEmpleo.netoMensual, solo: solo.netoMensual },
    );
    check(
      "la categoría no cambia por tener otro empleo (depende de la facturación)",
      conEmpleo.categoria.cat === solo.categoria.cat,
    );
  }
}

// ── 6. Los bordes: cero, y por encima del tope del régimen ─────────────────────────────────────
{
  const cero = calcularPlataforma({ brutoMensual: 0, otroEmpleo: false });
  check(
    "con facturación cero no explota y cae en la categoría A",
    cero.tipo === "ok" && cero.categoria.cat === CATEGORIAS[0].cat,
    cero,
  );
  const excedido = calcularPlataforma({
    brutoMensual: TOPE_MAXIMO / 12 + 1_000_000,
    otroEmpleo: false,
  });
  check(
    "por encima del tope del régimen devuelve «excedido» en vez de inventar una categoría",
    excedido.tipo === "excedido" && excedido.tope === TOPE_MAXIMO,
    excedido,
  );
  const negativo = calcularPlataforma({ brutoMensual: -50_000, otroEmpleo: false });
  check("un monto negativo se trata como cero", negativo.tipo === "ok", negativo);
}

// ── 7. Fuentes: oficiales, y la ley citada ─────────────────────────────────────────────────────
{
  check(
    "todas las fuentes son de dominios oficiales",
    PLATAFORMAS_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina|afip|arca)\.gob\.ar\//.test(
        f.url,
      ),
    ),
    PLATAFORMAS_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citada la Ley 27.802 por su id de InfoLEG",
    PLATAFORMAS_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "está citada la escala de monotributo de ARCA",
    PLATAFORMAS_FUENTES.lista.some((f) => f.url.includes("monotributo")),
  );
  check(
    "está citado el texto ACTUALIZADO de la LCT (por el art. 2° inc. f)",
    PLATAFORMAS_FUENTES.lista.some((f) => f.url.includes("25552") && f.url.endsWith("texact.htm")),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(PLATAFORMAS_FUENTES.consultadoEl),
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  "\nTodos los checks de plataformas de reparto OK (Ley 27.802 Título XII, arts. 119-128 · LCT art. 2° inc. f).",
);
