import { definirCasos } from "@/motor/calculo";
import calculadora from "./redundancy-pay";

export default definirCasos(calculadora, [
  {
    nombre: "ثماني سنوات خدمة",
    origen: { tipo: "recalculado", detalle: "خمس سنوات × شهر = 5 أشهر، وثلاث سنوات × شهر ونصف = 4.5 أشهر. 9.5 × 10,000 = 95,000." },
    fecha: "2026-10-24",
    entrada: { salario: 10000, anios: 8 },
    esperado: { total: 95000, parteInicial: 50000, parteResto: 45000, meses: 9.5 },
  },
  {
    nombre: "ثلاث سنوات خدمة",
    origen: { tipo: "recalculado", detalle: "3 × شهر × 7,000 = 21,000." },
    fecha: "2026-10-24",
    entrada: { salario: 7000, anios: 3 },
    esperado: { total: 21000, parteResto: 0 },
  },
]);
