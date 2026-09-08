// Verificación de la afiliación previsional (Ley 24.241, arts. 2º, 3º y 4º).
// Correr con: npx tsx scripts/check_aportes_obligatorios.ts
//
// LO QUE ESTE CHECK EXISTE PARA IMPEDIR:
//
//   1. **Que el umbral del art. 2º inc. d) ap. 1.1 se convierta en un número fijo.** No es «el 50 %»
//      ni «más del 5 %»: es cien dividido el número total de socios, así que cambia con cada
//      sociedad. Un umbral hardcodeado da el veredicto contrario en la mitad de los casos.
//   2. **Que el umbral se lea como una exención de aportar.** Quedar fuera del inciso a) no es
//      quedar exento: el inciso d) arranca con «sin perjuicio de su inclusión en el inciso b)». El
//      check exige que el socio que dirige siga saliendo obligatorio como autónomo aunque el
//      umbral lo saque de la relación de dependencia.
//   3. **Que se pierda el «aunque no obtengan retribución».** El art. 2º inc. b) ap. 1 obliga al que
//      dirige o administra aunque no cobre un peso. Publicarlo sin esa frase invita a no aportar.
//   4. **Que el «igual o superior» se vuelva «superior».** El texto dice «igual o superior al
//      porcentual»: el socio que tiene exactamente el umbral queda FUERA del inciso a). Un `>` en
//      lugar de `>=` da el resultado opuesto justo en el caso de borde más común (dos socios al 50 %).
//   5. **Que las cuatro condiciones del art. 4º dejen de ser acumulativas.** Son cuatro y van
//      juntas; con tres, no hay excepción.
//   6. **Que la caja provincial parezca una alternativa.** El art. 3º inc. b) ap. 4 cierra con que
//      la incorporación «no modificará la obligatoriedad que dimana de los respectivos regímenes
//      locales»: no se elige entre una y otra.
//
// MUTACIONES MUERTAS (cambios plausibles que este check tiene que atrapar):
//   · umbral fijo en vez de 100/N · `>` en lugar de `>=` · el socio que dirige saliendo
//     «no-aplica» como autónomo · el director de S.A. saliendo obligatorio como dependiente ·
//     el art. 4º con condiciones alternativas en vez de acumulativas.

