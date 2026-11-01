import { GRAMATICA } from "../../../i18n/gramatica";
import { formaHr } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const litara = (x: number) => formaHr(x, "litra", "litre", "litara");
  const galona = (x: number) => formaHr(x, "galon", "galona", "galona");
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        const conMargen = gal * (1 + MARGEN);
        return [
          `Prostorija sa zidovima ukupne duljine 48 ft, visine 8 ft i s 40 ft² vrata i prozora ima ${n(neta, 0)} ft² za bojanje.`,
          `Uz 2 sloja i boju izdašnosti 350 ft² po galonu, potrebno je ${n(gal, 2)} ${galona(gal)}. S rezervom, ${n(conMargen, 2)} ${galona(conMargen)}.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        const conMargen = litros * (1 + MARGEN);
        return [
          `Prostorija sa zidovima ukupne duljine 14 m, visine ${n(2.6)} m i s 4 m² vrata i prozora ima ${n(neta)} m² za bojanje.`,
          `Uz 2 sloja i boju izdašnosti 10 m² po litri, potrebno je ${n(litros, 2)} ${litara(litros)}. S rezervom, ${n(conMargen, 2)} ${litara(conMargen)}.`,
        ];
      })();
  return {
    h1: "Kalkulator potrošnje boje za zidove",
    title: tituloQueEntre(
      `Koliko boje za zidove: kalkulator ${GRAMATICA.hr.para(ctx.nombrePais)}`,
      "Koliko boje za zidove: kalkulator",
      "Potrošnja boje",
    ),
    description:
      "Izračunajte koliko vam boje treba za zidove prema njihovim mjerama, vratima i prozorima, broju slojeva i izdašnosti s pakiranja.",
    intro: [
      "Unesite duljinu i visinu zidova (ili odmah površinu), koliko zauzimaju vrata i prozori i koliko slojeva planirate.",
      "Kalkulator dodaje 10 % više kako vam ne bi ponestalo boje usred posla.",
    ],
    comoSeCalcula: [
      "Površina = ukupna duljina zidova × visina, bez vrata i prozora.",
      "Boja = površina × broj slojeva ÷ izdašnost.",
      `Na kraju se dodaje rezerva od ${n(MARGEN * 100, 0)} %.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koliko kvadrata pokriva litra boje?",
        respuesta: "Obična unutarnja boja jednim slojem pokriva oko 8 do 12 m² po litri. Točan podatak piše na pakiranju.",
      },
      {
        pregunta: "Koliko slojeva treba?",
        respuesta: "Obično dva. Nova žbuka, zidovi koji jako upijaju ili velika promjena boje mogu tražiti i treći sloj.",
      },
      {
        pregunta: "Treba li oduzeti vrata i prozore?",
        respuesta: "Da, ako su veliki. Male prozore bolje je ne oduzimati: višak pokriva rubove i kutove.",
      },
    ],
    glosario: [
      { termino: "Izdašnost", definicion: "Koliko površine pokriva litra boje jednim slojem." },
      { termino: "Sloj", definicion: "Svaki nanos boje na zid." },
    ],
  };
};
