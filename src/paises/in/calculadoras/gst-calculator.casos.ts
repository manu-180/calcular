import { definirCasos } from "@/motor/calculo";
import calculadora from "./gst-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 18% GST within a state",
    origen: { tipo: "recalculado", detalle: "10,000 × 18% = 1,800, split 900 CGST and 900 SGST. Total 11,800." },
    fecha: "2026-10-15",
    entrada: { importe: 10000, sentido: "add", tasa: "standard", suministro: "intra" },
    esperado: { bruto: 11800, gst: 1800, cgst: 900, sgst: 900, igst: 0, tasa: 18 },
  },
  {
    nombre: "Remove 5% GST from an inter-state price",
    origen: { tipo: "recalculado", detalle: "10,500 / 1.05 = 10,000; IGST 500." },
    fecha: "2026-10-15",
    entrada: { importe: 10500, sentido: "remove", tasa: "merit", suministro: "inter" },
    esperado: { neto: 10000, gst: 500, igst: 500, cgst: 0 },
  },
  {
    nombre: "Add 40% GST",
    origen: { tipo: "recalculado", detalle: "2,50,000 × 40% = 1,00,000; CGST 50,000 and SGST 50,000." },
    fecha: "2026-10-15",
    entrada: { importe: 250000, sentido: "add", tasa: "demerit", suministro: "intra" },
    esperado: { bruto: 350000, cgst: 50000, sgst: 50000 },
  },
]);
