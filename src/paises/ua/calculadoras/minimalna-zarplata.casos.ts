import { definirCasos } from "@/motor/calculo";
import minimalnaZarplata from "./minimalna-zarplata";

const MZP = "https://zir.tax.gov.ua/docs/stavki/size_of_the_minimum_wage.pdf";

export default definirCasos(minimalnaZarplata, [
  {
    nombre: "Повна ставка у 2026 році",
    origen: { tipo: "oficial", url: MZP, detalle: "ЗІР ДПС: з 01.01.2026 мінімальна зарплата 8647 грн на місяць і 52,00 грн на годину." },
    fecha: "2026-10-24",
    entrada: { rezhym: "misiats", stavka: 100, hodyny: null },
    esperado: { minimum: 8647, naRuky: 6658.19, mzp: 8647, hod: 52, yesvMin: 1902.34 },
  },
  {
    nombre: "Пів ставки",
    origen: { tipo: "recalculado", url: MZP, detalle: "8647 × 50 % = 4323,50; ПДФО 778,23; ВЗ 216,18; на руки 3329,09." },
    fecha: "2026-10-24",
    entrada: { rezhym: "misiats", stavka: 50, hodyny: null },
    esperado: { minimum: 4323.5, pdfo: 778.23, vz: 216.18, naRuky: 3329.09 },
  },
  {
    nombre: "Погодинно 80 годин",
    origen: { tipo: "recalculado", url: MZP, detalle: "80 × 52 = 4160; ПДФО 748,80; ВЗ 208; на руки 3203,20." },
    fecha: "2026-10-24",
    entrada: { rezhym: "hodyny", stavka: null, hodyny: 80 },
    esperado: { minimum: 4160, naRuky: 3203.2 },
  },
  {
    nombre: "Грудень 2025: 8000 грн",
    origen: { tipo: "oficial", url: MZP, detalle: "ЗІР ДПС: з 01.01.2025 мінімальна зарплата 8000 грн і 48,00 грн на годину." },
    fecha: "2025-12-31",
    entrada: { rezhym: "misiats", stavka: 100, hodyny: null },
    esperado: { minimum: 8000, hod: 48, yesvMin: 1760 },
  },
  {
    nombre: "Нуль годин",
    origen: { tipo: "recalculado", url: MZP, detalle: "Без годин нічого рахувати." },
    fecha: "2026-10-24",
    entrada: { rezhym: "hodyny", stavka: null, hodyny: 0 },
    esperaError: true,
  },
]);
