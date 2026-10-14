import { definirCasos } from "@/motor/calculo";
import calculadora from "./thuiswerkvergoeding-berekenen";

const LH = "https://download.belastingdienst.nl/belastingdienst/docs/bijlage-nieuwsbrief-loonheffingen-2026-lh2091b63fd.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Twee dagen per week thuis",
    origen: { tipo: "oficial", url: LH, detalle: "Tabel 13: € 2,45 per thuiswerkdag. 2 × 46 = 92 dagen × 2,45 = 225,40." },
    fecha: "2026-10-14",
    entrada: { dagen: 2, weken: 46, bedrag: null },
    esperado: { dagenPerJaar: 92, onbelast: 225.4, perMaand: 18.78, belast: 0 },
  },
  {
    nombre: "€ 3 per dag: deel belast",
    origen: { tipo: "recalculado", detalle: "3 × 46 = 138 dagen. Vergoeding 414; onbelast 338,10; belast 75,90." },
    fecha: "2026-10-14",
    entrada: { dagen: 3, weken: 46, bedrag: 3 },
    esperado: { vergoeding: 414, onbelast: 338.1, belast: 75.9 },
  },
  {
    nombre: "Geen thuiswerkdagen",
    origen: { tipo: "recalculado", detalle: "Ongeldige invoer." },
    fecha: "2026-10-14",
    entrada: { dagen: 0, weken: 46, bedrag: null },
    esperaError: true,
  },
]);
