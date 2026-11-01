import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Kalkulator ovulacioni",
    title: tituloQueEntre(`Kalkulator ovulacioni: ${ctx.nombrePais}`, "Kalkulator ovulacioni dhe ditësh pjellore", "Kalkulator ovulacioni"),
    description: "Zbuloni ditën e përllogaritur të ovulacionit, ditët pjellore dhe datën e menstruacioneve të ardhshme, me tre ciklet e ardhshme.",
    intro: [
      "Vendosni ditën e parë të menstruacioneve të fundit dhe gjatësinë e ciklit. Shikoni ovulacionin e përllogaritur, ditët pjellore dhe menstruacionet e ardhshme.",
      "Është një përllogaritje për cikle të rregullta, me qëllim informues. Nuk është metodë kontraceptive dhe nuk zëvendëson konsultën me një mjek.",
    ],
    comoSeCalcula: [
      `Ovulacioni ndodh zakonisht ${FASE_LUTEA} ditë para menstruacioneve të ardhshme: dita e parë e menstruacioneve të fundit + gjatësia e ciklit − ${FASE_LUTEA}.`,
      "Ditët pjellore nisin 5 ditë para ovulacionit dhe zgjasin deri një ditë pas tij, sepse spermatozoidet mund të jetojnë deri në 5 ditë.",
      "Menstruacionet e ardhshme priten një cikël pas të fundit.",
    ],
    ejemplo: [
      `Me menstruacionet e fundit më ${f(fum)} dhe një cikël prej 28 ditësh, ovulacioni i përllogaritur është më ${f(aFecha(v.ovulacion))}.`,
      `Ditët pjellore janë nga ${f(aFecha(v.desde))} deri më ${f(aFecha(v.hasta))}, ndërsa menstruacionet e ardhshme priten më ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Cilat janë ditët më pjellore?",
        respuesta: "Dy ose tre ditët para ovulacionit dhe dita e ovulacionit. E gjithë dritarja pjellore zgjat rreth 6 ditë.",
      },
      {
        pregunta: "A funksionon nëse cikli është i parregullt?",
        respuesta: "Jep një ide, por më pak të saktë. Te ciklet e parregullta, ovulacioni mund të zhvendoset disa ditë nga një muaj në tjetrin.",
      },
      {
        pregunta: "A mund të përdoret për të shmangur një shtatzëni?",
        respuesta: "Jo. Përllogaritja është e përafërt dhe ovulacioni mund të vijë më herët ose më vonë. Për të parandaluar një shtatzëni, përdorni një metodë kontraceptive dhe kërkoni këshillën e mjekut.",
      },
    ],
    glosario: [
      { termino: "Ovulacion", definicion: "Momenti kur një vezore çliron një vezë." },
      { termino: "Ditë pjellore", definicion: "Ditët e ciklit kur është e mundur një shtatzëni." },
    ],
  };
};
