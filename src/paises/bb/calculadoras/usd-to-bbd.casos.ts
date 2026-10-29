import { definirCasos } from "@/motor/calculo";
import calculadora from "./usd-to-bbd";

const URL = "https://www.centralbank.org.bb/faqs/foreignexchangefee";

export default definirCasos(calculadora, [
  {
    nombre: "Buying US$500",
    origen: { tipo: "recalculado", url: URL, detalle: "500 × 2 = 1,000.00. Fee 2% of 1,000 = 20.00. Total 1,020.00." },
    fecha: "2026-10-27",
    entrada: { monto: 500, operacion: "comprar" },
    esperado: { bbd: 1000, comision: 20, total: 1020 },
  },
  {
    nombre: "Receiving US$500",
    origen: { tipo: "recalculado", url: URL, detalle: "The fee applies to purchases and payments only. 500 × 2 = 1,000.00." },
    fecha: "2026-10-27",
    entrada: { monto: 500, operacion: "vender" },
    esperado: { bbd: 1000, comision: 0, total: 1000 },
  },
  {
    nombre: "No amount",
    origen: { tipo: "recalculado", detalle: "A zero amount is rejected." },
    fecha: "2026-10-27",
    entrada: { monto: 0, operacion: "comprar" },
    esperaError: true,
  },
]);
