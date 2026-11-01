import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Sudėtinių palūkanų skaičiuoklė",
    title: tituloQueEntre(`Sudėtinių palūkanų skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Sudėtinių palūkanų skaičiuoklė", "Sudėtinės palūkanos"),
    description: "Pažiūrėkite, kaip auga pinigai su sudėtinėmis palūkanomis ir reguliariomis mėnesinėmis įmokomis: galutinė suma, gautos palūkanos ir lentelė pagal metus.",
    intro: [
      "Taikant sudėtines palūkanas, priskaičiuotos palūkanos pridedamos prie sumos ir pačios toliau uždirba. Todėl santaupos auga vis greičiau.",
      "Įveskite šiandien turimą sumą, kiek galite pridėti per mėnesį, palūkanų normą ir metų skaičių. Parodysime galutinę sumą ir kokią jos dalį sudaro palūkanos.",
    ],
    comoSeCalcula: [
      "Galutinė suma = pradinė suma × (1 + i) n-tuoju laipsniu + mėnesinė įmoka × ((1 + i) n-tuoju laipsniu − 1) ÷ i.",
      "Čia i yra mėnesio norma, atitinkanti pasirinktą palūkanų priskaičiavimą, o n yra mėnesių skaičius.",
      "Mėnesinės įmokos įskaitomos kiekvieno mėnesio pabaigoje.",
    ],
    ejemplo: [
      `Jei pradėsite nuo ${m(capital)} ir kas mėnesį pridėsite ${m(aporte)}, o metinė palūkanų norma bus 7 %, po 10 metų turėsite ${m(a10)}.`,
      `Dar po 10 metų suma išaugs iki ${m(a20)}. Antrasis dešimtmetis duoda gerokai daugiau nei pirmasis.`,
    ],
    faq: [
      {
        pregunta: "Kuo skiriasi paprastosios ir sudėtinės palūkanos?",
        respuesta:
          "Paprastosios palūkanos visada skaičiuojamos tik nuo pradinės sumos. Sudėtinės palūkanos skaičiuojamos nuo sumos kartu su jau priskaičiuotomis palūkanomis.",
      },
      {
        pregunta: "Kas yra 72 taisyklė?",
        respuesta: "Greitas būdas įvertinti, per kiek metų pinigai padvigubės: 72 padalykite iš metinės palūkanų normos. Kai norma 6 %, suma padvigubėja maždaug per 12 metų.",
      },
      {
        pregunta: "Kokią palūkanų normą įvesti?",
        respuesta:
          "Tokią, kuri realistiška tam, ką darysite su pinigais. Jei norite matyti rezultatą šiandienos kainomis, įveskite normą, sumažintą numatoma infliacija.",
      },
    ],
    glosario: [
      { termino: "Palūkanų priskaičiavimas", definicion: "Gautų palūkanų pridėjimas prie sumos, kad toliau augtų ir jos." },
      { termino: "Sudėtinės palūkanos", definicion: "Palūkanos, skaičiuojamos nuo sumos kartu su jau priskaičiuotomis palūkanomis." },
    ],
  };
};
