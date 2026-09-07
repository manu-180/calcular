// Verificación de los plazos de la comisión médica (Ley 27.348).
// Correr con: npx tsx scripts/check_comision_medica.ts
//
// LO QUE ESTE CHECK EXISTE PARA IMPEDIR:
//
//   1. **Que los 60 días hábiles se cuenten como corridos.** Es el error más probable y el más
//      caro: 60 días corridos caen casi tres semanas antes que 60 hábiles. Alguien que confíe en
//      la fecha temprana inicia la demanda cuando la vía todavía no está expedita y se expone a
//      que le opongan la falta de agotamiento de la instancia administrativa. El check exige que
//      el vencimiento caiga estrictamente después de los 60 días corridos y que entre la
//      presentación y el vencimiento haya exactamente 60 días hábiles.
//   2. **Que el día del vencimiento se dé por vencido.** La ley dice «DENTRO de los sesenta (60)
//      días hábiles»: ese día la comisión todavía está en plazo. Un `>=` en vez de un `>` habilita
//      la vía judicial un día antes de tiempo.
//   3. **Que se pierda la excepción del trabajador no registrado.** El art. 1° párrafo 3 exime de
//      la instancia a quien trabajaba sin registrar para un empleador sin ART. Publicar la
//      obligación sin la excepción manda a un trabajador en negro a un trámite que la ley no le
//      exige.
//   4. **Que se colapsen los DOS topes de la ILT en uno.** Sin recaídas son dos años de
//      calendario (art. 7° ap. 2 inc. c); con recaída son 730 días EFECTIVOS de baja sumando
//      períodos (ap. 3). Publicar sólo el primero le recorta meses de cobro a quien recayó.
//   5. **Que las citas textuales se parafraseen.** La página muestra el texto de la ley entre
//      comillas. Si alguien lo "mejora", deja de ser una cita. Se verifica que cada texto
//      contenga las frases que lo hacen decir lo que dice.
//   6. **Que un día no hábil salga como fecha de vencimiento.** Ninguna fecha calculada por el
//      motor puede caer en sábado, domingo o feriado.

