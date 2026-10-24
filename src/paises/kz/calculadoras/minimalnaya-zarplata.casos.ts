import { definirCasos } from "@/motor/calculo";
import minimalnayaZarplata from "./minimalnaya-zarplata";

const TK = "https://adilet.zan.kz/rus/docs/K1500000414";

export default definirCasos(minimalnayaZarplata, [
  {
    nombre: "Полный месяц, 80 000 тенге: ниже МЗП",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 103: за полную норму не меньше МЗП 85 000. Разница −5000." },
    fecha: "2026-10-24",
    entrada: { oklad: 80000, dolya: 100, normaChasov: null },
    esperado: { minimum: 85000, raznitsa: -5000, vyvod: "Зарплата ниже минимальной", zaGod: 1020000 },
  },
  {
    nombre: "Половина ставки, 50 000 тенге",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 104: МЗП пропорционально времени, 85 000 × 50 % = 42 500." },
    fecha: "2026-10-24",
    entrada: { oklad: 50000, dolya: 50, normaChasov: null },
    esperado: { minimum: 42500, raznitsa: 7500, vyvod: "Зарплата не ниже минимальной" },
  },
  {
    nombre: "Минимальная оплата часа при норме 160 часов",
    origen: { tipo: "recalculado", url: TK, detalle: "85 000 / 160 = 531,25 тенге за час." },
    fecha: "2026-10-24",
    entrada: { oklad: 85000, dolya: 100, normaChasov: 160 },
    esperado: { chasovoy: 531.25, raznitsa: 0 },
  },
]);
