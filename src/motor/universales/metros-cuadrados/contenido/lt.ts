import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Kvadratinių pėdų skaičiuoklė" : "Kvadratinių metrų skaičiuoklė",
    title: imperial
      ? tituloQueEntre(`Kvadratinių pėdų skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Kvadratinių pėdų skaičiuoklė")
      : tituloQueEntre(`Kvadratinių metrų skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Kvadratinių metrų skaičiuoklė", "m² skaičiuoklė"),
    description: "Apskaičiuokite patalpos, grindų ar sklypo plotą: stačiakampius, trikampius ir apskritimus, susumuokite iki penkių formų.",
    intro: [
      "Pasirinkite formą ir įveskite jos matmenis. Jei erdvė nėra paprastas stačiakampis, padalykite ją į dalis, o skaičiuoklė jas susumuos.",
      imperial ? "Rezultatas bus parodytas ir kvadratiniais metrais." : "Rezultatas bus parodytas ir kvadratinėmis pėdomis.",
    ],
    comoSeCalcula: [
      "Stačiakampis: ilgis × plotis.",
      "Trikampis: pagrindas × aukštis ÷ 2.",
      `Apskritimas: π × spindulys × spindulys, kai spindulys yra pusė skersmens. 1 m² yra ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `L formos svetainę galima padalyti į stačiakampį 16 × 12 ft ir stačiakampį 10 × 6 ft. Iš viso tai ${n(enL, 0)} ft².`
        : `L formos svetainę galima padalyti į stačiakampį 5 × 4 m ir stačiakampį 3 × 2 m. Iš viso tai ${n(enL, 0)} m².`,
      `Apvalus stalas, kurio skersmuo 2 ${u}, užima ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Kaip apskaičiuoti patalpos plotą pėdomis?" : "Kaip apskaičiuoti patalpos kvadratinius metrus?",
        respuesta: imperial
          ? "Išmatuokite ilgį ir plotį pėdomis ir juos sudauginkite. Kai patalpos matmenys 12 × 10 ft, plotas yra 120 ft²."
          : "Išmatuokite ilgį ir plotį metrais ir juos sudauginkite. Kai kambario matmenys 4 × 3 m, plotas yra 12 m².",
      },
      {
        pregunta: "Ką daryti, jei matmenys centimetrais?",
        respuesta: `Pirmiausia juos perskaičiuokite: centimetrus padalykite iš 100 ir gausite metrus (colius padalykite iš 12 ir gausite pėdas). 350 cm yra ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Kaip kvadratinius metrus paversti kvadratinėmis pėdomis?",
        respuesta: `Padauginkite juos iš ${n(FT2_POR_M2)}. 20 m² yra ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Kvadratinis metras (m²)", definicion: "Kvadrato, kurio kraštinė 1 metras, plotas." },
      { termino: "Kvadratinė pėda (ft²)", definicion: "Kvadrato, kurio kraštinė 1 pėda, plotas." },
    ],
  };
};
