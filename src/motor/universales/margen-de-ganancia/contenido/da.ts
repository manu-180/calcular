import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  const margenDeAvance50 = ((costo * 1.5 - costo) / (costo * 1.5)) * 100;
  return {
    h1: "Avanceberegner: dækningsgrad og avance",
    title: tituloQueEntre(
      `Avanceberegner: beregn dækningsgrad og avance | ${ctx.nombrePais}`,
      `Avanceberegner | ${ctx.nombrePais}`,
      "Avanceberegner",
    ),
    description: "Beregn dækningsgrad og avance ud fra kostpris og salgspris, eller hvilken salgspris du skal tage for at nå den dækningsgrad, du ønsker.",
    intro: [
      "Dækningsgrad og avance bliver tit blandet sammen, og forskellen kan koste dig penge. Begge måler den samme fortjeneste, men i forhold til forskellige beløb.",
      "Skriv kostpris og salgspris, så ser du begge dele. Eller vælg en dækningsgrad, så får du at vide, hvad du skal tage for varen.",
    ],
    comoSeCalcula: [
      "Fortjeneste = salgspris − kostpris.",
      "Dækningsgrad = fortjeneste ÷ salgspris × 100.",
      "Avance på kostprisen = fortjeneste ÷ kostpris × 100.",
      "Salgspris for en bestemt dækningsgrad = kostpris ÷ (1 − dækningsgrad ÷ 100).",
    ],
    ejemplo: [
      `En vare, der koster ${m(costo)} og sælges for ${m(precio)}, giver ${m(precio - costo)} i fortjeneste. Det er en dækningsgrad på ${p(((precio - costo) / precio) * 100)} og en avance på kostprisen på ${p(((precio - costo) / costo) * 100)}.`,
      `For at få 50 % i dækningsgrad med den kostpris skal du sælge for ${m(precioConMargen(costo, 50))}. Lægger du bare 50 % oven i kostprisen, bliver dækningsgraden ${p(margenDeAvance50)}.`,
    ],
    faq: [
      {
        pregunta: "Hvad er forskellen på dækningsgrad og avance?",
        respuesta: "Dækningsgraden er fortjenesten i forhold til salgsprisen. Avancen på kostprisen er fortjenesten i forhold til kostprisen. For den samme fortjeneste er avancen altid det højeste tal.",
      },
      {
        pregunta: "Hvordan sætter jeg en pris for en bestemt dækningsgrad?",
        respuesta: `Del kostprisen med (1 − dækningsgraden). For 30 % i dækningsgrad deler du kostprisen med ${formatearNumero(ctx, 0.7, 2)}. Læg ikke bare 30 % oven i kostprisen, for så tjener du mindre, end du tror.`,
      },
      {
        pregunta: "Skal kostprisen regnes med eller uden moms?",
        respuesta: "Regn med kostpris og salgspris uden moms. Ellers ser dækningsgraden større ud, end den er.",
      },
    ],
    glosario: [
      { termino: "Dækningsgrad", definicion: "Fortjenesten i procent af salgsprisen, når kun de variable omkostninger er trukket fra." },
      { termino: "Avance", definicion: "Fortjenesten på en vare. Her i procent af kostprisen." },
    ],
  };
};
