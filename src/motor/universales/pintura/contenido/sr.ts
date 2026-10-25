import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSr } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const litara = (x: number) => formaSr(x, "litar", "litra", "litara");
  const galona = (x: number) => formaSr(x, "galon", "galona", "galona");
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        const conMargen = gal * (1 + MARGEN);
        return [
          `Prostorija sa zidovima ukupne dužine 48 ft, visine 8 ft i sa 40 ft² vrata i prozora ima ${n(neta, 0)} ft² za krečenje.`,
          `Uz 2 sloja i boju izdašnosti 350 ft² po galonu, potrebno je ${n(gal, 2)} ${galona(gal)}. Sa rezervom, ${n(conMargen, 2)} ${galona(conMargen)}.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        const conMargen = litros * (1 + MARGEN);
        return [
          `Prostorija sa zidovima ukupne dužine 14 m, visine ${n(2.6)} m i sa 4 m² vrata i prozora ima ${n(neta)} m² za krečenje.`,
          `Uz 2 sloja i boju izdašnosti 10 m² po litru, potrebno je ${n(litros, 2)} ${litara(litros)}. Sa rezervom, ${n(conMargen, 2)} ${litara(conMargen)}.`,
        ];
      })();
  return {
    h1: "Kalkulator potrošnje boje za zidove",
    title: tituloQueEntre(
      `Koliko boje za zidove: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Koliko boje za zidove: kalkulator",
      "Potrošnja boje",
    ),
    description:
      "Izračunajte koliko boje vam treba za zidove prema njihovim merama, vratima i prozorima, broju slojeva i izdašnosti sa pakovanja.",
    intro: [
      "Unesite dužinu i visinu zidova (ili odmah površinu), koliko zauzimaju vrata i prozori i koliko slojeva planirate.",
      "Kalkulator dodaje 10 % više, da vam boja ne bi ponestala usred posla.",
    ],
    comoSeCalcula: [
      "Površina = ukupna dužina zidova × visina, bez vrata i prozora.",
      "Boja = površina × broj slojeva ÷ izdašnost.",
      `Na kraju se dodaje rezerva od ${n(MARGEN * 100, 0)} %.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koliko kvadrata pokriva litar boje?",
        respuesta: "Obična unutrašnja boja jednim slojem pokriva oko 8 do 12 m² po litru. Tačan podatak piše na pakovanju.",
      },
      {
        pregunta: "Koliko slojeva treba?",
        respuesta: "Obično dva. Nov malter, zidovi koji mnogo upijaju ili velika promena boje mogu da traže i treći sloj.",
      },
      {
        pregunta: "Da li treba oduzeti vrata i prozore?",
        respuesta: "Da, ako su veliki. Male prozore je bolje ne oduzimati: višak pokriva ivice i uglove.",
      },
    ],
    glosario: [
      { termino: "Izdašnost", definicion: "Koliko površine pokriva litar boje jednim slojem." },
      { termino: "Sloj", definicion: "Svaki nanos boje na zid." },
    ],
  };
};
