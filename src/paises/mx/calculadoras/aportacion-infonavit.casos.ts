import { definirCasos } from "@/motor/calculo";
import infonavit from "./aportacion-infonavit";

export default definirCasos(infonavit, [
  {
    nombre: "SBC de 500 en un bimestre de 61 días",
    origen: { tipo: "recalculado", detalle: "LFT art. 136: 5 % del salario. 500 × 5 % = 25 por día; × 61 = 1525; × 30.4 = 760; × 365 = 9125." },
    fecha: "2026-10-15",
    entrada: { sbc: 500, dias: 61 },
    esperado: { bimestral: 1525, mensual: 760, anual: 9125 },
  },
  {
    nombre: "Salario arriba del tope",
    origen: { tipo: "recalculado", detalle: "Tope 25 × 117.31 = 2932.75; × 5 % × 61 = 8944.89." },
    fecha: "2026-10-15",
    entrada: { sbc: 4000, dias: 61 },
    esperado: { sbc: 2932.75, bimestral: 8944.89 },
  },
]);
