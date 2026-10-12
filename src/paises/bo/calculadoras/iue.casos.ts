import { definirCasos } from "@/motor/calculo";
import iue from "./iue";

const L843 = "https://www.impuestos.gob.bo/wp-content/uploads/2026/09/1.-LEY-N%C2%B0-843-08-26.pdf" as const;

export default definirCasos(iue, [
  {
    nombre: "Empresa con utilidad de Bs 100.000",
    origen: { tipo: "recalculado", url: L843, detalle: "Ley 843 art. 50: 25 % × 100.000 = 25.000." },
    fecha: "2026-10-12",
    entrada: { tipo: "empresa", monto: 100000 },
    esperado: { base: 100000, impuesto: 25000, tasaEfectiva: 25 },
  },
  {
    nombre: "Pago al exterior de Bs 10.000",
    origen: { tipo: "recalculado", url: L843, detalle: "Ley 843 art. 51: utilidad presunta 50 % = 5.000; 25 % = 1.250 (12,5 % efectivo)." },
    fecha: "2026-10-12",
    entrada: { tipo: "exterior", monto: 10000 },
    esperado: { base: 5000, impuesto: 1250, tasaEfectiva: 12.5 },
  },
]);
