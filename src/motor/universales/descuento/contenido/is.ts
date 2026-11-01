import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const total = formatearCifra(ctx, (1 - 0.7 * 0.9) * 100);
  return {
    h1: "Afsláttarreiknivél",
    title: tituloQueEntre(
      `Afsláttarreiknivél: finndu verð eftir afslátt | ${ctx.nombrePais}`,
      `Afsláttarreiknivél | ${ctx.nombrePais}`,
      "Afsláttarreiknivél",
    ),
    description: "Reiknaðu verð eftir afslátt og hve mikið þú sparar, líka þegar tveir afslættir koma hvor á eftir öðrum, eins og 30% og svo 10% til viðbótar.",
    intro: [
      "Sláðu inn verð og afslátt og þú sérð strax hvað þú borgar og hve mikið þú sparar.",
      "Ef aukaafsláttur bætist ofan á skaltu slá hann inn líka. Tveir afslættir í röð verða aldrei bara summan af þeim.",
    ],
    comoSeCalcula: [
      "Verð eftir afslátt = upprunalegt verð × (1 − afsláttur ÷ 100).",
      "Aukaafsláttur reiknast af verðinu sem þegar er lækkað.",
      "Það sem þú sparar er upprunalegt verð mínus verð eftir afslátt.",
    ],
    ejemplo: [
      `Vara á ${m(precio)} kostar ${m(precio * 0.75)} með 25% afslætti.`,
      `Með 30% og svo 10% til viðbótar kostar hún ${m(precio * 0.7 * 0.9)}. Það er ${total}% ódýrara samtals, ekki 40%.`,
    ],
    faq: [
      {
        pregunta: "Hvernig reikna ég afslátt?",
        respuesta: "Margfaldaðu verðið með prósentunni og deildu með 100. Það er það sem þú sparar. Dragðu það frá verðinu og þá færðu það sem þú borgar.",
      },
      {
        pregunta: "Er 30% og 10% afsláttur það sama og 40%?",
        respuesta: `Nei. Seinni afslátturinn reiknast af verðinu sem þegar er lækkað. Samtals sparar þú því ${total}%.`,
      },
      {
        pregunta: "Hvernig finn ég upprunalegt verð út frá verði eftir afslátt?",
        respuesta: `Deildu í verðið eftir afslátt með (1 − afsláttur ÷ 100). Við 25% afslátt deilirðu með ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Afsláttur", definicion: "Prósentan sem dregst frá upprunalegu verði." },
      { termino: "Heildarafsláttur", definicion: "Hve mörg prósent þú sparar samtals þegar fleiri en einn afsláttur gildir." },
    ],
  };
};
