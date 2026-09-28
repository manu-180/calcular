// Verificación de asignaciones familiares (src/data/asignaciones.ts + src/lib/asignaciones.ts).
// Correr con: npx tsx scripts/check_asignaciones.ts
//
// Es plata real de familias y un tema YMYL: un monto o un rango mal tipeado le dice a alguien que
// cobra lo que no cobra. La cartilla de ANSES es un PDF que se transcribe a mano, así que el riesgo
// concreto es el dedo, no la fuente. Por eso el check ancla TODO contra el mes anterior:
//
//   A. Cada monto y cada límite vigente tiene que ser el del mes previo movido por la movilidad
//      del mes (2,11%), redondeado AL ENTERO SIGUIENTE. No es una tolerancia: es la regla
//      textual del art. 3 de la resolución, y se verificó exacta en 11 valores de la rotación
//      julio→agosto y en el tope individual que la propia Res. 260/2026 publica en su art. 4.
//   B. Los conceptos que la resolución NO movió se verifican IGUALES al mes anterior.
//   C. Los tramos tienen que ser contiguos, monótonos decrecientes y cerrar contra el tope grupal.
//   D. El motor tiene que reproducir a mano los casos de borde: los dos topes, el escalón entre
//      tramos y la excepción de hijo con discapacidad (que no tiene tope de ingresos).

import {
  ASIGNACIONES_FUENTES,
  ASIGNACIONES_MES_ANTERIOR,
  ASIGNACIONES_PROXIMAS,
  ASIGNACIONES_VIGENTES,
  GRUPOS_MONOTRIBUTO,
  RESOLUCIONES_ASIGNACIONES_SIGUIENTES,
  PAGO_UNICO,
  ZONAS,
  type MontosPorZona,
  type TramoIgf,
  type Zona,
} from "../src/data/asignaciones";
import {
  calcularAsignaciones,
  calcularEscalon,
  calcularIgf,
  desglose8020,
  montoMonotributoHijo,
  moverAlMesSiguiente,
  tramoDe,
} from "../src/lib/asignaciones";
import { periodoActualAR } from "../src/lib/hoy";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const V = ASIGNACIONES_VIGENTES;
const P = ASIGNACIONES_MES_ANTERIOR;
const COEF = 1 + V.movilidad / 100;
const ZONA_IDS = ZONAS.map((z) => z.id);

/**
 * La regla es la del art. 3 de la resolución mensual: el incremento se aplica sobre los valores
 * PUBLICADOS del mes anterior y, si da decimales, se redondea al valor entero SIGUIENTE. Por eso
 * esto es una igualdad exacta y no una tolerancia: una ventana de razón dejaba pasar un peso de
 * diferencia en los montos chicos (el tramo 4, de ~$16.000, cae justo en ese borde).
 */
function razonOk(nuevo: number, viejo: number): boolean {
  if (viejo === 0) return nuevo === 0;
  return nuevo === Math.ceil(Number((viejo * COEF).toFixed(6)));
}

function checkRazon(nombre: string, nuevo: number, viejo: number) {
  check(
    `${nombre}: ${viejo.toLocaleString("es-AR")} → ${nuevo.toLocaleString("es-AR")} es +${V.movilidad}%`,
    razonOk(nuevo, viejo),
    { nuevo, viejo, razon: viejo === 0 ? null : nuevo / viejo, esperado: COEF },
  );
}

function checkRazonPorZona(nombre: string, nuevo: MontosPorZona, viejo: MontosPorZona) {
  for (const z of ZONA_IDS) checkRazon(`${nombre} · ${z}`, nuevo[z], viejo[z]);
}