import {
  AFILIACION_FUENTES,
  AFILIACION_TEXTOS,
  EDAD_MINIMA,
  EXCEPCION_ANIOS,
  EXCEPCION_VECES,
  GRADO_PARENTESCO,
  SITUACIONES,
  umbralParticipacion,
  VIGENCIA_AFILIACION,
} from "../src/data/aportes-obligatorios";
import { calcularAfiliacion, socioFueraDelIncisoA, type Entrada } from "../src/lib/aportes-obligatorios";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FALLA ${nombre}`, detalle ?? "");
  }
}

const socio = (extra: Partial<Entrada> = {}): Entrada => ({
  situacion: "socio",
  totalSocios: 4,
  participacion: 10,
  tipoSociedad: "srl-sa",
  ...extra,
});

// --- 1. Las constantes son las de la ley ------------------------------------------------------
check("la edad mínima es 18", EDAD_MINIMA === 18, EDAD_MINIMA);
check("el contrato del art. 4º es de hasta 2 años", EXCEPCION_ANIOS === 2, EXCEPCION_ANIOS);
check("y la excepción es por una sola vez", EXCEPCION_VECES === 1, EXCEPCION_VECES);
check("el parentesco del ap. 1.4 llega al 2º grado", GRADO_PARENTESCO === 2, GRADO_PARENTESCO);
check("hay al menos 15 situaciones en el selector", SITUACIONES.length >= 15, SITUACIONES.length);
check(
  "ninguna situación se repite",
  new Set(SITUACIONES.map((s) => s.id)).size === SITUACIONES.length,
);

// --- 2. El umbral es 100/N, no un número fijo -------------------------------------------------
check("con 2 socios el umbral es 50 %", umbralParticipacion(2) === 50, umbralParticipacion(2));
check("con 4 socios es 25 %", umbralParticipacion(4) === 25, umbralParticipacion(4));
check("con 10 socios es 10 %", umbralParticipacion(10) === 10, umbralParticipacion(10));
check("con 3 socios es 33,33…", Math.abs(umbralParticipacion(3) - 100 / 3) < 1e-9);
check("el umbral BAJA cuando hay más socios", umbralParticipacion(20) < umbralParticipacion(2));
check("con datos absurdos no explota", umbralParticipacion(0) === 100 && umbralParticipacion(-3) === 100);

// --- 3. «Igual o superior»: el borde exacto ---------------------------------------------------
check(
  "dos socios al 50 % quedan FUERA del inciso a) — el texto dice «igual o superior»",
  socioFueraDelIncisoA(socio({ totalSocios: 2, participacion: 50 })).fuera,
);
check(
  "con 49,99 % de dos socios, sí entra al inciso a)",
  !socioFueraDelIncisoA(socio({ totalSocios: 2, participacion: 49.99 })).fuera,
);
check(
  "cuatro socios: 25 % queda fuera, 24 % entra",
  socioFueraDelIncisoA(socio({ totalSocios: 4, participacion: 25 })).fuera &&
    !socioFueraDelIncisoA(socio({ totalSocios: 4, participacion: 24 })).fuera,
);
check(
  "el motivo dice el umbral calculado, no un número inventado",
  socioFueraDelIncisoA(socio({ totalSocios: 4, participacion: 25 })).motivo.includes("25,00 %"),
);

// --- 4. Los otros tres apartados del inciso d) ------------------------------------------------
const civil = socioFueraDelIncisoA(socio({ tipoSociedad: "civil-o-de-hecho", participacion: 1 }));
check("la sociedad de hecho saca del inciso a) sin mirar el porcentaje", civil.fuera);
check("y cita el ap. 1.3", civil.norma.includes("1.3"), civil.norma);
const comandita = socioFueraDelIncisoA(
  socio({ tipoSociedad: "comandita", comanditadoUnico: true, participacion: 1 }),
);
check("el comanditado único queda fuera por su sola condición", comandita.fuera);
check("y cita el ap. 1.2", comandita.norma.includes("1.2"), comandita.norma);
check(
  "si NO es comanditado único, se vuelve al umbral",
  !socioFueraDelIncisoA(socio({ tipoSociedad: "comandita", comanditadoUnico: false, participacion: 1 }))
    .fuera,
);
const parientes = socioFueraDelIncisoA(socio({ todosParientes: true, participacion: 1 }));
check("si todos son parientes hasta el 2º grado, quedan fuera", parientes.fuera);
check("y cita el ap. 1.4", parientes.norma.includes("1.4"), parientes.norma);

// --- 5. Fuera del inciso a) NO es exento ------------------------------------------------------
const socioGrandeQueDirige = calcularAfiliacion(
  socio({ totalSocios: 2, participacion: 50, dirigeLaSociedad: true }),
);
check(
  "el socio del 50 % que dirige NO entra como dependiente…",
  socioGrandeQueDirige.dependiente.estado === "no-aplica",
);
check(
  "…y SÍ es obligatorio como autónomo",
  socioGrandeQueDirige.autonomo.estado === "obligatorio",
  socioGrandeQueDirige.autonomo.estado,
);
check(
  "y se avisa que quedar fuera del inciso a) no es quedar exento",
  socioGrandeQueDirige.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("inciso b)")),
);
const socioChico = calcularAfiliacion(socio({ totalSocios: 4, participacion: 10 }));
check(
  "el socio por debajo del umbral entra obligatoriamente al inciso a)",
  socioChico.dependiente.estado === "obligatorio",
);
const socioGrandeQueNoDirige = calcularAfiliacion(socio({ totalSocios: 2, participacion: 50 }));
check(
  "el socio del 50 % que NO dirige queda en la afiliación voluntaria del art. 3º",
  socioGrandeQueNoDirige.autonomo.estado === "voluntario" &&
    socioGrandeQueNoDirige.autonomo.norma.includes("art. 3º"),
);
check("el umbral se devuelve para mostrarlo", socioGrandeQueNoDirige.umbral === 50);

// --- 6. Relación de dependencia -----------------------------------------------------------------
check(
  "el empleado privado es obligatorio por el ap. 5",
  (() => {
    const r = calcularAfiliacion({ situacion: "privada" });
    return r.dependiente.estado === "obligatorio" && r.dependiente.norma.includes("ap. 5");
  })(),
);
check(
  "el empleado provincial SIN adhesión no queda comprendido",
  calcularAfiliacion({ situacion: "publica-provincial", provinciaAdherida: false }).dependiente
    .estado === "no-aplica",
);
check(
  "con adhesión sí",
  calcularAfiliacion({ situacion: "publica-provincial", provinciaAdherida: true }).dependiente
    .estado === "obligatorio",
);
check(
  "y sin adhesión se avisa que manda la caja local",
  calcularAfiliacion({ situacion: "publica-provincial", provinciaAdherida: false }).avisos.length > 0,
);

// --- 7. Autónomos ------------------------------------------------------------------------------
const dirige = calcularAfiliacion({ situacion: "direccion" });
check("dirigir o administrar es obligatorio", dirige.autonomo.estado === "obligatorio");
check(
  "y se avisa que obliga aunque no se cobre nada",
  dirige.avisos.some((a) => a.texto.includes("no cobre")),
);
check(
  "el profesional independiente entra por el ap. 2",
  calcularAfiliacion({ situacion: "profesion" }).autonomo.norma.includes("ap. 2"),
);
check(
  "la actividad lucrativa residual entra por el ap. 4",
  calcularAfiliacion({ situacion: "otra-lucrativa" }).autonomo.norma.includes("ap. 4"),
);

// --- 8. Los voluntarios del art. 3º ------------------------------------------------------------
const director = calcularAfiliacion({ situacion: "director-sa" });
check(
  "el director de S.A. es VOLUNTARIO como dependiente",
  director.dependiente.estado === "voluntario" && director.dependiente.norma.includes("art. 3º"),
);
check(
  "y OBLIGATORIO como autónomo por la dirección",
  director.autonomo.estado === "obligatorio" && director.autonomo.norma.includes("art. 2º"),
);
check(
  "el síndico es voluntario",
  calcularAfiliacion({ situacion: "sindico" }).autonomo.estado === "voluntario",
);
check(
  "el condómino que no administra es voluntario…",
  calcularAfiliacion({ situacion: "condominio" }).autonomo.estado === "voluntario",
);
check(
  "…y se avisa que administrar lo saca de ahí",
  calcularAfiliacion({ situacion: "condominio" }).avisos.some((a) => a.texto.includes("administra")),
);
check(
  "el ama de casa es voluntaria, en la categoría mínima",
  (() => {
    const r = calcularAfiliacion({ situacion: "ama-de-casa" });
    return r.autonomo.estado === "voluntario" && r.autonomo.motivo.includes("categoría mínima");
  })(),
);
const caja = calcularAfiliacion({ situacion: "caja-provincial" });
check("el profesional con caja provincial es voluntario en el nacional", caja.autonomo.estado === "voluntario");
check(
  "y se avisa que NO reemplaza a la caja local",
  caja.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("regímenes locales")),
);

// --- 9. El art. 4º: cuatro condiciones acumulativas -------------------------------------------
const base: Entrada = {
  situacion: "contratado-exterior",
  aniosContrato: 2,
  yaUsoLaExcepcion: false,
  residenciaPermanente: false,
  cubiertoEnSuPais: true,
};
check("con las cuatro condiciones, queda exceptuado", calcularAfiliacion(base).dependiente.estado === "exceptuado");
check(
  "con 3 años de contrato, no",
  calcularAfiliacion({ ...base, aniosContrato: 3 }).dependiente.estado === "obligatorio",
);
check(
  "si ya la usó, no",
  calcularAfiliacion({ ...base, yaUsoLaExcepcion: true }).dependiente.estado === "obligatorio",
);
check(
  "con residencia permanente, no",
  calcularAfiliacion({ ...base, residenciaPermanente: true }).dependiente.estado === "obligatorio",
);
check(
  "sin cobertura en su país, no",
  calcularAfiliacion({ ...base, cubiertoEnSuPais: false }).dependiente.estado === "obligatorio",
);
check(
  "cuando no califica, el motivo dice cuál condición falló",
  calcularAfiliacion({ ...base, aniosContrato: 5 }).dependiente.motivo.includes("supera los 2 años"),
);
check(
  "cuando califica, se avisa que la exención se pide, no es automática",
  calcularAfiliacion(base).avisos.some((a) => a.texto.includes("solicitud de exención")),
);

// --- 10. Las citas son citas ------------------------------------------------------------------
check(
  "el umbral está citado textual con «igual o superior»",
  AFILIACION_TEXTOS.art2dUmbral.includes("igual o superior al porcentual") &&
    AFILIACION_TEXTOS.art2dUmbral.includes("cien (100) por el número total de socios"),
);
check(
  "la dirección conserva el «aunque no obtengan retribución»",
  AFILIACION_TEXTOS.art2bDireccion.includes(
    "aunque por esas actividades no obtengan retribución, utilidad o ingreso alguno",
  ),
);
check(
  "el «sin perjuicio de su inclusión en el inciso b)» está guardado textual",
  AFILIACION_TEXTOS.art2dSinPerjuicio.startsWith("Sin perjuicio de su inclusión en el inciso b)"),
);
check(
  "la caja provincial conserva la frase que impide leerla como alternativa",
  AFILIACION_TEXTOS.art3CajaProvincial.includes(
    "no modificará la obligatoriedad que dimana de los respectivos regímenes locales",
  ),
);
check(
  "el ama de casa conserva «categoría mínima» y la opción por una superior",
  AFILIACION_TEXTOS.art3AmasDeCasa.includes("categoría mínima de aportes") &&
    AFILIACION_TEXTOS.art3AmasDeCasa.includes("categoría superior"),
);
check(
  "el art. 4º conserva las cuatro condiciones",
  AFILIACION_TEXTOS.art4Excepcion.includes("no mayor de dos (2) años") &&
    AFILIACION_TEXTOS.art4Excepcion.includes("por una sola vez") &&
    AFILIACION_TEXTOS.art4Excepcion.includes("no tengan residencia permanente") &&
    AFILIACION_TEXTOS.art4Excepcion.includes("vejez, invalidez y muerte"),
);
check(
  "el ap. 1.4 conserva el grado y las dos clases de parentesco",
  AFILIACION_TEXTOS.art2dParentesco.includes("segundo grado de consanguinidad y/o afinidad"),
);
check(
  "el empleo provincial conserva la condición de la adhesión previa",
  AFILIACION_TEXTOS.art2aProvincial.includes("a condición que previamente las autoridades respectivas adhieran"),
);

// --- 11. SIJP / SIPA y fuentes ----------------------------------------------------------------
check(
  "las citas conservan el nombre viejo (SIJP): una cita corregida deja de ser cita",
  AFILIACION_TEXTOS.art2Encabezado.includes("SIJP") && AFILIACION_TEXTOS.art3Encabezado.includes("SIJP"),
);
check(
  "y el archivo declara los dos nombres y la ley que los une",
  VIGENCIA_AFILIACION.nombreOriginal === "SIJP" &&
    VIGENCIA_AFILIACION.nombreActual === "SIPA" &&
    VIGENCIA_AFILIACION.normaUnificacion.includes("26.425"),
);
check("hay al menos 3 fuentes", AFILIACION_FUENTES.length >= 3, AFILIACION_FUENTES.length);
check(
  "todas por https y de infoleg",
  AFILIACION_FUENTES.every((f) => f.url.startsWith("https://") && f.url.includes("infoleg.gob.ar")),
);
check("ninguna fuente sin detalle", AFILIACION_FUENTES.every((f) => f.detalle.trim().length > 30));
check("la fecha de consulta está declarada", VIGENCIA_AFILIACION.consultadoEl.includes("2026"));

// --- 12. Ningún veredicto sale mudo -----------------------------------------------------------
for (const s of SITUACIONES) {
  const r = calcularAfiliacion({
    situacion: s.id,
    totalSocios: 3,
    participacion: 10,
    tipoSociedad: "srl-sa",
    provinciaAdherida: true,
    aniosContrato: 1,
    cubiertoEnSuPais: true,
  });
  const algo = r.dependiente.estado !== "no-aplica" || r.autonomo.estado !== "no-aplica";
  check(`«${s.id}» devuelve al menos una puerta con veredicto`, algo);
  const conNorma =
    (r.dependiente.estado === "no-aplica" || r.dependiente.norma.length > 0) &&
    (r.autonomo.estado === "no-aplica" || r.autonomo.norma.length > 0);
  check(`«${s.id}» cita la norma en cada puerta con veredicto`, conNorma);
}

if (fallas > 0) {
  console.error(`\n❌ ${fallas} falla(s) en los checks de afiliación previsional.`);
  process.exit(1);
}
console.log("\n✅ Todos los checks de afiliación previsional OK (Ley 24.241, arts. 2º, 3º y 4º).");
