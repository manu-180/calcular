import { definirCasos } from "@/motor/calculo";
import topeImponible from "./tope-imponible";

export default definirCasos(topeImponible, [
  {
    nombre: "Topes con la UF del 7 de octubre de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "UF 7/10/2026 = 41.114,54 (SII). 90 UF = 3.700.308,6 → 3.700.309. 135,2 UF = 5.558.685,8 → 5.558.686.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 4000000 },
    esperado: { tope: 3700309, topeCesantia: 5558686, topeIndemnizacion: 3700309, baseAfp: 3700309, baseCesantia: 4000000 },
  },
  {
    nombre: "Tope de enero de 2026 (87,8 UF)",
    origen: { tipo: "recalculado", detalle: "UF 15/1/2026 = 39.747,12 (SII). 87,8 UF = 3.489.797,1 → 3.489.797 (tope de enero según la SP)." },
    fecha: "2026-01-15",
    entrada: { sueldo: 0 },
    esperado: { tope: 3489797, baseAfp: null },
  },
]);
