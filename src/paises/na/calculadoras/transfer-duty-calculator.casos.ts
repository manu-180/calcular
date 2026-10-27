import { definirCasos } from "@/motor/calculo";
import calculadora from "./transfer-duty-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "N$1,500,000 bought by a person",
    origen: {
      tipo: "recalculado",
      detalle: "Transfer Duty Amendment Act 2024: 1% of 400,000 above 1,100,000 = 4,000. Stamp duty: 400 × N$10 = 4,000. Total 8,000.",
    },
    fecha: "2026-10-27",
    entrada: { precio: 1500000, comprador: "natural" },
    esperado: { derecho: 4000, sellos: 4000, total: 8000 },
  },
  {
    nombre: "N$2,000,000 bought by a person",
    origen: {
      tipo: "recalculado",
      detalle: "4,800 + 5% × 420,000 = 25,800. Stamp duty 900 × 10 = 9,000. Total 34,800.",
    },
    fecha: "2026-10-27",
    entrada: { precio: 2000000, comprador: "natural" },
    esperado: { derecho: 25800, sellos: 9000, total: 34800 },
  },
  {
    nombre: "N$15,000,000 bought by a person",
    origen: { tipo: "recalculado", detalle: "799,300 + 11% × 2,900,000 = 1,118,300. Stamp duty 13,900 × 10 = 139,000." },
    fecha: "2026-10-27",
    entrada: { precio: 15000000, comprador: "natural" },
    esperado: { derecho: 1118300, sellos: 139000 },
  },
  {
    nombre: "N$1,000,000 bought by a person",
    origen: { tipo: "recalculado", detalle: "Below N$1,100,000: no transfer duty and no stamp duty." },
    fecha: "2026-10-27",
    entrada: { precio: 1000000, comprador: "natural" },
    esperado: { total: 0 },
  },
  {
    nombre: "Part of N$1,000 counts in full for stamp duty",
    origen: { tipo: "recalculado", detalle: "1,100,500 is 500 above the exemption: one N$1,000 or part, so N$10. Transfer duty 1% × 500 = 5." },
    fecha: "2026-10-27",
    entrada: { precio: 1100500, comprador: "natural" },
    esperado: { sellos: 10, derecho: 5 },
  },
  {
    nombre: "N$2,000,000 bought by a company",
    origen: { tipo: "recalculado", detalle: "12% × 2,000,000 = 240,000." },
    fecha: "2026-10-27",
    entrada: { precio: 2000000, comprador: "other" },
    esperado: { derecho: 240000, total: 240000 },
  },
]);
