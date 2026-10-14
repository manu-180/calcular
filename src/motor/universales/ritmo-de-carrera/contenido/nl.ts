import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "mijl" : "kilometer";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  return {
    h1: "Hardlooptempo berekenen",
    title: tituloQueEntre(`Hardlooptempo berekenen in ${ctx.nombrePais}`, "Hardlooptempo berekenen"),
    description: `Bereken je tempo per ${u}, je eindtijd of je afstand voor de 5 km, 10 km, halve marathon of marathon.`,
    intro: [
      "Met twee van de drie gegevens (afstand, tijd en tempo) krijg je het derde. Handig om een wedstrijd te plannen of een training te checken.",
      "De 5 km, 10 km, halve marathon en marathon staan er al in.",
    ],
    comoSeCalcula: [
      `Tempo = tijd ÷ afstand, in minuten en seconden per ${u}.`,
      "Tijd = tempo × afstand.",
      "Afstand = tijd ÷ tempo. De gemiddelde snelheid is de afstand gedeeld door het aantal uren.",
    ],
    ejemplo: imperial
      ? [
          `3 mijl in 27 minuten is een tempo van ${ritmoTexto(27 * 20)} per mijl, met ${n(3 / (27 / 60), 2)} mph.`,
          `Een halve marathon (${n(media, 2)} mi) in een tempo van ${ritmoTexto(ritmoMedia)} per mijl loop je in ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          `10 km in 50 minuten is een tempo van ${ritmoTexto(50 * 6)} per km, met ${n(10 / (50 / 60))} km/u.`,
          `Een halve marathon (${n(media, 1)} ${corto}) in een tempo van ${ritmoTexto(ritmoMedia)} per km loop je in ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Hoe reken je je tempo per ${u} uit?`,
        respuesta: imperial
          ? `Zet de tijd om in minuten en deel door het aantal mijl. 3 mijl in 28 minuten en 30 seconden is ${n(28.5 / 3, 1)} minuut per mijl, dus ${ritmoTexto((28.5 * 60) / 3)}.`
          : `Zet de tijd om in minuten en deel door het aantal kilometers. 10 km in 55 minuten is ${n(55 / 10, 1)} minuut per km, dus ${ritmoTexto((55 * 60) / 10)}.`,
      },
      {
        pregunta: "Wat is een goed tempo als je net begint?",
        respuesta: "Een tempo waarbij je tijdens het lopen nog kunt praten. Naarmate je conditie beter wordt, gaat dat tempo vanzelf omhoog.",
      },
      {
        pregunta: "Hoe lang is een marathon?",
        respuesta: `${n(DISTANCIAS_KM.maraton, 3)} km (${n(DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} mijl). Een halve marathon is de helft daarvan.`,
      },
    ],
    glosario: [
      { termino: "Tempo", definicion: "Hoe lang je over één kilometer of één mijl doet." },
      { termino: "Gemiddelde snelheid", definicion: "De afstand die je per uur aflegt." },
    ],
  };
};
