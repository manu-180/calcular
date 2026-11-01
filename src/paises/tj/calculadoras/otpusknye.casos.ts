import { definirCasos } from "@/motor/calculo";
import otpusknye from "./otpusknye";

const TK = "https://ncz.tj/content/%D1%82%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%BE%D0%B9-%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81-%D1%80%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8-%D1%82%D0%B0%D0%B4%D0%B6%D0%B8%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD";

export default definirCasos(otpusknye, [
  {
    nombre: "24 дня при заработке 200 сомони",
    origen: { tipo: "recalculado", url: TK, detalle: "Ст. 93: минимум 24 дня. 200 × 24 = 4800." },
    fecha: "2026-10-31",
    entrada: {"zarabotok": 200, "dney": 24},
    esperado: {"otpusknye": 4800, "minimumDney": 24},
  },
  {
    nombre: "35 дней при заработке 150,50 сомони",
    origen: { tipo: "recalculado", url: TK, detalle: "150,50 × 35 = 5267,50." },
    fecha: "2026-10-31",
    entrada: {"zarabotok": 150.5, "dney": 35},
    esperado: {"otpusknye": 5267.5},
  },
  {
    nombre: "Меньше минимума: предупреждение",
    origen: { tipo: "recalculado", url: TK, detalle: "14 дней меньше минимума, расчет все равно выполняется." },
    fecha: "2026-10-31",
    entrada: {"zarabotok": 100, "dney": 14},
    esperado: {"otpusknye": 1400},
  },
  {
    nombre: "Заработок ноль",
    origen: { tipo: "recalculado", url: TK, detalle: "Заработок должен быть больше нуля." },
    fecha: "2026-10-31",
    entrada: {"zarabotok": 0, "dney": 24},
    esperaError: true,
  },
]);