import {
  ANIOS_ILT,
  CM_FUENTES,
  CM_TEXTOS,
  CM_VIGENCIA,
  CUOTAS_PARA_EXTINGUIR,
  DIAS_ILT_EFECTIVOS,
  DIAS_PAGO_HOMOLOGACION,
  ETAPAS,
  MESES_ESPECIE_TRAS_EXTINCION,
  PLAZO_DICTAMEN_HABILES,
  REGLAS_CM,
} from "../src/data/comision-medica";
import { calcularComisionMedica, habilesEntre, sumarHabiles } from "../src/lib/comision-medica";
import { esHabil } from "../src/lib/feriados";
import { aISO, diasEntre, parseFechaISO, sumarDias } from "../src/lib/licencias";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FALLA ${nombre}`, detalle ?? "");
  }
}

// --- 1. Las constantes son las de la ley ------------------------------------------------------
check("el plazo del art. 3 son 60 días hábiles", PLAZO_DICTAMEN_HABILES === 60, PLAZO_DICTAMEN_HABILES);
check("el pago tras la homologación son 5 días", DIAS_PAGO_HOMOLOGACION === 5, DIAS_PAGO_HOMOLOGACION);
check("la ILT tiene tope de 2 años", ANIOS_ILT === 2, ANIOS_ILT);
check("el tope efectivo de la ILT son 730 días", DIAS_ILT_EFECTIVOS === 730, DIAS_ILT_EFECTIVOS);
check(
  "la extinción de la afiliación son 2 cuotas y 3 meses de prestaciones en especie",
  CUOTAS_PARA_EXTINGUIR === 2 && MESES_ESPECIE_TRAS_EXTINCION === 3,
  [CUOTAS_PARA_EXTINGUIR, MESES_ESPECIE_TRAS_EXTINCION],
);

// --- 2. El contador de días hábiles ------------------------------------------------------------
// El 1 de enero es feriado inamovible en cualquier año: el primer hábil de 2026 no puede ser el 1.
const finDeAnio = parseFechaISO("2025-12-31")!;
check(
  "sumarHabiles saltea el 1 de enero",
  aISO(sumarHabiles(finDeAnio, 1)) !== "2026-01-01",
  aISO(sumarHabiles(finDeAnio, 1)),
);

// Un viernes + 1 hábil tiene que caer el lunes siguiente (si no hay feriado en el medio).
const viernes = parseFechaISO("2026-06-05")!; // viernes
check("el viernes 2026-06-05 es hábil", esHabil(viernes, false), aISO(viernes));
const lunes = sumarHabiles(viernes, 1);
check(
  "viernes + 1 hábil cae el lunes siguiente",
  aISO(lunes) === "2026-06-08",
  aISO(lunes),
);

// Ninguna fecha que devuelva el contador puede ser no hábil.
for (let n = 1; n <= 70; n++) {
  const d = sumarHabiles(viernes, n);
  if (!esHabil(d, false)) {
    check(`sumarHabiles(${n}) devuelve un día hábil`, false, aISO(d));
    break;
  }
}
check("sumarHabiles siempre devuelve un día hábil (1..70)", true);

// habilesEntre es la inversa exacta de sumarHabiles.
check(
  "habilesEntre invierte a sumarHabiles",
  habilesEntre(viernes, sumarHabiles(viernes, 37)) === 37,
  habilesEntre(viernes, sumarHabiles(viernes, 37)),
);

// --- 3. El plazo del art. 3, contado como manda la ley -----------------------------------------
const presentacionISO = "2026-06-05";
const presentacion = parseFechaISO(presentacionISO)!;
const base = calcularComisionMedica({ presentacionISO, hoyISO: presentacionISO })!;
check("el motor devuelve resultado con datos válidos", base !== null);

const vencimiento = parseFechaISO(base.vencimientoISO)!;
check(
  "entre la presentación y el vencimiento hay exactamente 60 días hábiles",
  habilesEntre(presentacion, vencimiento) === PLAZO_DICTAMEN_HABILES,
  habilesEntre(presentacion, vencimiento),
);
check(
  "el vencimiento cae DESPUÉS de los 60 días corridos (no se cuentan corridos)",
  vencimiento > sumarDias(presentacion, PLAZO_DICTAMEN_HABILES),
  { vencimiento: base.vencimientoISO, corridos: aISO(sumarDias(presentacion, 60)) },
);
check(
  "el vencimiento cae dentro de un rango razonable (80 a 100 días corridos)",
  diasEntre(presentacion, vencimiento) >= 80 && diasEntre(presentacion, vencimiento) <= 100,
  diasEntre(presentacion, vencimiento),
);
check("el vencimiento es un día hábil", esHabil(vencimiento, false), base.vencimientoISO);

const alternativo = parseFechaISO(base.vencimientoAlternativoISO)!;
check(
  "la lectura alternativa cae exactamente un día hábil antes",
  habilesEntre(alternativo, vencimiento) === 1,
  [base.vencimientoAlternativoISO, base.vencimientoISO],
);

const expedita = parseFechaISO(base.viaExpeditaISO)!;
check(
  "la vía judicial se habilita el primer hábil DESPUÉS del vencimiento",
  habilesEntre(vencimiento, expedita) === 1 && esHabil(expedita, false),
  base.viaExpeditaISO,
);

// --- 4. El borde del vencimiento ---------------------------------------------------------------
const enElDia = calcularComisionMedica({ presentacionISO, hoyISO: base.vencimientoISO })!;
check(
  "el día del vencimiento el plazo TODAVÍA no está vencido (dentro de los 60)",
  enElDia.vencido === false,
  enElDia.vencido,
);
check(
  "ese día quedan 0 días hábiles y ya transcurrieron los 60",
  enElDia.habilesRestantes === 0 && enElDia.habilesTranscurridos === PLAZO_DICTAMEN_HABILES,
  [enElDia.habilesRestantes, enElDia.habilesTranscurridos],
);
const alDiaSiguiente = calcularComisionMedica({
  presentacionISO,
  hoyISO: base.viaExpeditaISO,
})!;
check("al día hábil siguiente el plazo está vencido", alDiaSiguiente.vencido === true);
check(
  "vencido avisa que la vía queda expedita sin esperar dictamen",
  alDiaSiguiente.avisos.some((a) => a.texto.includes("perentorios")),
);

// --- 5. La excepción del trabajador no registrado ----------------------------------------------
const exento = calcularComisionMedica({
  presentacionISO,
  hoyISO: presentacionISO,
  noRegistrado: true,
})!;
check("el no registrado queda marcado como exento", exento.exento === true);
check(
  "y se le avisa que tiene la vía judicial expedita",
  exento.avisos.some((a) => a.texto.includes("vía judicial expedita")),
);
check(
  "hay una regla publicada sobre la exención del no registrado",
  REGLAS_CM.some((r) => r.id === "no-registrado" && r.norma.includes("art. 1°")),
);

// --- 6. Los DOS topes de la ILT ----------------------------------------------------------------
const conILT = calcularComisionMedica({
  presentacionISO: "2026-03-02",
  hoyISO: "2026-09-07",
  primeraManifestacionISO: "2026-01-15",
})!;
check("sin recaída, el tope de la ILT es de calendario", conILT.ilt !== null);
check(
  "y cae exactamente dos años después de la primera manifestación",
  conILT.ilt!.topeCalendarioISO === "2028-01-15",
  conILT.ilt!.topeCalendarioISO,
);
check(
  "sin recaída no se informa un saldo de días efectivos",
  conILT.ilt!.diasEfectivosRestantes === null,
  conILT.ilt!.diasEfectivosRestantes,
);

const conRecaida = calcularComisionMedica({
  presentacionISO: "2026-03-02",
  hoyISO: "2026-09-07",
  primeraManifestacionISO: "2026-01-15",
  huboRecaida: true,
  diasEfectivosAcumulados: 240,
})!;
check(
  "con recaída el tope se mide en días efectivos, no en calendario",
  conRecaida.ilt!.diasEfectivosRestantes === DIAS_ILT_EFECTIVOS - 240,
  conRecaida.ilt!.diasEfectivosRestantes,
);
check(
  "y se avisa que no hay fecha de cese posible",
  conRecaida.avisos.some((a) => a.texto.includes("no se puede dar una fecha de cese")),
);
check(
  "el saldo de días efectivos nunca es negativo",
  calcularComisionMedica({
    presentacionISO: "2026-03-02",
    hoyISO: "2026-09-07",
    primeraManifestacionISO: "2020-01-15",
    huboRecaida: true,
    diasEfectivosAcumulados: 5000,
  })!.ilt!.diasEfectivosRestantes === 0,
);

// --- 7. El plazo de pago tras la homologación --------------------------------------------------
const conHomologacion = calcularComisionMedica({
  presentacionISO,
  hoyISO: presentacionISO,
  homologacionISO: "2026-06-10",
})!;
check(
  "los 5 días corridos se cuentan sin saltear días",
  conHomologacion.pagoHomologacionISO === "2026-06-15",
  conHomologacion.pagoHomologacionISO,
);
check(
  "la lectura en días hábiles cae igual o más tarde que la de corridos",
  parseFechaISO(conHomologacion.pagoHomologacionHabilesISO!)! >=
    parseFechaISO(conHomologacion.pagoHomologacionISO!)!,
  [conHomologacion.pagoHomologacionISO, conHomologacion.pagoHomologacionHabilesISO],
);
check(
  "se declara que el Anexo no aclara si son corridos o hábiles",
  conHomologacion.avisos.some((a) => a.texto.includes("no aclara")),
);
check(
  "sin homologación declarada no se inventa una fecha de pago",
  base.pagoHomologacionISO === null && base.pagoHomologacionHabilesISO === null,
);

// --- 8. Entradas inválidas ---------------------------------------------------------------------
check(
  "una consulta anterior a la presentación no devuelve resultado",
  calcularComisionMedica({ presentacionISO: "2026-06-05", hoyISO: "2026-06-01" }) === null,
);
check(
  "una fecha basura no devuelve resultado",
  calcularComisionMedica({ presentacionISO: "no-es-fecha", hoyISO: presentacionISO }) === null,
);

// --- 9. Las citas textuales siguen siendo citas ------------------------------------------------
const CITAS: [string, string][] = [
  ["obligatoria", "obligatorio y excluyente de toda otra intervención"],
  ["noRegistrado", "cuentan con la vía judicial expedita"],
  ["honorarios", "estarán a cargo de la respectiva aseguradora"],
  ["plazo", "sesenta (60) días hábiles administrativos"],
  ["plazo", "Todos los plazos resultarán perentorios"],
  ["pruebaGratuita", "serán gratuitas para el trabajador"],
  ["cuotaLitis", "No podrán ser objeto de pactos de cuota litis"],
  ["pisoHomologacion", "En ningún caso se homologará"],
  ["pagoHomologacion", "dentro de los cinco (5) días de notificado el acto"],
  ["accionCivil", "agotada la vía administrativa"],
  ["iltEfectiva", "dos (2) años efectivos de baja, sumándose todos los períodos"],
];
for (const [clave, frase] of CITAS) {
  const texto = (CM_TEXTOS as Record<string, string>)[clave];
  check(`la cita «${clave}» conserva «${frase.slice(0, 40)}…»`, texto.includes(frase), texto?.slice(0, 80));
}

// --- 10. El contenido publicado ----------------------------------------------------------------
check("el trámite se publica en 5 etapas", ETAPAS.length === 5, ETAPAS.length);
check(
  "cada etapa cita el artículo que la manda",
  ETAPAS.every((e) => e.norma.includes("Ley 27.348") || e.norma.includes("Ley 24.557")),
);
check("hay al menos 10 reglas publicadas", REGLAS_CM.length >= 10, REGLAS_CM.length);
check(
  "está publicada la prohibición del pacto de cuota litis",
  REGLAS_CM.some((r) => r.id === "cuota-litis"),
);
check(
  "está publicado el piso de la homologación",
  REGLAS_CM.some((r) => r.id === "piso-homologacion"),
);
check(
  "ninguna regla se publica sin norma",
  REGLAS_CM.every((r) => r.norma.trim().length > 0),
);

// --- 11. Fuentes ------------------------------------------------------------------------------
check(
  "la fecha de consulta de las fuentes coincide con la de vigencia",
  CM_FUENTES.consultadoEl === CM_VIGENCIA.consultadoEl,
  [CM_FUENTES.consultadoEl, CM_VIGENCIA.consultadoEl],
);
check("hay al menos 3 fuentes oficiales", CM_FUENTES.lista.length >= 3, CM_FUENTES.lista.length);
check(
  "todas las fuentes son de infoleg.gob.ar por https",
  CM_FUENTES.lista.every((f) => f.url.startsWith("https://") && f.url.includes("infoleg.gob.ar")),
);
check(
  "la fuente principal es el texto ACTUALIZADO, no el original",
  CM_FUENTES.principal.url.includes("texact.htm"),
  CM_FUENTES.principal.url,
);

if (fallas > 0) {
  console.error(`\n❌ ${fallas} falla(s) en los checks de la comisión médica.`);
  process.exit(1);
}
console.log("\n✅ Todos los checks de la comisión médica OK (Ley 27.348 arts. 1 a 3, 10 a 17 y Anexo I).");
