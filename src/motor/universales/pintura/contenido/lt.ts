import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Kai patalpos sienų ilgis 48 ft, aukštis 8 ft, o durys ir langai užima 40 ft², dažomas plotas yra ${n(neta, 0)} ft².`,
          `Dažant dviem sluoksniais, kai dažų išeiga 350 ft² iš galono, reikės ${n(gal, 2)} galono. Su atsarga ${n(gal * (1 + MARGEN), 2)} galono.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Kai patalpos sienų ilgis 14 m, aukštis ${n(2.6)} m, o durys ir langai užima 4 m², dažomas plotas yra ${n(neta)} m².`,
          `Dažant dviem sluoksniais, kai dažų išeiga 10 m² iš litro, reikės ${n(litros, 2)} litro. Su atsarga ${n(litros * (1 + MARGEN), 2)} litro.`,
        ];
      })();
  return {
    h1: "Dažų kiekio skaičiuoklė",
    title: tituloQueEntre(`Dažų kiekio skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Dažų kiekio skaičiuoklė", "Dažų skaičiuoklė"),
    description: "Apskaičiuokite, kiek dažų reikia sienoms pagal jų matmenis, duris ir langus, sluoksnių skaičių ir ant pakuotės nurodytą išeigą.",
    intro: [
      "Įveskite sienų ilgį ir aukštį (arba iš karto plotą), kiek užima durys ir langai ir kiek sluoksnių planuojate.",
      "Skaičiuoklė prideda 10 % atsargą, kad dažų netrūktų įpusėjus darbą.",
    ],
    comoSeCalcula: [
      "Plotas = bendras sienų ilgis × aukštis, be durų ir langų.",
      "Dažai = plotas × sluoksnių skaičius ÷ išeiga.",
      `Galiausiai pridedama ${n(MARGEN * 100, 0)} % atsarga.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kiek kvadratinių metrų padengia litras dažų?",
        respuesta: "Įprasti vidaus dažai vienu sluoksniu padengia maždaug nuo 8 iki 12 m² iš litro. Tikslų skaičių rasite ant pakuotės.",
      },
      {
        pregunta: "Kiek sluoksnių reikia?",
        respuesta: "Paprastai du. Naujam tinkui, labai geriančioms sienoms ar ryškiai keičiant spalvą gali prireikti trečio sluoksnio.",
      },
      {
        pregunta: "Ar atimti duris ir langus?",
        respuesta: "Taip, jei jie dideli. Mažų langų geriau neatimti: perteklius padengs kraštus ir kampus.",
      },
    ],
    glosario: [
      { termino: "Išeiga", definicion: "Kokį plotą litras dažų padengia vienu sluoksniu." },
      { termino: "Sluoksnis", definicion: "Kiekvienas ant sienos užteptas dažų sluoksnis." },
    ],
  };
};
