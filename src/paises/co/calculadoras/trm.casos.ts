import { definirCasos } from "@/motor/calculo";
import trm from "./trm";

export default definirCasos(trm, [
  {
    nombre: "100 dólares con la TRM del 7 de octubre de 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.datos.gov.co/resource/32sa-8pi3.json",
      detalle: "TRM certificada para el 7/10/2026: 3.216,01. 100 × 3.216,01 = 321.601.",
    },
    fecha: "2026-10-07",
    entrada: { direccion: "usd-a-cop", monto: 100 },
    esperado: { trm: 3216.01, fecha: "2026-10-07", pesos: 321601, dolares: null },
  },
  {
    nombre: "Lunes sin punto propio: rige la TRM del sábado",
    origen: { tipo: "recalculado", detalle: "La TRM 3.273,49 rige del 3 al 5/10/2026. 1.000.000 / 3.273,49 = 305,48." },
    fecha: "2026-10-05",
    entrada: { direccion: "cop-a-usd", monto: 1000000 },
    esperado: { trm: 3273.49, fecha: "2026-10-03", dolares: 305.48 },
  },
]);
