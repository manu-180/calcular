// Verificación de la lógica del monotributo (categoría, cuota y recategorización).
// Correr con: npx tsx scripts/check_monotributo.ts
//
// Chequea: (1) la INTEGRIDAD INTERNA de la tabla oficial de ARCA (cada total = impuesto
// integrado + SIPA + obra social, y los topes de facturación son estrictamente crecientes
// — valida que la escala fue transcripta sin errores), (2) categoriaParaFacturacion en sus
// bordes (0, tope exacto de cada categoría, por encima del tope máximo), (3) cuotaMensual
// (servicios vs venta, y el descuento de SIPA+OS para quien ya aporta en relación de
// dependencia), (4) calcular (excedido, margen, porcentaje sobre facturación) y
// (5) compararRecategorizacion (sube / baja / igual y el signo de la diferencia).

import { CATEGORIAS, TOPE_MAXIMO, ventanaRecategorizacion } from "../src/data/monotributo";
import {
  categoriaParaFacturacion,
  cuotaMensual,
  calcular,
  compararRecategorizacion,
} from "../src/lib/monotributo";

let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

function aprox(a: number, b: number, tol = 0.005) {
  return Math.abs(a - b) < tol;
}

// ===========================================================================
// INTEGRIDAD DE LA TABLA OFICIAL (transcripción ARCA)
// ===========================================================================

for (const c of CATEGORIAS) {
  // Cada total publicado debe ser exactamente la suma de sus componentes.
  check(
    `cat ${c.cat}: totalServicios = impuesto + SIPA + OS`,
    aprox(c.totalServicios, c.impuestoServicios + c.sipa + c.obraSocial),
    { totalServicios: c.totalServicios, suma: c.impuestoServicios + c.sipa + c.obraSocial },
  );
  check(
    `cat ${c.cat}: totalVenta = impuesto + SIPA + OS`,
    aprox(c.totalVenta, c.impuestoVenta + c.sipa + c.obraSocial),
    { totalVenta: c.totalVenta, suma: c.impuestoVenta + c.sipa + c.obraSocial },
  );
}

// Los topes de facturación deben ser estrictamente crecientes (de A a K) para que
// `find` (primera categoría cuyo tope alcanza) devuelva la correcta.
for (let i = 1; i < CATEGORIAS.length; i++) {
  check(
    `topes crecientes: ${CATEGORIAS[i - 1].cat} < ${CATEGORIAS[i].cat}`,
    CATEGORIAS[i].ingresosBrutosMax > CATEGORIAS[i - 1].ingresosBrutosMax,
  );
}

check("TOPE_MAXIMO = tope de la última categoría", TOPE_MAXIMO === CATEGORIAS[CATEGORIAS.length - 1].ingresosBrutosMax);

// ===========================================================================
// categoriaParaFacturacion — bordes
// ===========================================================================

check("facturación 0 → categoría A", categoriaParaFacturacion(0)?.cat === "A");
check(
  "facturación = tope exacto de A → categoría A",
  categoriaParaFacturacion(CATEGORIAS[0].ingresosBrutosMax)?.cat === "A",
);
check(
  "facturación = tope de A + 1 centavo → categoría B",
  categoriaParaFacturacion(CATEGORIAS[0].ingresosBrutosMax + 0.01)?.cat === "B",
);
check(
  "facturación = TOPE_MAXIMO exacto → categoría K",
  categoriaParaFacturacion(TOPE_MAXIMO)?.cat === "K",
);
check(
  "facturación > TOPE_MAXIMO → null (excede monotributo)",
  categoriaParaFacturacion(TOPE_MAXIMO + 1) === null,
);

// ===========================================================================
// cuotaMensual — servicios vs venta y relación de dependencia
// ===========================================================================

{
  const catC = CATEGORIAS.find((c) => c.cat === "C")!;
  const servicios = cuotaMensual(catC, "servicios", false);
  const venta = cuotaMensual(catC, "venta", false);
  check("cuota C servicios usa impuestoServicios", servicios.impuestoIntegrado === catC.impuestoServicios);
  check("cuota C venta usa impuestoVenta", venta.impuestoIntegrado === catC.impuestoVenta);
  check("cuota C servicios: total = suma de componentes", aprox(servicios.total, servicios.impuestoIntegrado + servicios.sipa + servicios.obraSocial));
  check("cuota C servicios coincide con totalServicios de la tabla", aprox(servicios.total, catC.totalServicios));
  check("cuota C venta coincide con totalVenta de la tabla", aprox(venta.total, catC.totalVenta));
}

