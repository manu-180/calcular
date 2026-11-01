import { definirCasos } from "@/motor/calculo";
import kalkulatorInflacioni from "./kalkulator-inflacioni";

const T = "https://www.instat.gov.al/media/45gobr53/tab-3-ick-coicop-ver2.xlsx";

export default definirCasos(kalkulatorInflacioni, [
  {
    nombre: "Shtator 2025 te shtator 2026",
    origen: { tipo: "oficial", url: "https://www.instat.gov.al/media/lffopiav/ick_shtator-2026.pdf", detalle: "INSTAT: inflacioni vjetor në shtator 2026 është 2,9%. 103,4394 / 100,5011 × 100 000 = 102 924." },
    fecha: "2026-10-30",
    entrada: { shuma: 100000, nga: "2025-09-15", deri: "2026-09-20" },
    esperado: { sot: 102924, diferenca: 2924, totali: 2.92 },
    tolerancia: 0.01,
  },
  {
    nombre: "Janar 2021 te shtator 2026",
    origen: { tipo: "recalculado", url: T, detalle: "103,4394 / 84,6083 × 50 000 = 61 128." },
    fecha: "2026-10-30",
    entrada: { shuma: 50000, nga: "2021-01-01", deri: "2026-09-01" },
    esperado: { sot: 61128 },
  },
  {
    nombre: "Muaj para fillimit të serisë",
    origen: { tipo: "recalculado", url: T, detalle: "Seria fillon në janar 2021." },
    fecha: "2026-10-30",
    entrada: { shuma: 100000, nga: "2020-01-01", deri: "2026-09-01" },
    esperaError: true,
  },
]);
