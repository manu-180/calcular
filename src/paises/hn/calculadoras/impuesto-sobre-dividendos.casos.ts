import { definirCasos } from "@/motor/calculo";
import impuestoSobreDividendos from "./impuesto-sobre-dividendos";

export default definirCasos(impuestoSobreDividendos, [
  {
    nombre: "Dividendos de L100,000",
    origen: { tipo: "recalculado", detalle: "Ley del ISR art. 25: 10 % retenido por la sociedad. 100000 × 10 % = 10000; neto 90000." },
    fecha: "2026-10-12",
    entrada: { monto: 100000 },
    esperado: { tasa: 10, retencion: 10000, neto: 90000 },
  },
  {
    nombre: "Dividendos con centavos",
    origen: { tipo: "recalculado", detalle: "12345.67 × 10 % = 1234.567, redondeado 1234.57; neto 11111.10." },
    fecha: "2026-10-12",
    entrada: { monto: 12345.67 },
    esperado: { retencion: 1234.57, neto: 11111.1 },
  },
]);
