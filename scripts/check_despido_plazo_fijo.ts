// Verificación de la página de despido antes del vencimiento del plazo (LCT art. 95, texto
// sustituido por el art. 28 de la Ley 27.802). Correr con: npx tsx scripts/check_despido_plazo_fijo.ts
//
// LOS ANCLAS:
//   1. **El art. 95 está SUSTITUIDO, no derogado.** Hay texto vigente y texto anterior, y la página
//      tiene que publicar los dos sin confundirlos. Si alguien copia el viejo a la columna de
//      vigente, esto falla.
//   2. **El rubro que salió y el que entró.** El texto vigente NO puede contener "daños y
//      perjuicios" y SÍ tiene que contener la antigüedad ficta; con el anterior, al revés. Es todo
//      el hallazgo: si esas dos oraciones se cruzan, la página miente sobre la reforma.
//   3. **El tercer párrafo de absorción sólo existe en el texto anterior.**
//   4. **El art. 245 no se reimplementa** (regla de s85): el tramo de antigüedad tiene que ser
//      idéntico al que publica `calcularIndemnizacion` corriendo hasta el fin del plazo pactado.
//   5. **En el plazo fijo no hay período de prueba** (art. 92 bis, primera oración): un contrato
//      roto en el mes 2 indemniza. Se verifica que el flag `sinPeriodoPrueba` es el que lo decide
//      y que SIN el flag el motor sigue comportándose como antes (no se rompió /indemnizacion).
//   6. **La antigüedad ficta nunca puede pagar menos que la real**, y tiene techo en los 5 años
//      del art. 93.
//   7. **La ventana que se cerró es aritmética pura**, no una indemnización: días faltantes × el
//      valor diario del art. 233. Nunca se presenta como monto reclamable.
//   8. **El art. 250 exige un año**: por debajo, el vencimiento con preaviso no paga nada.
//   9. **La liquidación final va sobre las fechas REALES**, no sobre la ficta ("a ese solo efecto").

