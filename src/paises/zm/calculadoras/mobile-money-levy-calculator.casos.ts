import { definirCasos } from "@/motor/calculo";
import calculadora from "./mobile-money-levy-calculator";

const FOLLETO = "https://www.zra.org.zm/wp-content/uploads/2026/06/Mobile-Money-Transaction-Levy.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "K150, top of the first row",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Between 1 and 150: K0.32." },
    fecha: "2026-10-26",
    entrada: { monto: 150, veces: 1 },
    esperado: { levy: 0.32 },
  },
  {
    nombre: "K151",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Between 151 and 300: K0.40." },
    fecha: "2026-10-26",
    entrada: { monto: 151, veces: 1 },
    esperado: { levy: 0.4 },
  },
  {
    nombre: "K2,000 sent 10 times",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Between 1,001 and 3,000: K4. Ten times: K40." },
    fecha: "2026-10-26",
    entrada: { monto: 2000, veces: 10 },
    esperado: { levy: 4, mensual: 40, porcentaje: 0.2 },
  },
  {
    nombre: "K10,000 and K10,001",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Between 5,001 and 10,000: K8. Above 10,000: K10." },
    fecha: "2026-10-26",
    entrada: { monto: 10001, veces: 1 },
    esperado: { levy: 10 },
  },
  {
    nombre: "K10,000",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Between 5,001 and 10,000: K8." },
    fecha: "2026-10-26",
    entrada: { monto: 10000, veces: 1 },
    esperado: { levy: 8 },
  },
]);
