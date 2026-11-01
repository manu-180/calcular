import { definirCasos } from "@/motor/calculo";
import rozrakhunokVidpusknykh from "./rozrakhunok-vidpusknykh";

const ME = "https://me.gov.ua/Documents/Detail?lang=uk-UA&id=ae96611c-41f1-4410-b6a1-f01c82f975d3&title=RoziasnenniaSchodoPoriadkuObchislenniaSerednoiZarobitnoiPlatiDliaViplatiKompensatsiiPaNevikoristaniVidpustki-NaYakiPratsivnikNabuvPravoDo31-12-2023-TaPislia31-12-2023";

export default definirCasos(rozrakhunokVidpusknykh, [
  {
    nombre: "Оклад 17 000 грн, 24 дні відпустки",
    origen: { tipo: "recalculado", url: ME, detalle: "Як у прикладі Мінекономіки: 17 000 × 12 / 365 = 558,90; × 24 = 13 413,60; ПДФО 2414,45; ВЗ 670,68; на руки 10 328,47." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 204000, dni: 365, dniVidpustky: 24 },
    esperado: { serednodenna: 558.9, vidpuskni: 13413.6, pdfo: 2414.45, vz: 670.68, naRuky: 10328.47 },
  },
  {
    nombre: "Високосний період: 366 днів, 14 днів відпустки",
    origen: { tipo: "recalculado", url: ME, detalle: "204 000 / 366 = 557,38; × 14 = 7803,32." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 204000, dni: 366, dniVidpustky: 14 },
    esperado: { serednodenna: 557.38, vidpuskni: 7803.32 },
  },
  {
    nombre: "Без заробітку",
    origen: { tipo: "recalculado", url: ME, detalle: "Без заробітку середню зарплату не обчислити." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 0, dni: 365, dniVidpustky: 24 },
    esperaError: true,
  },
]);
