import { definirCasos } from "@/motor/calculo";
import calculadora from "./end-of-service";

export default definirCasos(calculadora, [
  {
    nombre: "سبع سنوات بعد الستين",
    origen: { tipo: "recalculado", detalle: "خمس سنوات × نصف شهر = 2.5 شهر، وسنتان × شهر = 2 شهر. 4.5 × 8,000 = 36,000." },
    fecha: "2026-10-24",
    entrada: { salario: 8000, anios: 7 },
    esperado: { total: 36000, parteInicial: 20000, parteResto: 16000, meses: 4.5 },
  },
  {
    nombre: "ثلاث سنوات",
    origen: { tipo: "recalculado", detalle: "3 × نصف شهر × 6,000 = 9,000." },
    fecha: "2026-10-24",
    entrada: { salario: 6000, anios: 3 },
    esperado: { total: 9000 },
  },
]);
