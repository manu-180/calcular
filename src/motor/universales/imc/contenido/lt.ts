import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Kai svoris 160 lb, o ūgis 5 ft 9 in, KMI yra ${n((160 * KG_POR_LB) / (m * m))}. Tai normalus svoris.`,
        `Sveikas svoris esant tokiam ūgiui yra nuo ${n((18.5 * m * m) / KG_POR_LB)} lb iki ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Kai svoris 70 kg, o ūgis ${n(1.75, 2)} m, KMI yra ${n(70 / (1.75 * 1.75))}. Tai normalus svoris.`,
        `Sveikas svoris esant tokiam ūgiui yra nuo ${n(18.5 * 1.75 * 1.75)} kg iki ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "KMI skaičiuoklė",
    title: tituloQueEntre(`KMI skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "KMI skaičiuoklė (kūno masės indeksas)", "KMI skaičiuoklė"),
    description: "Apskaičiuokite kūno masės indeksą (KMI) pagal svorį ir ūgį. Sužinokite savo kategoriją pagal PSO ir sveiko svorio intervalą jūsų ūgiui.",
    intro: [
      "Įveskite svorį ir ūgį. Matysite savo KMI, kategoriją pagal Pasaulio sveikatos organizacijos klasifikaciją ir sveiko svorio intervalą jūsų ūgiui.",
      "Tai bendras suaugusiųjų rodiklis. Jis neatstoja gydytojo konsultacijos.",
    ],
    comoSeCalcula: [
      imperial ? "KMI = svoris svarais × 703 ÷ (ūgis coliais × ūgis coliais)." : "KMI = svoris kilogramais ÷ (ūgis metrais × ūgis metrais).",
      `Mažiau nei ${n(18.5)} reiškia per mažą svorį, nuo ${n(18.5)} iki ${n(24.9)} normalų svorį, nuo 25 iki ${n(29.9)} antsvorį. Nuo 30 prasideda nutukimas.`,
      `Sveikas svoris apima reikšmes, kurioms esant KMI jūsų ūgiui lieka tarp ${n(18.5)} ir ${n(24.9)}.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koks KMI yra normalus?",
        respuesta: `Pagal PSO suaugusiesiems tai nuo ${n(18.5)} iki ${n(24.9)}. Ribos vienodos moterims ir vyrams.`,
      },
      {
        pregunta: "Ar KMI tinka visiems?",
        respuesta: "Ne. Jis neskiria raumenų nuo riebalų, todėl žmonėms, turintiems daug raumenų masės, gali rodyti per didelę reikšmę. Nėščiosioms, vaikams ir paaugliams jis vertinamas kitaip.",
      },
      {
        pregunta: "Ką daryti, jei KMI didelis?",
        respuesta: "Aptarkite rezultatą su gydytoju arba mitybos specialistu. Verta jį vertinti kartu su kitais rodikliais: juosmens apimtimi, mityba ir fiziniu aktyvumu.",
      },
    ],
    glosario: [
      { termino: "KMI", definicion: "Kūno masės indeksas: svorio ir ūgio kvadrato santykis." },
      { termino: "PSO", definicion: "Pasaulio sveikatos organizacija. Ji nustato KMI kategorijas suaugusiesiems." },
    ],
  };
};