{
  // Quien trabaja en relación de dependencia ya aporta jubilación y OS por su empleo:
  // solo paga el impuesto integrado (SIPA y OS quedan en 0).
  const catH = CATEGORIAS.find((c) => c.cat === "H")!;
  const conEmpleo = cuotaMensual(catH, "servicios", true);
  check("cuota H con relación de dependencia: SIPA = 0", conEmpleo.sipa === 0);
  check("cuota H con relación de dependencia: OS = 0", conEmpleo.obraSocial === 0);
  check(
    "cuota H con relación de dependencia: total = solo impuesto integrado",
    aprox(conEmpleo.total, catH.impuestoServicios),
  );
}

// ===========================================================================
// calcular — excedido, margen y porcentaje
// ===========================================================================

{
  const r = calcular(TOPE_MAXIMO + 1, "servicios", false);
  check("calcular por encima del tope → excedido", r.tipo === "excedido" && r.tope === TOPE_MAXIMO);
}

{
  const facturacion = 5_000_000; // cae en categoría A
  const r = calcular(facturacion, "servicios", false);
  check("calcular $5M → tipo ok", r.tipo === "ok");
  if (r.tipo === "ok") {
    check("calcular $5M → categoría A", r.categoria.cat === "A");
    check(
      "calcular: margenHastaTope = tope − facturación",
      aprox(r.margenHastaTope, r.categoria.ingresosBrutosMax - facturacion),
    );
    check(
      "calcular: porcentaje = cuota / (facturación/12) × 100",
      aprox(r.porcentajeSobreFacturacion!, (r.cuota.total / (facturacion / 12)) * 100, 0.01),
    );
  }
}

{
  // Facturación 0 → porcentaje sobre facturación es null (no dividir por cero).
  const r = calcular(0, "servicios", false);
  check("calcular $0 → porcentaje null", r.tipo === "ok" && r.porcentajeSobreFacturacion === null);
}

// ===========================================================================
// compararRecategorizacion — sube / baja / igual
// ===========================================================================

check("recategorización con categoría inexistente → null", compararRecategorizacion("Z", 5_000_000, "servicios", false) === null);

{
  // Estoy en A pero facturé como para una categoría más alta → sube, diferencia positiva.
  const r = compararRecategorizacion("A", CATEGORIAS[4].ingresosBrutosMax, "servicios", false);
  check("recat A→arriba: tipo ok", r?.tipo === "ok");
  if (r?.tipo === "ok") {
    check("recat A→arriba: movimiento sube", r.movimiento === "sube");
    check("recat A→arriba: diferencia mensual positiva (cuota más cara)", r.diferenciaMensual > 0);
  }
}

{
  // Estoy en E pero facturé poco → baja, diferencia negativa.
  const r = compararRecategorizacion("E", 1_000_000, "servicios", false);
  check("recat E→abajo: movimiento baja", r?.tipo === "ok" && r.movimiento === "baja");
  check("recat E→abajo: diferencia mensual negativa", r?.tipo === "ok" && r.diferenciaMensual < 0);
}

{
  // Misma categoría → igual, diferencia 0.
  const facturacion = 5_000_000; // categoría A
  const r = compararRecategorizacion("A", facturacion, "servicios", false);
  check("recat A→A: movimiento igual", r?.tipo === "ok" && r.movimiento === "igual");
  check("recat A→A: diferencia mensual 0", r?.tipo === "ok" && aprox(r.diferenciaMensual, 0));
}

{
  // Recategorización que excede el tope máximo.
  const r = compararRecategorizacion("A", TOPE_MAXIMO + 1, "servicios", false);
  check("recat hacia excedido → tipo excedido", r?.tipo === "excedido");
}

