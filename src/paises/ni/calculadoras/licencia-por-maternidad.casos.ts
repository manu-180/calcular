import { definirCasos } from "@/motor/calculo";
import licenciaPorMaternidad from "./licencia-por-maternidad";

export default definirCasos(licenciaPorMaternidad, [
  {
    nombre: "Parto previsto para el 1 de diciembre con C$9,000",
    origen: {
      tipo: "recalculado",
      detalle:
        "Código del Trabajo art. 141: 4 semanas antes y 8 después. 01/12/2026 − 28 días = 03/11/2026; + 55 días = 25/01/2027. 84 días × 300 = 25200. Ley de Seguridad Social art. 95: 60 % = 15120; el resto, 10080.",
    },
    fecha: "2026-10-12",
    entrada: { parto: "2026-12-01", salario: 9000, multiple: false },
    esperado: { inicio: "2026-11-03", fin: "2027-01-25", semanas: 12, total: 25200, inss: 15120, empleador: 10080 },
  },
  {
    nombre: "Parto múltiple",
    origen: { tipo: "recalculado", detalle: "Art. 141: 10 semanas después en parto múltiple. 14 semanas = 98 días × 300 = 29400; fin 01/12/2026 + 69 días = 08/02/2027. 60 % = 17640." },
    fecha: "2026-10-12",
    entrada: { parto: "2026-12-01", salario: 9000, multiple: true },
    esperado: { fin: "2027-02-08", semanas: 14, total: 29400, inss: 17640, empleador: 11760 },
  },
]);
