import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "3 años de trabajo",
    origen: { tipo: "recalculado", detalle: "Art. 177: de 1 a 5 años, 14 días. Diario 35,000 ÷ 23.83 = 1,468.74. Pago 14 × 1,468.74 = 20,562.36." },
    fecha: "2026-10-07",
    entrada: { inicio: "2023-05-10", corte: "2026-10-07", salario: 35000 },
    esperado: { dias: 14, diario: 1468.74, pago: 20562.36 },
  },
  {
    nombre: "6 años de trabajo",
    origen: { tipo: "recalculado", detalle: "Art. 177: 5 años o más, 18 días. Diario 60,000 ÷ 23.83 = 2,517.83. Pago 45,320.94." },
    fecha: "2026-10-07",
    entrada: { inicio: "2020-01-15", corte: "2026-10-07", salario: 60000 },
    esperado: { dias: 18, pago: 45320.94 },
  },
  {
    nombre: "El día que se cumplen 5 años",
    origen: { tipo: "recalculado", detalle: "Del 7/10/2021 al 7/10/2026 son 5 años justos: 18 días." },
    fecha: "2026-10-07",
    entrada: { inicio: "2021-10-07", corte: "2026-10-07", salario: 30000 },
    esperado: { dias: 18 },
  },
  {
    nombre: "7 meses y 10 días",
    origen: { tipo: "recalculado", detalle: "Art. 180: más de 7 meses, 8 días. Diario 30,000 ÷ 23.83 = 1,258.92. Pago 10,071.36." },
    fecha: "2026-10-11",
    entrada: { inicio: "2026-03-01", corte: "2026-10-11", salario: 30000 },
    esperado: { dias: 8, pago: 10071.36 },
  },
  {
    nombre: "5 meses justos: todavía no",
    origen: { tipo: "recalculado", detalle: "Art. 179: hace falta más de 5 meses." },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-05-07", corte: "2026-10-07", salario: 30000 },
    esperado: { dias: 0, pago: 0 },
  },
  {
    nombre: "5 meses y 1 día",
    origen: { tipo: "recalculado", detalle: "Art. 180: más de 5 meses, 6 días." },
    fecha: "2026-10-08",
    entrada: { inicio: "2026-05-07", corte: "2026-10-08", salario: 30000 },
    esperado: { dias: 6 },
  },
]);
