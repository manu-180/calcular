import { definirCasos } from "@/motor/calculo";
import trinnskatt from "./trinnskatt";

const SATSER = "https://www.skatteetaten.no/satser/trinnskatt/?year=2026";

export default definirCasos(trinnskatt, [
  {
    nombre: "800 000 kr i personinntekt: trinn 3",
    origen: { tipo: "recalculado", url: SATSER, detalle: "92 200 × 1,7 % = 1 567,40; 406 750 × 4 % = 16 270; 74 950 × 13,7 % = 10 268,15. Sum 28 105,55." },
    fecha: "2026-10-24",
    entrada: { inntekt: 800000 },
    esperado: { trinnskatt: 28105.55, marginal: 13.7, perManed: 2342.13 },
  },
  {
    nombre: "Under første trinn",
    origen: { tipo: "recalculado", url: SATSER, detalle: "200 000 kr er under 226 100 kr: ingen trinnskatt." },
    fecha: "2026-10-24",
    entrada: { inntekt: 200000 },
    esperado: { trinnskatt: 0, marginal: 0 },
  },
  {
    nombre: "2 000 000 kr: alle fem trinn",
    origen: { tipo: "recalculado", url: SATSER, detalle: "1 567,40 + 16 270 + 34 941,85 + 81 832,80 + 532 800 × 17,8 % (94 838,40) = 229 450,45." },
    fecha: "2026-10-24",
    entrada: { inntekt: 2000000 },
    esperado: { trinnskatt: 229450.45, marginal: 17.8 },
  },
  {
    nombre: "Inntekt null",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Uten inntekt er det ingenting å regne på." },
    fecha: "2026-10-24",
    entrada: { inntekt: 0 },
    esperaError: true,
  },
]);
