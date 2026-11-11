import { definirCasos } from "@/motor/calculo";
import mojDdvPovrat from "./moj-ddv-povrat";

const MF = "https://finance.gov.mk/";

export default definirCasos(mojDdvPovrat, [
  {
    nombre: "5.900 денари, македонски производ, општа стапка",
    origen: { tipo: "recalculado", url: MF, detalle: "ДДВ 5.900 − 5.900 / 1,18 = 900; поврат 20 % = 180." },
    fecha: "2026-11-01",
    entrada: { smetka: 5900, stapka: "opshta", vid: "makedonski" },
    esperado: { ddv: 900, povrat: 180 },
  },
  {
    nombre: "1.050 денари, друг производ, стапка 5 %",
    origen: { tipo: "recalculado", url: MF, detalle: "ДДВ 1.050 − 1.000 = 50; поврат 10 % = 5." },
    fecha: "2026-11-01",
    entrada: { smetka: 1050, stapka: "povlastena5", vid: "drugi" },
    esperado: { ddv: 50, povrat: 5 },
  },
]);
