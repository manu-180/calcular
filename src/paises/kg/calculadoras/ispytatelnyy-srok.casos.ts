import { definirCasos } from "@/motor/calculo";
import ispytatelnyySrok from "./ispytatelnyy-srok";

const TK = "https://cbd.minjust.gov.kg/3-45/edition/57548/ru";

export default definirCasos(ispytatelnyySrok, [
  {
    nombre: "Обычный работник, 3 месяца",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 24: не больше 3 месяцев; статья 12: срок истекает в соответствующее число. 02.03.2026 + 3 месяца = 02.06.2026." },
    fecha: "2026-10-27",
    entrada: { dolzhnost: "obshchiy", nachalo: "2026-03-02", mesyatsev: 3, otsutstvie: 0 },
    esperado: { konets: "2026-06-02", maks: 3 },
  },
  {
    nombre: "Главный бухгалтер, 6 месяцев с 31 августа",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 24: руководителям и главным бухгалтерам до 6 месяцев. В феврале 2027 года нет 31 числа, срок истекает 28.02.2027." },
    fecha: "2026-10-27",
    entrada: { dolzhnost: "rukovoditel", nachalo: "2026-08-31", mesyatsev: 6, otsutstvie: 0 },
    esperado: { konets: "2027-02-28", maks: 6 },
  },
  {
    nombre: "Больничный во время испытания",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 24, часть 5: дни отсутствия не засчитываются. 02.06.2026 + 5 дней = 07.06.2026." },
    fecha: "2026-10-27",
    entrada: { dolzhnost: "obshchiy", nachalo: "2026-03-02", mesyatsev: 3, otsutstvie: 5 },
    esperado: { konets: "2026-06-07" },
  },
  {
    nombre: "Шесть месяцев для обычного работника",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 24, часть 4: больше 3 месяцев нельзя." },
    fecha: "2026-10-27",
    entrada: { dolzhnost: "obshchiy", nachalo: "2026-03-02", mesyatsev: 6, otsutstvie: 0 },
    esperaError: true,
  },
]);
