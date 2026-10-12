import { definirCasos } from "@/motor/calculo";
import estabilidadLaboral from "./estabilidad-laboral";

export default definirCasos(estabilidadLaboral, [
  {
    nombre: "Doce años y medio: estable, indemnización doble",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo",
      detalle: "Art. 94: diez años desde el 10/3/2014 se cumplen el 10/3/2024. Al 12/10/2026: 12 años y 7 meses, se indemnizan 13 (art. 91). Diario 200.000 × 15 × 13 = 39.000.000; doble (art. 97) 78.000.000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 6000000, ingreso: "2014-03-10", fecha: "2026-10-12" },
    esperado: { estable: "Sí", fechaEstabilidad: "2024-03-10", diasFaltan: null, indemnizacion: 39000000, indemnizacionDoble: 78000000 },
  },
  {
    nombre: "Siete años: todavía sin estabilidad",
    origen: { tipo: "recalculado", detalle: "Desde el 1/6/2019, los diez años se cumplen el 1/6/2029: faltan 963 días desde el 12/10/2026. Se indemnizan 7 años: 133.333,33 × 15 × 7 = 14.000.000." },
    fecha: "2026-10-12",
    entrada: { salario: 4000000, ingreso: "2019-06-01", fecha: "2026-10-12" },
    esperado: { estable: "Todavía no", fechaEstabilidad: "2029-06-01", diasFaltan: 963, indemnizacion: 14000000, indemnizacionDoble: null },
  },
]);
