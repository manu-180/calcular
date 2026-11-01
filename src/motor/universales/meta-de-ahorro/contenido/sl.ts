import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Izračun varčevalnega cilja",
    title: tituloQueEntre(`Varčevalni cilj: izračun ${GRAMATICA.sl.para(ctx.nombrePais)}`, "Izračun varčevalnega cilja", "Varčevalni cilj"),
    description: "Ugotovite, koliko morate odložiti na mesec, da boste pravočasno zbrali potreben znesek, ob upoštevanju tega, kar že imate, in obresti na prihranke.",
    intro: [
      "Dopust, avto, polog za stanovanje ali rezerva za nepredvidene stroške. Cilj z določenim zneskom in rokom je veliko lažje doseči.",
      "Vnesite, koliko želite prihraniti in v koliko mesecih. Kalkulator pokaže, koliko morate odložiti na mesec in koliko na teden.",
    ],
    comoSeCalcula: [
      "Najprej se izračuna, koliko bodo vaši dosedanji prihranki zrasli do konca obdobja.",
      "Kar še manjka, se razdeli na enaka mesečna vplačila.",
      "Če prihranki prinašajo obresti, jih prinaša tudi vsako vplačilo, zato zadošča nekoliko manjši znesek.",
    ],
    ejemplo: [
      `Če želite v 24 mesecih brez obresti prihraniti ${m(meta)}, morate na mesec odložiti ${m(meta / 24)}.`,
      `Če že imate ${m(actual)} in prihranki prinašajo 5 % na leto, zadošča ${m(aporteNecesario(meta, actual, 24, 5))} na mesec.`,
    ],
    faq: [
      {
        pregunta: "Kako se držati cilja?",
        respuesta: "Denar odložite takoj po prejemu plače, preden ga začnete trošiti. Če lahko, nastavite trajni nalog na poseben varčevalni račun.",
      },
      {
        pregunta: "Kaj, če je mesečni znesek previsok?",
        respuesta: "Dajte si več časa ali zmanjšajte cilj. Lahko tudi začnete s tem, kar zmorete, in vplačilo povečate, ko se vam povečajo dohodki.",
      },
      {
        pregunta: "Ali moram upoštevati inflacijo?",
        respuesta: "Če je cilj oddaljen nekaj let, znesku prištejte pričakovano inflacijo. Kar danes stane 100, lahko čez nekaj let stane opazno več.",
      },
    ],
    glosario: [
      { termino: "Vplačilo", definicion: "Denar, ki ga vsak mesec odložite za cilj." },
      { termino: "Donos", definicion: "Koliko vaši prihranki prinašajo na računu ali v naložbi." },
    ],
  };
};
