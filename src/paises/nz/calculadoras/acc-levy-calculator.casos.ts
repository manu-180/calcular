import { definirCasos } from "@/motor/calculo";
import calculadora from "./acc-levy-calculator";

const ACC = "https://www.ird.govt.nz/acclevy";

export default definirCasos(calculadora, [
  {
    nombre: "$50,000 in the 2027 tax year",
    origen: { tipo: "recalculado", detalle: "50,000 × 1.75% = 875." },
    fecha: "2026-10-14",
    entrada: { ingreso: 50000 },
    esperado: { levy: 875, tasa: 1.75, tope: 156641 },
  },
  {
    nombre: "Over the cap pays the maximum",
    origen: { tipo: "oficial", url: ACC, detalle: "Inland Revenue table: 1 April 2026 to 31 March 2027, maximum liable earnings $156,641, maximum levy $2,741.22." },
    fecha: "2026-10-14",
    entrada: { ingreso: 200000 },
    esperado: { levy: 2741.22, maximo: 2741.22 },
  },
  {
    nombre: "2026 tax year at 1.67%",
    origen: { tipo: "oficial", url: ACC, detalle: "1 April 2025 to 31 March 2026: $1.67 per $100, maximum levy $2,551.59 on $152,790." },
    fecha: "2025-10-01",
    entrada: { ingreso: 160000 },
    esperado: { levy: 2551.59, tasa: 1.67 },
  },
  {
    nombre: "2028 tax year at 1.83%",
    origen: { tipo: "recalculado", detalle: "From 1 April 2027: 100,000 × 1.83% = 1,830." },
    fecha: "2027-04-15",
    entrada: { ingreso: 100000 },
    esperado: { levy: 1830, tope: 160244 },
  },
  {
    nombre: "Zero earnings",
    origen: { tipo: "recalculado", detalle: "Earnings of 0 are not valid." },
    fecha: "2026-10-14",
    entrada: { ingreso: 0 },
    esperaError: true,
  },
]);
