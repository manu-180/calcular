import { definirCasos } from "@/motor/calculo";
import septimoDia from "./septimo-dia";

export default definirCasos(septimoDia, [
  {
    nombre: "Semana completa",
    origen: { tipo: "recalculado", detalle: "Decreto 112-82, arts. 4 y 5 a): un día de salario por cada seis días de trabajo. 400 × 6 / 6 = 400; semana 2400 + 400 = 2800." },
    fecha: "2026-10-12",
    entrada: { salarioDiario: 400, diasTrabajados: 6, faltaInjustificada: false },
    esperado: { pago: 400, semana: 2800 },
  },
  {
    nombre: "Cuatro días por una incapacidad justificada",
    origen: { tipo: "recalculado", detalle: "Art. 5 a): la proporción si trabaja menos por causa justificada. 400 × 4 / 6 = 266.67." },
    fecha: "2026-10-12",
    entrada: { salarioDiario: 400, diasTrabajados: 4, faltaInjustificada: false },
    esperado: { pago: 266.67, semana: 1866.67 },
  },
  {
    nombre: "Falta sin causa justificada",
    origen: { tipo: "recalculado", detalle: "Art. 7: sin la semana completa por falta injustificada no hay séptimo día." },
    fecha: "2026-10-12",
    entrada: { salarioDiario: 400, diasTrabajados: 5, faltaInjustificada: true },
    esperado: { pago: 0, semana: 2000 },
  },
]);
