import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator";

const GP = "https://www.hasil.gov.my/wp-content/uploads/garis-panduan-pengenaan-duti-setem-jadual-pertama-as-1949.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "RM500,000 home, local buyer",
    origen: { tipo: "oficial", url: GP, detalle: "Item 32(a): RM1 per RM100 on the first 100,000 (1,000) and RM2 per RM100 up to 500,000 (8,000). Total 9,000." },
    fecha: "2026-10-16",
    entrada: { valor: 500000, comprador: "local" },
    esperado: { duty: 9000, total: 509000 },
  },
  {
    nombre: "RM1,200,000, local buyer",
    origen: { tipo: "recalculado", detalle: "1,000 + 8,000 + 3% of 500,000 (15,000) + 4% of 200,000 (8,000) = 32,000." },
    fecha: "2026-10-16",
    entrada: { valor: 1200000, comprador: "local" },
    esperado: { duty: 32000 },
  },
  {
    nombre: "RM350,050: a part of RM100 counts as RM100",
    origen: { tipo: "recalculado", detalle: "Charged per RM100 or part of it: 350,100. 1,000 + 250,100 × 2% = 6,002." },
    fecha: "2026-10-16",
    entrada: { valor: 350050, comprador: "local" },
    esperado: { duty: 6002 },
  },
  {
    nombre: "RM800,000 home bought by a foreigner",
    origen: { tipo: "oficial", url: GP, detalle: "Item 32(ab), residential property sold to a foreign company or non-citizen from 1 January 2026: RM8 per RM100. 64,000." },
    fecha: "2026-10-16",
    entrada: { valor: 800000, comprador: "foreign-residential" },
    esperado: { duty: 64000 },
  },
  {
    nombre: "RM800,000 shop bought by a foreign company",
    origen: { tipo: "oficial", url: GP, detalle: "Item 32(aa): RM4 per RM100. 32,000." },
    fecha: "2026-10-16",
    entrada: { valor: 800000, comprador: "foreign-other" },
    esperado: { duty: 32000 },
  },
]);
