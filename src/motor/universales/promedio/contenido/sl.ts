import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  // Ocene kot v šoli: petica 20 %, štirica 30 %, trojka 50 %.
  const ponderado = (5 * 20 + 4 * 30 + 3 * 50) / (20 + 30 + 50);
  const simple = (5 + 4 + 3) / 3;
  return {
    h1: "Izračun povprečja ocen",
    title: tituloQueEntre(
      `Izračun povprečja ocen ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Izračun povprečja ocen: tehtano povprečje",
      "Izračun povprečja",
    ),
    description: "Izračunajte povprečje ocen, navadno in tehtano, za največ 10 vrednosti in z utežjo vsake od njih: v odstotkih, točkah ali številu ponovitev.",
    intro: [
      "Vnesite vsako oceno in njeno utež. Dobite tehtano povprečje in poleg njega navadno povprečje.",
      "Uporabno za ocene v osnovni in srednji šoli ter na fakulteti, pa tudi za vsako povprečje, v katerem so nekatere vrednosti pomembnejše od drugih.",
    ],
    comoSeCalcula: [
      "Navadno povprečje = vsota vrednosti ÷ število vrednosti.",
      "Tehtano povprečje = vsota (vrednost × utež) ÷ vsota uteži.",
      "Vsota uteži ni nujno 100: račun deli z njihovo vsoto.",
    ],
    ejemplo: [
      `Petica z utežjo 20 %, štirica z utežjo 30 % in trojka z utežjo 50 % dajo tehtano povprečje ${n(ponderado)}.`,
      `Navadno povprečje teh treh ocen je ${n(simple, 0)}: trojka ima največjo utež, zato zniža tehtano povprečje.`,
    ],
    faq: [
      {
        pregunta: "Kako se izračuna tehtano povprečje?",
        respuesta: "Vsako vrednost pomnožite z njeno utežjo, rezultate seštejte in vsoto delite z vsoto uteži.",
      },
      {
        pregunta: "Kaj, če vsota uteži ni 100 %?",
        respuesta: "To ni težava. Če en predmet prinese 6 točk, drugi pa 4, vnesite 6 in 4. Račun deli s skupno utežjo.",
      },
      {
        pregunta: "Kakšna je razlika med navadnim in tehtanim povprečjem?",
        respuesta: "Pri navadnem povprečju ima vsaka vrednost enako težo. Pri tehtanem se vsaka vrednost šteje glede na svojo utež.",
      },
    ],
    glosario: [
      { termino: "Utež", definicion: "Kolikšen vpliv ima vrednost na končno povprečje." },
      { termino: "Tehtano povprečje", definicion: "Povprečje, v katerem se vsaka vrednost pomnoži s svojo utežjo." },
    ],
  };
};
