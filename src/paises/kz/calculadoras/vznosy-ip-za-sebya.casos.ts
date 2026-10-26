import { definirCasos } from "@/motor/calculo";
import vznosyIpZaSebya from "./vznosy-ip-za-sebya";

const SK = "https://adilet.zan.kz/rus/docs/K2300000224";

export default definirCasos(vznosyIpZaSebya, [
  {
    nombre: "ИП на упрощенке с дохода МЗП",
    origen: {
      tipo: "recalculado",
      url: SK,
      detalle: "ОПВ 10 % × 85 000 = 8500; СО 5 % × 85 000 = 4250; ВОСМС 5 % × 1,4 МЗП (119 000) = 5950. Всего 18 700 в месяц.",
    },
    fecha: "2026-10-24",
    entrada: { dokhod: 85000, rezhim: "uproshchenka" },
    esperado: { opv: 8500, so: 4250, vosms: 5950, sn: 0, vsego: 18700, zaGod: 224400 },
  },
  {
    nombre: "ИП на общеустановленном порядке: плюс социальный налог 2 МРП",
    origen: { tipo: "recalculado", url: "https://adilet.zan.kz/rus/docs/K2500000214", detalle: "Статья 557, пункт 3: 2 × 4325 = 8650. Всего 18 700 + 8650 = 27 350." },
    fecha: "2026-10-24",
    entrada: { dokhod: 85000, rezhim: "obshchiy" },
    esperado: { sn: 8650, vsego: 27350 },
  },
  {
    nombre: "Доход 1 млн тенге: СО по пределу 7 МЗП",
    origen: { tipo: "recalculado", url: SK, detalle: "ОПВ 100 000; СО 5 % × 595 000 = 29 750; ВОСМС 5950. Всего 135 700." },
    fecha: "2026-10-24",
    entrada: { dokhod: 1000000, rezhim: "uproshchenka" },
    esperado: { opv: 100000, so: 29750, vsego: 135700 },
  },
  {
    nombre: "Нулевой доход",
    origen: { tipo: "recalculado", url: SK, detalle: "Доход должен быть больше нуля." },
    fecha: "2026-10-24",
    entrada: { dokhod: 0, rezhim: "uproshchenka" },
    esperaError: true,
  },
]);
