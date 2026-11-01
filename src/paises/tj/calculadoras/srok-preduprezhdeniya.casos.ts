import { definirCasos } from "@/motor/calculo";
import srokPreduprezhdeniya from "./srok-preduprezhdeniya";

const TK = "https://ncz.tj/content/%D1%82%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%BE%D0%B9-%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81-%D1%80%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8-%D1%82%D0%B0%D0%B4%D0%B6%D0%B8%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD";

export default definirCasos(srokPreduprezhdeniya, [
  {
    nombre: "Сокращение: два месяца",
    origen: { tipo: "recalculado", url: TK, detalle: "Ч. 1 ст. 45: 02.11.2026 + 2 месяца = 02.01.2027." },
    fecha: "2026-10-31",
    entrada: {"data": "2026-11-02", "osnovanie": "likvidatsiya"},
    esperado: {"konets": "2027-01-02", "srok": "2 мес."},
  },
  {
    nombre: "Несоответствие: один месяц",
    origen: { tipo: "recalculado", url: TK, detalle: "Ч. 1 ст. 45: 02.11.2026 + 1 месяц = 02.12.2026." },
    fecha: "2026-10-31",
    entrada: {"data": "2026-11-02", "osnovanie": "kvalifikatsiya"},
    esperado: {"konets": "2026-12-02", "srok": "1 мес."},
  },
  {
    nombre: "Работник: две недели",
    origen: { tipo: "recalculado", url: TK, detalle: "Ч. 1 ст. 41: 02.11.2026 + 14 дней = 16.11.2026." },
    fecha: "2026-10-31",
    entrada: {"data": "2026-11-02", "osnovanie": "rabotnik"},
    esperado: {"konets": "2026-11-16", "srok": "14 дн."},
  },
  {
    nombre: "Конец месяца: последний день февраля",
    origen: { tipo: "recalculado", url: TK, detalle: "31.12.2026 + 2 месяца: в феврале 2027 года 28 дней." },
    fecha: "2026-10-31",
    entrada: {"data": "2026-12-31", "osnovanie": "likvidatsiya"},
    esperado: {"konets": "2027-02-28"},
  },
]);
