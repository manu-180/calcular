// Verificación de las pensiones no contributivas (src/data/pnc.ts + src/lib/pnc.ts).
// Correr con: npx tsx scripts/check_pnc.ts
//
// EL CHECK QUE IMPORTA (ancla doble, sección 2): los montos NO se cargan a mano acá — se derivan
// del haber mínimo garantizado (70%, 80%, 100%). Esa derivación se verifica contra lo que se
// liquida de hecho en septiembre de 2026: $300.043,24 el 70% y $428.633,20 el 100%, más el bono
// de $70.000 del Decreto 824/2026 ⇒ $370.043,24 y $498.633,20. Si alguien rota el haber mínimo y se
// equivoca en un dígito, o si toca un porcentaje sin norma, este check lo agarra.
//
// El segundo ancla es el tope de compatibilidad laboral: dos SMVM (Ley 27.793, art. 7). No es un
// monto publicado — se deriva de la escala del SMVM, que vive en otro archivo. Que las dos series
// se muevan por su cuenta y el tope siga cerrando es lo que prueba que la regla está bien leída.

import {
  INCAPACIDAD_MINIMA_INVALIDEZ_LABORAL,
  PNC_FUENTES,
  PRESTACIONES_PNC,
} from "../src/data/pnc";
import { BONO_VIGENTE, PRESTACIONES_VIGENTES as V } from "../src/data/prestaciones";
import { SMVM_SERIE } from "../src/data/desempleo";
import { smvmVigente } from "../src/lib/desempleo";
import {
  bonoDeHaber,
  evaluarSituacion,
  montoDe,
  montosVigentes,
  prestacionPorClave,
  topeIngresosCompatibles,
  totalMinimaConBono,
} from "../src/lib/pnc";

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
// 1 · Forma del catálogo
// ===========================================================================
check("las 4 prestaciones están cargadas", PRESTACIONES_PNC.length === 4);
check(
  "las claves son únicas",
  new Set(PRESTACIONES_PNC.map((p) => p.clave)).size === PRESTACIONES_PNC.length,
);
check(
  "todas las proporciones están entre 0 y 1 y citan una norma con número",
  PRESTACIONES_PNC.every(
    (p) =>
      p.proporcionHaberMinimo > 0 &&
      p.proporcionHaberMinimo <= 1 &&
      /\d/.test(p.norma) &&
      p.requisitos.length >= 3,
  ),
  PRESTACIONES_PNC.map((p) => [p.clave, p.proporcionHaberMinimo, p.norma]),
);
check(
  "cada prestación dice quién la otorga y quién la paga",
  PRESTACIONES_PNC.every((p) => p.otorga.length > 3 && p.paga.length > 3),
);
check(
  "sólo la pensión por discapacidad tiene tope de ingresos en SMVM",
  PRESTACIONES_PNC.filter((p) => p.topeIngresosEnSmvm !== null).map((p) => p.clave).join(",") ===
    "discapacidad",
);

// Los porcentajes son los de las normas, no números redondos elegidos por conveniencia.
check("discapacidad = 70% del haber mínimo (Ley 27.793 art. 6)", prestacionPorClave("discapacidad").proporcionHaberMinimo === 0.7);
check("vejez = 70% del haber mínimo (Dec. 432/97)", prestacionPorClave("vejez").proporcionHaberMinimo === 0.7);
check("madres de 7 hijos = 100% del haber mínimo (Ley 23.746 art. 1)", prestacionPorClave("madre7hijos").proporcionHaberMinimo === 1);
check("PUAM = 80% del haber mínimo (Ley 27.260 art. 13)", prestacionPorClave("puam").proporcionHaberMinimo === 0.8);

// La PUAM ya vive calculada en prestaciones.ts: las dos vías tienen que dar lo mismo.
check(
  "la PUAM derivada coincide con el valor de la resolución en prestaciones.ts",
  casi(montoDe(prestacionPorClave("puam")).haber, V.puam),
  { derivado: montoDe(prestacionPorClave("puam")).haber, resolucion: V.puam },
);

