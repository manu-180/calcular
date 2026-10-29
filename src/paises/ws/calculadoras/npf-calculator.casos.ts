import { definirCasos } from "@/motor/calculo";
import calculadora from "./npf-calculator";

const URL = "https://www.npf.ws/employers-guide";

export default definirCasos(calculadora, [
  {
    nombre: "WST 3,000 of monthly wages",
    origen: { tipo: "recalculado", url: URL, detalle: "Employee 10% = 300, employer 10% = 300, total 20% = 600." },
    fecha: "2026-10-29",
    entrada: { bruto: 3000, extra: 0, mesesTarde: 0 },
    esperado: { empleado: 300, empleador: 300, total: 600, recargo: 0, aPagar: 600 },
  },
  {
    nombre: "WST 2,000 with 5% extra, two months late",
    origen: { tipo: "recalculado", url: URL, detalle: "200 + 200 + 100 = 500. Surcharge 2% × 500 × 2 = 20. Pay 520." },
    fecha: "2026-10-29",
    entrada: { bruto: 2000, extra: 5, mesesTarde: 2 },
    esperado: { total: 500, adicional: 100, recargo: 20, aPagar: 520 },
  },
]);
