import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Ovulatie berekenen",
    title: tituloQueEntre(`Ovulatie berekenen in ${ctx.nombrePais}`, "Ovulatie berekenen"),
    description: "Bereken wanneer je eisprong is, welke dagen je vruchtbaar bent en wanneer je volgende menstruatie komt. Met de drie cycli daarna.",
    intro: [
      "Vul de eerste dag van je laatste menstruatie in en hoe lang je cyclus is. Je ziet je geschatte eisprong, je vruchtbare dagen en je volgende menstruatie.",
      "Het is een schatting voor een regelmatige cyclus. Het is geen anticonceptiemethode en het vervangt niet het advies van een arts.",
    ],
    comoSeCalcula: [
      `De eisprong is meestal ${FASE_LUTEA} dagen voor de volgende menstruatie: eerste dag van je laatste menstruatie + lengte van je cyclus − ${FASE_LUTEA}.`,
      "Je vruchtbare periode loopt van 5 dagen voor de eisprong tot de dag erna, omdat zaadcellen tot 5 dagen kunnen overleven.",
      "Je volgende menstruatie komt één cyclus na de vorige.",
    ],
    ejemplo: [
      `Was je laatste menstruatie op ${f(fum)} en is je cyclus 28 dagen, dan is je eisprong naar schatting op ${f(aFecha(v.ovulacion))}.`,
      `Je bent vruchtbaar van ${f(aFecha(v.desde))} tot en met ${f(aFecha(v.hasta))}. Je volgende menstruatie komt rond ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Wat zijn je meest vruchtbare dagen?",
        respuesta: "De twee of drie dagen voor de eisprong en de dag van de eisprong zelf. De hele vruchtbare periode duurt ongeveer 6 dagen.",
      },
      {
        pregunta: "Werkt het ook bij een onregelmatige cyclus?",
        respuesta: "Het geeft je een idee, maar minder precies. Bij een onregelmatige cyclus kan de eisprong per maand een paar dagen verschuiven.",
      },
      {
        pregunta: "Kan ik dit gebruiken om niet zwanger te worden?",
        respuesta: "Nee. De schatting is niet exact en de eisprong kan eerder of later komen. Wil je een zwangerschap voorkomen, gebruik dan anticonceptie.",
      },
    ],
    glosario: [
      { termino: "Eisprong", definicion: "Het moment waarop een eierstok een eicel loslaat. Ook wel ovulatie genoemd." },
      { termino: "Vruchtbare dagen", definicion: "De dagen in je cyclus waarop je zwanger kunt worden." },
    ],
  };
};
