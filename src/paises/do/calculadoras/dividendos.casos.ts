import { definirCasos } from "@/motor/calculo";
import dividendos from "./dividendos";

export default definirCasos(dividendos, [
  {
    nombre: "Dividendos de RD$250,000",
    origen: { tipo: "recalculado", detalle: "Art. 308 (Ley 253-12, art. 8): 10 % = 25,000. El socio recibe 225,000." },
    fecha: "2026-10-12",
    entrada: { monto: 250000 },
    esperado: { tasa: 10, retencion: 25000, neto: 225000 },
  },
  {
    nombre: "Dividendos de RD$1,234.56",
    origen: { tipo: "recalculado", detalle: "1,234.56 × 10 % = 123.456, redondeado 123.46." },
    fecha: "2026-10-12",
    entrada: { monto: 1234.56 },
    esperado: { retencion: 123.46, neto: 1111.1 },
  },
]);
