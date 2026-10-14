import { definirCasos } from "@/motor/calculo";
import calculadora from "./rent-tax-credit";

const URL = "https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/land-and-property/rent-credit/how-much-claim.aspx";

export default definirCasos(calculadora, [
  {
    nombre: "Jane, single, €1,500 a month",
    origen: { tipo: "oficial", url: URL, detalle: "Revenue example 1 (2025): 18,000 at 20% = 3,600, capped at 1,000. Tax liability 16,500. Credit €1,000." },
    fecha: "2025-06-15",
    entrada: { alquiler: 18000, tipo: "single", impuesto: 16500 },
    esperado: { porAlquiler: 3600, credito: 1000 },
  },
  {
    nombre: "Ciarán and Seán, jointly assessed, two months of rent",
    origen: { tipo: "oficial", url: URL, detalle: "Revenue example 2 (2025): 3,000 at 20% = 600, cap 2,000. Credit €600." },
    fecha: "2025-06-15",
    entrada: { alquiler: 3000, tipo: "couple", impuesto: 24000 },
    esperado: { credito: 600, maximo: 2000 },
  },
  {
    nombre: "Ben, limited by his tax",
    origen: { tipo: "oficial", url: URL, detalle: "Revenue example 3 (2025): 1,600 at 20% = 320, but Income Tax was only 120. Credit €120." },
    fecha: "2025-06-15",
    entrada: { alquiler: 1600, tipo: "single", impuesto: 120 },
    esperado: { porAlquiler: 320, credito: 120 },
  },
  {
    nombre: "2026, no tax figure given",
    origen: { tipo: "recalculado", detalle: "12,000 at 20% = 2,400, capped at 1,000 for a single person." },
    fecha: "2026-10-14",
    entrada: { alquiler: 12000, tipo: "single", impuesto: null },
    esperado: { credito: 1000 },
  },
]);
