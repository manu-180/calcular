import { definirCasos } from "@/motor/calculo";
import reajusteDeArriendo from "./reajuste-de-arriendo";

export default definirCasos(reajusteDeArriendo, [
  {
    nombre: "Reajuste semestral: IPC de marzo a septiembre de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "IPC INE (base 2023 = 100, publicado por el SII): marzo 2026 = 110,75; septiembre 2026 = 113,59. Factor 1,025643. 500.000 × 1,025643 = 512.821,7 → 512.822.",
    },
    fecha: "2026-10-12",
    entrada: { arriendo: 500000, desde: "2026-03-01", hasta: "2026-09-01" },
    esperado: { nuevo: 512822, aumento: 12822 },
  },
  {
    nombre: "Reajuste anual: septiembre 2025 a septiembre 2026",
    origen: { tipo: "recalculado", detalle: "IPC sept 2025 = 109,14; sept 2026 = 113,59. Factor 1,040773. 650.000 × 1,040773 = 676.502,7 → 676.503." },
    fecha: "2026-10-12",
    entrada: { arriendo: 650000, desde: "2025-09-15", hasta: "2026-09-30" },
    esperado: { nuevo: 676503 },
  },
]);
