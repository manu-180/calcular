// Verificación del plazo y la vía frente al rechazo de una contingencia por la ART.
// Correr con: npx tsx scripts/check_rechazo_art.ts
//
// LO QUE ESTE CHECK EXISTE PARA IMPEDIR:
//
//   1. Que los diez días hábiles administrativos se conviertan en diez días corridos.
//   2. Que la prórroga se trate como veinte días automáticos aunque se haya avisado tarde.
//   3. Que el rechazo por desconocimiento de la relación laboral se mande a comisión médica.
//   4. Que un sábado se cuente como hábil administrativo.
//   5. Que una causal ajena a la lista taxativa del art. 6º parezca válida.

import {
  CAUSALES_RECHAZO,
  EMPLEADOR_CHICO_EMPLEADOS,
  PLAZO_PRESTADOR_HORAS,
  PLAZO_RECHAZO_HABILES,
  PRESCRIPCION_ANIOS,
  PRORROGA_HABILES,
  QUIEN_PUEDE_DENUNCIAR,
  RECHAZO_FUENTES,
  RECHAZO_TEXTOS,
  VIGENCIA_RECHAZO,
} from "../src/data/rechazo-art";
import { calcularRechazoArt, type Entrada } from "../src/lib/rechazo-art";

let fallas = 0;
let asserts = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  asserts++;
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FALLA ${nombre}`, detalle ?? "");
  }
}

const caso = (extra: Partial<Entrada> = {}): Entrada => ({
  fechaDenuncia: "2026-09-01",
  prorrogaNotificada: false,
  rechazoNotificado: false,
  causal: "c",
  empleadorReconoceRelacion: true,
  hoy: "2026-09-10",
  ...extra,
});

const finDeSemana = calcularRechazoArt(caso());
check("el cómputo empieza al día siguiente de la denuncia", finDeSemana.diasHabilesContados[0] === "2026-09-02");
check("diez hábiles desde el 1/9/2026 vencen el 15/9/2026", finDeSemana.vencimientoBase === "2026-09-15", finDeSemana.vencimientoBase);
check("diez corridos habrían vencido el 11/9 y NO es la fecha legal", finDeSemana.vencimientoBase !== "2026-09-11");
check("la lista contiene exactamente diez hábiles", finDeSemana.diasHabilesContados.length === 10);
check("el sábado 5/9 no está contado", !finDeSemana.diasHabilesContados.includes("2026-09-05"));
check("el domingo 6/9 no está contado", !finDeSemana.diasHabilesContados.includes("2026-09-06"));
check("el sábado 12/9 tampoco está contado", !finDeSemana.diasHabilesContados.includes("2026-09-12"));
check("sin rechazo antes del vencimiento sigue en plazo", finDeSemana.veredicto === "en-plazo-todavia");
check("al 10/9 faltan tres días hábiles", finDeSemana.habilesRestantes === 3, finDeSemana.habilesRestantes);

const conFeriado = calcularRechazoArt(caso({ fechaDenuncia: "2026-08-03", hoy: "2026-08-10" }));
check("con el feriado del 17/8 el décimo hábil es el 18/8", conFeriado.vencimientoBase === "2026-08-18", conFeriado.vencimientoBase);
check("el 17/8 no se cuenta", !conFeriado.diasHabilesContados.includes("2026-08-17"));
check("el viernes 14/8 es el noveno hábil", conFeriado.diasHabilesContados[8] === "2026-08-14");
check("el martes 18/8 es el décimo hábil", conFeriado.diasHabilesContados[9] === "2026-08-18");

const prorrogaUltimoDia = calcularRechazoArt(caso({
  prorrogaNotificada: true,
  fechaProrroga: "2026-09-15",
  hoy: "2026-09-20",
}));
check("la prórroga avisada el último día es válida", prorrogaUltimoDia.prorrogaValida);
check("la prórroga agrega otros diez hábiles", prorrogaUltimoDia.vencimientoFinal === "2026-09-29", prorrogaUltimoDia.vencimientoFinal);
check("el vencimiento base no cambia por la prórroga", prorrogaUltimoDia.vencimientoBase === "2026-09-15");
check("el primer hábil de la prórroga es el día posterior", prorrogaUltimoDia.diasHabilesContados[10] === "2026-09-16");
check("la prórroga completa cuenta veinte hábiles", prorrogaUltimoDia.diasHabilesContados.length === 20);

const prorrogaTardia = calcularRechazoArt(caso({
  prorrogaNotificada: true,
  fechaProrroga: "2026-09-16",
  hoy: "2026-09-16",
}));
check("la prórroga avisada un día después es inválida", !prorrogaTardia.prorrogaValida);
check("una prórroga inválida no mueve el vencimiento", prorrogaTardia.vencimientoFinal === "2026-09-15");
check("el silencio ya aceptó la contingencia el día 16", prorrogaTardia.veredicto === "aceptado-por-silencio");
check("se explica que la prórroga llegó tarde", prorrogaTardia.avisos.some((a) => a.texto.includes("después") && a.texto.includes("no es válida")));

const rechazoEnBorde = calcularRechazoArt(caso({
  rechazoNotificado: true,
  fechaRechazo: "2026-09-15",
  hoy: "2026-09-20",
}));
check("el rechazo cursado el día del vencimiento está en plazo", rechazoEnBorde.veredicto === "rechazo-en-plazo");
check("el borde es inclusivo", rechazoEnBorde.fechaRechazoEnPlazo === true);

const rechazoTarde = calcularRechazoArt(caso({
  rechazoNotificado: true,
  fechaRechazo: "2026-09-16",
  hoy: "2026-09-20",
}));
check("el rechazo cursado un día después está fuera de plazo", rechazoTarde.veredicto === "aceptado-por-silencio");
check("el rechazo tardío no figura en plazo", rechazoTarde.fechaRechazoEnPlazo === false);
check("el resultado explica la aceptación por silencio", rechazoTarde.avisos.some((a) => a.texto.includes("aceptación") && a.tono === "bloqueante"));

const rechazoSinFecha = calcularRechazoArt(caso({
  rechazoNotificado: true,
  fechaRechazo: undefined,
  hoy: "2026-09-16",
}));
check("un rechazo marcado sin fecha no evita la aceptación por silencio", rechazoSinFecha.veredicto === "aceptado-por-silencio");
check("un rechazo marcado sin fecha genera aviso bloqueante", rechazoSinFecha.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("falta la fecha")));

const causalAReconocida = calcularRechazoArt(caso({ causal: "a", empleadorReconoceRelacion: true }));
check("la causal a con relación reconocida genera aviso bloqueante", causalAReconocida.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("reconocida por el empleador")));
check("la causal a nunca va a comisión médica", causalAReconocida.adondeVa === "autoridad-competente");
check("la causal a no exige el fundamento del art. 6º bis", causalAReconocida.exigeFundamento === false);

const causalADesconocida = calcularRechazoArt(caso({ causal: "a", empleadorReconoceRelacion: false }));
check("si el empleador desconoce la relación va a autoridad competente", causalADesconocida.adondeVa === "autoridad-competente");
check("ese caso dice expresamente que no va a comisión médica", causalADesconocida.avisos.some((a) => a.texto.includes("no da curso") || a.texto.includes("no interviene")));

const causalB = calcularRechazoArt(caso({ causal: "b" }));
check("la causal b va a comisión médica", causalB.adondeVa === "comision-medica");
check("la causal b exige fundamento", causalB.exigeFundamento);
check("la causal b cita el art. 6º bis", causalB.avisos.some((a) => a.texto.includes("6º bis")));

const causalC = calcularRechazoArt(caso({ causal: "c" }));
check("la causal c va a comisión médica", causalC.adondeVa === "comision-medica");
check("la causal c exige fundamento", causalC.exigeFundamento);
check("la causal c cita el art. 10 inc. 5", causalC.avisos.some((a) => a.texto.includes("10 inc. 5")));

const causalOtra = calcularRechazoArt(caso({ causal: "otra" }));
check("otro motivo queda sin encuadre", causalOtra.adondeVa === "sin-encuadre");
check("otro motivo no hereda el fundamento del art. 6º bis", causalOtra.exigeFundamento === false);
check("se avisa que las causales son taxativas", causalOtra.avisos.some((a) => a.texto.includes("taxativas") || a.texto.includes("sólo puede")));

check("siempre se aclara que son días hábiles administrativos", finDeSemana.avisos.some((a) => a.texto.includes("hábiles administrativos")));
check("siempre se advierte sobre los asuetos", finDeSemana.avisos.some((a) => a.texto.includes("asueto administrativo") && a.texto.includes("más temprano posible")));
check("2026 tiene calendario completo", finDeSemana.calendarioCompleto);
const calendarioIncompleto = calcularRechazoArt(caso({ fechaDenuncia: "2027-01-04", hoy: "2027-01-05" }));
check("2027 se marca como calendario incompleto", !calendarioIncompleto.calendarioCompleto);
check("el año incompleto no se presenta como certeza", calendarioIncompleto.avisos.some((a) => a.tono === "atencion" && a.texto.includes("calendario completo")));

check("el plazo legal base es diez", PLAZO_RECHAZO_HABILES === 10);
check("la prórroga legal es de otros diez", PRORROGA_HABILES === 10);
check("el prestador remite en 24 horas", PLAZO_PRESTADOR_HORAS === 24);
check("la prescripción es de dos años", PRESCRIPCION_ANIOS === 2);
check("el umbral de empleador chico es cinco", EMPLEADOR_CHICO_EMPLEADOS === 5);
check("hay tres causales de rechazo", CAUSALES_RECHAZO.length === 3);
check("las vías de las tres causales son autoridad, comisión, comisión", CAUSALES_RECHAZO.map((c) => c.vaA).join(",") === "autoridad-competente,comision-medica,comision-medica");
check("sólo b y c exigen fundamento", CAUSALES_RECHAZO.map((c) => c.exigeFundamento).join(",") === "false,true,true");
check("pueden denunciar cuatro clases de sujetos", QUIEN_PUEDE_DENUNCIAR.length === 4);
check("la vigencia comienza el 1/11/2015", VIGENCIA_RECHAZO.vigenciaDesde.startsWith("1 de noviembre de 2015"));
check("la consulta está fechada en septiembre de 2026", VIGENCIA_RECHAZO.consultadoEl === "9 de septiembre de 2026");
check("hay tres fuentes normativas", RECHAZO_FUENTES.lista.length === 3);
check("las fuentes tienen detalle", RECHAZO_FUENTES.lista.every((f) => f.detalle.length > 30));
check("el texto conserva el silencio como aceptación", RECHAZO_TEXTOS.art6Silencio.includes("El silencio de la Aseguradora se entenderá como aceptación"));
check("el texto conserva la condición temporal de la prórroga", RECHAZO_TEXTOS.art6Prorroga.includes("dentro del término de los DIEZ (10) días"));
check("el art. 36 bis conserva días hábiles administrativos", RECHAZO_TEXTOS.art36bis.includes("días hábiles administrativos"));
check("el art. 11 conserva la exclusión de relación laboral", RECHAZO_TEXTOS.art11.includes("no darán curso a las cuestiones relativas a la existencia de la relación laboral"));

for (const prorrogaNotificada of [false, true]) {
  for (const rechazoNotificado of [false, true]) {
    for (const empleadorReconoceRelacion of [false, true]) {
      for (const causal of ["a", "b", "c", "otra"] as const) {
        const r = calcularRechazoArt(caso({
          prorrogaNotificada,
          fechaProrroga: prorrogaNotificada ? "2026-09-15" : undefined,
          rechazoNotificado,
          fechaRechazo: rechazoNotificado ? "2026-09-15" : undefined,
          empleadorReconoceRelacion,
          causal,
        }));
        check(`combinación ${prorrogaNotificada}/${rechazoNotificado}/${empleadorReconoceRelacion}/${causal} devuelve veredicto`, r.veredicto !== undefined);
      }
    }
  }
}

check("mutación: contar diez corridos cambia 15/9 por 11/9", finDeSemana.vencimientoBase === "2026-09-15");
check("mutación: aceptar una prórroga tardía movería indebidamente el vencimiento", prorrogaTardia.vencimientoFinal === "2026-09-15");
check("mutación: mandar a) a comisión médica cambia la vía legal", causalADesconocida.adondeVa !== "comision-medica");
check("mutación: contar el sábado adelanta al 15/9 el caso iniciado el 3/9", calcularRechazoArt(caso({ fechaDenuncia: "2026-09-03" })).vencimientoBase === "2026-09-17");

check("el archivo ejecuta más de cincuenta asserts", asserts >= 50, asserts);

if (fallas > 0) {
  console.error(`\n❌ ${fallas} falla(s) en ${asserts} checks de rechazo de la ART.`);
  process.exit(1);
}
console.log(`\n✅ ${asserts} checks de rechazo de la ART OK.`);
