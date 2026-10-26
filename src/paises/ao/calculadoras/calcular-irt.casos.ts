import { definirCasos } from "@/motor/calculo";
import calcularIrt from "./calcular-irt";

const OGE = "https://tcontas.ao/wp-content/uploads/2026/09/Lei-14-25-de-30-de-Dezembro-OGE-2026.pdf";

export default definirCasos(calcularIrt, [
  {
    nombre: "Exactamente no limite isento",
    origen: { tipo: "recalculado", url: OGE, detalle: "150 000 Kz está no 1.º escalão (acima de 0 até 150 000): isento." },
    fecha: "2026-10-18",
    entrada: { materia: 150000 },
    esperado: { irt: 0, escalao: 1 },
  },
  {
    nombre: "Um kwanza acima do limite",
    origen: { tipo: "recalculado", url: OGE, detalle: "12 500 + (150 001 − 150 000) × 16 % = 12 500,16." },
    fecha: "2026-10-18",
    entrada: { materia: 150001 },
    esperado: { irt: 12500.16, escalao: 2 },
  },
  {
    nombre: "350 000 Kz no 4.º escalão",
    origen: { tipo: "recalculado", url: OGE, detalle: "49 250 + (350 000 − 300 000) × 19 % = 58 750." },
    fecha: "2026-10-18",
    entrada: { materia: 350000 },
    esperado: { irt: 58750, escalao: 4, depois: 291250 },
  },
  {
    nombre: "Último escalão",
    origen: { tipo: "recalculado", url: OGE, detalle: "2 342 250 + (12 000 000 − 10 000 000) × 25 % = 2 842 250." },
    fecha: "2026-10-18",
    entrada: { materia: 12000000 },
    esperado: { irt: 2842250, escalao: 11 },
  },
]);
