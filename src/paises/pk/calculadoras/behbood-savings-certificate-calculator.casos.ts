import { definirCasos } from "@/motor/calculo";
import calculadora from "./behbood-savings-certificate-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 100,000, filer",
    origen: { tipo: "oficial", url: "https://savings.gov.pk/latest-profit-rates/", detalle: "National Savings: 12.72%, Rs. 1,060 a month per Rs. 100,000. Filer tax 15% = 159; net 901." },
    fecha: "2026-10-17",
    entrada: { monto: 100000, contribuyente: "filer" },
    esperado: { bruto: 1060, impuesto: 159, neto: 901 },
  },
  {
    nombre: "Rs. 1 million, non-filer",
    origen: { tipo: "recalculado", detalle: "10,600 a month; tax 30% = 3,180; net 7,420." },
    fecha: "2026-10-17",
    entrada: { monto: 1000000, contribuyente: "nonfiler" },
    esperado: { neto: 7420 },
  },
]);
