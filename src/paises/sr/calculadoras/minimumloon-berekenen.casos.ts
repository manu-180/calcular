import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimumloon-berekenen";

export default definirCasos(calculadora, [
  {
    nombre: "40 uur per week sinds 1 juli 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.sris.sr/wp-content/uploads/2026/08/S.B.-2026-no.-63-Beschikking-houdende-vaststelling-van-een-nieuw-minimum-uurloon.pdf",
      detalle: "S.B. 2026 no. 63: SRD 61,25 per uur vanaf 1 juli 2026. Week 61,25 × 40 = 2.450; maand 2.450 × 52 / 12 = 10.616,67; dag 8 × 61,25 = 490; jaar 127.400.",
    },
    fecha: "2026-10-27",
    entrada: { urenPerWeek: 40 },
    esperado: { uurloon: 61.25, dagloon: 490, weekloon: 2450, maandloon: 10616.67, jaarloon: 127400 },
  },
  {
    nombre: "Laatste dag van het oude bedrag",
    origen: {
      tipo: "oficial",
      url: "https://www.sris.sr/wp-content/uploads/2025/03/S.B.-2025-no.-33-Beschikking-houdende-vaststelling-van-een-nieuw-minimum-uurloon.pdf",
      detalle: "S.B. 2025 no. 33: SRD 52,47 per uur vanaf 1 april 2025. Week 52,47 × 40 = 2.098,80; maand × 52 / 12 = 9.094,80.",
    },
    fecha: "2026-06-30",
    entrada: { urenPerWeek: 40 },
    esperado: { uurloon: 52.47, weekloon: 2098.8, maandloon: 9094.8 },
  },
  {
    nombre: "Eerste dag van het nieuwe bedrag, 24 uur",
    origen: { tipo: "recalculado", detalle: "61,25 × 24 = 1.470 per week; × 52 / 12 = 6.370 per maand." },
    fecha: "2026-07-01",
    entrada: { urenPerWeek: 24 },
    esperado: { uurloon: 61.25, weekloon: 1470, maandloon: 6370 },
  },
]);
