import { definirCasos } from "@/motor/calculo";
import ventajasEconomicas from "./ventajas-economicas";

export default definirCasos(ventajasEconomicas, [
  {
    nombre: "Q7,000 en dinero",
    origen: { tipo: "recalculado", detalle: "CT art. 90: las ventajas son el 30 % del total. Total 7000 / 0.70 = 10000; ventajas 3000." },
    fecha: "2026-10-12",
    entrada: { dinero: 7000 },
    esperado: { parte: 30, ventajas: 3000, total: 10000 },
  },
  {
    nombre: "Salario mínimo en dinero",
    origen: { tipo: "recalculado", detalle: "4002.28 / 0.70 = 5717.54; ventajas 1715.26." },
    fecha: "2026-10-12",
    entrada: { dinero: 4002.28 },
    esperado: { ventajas: 1715.26, total: 5717.54 },
  },
]);
