import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  const sada = montoEjemplo(ctx, 100);
  return {
    h1: "Säästukalkulaator sinu säästueesmärgi jaoks",
    title: tituloQueEntre(
      `Säästukalkulaator: kui palju kuus säästa | ${ctx.nombrePais}`,
      `Säästukalkulaator | ${ctx.nombrePais}`,
      "Säästukalkulaator",
    ),
    description: "Arvuta, kui palju pead kuus säästma, et jõuda säästueesmärgini õigeks ajaks, arvestades juba säästetud raha ja selle tootlust.",
    intro: [
      "Reis, auto, kodu sissemakse või puhver ootamatute kulude jaoks. Eesmärki, millel on summa ja kuupäev, on palju lihtsam saavutada.",
      "Sisesta, kui palju soovid säästa ja mitme kuu jooksul. Näed, kui palju pead kõrvale panema iga kuu ja iga nädal.",
    ],
    comoSeCalcula: [
      "Kõigepealt arvutatakse, kui palju juba säästetud summa perioodi lõpuks kasvada jõuab.",
      "Puuduv osa jagatakse võrdseteks igakuisteks sissemakseteks.",
      "Kui säästud teenivad intressi, kasvab ka iga sissemakse, seega pead sisse maksma veidi vähem.",
    ],
    ejemplo: [
      `Kui soovid säästa ${m(meta)} 24 kuu jooksul ilma intressita, pead kuus säästma ${m(meta / 24)}.`,
      `Kui sul on juba ${m(actual)} ja saad aastatootlust 5%, piisab, kui säästad kuus ${m(aporteNecesario(meta, actual, 24, 5))}.`,
    ],
    faq: [
      {
        pregunta: "Kuidas säästueesmärgist kinni pidada?",
        respuesta: "Tee ülekanne kohe palgapäeval, enne kui jõuad raha ära kulutada. Kõige parem on automaatne ülekanne eraldi säästukontole.",
      },
      {
        pregunta: "Mida teha, kui igakuine summa on liiga suur?",
        respuesta: "Anna endale rohkem aega või vähenda eesmärki. Võid alustada ka summaga, mida endale lubada saad, ja suurendada seda, kui sissetulek kasvab.",
      },
      {
        pregunta: "Kas inflatsiooni tuleb arvestada?",
        respuesta: `Kui eesmärk on mitme aasta kaugusel, lisa sellele oodatav inflatsioon. See, mille hind on täna ${m(sada)}, võib selleks ajaks, kui kohale jõuad, maksta märksa rohkem.`,
      },
    ],
    glosario: [
      { termino: "Sissemakse", definicion: "Raha, mille paned iga kuu eesmärgi jaoks kõrvale." },
      { termino: "Tootlus", definicion: "See, mida sinu säästud kontol või investeeringus teenivad." },
    ],
  };
};
