import { definirCasos } from "@/motor/calculo";
import calculadora from "./usd-to-ttd";

const CBTT = "https://www.central-bank.org.tt/";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the Central Bank rates of October 26, 2026",
    origen: { tipo: "oficial", url: CBTT, detalle: "Buying rate 6.7135. 100 × 6.7135 = 671.35." },
    fecha: "2026-10-27",
    entrada: { monto: 100, moneda: "usd", sentido: "a-ttd" },
    esperado: { ttd: 671.35, compra: 6.7135, venta: 6.7879 },
  },
  {
    nombre: "TT$1,000 to US dollars",
    origen: { tipo: "recalculado", detalle: "Selling rate 6.7879. 1,000 ÷ 6.7879 = 147.32." },
    fecha: "2026-10-27",
    entrada: { monto: 1000, moneda: "usd", sentido: "desde-ttd" },
    esperado: { extranjera: 147.32 },
  },
  {
    nombre: "£50 to TT dollars",
    origen: { tipo: "oficial", url: CBTT, detalle: "Buying rate 9.0078. 50 × 9.0078 = 450.39." },
    fecha: "2026-10-27",
    entrada: { monto: 50, moneda: "gbp", sentido: "a-ttd" },
    esperado: { ttd: 450.39 },
  },
  {
    nombre: "TT$500 to euros",
    origen: { tipo: "recalculado", detalle: "Selling rate 8.2831. 500 ÷ 8.2831 = 60.36." },
    fecha: "2026-10-27",
    entrada: { monto: 500, moneda: "eur", sentido: "desde-ttd" },
    esperado: { extranjera: 60.36 },
  },
  {
    nombre: "Fixed rates",
    origen: { tipo: "recalculado", detalle: "With a Canadian dollar buying rate of 5, C$20 is TT$100." },
    fecha: "2026-10-27",
    entrada: { monto: 20, moneda: "cad", sentido: "a-ttd" },
    valores: { "tt.cad-buy": { fecha: "2026-10-26", valor: 5 }, "tt.cad-sell": { fecha: "2026-10-26", valor: 5.5 } },
    esperado: { ttd: 100 },
  },
]);