import {
  ANIOS_MAXIMO_PLAZO,
  ANIOS_MINIMO_ART250,
  ARTICULO_REFORMADO,
  ARTICULO_SUSTITUYENTE,
  PLAZO_FIJO_FUENTES,
  PLAZO_FIJO_TEXTOS,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/despido-plazo-fijo";
import { calcularIndemnizacion } from "../src/lib/indemnizacion";
import { calcularDespidoPlazoFijo } from "../src/lib/despido-plazo-fijo";

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

const BASE = 1_400_000;

// ── 1. La sustitución: qué artículo, por obra de quién y desde cuándo ──────────────────────────
{
  check("el artículo reformado de la LCT es el 95", ARTICULO_REFORMADO === 95);
  check("lo sustituyó el art. 28 de la Ley 27.802", ARTICULO_SUSTITUYENTE === 28);
  check(
    "la nota de sustitución cita el art. 28 de la Ley 27.802 y la fecha del B.O.",
    PLAZO_FIJO_TEXTOS.art95Nota.includes(`art. ${ARTICULO_SUSTITUYENTE}`) &&
      PLAZO_FIJO_TEXTOS.art95Nota.includes("27.802") &&
      PLAZO_FIJO_TEXTOS.art95Nota.includes("6/3/2026"),
    PLAZO_FIJO_TEXTOS.art95Nota,
  );
  check(
    "la nota dice SUSTITUIDO, no derogado",
    PLAZO_FIJO_TEXTOS.art95Nota.includes("sustituido") &&
      !PLAZO_FIJO_TEXTOS.art95Nota.includes("derogado"),
    PLAZO_FIJO_TEXTOS.art95Nota,
  );
  check("la vigencia es el 6 de marzo de 2026", VIGENCIA_REFORMA === "6 de marzo de 2026");
  check("el ISO de la vigencia coincide", VIGENCIA_REFORMA_ISO === "2026-03-06");
}

// ── 2. El corazón del hallazgo: la oración que entró y la que salió ────────────────────────────
{
  check(
    "el texto VIGENTE trae la antigüedad ficta hasta el fin del plazo pactado",
    PLAZO_FIJO_TEXTOS.art95Vigente.includes(PLAZO_FIJO_TEXTOS.oracionQueEntro),
  );
  check(
    "el texto VIGENTE ya NO habla de daños y perjuicios",
    !PLAZO_FIJO_TEXTOS.art95Vigente.includes("daños y perjuicios"),
    PLAZO_FIJO_TEXTOS.art95Vigente,
  );
  check(
    "el texto ANTERIOR trae los daños y perjuicios del derecho común",
    PLAZO_FIJO_TEXTOS.art95Anterior.includes(PLAZO_FIJO_TEXTOS.oracionQueSalio),
  );
  check(
    "el texto ANTERIOR no conoce la antigüedad ficta",
    !PLAZO_FIJO_TEXTOS.art95Anterior.includes("antigüedad que habría acumulado"),
  );
  check(
    "el tercer párrafo de absorción del preaviso sólo está en el texto anterior",
    PLAZO_FIJO_TEXTOS.art95Anterior.includes(PLAZO_FIJO_TEXTOS.parrafoDeAbsorcion) &&
      !PLAZO_FIJO_TEXTOS.art95Vigente.includes(PLAZO_FIJO_TEXTOS.parrafoDeAbsorcion),
  );
  check(
    "los dos textos conservan el segundo párrafo, que remite al art. 250 (la reforma no lo tocó)",
    PLAZO_FIJO_TEXTOS.art95Vigente.includes("artículo 250") &&
      PLAZO_FIJO_TEXTOS.art95Anterior.includes("artículo 250"),
  );
  check(
    "el art. 93 fija el tope de 5 años del contrato a plazo fijo",
    PLAZO_FIJO_TEXTOS.art93.includes("cinco (5) años") && ANIOS_MAXIMO_PLAZO === 5,
  );
  check(
    "el art. 250 exige que el contrato no haya durado menos de un año",
    PLAZO_FIJO_TEXTOS.art250.includes("no haya sido inferior a un (1) año") &&
      ANIOS_MINIMO_ART250 === 1,
  );
  check(
    "el art. 92 bis reserva el período de prueba al contrato por tiempo indeterminado",
    PLAZO_FIJO_TEXTOS.art92bisPrimeraOracion.includes("por tiempo indeterminado"),
  );
  check(
    "el art. 97 remite al primer párrafo del art. 95 (los de temporada viajan con la reforma)",
    PLAZO_FIJO_TEXTOS.art97.includes("artículo 95, primer párrafo"),
  );
  check(
    "el art. 94 convierte el contrato en indeterminado si se omite el preaviso de la expiración",
    PLAZO_FIJO_TEXTOS.art94.includes("conversión del mismo como de plazo indeterminado"),
  );
}

// ── 3. El caso testigo: contrato de 2 años roto a los 3 meses ──────────────────────────────────
const CASO = {
  inicioISO: "2026-03-02",
  finPactadoISO: "2028-03-01",
  despidoISO: "2026-06-15",
  mejorRemuneracion: BASE,
};
{
  const r = calcularDespidoPlazoFijo(CASO);
  if (!r) {
    fallas++;
    console.error("FAIL el caso testigo no devolvió resultado");
  } else {
    check(
      "la antigüedad real es la trabajada (3 meses y 13 días)",
      r.antiguedadReal.anios === 0 && r.antiguedadReal.meses === 3 && r.antiguedadReal.dias === 13,
      r.antiguedadReal,
    );
    check(
      "la antigüedad ficta llega hasta el fin del plazo pactado (1 año y 11 meses)",
      r.antiguedadFicta.anios === 1 && r.antiguedadFicta.meses === 11,
      r.antiguedadFicta,
    );
    check(
      "el art. 245 computa 2 años con la ficta y 1 con la real",
      r.art245Hoy.aniosComputables === 2 && r.art245Antes.aniosComputables === 1,
      { hoy: r.art245Hoy.aniosComputables, antes: r.art245Antes.aniosComputables },
    );
    check(
      "la ficta suma exactamente un sueldo más de art. 245",
      casi(r.loQueSumaLaFicta, BASE),
      r.loQueSumaLaFicta,
    );
    check("el art. 245 de hoy son 2 sueldos", casi(r.art245Hoy.monto, 2 * BASE), r.art245Hoy.monto);
    check(
      "faltaban 625 días para el vencimiento",
      r.diasQueFaltaban === 625,
      r.diasQueFaltaban,
    );
    check(
      "la ventana que se cerró es días faltantes × sueldo/30, y NO se suma al total",
      casi(r.ventanaQueSeCerro, (BASE / 30) * r.diasQueFaltaban) &&
        r.totalGeneral < r.ventanaQueSeCerro + r.totalIndemnizatorio,
      { ventana: r.ventanaQueSeCerro, total: r.totalGeneral },
    );
    check(
      "el preaviso es de 1 mes (la ficta no supera los 5 años del art. 93)",
      r.preaviso.meses === 1 && casi(r.preaviso.monto, BASE),
      r.preaviso,
    );
    check(
      "hay integración del mes de despido: 15 días de junio",
      r.integracion !== null && r.integracion.dias === 15,
      r.integracion,
    );
    check(
      "el total indemnizatorio es art. 245 ficta + preaviso con SAC + integración con SAC",
      casi(
        r.totalIndemnizatorio,
        r.art245Hoy.monto +
          r.preaviso.monto +
          r.preaviso.sac +
          (r.integracion ? r.integracion.monto + r.integracion.sac : 0),
      ),
      r.totalIndemnizatorio,
    );
    check(
      "el total general suma la liquidación final",
      casi(r.totalGeneral, r.totalIndemnizatorio + r.liquidacionFinal.total),
      r.totalGeneral,
    );
    check(
      "el vencimiento normal con preaviso habría pagado la mitad del art. 245 (art. 250 → 247)",
      r.siHubieraVencido.aplicaArt250 && casi(r.siHubieraVencido.monto, r.art245Hoy.monto / 2),
      r.siHubieraVencido,
    );
  }
}

// ── 4. El art. 245 no se reimplementa: sale del mismo motor que /indemnizacion ─────────────────
{
  const r = calcularDespidoPlazoFijo(CASO)!;
  const comoSiHubieraLlegadoAlFin = calcularIndemnizacion({
    ingresoISO: CASO.inicioISO,
    despidoISO: CASO.finPactadoISO,
    mejorRemuneracion: BASE,
    preavisoOtorgado: true,
    sinPeriodoPrueba: true,
  })!;
  check(
    "el tramo de antigüedad coincide con el que publica /indemnizacion para la misma antigüedad",
    casi(r.art245Hoy.monto, comoSiHubieraLlegadoAlFin.indemnizacionAntiguedad),
    { plazoFijo: r.art245Hoy.monto, indemnizacion: comoSiHubieraLlegadoAlFin.indemnizacionAntiguedad },
  );

  const conTope = calcularDespidoPlazoFijo({ ...CASO, topeCCT: 500_000 })!;
  check(
    "con tope de convenio, la base nunca baja del 67% de la remuneración real",
    conTope.art245Hoy.topeAplicado && casi(conTope.art245Hoy.baseAplicada, BASE * 0.67),
    conTope.art245Hoy,
  );
}

// ── 5. En el plazo fijo no hay período de prueba (art. 92 bis) ─────────────────────────────────
{
  const rotoEnElMes2 = calcularDespidoPlazoFijo({
    inicioISO: "2026-04-01",
    finPactadoISO: "2027-03-31",
    despidoISO: "2026-05-20",
    mejorRemuneracion: BASE,
  })!;
  check(
    "un plazo fijo roto en el mes 2 SÍ indemniza",
    rotoEnElMes2.art245Hoy.monto > 0 && rotoEnElMes2.totalIndemnizatorio > BASE,
    rotoEnElMes2.totalIndemnizatorio,
  );

  const mismoCasoComoIndeterminado = calcularIndemnizacion({
    ingresoISO: "2026-04-01",
    despidoISO: "2026-05-20",
    mejorRemuneracion: BASE,
    preavisoOtorgado: false,
  })!;
  check(
    "el MISMO caso, como contrato por tiempo indeterminado, no indemniza (período de prueba)",
    mismoCasoComoIndeterminado.enPeriodoPrueba &&
      mismoCasoComoIndeterminado.indemnizacionAntiguedad === 0,
    mismoCasoComoIndeterminado.indemnizacionAntiguedad,
  );
  check(
    "el flag sinPeriodoPrueba es lo único que los diferencia (no se rompió /indemnizacion)",
    calcularIndemnizacion({
      ingresoISO: "2026-04-01",
      despidoISO: "2026-05-20",
      mejorRemuneracion: BASE,
      preavisoOtorgado: false,
      sinPeriodoPrueba: true,
    })!.indemnizacionAntiguedad === BASE,
  );
}

// ── 6. Invariantes: monotonía, techo del art. 93 y el umbral del art. 250 ──────────────────────
{
  const casos = [
    { inicioISO: "2026-03-10", finPactadoISO: "2026-09-09", despidoISO: "2026-04-10" },
    { inicioISO: "2026-03-10", finPactadoISO: "2027-03-09", despidoISO: "2026-08-01" },
    { inicioISO: "2026-01-05", finPactadoISO: "2031-01-04", despidoISO: "2026-02-20" },
    { inicioISO: "2026-01-05", finPactadoISO: "2028-06-30", despidoISO: "2028-06-29" },
  ];
  for (const c of casos) {
    const r = calcularDespidoPlazoFijo({ ...c, mejorRemuneracion: BASE })!;
    check(
      `la ficta nunca paga menos que la real (${c.inicioISO} → ${c.finPactadoISO})`,
      r.art245Hoy.monto >= r.art245Antes.monto,
      { hoy: r.art245Hoy.monto, antes: r.art245Antes.monto },
    );
    check(
      `el art. 245 no supera los ${ANIOS_MAXIMO_PLAZO} sueldos del tope del art. 93 (${c.finPactadoISO})`,
      r.art245Hoy.aniosComputables <= ANIOS_MAXIMO_PLAZO,
      r.art245Hoy.aniosComputables,
    );
    check(
      `la liquidación final va sobre las fechas reales (${c.despidoISO})`,
      r.liquidacionFinal.sac.monto > 0 && r.liquidacionFinal.sac.monto <= BASE / 2,
      r.liquidacionFinal.sac,
    );
  }

  const cortito = calcularDespidoPlazoFijo({
    inicioISO: "2026-03-10",
    finPactadoISO: "2026-09-09",
    despidoISO: "2026-04-10",
    mejorRemuneracion: BASE,
  })!;
  check(
    "un contrato de menos de un año no genera indemnización si vence con preaviso (art. 250)",
    !cortito.siHubieraVencido.aplicaArt250 && cortito.siHubieraVencido.monto === 0,
    cortito.siHubieraVencido,
  );
  check(
    "y sin embargo, roto antes de tiempo, sí indemniza",
    cortito.totalIndemnizatorio > 0,
    cortito.totalIndemnizatorio,
  );

  const largo = calcularDespidoPlazoFijo({
    inicioISO: "2026-01-05",
    finPactadoISO: "2031-01-04",
    despidoISO: "2026-02-20",
    mejorRemuneracion: BASE,
  })!;
  check(
    "un plazo de 5 años computa 5 años de art. 245 con la ficta",
    largo.art245Hoy.aniosComputables === ANIOS_MAXIMO_PLAZO,
    largo.art245Hoy.aniosComputables,
  );
}

// ── 7. Entradas inválidas ──────────────────────────────────────────────────────────────────────
{
  check(
    "sin sueldo no devuelve resultado",
    calcularDespidoPlazoFijo({ ...CASO, mejorRemuneracion: 0 }) === null,
  );
  check(
    "un despido anterior al inicio no devuelve resultado",
    calcularDespidoPlazoFijo({ ...CASO, despidoISO: "2026-01-01" }) === null,
  );
  const vencido = calcularDespidoPlazoFijo({ ...CASO, despidoISO: "2028-06-01" })!;
  check(
    "un despido posterior al vencimiento avisa que el primer párrafo no aplica",
    vencido.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("no es anterior")),
    vencido.avisos.map((a) => a.tono),
  );
  const excedido = calcularDespidoPlazoFijo({
    inicioISO: "2026-01-05",
    finPactadoISO: "2033-01-04",
    despidoISO: "2026-02-20",
    mejorRemuneracion: BASE,
  })!;
  check(
    "un plazo mayor a 5 años dispara el aviso del art. 93",
    excedido.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("artículo 93")),
    excedido.avisos.map((a) => a.texto.slice(0, 40)),
  );
}

