import { definirCasos } from "@/motor/calculo";
import accidenteDeTrabajo from "./accidente-de-trabajo";

export default definirCasos(accidenteDeTrabajo, [
  {
    nombre: "Treinta días de incapacidad temporal",
    origen: { tipo: "recalculado", detalle: "CT art. 428: 75 % del salario desde el primer día. 15000 / 30 = 500; 500 × 75 % = 375; 375 × 30 = 11250." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, caso: "incapacidad-temporal", diasIncapacidad: 30 },
    esperado: { diasPagados: 30, incapacidad: 11250, total: 11250 },
  },
  {
    nombre: "Incapacidad de 400 días: tope de un año",
    origen: { tipo: "recalculado", detalle: "Art. 428: no más de un año (365 días). 375 × 365 = 136875." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, caso: "incapacidad-temporal", diasIncapacidad: 400 },
    esperado: { diasPagados: 365, incapacidad: 136875 },
  },
  {
    nombre: "Muerte por riesgo profesional",
    origen: { tipo: "recalculado", detalle: "Art. 420: un mes de salario para el funeral (15000) y 620 días para los dependientes (500 × 620 = 310000). Total 325000." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, caso: "muerte", diasIncapacidad: 0 },
    esperado: { funeral: 15000, dependientes: 310000, total: 325000 },
  },
  {
    nombre: "Incapacidad sin días",
    origen: { tipo: "recalculado", detalle: "Sin días de incapacidad no hay nada que pagar." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, caso: "incapacidad-temporal", diasIncapacidad: 0 },
    esperaError: true,
  },
]);
