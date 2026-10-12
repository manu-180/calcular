import { definirCasos } from "@/motor/calculo";
import salariosCaidos from "./salarios-caidos";

export default definirCasos(salariosCaidos, [
  {
    nombre: "Ingreso en 2016, el empleador no reintegra y no está al día en el fondo",
    origen: {
      tipo: "recalculado",
      detalle:
        "Art. 218: tope de tres meses de salarios caídos = 3,900. Indemnización 8 años × 3.4 = 27.2 semanas × 300 = 8,160. Art. 219: recargo del 25% = 2,040. Total 14,100.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "2016-01-04", fechaDespido: "2024-01-03", fechaSentencia: "2024-09-02", resultado: "no-reintegra", fondoAlDia: false },
    esperado: { mesesCaidos: 3, salariosCaidos: 3900, indemnizacion: 8160, recargo: 2040, total: 14100 },
  },
  {
    nombre: "Ingreso en 1990, sentencia a los tres meses",
    origen: {
      tipo: "recalculado",
      detalle:
        "Tope de cinco meses: del 1/1 al 1/4/2025 = 3 meses y 1 día = 3.0333 × 1,300 = 3,943.33. Escala B, 35 años: 4 + 6 + 24 + 25 = 59 semanas × 300 = 17,700. Recargo del 50% = 8,850.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "1990-01-02", fechaDespido: "2025-01-01", fechaSentencia: "2025-04-01", resultado: "no-reintegra", fondoAlDia: true },
    esperado: { salariosCaidos: 3943.33, indemnizacion: 17700, recargo: 8850, total: 30493.33 },
  },
  {
    nombre: "Reintegro con un mes de salarios caídos",
    origen: { tipo: "recalculado", detalle: "Del 11/5 al 10/6/2026: un mes = 1,300. Sin indemnización." },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "2016-01-04", fechaDespido: "2026-05-11", fechaSentencia: "2026-06-10", resultado: "reintegro", fondoAlDia: true },
    esperado: { mesesCaidos: 1, salariosCaidos: 1300, indemnizacion: 0, total: 1300 },
  },
  {
    nombre: "Indemnización pedida, fondo al día",
    origen: { tipo: "recalculado", detalle: "Sin recargo cuando el trabajador pide la indemnización. 3,900 + 8,160 = 12,060." },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "2016-01-04", fechaDespido: "2024-01-03", fechaSentencia: "2024-09-02", resultado: "indemnizacion", fondoAlDia: true },
    esperado: { recargo: 0, total: 12060 },
  },
]);
