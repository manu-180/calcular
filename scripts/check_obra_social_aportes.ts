// Verificación del reparto de aportes a la obra social y de la derivación a una prepaga.
// Correr con: npx tsx scripts/check_obra_social_aportes.ts
//
// LOS CINCO CHECKS QUE IMPORTAN:
//
//   1. **El reparto suma el total, siempre.** El 85% y el 15% del art. 19 se aplican sobre la MISMA
//      base (la suma de la contribución y los aportes del art. 16). Si alguien calcula el Fondo
//      sobre otra base, la página empieza a inventar plata que no existe.
//   2. **El tope de la base imponible es asimétrico y así tiene que quedar.** El aporte del
//      trabajador se calcula sobre la base máxima; la contribución del empleador, sobre el bruto
//      entero (Decreto 491/2004). Emparejar las dos bases es el error silencioso: no rompe nada,
//      sólo devuelve un número que no se liquida.
//   3. **El 1,5% es POR CADA familiar autorizado, y sobre la misma base topeada.** Un off-by-one
//      acá se traduce en pesos todos los meses.
//   4. **La comparación con el régimen anterior no puede mentir para el caso común.** Para una obra
//      social sindical con un sueldo real, la escala vieja daba el mismo 85%: el check exige que
//      la página NO anuncie un cambio donde no lo hubo. Es la decisión de honestidad de esta
//      página, no un detalle cosmético.
//   5. **El excedente no se devuelve.** Si la cuota del plan es menor que lo que llega por aportes,
//      la diferencia de bolsillo es cero y el excedente queda en la entidad: nunca un número
//      negativo presentado como ahorro.

import {
  APORTE_ADICIONAL_FAMILIAR,
  APORTE_TRABAJADOR,
  ART_19_BIS,
  CONTRIBUCION_EMPLEADOR,
  obraSocialFuentes,
  OBRA_SOCIAL_TEXTOS,
  REPARTO_ANTERIOR,
  REPARTO_VIGENTE,
  TIPOS_ENTIDAD,
} from "../src/data/obra-social-aportes";
import { topeSipa } from "../src/data/sueldo";
import { calcularObraSocial, type EntradaObraSocial } from "../src/lib/obra-social-aportes";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const cerca = (a: number, b: number, tol = 0.01) => Math.abs(a - b) < tol;

const base: EntradaObraSocial = {
  brutoMensual: 1_800_000,
  familiaresACargo: 0,
  tipoEntidad: "obra-social",
  cuotaPlan: 0,
};

// ===========================================================================
// 1 · Los porcentajes son los del texto vigente
// ===========================================================================

check("aporte del trabajador = 3% (Ley 23.660, art. 16 inc. b)", APORTE_TRABAJADOR === 0.03);
check("contribución del empleador = 6% (Ley 25.565, art. 80)", CONTRIBUCION_EMPLEADOR === 0.06);
check("adicional por familiar autorizado = 1,5%", APORTE_ADICIONAL_FAMILIAR === 0.015);
check(
  "reparto vigente = 85 / 15 y suma 1 (Decreto 600/2024, art. 1°)",
  REPARTO_VIGENTE.entidad === 0.85 &&
    REPARTO_VIGENTE.fondo === 0.15 &&
    cerca(REPARTO_VIGENTE.entidad + REPARTO_VIGENTE.fondo, 1),
);
check(
  "el umbral de la escala anterior es el literal de la norma: mil pesos",
  REPARTO_ANTERIOR.umbralRemuneracion === 1000,
);
check("el art. 19 bis derogado tenía coeficiente 20%", ART_19_BIS.coeficiente === 0.2);

// ===========================================================================
// 2 · La cuenta de un sueldo normal, número por número
// ===========================================================================

const r = calcularObraSocial(base);

check(
  "aporte del trabajador sobre $1.800.000 = $54.000",
  cerca(r.aporteTrabajador, 54_000),
  r.aporteTrabajador,
);
check(
  "contribución del empleador sobre $1.800.000 = $108.000",
  cerca(r.contribucionEmpleador, 108_000),
  r.contribucionEmpleador,
);
check("sin familiares autorizados, el adicional es cero", r.aporteAdicional === 0);
check("total recaudado = 9% del bruto = $162.000", cerca(r.totalRecaudado, 162_000), r.totalRecaudado);
check("a la entidad = 85% del total = $137.700", cerca(r.aLaEntidad, 137_700), r.aLaEntidad);
check("al Fondo Solidario = 15% del total = $24.300", cerca(r.alFondo, 24_300), r.alFondo);
check(
  "entidad + fondo reconstruyen el total (no se pierde ni se inventa un peso)",
  cerca(r.aLaEntidad + r.alFondo, r.totalRecaudado),
);

