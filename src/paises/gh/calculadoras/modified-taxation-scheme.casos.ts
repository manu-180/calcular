import { definirCasos } from "@/motor/calculo";
import calculadora from "./modified-taxation-scheme";

const GRA = "https://gra.gov.gh/wp-content/uploads/2026/09/Amendments-To-The-Income-Tax-2015-Act-896_Updated-1.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Turnover of GH₵300,000",
    origen: { tipo: "oficial", url: GRA, detalle: "Act 1178: turnover above GH₵20,000 and up to GH₵750,000 pays 3%. 300,000 × 3% = 9,000." },
    fecha: "2026-10-18",
    entrada: { ventas: 300000 },
    esperado: { impuesto: 9000, trimestral: 2250, mensual: 750 },
  },
  {
    nombre: "Above GH₵750,000",
    origen: { tipo: "recalculado", detalle: "Outside the scheme." },
    fecha: "2026-10-18",
    entrada: { ventas: 800000 },
    esperado: { impuesto: null },
  },
  {
    nombre: "At GH₵20,000",
    origen: { tipo: "recalculado", detalle: "The scheme applies above GH₵20,000." },
    fecha: "2026-10-18",
    entrada: { ventas: 20000 },
    esperado: { impuesto: null },
  },
]);
