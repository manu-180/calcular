import { definirCasos } from "@/motor/calculo";
import maternidad from "./maternidad";

export default definirCasos(maternidad, [
  {
    nombre: "Parto el 15 de diciembre de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 95: un mes antes y tres después. Del 15/11/2026 al 14/3/2027. 4 × 800.000 = 3.200.000, mitad la CCSS (1.600.000) y mitad el patrono (1.600.000).",
    },
    fecha: "2026-10-12",
    entrada: { salario: 800000, fechaParto: "2026-12-15" },
    esperado: { inicio: "2026-11-15", fin: "2027-03-14", meses: 4, total: 3200000, ccss: 1600000, patrono: 1600000 },
  },
  {
    nombre: "Parto a fin de mes",
    origen: { tipo: "recalculado", detalle: "Parto 31/3/2026: un mes antes es el 28/2/2026 (febrero no tiene 31); tres meses después vence el 29/6/2026." },
    fecha: "2026-10-12",
    entrada: { salario: 500000, fechaParto: "2026-03-31" },
    esperado: { inicio: "2026-02-28", fin: "2026-06-29", total: 2000000 },
  },
]);
