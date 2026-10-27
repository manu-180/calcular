import { definirCasos } from "@/motor/calculo";
import raschetPriUvolnenii from "./raschet-pri-uvolnenii";

const TK = "https://cbd.minjust.gov.kg/3-45/edition/57548/ru";

export default definirCasos(raschetPriUvolnenii, [
  {
    nombre: "Сокращение штата в середине месяца",
    origen: {
      tipo: "recalculado",
      url: TK,
      detalle: "Зарплата 50 000 / 22 × 10 = 22 727,27. Статья 95: 150 000 / 3 / 29,6 = 1689,19 × 14 = 23 648,66. Статья 47: 600 000 / 12 × 2 = 100 000. Итого 146 375,93.",
    },
    fecha: "2026-10-27",
    entrada: { osnovanie: "sokrashchenie", oklad: 50000, norma: 22, otrabotano: 10, zarabotok3: 150000, otpusk: 14, zarabotok12: 600000 },
    esperado: { itogo: 146375.93, zarplata: 22727.27, kompensatsiya: 23648.66, posobie: 100000, sredniyDen: 1689.19 },
  },
  {
    nombre: "По собственному желанию",
    origen: { tipo: "recalculado", url: TK, detalle: "Выходное пособие не положено: 22 727,27 + 23 648,66 = 46 375,93." },
    fecha: "2026-10-27",
    entrada: { osnovanie: "sobstvennoe", oklad: 50000, norma: 22, otrabotano: 10, zarabotok3: 150000, otpusk: 14, zarabotok12: 600000 },
    esperado: { itogo: 46375.93, posobie: 0 },
  },
  {
    nombre: "Призыв на военную службу, отпуск использован",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 47, часть 2: один среднемесячный заработок 50 000. Полный месяц 50 000. Итого 100 000." },
    fecha: "2026-10-27",
    entrada: { osnovanie: "prizyv", oklad: 50000, norma: 22, otrabotano: 22, zarabotok3: 150000, otpusk: 0, zarabotok12: 600000 },
    esperado: { itogo: 100000, zarplata: 50000, kompensatsiya: 0, posobie: 50000 },
  },
  {
    nombre: "Отработано больше, чем по графику",
    origen: { tipo: "recalculado", url: TK, detalle: "Ошибка ввода." },
    fecha: "2026-10-27",
    entrada: { osnovanie: "sobstvennoe", oklad: 50000, norma: 22, otrabotano: 23, zarabotok3: 150000, otpusk: 0, zarabotok12: 600000 },
    esperaError: true,
  },
]);
