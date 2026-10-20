import { definirCasos } from "@/motor/calculo";
import calculadora from "./remittance-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "KD 100 to India with a KD 1 fee at the CBK rate",
    origen: { tipo: "recalculado", detalle: "CBK 15.10.2026: 3.244 fils per rupee, so 308.2614 rupees per dinar. (100 − 1) × 308.2614 = 30,517.879. At the CBK rate with no fee: 30,826.141." },
    fecha: "2026-10-18",
    entrada: { importe: 100, divisa: "inr", comision: 1, ofrecida: 0 },
    esperado: { recibe: 30517.879, diferencia: 308.262, moneda: "INR" },
  },
  {
    nombre: "Exchange company offers 305 rupees per dinar",
    origen: { tipo: "recalculado", detalle: "99 × 305 = 30,195. Difference with 30,826.141: 631.141." },
    fecha: "2026-10-18",
    entrada: { importe: 100, divisa: "inr", comision: 1, ofrecida: 305 },
    esperado: { recibe: 30195, diferencia: 631.141 },
  },
  {
    nombre: "Fee as large as the transfer",
    origen: { tipo: "recalculado", detalle: "The fee has to be less than the amount sent." },
    fecha: "2026-10-18",
    entrada: { importe: 5, divisa: "inr", comision: 5, ofrecida: 0 },
    esperaError: true,
  },
]);
