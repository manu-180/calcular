import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  const staat = ctx.locale === "nl-NL" ? "de AOW" : ctx.locale.endsWith("BE") ? "het wettelijk pensioen" : "een pensioen van de overheid";
  return {
    h1: "Sparen voor je pensioen",
    title: tituloQueEntre(`Sparen voor je pensioen in ${ctx.nombrePais}`, "Sparen voor je pensioen berekenen", "Sparen voor je pensioen"),
    description: "Zie hoeveel je voor je pensioen kunt opbouwen met een vaste inleg per maand en welk inkomen per maand dat oplevert, in geld van vandaag.",
    intro: [
      `Met alleen ${staat} hou je vaak niet hetzelfde leven als nu. Eigen spaargeld, ook een klein bedrag, maakt veel verschil als je er vroeg mee begint.`,
      "Vul je leeftijd in, wanneer je wilt stoppen met werken, wat je al hebt en wat je per maand kunt inleggen. Je ziet je spaargeld bij je pensioen en hoeveel je er per maand uit kunt halen.",
    ],
    comoSeCalcula: [
      "Het spaargeld groeit elke maand met het reële rendement: het rendement min de inflatie. Zo blijft de uitkomst in geld van vandaag.",
      "Bij je pensioen wordt het spaargeld in gelijke bedragen per maand uitgekeerd over het aantal jaar dat je kiest. Wat er nog staat, blijft intussen renderen.",
      "Pensioen van de overheid, belastingen en beleggingskosten zitten er niet in.",
    ],
    ejemplo: [
      `Heb je op je 30e ${m(actual)} gespaard en leg je ${m(aporte)} per maand in tegen 4% reëel rendement, dan heb je op je 65e ${m(capital30)}. Daarmee heb je 25 jaar lang ${m(rentaMensual(capital30, 4, 25))} per maand.`,
      `Begin je op je 40e met dezelfde bedragen, dan kom je op ${m(capital40)}. Die tien jaar maken veel verschil.`,
    ],
    faq: [
      {
        pregunta: "Wat is reëel rendement?",
        respuesta: "Dat is wat een belegging oplevert na inflatie. Levert een belegging 7% op en is de inflatie 3%, dan is het reële rendement ongeveer 4%.",
      },
      {
        pregunta: `Komt dit in plaats van ${staat}?`,
        respuesta: "Nee. Dit is je eigen spaargeld, bovenop een pensioen van de overheid of via je werkgever. Hoeveel je daarvan krijgt, kun je opvragen bij de instantie in je land.",
      },
      {
        pregunta: "Hoeveel moet je sparen voor je pensioen?",
        respuesta: "Daar is geen vast bedrag voor. Een veelgebruikte vuistregel is 10% tot 15% van wat je verdient. Het belangrijkste is zo vroeg mogelijk beginnen.",
      },
    ],
    glosario: [
      { termino: "Reëel rendement", definicion: "Wat een belegging oplevert boven de inflatie." },
      { termino: "Geld van vandaag", definicion: "Een bedrag in de toekomst, uitgedrukt in wat je er nu mee zou kunnen kopen." },
    ],
  };
};
