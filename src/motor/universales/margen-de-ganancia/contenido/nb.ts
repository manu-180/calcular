import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  const margenDePaslag50 = ((costo * 1.5 - costo) / (costo * 1.5)) * 100;
  return {
    h1: "Fortjenestemargin: dekningsgrad og påslag",
    title: tituloQueEntre(
      `Fortjenestemargin: regn ut dekningsgrad og påslag | ${ctx.nombrePais}`,
      `Fortjenestemargin | ${ctx.nombrePais}`,
      "Fortjenestemargin",
    ),
    description: "Regn ut dekningsgrad og påslag ut fra kostpris og salgspris, eller hvilken salgspris du må ta for å nå dekningsgraden du ønsker.",
    intro: [
      "Dekningsgrad og påslag blir ofte blandet sammen, og forskjellen kan koste deg penger. Begge måler den samme fortjenesten, men mot ulike beløp.",
      "Fyll inn kostpris og salgspris, så ser du begge deler. Eller velg en dekningsgrad, så får du vite hva du bør ta for varen.",
    ],
    comoSeCalcula: [
      "Fortjeneste = salgspris − kostpris.",
      "Dekningsgrad = fortjeneste ÷ salgspris × 100.",
      "Påslag på kostprisen = fortjeneste ÷ kostpris × 100.",
      "Salgspris for en bestemt dekningsgrad = kostpris ÷ (1 − dekningsgrad ÷ 100).",
    ],
    ejemplo: [
      `En vare som koster ${m(costo)} og selges for ${m(precio)}, gir ${m(precio - costo)} i fortjeneste. Det er en dekningsgrad på ${p(((precio - costo) / precio) * 100)} og et påslag på kostprisen på ${p(((precio - costo) / costo) * 100)}.`,
      `For å få 50 % dekningsgrad med denne kostprisen må du selge for ${m(precioConMargen(costo, 50))}. Legger du bare 50 % på kostprisen, blir dekningsgraden ${p(margenDePaslag50)}.`,
    ],
    faq: [
      {
        pregunta: "Hva er forskjellen på dekningsgrad og påslag?",
        respuesta: "Dekningsgraden er fortjenesten sett mot salgsprisen. Påslaget er fortjenesten sett mot kostprisen. For den samme fortjenesten er påslaget alltid det høyeste tallet.",
      },
      {
        pregunta: "Hvordan setter jeg en pris for en bestemt dekningsgrad?",
        respuesta: `Del kostprisen på (1 − dekningsgraden). For 30 % dekningsgrad deler du kostprisen på ${formatearNumero(ctx, 0.7, 2)}. Ikke bare legg 30 % på kostprisen, for da tjener du mindre enn du tror.`,
      },
      {
        pregunta: "Skal kostprisen regnes med eller uten mva.?",
        respuesta: "Regn med kostpris og salgspris eks. mva. Ellers ser dekningsgraden større ut enn den er.",
      },
    ],
    glosario: [
      { termino: "Dekningsgrad", definicion: "Fortjenesten i prosent av salgsprisen når bare de variable kostnadene er trukket fra." },
      { termino: "Påslag", definicion: "Det som legges på kostprisen for å komme fram til salgsprisen, her i prosent av kostprisen." },
    ],
  };
};
