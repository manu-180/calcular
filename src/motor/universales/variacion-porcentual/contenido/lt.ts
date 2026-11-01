import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Procentinio pokyčio skaičiuoklė",
    title: tituloQueEntre(
      `Procentinio pokyčio skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Kaip apskaičiuoti procentinį pokytį",
      "Procentinio pokyčio skaičiuoklė",
    ),
    description: "Apskaičiuokite, keliais procentais reikšmė padidėjo ar sumažėjo: kainos, atlyginimai, pajamos ar bet koks skaičius, kuris laikui bėgant pasikeitė.",
    intro: [
      "Įveskite pradinę ir naują reikšmę. Pamatysite procentinį padidėjimą ar sumažėjimą ir skirtumą.",
      "Skaičiuoklė taip pat parodo, kiek reikšmė turėtų pasikeisti, kad grįžtų į pradinę. Tai beveik niekada nėra tas pats procentas.",
    ],
    comoSeCalcula: [
      "Procentinis pokytis = (nauja reikšmė − pradinė reikšmė) ÷ pradinė reikšmė × 100.",
      "Teigiamas rezultatas reiškia padidėjimą, neigiamas sumažėjimą.",
      "Kai pradinė reikšmė neigiama, dalijama iš jos absoliučiosios reikšmės, kad ženklas ir toliau rodytų, ar padėtis pagerėjo.",
    ],
    ejemplo: [
      `Tai, kas kainavo ${m(antes)}, o dabar kainuoja ${m(despues)}, pabrango 25 %.`,
      "Kad kaina grįžtų į pradinę, ji turėtų sumažėti 20 %, o ne 25 %.",
    ],
    faq: [
      {
        pregunta: "Kaip apskaičiuoti procentinį padidėjimą?",
        respuesta: "Iš naujos reikšmės atimkite pradinę, rezultatą padalykite iš pradinės reikšmės ir padauginkite iš 100. Nuo 80 iki 100: 20 ÷ 80 × 100 = 25 %.",
      },
      {
        pregunta: "Kaip apskaičiuoti procentinį sumažėjimą?",
        respuesta: "Skaičiuojama taip pat. Nuo 100 iki 80: −20 ÷ 100 × 100 = −20 %, tad reikšmė sumažėjo 20 %.",
      },
      {
        pregunta: "Kodėl 25 % padidėjimas ir 25 % sumažėjimas vienas kito nepanaikina?",
        respuesta: "Kiekvienas procentas skaičiuojamas nuo kitos bazės. 80 plius 25 % yra 100, bet 100 minus 25 % yra 75.",
      },
      {
        pregunta: "Kuo skiriasi procentas ir procentinis punktas?",
        respuesta: "Kai norma pakyla nuo 10 % iki 12 %, skirtumas yra 2 procentiniai punktai. Procentinis pokytis yra 20 %.",
      },
    ],
    glosario: [
      { termino: "Procentinis pokytis", definicion: "Kiek reikšmė pasikeitė, išreiškus procentais nuo pradinės reikšmės." },
      { termino: "Procentinis punktas", definicion: "Paprastas dviejų procentų skirtumas." },
    ],
  };
};
