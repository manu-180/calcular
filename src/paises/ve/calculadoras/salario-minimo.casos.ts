import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Un mes de salario mínimo con la tasa del 8 de octubre de 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.presidencia.gob.ve/Site/Web/Principal/paginas/classMostrarEvento3.php?id_evento=20553",
      detalle: "Decreto 4.653, art. 1: Bs 130 mensuales; diario = 130 / 30 = 4,33. Tasa BCV fecha valor 8/10/2026: 874,7321. 130 / 874,7321 = 0,15.",
    },
    fecha: "2026-10-08",
    entrada: { tipo: "general", meses: 1 },
    esperado: { mensual: 130, diario: 4.33, total: 130, tasa: 874.7321, fechaTasa: "2026-10-08", enDolares: 0.15 },
  },
  {
    nombre: "Aprendices, un año, con la tasa del día anterior",
    origen: { tipo: "recalculado", detalle: "Decreto 4.653, art. 2: Bs 97,50. × 12 = 1.170. Tasa fecha valor 7/10/2026: 873,867. 1.170 / 873,867 = 1,34." },
    fecha: "2026-10-07",
    entrada: { tipo: "aprendiz", meses: 12 },
    esperado: { mensual: 97.5, diario: 3.25, total: 1170, tasa: 873.867, fechaTasa: "2026-10-07", enDolares: 1.34 },
  },
]);