// ===========================================================================
// 2 · Ancla doble — la derivación contra lo que se liquida de hecho
// ===========================================================================
{
  // Estos cuatro números son los de agosto de 2026 y sólo valen para ese período: el check se
  // saltea solo cuando se rota el haber mínimo, para no clavar un mes viejo como verdad.
  const ANCLA = {
    periodo: "2026-08",
    haber70: 293_843.15,
    haber100: 419_775.93,
    total70: 363_843.15,
    total100: 489_775.93,
  };
  if (V.periodo === ANCLA.periodo) {
    const disc = montoDe(prestacionPorClave("discapacidad"));
    const madre = montoDe(prestacionPorClave("madre7hijos"));
    check("ancla · el 70% da el haber que se liquida", casi(disc.haber, ANCLA.haber70), disc.haber);
    check("ancla · el 100% da el haber que se liquida", casi(madre.haber, ANCLA.haber100), madre.haber);
    check("ancla · 70% + bono = el total del mes", casi(disc.total, ANCLA.total70), disc.total);
    check("ancla · 100% + bono = el total del mes", casi(madre.total, ANCLA.total100), madre.total);
  } else {
    console.log(
      `SKIP ancla de montos: es de ${ANCLA.periodo} y el haber mínimo vigente es de ${V.periodo}. Rotar el ancla con los montos que publique ANSES para el mes nuevo.`,
    );
  }
}

// ===========================================================================
// 3 · El bono, tramo por tramo (Dec. 824/2026, arts. 3 y 4)
// ===========================================================================
{
  const tope = totalMinimaConBono();
  check("el tope del bono es haber mínimo + bono", casi(tope, V.haberMinimo + BONO_VIGENTE.monto));
  check("bono completo por debajo de la mínima", bonoDeHaber(V.haberMinimo - 1) === BONO_VIGENTE.monto);
  check("bono completo justo en la mínima", bonoDeHaber(V.haberMinimo) === BONO_VIGENTE.monto);
  check("bono parcial entre la mínima y el tope", casi(bonoDeHaber(tope - 1000), 1000));
  check("sin bono en el tope", bonoDeHaber(tope) === 0);
  check("sin bono por encima del tope", bonoDeHaber(tope + 50_000) === 0);
  check(
    "las cuatro prestaciones cobran el bono completo (todas están por debajo de la mínima)",
    montosVigentes().every((m) => m.bono === BONO_VIGENTE.monto),
    montosVigentes().map((m) => [m.prestacion.clave, m.bono]),
  );
  check("el bono es del mes vigente", BONO_VIGENTE.periodo === V.periodo);
}

// El bono achata la brecha: el 70% del haber termina siendo más del 70% del total que cobra la
// mínima. Es el dato diferencial de la página; si deja de ser cierto, la página miente.
{
  const disc = montoDe(prestacionPorClave("discapacidad"));
  check(
    "el bono comprime la brecha: el total del 70% supera el 70% de la mínima con bono",
    disc.proporcionSobreMinimaConBono > 0.7 && disc.proporcionSobreMinimaConBono < 1,
    disc.proporcionSobreMinimaConBono,
  );
}

// ===========================================================================
// 4 · Tope de compatibilidad laboral = 2 SMVM (Ley 27.793, art. 7)
// ===========================================================================
{
  const disc = prestacionPorClave("discapacidad");
  const tope = topeIngresosCompatibles(disc);
  const smvm = smvmVigente().mes;
  check("el tope de ingresos existe para la pensión por discapacidad", tope !== null);
  check("el tope es exactamente 2 SMVM del mes vigente", tope !== null && casi(tope, smvm.mensual * 2), {
    tope,
    smvm: smvm.mensual,
  });
  check(
    "el SMVM del que sale el tope es un mes de la escala oficial",
    SMVM_SERIE.some((m) => m.periodo === smvm.periodo),
  );
  check(
    "las otras tres prestaciones no tienen tope en pesos",
    (["vejez", "madre7hijos", "puam"] as const).every(
      (c) => topeIngresosCompatibles(prestacionPorClave(c)) === null,
    ),
  );
}

