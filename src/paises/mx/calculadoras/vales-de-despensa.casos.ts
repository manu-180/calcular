import { definirCasos } from "@/motor/calculo";
import vales from "./vales-de-despensa";

export default definirCasos(vales, [
  {
    nombre: "1,500 de vales en un mes de 30 días",
    origen: { tipo: "recalculado", detalle: "LSS art. 27 fr. VI: no integra hasta 40 % de la UMA diaria = 46.924. × 30 = 1407.72. Integra 92.28; por día 3.08." },
    fecha: "2026-10-15",
    entrada: { vales: 1500, dias: 30 },
    esperado: { topeDiario: 46.92, tope: 1407.72, noIntegra: 1407.72, integra: 92.28, integraDiario: 3.08 },
  },
  {
    nombre: "Vales debajo del tope",
    origen: { tipo: "recalculado", detalle: "1000 < 1407.72: no integra nada." },
    fecha: "2026-10-15",
    entrada: { vales: 1000, dias: 30 },
    esperado: { integra: 0, noIntegra: 1000 },
  },
]);
