import { definirCasos } from "@/motor/calculo";
import jubilacionIps from "./jubilacion-ips";

const L98 = "https://www.bacn.gov.py/leyes-paraguayas/4394/ley-n-98-establece-el-regimen-unificado-de-jubilaciones-y-pensiones" as const;

export default definirCasos(jubilacionIps, [
  {
    nombre: "60 años y 25 de aporte",
    origen: { tipo: "recalculado", url: L98, detalle: "Art. 60: 60 años y 25 de servicios, 100 % del promedio de los últimos 36 meses: 5.000.000." },
    fecha: "2026-10-12",
    entrada: { edad: 60, anios: 25, promedio: 5000000 },
    esperado: { tipo: "Jubilación ordinaria", tasa: 100, jubilacion: 5000000 },
  },
  {
    nombre: "57 años y 31 de aporte",
    origen: { tipo: "recalculado", url: L98, detalle: "Art. 60: 55 años y 30 de servicios, 80 % más 4 puntos por cada año después de los 55: 80 + 8 = 88 %. 4.000.000 × 88 % = 3.520.000." },
    fecha: "2026-10-12",
    entrada: { edad: 57, anios: 31, promedio: 4000000 },
    esperado: { tipo: "Jubilación ordinaria con 30 años de aporte", tasa: 88, jubilacion: 3520000 },
  },
  {
    nombre: "Sin los requisitos",
    origen: { tipo: "recalculado", detalle: "58 años y 20 de aporte: no llega ni a 60 y 25 ni a 55 y 30." },
    fecha: "2026-10-12",
    entrada: { edad: 58, anios: 20, promedio: 4000000 },
    esperado: { tipo: "Todavía no reunís los requisitos", tasa: null, jubilacion: null },
  },
]);
