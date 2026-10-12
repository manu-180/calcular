import { definirCasos } from "@/motor/calculo";
import prestamoPersonal from "./prestamo-personal";

export default definirCasos(prestamoPersonal, [
  {
    nombre: "B/. 10,000 al 10% por 60 meses, con FECI",
    origen: {
      tipo: "recalculado",
      detalle:
        "Pasa de B/. 5,000: se suma el 1% del FECI. r = 11% ÷ 12 = 0.0091667; cuota = 10,000 × r ÷ (1 − (1 + r) elevado a −60) = 217.42. Sin FECI (r = 0.0083333): 212.47.",
    },
    fecha: "2026-10-12",
    entrada: { monto: 10000, tasa: 10, plazo: 60, aplicaFeci: true },
    esperado: { tasaTotal: 11, cuota: 217.42, cuotaSinFeci: 212.47, totalPagado: 13045.45 },
    tolerancia: 0.01,
  },
  {
    nombre: "B/. 3,000: no paga FECI",
    origen: { tipo: "recalculado", detalle: "Hasta B/. 5,000 no hay FECI. r = 1%; cuota = 3,000 × 0.01 ÷ (1 − 1.01 elevado a −24) = 141.22." },
    fecha: "2026-10-12",
    entrada: { monto: 3000, tasa: 12, plazo: 24, aplicaFeci: true },
    esperado: { tasaTotal: 12, cuota: 141.22, feciTotal: 0 },
  },
  {
    nombre: "Préstamo exento de FECI",
    origen: { tipo: "recalculado", detalle: "Sin FECI la cuota es la de la tasa del banco: 212.47." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, tasa: 10, plazo: 60, aplicaFeci: false },
    esperado: { tasaTotal: 10, cuota: 212.47, feciTotal: 0 },
  },
]);
