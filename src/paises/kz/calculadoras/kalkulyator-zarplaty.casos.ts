import { definirCasos } from "@/motor/calculo";
import kalkulyatorZarplaty from "./kalkulyator-zarplaty";

const NK = "https://adilet.zan.kz/rus/docs/K2500000214";

export default definirCasos(kalkulyatorZarplaty, [
  {
    nombre: "500 000 тенге с базовым вычетом",
    origen: {
      tipo: "recalculado",
      url: NK,
      detalle: "ОПВ 10 % = 50 000; ВОСМС 2 % = 10 000; вычет 30 МРП = 129 750; облагаемый доход 310 250; ИПН 10 % = 31 025; на руки 408 975.",
    },
    fecha: "2026-10-24",
    entrada: { oklad: 500000, vychet: true },
    esperado: { opv: 50000, vosms: 10000, vychet: 129750, oblagaemyy: 310250, ipn: 31025, nettoYanvar: 408975, nettoDekabr: 408975, nettoSredne: 408975 },
  },
  {
    nombre: "МЗП 85 000 тенге: вычет больше облагаемого дохода",
    origen: {
      tipo: "recalculado",
      url: NK,
      detalle: "ОПВ 8500; ВОСМС 1700; вычет ограничен доходом 74 800 (статья 437); ИПН 0; на руки 74 800.",
    },
    fecha: "2026-10-24",
    entrada: { oklad: 85000, vychet: true },
    esperado: { opv: 8500, vosms: 1700, vychet: 74800, ipn: 0, nettoYanvar: 74800 },
  },
  {
    nombre: "500 000 тенге без вычета",
    origen: { tipo: "recalculado", url: NK, detalle: "Облагаемый доход 500 000 − 50 000 − 10 000 = 440 000; ИПН 44 000; на руки 396 000." },
    fecha: "2026-10-24",
    entrada: { oklad: 500000, vychet: false },
    esperado: { ipn: 44000, nettoYanvar: 396000 },
  },
  {
    nombre: "4 000 000 тенге: порог 8500 МРП в ноябре",
    origen: {
      tipo: "recalculado",
      url: NK,
      detalle:
        "ОПВ 400 000 (предел 50 МЗП не достигнут); ВОСМС от 20 МЗП = 34 000; облагаемый 3 436 250 в месяц. Порог 8500 × 4325 = 36 762 500 пройден в ноябре: ИПН в ноябре 395 437,50, в декабре 515 437,50, за год 4 347 125. На руки в январе 3 222 375, в декабре 3 050 562,50.",
    },
    fecha: "2026-10-24",
    entrada: { oklad: 4000000, vychet: true },
    esperado: { opv: 400000, vosms: 34000, ipn: 343625, nettoYanvar: 3222375, nettoDekabr: 3050562.5, ipnZaGod: 4347125, nettoZaGod: 38444875 },
  },
  {
    nombre: "Нулевая зарплата",
    origen: { tipo: "recalculado", url: NK, detalle: "Без зарплаты считать нечего." },
    fecha: "2026-10-24",
    entrada: { oklad: 0, vychet: true },
    esperaError: true,
  },
]);
