import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add VAT to K1,000",
    origen: { tipo: "recalculado", url: "https://www.zra.org.zm/wp-content/uploads/2026/06/Introduction-to-VAT.pdf", detalle: "16% × 1,000 = 160. Total 1,160." },
    fecha: "2026-10-26",
    entrada: { importe: 1000, modo: "add" },
    esperado: { total: 1160, neto: 1000, iva: 160, tasa: 16 },
  },
  {
    nombre: "Take VAT out of K580",
    origen: { tipo: "recalculado", detalle: "580 / 1.16 = 500. VAT 80." },
    fecha: "2026-10-26",
    entrada: { importe: 580, modo: "remove" },
    esperado: { total: 580, neto: 500, iva: 80 },
  },
]);
