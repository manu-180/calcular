import { definirCasos } from "@/motor/calculo";
import pagosACuenta from "./pagos-a-cuenta";

export default definirCasos(pagosACuenta, [
  {
    nombre: "ISR anterior de L120,000 y estimado de L150,000",
    origen: { tipo: "recalculado", detalle: "Ley del ISR art. 34: cuotas = impuesto del año anterior / 4 = 30000. Tres cuotas en el año: 90000. Saldo en abril: 150000 − 90000 = 60000." },
    fecha: "2026-10-12",
    entrada: { isrAnterior: 120000, isrEstimado: 150000 },
    esperado: { cuota: 30000, anticipado: 90000, saldo: 60000 },
  },
  {
    nombre: "Año con menos impuesto que el anterior",
    origen: { tipo: "recalculado", detalle: "Cuota 100000 / 4 = 25000; tres cuotas 75000. Si el impuesto del año es 60000, el saldo es −15000 (crédito)." },
    fecha: "2026-10-12",
    entrada: { isrAnterior: 100000, isrEstimado: 60000 },
    esperado: { cuota: 25000, saldo: -15000 },
  },
  {
    nombre: "Sin estimación del año",
    origen: { tipo: "recalculado", detalle: "Sin impuesto estimado no se calcula el saldo. 50000 / 4 = 12500." },
    fecha: "2026-10-12",
    entrada: { isrAnterior: 50000, isrEstimado: null },
    esperado: { cuota: 12500, anticipado: 37500, saldo: null },
  },
]);
