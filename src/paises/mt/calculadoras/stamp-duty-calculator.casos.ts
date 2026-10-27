import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "First-time buyer, €300,000",
    origen: { tipo: "recalculado", detalle: "S.L. 364.12, art. 3: no duty on the first 200,000. The other 100,000 at €5 per €100 (Cap. 364, art. 32(1)) = 5,000." },
    fecha: "2026-10-26",
    entrada: { precio: 300000, comprador: "first-time" },
    esperado: { duty: 5000, exento: 200000, ahorro: 10000 },
  },
  {
    nombre: "First-time buyer under €200,000",
    origen: { tipo: "recalculado", detalle: "180,000 is fully inside the exempt part, so no duty." },
    fecha: "2026-10-26",
    entrada: { precio: 180000, comprador: "first-time" },
    esperado: { duty: 0, efectiva: 0 },
  },
  {
    nombre: "Sole ordinary residence, €300,000",
    origen: { tipo: "recalculado", detalle: "Art. 32(4)(a): 200,000 at €3.50 per €100 = 7,000, plus 100,000 at €5 per €100 = 5,000. Total 12,000." },
    fecha: "2026-10-26",
    entrada: { precio: 300000, comprador: "sole-residence" },
    esperado: { duty: 12000, ahorro: 3000 },
  },
  {
    nombre: "Other property, €250,050 rounds up to the next €100",
    origen: { tipo: "recalculado", detalle: "Art. 32(1): €5 for every €100 or part. 250,050 → 2,501 hundreds × 5 = 12,505." },
    fecha: "2026-10-26",
    entrada: { precio: 250050, comprador: "other" },
    esperado: { duty: 12505, efectiva: 5 },
  },
  { nombre: "No price", origen: { tipo: "recalculado", detalle: "Price must be above zero." }, fecha: "2026-10-26", entrada: { precio: 0, comprador: "other" }, esperaError: true },
]);