// ===========================================================================
// (6) VENTANA DE RECATEGORIZACIÓN DERIVADA
// Regla oficial de ARCA (recategorizacion.asp): dos veces por año, febrero y agosto, el
// trámite hasta el día 5 inclusive; la de agosto rige devengado agosto→enero y la de
// febrero, febrero→julio. Como el texto ya no se escribe a mano, lo que hay que anclar es
// la DERIVACIÓN: estas fechas fijas son la prueba de que el 6 de agosto la página cambia sola.

function enAR(iso: string): Date {
  // Mediodía de Argentina, para que el desplazamiento a UTC no corra el día.
  return new Date(`${iso}T15:00:00Z`);
}

{
  const casos: Array<{
    hoy: string;
    cierre: string;
    abierta: boolean;
    dias: number;
    rigeDesde: string;
  }> = [
    // Dentro de la ventana de agosto: hasta el 5 inclusive.
    { hoy: "2026-08-01", cierre: "2026-08-05", abierta: true, dias: 4, rigeDesde: "agosto de 2026" },
    { hoy: "2026-08-05", cierre: "2026-08-05", abierta: true, dias: 0, rigeDesde: "agosto de 2026" },
    // El día 6 pasa sola a la ventana de febrero del año siguiente.
    { hoy: "2026-08-06", cierre: "2027-02-05", abierta: false, dias: 183, rigeDesde: "febrero de 2027" },
    { hoy: "2026-12-31", cierre: "2027-02-05", abierta: false, dias: 36, rigeDesde: "febrero de 2027" },
    // Enero apunta a la ventana de febrero del MISMO año (no a la del siguiente).
    { hoy: "2027-01-10", cierre: "2027-02-05", abierta: false, dias: 26, rigeDesde: "febrero de 2027" },
    { hoy: "2027-02-05", cierre: "2027-02-05", abierta: true, dias: 0, rigeDesde: "febrero de 2027" },
    // Y el 6 de febrero apunta a agosto del mismo año.
    { hoy: "2027-02-06", cierre: "2027-08-05", abierta: false, dias: 180, rigeDesde: "agosto de 2027" },
  ];

  for (const c of casos) {
    const v = ventanaRecategorizacion(enAR(c.hoy));
    check(`ventana ${c.hoy} → cierre ${c.cierre}`, v.cierreISO === c.cierre, v.cierreISO);
    check(`ventana ${c.hoy} → abierta=${c.abierta}`, v.abierta === c.abierta, v.abierta);
    check(`ventana ${c.hoy} → faltan ${c.dias} días`, v.diasParaElCierre === c.dias, v.diasParaElCierre);
    check(`ventana ${c.hoy} → rige desde ${c.rigeDesde}`, v.rigeDesde === c.rigeDesde, v.rigeDesde);
  }

  const ago = ventanaRecategorizacion(enAR("2026-08-05"));
  check("ventana agosto: texto de cierre", ago.textoCierre === "hasta el 5 de agosto de 2026", ago.textoCierre);
  check("ventana agosto: rige hasta enero del año siguiente", ago.rigeHasta === "enero de 2027", ago.rigeHasta);
  check("ventana agosto: 12 meses evaluados", ago.dozeMeses === "agosto de 2025 y julio de 2026", ago.dozeMeses);

  const feb = ventanaRecategorizacion(enAR("2027-02-01"));
  check("ventana febrero: texto de cierre", feb.textoCierre === "hasta el 5 de febrero de 2027", feb.textoCierre);
  check("ventana febrero: rige hasta julio del mismo año", feb.rigeHasta === "julio de 2027", feb.rigeHasta);
  check("ventana febrero: 12 meses evaluados", feb.dozeMeses === "febrero de 2026 y enero de 2027", feb.dozeMeses);

  // Anti-drift: la ventana derivada de HOY nunca puede estar vencida.
  const hoyV = ventanaRecategorizacion();
  check("ventana de hoy no está vencida", new Date(`${hoyV.cierreISO}T23:59:00-03:00`).getTime() >= Date.now(), hoyV);
  check("ventana de hoy: mes válido (2 u 8)", hoyV.mes === 2 || hoyV.mes === 8, hoyV.mes);
}

// ===========================================================================

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de monotributo OK");
}