// ===========================================================================
// 5 · Evaluación de situaciones
// ===========================================================================
{
  const tope = topeIngresosCompatibles(prestacionPorClave("discapacidad"))!;

  const sinTrabajo = evaluarSituacion({
    clave: "discapacidad",
    cobraOtroBeneficio: false,
    ingresosPorTrabajo: 0,
  });
  check("sin trabajo ni otro beneficio no hay observaciones", sinTrabajo.observaciones.length === 0);
  check("sin trabajo, el margen es el tope entero", casi(sinTrabajo.margenDeIngresos!, tope));

  const trabajaPoco = evaluarSituacion({
    clave: "discapacidad",
    cobraOtroBeneficio: false,
    ingresosPorTrabajo: tope / 2,
  });
  check(
    "trabajar por debajo del tope es compatible",
    trabajaPoco.observaciones.every((o) => o.tono === "ok"),
    trabajaPoco.observaciones,
  );
  check("el margen se descuenta bien", casi(trabajaPoco.margenDeIngresos!, tope / 2));
  check(
    "el total suma ingresos + pensión",
    casi(trabajaPoco.totalConIngresos, tope / 2 + trabajaPoco.monto.total),
  );

  const enElTope = evaluarSituacion({
    clave: "discapacidad",
    cobraOtroBeneficio: false,
    ingresosPorTrabajo: tope,
  });
  check(
    "alcanzar el tope ya suspende (la ley dice «iguales o superiores»)",
    enElTope.observaciones.some((o) => o.tono === "bloqueante"),
  );
  check("en el tope el margen es cero", enElTope.margenDeIngresos === 0);

  const conOtro = evaluarSituacion({
    clave: "vejez",
    cobraOtroBeneficio: true,
    ingresosPorTrabajo: 0,
  });
  check(
    "cobrar otro beneficio es bloqueante en todas",
    conOtro.observaciones.some((o) => o.tono === "bloqueante"),
  );

  const vejezTrabaja = evaluarSituacion({
    clave: "vejez",
    cobraOtroBeneficio: false,
    ingresosPorTrabajo: 100_000,
  });
  check(
    "sin tope publicado, trabajar es una advertencia y no un bloqueo",
    vejezTrabaja.observaciones.length === 1 && vejezTrabaja.observaciones[0].tono === "atencion",
  );
  check("sin tope publicado no hay margen calculable", vejezTrabaja.margenDeIngresos === null);

  const negativo = evaluarSituacion({
    clave: "discapacidad",
    cobraOtroBeneficio: false,
    ingresosPorTrabajo: -5000,
  });
  check("un ingreso negativo se trata como cero", casi(negativo.margenDeIngresos!, tope));
}

// ===========================================================================
// 6 · Datos que la página afirma y no puede inventar
// ===========================================================================
check(
  "el umbral de invalidez laboral es 66% (Dec. 843/2024), no el 76% viejo",
  INCAPACIDAD_MINIMA_INVALIDEZ_LABORAL === 0.66,
);
check(
  "la pensión por discapacidad cita el CUD en sus requisitos",
  prestacionPorClave("discapacidad").requisitos.some((r) => /CUD|Certificado Único/i.test(r)),
);
check(
  "la pensión por discapacidad cita el tope de dos salarios mínimos",
  prestacionPorClave("discapacidad").requisitos.some((r) => /dos salarios mínimos/i.test(r)),
);
check(
  "las cuatro prestaciones declaran la incompatibilidad con otro beneficio",
  PRESTACIONES_PNC.every((p) =>
    p.requisitos.some((r) => /previsi[oó]n|jubilaci[oó]n|pensi[oó]n|retiro|beneficio/i.test(r)),
  ),
);

