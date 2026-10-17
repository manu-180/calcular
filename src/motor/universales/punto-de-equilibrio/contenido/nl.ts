import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Break-evenpunt berekenen",
    title: tituloQueEntre(`Break-evenpunt berekenen in ${ctx.nombrePais}`, "Break-evenpunt berekenen"),
    description: "Bereken hoeveel stuks je moet verkopen en hoeveel omzet je per maand nodig hebt om je kosten te dekken, en om de winst te halen die je wilt.",
    intro: [
      "Het break-evenpunt is de omzet waarbij een bedrijf geen winst en geen verlies maakt. Zit je eronder, dan verlies je geld. Zit je erboven, dan begin je winst te maken.",
      "Vul je vaste kosten in, de verkoopprijs en de kosten per stuk. Je ziet hoeveel je moet verkopen om je kosten te dekken en om je doel te halen.",
    ],
    comoSeCalcula: [
      "Dekkingsbijdrage = verkoopprijs − variabele kosten per stuk.",
      "Break-evenpunt in stuks = vaste kosten ÷ dekkingsbijdrage, naar boven afgerond.",
      "Break-evenpunt in omzet = vaste kosten ÷ (dekkingsbijdrage ÷ verkoopprijs).",
      "Voor een gewenste winst tel je die bij de vaste kosten op en reken je op dezelfde manier.",
    ],
    ejemplo: [
      `Met ${m(fijos)} aan vaste kosten, een verkoopprijs van ${m(precio)} en ${m(variable)} variabele kosten levert elke verkoop ${m(precio - variable)} op.`,
      `Je moet ${formatearNumero(ctx, base.unidades)} stuks verkopen (${m(base.facturacion)} omzet) om je kosten te dekken, en ${formatearNumero(ctx, meta.unidades)} om ${m(objetivo)} per maand te verdienen.`,
    ],
    faq: [
      {
        pregunta: "Wat zijn vaste en variabele kosten?",
        respuesta: "Vaste kosten blijven gelijk, ook als je niets verkoopt: huur, vaste salarissen, energie. Variabele kosten groeien met elke verkoop: inkoop, materiaal, commissie, verzending.",
      },
      {
        pregunta: "Hoe verlaag je je break-evenpunt?",
        respuesta: "Je hebt drie knoppen: de prijs omhoog, de variabele kosten per stuk omlaag of de vaste kosten omlaag. Aan de prijs draaien heeft meestal het meeste effect.",
      },
      {
        pregunta: "Werkt het ook als je diensten verkoopt?",
        respuesta: "Ja. Een stuk kan een uur zijn, een sessie of een klant per maand. Neem als variabele kosten wat het je kost om elk daarvan te leveren.",
      },
    ],
    glosario: [
      { termino: "Break-evenpunt", definicion: "De omzet waarbij je inkomsten precies gelijk zijn aan je kosten." },
      { termino: "Dekkingsbijdrage", definicion: "Wat elke verkoop overlaat om je vaste kosten te betalen." },
    ],
  };
};
