import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  const kaart = ctx.locale.endsWith("BE") ? "kredietkaart" : "creditcard";
  const naam = `${kaart[0].toUpperCase()}${kaart.slice(1)}schuld aflossen`;
  return {
    h1: naam,
    title: tituloQueEntre(`${naam} in ${ctx.nombrePais}`, naam),
    description: `Bereken hoeveel maanden je nodig hebt om je ${kaart} af te lossen en hoeveel rente je betaalt, met een vast bedrag of het minimum.`,
    intro: [
      `Een ${kaart} is meestal je duurste schuld. Betaal je alleen het minimum, dan duurt het jaren en loopt de rente flink op.`,
      "Vul het saldo in, de jaarrente en wat je per maand kunt betalen. Je ziet wanneer je klaar bent, hoeveel rente je betaalt en het plan per maand.",
    ],
    comoSeCalcula: [
      "Elke maand komt er rente bij: saldo × jaarrente ÷ 12.",
      "Daarna gaat je betaling eraf. Bij het minimum is de betaling een percentage van wat je schuldig bent, met een ondergrens.",
      "Dat herhaalt zich tot het saldo op nul staat. Is je betaling niet hoger dan de rente, dan daalt de schuld nooit.",
    ],
    ejemplo: [
      `Een saldo van ${m(saldo)} tegen 22% rente per jaar, met ${m(fijo)} per maand, is in ${conFijo.meses} maanden afgelost. Je betaalt dan ${m(conFijo.intereses)} aan rente.`,
      `Betaal je alleen een minimum van 3%, dan duurt het ${conMinimo.meses} maanden en stijgt de rente naar ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Wat gebeurt er als je alleen het minimum betaalt?",
        respuesta:
          "Het minimum zakt mee met het saldo. Je betaalt dus elke maand minder en de schuld sleept jaren door. Betaal als het kan een hoger vast bedrag, ook al is het maar een beetje meer.",
      },
      {
        pregunta: "Moet je de schuld oversluiten naar een persoonlijke lening?",
        respuesta: `Is de rente van de lening een stuk lager dan die van je ${kaart}, dan loont het meestal. Vergelijk de totale rente van beide, met alle kosten erbij.`,
      },
      {
        pregunta: "Welke kaart los je als eerste af?",
        respuesta: "Betaal op alle kaarten het minimum en zet de rest op de kaart met de hoogste rente. Zo betaal je in totaal de minste rente.",
      },
    ],
    glosario: [
      { termino: "Minimumbedrag", definicion: "Het minste dat je per maand mag betalen zonder boete. Daarmee los je de schuld niet af." },
      { termino: "Jaarrente", definicion: "De rente per jaar die de kaart rekent over het saldo dat openstaat." },
    ],
  };
};
