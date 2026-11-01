import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  return {
    h1: "Nominalios palūkanų normos perskaičiavimas į efektyviąją",
    title: tituloQueEntre(
      `Efektyvioji palūkanų norma ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Efektyvioji palūkanų norma: skaičiuoklė",
      "Efektyvioji palūkanų norma",
    ),
    description: "Perskaičiuokite nominalią metinę normą į efektyviąją metinę normą ir atvirkščiai, kai palūkanos priskaičiuojamos kas mėnesį, ketvirtį, pusmetį ar dieną.",
    intro: [
      "Du pasiūlymai su ta pačia norma gali kainuoti skirtingai. Skirtumas slypi tame, kaip dažnai palūkanos skaičiuojamos arba pridedamos.",
      "Efektyvioji metinė norma visus pasiūlymus sulygina: parodo, kiek per metus iš tikrųjų sumokėsite ar uždirbsite. Pasirinkite turimą normą, o parodysime kitą.",
    ],
    comoSeCalcula: [
      "Efektyvioji norma = (1 + nominali norma ÷ m) pakelta laipsniu m, minus 1. Skaičius m rodo, kiek kartų per metus priskaičiuojamos palūkanos: 12, kai kas mėnesį, ir 4, kai kas ketvirtį.",
      "Nominali norma = m × ((1 + efektyvioji norma) pakelta laipsniu (1 ÷ m), minus 1).",
      "Laikotarpio norma yra nominali norma, padalyta iš m.",
    ],
    ejemplo: [
      `Nominali 12 % metinė norma, kai palūkanos priskaičiuojamos kas mėnesį, atitinka efektyviąją ${p(aEfectiva(12, 12))} normą.`,
      `Efektyvioji 10 % norma atitinka nominalią ${p(aNominal(10, 12))} normą, kai palūkanos priskaičiuojamos kas mėnesį.`,
    ],
    faq: [
      {
        pregunta: "Kuo skiriasi nominali ir efektyvioji palūkanų norma?",
        respuesta:
          "Nominali norma yra metinė norma be palūkanų priskaičiavimo poveikio. Efektyvioji įvertina ir tai, kad palūkanos skaičiuojamos nuo jau priskaičiuotų palūkanų. Todėl efektyvioji norma visada lygi nominaliai arba už ją didesnė.",
      },
      {
        pregunta: "Kurią normą naudoti lyginant pasiūlymus?",
        respuesta:
          "Taupant lyginkite efektyviąją normą, nes ji rodo, kiek iš tikrųjų uždirbsite. Imant paskolą lyginkite BVKKMN, kuri be palūkanų apima ir mokesčius.",
      },
      {
        pregunta: "Kodėl dažnesnis priskaičiavimas didina efektyviąją normą?",
        respuesta:
          "Palūkanos anksčiau pridedamos prie likučio ir pačios pradeda duoti palūkanas. Kai palūkanos priskaičiuojamos kartą per metus, nominali ir efektyvioji norma sutampa.",
      },
    ],
    glosario: [
      { termino: "Nominali norma", definicion: "Metinė norma be palūkanų priskaičiavimo poveikio." },
      { termino: "Efektyvioji norma", definicion: "Metinė norma, įvertinus sudėtines palūkanas." },
      { termino: "Palūkanų priskaičiavimas", definicion: "Momentas, kai palūkanos pridedamos prie likučio." },
      { termino: "BVKKMN", definicion: "Bendros vartojimo kredito kainos metinė norma: palūkanos ir visi paskolos mokesčiai vienu skaičiumi." },
    ],
  };
};
