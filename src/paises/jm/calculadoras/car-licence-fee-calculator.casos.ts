import { definirCasos } from "@/motor/calculo";
import calculadora from "./car-licence-fee-calculator";

const FEES = "https://www.jamaicatax.gov.jm/rates-and-fees";

export default definirCasos(calculadora, [
  {
    nombre: "1,500cc car for 12 months with fitness",
    origen: { tipo: "oficial", url: FEES, detalle: "Exceeding 1199cc but not 2999cc, 12 months: $12,600. Certificate of fitness (private car) $4,500." },
    fecha: "2026-10-25",
    entrada: { cc: "1200-2999", periodo: "12", fitness: true },
    esperado: { total: 17100, licencia: 12600, fitness: 4500, porMes: 1050 },
  },
  {
    nombre: "Car above 3999cc for 24 months",
    origen: { tipo: "oficial", url: FEES, detalle: "Exceeding 3999cc, 24 months: $87,650." },
    fecha: "2026-10-25",
    entrada: { cc: "over-3999", periodo: "24", fitness: false },
    esperado: { total: 87650 },
  },
  {
    nombre: "Small car for 6 months",
    origen: { tipo: "oficial", url: FEES, detalle: "Not exceeding 1199cc, 6 months: $4,620." },
    fecha: "2026-10-25",
    entrada: { cc: "up-1199", periodo: "6", fitness: false },
    esperado: { licencia: 4620, porMes: 770 },
  },
]);