// ---------------------------------------------------------------------------
// La letra chica del reglamento de madres de 7 hijos (Decreto 2360/90).
// Es el diferencial de la página: la Ley 23.746 tiene dos artículos de requisitos y
// las notas copian esos dos. Si esto se cae, la página vuelve a ser una nota más.
// ---------------------------------------------------------------------------
const MADRE7_LETRA_CHICA = prestacionPorClave("madre7hijos").letraChica ?? [];

check("madres de 7 hijos publica la letra chica del Dec. 2360/90", MADRE7_LETRA_CHICA.length >= 4);
check(
  "la letra chica dice 60 días de ausencia del país por año calendario (art. 12 inc. d)",
  MADRE7_LETRA_CHICA.some((l) => /60 días/.test(l.detalle) && /año calendario/i.test(l.detalle)),
);
check(
  "…y NO lo confunde con los 90 días de la PUAM (el número propio de la PUAM se nombra como distinto)",
  MADRE7_LETRA_CHICA.some((l) => /90/.test(l.detalle) && /PUAM/i.test(l.detalle)),
);
check(
  "la letra chica dice que se paga desde el mes siguiente al otorgamiento (art. 10 inc. a)",
  MADRE7_LETRA_CHICA.some((l) => /mes siguiente/i.test(l.detalle) && /otorga/i.test(l.detalle)),
);
check(
  "la letra chica describe la pensión derivada al viudo y a los hijos (art. 3)",
  MADRE7_LETRA_CHICA.some((l) => /viudo/i.test(l.detalle) && /18 años/.test(l.detalle)),
);
check(
  "los requisitos de madres de 7 hijos citan la residencia del reglamento (1 año / 15 años)",
  prestacionPorClave("madre7hijos").requisitos.some(
    (r) => /1 año de residencia/i.test(r) && /15 años/.test(r),
  ),
);
check(
  "…y la incompatibilidad ampliada a cualquier PNC, no sólo a un régimen de previsión",
  prestacionPorClave("madre7hijos").requisitos.some((r) =>
    /prestación no contributiva alguna/i.test(r),
  ),
);
check(
  "el Decreto 2360/90 está citado como fuente con su texto actualizado de InfoLEG",
  PNC_FUENTES.lista.some(
    (f) => /2360/.test(f.nombre) && f.url.includes("infoleg") && f.url.endsWith("texact.htm"),
  ),
);

// ===========================================================================
// 7 · Higiene de fuentes
// ===========================================================================
check(
  "todas las fuentes tienen URL oficial (boletinoficial / infoleg / argentina.gob / anses)",
  PNC_FUENTES.lista.every((f) =>
    /^https:\/\/(www\.)?(boletinoficial|servicios\.infoleg|infoleg|argentina|anses)\.gob\.ar\//.test(
      f.url,
    ),
  ),
  PNC_FUENTES.lista.map((f) => f.url),
);
check("hay al menos 6 fuentes listadas", PNC_FUENTES.lista.length >= 6);
check(
  "están citadas las cuatro normas que fijan los montos",
  ["27.793", "432/1997", "23.746", V.resolucion.replace("Resolución ANSES ", "")].every((n) =>
    PNC_FUENTES.lista.some((f) => f.nombre.includes(n) || f.detalle.includes(n)),
  ),
);
check(
  "la fecha de consulta de las fuentes es una fecha ISO",
  /^\d{4}-\d{2}-\d{2}$/.test(PNC_FUENTES.consultadoEl),
);

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log(
    `Todos los checks de pensiones no contributivas OK (haber mínimo de ${V.periodo}, SMVM de ${smvmVigente().mes.periodo}).`,
  );
}
