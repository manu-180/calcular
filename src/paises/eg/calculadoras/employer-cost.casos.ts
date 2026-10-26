import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost";

export default definirCasos(calculadora, [
  {
    nombre: "موظف بمرتب 15,000 جنيه",
    origen: { tipo: "recalculado", detalle: "حصة صاحب العمل 18.75% × 15,000 = 2,812.50. التكلفة 17,812.50 في الشهر و213,750 في السنة." },
    fecha: "2026-10-24",
    entrada: { bruto: 15000, asegurable: null, empleados: 1 },
    esperado: { costoMensual: 17812.5, contribucion: 2812.5, costoAnual: 213750 },
  },
  {
    nombre: "خمسة موظفين بمرتب 20,000 جنيه",
    origen: { tipo: "recalculado", detalle: "أجر الاشتراك 16,700 (الحد الأقصى). الحصة 3,131.25. التكلفة 23,131.25 للموظف و115,656.25 للخمسة." },
    fecha: "2026-10-24",
    entrada: { bruto: 20000, asegurable: null, empleados: 5 },
    esperado: { costoMensual: 23131.25, costoTotalMensual: 115656.25 },
  },
]);
