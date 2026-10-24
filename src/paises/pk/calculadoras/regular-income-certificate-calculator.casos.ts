import { definirCasos } from "@/motor/calculo";
import calculadora from "./regular-income-certificate-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 100,000, filer",
    origen: { tipo: "oficial", url: "https://savings.gov.pk/latest-profit-rates/", detalle: "National Savings: 11.76%, Rs. 980 a month per Rs. 100,000. Filer tax 15% = 147; net 833." },
    fecha: "2026-10-17",
    entrada: { monto: 100000, contribuyente: "filer" },
    esperado: { bruto: 980, impuesto: 147, neto: 833 },
  },
  {
    nombre: "Rs. 500,000, non-filer",
    origen: { tipo: "recalculado", detalle: "4,900 a month; tax 30% = 1,470; net 3,430." },
    fecha: "2026-10-17",
    entrada: { monto: 500000, contribuyente: "nonfiler" },
    esperado: { neto: 3430 },
  },
]);
