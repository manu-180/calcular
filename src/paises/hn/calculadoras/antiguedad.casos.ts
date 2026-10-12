import { definirCasos } from "@/motor/calculo";
import antiguedad from "./antiguedad";

export default definirCasos(antiguedad, [
  {
    nombre: "Cuatro años y siete meses",
    origen: {
      tipo: "recalculado",
      detalle: "Del 01/03/2022 al 30/09/2026: 4 años y 7 meses, 1675 días. Vacaciones con 4 años (art. 346 d): 20 días. Preaviso con más de 2 años (art. 116 e): 60 días. Cesantía: 4 + 210/360 = 4.58 meses.",
    },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2022-03-01", fechaCorte: "2026-09-30" },
    esperado: { tiempo: "4 años, 7 meses", diasCorridos: 1675, vacaciones: 20, proximoAniversario: "2027-03-01", vacacionesProximo: 20, preaviso: 60, mesesCesantia: 4.58 },
  },
  {
    nombre: "Cinco meses: sin vacaciones todavía",
    origen: {
      tipo: "recalculado",
      detalle: "Del 01/05 al 30/09/2026, contando el último día: 5 meses. Sin año cumplido no hay vacaciones; al cumplirlo, 10 días. Preaviso de 3 a 6 meses: 7 días. Cesantía (art. 120 a): 10 días = 0.33 meses.",
    },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-05-01", fechaCorte: "2026-09-30" },
    esperado: { tiempo: "5 meses", vacaciones: 0, proximoAniversario: "2027-05-01", vacacionesProximo: 10, preaviso: 7, mesesCesantia: 0.33 },
  },
]);
