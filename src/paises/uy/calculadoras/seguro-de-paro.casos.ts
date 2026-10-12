import { definirCasos } from "@/motor/calculo";
import seguroDeParo from "./seguro-de-paro";

const BASE = { causal: "despido", modalidad: "mensual", familia: false, mayor50: false } as const;

export default definirCasos(seguroDeParo, [
  {
    nombre: "Despido de un mensual con promedio de $ 60.000",
    origen: {
      tipo: "recalculado",
      url: "https://www.impo.com.uy/bases/decretos-ley/15180-1981/7",
      detalle: "Decreto-Ley 15.180, art. 7.1: 66 %, 57 %, 50 %, 45 %, 42 % y 40 % de 60.000 = 39.600, 34.200, 30.000, 27.000, 25.200 y 24.000. Total 180.000. Ninguno llega al tope.",
    },
    fecha: "2026-10-12",
    entrada: { ...BASE, monto: 60000 },
    esperado: { mes1: 39600, mes2: 34200, mes3: 30000, mes4: 27000, mes5: 25200, mes6: 24000, total: 180000, extension: null },
  },
  {
    nombre: "Sueldo alto: todos los meses en el tope, con familia a cargo",
    origen: {
      tipo: "oficial",
      url: "https://www.bps.gub.uy/4802/subsidio-por-desempleo-por-despido.html",
      detalle: "Topes 2026 del BPS (93.155, 80.445, 67.754, 59.287, 55.044, 50.802) más 20 % de suplemento (art. 7.9 y 7.10): 111.786; 96.534; 81.304,80; 71.144,40; 66.052,80; 60.962,40.",
    },
    fecha: "2026-10-12",
    entrada: { ...BASE, monto: 200000, familia: true },
    esperado: { mes1: 111786, mes2: 96534, mes3: 81304.8, mes4: 71144.4, mes5: 66052.8, mes6: 60962.4, total: 487784.4 },
  },
  {
    nombre: "Sueldo bajo: se paga el mínimo",
    origen: { tipo: "recalculado", detalle: "66 % de 10.000 = 6.600, por debajo del mínimo de 8.467 (BPS, enero 2026). Seis meses de 8.467 = 50.802." },
    fecha: "2026-10-12",
    entrada: { ...BASE, monto: 10000 },
    esperado: { mes1: 8467, mes6: 8467, total: 50802 },
  },
  {
    nombre: "Jornalero despedido que cobró $ 300.000 en 6 meses",
    origen: { tipo: "recalculado", detalle: "Jornal 300.000 / 150 = 2.000. Jornales 16, 14, 12, 11, 10 y 9 (72): 32.000 ... 18.000. Total 144.000." },
    fecha: "2026-10-12",
    entrada: { ...BASE, modalidad: "jornalero", monto: 300000 },
    esperado: { mes1: 32000, mes2: 28000, mes6: 18000, total: 144000 },
  },
  {
    nombre: "Suspensión total de un mensual",
    origen: { tipo: "recalculado", detalle: "Art. 7.2: 50 % de 60.000 = 30.000 por mes, cuatro meses: 120.000." },
    fecha: "2026-10-12",
    entrada: { ...BASE, causal: "suspension", monto: 60000 },
    esperado: { mes1: 30000, mes4: 30000, mes5: null, total: 120000 },
  },
  {
    nombre: "Despido con 50 años o más",
    origen: { tipo: "recalculado", detalle: "Art. 6.3 y 7.5: seis meses más al porcentaje del sexto mes. 6 × 24.000 = 144.000." },
    fecha: "2026-10-12",
    entrada: { ...BASE, monto: 60000, mayor50: true },
    esperado: { extension: 144000 },
  },
]);