// ===========================================================================
// 3 · El tope de la base imponible es asimétrico (Decreto 491/2004)
// ===========================================================================

const alto = calcularObraSocial({ ...base, brutoMensual: topeSipa().baseMaxima * 2 });

check("por encima de la base máxima el resultado avisa que se aplicó el tope", alto.topeAplicado);
check(
  "el aporte del trabajador se topea en la base máxima",
  cerca(alto.aporteTrabajador, topeSipa().baseMaxima * APORTE_TRABAJADOR),
  alto.aporteTrabajador,
);
check(
  "la contribución del empleador NO se topea: va sobre el bruto entero",
  cerca(alto.contribucionEmpleador, topeSipa().baseMaxima * 2 * CONTRIBUCION_EMPLEADOR),
  alto.contribucionEmpleador,
);
check(
  "por eso, con el tope aplicado, la contribución patronal es más del doble del aporte personal",
  alto.contribucionEmpleador > alto.aporteTrabajador * 2,
);
check(
  "por debajo de la base máxima no se anuncia ningún tope",
  !calcularObraSocial({ ...base, brutoMensual: topeSipa().baseMaxima - 1 }).topeAplicado,
);

// ===========================================================================
// 4 · El adicional del 1,5% es por cada familiar autorizado
// ===========================================================================

const conDos = calcularObraSocial({ ...base, familiaresACargo: 2 });
check(
  "dos familiares autorizados = 3% adicional sobre la base = $54.000",
  cerca(conDos.aporteAdicional, 1_800_000 * 0.03),
  conDos.aporteAdicional,
);
check(
  "el adicional entra al total y por lo tanto agranda lo que llega a la entidad",
  conDos.aLaEntidad > r.aLaEntidad,
);
check(
  "el adicional también se calcula sobre la base topeada, no sobre el bruto",
  cerca(
    calcularObraSocial({ ...base, brutoMensual: topeSipa().baseMaxima * 2, familiaresACargo: 1 })
      .aporteAdicional,
    topeSipa().baseMaxima * APORTE_ADICIONAL_FAMILIAR,
  ),
);
check("familiares negativos no restan", calcularObraSocial({ ...base, familiaresACargo: -3 }).aporteAdicional === 0);

// ===========================================================================
// 5 · La comparación con el régimen anterior dice la verdad
// ===========================================================================

check(
  "obra social sindical con sueldo real: la escala anterior daba el MISMO 85% — no hubo cambio",
  r.porcentajeEntidadAnterior === 0.85 && !r.reparoCambio && cerca(r.aLaEntidadAnterior, r.aLaEntidad),
  { anterior: r.porcentajeEntidadAnterior, cambio: r.reparoCambio },
);

const direccion = calcularObraSocial({ ...base, tipoEntidad: "direccion-o-prepaga" });
check(
  "personal de dirección / prepaga del inciso i): antes 80%, hoy 85% — ahí sí hubo cambio",
  direccion.porcentajeEntidadAnterior === 0.8 && direccion.reparoCambio,
  direccion.porcentajeEntidadAnterior,
);
check(
  "esos cinco puntos son $8.100 por mes sobre un bruto de $1.800.000",
  cerca(direccion.aLaEntidad - direccion.aLaEntidadAnterior, 162_000 * 0.05),
  direccion.aLaEntidad - direccion.aLaEntidadAnterior,
);
check(
  "el reparto vigente no depende del tipo de entidad (es plano)",
  cerca(direccion.aLaEntidad, r.aLaEntidad) && cerca(direccion.alFondo, r.alFondo),
);
check(
  "el tramo de hasta mil pesos de la escala vieja sigue siendo computable (es historia, no un bug)",
  calcularObraSocial({ ...base, brutoMensual: 900 }).porcentajeEntidadAnterior === 0.9,
);

// ===========================================================================
// 6 · La diferencia de bolsillo y el excedente que no vuelve
// ===========================================================================

const conPlan = calcularObraSocial({ ...base, cuotaPlan: 200_000 });
check(
  "cuota $200.000 − $137.700 que llega = $62.300 de bolsillo",
  cerca(conPlan.diferenciaBolsillo ?? -1, 62_300),
  conPlan.diferenciaBolsillo,
);
check("con diferencia positiva, el plan no está cubierto", !conPlan.cubrePlan);

