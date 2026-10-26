import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "إخطار من صاحب العمل في 15 نوفمبر",
    origen: { tipo: "recalculado", detalle: "المهلة ثلاثة أشهر من تاريخ التسلم: من 15 نوفمبر 2026 إلى 15 فبراير 2027. المقابل 3 × 9,000 = 27,000." },
    fecha: "2026-10-24",
    entrada: { fecha: "2026-11-15", quien: "empleador", salario: 9000 },
    esperado: { fin: "2027-02-15", meses: 3, pagoSustitutivo: 27000 },
  },
  {
    nombre: "إخطار من العامل في 30 نوفمبر",
    origen: { tipo: "recalculado", detalle: "بعد ثلاثة أشهر يكون 28 فبراير 2027، لأن فبراير ليس فيه يوم 30." },
    fecha: "2026-10-24",
    entrada: { fecha: "2026-11-30", quien: "trabajador", salario: null },
    esperado: { fin: "2027-02-28", pagoSustitutivo: null },
  },
]);
