import { definirCasos } from "@/motor/calculo";
import aportesBps from "./aportes-bps";

export default definirCasos(aportesBps, [
  {
    nombre: "Sueldo de $ 50.000 sin hijos ni cónyuge",
    origen: {
      tipo: "recalculado",
      url: "https://www.bps.gub.uy/10314/tasas-fonasa.html",
      detalle: "Montepío 15 % de 50.000 = 7.500. Pasa 2,5 BPC (17.160): Fonasa 4,5 % = 2.250. FRL 0,1 % = 50. Total 9.800, 19,6 %.",
    },
    fecha: "2026-10-12",
    entrada: { nominal: 50000, hijos: 0, conyuge: false },
    esperado: { montepio: 7500, fonasa: 2250, tasaFonasa: 4.5, frl: 50, total: 9800, porcentajeTotal: 19.6 },
  },
  {
    nombre: "Sueldo bajo, hasta 2,5 BPC, con cónyuge",
    origen: { tipo: "recalculado", detalle: "15.000 no pasa 17.160: Fonasa con cónyuge 5 % = 750. Montepío 2.250. FRL 15. Total 3.015." },
    fecha: "2026-10-12",
    entrada: { nominal: 15000, hijos: 0, conyuge: true },
    esperado: { montepio: 2250, fonasa: 750, frl: 15, total: 3015 },
  },
  {
    nombre: "Sueldo sobre el tope de aportación, con hijos y cónyuge",
    origen: {
      tipo: "recalculado",
      detalle: "Montepío 15 % del tope 288.836 = 43.325,40. Fonasa 8 % de 300.000 = 24.000. FRL 300. Total 67.625,40.",
    },
    fecha: "2026-10-12",
    entrada: { nominal: 300000, hijos: 2, conyuge: true },
    esperado: { montepio: 43325.4, fonasa: 24000, tasaFonasa: 8, frl: 300, total: 67625.4 },
  },
]);
