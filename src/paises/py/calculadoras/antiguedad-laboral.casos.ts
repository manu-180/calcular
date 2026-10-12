import { definirCasos } from "@/motor/calculo";
import antiguedadLaboral from "./antiguedad-laboral";

export default definirCasos(antiguedadLaboral, [
  {
    nombre: "Más de once años",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo",
      detalle: "Del 5/1/2015 al 1/10/2026 (incluido): 11 años, 8 meses y 27 días. Preaviso 90 días (art. 87 d), vacaciones 30 (art. 218 c), se indemnizan 12 años: 180 días (art. 91). Estable desde el 5/1/2025.",
    },
    fecha: "2026-10-12",
    entrada: { ingreso: "2015-01-05", fecha: "2026-10-01" },
    esperado: { antiguedad: "11 años, 8 meses y 27 días", diasPreaviso: 90, diasVacaciones: 30, diasIndemnizacion: 180, estable: "Sí", fechaEstabilidad: "2025-01-05" },
  },
  {
    nombre: "Dos años y cinco meses",
    origen: { tipo: "recalculado", detalle: "Del 15/4/2024 al 12/10/2026: 2 años, 5 meses y 28 días. Preaviso 45, vacaciones 12, la fracción no pasa de 6 meses: 2 años × 15 = 30 días." },
    fecha: "2026-10-12",
    entrada: { ingreso: "2024-04-15", fecha: "2026-10-12" },
    esperado: { antiguedad: "2 años, 5 meses y 28 días", diasPreaviso: 45, diasVacaciones: 12, diasIndemnizacion: 30, estable: "Todavía no", fechaEstabilidad: "2034-04-15" },
  },
]);
