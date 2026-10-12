import { definirCasos } from "@/motor/calculo";
import garantia from "./garantia-de-prestaciones";

export default definirCasos(garantia, [
  {
    nombre: "Primer año con $300",
    origen: {
      tipo: "recalculado",
      detalle: "LOTTT art. 142 a. Integral: 10 + 10×30/360 + 10×15/360 = 11,25. Trimestre: 15 × 11,25 = 168,75. Año: 60 × 11,25 = 675.",
    },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, diasUtilidades: 30, anios: 0 },
    esperado: { integralUsd: 11.25, diasTrimestre: 15, trimestreUsd: 168.75, diasAdicionales: 0, anualUsd: 675, trimestreBs: null },
  },
  {
    nombre: "Tres años cumplidos: 4 días adicionales",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 142 b: al cumplir el 3.er año, 2 × 2 = 4 días. Integral con bono de 18 días: 11,33. Trimestre 169,95; adicionales 45,32; año 60 × 11,33 + 45,32 = 725,12.",
    },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, diasUtilidades: 30, anios: 3 },
    esperado: { integralUsd: 11.33, trimestreUsd: 169.95, diasAdicionales: 4, adicionalesUsd: 45.32, anualUsd: 725.12 },
  },
  {
    nombre: "Veinte años: tope de 30 días adicionales en bolívares",
    origen: {
      tipo: "recalculado",
      detalle: "2 × 19 = 38, tope 30. Bs 36.000 / 30 = 1.200; bono 30 días; integral 1.200 + 100 + 100 = 1.400. Trimestre 21.000; adicionales 42.000.",
    },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", salario: 36000, diasUtilidades: 30, anios: 20 },
    esperado: { integralBs: 1400, trimestreBs: 21000, diasAdicionales: 30, adicionalesBs: 42000, anualBs: 126000 },
  },
]);
