import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mensual = montoEjemplo(ctx, 4000);
  const hora = montoEjemplo(ctx, 20);
  const horasAnio = 40 * 52;
  const horasMes = horasAnio / 12;
  return {
    h1: "Tímakaup í mánaðarlaun og öfugt",
    title: tituloQueEntre(
      `Launaumreikningur: tímakaup í mánaðarlaun | ${ctx.nombrePais}`,
      `Launaumreikningur | ${ctx.nombrePais}`,
      "Launaumreikningur",
    ),
    description: "Umreiknaðu laun milli tímakaups, daglauna, vikulauna, mánaðarlauna og árslauna, miðað við þínar vinnustundir og greiddar vikur.",
    intro: [
      "Hvað eru mánaðarlaunin þín á klukkustund? Hvað gefur tímakaup á mánuði eða á ári? Sláðu inn upphæð, veldu tímabil og þá sérðu öll hin.",
      "Notaðu reiknivélina til að bera saman atvinnutilboð, reikna aukavinnu eða sjá hvers virði tíminn þinn er.",
    ],
    comoSeCalcula: [
      "Fyrst er allt umreiknað í árslaun.",
      "Tímakaup = árslaun ÷ (stundir á viku × greiddar vikur).",
      "Daglaun = árslaun ÷ (dagar á viku × greiddar vikur). Vikulaun = árslaun ÷ greiddar vikur.",
      "Mánaðarlaun = árslaun ÷ 12. Laun fyrir hálfan mánuð = árslaun ÷ 24.",
    ],
    ejemplo: [
      `Mánaðarlaun upp á ${m(mensual)} miðað við 40 stundir á viku jafngilda ${m((mensual * 12) / horasAnio)} á klukkustund og ${m(mensual * 12)} á ári.`,
      `Tímakaup upp á ${m(hora)} í fullu starfi gerir ${m(hora * horasMes)} á mánuði og ${m(hora * horasAnio)} á ári.`,
    ],
    faq: [
      {
        pregunta: "Hve margar vinnustundir eru á ári?",
        respuesta: `Með 40 stundum á viku og 52 greiddum vikum verða það ${formatearNumero(ctx, horasAnio)} stundir, eða ${formatearNumero(ctx, horasMes, 1)} stundir á mánuði.`,
      },
      {
        pregunta: "Hvernig umreikna ég tímakaup í mánaðarlaun?",
        respuesta: `Margfaldaðu tímakaupið með fjölda stunda á viku og með 52 og deildu svo með 12. Í fullu starfi er það sama og að margfalda tímakaupið með ${formatearNumero(ctx, horasMes, 1)}.`,
      },
      {
        pregunta: "Af hverju eru vikulaun sinnum 4 ekki mánaðarlaunin?",
        respuesta: `Af því að í mánuði eru að meðaltali ${formatearNumero(ctx, 52 / 12, 2)} vikur, ekki 4. Til að fara úr vikulaunum í mánaðarlaun margfaldarðu með 52 og deilir með 12.`,
      },
      {
        pregunta: "Eru skattar eða aukagreiðslur með?",
        respuesta: "Nei. Reiknivélin umreiknar sömu heildarlaun milli tímabila. Ef þú færð aukagreiðslur eða bónusa skaltu bæta þeim við sérstaklega þegar þú berð saman tilboð.",
      },
    ],
    glosario: [
      { termino: "Heildarlaun", definicion: "Laun fyrir skatt og annan frádrátt." },
      { termino: "Fullt starf", definicion: "Full vinnuvika, hér reiknuð sem 40 stundir á viku." },
    ],
  };
};
