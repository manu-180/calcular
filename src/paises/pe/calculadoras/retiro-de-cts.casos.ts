import { definirCasos } from "@/motor/calculo";
import retiroDeCts from "./retiro-de-cts";

export default definirCasos(retiroDeCts, [
  {
    nombre: "Octubre 2026: retiro del 100 % por la Ley 32322",
    origen: { tipo: "recalculado", detalle: "Ley 32322, disposición transitoria única: hasta el 31/12/2026 se dispone del 100 %. Saldo 8,000: se retira 8,000." },
    fecha: "2026-10-12",
    entrada: { saldo: 8000, situacion: "trabajando" },
    esperado: { tasa: 100, disponible: 8000, queda: 0 },
  },
  {
    nombre: "Enero 2027: vuelve el tope del 50 %",
    origen: { tipo: "recalculado", detalle: "Art. 42 del DL 650 modificado por la Ley 32322: retiros de hasta el 50 %. Saldo 8,000: 4,000." },
    fecha: "2027-01-02",
    entrada: { saldo: 8000, situacion: "trabajando" },
    esperado: { tasa: 50, disponible: 4000, queda: 4000 },
  },
  {
    nombre: "Enfermedad terminal en 2027: 100 %",
    origen: { tipo: "recalculado", detalle: "Art. 42, segundo párrafo: retiro del 100 % con diagnóstico acreditado." },
    fecha: "2027-03-01",
    entrada: { saldo: 12500.55, situacion: "enfermedad" },
    esperado: { tasa: 100, disponible: 12500.55 },
  },
]);
