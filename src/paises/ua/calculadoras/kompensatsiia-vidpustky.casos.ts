import { definirCasos } from "@/motor/calculo";
import kompensatsiiaVidpustky from "./kompensatsiia-vidpustky";

const ME = "https://me.gov.ua/Documents/Detail?lang=uk-UA&id=ae96611c-41f1-4410-b6a1-f01c82f975d3&title=RoziasnenniaSchodoPoriadkuObchislenniaSerednoiZarobitnoiPlatiDliaViplatiKompensatsiiPaNevikoristaniVidpustki-NaYakiPratsivnikNabuvPravoDo31-12-2023-TaPislia31-12-2023";

export default definirCasos(kompensatsiiaVidpustky, [
  {
    nombre: "Приклад Мінекономіки: 15 днів, період 365 днів",
    origen: { tipo: "oficial", url: ME, detalle: "17 000 грн × 12 міс / 365 к. днів = 558,90 грн; 558,90 × 15 = 8383,50 грн." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 204000, dni: 365, dniKompensatsii: 15 },
    esperado: { serednodenna: 558.9, kompensatsiia: 8383.5 },
  },
  {
    nombre: "Приклад Мінекономіки: 7 днів, період 366 днів",
    origen: { tipo: "oficial", url: ME, detalle: "17 000 грн × 12 міс / 366 к. днів = 557,38 грн; 557,38 × 7 = 3901,66 грн." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 204000, dni: 366, dniKompensatsii: 7 },
    esperado: { serednodenna: 557.38, kompensatsiia: 3901.66, pdfo: 702.3, vz: 195.08, naRuky: 3004.28 },
  },
  {
    nombre: "Нуль днів",
    origen: { tipo: "recalculado", url: ME, detalle: "Без невикористаних днів компенсації немає." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 204000, dni: 365, dniKompensatsii: 0 },
    esperaError: true,
  },
]);
