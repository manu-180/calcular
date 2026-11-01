import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x, 0);
  return {
    h1: "Procentų skaičiuoklė",
    title: tituloQueEntre(`Procentų skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Procentų skaičiuoklė: kaip apskaičiuoti", "Procentų skaičiuoklė"),
    description: "Apskaičiuokite procentus nuo skaičiaus, kiek procentų vienas skaičius sudaro nuo kito ir rezultatą pridėjus arba atėmus procentus.",
    intro: [
      "Pasirinkite, ką norite sužinoti, įveskite abu skaičius ir rezultatą matysite iš karto.",
      "Skaičiuoklė apima keturis įprastus skaičiavimus su procentais: dalį, santykį, padidinimą ir sumažinimą.",
    ],
    comoSeCalcula: [
      "X % nuo Y = X × Y ÷ 100.",
      "Kiek procentų nuo Y sudaro X = X ÷ Y × 100.",
      "Y plius X % = Y × (1 + X ÷ 100). Y minus X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15 % nuo 200 yra ${n((15 * 200) / 100)}.`,
      `30 yra ${n((30 / 120) * 100)} % nuo 120.`,
      `Pabrangus 10 %, ${m(precio)} kaina tampa ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Kaip apskaičiuoti procentus nuo skaičiaus?",
        respuesta: `Skaičių padauginkite iš procentų ir padalykite iš 100. 20 % nuo 350 yra 350 × 20 ÷ 100 = ${n((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Kaip sužinoti, kiek procentų vienas skaičius sudaro nuo kito?",
        respuesta: `Dalį padalykite iš visumos ir padauginkite iš 100. Jei iš 60 testo klausimų teisingi 45, tai 45 ÷ 60 × 100 = ${n((45 / 60) * 100)} %.`,
      },
      {
        pregunta: "Kaip prie kainos pridėti procentus?",
        respuesta: `Padauginkite ją iš vieneto ir procentų, išreikštų dešimtainiu skaičiumi, sumos. Kad pridėtumėte 10 %, dauginkite iš ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Jei kainą padidinsiu 10 %, o paskui sumažinsiu 10 %, ar grįšiu į pradžią?",
        respuesta: `Ne. 100 plius 10 % yra ${n(110)}, o ${n(110)} minus 10 % yra ${n(99)}. Mat sumažinimas skaičiuojamas nuo didesnio skaičiaus.`,
      },
    ],
    glosario: [
      { termino: "Procentas", definicion: "Visumos dalis, išreikšta šimtosiomis." },
      { termino: "Bazė", definicion: "Skaičius, nuo kurio skaičiuojami procentai (šioje skaičiuoklėje Y)." },
    ],
  };
};
