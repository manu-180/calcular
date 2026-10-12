import { definirCasos } from "@/motor/calculo";
import subsidioPorEnfermedad from "./subsidio-por-enfermedad";

export default definirCasos(subsidioPorEnfermedad, [
  {
    nombre: "Diez días de certificación con promedio de $ 60.000",
    origen: {
      tipo: "recalculado",
      url: "https://www.bps.gub.uy/4774/subsidio-por-enfermedad.html",
      detalle: "70 % de 60.000 = 42.000 por mes; 1.400 por día. Se paga desde el cuarto día: 7 días = 9.800. Aguinaldo 9.800 / 12 = 816,67.",
    },
    fecha: "2026-10-12",
    entrada: { promedio: 60000, dias: 10, internacion: false },
    esperado: { mensual: 42000, diario: 1400, diasPagos: 7, subsidio: 9800, aguinaldo: 816.67 },
  },
  {
    nombre: "Sueldo alto: tope de $ 67.754",
    origen: { tipo: "recalculado", detalle: "70 % de 120.000 = 84.000, tope 67.754. Por día 2.258,4667. 30 días, se pagan 27: 60.978,60." },
    fecha: "2026-10-12",
    entrada: { promedio: 120000, dias: 30, internacion: false },
    esperado: { mensual: 67754, diasPagos: 27, subsidio: 60978.6 },
  },
  {
    nombre: "Internación: se paga desde el primer día",
    origen: { tipo: "recalculado", detalle: "5 días × 1.400 = 7.000." },
    fecha: "2026-10-12",
    entrada: { promedio: 60000, dias: 5, internacion: true },
    esperado: { diasPagos: 5, subsidio: 7000 },
  },
  {
    nombre: "Tres días sin internación",
    origen: { tipo: "recalculado", detalle: "Los tres primeros días no se pagan: 0." },
    fecha: "2026-10-12",
    entrada: { promedio: 60000, dias: 3, internacion: false },
    esperado: { diasPagos: 0, subsidio: 0 },
  },
]);
