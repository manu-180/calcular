import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "mijl" : "kilometer";
  return {
    h1: "Autokosten berekenen",
    title: tituloQueEntre(`Autokosten berekenen in ${ctx.nombrePais}`, "Autokosten berekenen"),
    description: `Bereken wat je auto echt kost per maand, per jaar en per ${unidad}: brandstof, verzekering, onderhoud, parkeren en het waardeverlies.`,
    intro: [
      "De meeste mensen weten wat ze aan brandstof kwijt zijn. Weinig mensen tellen de verzekering, het onderhoud, het parkeren en vooral het waardeverlies erbij op.",
      "Vul je kosten in en je ziet wat je auto je echt kost. Handig als je twijfelt tussen kopen, wisselen of een andere manier van reizen.",
    ],
    comoSeCalcula: [
      imperial
        ? "Brandstof per maand = mijl per maand ÷ mijl per gallon × prijs per gallon."
        : "Brandstof per maand = kilometers per maand × liter per 100 km ÷ 100 × prijs per liter.",
      "Waardeverlies per maand = waarde van de auto × waardeverlies per jaar ÷ 12.",
      "Echte kosten = brandstof + verzekering + onderhoud + parkeren + overige kosten + waardeverlies.",
      `Kosten per ${unidad} = echte kosten per maand ÷ afstand die je in die maand rijdt.`,
    ],
    ejemplo: [
      `Een auto van ${m(g.precio)} waarmee je ${formatearNumero(ctx, g.distancia)} ${imperial ? "mijl" : "km"} per maand rijdt, kost je ${m(mensual)} per maand, met het waardeverlies erbij.`,
      `Dat is ${m(mensual * 12)} per jaar en ${formatearMonto(ctx, mensual / g.distancia)} per ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Wat is waardeverlies van een auto?",
        respuesta: "Dat is de waarde die een auto met de tijd verliest. Je betaalt het niet elke maand, maar je merkt het als je hem verkoopt. Bij een nieuwe auto is het vaak de grootste kostenpost.",
      },
      {
        pregunta: "Waarom telt het maandbedrag van mijn lening niet mee?",
        respuesta:
          "Een deel van dat bedrag betaalt de auto zelf, en die zit al in het waardeverlies. Tel je allebei mee, dan tel je de auto twee keer. De rente op de lening komt er wel bovenop.",
      },
      {
        pregunta: "Hoe maak je je auto goedkoper?",
        respuesta:
          "Vergelijk elk jaar je autoverzekering, hou de bandenspanning en het onderhoud bij en wissel niet te vaak van auto: in de eerste jaren verliest hij het meest aan waarde.",
      },
    ],
    glosario: [
      { termino: "Waardeverlies", definicion: "De waarde die een auto verliest door de tijd en het gebruik. Ook wel afschrijving genoemd." },
      { termino: `Kosten per ${unidad}`, definicion: `Wat elke gereden ${unidad} gemiddeld kost, met alle kosten erbij.` },
    ],
  };
};
