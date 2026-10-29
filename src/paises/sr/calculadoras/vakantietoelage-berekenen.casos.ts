import { definirCasos } from "@/motor/calculo";
import calculadora from "./vakantietoelage-berekenen";

const VAC = "https://www.dna.sr/media/egnb5dhm/vakantiewet.pdf";
const SB = "https://www.sris.sr/wp-content/uploads/2025/11/S.B.-2025-no.-129-STAATSBESLUIT-ter-uitvoering-van-artikel-18a-van-de-Wet-Loonbelasting.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "SRD 15.000 per maand, 12 dagen",
    origen: { tipo: "recalculado", url: VAC, detalle: "Dagloon 180.000 / 260 = 692,31; toelage 50% × 692,31 × 12 = 4.153,86; onder een maandloon, dus helemaal vrij." },
    fecha: "2026-10-27",
    entrada: { maandloon: 15000, dagen: 12, werkdagen: "5" },
    esperado: { toelage: 4153.86, dagloon: 692.31, vrijgesteld: 4153.86, belastbaar: 0 },
  },
  {
    nombre: "SRD 60.000 per maand, 18 dagen",
    origen: { tipo: "recalculado", url: SB, detalle: "Dagloon 720.000 / 260 = 2.769,23; toelage 50% × 2.769,23 × 18 = 24.923,07; vrij tot 19.500 (S.B. 2025 no. 129); belastbaar 5.423,07." },
    fecha: "2026-10-27",
    entrada: { maandloon: 60000, dagen: 18, werkdagen: "5" },
    esperado: { toelage: 24923.07, vrijgesteld: 19500, belastbaar: 5423.07 },
  },
  {
    nombre: "Zelfde loon in 2024, oude vrijstelling",
    origen: { tipo: "recalculado", url: "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Loonbelasting.pdf", detalle: "In 2024 was het maximum 10.016: belastbaar 24.923,07 − 10.016 = 14.907,07." },
    fecha: "2024-06-01",
    entrada: { maandloon: 60000, dagen: 18, werkdagen: "5" },
    esperado: { vrijgesteld: 10016, belastbaar: 14907.07 },
  },
  {
    nombre: "Zes werkdagen per week",
    origen: { tipo: "recalculado", detalle: "Dagloon 180.000 / 312 = 576,92; toelage 50% × 576,92 × 12 = 3.461,52." },
    fecha: "2026-10-27",
    entrada: { maandloon: 15000, dagen: 12, werkdagen: "6" },
    esperado: { dagloon: 576.92, toelage: 3461.52 },
  },
]);
