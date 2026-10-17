import { definirCasos } from "@/motor/calculo";
import calculadora from "./buyer-stamp-duty";

const IRAS = "https://www.iras.gov.sg/taxes/stamp-duty/for-property/buying-or-acquiring-property/buyer's-stamp-duty-(bsd)";

export default definirCasos(calculadora, [
  {
    nombre: "IRAS example: residential at $4,500,100",
    origen: { tipo: "oficial", url: IRAS, detalle: "1,800 + 3,600 + 19,200 + 20,000 + 75,000 + 90,006 = 209,606." },
    fecha: "2026-10-14",
    entrada: { precio: 4500100, tipo: "residencial" },
    esperado: { bsd: 209606 },
  },
  {
    nombre: "IRAS example: non-residential component of $13,000,000",
    origen: { tipo: "oficial", url: IRAS, detalle: "1,800 + 3,600 + 19,200 + 20,000 + 575,000 = 619,600." },
    fecha: "2026-10-14",
    entrada: { precio: 13000000, tipo: "no-residencial" },
    esperado: { bsd: 619600 },
  },
  {
    nombre: "HDB resale at $550,000",
    origen: { tipo: "recalculado", detalle: "1,800 + 3,600 + 190,000 × 3% = 5,700. Total 11,100." },
    fecha: "2026-10-14",
    entrada: { precio: 550000, tipo: "residencial" },
    esperado: { bsd: 11100 },
  },
  {
    nombre: "Rounded down to the dollar",
    origen: { tipo: "recalculado", detalle: "1% × 100,050 = 1,000.50, rounded down to 1,000." },
    fecha: "2026-10-14",
    entrada: { precio: 100050, tipo: "residencial" },
    esperado: { bsd: 1000 },
  },
]);
