import { definirCasos } from "@/motor/calculo";
import valorUtm from "./valor-utm";

export default definirCasos(valorUtm, [
  {
    nombre: "UTM y UTA de octubre de 2026",
    origen: { tipo: "oficial", url: "https://www.sii.cl/valores_y_fechas/utm/utm2026.htm", detalle: "Tabla del SII, octubre 2026: UTM 72.151 y UTA 865.812." },
    fecha: "2026-10-15",
    entrada: { unidad: "utm", sentido: "a-pesos", monto: 1 },
    esperado: { valorUtm: 72151, valorUta: 865812, mesUtm: "2026-10-01", pesos: 72151 },
  },
  {
    nombre: "2 UTA a pesos",
    origen: { tipo: "recalculado", detalle: "72.151 × 12 × 2 = 1.731.624." },
    fecha: "2026-10-15",
    entrada: { unidad: "uta", sentido: "a-pesos", monto: 2 },
    esperado: { pesos: 1731624 },
  },
  {
    nombre: "Último día de septiembre usa la UTM de septiembre",
    origen: { tipo: "oficial", url: "https://www.sii.cl/valores_y_fechas/utm/utm2026.htm", detalle: "UTM de septiembre 2026 = 71.721." },
    fecha: "2026-09-30",
    entrada: { unidad: "utm", sentido: "a-pesos", monto: 1 },
    esperado: { valorUtm: 71721, mesUtm: "2026-09-01" },
  },
  {
    nombre: "Pesos a UTM",
    origen: { tipo: "recalculado", detalle: "144.302 / 72.151 = 2." },
    fecha: "2026-10-01",
    entrada: { unidad: "utm", sentido: "a-unidades", monto: 144302 },
    esperado: { unidades: 2, pesos: null },
  },
]);
