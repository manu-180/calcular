import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  // Desmit ballu skala: sešinieks 20%, astotnieks 30%, desmitnieks 50%.
  const ponderado = (6 * 20 + 8 * 30 + 10 * 50) / (20 + 30 + 50);
  const simple = (6 + 8 + 10) / 3;
  return {
    h1: "Vidējās vērtības kalkulators",
    title: tituloQueEntre(
      `Svērtās vidējās vērtības kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Kā aprēķināt atzīmju svērto vidējo vērtību",
      "Svērtā vidējā vērtība",
    ),
    description: "Aprēķiniet atzīmju vienkāršo un svērto vidējo vērtību no līdz 10 vērtībām, katrai norādot svaru: procentos, kredītpunktos vai atkārtojumu skaitā.",
    intro: [
      "Ievadiet katru atzīmi un tās svaru. Redzēsiet svērto vidējo vērtību, bet blakus tai vienkāršo.",
      "Kalkulators der skolas un augstskolas atzīmēm un jebkurai vidējai vērtībai, kur dažas vērtības ir svarīgākas par citām.",
    ],
    comoSeCalcula: [
      "Vienkāršā vidējā vērtība = vērtību summa ÷ vērtību skaits.",
      "Svērtā vidējā vērtība = reizinājumu (vērtība × svars) summa ÷ svaru summa.",
      "Svaru summai nav jābūt 100: aprēķinā dala ar to summu.",
    ],
    ejemplo: [
      `Sešinieka svars ir 20%, astotnieka 30%, desmitnieka 50%: svērtā vidējā vērtība ir ${n(ponderado)}.`,
      `Šo trīs atzīmju vienkāršā vidējā vērtība ir ${n(simple, 0)}. Desmitnieka svars ir vislielākais, tāpēc svērtā vidējā vērtība ir augstāka.`,
    ],
    faq: [
      {
        pregunta: "Kā aprēķināt svērto vidējo vērtību?",
        respuesta: "Katru vērtību sareiziniet ar tās svaru, rezultātus saskaitiet un izdaliet ar svaru summu.",
      },
      {
        pregunta: "Kā ir, ja svaru summa nav 100%?",
        respuesta: "Tam nav nozīmes. Ja vienam priekšmetam ir 6 kredītpunkti, bet citam 4, ievadiet 6 un 4. Aprēķinā dala ar kopējo svaru.",
      },
      {
        pregunta: "Ar ko atšķiras vienkāršā un svērtā vidējā vērtība?",
        respuesta: "Vienkāršajā vidējā vērtībā visu vērtību svars ir vienāds. Svērtajā katra vērtība tiek skaitīta atbilstoši savam svaram.",
      },
    ],
    glosario: [
      { termino: "Svars", definicion: "Cik lielu ietekmi vērtība atstāj uz galīgo vidējo vērtību." },
      { termino: "Svērtā vidējā vērtība", definicion: "Vidējā vērtība, kurā katru vērtību reizina ar tās svaru." },
    ],
  };
};
