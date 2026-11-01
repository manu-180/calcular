import { GRAMATICA } from "../../../i18n/gramatica";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBg: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  const za = GRAMATICA.bg.para(ctx.nombrePais);
  // Las fechas largas en bg terminan en «г.»: las oraciones no cierran con la fecha para no dejar «г..».
  return {
    h1: "Добавяне на дни към дата",
    title: tituloQueEntre(`Калкулатор за добавяне на дни към дата ${za}`, `Добавяне на дни към дата ${za}`, "Добавяне на дни към дата"),
    description: "Добавете или извадете календарни или работни дни от дата и вижте на кой ден се пада. Удобно е за срокове и падежи.",
    intro: [
      "Изберете дата, брой дни и дали да ги добавите или извадите. Ще видите получената дата и деня от седмицата.",
      "При работните дни калкулаторът пропуска съботите и неделите.",
    ],
    comoSeCalcula: [
      "При календарните дни датата се премества с един ден в календара за всеки въведен ден.",
      "При работните дни се броят само дните от понеделник до петък. Самата начална дата не се брои.",
      "Официалните празници не се изваждат, защото са различни според държавата и региона.",
    ],
    ejemplo: [
      `Резултатът е ${f(mas90)}, ако към ${f(inicio)} добавите 90 календарни дни.`,
      `Резултатът е ${f(aFecha(habil))}, ако към ${f(inicio)} добавите 15 работни дни.`,
    ],
    faq: [
      {
        pregunta: "Броим ли началната дата за първи ден?",
        respuesta: "Не. Ако добавите 1 ден към понеделник, получавате вторник. Така се броят повечето срокове.",
      },
      {
        pregunta: "Какво става, ако добавям работни дни от събота?",
        respuesta: "Първият работен ден е следващият понеделник. Ако добавите 1 работен ден към събота, получавате понеделник.",
      },
      {
        pregunta: "Отчита ли високосните години?",
        respuesta: "Да. Ако периодът минава през 29 февруари, той се брои като още един ден.",
      },
    ],
    glosario: [
      { termino: "Календарни дни", definicion: "Всички дни в календара, без пропуснати." },
      { termino: "Работни дни", definicion: "В този калкулатор това са дните от понеделник до петък." },
    ],
  };
};
