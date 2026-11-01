import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Pelno maržos ir antkainio skaičiuoklė",
    title: tituloQueEntre(`Pelno maržos skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Pelno maržos ir antkainio skaičiuoklė", "Pelno maržos skaičiuoklė"),
    description: "Apskaičiuokite pelno maržą ir antkainį pagal savikainą ir pardavimo kainą arba pardavimo kainą, kuri užtikrins norimą maržą.",
    intro: [
      "Marža ir antkainis dažnai painiojami, o šis skirtumas gali kainuoti pinigų. Abu rodo tą patį pelną, tik lyginant su skirtingu pagrindu.",
      "Įveskite savikainą ir pardavimo kainą ir matysite abu rodiklius. Arba pasirinkite maržą, o skaičiuoklė pasakys, už kiek parduoti.",
    ],
    comoSeCalcula: [
      "Pelnas = pardavimo kaina − savikaina.",
      "Marža = pelnas ÷ pardavimo kaina × 100.",
      "Antkainis = pelnas ÷ savikaina × 100.",
      "Kaina pagal norimą maržą = savikaina ÷ (1 − marža ÷ 100).",
    ],
    ejemplo: [
      `Kai prekės savikaina yra ${m(costo)}, o pardavimo kaina ${m(precio)}, pelnas yra ${m(precio - costo)}: marža ${p(((precio - costo) / precio) * 100)}, antkainis ${p(((precio - costo) / costo) * 100)}.`,
      `Kad marža būtų 50 %, esant tai pačiai savikainai, kaina turi būti ${m(precioConMargen(costo, 50))}. Jei prie savikainos tik pridėsite 50 %, marža bus vos ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Kuo skiriasi marža ir antkainis?",
        respuesta: "Marža yra pelnas, lyginamas su pardavimo kaina. Antkainis yra pelnas, lyginamas su savikaina. Kai pelnas tas pats, antkainis visada yra didesnis skaičius.",
      },
      {
        pregunta: "Kaip nustatyti kainą pagal norimą maržą?",
        respuesta: `Padalykite savikainą iš (1 − marža). Kai norima marža 30 %, savikainą dalykite iš ${formatearNumero(ctx, 0.7, 2)}. Nepridėkite 30 % prie savikainos: uždirbtumėte mažiau, nei tikitės.`,
      },
      {
        pregunta: "Ar savikaina turi apimti mokesčius?",
        respuesta: "Skaičiuokite savikainą ir kainą be mokesčių, kuriuos perkeliate klientui, pavyzdžiui, be PVM. Kitaip marža bus didesnė, nei yra iš tikrųjų.",
      },
    ],
    glosario: [
      { termino: "Pelno marža", definicion: "Pelnas procentais nuo pardavimo kainos." },
      { termino: "Antkainis", definicion: "Pelnas procentais nuo savikainos." },
    ],
  };
};
