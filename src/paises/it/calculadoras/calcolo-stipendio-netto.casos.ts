import { definirCasos } from "@/motor/calculo";
import stipendioNetto from "./calcolo-stipendio-netto";

export default definirCasos(stipendioNetto, [
  {
    nombre: "RAL 30.000 euro, 13 mensilità, 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "Contributi 9,19% = 2.757; imponibile 27.243; IRPEF lorda 23% = 6.265,89; detrazione art. 13: 1.910 + 1.190 × 757 / 13.000 = 1.979,29, più 65 (tra 25.000 e 35.000) = 2.044,29; ulteriore detrazione cuneo 1.000; IRPEF netta 3.221,60; netto 24.021,40 / 13 = 1.847,80.",
    },
    fecha: "2026-06-15",
    entrada: { ral: 30000, mensilita: "13", contratto: "indeterminato", addizionaleRegionale: null, addizionaleComunale: null },
    esperado: { contributi: 2757, imponibile: 27243, lorda: 6265.89, detLavoro: 2044.29, detCuneo: 1000, irpefNetta: 3221.6, nettoAnnuo: 24021.4, nettoMensile: 1847.8 },
  },
  {
    nombre: "RAL 40.000 euro nel 2026, secondo scaglione al 33%",
    origen: {
      tipo: "recalculado",
      detalle:
        "Contributi 3.676; imponibile 36.324; IRPEF 6.440 + 8.324 × 33% = 9.186,92; detrazione 1.910 × 13.676 / 22.000 = 1.187,33; cuneo 1.000 × 3.676 / 8.000 = 459,50; netta 7.540,09; netto 28.783,91 / 13 = 2.214,15.",
    },
    fecha: "2026-03-01",
    entrada: { ral: 40000, mensilita: "13", contratto: "indeterminato", addizionaleRegionale: null, addizionaleComunale: null },
    esperado: { lorda: 9186.92, detLavoro: 1187.33, detCuneo: 459.5, irpefNetta: 7540.09, nettoAnnuo: 28783.91, nettoMensile: 2214.15 },
  },
  {
    nombre: "RAL 14.000 euro con somma esente e trattamento integrativo",
    origen: {
      tipo: "recalculado",
      detalle:
        "Contributi 1.286,60; imponibile 12.713,40; IRPEF lorda 2.924,08; detrazione 1.955; netta 969,08; somma esente 5,3% di 12.713,40 = 673,81; trattamento integrativo 1.200 (2.924,08 > 1.955 − 75); netto 14.000 − 1.286,60 − 969,08 + 673,81 + 1.200 = 13.618,13 / 13 = 1.047,55.",
    },
    fecha: "2026-06-15",
    entrada: { ral: 14000, mensilita: "13", contratto: "indeterminato", addizionaleRegionale: null, addizionaleComunale: null },
    esperado: { contributi: 1286.6, lorda: 2924.08, detLavoro: 1955, irpefNetta: 969.08, somma: 673.81, integrativo: 1200, nettoAnnuo: 13618.13, nettoMensile: 1047.55 },
  },
  {
    nombre: "RAL 30.000 euro, 14 mensilità e addizionali",
    origen: { tipo: "recalculado", detalle: "Addizionali (1,73% + 0,8%) × 27.243 = 689,25; netto 24.021,40 − 689,25 = 23.332,15 / 14 = 1.666,58." },
    fecha: "2026-06-15",
    entrada: { ral: 30000, mensilita: "14", contratto: "indeterminato", addizionaleRegionale: 1.73, addizionaleComunale: 0.8 },
    esperado: { addizionali: 689.25, nettoAnnuo: 23332.15, nettoMensile: 1666.58 },
  },
  {
    nombre: "RAL 60.000 euro, oltre la prima fascia pensionabile",
    origen: {
      tipo: "recalculado",
      detalle:
        "Contributi 5.514 + 1% di (60.000 − 56.224) = 5.551,76; imponibile 54.448,24; IRPEF 6.440 + 7.260 + 4.448,24 × 43% = 15.612,74; nessuna detrazione; netto 38.835,50 / 13 = 2.987,35.",
    },
    fecha: "2026-06-15",
    entrada: { ral: 60000, mensilita: "13", contratto: "indeterminato", addizionaleRegionale: null, addizionaleComunale: null },
    esperado: { contributi: 5551.76, lorda: 15612.74, detLavoro: 0, nettoAnnuo: 38835.5, nettoMensile: 2987.35 },
  },
  {
    nombre: "RAL a zero",
    origen: { tipo: "recalculado", detalle: "Senza RAL non c'è niente da calcolare." },
    fecha: "2026-06-15",
    entrada: { ral: 0, mensilita: "13", contratto: "indeterminato", addizionaleRegionale: null, addizionaleComunale: null },
    esperaError: true,
  },
]);
