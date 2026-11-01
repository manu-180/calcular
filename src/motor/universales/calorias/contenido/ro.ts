import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Un bărbat de 35 de ani care cântărește 180 lb și are 5 ft 10 in are un metabolism bazal de aproximativ ${n(basal)} kcal.`,
          `Cu activitate redusă, își menține greutatea cu aproximativ ${n(basal * FACTORES.sedentaria)} kcal pe zi.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `O femeie de 30 de ani, cu 60 kg și 165 cm, are un metabolism bazal de aproximativ ${n(basal)} kcal.`,
          `Cu activitate moderată, își menține greutatea cu aproximativ ${n(basal * FACTORES.moderada)} kcal pe zi.`,
        ];
      })();
  return {
    h1: "Calculator calorii pe zi",
    title: tituloQueEntre(`Calculator calorii: ${ctx.nombrePais}`, "Calculator calorii pe zi", "Calculator calorii"),
    description: "Aflați câte calorii ardeți pe zi după vârstă, greutate, înălțime și activitate și câte să mâncați ca să vă mențineți, să slăbiți sau să vă îngrășați.",
    intro: [
      "Completați datele și nivelul de activitate. Vedeți metabolismul bazal și caloriile pe care le ardeți într-o zi obișnuită.",
      "Este o estimare orientativă și nu înlocuiește consultul unui medic sau al unui nutriționist.",
    ],
    comoSeCalcula: [
      `Metabolismul bazal (Mifflin-St Jeor): 10 × greutatea în kg + ${n(6.25, 2)} × înălțimea în cm − 5 × vârsta, plus 5 la bărbați sau minus 161 la femei.`,
      `Caloriile de menținere = metabolismul bazal × factorul de activitate, de la ${n(1.2, 1)} (activitate redusă) la ${n(1.9, 1)} (foarte intensă).`,
      `Pentru slăbit se scad ${DEFICIT} kcal pe zi, iar pentru îngrășat se adaugă ${SUPERAVIT}: o schimbare moderată, ușor de susținut.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Ce este metabolismul bazal?",
        respuesta: "Este energia pe care o folosește corpul în repaus complet ca să respire, să păstreze temperatura și să țină organele în funcțiune.",
      },
      {
        pregunta: "Câte calorii să mănânc ca să slăbesc?",
        respuesta: `Un punct de plecare des folosit este cu aproximativ ${DEFICIT} kcal pe zi sub caloriile de menținere. Cel mai bine stabiliți cifra împreună cu un specialist.`,
      },
      {
        pregunta: "Cât de precisă este formula?",
        respuesta: "Mifflin-St Jeor este una dintre cele mai folosite, dar dă o medie. Genetica, masa musculară și starea de sănătate schimbă ce ardeți de fapt.",
      },
    ],
    glosario: [
      { termino: "Calorie (kcal)", definicion: "Unitatea de energie din alimente și din ce arde corpul." },
      { termino: "Metabolism bazal", definicion: "Caloriile pe care le arde corpul în repaus complet." },
    ],
  };
};
