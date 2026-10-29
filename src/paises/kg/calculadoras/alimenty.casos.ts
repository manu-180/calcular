import { definirCasos } from "@/motor/calculo";
import alimenty from "./alimenty";

const SK = "https://cbd.minjust.gov.kg/3-21/edition/36036/ru";

export default definirCasos(alimenty, [
  {
    nombre: "Один ребенок, доход 40 000 сомов",
    origen: { tipo: "recalculado", url: SK, detalle: "Статья 86: одна четверть. 40 000 / 4 = 10 000; минимум 3280." },
    fecha: "2026-10-27",
    entrada: { dokhod: 40000, deti: "odin", trudosposoben: true },
    esperado: { alimenty: 10000, poDole: 10000, minimum: 3280 },
  },
  {
    nombre: "Один ребенок, доход 9000 сомов: минимум",
    origen: { tipo: "recalculado", url: SK, detalle: "9000 / 4 = 2250 меньше одной минимальной зарплаты 3280." },
    fecha: "2026-10-27",
    entrada: { dokhod: 9000, deti: "odin", trudosposoben: true },
    esperado: { alimenty: 3280 },
  },
  {
    nombre: "Трое детей, доход 6000 сомов",
    origen: { tipo: "recalculado", url: SK, detalle: "Половина 3000, минимум 2 × 3280 = 6560." },
    fecha: "2026-10-27",
    entrada: { dokhod: 6000, deti: "tri", trudosposoben: true },
    esperado: { alimenty: 6560, poDole: 3000 },
  },
  {
    nombre: "Двое детей, нетрудоспособный родитель",
    origen: { tipo: "recalculado", url: SK, detalle: "Одна треть: 6000 / 3 = 2000, минимум не применяется." },
    fecha: "2026-10-27",
    entrada: { dokhod: 6000, deti: "dva", trudosposoben: false },
    esperado: { alimenty: 2000, minimum: 0 },
  },
  {
    nombre: "Отрицательный доход",
    origen: { tipo: "recalculado", url: SK, detalle: "Доход не может быть отрицательным." },
    fecha: "2026-10-27",
    entrada: { dokhod: -1, deti: "odin", trudosposoben: true },
    esperaError: true,
  },
]);
