import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Kalkulator povišice plače",
    title: tituloQueEntre(
      `Kalkulator povišice plače ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      `Povišica plače ${GRAMATICA.sl.en(ctx.nombrePais)}`,
      "Kalkulator povišice plače",
    ),
    description: "Izračunajte novo plačo po povišici ter razliko na mesec in na leto. Preverite tudi, ali je vaša realna povišica večja od inflacije.",
    intro: [
      "Ponudili so vam povišico ali jo nameravate zahtevati. Vnesite plačo in povišico v odstotkih ali kot znesek, pa boste videli, koliko se spremeni vsak mesec in v celem letu.",
      "Dodajte inflacijo v tem obdobju in pokazali vam bomo, ali vaša kupna moč res raste ali plača samo dohiteva cene.",
    ],
    comoSeCalcula: [
      "Nova plača = sedanja plača × (1 + povišica ÷ 100).",
      "Razlika na leto = razlika na mesec × število plač na leto.",
      "Realna povišica = (1 + povišica) ÷ (1 + inflacija) − 1.",
    ],
    ejemplo: [
      `Plača ${m(sueldo)} na mesec po povišici za 5 % znaša ${m(sueldo * 1.05)}: ${m(sueldo * 0.05)} več vsak mesec in ${m(sueldo * 0.05 * 12)} več na leto.`,
      `Če je bila inflacija v tem obdobju 3 %, realna povišica znaša ${p(aumentoReal(5, 3))}. Pri inflaciji 6 % znaša ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Kaj je realna povišica plače?",
        respuesta: "To je povišica po upoštevanju inflacije. Pokaže, ali z novo plačo kupite več ali manj kot prej.",
      },
      {
        pregunta: "Zakaj ne zadošča, da od povišice odštejete inflacijo?",
        respuesta: `Ker se odstotki množijo, ne odštevajo. Pri povišici 5 % in inflaciji 3 % realna povišica znaša ${p(aumentoReal(5, 3))}, ne 2 %. Ko je inflacija visoka, je razlika veliko večja.`,
      },
      {
        pregunta: "Kolikšno povišico zahtevati?",
        respuesta: "Vsaj tolikšno, kot je inflacija od zadnje povišice, da ne izgubljate kupne moči. Nad tem se ravnajte po tem, koliko drugi delodajalci plačujejo za enako delovno mesto in koliko so se povečale vaše odgovornosti.",
      },
    ],
    glosario: [
      { termino: "Nominalna povišica", definicion: "Povišica, kot je zapisana na plačilni listi, brez upoštevanja inflacije." },
      { termino: "Kupna moč", definicion: "To, kar lahko kupite s svojo plačo." },
    ],
  };
};
