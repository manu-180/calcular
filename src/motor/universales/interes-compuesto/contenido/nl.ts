import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Rente op rente berekenen",
    title: tituloQueEntre(`Rente op rente berekenen in ${ctx.nombrePais}`, "Rente op rente berekenen"),
    description: "Zie hoe je geld groeit met rente op rente en een vaste inleg per maand. Je krijgt het eindbedrag, de ontvangen rente en een overzicht per jaar.",
    intro: [
      "Bij rente op rente komt de rente bij je saldo en levert die zelf ook weer rente op. Daarom groeit je spaargeld steeds sneller.",
      "Vul in wat je nu hebt, wat je elke maand kunt inleggen, de rente en het aantal jaar. Je ziet het eindbedrag en hoeveel daarvan rente is.",
    ],
    comoSeCalcula: [
      "Eindbedrag = startbedrag × (1 + i) tot de macht n + inleg × ((1 + i) tot de macht n − 1) ÷ i.",
      "Hier is i de maandrente die past bij de rentebijschrijving die je kiest, en n het aantal maanden.",
      "De inleg komt aan het eind van elke maand op de rekening.",
    ],
    ejemplo: [
      `Begin je met ${m(capital)} en leg je ${m(aporte)} per maand in tegen 7% per jaar, dan heb je na 10 jaar ${m(a10)}.`,
      `Ga je nog 10 jaar door, dan groeit het saldo naar ${m(a20)}. De tweede tien jaar leveren veel meer op dan de eerste.`,
    ],
    faq: [
      {
        pregunta: "Wat is het verschil tussen enkelvoudige rente en rente op rente?",
        respuesta:
          "Enkelvoudige rente reken je altijd over het oorspronkelijke bedrag. Rente op rente reken je over het bedrag plus de rente die je al ontvangen hebt.",
      },
      {
        pregunta: "Wat is de regel van 72?",
        respuesta: `Een vuistregel om te zien hoe lang het duurt voordat je geld verdubbelt: deel 72 door de rente per jaar. Bij 6% verdubbelt het in ongeveer ${formatearNumero(ctx, 72 / 6)} jaar.`,
      },
      {
        pregunta: "Met welke rente moet je rekenen?",
        respuesta:
          "Met een rente die realistisch is voor wat je met het geld gaat doen. Wil je de uitkomst in geld van vandaag zien, neem dan de rente min de verwachte inflatie.",
      },
    ],
    glosario: [
      { termino: "Rentebijschrijving", definicion: "Het moment waarop de rente bij je saldo wordt opgeteld." },
      { termino: "Rente op rente", definicion: "Rente over je saldo plus de rente die je al ontvangen hebt. Ook wel samengestelde interest genoemd." },
    ],
  };
};