// ── 8. Fuentes: oficiales, y la captura de la que sale el texto viejo ──────────────────────────
{
  check(
    "está citado el texto actualizado de la LCT en InfoLEG (id 25552)",
    PLAZO_FIJO_FUENTES.lista.some((f) => f.url.includes("25552/texact.htm")),
    PLAZO_FIJO_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citada la captura de la que sale el texto anterior del art. 95",
    PLAZO_FIJO_FUENTES.lista.some(
      (f) => f.url.includes("web.archive.org") && f.url.includes("25552/texact.htm"),
    ),
    PLAZO_FIJO_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    PLAZO_FIJO_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "ninguna fuente es un blog o una nota de prensa",
    PLAZO_FIJO_FUENTES.lista.every(
      (f) =>
        f.url.includes("infoleg.gob.ar") ||
        f.url.includes("boletinoficial.gob.ar") ||
        f.url.includes("web.archive.org"),
    ),
    PLAZO_FIJO_FUENTES.lista.map((f) => f.url),
  );
  check(
    "la fecha de consulta está declarada",
    /^\d{4}-\d{2}-\d{2}$/.test(PLAZO_FIJO_FUENTES.consultadoEl),
    PLAZO_FIJO_FUENTES.consultadoEl,
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de despido antes del vencimiento del plazo OK (LCT art. 95 sustituido por el art. 28 de la Ley 27.802 · antigüedad ficta, sin daños y perjuicios)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
