import { definirCasos } from "@/motor/calculo";
import calculadora from "./standard-deduction";

const RP = "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Single filer under 65",
    origen: { tipo: "oficial", url: RP, detalle: "Rev. Proc. 2025-32, section 4.14: 16100 for unmarried individuals." },
    fecha: "2026-10-14",
    entrada: { estado: "single", mayores: 0, ciegos: 0, itemizadas: null },
    esperado: { basica: 16100, adicional: 0, total: 16100, conviene: null },
  },
  {
    nombre: "Married couple, both over 65 and one blind",
    origen: { tipo: "recalculado", url: RP, detalle: "32200 + 3 x 1650 = 37150." },
    fecha: "2026-10-14",
    entrada: { estado: "mfj", mayores: 2, ciegos: 1, itemizadas: 30000 },
    esperado: { basica: 32200, adicional: 4950, total: 37150, conviene: "Take the standard deduction", diferencia: 7150 },
  },
  {
    nombre: "Head of household over 65 who should itemize",
    origen: { tipo: "recalculado", url: RP, detalle: "24150 + 2050 = 26200. Itemized 30000 is 3800 more." },
    fecha: "2026-10-14",
    entrada: { estado: "hoh", mayores: 1, ciegos: 0, itemizadas: 30000 },
    esperado: { total: 26200, conviene: "Itemize", diferencia: 3800 },
  },
  {
    nombre: "Single return can't count two people",
    origen: { tipo: "recalculado", detalle: "Only joint returns have two people." },
    fecha: "2026-10-14",
    entrada: { estado: "single", mayores: 2, ciegos: 0, itemizadas: null },
    esperaError: true,
  },
]);
