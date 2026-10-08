import { definirCasos } from "@/motor/calculo";
import valorUf from "./valor-uf";

export default definirCasos(valorUf, [
  {
    nombre: "1 UF el 6 de octubre de 2026",
    origen: { tipo: "oficial", url: "https://www.sii.cl/valores_y_fechas/uf/uf2026.htm", detalle: "Tabla del SII: UF del 6/10/2026 = 41.106,35. Redondeado al peso: 41.106." },
    fecha: "2026-10-06",
    entrada: { sentido: "uf-a-pesos", monto: 1 },
    esperado: { valorUf: 41106.35, fechaUf: "2026-10-06", pesos: 41106, enUf: null },
  },
  {
    nombre: "Arriendo de 15 UF el 7 de octubre de 2026",
    origen: { tipo: "recalculado", detalle: "15 × 41.114,54 = 616.718,1 → $616.718." },
    fecha: "2026-10-07",
    entrada: { sentido: "uf-a-pesos", monto: 15 },
    esperado: { pesos: 616718 },
  },
  {
    nombre: "Un millón de pesos a UF",
    origen: { tipo: "recalculado", detalle: "1.000.000 / 41.114,54 = 24,32228..." },
    fecha: "2026-10-07",
    entrada: { sentido: "pesos-a-uf", monto: 1000000 },
    esperado: { enUf: 24.32228, pesos: null },
    tolerancia: 0.0001,
  },
  {
    nombre: "Primer día del año",
    origen: { tipo: "oficial", url: "https://www.sii.cl/valores_y_fechas/uf/uf2026.htm", detalle: "Tabla del SII: UF del 1/1/2026 = 39.731,79." },
    fecha: "2026-01-01",
    entrada: { sentido: "uf-a-pesos", monto: 100 },
    esperado: { valorUf: 39731.79, pesos: 3973179 },
  },
]);
