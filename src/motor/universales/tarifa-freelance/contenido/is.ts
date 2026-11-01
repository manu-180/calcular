import { formaIs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Reiknaðu tímagjald sem verktaki",
    title: tituloQueEntre(
      `Verktakataxti: reiknaðu tímagjaldið þitt | ${ctx.nombrePais}`,
      `Verktakataxti | ${ctx.nombrePais}`,
      "Verktakataxti",
    ),
    description: "Reiknaðu tímagjald og daggjald sem verktaki út frá því sem þú vilt þéna, kostnaði, sköttum, fríi og útseldum vinnustundum.",
    intro: [
      "Algengustu mistök verktaka eru að taka launin sem þeir vildu fá sem launþegar og deila þeim með 160 klukkustundum. Þá gleymast skattar, kostnaður, sumarfrí og allar stundirnar sem enginn borgar fyrir.",
      "Þessi reiknivél byrjar á því sem þú vilt hafa eftir og sýnir hvað þú þarft að rukka til að ná því.",
    ],
    comoSeCalcula: [
      "Nauðsynleg velta = það sem þú vilt hafa eftir ÷ (1 − skatthlutfall) + rekstrarkostnaður.",
      "Vinnudagar = 52 vikur × vinnudagar á viku − frídagar.",
      "Útseldar vinnustundir á ári = vinnudagar × útseldar vinnustundir á dag.",
      "Tímagjald = nauðsynleg velta ÷ útseldar vinnustundir á ári.",
    ],
    ejemplo: [
      `Til að hafa ${m(ingreso)} eftir á ári, með ${m(gastos)} í kostnað og 25% í skatt, þarftu að rukka ${m(r.facturado)}.`,
      `Með 30 frídaga og 25 útseldar vinnustundir á viku verða þetta ${formatearNumero(ctx, r.horas)} ${formaIs(r.horas, "vinnustund", "vinnustundir")} á ári. Það gefur ${m(r.hora)} í tímagjald eða ${m(r.dia)} í daggjald.`,
    ],
    faq: [
      {
        pregunta: "Hve margar stundir á viku get ég rukkað fyrir?",
        respuesta: "Færri en þú vinnur. Öflun viðskiptavina, tölvupóstur, reikningagerð og endurmenntun taka tíma sem enginn borgar fyrir. Algengt er 20 til 30 útseldar stundir af 40.",
      },
      {
        pregunta: "Á ég að rukka á tímann eða fyrir verkið?",
        respuesta: "Hvort tveggja gengur. Jafnvel þótt þú setjir fast verð á verkið geturðu áætlað stundirnar og margfaldað með þessu tímagjaldi, svo þú tapir ekki á því.",
      },
      {
        pregunta: "Hvaða skatthlutfall á ég að nota?",
        respuesta: "Það fer eftir landi og rekstrarformi. Taktu bæði tekjuskatt og launatengd gjöld með. Ef þú ert óviss skaltu spyrja bókara.",
      },
    ],
    glosario: [
      { termino: "Útseldar vinnustundir", definicion: "Vinnustundir sem þú rukkar viðskiptavin fyrir." },
      { termino: "Það sem þú hefur eftir", definicion: "Það sem stendur eftir þegar skattar og rekstrarkostnaður eru frá." },
    ],
  };
};
