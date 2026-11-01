import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Proporcijos skaičiuoklė",
    title: tituloQueEntre(`Proporcijos skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Kaip apskaičiuoti proporciją: skaičiuoklė", "Proporcijos skaičiuoklė"),
    description: "Išspręskite tiesioginį ir atvirkštinį proporcingumą akimirksniu. Įveskite tris reikšmes ir gausite ketvirtąją kartu su skaičiavimo eiga.",
    intro: [
      "Proporcija tinka tada, kai du dydžiai kinta kartu ir žinomos trys iš keturių reikšmių.",
      "Pasirinkite tiesioginį arba atvirkštinį proporcingumą, įveskite A, B ir C, o skaičiuoklė apskaičiuos X.",
    ],
    comoSeCalcula: [
      "Tiesioginis proporcingumas: X = B × C ÷ A. Naudokite, kai abu dydžiai didėja kartu (daugiau kilogramų, didesnė kaina).",
      "Atvirkštinis proporcingumas: X = A × B ÷ C. Naudokite, kai vienas dydis didėja, o kitas mažėja (daugiau žmonių, mažiau dienų).",
    ],
    ejemplo: [
      `Jei 3 kilogramai kainuoja ${m(precio3)}, tai 5 kilogramai kainuoja ${m((precio3 * 5) / 3)}.`,
      "Kai namą dažo 4 žmonės, darbo trukmė yra 12 dienų. Kai dažo 6 žmonės, trukmė yra 8 dienos.",
    ],
    faq: [
      {
        pregunta: "Kaip atskirti tiesioginį proporcingumą nuo atvirkštinio?",
        respuesta: "Kai vienas dydis didėja kartu su kitu, proporcingumas tiesioginis. Kai vienas mažėja, o kitas didėja, proporcingumas atvirkštinis.",
      },
      {
        pregunta: "Kaip apskaičiuoti tiesioginę proporciją rankiniu būdu?",
        respuesta: `Dvi žinomas reikšmes sudauginkite kryžmai ir padalykite iš likusios. Jei 3 atitinka 600, tai 5 atitinka 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Ar proporciją galima taikyti procentams?",
        respuesta: "Taip. Jei 200 yra 100 %, tai 50 yra 25 %: tai tiesioginis proporcingumas, kai A = 200, B = 100 ir C = 50.",
      },
    ],
    glosario: [
      { termino: "Tiesioginis proporcingumas", definicion: "Abu dydžiai kartu didėja arba mažėja." },
      { termino: "Atvirkštinis proporcingumas", definicion: "Vienam dydžiui didėjant, kitas mažėja." },
    ],
  };
};
