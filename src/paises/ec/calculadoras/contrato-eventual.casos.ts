import { definirCasos } from "@/motor/calculo";
import contratoEventual from "./contrato-eventual";

export default definirCasos(contratoEventual, [
  {
    nombre: "Mes completo con el salario básico",
    origen: { tipo: "recalculado", detalle: "Art. 17 del Código del Trabajo. Hora 482 / 240 = 2,0083; + 35 % = 2,7113. × 240 horas = 650,70." },
    fecha: "2026-10-07",
    entrada: { basico: null, horas: 240 },
    esperado: { basico: 482, hora: 2.01, horaEventual: 2.71, total: 650.7 },
  },
  {
    nombre: "Salario sectorial de 600 y 80 horas",
    origen: { tipo: "recalculado", detalle: "Hora 600 / 240 = 2,50; + 35 % = 3,375. × 80 = 270." },
    fecha: "2026-10-07",
    entrada: { basico: 600, horas: 80 },
    esperado: { hora: 2.5, horaEventual: 3.38, total: 270 },
  },
]);
