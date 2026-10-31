import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Diez semanas, cuatro antes del parto",
    origen: { tipo: "recalculado", detalle: "Art. 103: parto 10/12/2026, inicio 12/11/2026, regreso 21/1/2027; pago 10 × 3.000 × 12 / 52 = 6.923,08; lactancia hasta 10/12/2027 (art. 104)." },
    fecha: "2026-10-29",
    entrada: { parto: "2026-12-10", inicio: "2024-01-01", salario: 3000, antes: 4 },
    esperado: { elegible: "نعم", semanas: 10, desde: "2026-11-12", regreso: "2027-01-21", pago: 6923.08, lactancia: "2027-12-10" },
  },
  {
    nombre: "Toda la licencia después del parto",
    origen: { tipo: "recalculado", detalle: "Parto 1/3/2026 sin semanas previas: regreso 10/5/2026; 2.600 × 12 / 52 × 10 = 6.000." },
    fecha: "2026-10-29",
    entrada: { parto: "2026-03-01", inicio: "2020-06-01", salario: 2600, antes: 0 },
    esperado: { desde: "2026-03-01", regreso: "2026-05-10", pago: 6000 },
  },
  {
    nombre: "Menos de 180 días de trabajo",
    origen: { tipo: "recalculado", detalle: "1/8/2026 a 10/12/2026 = 131 días < 180: sin licencia paga." },
    fecha: "2026-10-29",
    entrada: { parto: "2026-12-10", inicio: "2026-08-01", salario: 3000, antes: 4 },
    esperado: { elegible: "لا", pago: 0, servicio: 131, desde: null },
  },
  {
    nombre: "Cinco semanas antes del parto",
    origen: { tipo: "recalculado", detalle: "Art. 103: al menos 6 de las 10 semanas van después del parto; 5 antes no se permite." },
    fecha: "2026-10-29",
    entrada: { parto: "2026-12-10", inicio: "2024-01-01", salario: 3000, antes: 5 },
    esperaError: true,
  },
]);
