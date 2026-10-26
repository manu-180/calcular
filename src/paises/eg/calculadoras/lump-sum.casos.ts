import { definirCasos } from "@/motor/calculo";
import calculadora from "./lump-sum";

export default definirCasos(calculadora, [
  {
    nombre: "عشر سنوات بأجر 6,000 جنيه",
    origen: { tipo: "recalculado", detalle: "المادة 26: 15% × (6,000 × 12) = 10,800 عن كل سنة × 10 = 108,000." },
    fecha: "2026-10-24",
    entrada: { salario: 6000, anios: 10, meses: 0 },
    esperado: { total: 108000, porAnio: 10800, anual: 72000 },
  },
  {
    nombre: "ثماني سنوات وستة أشهر",
    origen: { tipo: "recalculado", detalle: "15% × 48,000 = 7,200 × 8.5 = 61,200." },
    fecha: "2026-10-24",
    entrada: { salario: 4000, anios: 8, meses: 6 },
    esperado: { total: 61200 },
  },
]);
