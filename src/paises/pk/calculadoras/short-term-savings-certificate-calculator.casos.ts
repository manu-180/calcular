import { definirCasos } from "@/motor/calculo";
import calculadora from "./short-term-savings-certificate-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 500,000 for 1 year, filer",
    origen: { tipo: "recalculado", detalle: "11.31%: 56,550 profit; tax 15% = 8,482.50; net 48,067.50; maturity 548,067.50." },
    fecha: "2026-10-17",
    entrada: { monto: 500000, plazo: "stsc1y", contribuyente: "filer" },
    esperado: { bruto: 56550, impuesto: 8482.5, neto: 48067.5, madurez: 548067.5 },
  },
  {
    nombre: "Rs. 100,000 for 3 months, non-filer",
    origen: { tipo: "recalculado", detalle: "10.80% × 3/12 = 2,700; tax 30% = 810; net 1,890." },
    fecha: "2026-10-17",
    entrada: { monto: 100000, plazo: "stsc3m", contribuyente: "nonfiler" },
    esperado: { neto: 1890 },
  },
]);
