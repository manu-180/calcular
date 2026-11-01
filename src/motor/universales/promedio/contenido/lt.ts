import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  // Dešimtbalė skalė: šešetas 20 %, aštuonetas 30 %, dešimtukas 50 %.
  const ponderado = (6 * 20 + 8 * 30 + 10 * 50) / (20 + 30 + 50);
  const simple = (6 + 8 + 10) / 3;
  return {
    h1: "Svertinio vidurkio skaičiuoklė",
    title: tituloQueEntre(
      `Svertinio vidurkio skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Kaip apskaičiuoti svertinį pažymių vidurkį",
      "Svertinis vidurkis",
    ),
    description: "Apskaičiuokite paprastąjį ir svertinį pažymių vidurkį iš iki 10 reikšmių, nurodydami kiekvienos svorį: procentais, kreditais arba pasikartojimų skaičiumi.",
    intro: [
      "Įveskite kiekvieną pažymį ir jo svorį. Pamatysite svertinį vidurkį, o šalia jo paprastąjį.",
      "Skaičiuoklė tinka mokyklos ir aukštosios mokyklos pažymiams bei bet kuriam vidurkiui, kai vienos reikšmės svarbesnės už kitas.",
    ],
    comoSeCalcula: [
      "Paprastasis vidurkis = reikšmių suma ÷ reikšmių skaičius.",
      "Svertinis vidurkis = (reikšmė × svoris) sandaugų suma ÷ svorių suma.",
      "Svorių suma neprivalo būti lygi 100: skaičiuojant dalijama iš jų sumos.",
    ],
    ejemplo: [
      `Šešeto svoris 20 %, aštuoneto 30 %, dešimtuko 50 %: svertinis vidurkis yra ${n(ponderado)}.`,
      `Šių trijų pažymių paprastasis vidurkis yra ${n(simple, 0)}. Dešimtuko svoris didžiausias, todėl svertinis vidurkis aukštesnis.`,
    ],
    faq: [
      {
        pregunta: "Kaip apskaičiuoti svertinį vidurkį?",
        respuesta: "Kiekvieną reikšmę padauginkite iš jos svorio, rezultatus sudėkite ir padalykite iš svorių sumos.",
      },
      {
        pregunta: "Kas, jei svorių suma nelygi 100 %?",
        respuesta: "Tai nesvarbu. Jei vieno dalyko kreditų skaičius yra 6, o kito 4, įveskite 6 ir 4. Skaičiuojant dalijama iš bendro svorio.",
      },
      {
        pregunta: "Kuo skiriasi paprastasis ir svertinis vidurkis?",
        respuesta: "Paprastajame vidurkyje visų reikšmių svoris vienodas. Svertiniame kiekviena reikšmė skaičiuojama pagal savo svorį.",
      },
    ],
    glosario: [
      { termino: "Svoris", definicion: "Kokią įtaką reikšmė daro galutiniam vidurkiui." },
      { termino: "Svertinis vidurkis", definicion: "Vidurkis, kuriame kiekviena reikšmė dauginama iš savo svorio." },
    ],
  };
};
