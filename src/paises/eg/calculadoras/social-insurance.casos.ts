import { definirCasos } from "@/motor/calculo";
import calculadora from "./social-insurance";

export default definirCasos(calculadora, [
  {
    nombre: "أجر اشتراك 10,000 جنيه",
    origen: { tipo: "recalculado", detalle: "حصة المؤمن عليه 9% + 1% + 1% = 11% = 1,100. حصة صاحب العمل 12% + 1% + 1% + 0.5% + 3.25% + 1% = 18.75% = 1,875." },
    fecha: "2026-10-24",
    entrada: { salario: 10000 },
    esperado: { empleado: 1100, empleador: 1875, total: 2975, empVejez: 900, patVejez: 1200, patAccidentes: 150, patEnfermedad: 325, patDesempleo: 100 },
  },
  {
    nombre: "أجر أقل من الحد الأدنى",
    origen: { tipo: "recalculado", detalle: "الحد الأدنى لأجر الاشتراك في 2026 هو 2,700. حصة العامل 11% × 2,700 = 297، وصاحب العمل 18.75% × 2,700 = 506.25." },
    fecha: "2026-10-24",
    entrada: { salario: 2000 },
    esperado: { empleado: 297, empleador: 506.25, base: 2700 },
  },
  {
    nombre: "أجر أعلى من الحد الأقصى",
    origen: { tipo: "recalculado", detalle: "الحد الأقصى في 2026 هو 16,700. حصة العامل 1,837 وصاحب العمل 3,131.25." },
    fecha: "2026-10-24",
    entrada: { salario: 25000 },
    esperado: { empleado: 1837, empleador: 3131.25, base: 16700 },
  },
]);
