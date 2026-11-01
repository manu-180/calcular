import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Reiknivél fyrir þjórfé",
    title: tituloQueEntre(
      `Þjórfé: reiknaðu þjórfé og skiptu reikningnum | ${ctx.nombrePais}`,
      `Reiknivél fyrir þjórfé | ${ctx.nombrePais}`,
      "Reiknivél fyrir þjórfé",
    ),
    description: "Reiknaðu þjórfé, heildarupphæð og hvað hver og einn borgar þegar þið skiptið reikningnum. Þú getur námundað hlut hvers og eins upp í slétta upphæð.",
    intro: [
      "Sláðu inn upphæð reikningsins, hvað þú vilt gefa mörg prósent í þjórfé og hvað margir borga. Þú sérð þjórféð, heildina og hlut hvers og eins.",
      "Ef þú vilt sléttar upphæðir er hlutur hvers og eins námundaður upp og afgangurinn fer í þjórfé.",
    ],
    comoSeCalcula: [
      "Þjórfé = upphæð reiknings × þjórfé í prósentum ÷ 100.",
      "Samtals = upphæð reiknings + þjórfé.",
      "Hlutur hvers og eins er heildin deilt með fjölda fólks.",
    ],
    ejemplo: [
      `Af reikningi upp á ${m(cuenta)} er 10% þjórfé ${m(propina)} og samtals verða það ${m(cuenta + propina)}.`,
      `Ef þið skiptið honum á milli 3 borgar hver og einn ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Hvað á ég að gefa mikið þjórfé?",
        respuesta: `Það fer eftir siðum á staðnum. Athugaðu hvað tíðkast ${GRAMATICA.is.en(ctx.nombrePais)} og hvort þjónustugjald sé þegar á reikningnum. Víða dugar að námunda upp.`,
      },
      {
        pregunta: "Á að reikna þjórfé af upphæðinni fyrir eða eftir VSK?",
        respuesta: "Flestir reikna af heildarupphæðinni á reikningnum. Ef þú vilt reikna af upphæðinni án VSK slærðu hana inn í staðinn.",
      },
      {
        pregunta: "Hvernig reikna ég 10% þjórfé í fljótu bragði?",
        respuesta: `Deildu upphæð reikningsins með 10. Af reikningi upp á ${n(450)} verða það ${n(450 / 10)}.`,
      },
    ],
    glosario: [
      { termino: "Þjórfé", definicion: "Aukaupphæð sem þú gefur fyrir þjónustuna, ofan á verðið." },
      { termino: "Þjónustugjald", definicion: "Gjald sem staðurinn hefur þegar bætt á reikninginn fyrir þjónustuna." },
    ],
  };
};
