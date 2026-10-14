import { definirCasos } from "@/motor/calculo";
import calculadora from "./kinderbijslag-berekenen";

const SVB = "https://www.svb.nl/nl/kinderbijslag/bedragen-betaaldagen/bedragen-kinderbijslag" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Twee kinderen in het derde kwartaal 2026",
    origen: { tipo: "oficial", url: SVB, detalle: "Derde en vierde kwartaal 2026: 0 tot en met 5 jaar € 298,40, 12 tot en met 17 jaar € 426,29. Samen 724,69 per kwartaal; × 4 = 2.898,76." },
    fecha: "2026-10-14",
    entrada: { jong: 1, midden: 0, oud: 1 },
    esperado: { kwartaal: 724.69, jaar: 2898.76, jong: 298.4, oud: 426.29 },
  },
  {
    nombre: "Laatste dag van het tweede kwartaal 2026",
    origen: { tipo: "oficial", url: SVB, detalle: "Eerste en tweede kwartaal 2026: 6 tot en met 11 jaar € 358,30. Twee kinderen: 716,60." },
    fecha: "2026-06-30",
    entrada: { jong: 0, midden: 2, oud: 0 },
    esperado: { kwartaal: 716.6 },
  },
  {
    nombre: "Eerste dag van het derde kwartaal 2026",
    origen: { tipo: "oficial", url: SVB, detalle: "6 tot en met 11 jaar vanaf het derde kwartaal: € 362,35. Twee kinderen: 724,70." },
    fecha: "2026-07-01",
    entrada: { jong: 0, midden: 2, oud: 0 },
    esperado: { kwartaal: 724.7 },
  },
  {
    nombre: "Geen kinderen ingevuld",
    origen: { tipo: "recalculado", detalle: "Zonder kinderen geen kinderbijslag." },
    fecha: "2026-10-14",
    entrada: { jong: 0, midden: 0, oud: 0 },
    esperaError: true,
  },
]);
