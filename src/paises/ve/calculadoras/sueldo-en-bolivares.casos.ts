import { definirCasos } from "@/motor/calculo";
import sueldoEnBolivares from "./sueldo-en-bolivares";

export default definirCasos(sueldoEnBolivares, [
  {
    nombre: "$240 con la tasa del 8 de octubre de 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.bcv.org.ve/estadisticas/tipo-cambio-de-referencia-smc",
      detalle: "Tasa BCV fecha valor 08/10/2026: 874,7321. 240 × 874,7321 = 209.935,70; quincena 104.967,85; diario (entre 30) 6.997,86.",
    },
    fecha: "2026-10-08",
    entrada: { usd: 240 },
    esperado: { tasa: 874.7321, fechaTasa: "2026-10-08", mensual: 209935.7, quincena: 104967.85, diario: 6997.86 },
  },
  {
    nombre: "$200 con la tasa del 1 de octubre de 2026",
    origen: { tipo: "recalculado", detalle: "Tasa BCV 01/10/2026: 860,1753. 200 × 860,1753 = 172.035,06; quincena 86.017,53; diario 5.734,50." },
    fecha: "2026-10-01",
    entrada: { usd: 200 },
    esperado: { tasa: 860.1753, mensual: 172035.06, quincena: 86017.53, diario: 5734.5 },
  },
  {
    nombre: "Fin de semana: usa la última tasa publicada",
    origen: { tipo: "recalculado", detalle: "El sábado 03/10/2026 rige la tasa del viernes 02/10/2026: 866,5612. $100 → 86.656,12." },
    fecha: "2026-10-03",
    entrada: { usd: 100 },
    esperado: { tasa: 866.5612, fechaTasa: "2026-10-02", mensual: 86656.12 },
  },
]);