// ===========================================================================
// 1 · Los valores vigentes. Anclas transcriptas a mano sólo para la tabla publicada (Res. 260/2026)
// ===========================================================================
{
  check("el mes vigente ya empezó", V.periodo <= periodoActualAR(), { vigente: V.periodo, hoy: periodoActualAR() });
  check("cita una Resolución ANSES", /^Resolución ANSES \d+\/\d{4}$/.test(V.resolucion), V.resolucion);
}
if (V.periodo === "2026-09") {
  check("período vigente = 2026-09", V.periodo === "2026-09", V.periodo);
  check("movilidad de septiembre 2026 = 2,11%", V.movilidad === 2.11, V.movilidad);
  check("tope de IGF del grupo = $6.314.897", V.topeIgfGrupo === 6_314_897, V.topeIgfGrupo);
  // EL ANCLA DEL MES: este es el único valor derivado que la resolución además PUBLICA (art. 4).
  // Que la derivación lo reproduzca al peso es lo que prueba que la regla de rotación está bien
  // leída, sin depender de la cartilla en PDF (que el WAF de ANSES no dejó bajar el 1/9).
  check("tope de IGF individual = $3.157.449 (Res. 260/2026, art. 4)", V.topeIgfIndividual === 3_157_449, V.topeIgfIndividual);
  check("nacimiento = $89.782", V.nacimiento === 89_782, V.nacimiento);
  check("adopción = $536.774", V.adopcion === 536_774, V.adopcion);
  check("matrimonio = $134.430", V.matrimonio === 134_430, V.matrimonio);
  check("AUH (valor general) = $154.031", V.universales.hijo.general === 154_031);
  check("AUH zona 1 = $200.241", V.universales.hijo.zona1 === 200_241);
  check("cita la Resolución ANSES 260/2026", /260\/2026/.test(V.resolucion), V.resolucion);
}
{
  check(
    "el link de la resolución apunta al Boletín Oficial",
    V.resolucionUrl.startsWith("https://www.boletinoficial.gob.ar/"),
  );
  check(
    "la cartilla apunta al sitio de ANSES",
    V.cartillaUrl.startsWith("https://www.anses.gob.ar/"),
  );
  check(
    "todas las fuentes citadas son oficiales (.gob.ar)",
    Object.values(ASIGNACIONES_FUENTES)
      .filter((f) => typeof f === "object")
      .every((f) => /https:\/\/[a-z.]*gob\.ar\//.test((f as { url: string }).url)),
  );
}

// ===========================================================================
// 2 · Ancla anti-tipeo: todo lo vigente sale del mes anterior movido por la movilidad
// ===========================================================================
{
  {
    const [a, m] = V.periodo.split("-").map(Number);
    const previo = m === 1 ? `${a - 1}-12` : `${a}-${String(m - 1).padStart(2, "0")}`;
    check("el snapshot anterior es el mes previo", P.periodo === previo, { anterior: P.periodo, esperado: previo });
  }

  checkRazon("tope de IGF del grupo", V.topeIgfGrupo, P.topeIgfGrupo);
  checkRazon("tope de IGF individual", V.topeIgfIndividual, P.topeIgfIndividual);
  checkRazon("nacimiento", V.nacimiento, P.nacimiento);
  checkRazon("adopción", V.adopcion, P.adopcion);
  checkRazon("matrimonio", V.matrimonio, P.matrimonio);
  checkRazon("cónyuge general", V.conyuge.general, P.conyuge.general);
  checkRazon("cónyuge zona 1", V.conyuge.zona1, P.conyuge.zona1);

  check("la tabla de hijo mantiene 4 tramos", V.hijo.length === P.hijo.length, V.hijo.length);
  V.hijo.forEach((t, i) => {
    const prev = P.hijo[i];
    checkRazonPorZona(`hijo tramo ${i + 1}`, t.montos, prev.montos);
    if (t.hasta !== null && prev.hasta !== null) {
      checkRazon(`hijo tramo ${i + 1} · límite superior`, t.hasta, prev.hasta);
    }
  });

  check(
    "la tabla de discapacidad mantiene 3 tramos",
    V.hijoDiscapacidad.length === P.hijoDiscapacidad.length,
  );
  V.hijoDiscapacidad.forEach((t, i) => {
    const prev = P.hijoDiscapacidad[i];
    checkRazonPorZona(`hijo con discapacidad tramo ${i + 1}`, t.montos, prev.montos);
    if (t.hasta !== null && prev.hasta !== null) {
      checkRazon(`discapacidad tramo ${i + 1} · límite superior`, t.hasta, prev.hasta);
    }
  });

  checkRazon("AUH general", V.universales.hijo.general, P.universales.hijo.general);
  checkRazon("AUH zona 1", V.universales.hijo.zona1, P.universales.hijo.zona1);
  checkRazon("embarazo general", V.universales.embarazo.general, P.universales.embarazo.general);
  checkRazon("embarazo zona 1", V.universales.embarazo.zona1, P.universales.embarazo.zona1);
  checkRazon(
    "AUH discapacidad general",
    V.universales.hijoDiscapacidad.general,
    P.universales.hijoDiscapacidad.general,
  );
  checkRazon(
    "AUH discapacidad zona 1",
    V.universales.hijoDiscapacidad.zona1,
    P.universales.hijoDiscapacidad.zona1,
  );
  checkRazon(
    "apoyo alimentario (Ley 1.000 días)",
    V.universales.apoyoAlimentarioMilDias,
    P.universales.apoyoAlimentarioMilDias,
  );

  // La ayuda escolar NO se movió este mes: se verifica igual, no por coeficiente.
  for (const z of ZONA_IDS) {
    check(
      `ayuda escolar base · ${z} sin cambios respecto de julio`,
      V.ayudaEscolar.base[z] === P.congelados.ayudaEscolarBase[z],
      { vigente: V.ayudaEscolar.base[z], anterior: P.congelados.ayudaEscolarBase[z] },
    );
    check(
      `refuerzo Dec. 115/26 · ${z} sin cambios respecto de julio`,
      V.ayudaEscolar.refuerzo[z] === P.congelados.ayudaEscolarRefuerzo[z],
    );
    check(
      `ayuda escolar total · ${z} = base + refuerzo`,
      V.ayudaEscolar.total[z] === V.ayudaEscolar.base[z] + V.ayudaEscolar.refuerzo[z],
      { total: V.ayudaEscolar.total[z] },
    );
  }
  // El art. 1 de la resolución excluye del incremento al inc. d) del art. 6 de la Ley 24.714 (la
  // ayuda escolar) — montos Y límites. Así que su tope de IGF NO acompaña al grupal: queda
  // congelado en el último valor publicado, igual que sus montos. En agosto ese valor coincidía
  // con el tope grupal del mes previo y el check lo leía así; era una coincidencia de un mes.
  check(
    "el tope de IGF de la ayuda escolar sigue congelado",
    V.topeIgfAyudaEscolar === P.congelados.topeIgfAyudaEscolar,
    { vigente: V.topeIgfAyudaEscolar, congelado: P.congelados.topeIgfAyudaEscolar },
  );
}

// ===========================================================================
// 3 · Coherencia estructural de las tablas
// ===========================================================================
{
  function tablaCoherente(nombre: string, tabla: TramoIgf[]) {
    check(`${nombre}: el primer tramo arranca en 0`, tabla[0].desde === 0, tabla[0].desde);
    for (let i = 1; i < tabla.length; i++) {
      const anterior = tabla[i - 1];
      const actual = tabla[i];
      check(
        `${nombre}: el tramo ${i + 1} arranca justo después del ${i}`,
        anterior.hasta !== null && Math.abs(actual.desde - (anterior.hasta + 0.01)) < 0.005,
        { hastaAnterior: anterior.hasta, desde: actual.desde },
      );
    }
    for (const z of ZONA_IDS) {
      for (let i = 1; i < tabla.length; i++) {
        check(
          `${nombre} · ${z}: a más ingreso, menos asignación (tramo ${i} → ${i + 1})`,
          tabla[i].montos[z] < tabla[i - 1].montos[z],
          { anterior: tabla[i - 1].montos[z], actual: tabla[i].montos[z] },
        );
      }
    }
  }

  tablaCoherente("hijo", V.hijo);
  tablaCoherente("hijo con discapacidad", V.hijoDiscapacidad);

  check(
    "el último tramo de hijo cierra exactamente en el tope grupal",
    V.hijo[V.hijo.length - 1].hasta === V.topeIgfGrupo,
    V.hijo[V.hijo.length - 1].hasta,
  );
  check(
    "el último tramo de discapacidad NO tiene tope (la asignación no lo tiene)",
    V.hijoDiscapacidad[V.hijoDiscapacidad.length - 1].hasta === null,
  );
  check(
    "el tope individual es la mitad del grupal",
    Math.abs(V.topeIgfIndividual * 2 - V.topeIgfGrupo) <= 1,
    { individual: V.topeIgfIndividual, grupal: V.topeIgfGrupo },
  );
  for (const z of ZONA_IDS) {
    for (let i = 0; i < V.hijo.length && i < V.hijoDiscapacidad.length; i++) {
      check(
        `discapacidad paga más que hijo común · ${z} tramo ${i + 1}`,
        V.hijoDiscapacidad[i].montos[z] > V.hijo[i].montos[z],
      );
    }
  }
  check(
    "hay 5 zonas declaradas con nombre y detalle",
    ZONAS.length === 5 && ZONAS.every((z) => z.nombre.length > 3 && z.detalle.length > 10),
  );
}

// ===========================================================================
// 4 · Monotributo: los montos coinciden con los tramos del régimen general
// ===========================================================================
{
  check("hay 5 grupos de categorías", GRUPOS_MONOTRIBUTO.length === 5);
  check(
    "categoría A paga lo mismo que el primer tramo general",
    montoMonotributoHijo("A") === V.hijo[0].montos.general,
    { A: montoMonotributoHijo("A"), tramo1: V.hijo[0].montos.general },
  );
  check(
    "categoría B paga lo mismo que el segundo tramo general",
    montoMonotributoHijo("B") === V.hijo[1].montos.general,
  );
  check(
    "categoría C paga lo mismo que el tercer tramo general",
    montoMonotributoHijo("C") === V.hijo[2].montos.general,
  );
  check(
    "categorías D a H pagan lo mismo que el cuarto tramo general",
    montoMonotributoHijo("D_H") === V.hijo[3].montos.general,
  );
  check(
    "las categorías I, J y K no perciben asignación por hijo",
    montoMonotributoHijo("I_K") === null,
  );
  check(
    "las categorías I, J y K sí perciben hijo con discapacidad",
    V.monotributo.hijoDiscapacidad.I_K === V.hijoDiscapacidad[2].montos.general,
  );
  check(
    "la ayuda escolar del monotributista es la del valor general",
    V.monotributo.ayudaEscolarTotal === V.ayudaEscolar.total.general,
  );
}

// ===========================================================================
// 5 · AUH: el 80/20 cierra
// ===========================================================================
{
  const auh = desglose8020(V.universales.hijo.general);
  check("el 80% mensual de la AUH general es el 80% al centavo", auh.mensual === Math.round(V.universales.hijo.general * 80) / 100, auh);
  check("el 20% retenido de la AUH general es el resto", auh.retenido === Math.round((V.universales.hijo.general - auh.mensual) * 100) / 100, auh);
  check(
    "80% + 20% reconstruyen el valor total",
    auh.mensual + auh.retenido === V.universales.hijo.general,
  );

  const disc = desglose8020(V.universales.hijoDiscapacidad.zona1);
  check("AUH discapacidad zona 1: 80% al centavo", disc.mensual === Math.round(V.universales.hijoDiscapacidad.zona1 * 80) / 100, disc);
  check("AUH discapacidad zona 1: 20% es el resto", disc.retenido === Math.round((V.universales.hijoDiscapacidad.zona1 - disc.mensual) * 100) / 100, disc);

  check(
    "la AUH por embarazo paga lo mismo que la AUH por hijo",
    V.universales.embarazo.general === V.universales.hijo.general,
  );
  check(
    "cuidado de salud paga lo mismo que la AUH por hijo",
    V.universales.cuidadoSaludHijo.general === V.universales.hijo.general,
  );
  check(
    "nacimiento y adopción son iguales en el régimen general y en el universal",
    V.universales.nacimiento === V.nacimiento && V.universales.adopcion === V.adopcion,
  );
}

// ===========================================================================
// 6 · El motor: casos de borde calculados a mano
// ===========================================================================
const base = {
  zona: "general" as Zona,
  hijos: 0,
  hijosDiscapacidad: 0,
  prenatal: false,
  conyuge: false,
  ayudaEscolar: false,
};

const T1 = V.hijo[0].montos.general;
const T2 = V.hijo[1].montos.general;
const T3 = V.hijo[2].montos.general;
const LIMITE_T1 = V.hijo[0].hasta as number;
const DISC_T3 = V.hijoDiscapacidad[2].montos.general;

{
  check("el IGF suma los ingresos del grupo", calcularIgf([800_000, 400_000]) === 1_200_000);
  check("los ingresos vacíos o negativos no restan", calcularIgf([500_000, 0, -100]) === 500_000);

  // Familia de dos sueldos en el primer tramo.
  const r1 = calcularAsignaciones({ ...base, ingresos: [600_000, 500_000], hijos: 2 });
  check("IGF $1.100.000 cae en el tramo 1", r1.tramo === 0, r1.tramo);
  check(
    "dos hijos en el tramo 1 cobran dos veces el monto del tramo 1",
    r1.totalMensual === T1 * 2,
    r1.totalMensual,
  );
  check("sin exclusión", r1.exclusion === null);

  // Justo en el límite del primer tramo y un peso más.
  const enElLimite = calcularAsignaciones({ ...base, ingresos: [LIMITE_T1], hijos: 1 });
  const unPesoMas = calcularAsignaciones({ ...base, ingresos: [LIMITE_T1 + 1], hijos: 1 });
  check("el límite del tramo 1 todavía cobra el máximo", enElLimite.totalMensual === T1);
  check("un peso más cae al tramo 2", unPesoMas.tramo === 1 && unPesoMas.totalMensual === T2, {
    tramo: unPesoMas.tramo,
    total: unPesoMas.totalMensual,
  });
  check(
    "cruzar el escalón cuesta la diferencia entre tramo 1 y tramo 2 por hijo",
    enElLimite.totalMensual - unPesoMas.totalMensual === T1 - T2,
  );

  // El escalón, con dos hijos.
  const conEscalon = calcularAsignaciones({ ...base, ingresos: [1_100_000], hijos: 2 });
  check("hay escalón detectado", conEscalon.escalon !== null);
  check(
    "el margen al escalón es el límite del tramo 1 menos el IGF",
    conEscalon.escalon?.margen === LIMITE_T1 - 1_100_000,
    conEscalon.escalon,
  );
  check(
    "cruzarlo con dos hijos cuesta dos veces el escalón por mes",
    conEscalon.escalon?.perdidaMensual === (T1 - T2) * 2,
    conEscalon.escalon,
  );

  // Tope grupal. Ojo: como el tope individual es exactamente la mitad del grupal, con DOS ingresos
  // es imposible pasarse del grupal sin que alguno se pase del individual — hacen falta tres.
  const sobreTope = calcularAsignaciones({
    ...base,
    ingresos: [0.8, 0.8, 0.8].map((f) => Math.round(V.topeIgfIndividual * f)),
    hijos: 1,
  });
  check(
    "ningún integrante supera el tope individual",
    sobreTope.ingresoQueExcluye === null,
    sobreTope.ingresoQueExcluye,
  );
  check("IGF sobre el tope grupal excluye", sobreTope.exclusion === "tope-grupal", sobreTope.exclusion);
  check("y no paga nada por hijo", sobreTope.totalMensual === 0);
  check("no hay escalón cuando ya está excluido", sobreTope.escalon === null);

  // Tope individual: el grupo NO se pasa del grupal, pero una persona sí del individual.
  const SOBRE_INDIVIDUAL = V.topeIgfIndividual + 50_000;
  const individual = calcularAsignaciones({ ...base, ingresos: [SOBRE_INDIVIDUAL, 100_000], hijos: 1 });
  check(
    "el IGF está por debajo del tope grupal",
    individual.igf < V.topeIgfGrupo,
    individual.igf,
  );
  check(
    "pero un solo ingreso arriba del individual excluye al grupo",
    individual.exclusion === "tope-individual",
    individual.exclusion,
  );
  check("y reporta cuál es ese ingreso", individual.ingresoQueExcluye === SOBRE_INDIVIDUAL);
  check("no cobra asignación por hijo", individual.totalMensual === 0);

  // La excepción: hijo con discapacidad no tiene tope.
  const disc = calcularAsignaciones({
    ...base,
    ingresos: [5_000_000, 4_000_000],
    hijos: 1,
    hijosDiscapacidad: 1,
  });
  check("el grupo está excluido por ingresos", disc.exclusion !== null);
  check(
    "el hijo común no cobra nada",
    disc.conceptos.find((c) => c.clave === "hijo")?.total === 0,
  );
  check(
    "pero el hijo con discapacidad cobra igual (monto del último tramo)",
    disc.conceptos.find((c) => c.clave === "hijo-discapacidad")?.total === DISC_T3,
    disc.conceptos,
  );
  check("el total mensual es sólo la de discapacidad", disc.totalMensual === DISC_T3);

  // Zonas.
  const zona3 = calcularAsignaciones({ ...base, ingresos: [900_000], zona: "zona3", hijos: 1 });
  check("zona 3 en el tramo 1 paga el monto de zona 3", zona3.totalMensual === V.hijo[0].montos.zona3, zona3.totalMensual);
  check(
    "zona 3 paga el doble que el valor general en el tramo 1",
    zona3.totalMensual > calcularAsignaciones({ ...base, ingresos: [900_000], hijos: 1 }).totalMensual,
  );

  // Prenatal y cónyuge.
  const prenatal = calcularAsignaciones({ ...base, ingresos: [900_000], prenatal: true });
  check("la prenatal paga lo mismo que un hijo", prenatal.totalMensual === T1);
  const conyuge = calcularAsignaciones({ ...base, ingresos: [900_000], conyuge: true });
  check("la asignación por cónyuge es la de la tabla", conyuge.totalMensual === V.conyuge.general);

  // Ayuda escolar: pago único, no entra en el total mensual.
  const escolar = calcularAsignaciones({ ...base, ingresos: [900_000], hijos: 2, ayudaEscolar: true });
  check("la ayuda escolar de 2 hijos es dos veces el total", escolar.totalUnico === V.ayudaEscolar.total.general * 2, escolar.totalUnico);
  check(
    "y no se suma al total mensual",
    escolar.totalMensual === T1 * 2,
    escolar.totalMensual,
  );

  // Sin hijos ni conceptos, no hay nada que pagar.
  const vacio = calcularAsignaciones({ ...base, ingresos: [900_000] });
  check("sin hijos no hay conceptos", vacio.conceptos.length === 0 && vacio.totalMensual === 0);
  check("y no hay escalón que mostrar", vacio.escalon === null);
}

// ===========================================================================
// 7 · tramoDe y calcularEscalon en aislamiento
// ===========================================================================
{
  check("IGF 0 cae en el tramo 1", tramoDe(0, V.hijo) === 0);
  check("IGF en el tope grupal cae en el último tramo", tramoDe(V.topeIgfGrupo, V.hijo) === 3);
  check("IGF por encima del tope no tiene tramo", tramoDe(V.topeIgfGrupo + 1, V.hijo) === null);
  check(
    "en la tabla de discapacidad, un IGF altísimo sigue teniendo tramo",
    tramoDe(50_000_000, V.hijoDiscapacidad) === 2,
  );
  check(
    "sin hijos no hay escalón",
    calcularEscalon(1_000_000, "general", 0, 0, null) === null,
  );
  // En el último tramo el escalón sigue existiendo, y es el más caro: cruzar el tope grupal no baja
  // de tramo, saca del régimen. Se pierde la asignación entera, no la diferencia entre dos tramos.
  const ultimo = calcularEscalon(5_000_000, "general", 1, 0, null);
  check("en el último tramo el escalón es salirse del régimen", ultimo !== null, ultimo);
  check(
    "cruzar el tope grupal hace perder la asignación completa",
    ultimo?.perdidaMensual === V.hijo[3].montos.general,
    ultimo,
  );
  check("y el límite de ese escalón es el tope grupal", ultimo?.limite === V.topeIgfGrupo, ultimo);
  check(
    "el escalón de un hijo en el tramo 2 vale la diferencia entre tramo 2 y tramo 3",
    calcularEscalon(1_500_000, "general", 1, 0, null)?.perdidaMensual === T2 - T3,
    calcularEscalon(1_500_000, "general", 1, 0, null),
  );
}

// ── Pagos por única vez: la ventana de la cartilla (regla de s81) ──────────────────────────────
// La ventana de 2 meses a 2 años NO está en la Ley 24.714: sale de las cartillas de ANSES y es lo
// que hace que un derecho existente se pierda por llegar tarde. Si alguna vez alguien "simplifica"
// estos números, la página pasa a decir lo mismo que todas las notas: sólo el monto.
{
  check("la espera mínima para pedir un pago único es de 2 meses", PAGO_UNICO.esperaMeses === 2);
  check("la caducidad es a los 2 años del hecho generador", PAGO_UNICO.caducidadAnios === 2);
  check(
    "el nacimiento sin vida se paga desde las 26 semanas / 180 días",
    PAGO_UNICO.nacimientoSinVidaSemanas === 26 && PAGO_UNICO.nacimientoSinVidaDias === 180,
  );
  check(
    "la única antigüedad que sigue vigente es la del matrimonio: 6 meses",
    PAGO_UNICO.antiguedadMatrimonioMeses === 6,
  );
  check("hay seis reglas publicadas, ninguna vacía", PAGO_UNICO.reglas.length === 6 &&
    PAGO_UNICO.reglas.every((r) => r.detalle.length > 80 && r.fuente.length > 10));
  check(
    "se dice que el plazo NO está en la ley (es el punto entero de la sección)",
    PAGO_UNICO.reglas.some((r) => r.clave === "ventana" && /no está en la Ley 24\.714/.test(r.detalle)),
  );
  check(
    "se dice que el matrimonio lo cobran los dos cónyuges",
    PAGO_UNICO.reglas.some((r) => r.clave === "dos-conyuges" && /dos veces/.test(r.detalle)),
  );
  check(
    "se avisa que nacimiento y adopción ya NO exigen antigüedad (Ley 27.611)",
    PAGO_UNICO.reglas.some((r) => r.clave === "antiguedad" && /27\.611/.test(r.detalle)),
  );
  check(
    "las dos cartillas de pago único están citadas y son de anses.gob.ar",
    [ASIGNACIONES_FUENTES.cartillaNacimiento.url, ASIGNACIONES_FUENTES.cartillaMatrimonio.url].every(
      (u) => u.startsWith("https://www.anses.gob.ar/sites/default/files/cartilla/"),
    ),
  );
}

if (ASIGNACIONES_PROXIMAS) {
  const P = ASIGNACIONES_PROXIMAS;
  const [a, m] = V.periodo.split("-").map(Number);
  const siguiente = m === 12 ? `${a + 1}-01` : `${a}-${String(m + 1).padStart(2, "0")}`;
  check("la resolución próxima es del mes siguiente al vigente", P.periodo === siguiente, P.periodo);
  check(
    "ancla del art. 4: ceil(tope individual vigente × coef) = tope individual publicado, al peso",
    moverAlMesSiguiente(V.topeIgfIndividual, P.movilidad) === P.topeIgfIndividual,
    { derivado: moverAlMesSiguiente(V.topeIgfIndividual, P.movilidad), publicado: P.topeIgfIndividual },
  );
  check(
    "moverAlMesSiguiente reproduce la rotación del mes anterior al vigente (tope individual)",
    moverAlMesSiguiente(ASIGNACIONES_MES_ANTERIOR.topeIgfIndividual, V.movilidad) === V.topeIgfIndividual,
  );
  check(
    "moverAlMesSiguiente reproduce la rotación del mes anterior al vigente (AUH general)",
    moverAlMesSiguiente(ASIGNACIONES_MES_ANTERIOR.universales.hijo.general, V.movilidad) ===
      V.universales.hijo.general,
  );
} else {
  console.log("--   sin resolución del mes siguiente dictada todavía");
}

// Toda resolución cargada por adelantado se cruza contra su ancla SIEMPRE, no sólo mientras es "la
// próxima": el día que entra en vigencia, este es el único lugar donde el tope que publica su art. 4
// se sigue comparando contra la tabla derivada.
for (const r of RESOLUCIONES_ASIGNACIONES_SIGUIENTES.filter((x) => x.periodo === V.periodo)) {
  check(
    `ancla del art. 4 de la ${r.resolucion} (vigente): la tabla derivada tiene el tope publicado`,
    V.topeIgfIndividual === r.topeIgfIndividual,
    { derivado: V.topeIgfIndividual, publicado: r.topeIgfIndividual },
  );
}

console.log("");
if (fallas > 0) {
  console.error(`${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(`Todos los checks de asignaciones familiares OK (vigencia: ${V.vigencia}).`);
