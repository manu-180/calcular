import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const g = GRAMATICA.lt;
  return {
    h1: `PVM skaičiuoklė ${g.en(ctx.nombrePais)}`,
    title: tituloQueEntre(`PVM skaičiuoklė (${tasa}) ${g.en(ctx.nombrePais)}`, `PVM apskaičiavimas (${tasa}) ${g.en(ctx.nombrePais)}`, `PVM skaičiuoklė (${tasa})`),
    description: `Pridėkite ${tasa} PVM prie bet kurios kainos arba išskaičiuokite jį vienu veiksmu: kaina be PVM, pats mokestis ir kaina su PVM.`,
    intro: [
      `Standartinis tarifas, kurį skaičiuoklė taiko ${g.en(ctx.nombrePais)}, yra ${tasa}.`,
      "Pasirinkite, ar norite PVM pridėti prie kainos, ar išskaičiuoti jį iš kainos su PVM, ir įveskite sumą.",
    ],
    comoSeCalcula: [
      "PVM pridėjimas: mokestis = kaina be PVM × tarifas ÷ 100. Kaina su PVM = kaina be PVM + mokestis.",
      "PVM išskaičiavimas: kaina be PVM = kaina su PVM ÷ (1 + tarifas ÷ 100). Mokestis yra abiejų kainų skirtumas.",
      "Jei prekei taikomas lengvatinis tarifas, įveskite jį lauke „Kitas PVM tarifas“.",
    ],
    ejemplo: [
      `Kad pridėtumėte PVM prie ${precio} kainos, padauginkite ją iš tarifo (${tasa}), o rezultatą pridėkite prie kainos.`,
      `Kad sužinotumėte, kiek PVM yra ${precio} kainoje, padalykite ją iš vieneto ir tarifo sumos, o rezultatą atimkite iš kainos.`,
    ],
    faq: [
      {
        pregunta: "Kaip išskaičiuoti PVM iš kainos?",
        respuesta: "Padalykite kainą iš vieneto ir tarifo, išreikšto dešimtainiu skaičiumi, sumos. Rezultatas yra kaina be PVM, o skirtumas yra pats mokestis.",
      },
      {
        pregunta: "Kodėl negalima tiesiog atimti tarifo procentų iš kainos su PVM?",
        respuesta: "Nes mokestis buvo skaičiuojamas nuo mažesnės kainos be PVM. Jei atimsite procentus iš kainos su PVM, atimsite daugiau, nei sudaro mokestis.",
      },
      {
        pregunta: `Ar ${tasa} PVM taikomas viskam?`,
        respuesta: "Ne visada. Kai kuriems maisto produktams, vaistams ar paslaugoms taikomas lengvatinis tarifas arba jie neapmokestinami. Tokiu atveju naudokite lauką „Kitas PVM tarifas“.",
      },
    ],
    glosario: [
      { termino: "PVM", definicion: "Pridėtinės vertės mokestis. Jis pridedamas prie prekių ir paslaugų kainos, o į biudžetą jį sumoka PVM mokėtojas." },
      { termino: "Kaina be PVM", definicion: "Kaina prieš pridedant mokestį, apskaitoje dar vadinama apmokestinamąja verte." },
    ],
  };
};
