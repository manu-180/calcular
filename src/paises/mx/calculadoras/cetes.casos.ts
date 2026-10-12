import { definirCasos } from "@/motor/calculo";
import cetes from "./cetes";

export default definirCasos(cetes, [
  {
    nombre: "10,000 a 28 días con la subasta del 8 de octubre",
    origen: {
      tipo: "oficial",
      url: "https://www.banxico.org.mx/SieInternet/consultaSerieGrafica.do?s=SF43936,CF107,1&versionSerie=LA-MAS-RECIENTE&l=es",
      detalle: "CETES 28 del 08/10/2026: 6.09 %. 10000 × 6.09 % × 28 / 360 = 47.37. ISR 10000 × 0.90 % × 28 / 365 = 6.90 (LIF 2026, art. 24). Neto 40.47.",
    },
    fecha: "2026-10-12",
    entrada: { monto: 10000, plazo: "28" },
    esperado: { tasa: 6.09, bruto: 47.37, retencion: 6.9, neto: 40.47, final: 10040.47 },
  },
  {
    nombre: "100,000 a 364 días",
    origen: { tipo: "recalculado", detalle: "CETES 364 del 01/10/2026: 7.44 %. 100000 × 7.44 % × 364 / 360 = 7522.67. ISR 100000 × 0.90 % × 364 / 365 = 897.53. Neto 6625.14." },
    fecha: "2026-10-12",
    entrada: { monto: 100000, plazo: "364" },
    esperado: { tasa: 7.44, bruto: 7522.67, retencion: 897.53, neto: 6625.14 },
  },
  {
    nombre: "Fórmula con una tasa fija",
    origen: { tipo: "recalculado", detalle: "Con 10 %: 36000 × 10 % × 91 / 360 = 910. ISR 36000 × 0.90 % × 91 / 365 = 80.78." },
    fecha: "2026-10-12",
    entrada: { monto: 36000, plazo: "91" },
    valores: { "mx.cetes-91": { fecha: "2026-10-08", valor: 10 } },
    esperado: { bruto: 910, retencion: 80.78, neto: 829.22 },
  },
]);
