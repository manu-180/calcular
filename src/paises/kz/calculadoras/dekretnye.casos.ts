import { definirCasos } from "@/motor/calculo";
import dekretnye from "./dekretnye";

const SK = "https://adilet.zan.kz/rus/docs/K2300000224";

export default definirCasos(dekretnye, [
  {
    nombre: "Нормальные роды, доход 6 млн тенге за год",
    origen: {
      tipo: "recalculado",
      url: SK,
      detalle: "Статья 78: СМД 6 000 000 / 12 = 500 000; × 126 / 30 = 2 100 000. Статья 76: ОПВ 10 % = 210 000. На руки 1 890 000.",
    },
    fecha: "2026-10-24",
    entrada: { dokhod: 6000000, rody: "normalnye" },
    esperado: { smd: 500000, dni: 126, vyplata: 2100000, opv: 210000, naRuki: 1890000 },
  },
  {
    nombre: "Осложненные роды, высокий доход: СМД не больше 7 МЗП",
    origen: {
      tipo: "recalculado",
      url: SK,
      detalle: "СМД 1 000 000 ограничен 7 × 85 000 = 595 000; × 140 / 30 = 2 776 666,67; ОПВ 277 666,67; на руки 2 499 000.",
    },
    fecha: "2026-10-24",
    entrada: { dokhod: 12000000, rody: "oslozhnennye" },
    esperado: { smd: 595000, vyplata: 2776666.67, opv: 277666.67, naRuki: 2499000 },
  },
  {
    nombre: "Без дохода",
    origen: { tipo: "recalculado", url: SK, detalle: "Нужен доход, с которого платились СО." },
    fecha: "2026-10-24",
    entrada: { dokhod: 0, rody: "normalnye" },
    esperaError: true,
  },
]);
