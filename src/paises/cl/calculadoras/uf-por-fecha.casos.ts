import { definirCasos } from "@/motor/calculo";
import ufPorFecha from "./uf-por-fecha";

export default definirCasos(ufPorFecha, [
  {
    nombre: "UF del 1 de octubre de 2026",
    origen: { tipo: "oficial", url: "https://www.sii.cl/valores_y_fechas/uf/uf2026.htm", detalle: "SII: UF del 1/10/2026 = 41.065,38. 100 UF = 4.106.538." },
    fecha: "2026-10-07",
    entrada: { dia: "2026-10-01", monto: 100 },
    esperado: { valorUf: 41065.38, pesos: 4106538 },
  },
  {
    nombre: "UF del 1 de enero de 2026",
    origen: { tipo: "oficial", url: "https://www.sii.cl/valores_y_fechas/uf/uf2026.htm", detalle: "SII: UF del 1/1/2026 = 39.731,79." },
    fecha: "2026-10-07",
    entrada: { dia: "2026-01-01", monto: 1 },
    esperado: { valorUf: 39731.79, pesos: 39732 },
  },
  {
    nombre: "Día que todavía no se publica a esa fecha",
    origen: { tipo: "recalculado", detalle: "Al 7/10/2026 la serie del repo llega hasta el 7/10; el 20/11 no existe todavía." },
    fecha: "2026-10-07",
    entrada: { dia: "2026-11-20", monto: 1 },
    esperaError: true,
  },
]);
