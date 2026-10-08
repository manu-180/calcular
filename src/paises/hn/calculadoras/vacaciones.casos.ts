import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Cuatro años cumplidos: 20 días",
    origen: {
      tipo: "recalculado",
      detalle: "CT art. 346 d: cuatro años o más, 20 días. 15000 / 30 × 20 = 10000. Desde el aniversario (01/03/2026) al 07/10/2026 van 221 días: 20 × 221 / 365 = 12.11 días, 500 × 12.11 = 6055.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 15000, fechaIngreso: "2022-03-01", fechaCorte: "2026-10-07" },
    esperado: { anios: 4, diasPeriodo: 20, pagoPeriodo: 10000, diasSiguiente: 20, diasProporcionales: 12.11, pagoProporcional: 6055 },
  },
  {
    nombre: "El día que cumple el primer año: 10 días",
    origen: { tipo: "recalculado", detalle: "Art. 346 a: después de un año, 10 días. 12000 / 30 × 10 = 4000. El año siguiente da 12 días (art. 346 b)." },
    fecha: "2026-10-07",
    entrada: { salario: 12000, fechaIngreso: "2025-10-07", fechaCorte: "2026-10-07" },
    esperado: { anios: 1, diasPeriodo: 10, pagoPeriodo: 4000, diasSiguiente: 12 },
  },
  {
    nombre: "Tres años cumplidos: 15 días",
    origen: { tipo: "recalculado", detalle: "Art. 346 c: tres años, 15 días. 18000 / 30 × 15 = 9000." },
    fecha: "2026-10-07",
    entrada: { salario: 18000, fechaIngreso: "2023-06-15", fechaCorte: "2026-06-15" },
    esperado: { anios: 3, diasPeriodo: 15, pagoPeriodo: 9000, diasSiguiente: 20 },
  },
  {
    nombre: "Seis meses sin cumplir el año",
    origen: { tipo: "recalculado", detalle: "Sin año cumplido no hay período completo. Del 01/04 al 30/09/2026 son 183 días: 10 × 183 / 365 = 5.01 días, 300 × 5.01 = 1503." },
    fecha: "2026-10-07",
    entrada: { salario: 9000, fechaIngreso: "2026-04-01", fechaCorte: "2026-09-30" },
    esperado: { anios: 0, diasPeriodo: 0, pagoPeriodo: 0, diasSiguiente: 10, diasProporcionales: 5.01, pagoProporcional: 1503 },
  },
  {
    nombre: "Fecha anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-07",
    entrada: { salario: 9000, fechaIngreso: "2026-04-01", fechaCorte: "2026-03-31" },
    esperaError: true,
  },
]);
