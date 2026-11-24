import { definirCasos } from "@/motor/calculo";
import prosechnaPlata from "./prosechna-plata";

const DZS = "https://www.stat.mk/mk/site-indikatori/";

export default definirCasos(prosechnaPlata, [
  {
    nombre: "40.000 денари нето, август 2026",
    origen: { tipo: "recalculado", url: DZS, detalle: "40.000 / 48.733 = 82,1 %; разлика −8.733." },
    fecha: "2026-11-01",
    entrada: { neto: 40000 },
    esperado: { procent: 82.1, razlika: -8733, prosekNeto: 48733, prosekBruto: 73336 },
  },
  {
    nombre: "Плата над просекот",
    origen: { tipo: "recalculado", url: DZS, detalle: "60.000 / 48.733 = 123,1 %; разлика 11.267." },
    fecha: "2026-11-01",
    entrada: { neto: 60000 },
    esperado: { procent: 123.1, razlika: 11267 },
  },
]);
