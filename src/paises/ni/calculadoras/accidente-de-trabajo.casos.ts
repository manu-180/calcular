import { definirCasos } from "@/motor/calculo";
import accidenteDeTrabajo from "./accidente-de-trabajo";

export default definirCasos(accidenteDeTrabajo, [
  {
    nombre: "Muerte por accidente de un trabajador sin INSS",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 114, 120 y 121: 620 días del último salario. 9000 / 30 = 300 × 620 = 186000, en 20.67 meses de pago." },
    fecha: "2026-10-12",
    entrada: { salario: 9000, caso: "muerte", inss: false },
    esperado: { dias: 620, diario: 300, indemnizacion: 186000, cuotas: 20.67 },
  },
  {
    nombre: "Incapacidad total de un trabajador inscrito en el INSS",
    origen: { tipo: "recalculado", detalle: "Art. 114: si está cubierto por el seguro social, el empleador no paga esta indemnización." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, caso: "incapacidad", inss: true },
    esperado: { indemnizacion: 0 },
  },
]);
