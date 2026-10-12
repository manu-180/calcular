import { definirCasos } from "@/motor/calculo";
import prestamo from "./prestamo";

export default definirCasos(prestamo, [
  {
    nombre: "10 millones al 24 % anual en 12 meses",
    origen: { tipo: "recalculado", detalle: "Tasa mensual 2 %. Cuota = 10.000.000 × 0,02 / (1 − 1,02^−12) = 945.595,97 (945.596). Total 11.347.151,59 (11.347.152); intereses 1.347.152." },
    fecha: "2026-10-12",
    entrada: { monto: 10000000, tasa: 24, meses: 12 },
    esperado: { cuota: 945596, total: 11347152, intereses: 1347152 },
  },
  {
    nombre: "Sin interés",
    origen: { tipo: "recalculado", detalle: "Tasa 0: 10.000.000 / 12 = 833.333,33 (833.333); sin intereses." },
    fecha: "2026-10-12",
    entrada: { monto: 10000000, tasa: 0, meses: 12 },
    esperado: { cuota: 833333, total: 10000000, intereses: 0 },
  },
]);
