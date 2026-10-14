import { definirCasos } from "@/motor/calculo";
import cedolareSecca from "./calcolo-cedolare-secca";

export default definirCasos(cedolareSecca, [
  {
    nombre: "Canone libero di 9.600 euro con 30.000 euro di altri redditi",
    origen: {
      tipo: "recalculado",
      detalle: "Cedolare 21% = 2.016. Reddito IRPEF 9.600 − 5% = 9.120, tutto nello scaglione del 33%: 3.009,60. Risparmio 993,60.",
    },
    fecha: "2026-10-14",
    entrada: { canone: 9600, contratto: "libero", altriRedditi: 30000 },
    esperado: { cedolare: 2016, reddito: 9120, irpef: 3009.6, risparmio: 993.6, marginale: 33 },
  },
  {
    nombre: "Canone concordato di 7.200 euro con 15.000 euro di altri redditi",
    origen: {
      tipo: "recalculado",
      detalle: "Cedolare 10% = 720. Reddito 7.200 − 5% = 6.840, meno 30% = 4.788; IRPEF 23% = 1.101,24. Risparmio 381,24.",
    },
    fecha: "2026-10-14",
    entrada: { canone: 7200, contratto: "concordato", altriRedditi: 15000 },
    esperado: { cedolare: 720, reddito: 4788, irpef: 1101.24, risparmio: 381.24, marginale: 23 },
  },
  {
    nombre: "Canone libero a cavallo di due scaglioni",
    origen: {
      tipo: "recalculado",
      detalle: "Reddito 12.000 − 5% = 11.400; altri redditi 20.000. IRPEF in più: 8.000 × 23% + 3.400 × 33% = 1.840 + 1.122 = 2.962. Cedolare 21% = 2.520.",
    },
    fecha: "2026-10-14",
    entrada: { canone: 12000, contratto: "libero", altriRedditi: 20000 },
    esperado: { cedolare: 2520, irpef: 2962, risparmio: 442 },
  },
]);
