import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Winstmarge berekenen",
    title: tituloQueEntre(`Winstmarge berekenen in ${ctx.nombrePais}`, "Winstmarge berekenen"),
    description: "Bereken de marge en de opslag uit kostprijs en verkoopprijs, of de verkoopprijs die je nodig hebt voor de marge die je wilt halen.",
    intro: [
      "Marge en opslag worden steeds door elkaar gehaald, en dat verschil kan je geld kosten. Ze meten dezelfde winst, maar tegen een andere basis.",
      "Vul de kostprijs en de verkoopprijs in en je ziet ze allebei. Of kies een marge en je ziet welke prijs je moet vragen.",
    ],
    comoSeCalcula: [
      "Winst = verkoopprijs − kostprijs.",
      "Marge = winst ÷ verkoopprijs × 100.",
      "Opslag = winst ÷ kostprijs × 100.",
      "Verkoopprijs voor een gewenste marge = kostprijs ÷ (1 − marge ÷ 100).",
    ],
    ejemplo: [
      `Een product met een kostprijs van ${m(costo)} dat je verkoopt voor ${m(precio)}, levert ${m(precio - costo)} winst op. Dat is ${p(((precio - costo) / precio) * 100)} marge en ${p(((precio - costo) / costo) * 100)} opslag.`,
      `Wil je bij die kostprijs 50% marge, dan moet je verkopen voor ${m(precioConMargen(costo, 50))}. Tel je 50% bij de kostprijs op, dan heb je maar ${p(100 / 3)} marge.`,
    ],
    faq: [
      {
        pregunta: "Wat is het verschil tussen marge en opslag?",
        respuesta: "Marge is de winst gedeeld door de verkoopprijs. Opslag is de winst gedeeld door de kostprijs. Bij dezelfde winst is de opslag altijd het hogere getal.",
      },
      {
        pregunta: "Hoe bepaal je een prijs voor een gewenste marge?",
        respuesta: `Deel de kostprijs door (1 − marge). Voor 30% marge deel je de kostprijs door ${formatearNumero(ctx, 0.7, 2)}. Tel geen 30% bij de kostprijs op, want dan verdien je minder dan je denkt.`,
      },
      {
        pregunta: "Reken je met of zonder btw?",
        respuesta: "Reken met kostprijs en verkoopprijs exclusief btw. Anders lijkt je marge groter dan hij is.",
      },
    ],
    glosario: [
      { termino: "Winstmarge", definicion: "De winst als percentage van de verkoopprijs." },
      { termino: "Opslag", definicion: "De winst als percentage van de kostprijs. Ook wel opslagpercentage genoemd." },
    ],
  };
};
