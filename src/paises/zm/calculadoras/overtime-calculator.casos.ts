import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "K2,080 basic, 10 overtime hours and 8 hours on a public holiday",
    origen: {
      tipo: "recalculado",
      url: "https://www.mlss.gov.zm/wp-content/uploads/2023/07/The-Employment-Code-Act-No.-3-of-2019.pdf",
      detalle: "Hourly rate 2,080 / 208 = 10 (section 75(4)). 10 × 10 × 1.5 = 150. 8 × 10 × 2 = 160. Total 310.",
    },
    fecha: "2026-10-26",
    entrada: { basico: 2080, guardia: false, horasExtra: 10, horasDescanso: 8 },
    esperado: { total: 310, hora: 10, extra: 150, descanso: 160, limite: 48 },
  },
  {
    nombre: "Guard on K1,487",
    origen: { tipo: "recalculado", detalle: "1,487 / 240 = 6.1958. 10 × 6.1958 × 1.5 = 92.94." },
    fecha: "2026-10-26",
    entrada: { basico: 1487, guardia: true, horasExtra: 10, horasDescanso: 0 },
    esperado: { total: 92.94, hora: 6.2, limite: 60 },
  },
]);
