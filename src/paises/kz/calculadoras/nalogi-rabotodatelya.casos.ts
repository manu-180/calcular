import { definirCasos } from "@/motor/calculo";
import nalogiRabotodatelya from "./nalogi-rabotodatelya";

const SK = "https://adilet.zan.kz/rus/docs/K2300000224";
const NK = "https://adilet.zan.kz/rus/docs/K2500000214";

export default definirCasos(nalogiRabotodatelya, [
  {
    nombre: "500 000 тенге, работник 1990 года рождения",
    origen: {
      tipo: "recalculado",
      url: SK,
      detalle:
        "ОПВР 3,5 % × 500 000 = 17 500; СО 5 % × (500 000 − ОПВ 50 000) = 22 500; ООСМС 3 % = 15 000; социальный налог 6 % × (500 000 − 50 000 − 10 000) = 26 400. Всего 81 400, стоимость 581 400.",
    },
    fecha: "2026-10-24",
    entrada: { oklad: 500000, opvr: true },
    esperado: { opvr: 17500, so: 22500, oosms: 15000, sn: 26400, vsego: 81400, stoimost: 581400, naRuki: 408975 },
  },
  {
    nombre: "1 000 000 тенге, работник 1970 года рождения: СО по пределу 7 МЗП",
    origen: {
      tipo: "recalculado",
      url: SK,
      detalle: "ОПВР не платятся; СО 5 % × 595 000 (7 МЗП) = 29 750; ООСМС 30 000; социальный налог 6 % × 880 000 = 52 800. Всего 112 550.",
    },
    fecha: "2026-10-24",
    entrada: { oklad: 1000000, opvr: false },
    esperado: { opvr: 0, so: 29750, oosms: 30000, sn: 52800, vsego: 112550 },
  },
  {
    nombre: "Неполный день, 50 000 тенге: наименьшие базы",
    origen: {
      tipo: "recalculado",
      url: NK,
      detalle: "ОПВР и СО считаются не меньше чем с МЗП: 2975 и 4250. ООСМС 1500. Объект социального налога не меньше 14 МРП = 60 550, налог 3633. Всего 12 358.",
    },
    fecha: "2026-10-24",
    entrada: { oklad: 50000, opvr: true },
    esperado: { opvr: 2975, so: 4250, oosms: 1500, sn: 3633, vsego: 12358 },
  },
  {
    nombre: "Нулевая зарплата",
    origen: { tipo: "recalculado", url: NK, detalle: "Без зарплаты платежей нет." },
    fecha: "2026-10-24",
    entrada: { oklad: 0, opvr: true },
    esperaError: true,
  },
]);
