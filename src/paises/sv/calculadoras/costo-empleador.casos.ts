import { definirCasos } from "@/motor/calculo";
import costoEmpleador from "./costo-empleador";

export default definirCasos(costoEmpleador, [
  {
    nombre: "Salario de $600 con menos de 3 años",
    origen: {
      tipo: "recalculado",
      detalle:
        "ISSS 7,5 % = 45; AFP 8,75 % = 52,50. Aguinaldo 20 × 15 / 12 = 25. Vacaciones (300 + 30 %) / 12 = 32,50. Quincena 25: 300 / 12 = 25. Total 600 + 45 + 52,50 + 25 + 32,50 + 25 = 780; anual 9.360.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600, antiguedad: "uno-a-tres", quincena25: true },
    esperado: { isss: 45, afp: 52.5, aguinaldo: 25, vacaciones: 32.5, quincena: 25, mensual: 780, anual: 9360 },
  },
  {
    nombre: "Salario de $2,000 con 10 años: techo del ISSS y sin Quincena 25",
    origen: {
      tipo: "recalculado",
      detalle: "ISSS 7,5 % de 1.000 = 75; AFP 175. Aguinaldo 66,6667 × 21 / 12 = 116,67. Vacaciones (1.000 × 1,3) / 12 = 108,33. Gana más de 1.500: sin Quincena 25. Total 2.475.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 2000, antiguedad: "diez-o-mas", quincena25: true },
    esperado: { isss: 75, afp: 175, aguinaldo: 116.67, vacaciones: 108.33, quincena: 0, mensual: 2475 },
  },
]);