const planBarato = calcularObraSocial({ ...base, cuotaPlan: 100_000 });
check("cuota menor que el aporte: la diferencia de bolsillo es CERO, nunca negativa", planBarato.diferenciaBolsillo === 0);
check("y el excedente se informa aparte: $37.700 que quedan en la entidad", cerca(planBarato.excedente ?? -1, 37_700), planBarato.excedente);
check("con cuota cubierta, cubrePlan es true", planBarato.cubrePlan);
check("sin cuota cargada no se muestra ninguna diferencia", r.diferenciaBolsillo === null && r.excedente === null);

// ===========================================================================
// 7 · Bordes
// ===========================================================================

const cero = calcularObraSocial({ ...base, brutoMensual: 0 });
check("bruto cero devuelve todo en cero, sin NaN", cero.totalRecaudado === 0 && cero.aLaEntidad === 0);
check(
  "bruto negativo se trata como cero",
  calcularObraSocial({ ...base, brutoMensual: -500_000 }).totalRecaudado === 0,
);
check(
  "ningún resultado devuelve NaN",
  Object.values(calcularObraSocial({ ...base, cuotaPlan: 300_000, familiaresACargo: 3 })).every(
    (v) => typeof v !== "number" || Number.isFinite(v),
  ),
);

// ===========================================================================
// 8 · Las citas textuales siguen siendo citas
// ===========================================================================

check(
  "el art. 19 vigente cita el 85% y el 15% con las palabras de la norma",
  OBRA_SOCIAL_TEXTOS.art19Vigente.includes("OCHENTA Y CINCO POR CIENTO (85 %)") &&
    OBRA_SOCIAL_TEXTOS.art19Vigente.includes("QUINCE POR CIENTO (15 %)") &&
    OBRA_SOCIAL_TEXTOS.art19Vigente.includes("entidad seleccionada por el beneficiario"),
);
check(
  "el art. 19 bis derogado conserva su VEINTE (20 %)",
  OBRA_SOCIAL_TEXTOS.art19bisDerogado.includes("VEINTE (20 %)"),
);
check(
  "la cita del Anexo II dice que las protecciones NO son aplicables a las entidades del inciso i)",
  OBRA_SOCIAL_TEXTOS.proteccionesQueNoAplican.includes("no son aplicables") &&
    OBRA_SOCIAL_TEXTOS.proteccionesQueNoAplican.includes("inciso i)"),
);
check(
  "la cita del cambio sin espera está completa",
  OBRA_SOCIAL_TEXTOS.sinLimitacionTemporal.includes("sin limitación temporal"),
);
check(
  "la cita del adicional del 1,5% aclara que es por ascendientes o descendientes, no por el grupo primario",
  OBRA_SOCIAL_TEXTOS.adicional15.includes("ascendientes o descendientes por consanguinidad") &&
    OBRA_SOCIAL_TEXTOS.adicional15.includes("uno y medio por ciento (1,5%)"),
);
check(
  "la cita de 2027 mantiene la fecha y la facultad de auditoría",
  OBRA_SOCIAL_TEXTOS.contribucion2027.includes("1º de enero de 2027") &&
    OBRA_SOCIAL_TEXTOS.contribucion2027.includes("auditar el destino"),
);

// ===========================================================================
// 9 · Fuentes
// ===========================================================================

check("hay al menos cinco fuentes oficiales listadas", obraSocialFuentes().lista.length >= 5);
check(
  "todas las fuentes apuntan a InfoLEG o al Boletín Oficial",
  obraSocialFuentes().lista.every(
    (f) => f.url.includes("infoleg.gob.ar") || f.url.includes("boletinoficial.gob.ar"),
  ),
);
check(
  "el Decreto 600/2024 está entre las fuentes con su id de InfoLEG",
  obraSocialFuentes().lista.some((f) => f.url.includes("401319")),
);
check("hay dos tipos de entidad para comparar", TIPOS_ENTIDAD.length === 2);

if (fallas > 0) {
  console.error(`\n❌ ${fallas} check(s) fallaron`);
  process.exit(1);
}
console.log("\n✅ Todos los checks de aportes a la obra social OK (Ley 23.660 arts. 9, 16 y 19 · Decreto 600/2024 · Ley 26.682)");
