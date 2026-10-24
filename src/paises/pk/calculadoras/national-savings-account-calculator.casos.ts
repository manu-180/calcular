import { definirCasos } from "@/motor/calculo";
import calculadora from "./national-savings-account-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 500,000 for a year, filer",
    origen: { tipo: "recalculado", detalle: "10% → 50,000; tax 15% = 7,500; net 42,500." },
    fecha: "2026-10-17",
    entrada: { saldo: 500000, meses: 12, contribuyente: "filer" },
    esperado: { bruto: 50000, impuesto: 7500, neto: 42500, tasa: 10 },
  },
]);
