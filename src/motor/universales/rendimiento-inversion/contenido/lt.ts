import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Investicijų grąžos (ROI) skaičiuoklė",
    title: tituloQueEntre(
      `Investicijų grąža ROI ir CAGR ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Investicijų grąža: ROI ir CAGR skaičiuoklė",
      "ROI ir CAGR skaičiuoklė",
    ),
    description: "Apskaičiuokite bendrą investicijų grąžą (ROI) ir metinę grąžą (CAGR) pagal investuotą sumą, dabartinę vertę ir metų skaičių.",
    intro: [
      "50 % pelnas per porą metų ir per dešimtmetį reiškia visai ką kita. Kad galėtumėte palyginti investicijas, reikia metinės grąžos.",
      "Įveskite, kiek investavote, kokia investicijos vertė šiandien ir kiek metų praėjo. Parodysime bendrą grąžą ir vidutinę metinę grąžą su sudėtinėmis palūkanomis.",
    ],
    comoSeCalcula: [
      "ROI = (galutinė vertė + išmokėtos pajamos − investuota suma) ÷ investuota suma × 100.",
      "CAGR = ((galutinė vertė + išmokėtos pajamos) ÷ investuota suma) pakelta laipsniu (1 ÷ metų skaičius), minus 1.",
      "CAGR yra sudėtinis metinis augimo tempas: toks, kuris duoda tą patį rezultatą, kai kartojasi kasmet.",
    ],
    ejemplo: [
      `Kai investuojate ${m(inicial)} ir pabaigoje turite ${m(final)}, uždirbate ${m(final - inicial)}: ROI yra ${p(roi(inicial, final))}.`,
      `Jei trukmė yra 5 metai, metinė grąža yra ${p(cagr(inicial, final, 5))}. Jei trukmė yra 2 metai, ji siekia ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Kuo skiriasi ROI ir CAGR?",
        respuesta: "ROI yra bendras pelnas nuo investuotos sumos, neatsižvelgiant į laiką. CAGR jį paskirsto metams, todėl galite palyginti skirtingos trukmės investicijas.",
      },
      {
        pregunta: "Kodėl metinė grąža nėra tiesiog bendra grąža, padalyta iš metų skaičiaus?",
        respuesta: `Nes kiekvienų metų pelnas pridedamas prie likučio ir toliau uždirba. Jei 50 % pelnas pasiektas per penkerius metus, metinė grąža su sudėtinėmis palūkanomis yra ${p(cagr(1, 1.5, 5))}, ne 10 %.`,
      },
      {
        pregunta: "Kaip įskaičiuoti išmokėtus dividendus ar palūkanas?",
        respuesta: "Jei juos pasiėmėte, įveskite į išmokėtas pajamas. Jei juos vėl investavote, jie jau yra galutinėje vertėje.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Investicijų grąža: bendras pelnas procentais nuo investuotos sumos." },
      { termino: "CAGR", definicion: "Sudėtinis metinis augimo tempas: vidutinė metinė grąža, įskaičiavus sudėtines palūkanas." },
    ],
  };
};
