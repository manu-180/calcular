import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Sueldo del ejemplo ক de la Nirdeshika 2026-27 (mujer)",
    origen: {
      tipo: "recalculado",
      detalle:
        "La Nirdeshika (págs. 90-91) da 12,93,000 de ingreso por empleo, exento 4,31,000 (un tercio) y 8,62,000 imponible. Sin las otras rentas: umbral 4,50,000; 3,00,000 × 10 % + 1,12,000 × 15 % = 46,800; rebaja la menor de 25,860 y 31,000 = 25,860; impuesto 20,940; 1,745 al mes.",
    },
    fecha: "2026-10-24",
    entrada: { mensual: 99000, bono: 105000, categoria: "women-senior", pf: 0, inversion: 310000 },
    esperado: { anual: 1293000, exento: 431000, imponible: 862000, rebaja: 25860, impuesto: 20940, mensualImpuesto: 1745, neto: 97255 },
  },
  {
    nombre: "60,000 al mes",
    origen: { tipo: "recalculado", detalle: "7,20,000 al año; exento 2,40,000; imponible 4,80,000; 80,000 × 10 % = 8,000; 666.67 al mes." },
    fecha: "2026-10-24",
    entrada: { mensual: 60000, bono: 0, categoria: "general", pf: 0, inversion: 0 },
    esperado: { impuesto: 8000, mensualImpuesto: 666.67, neto: 59333.33 },
  },
  {
    nombre: "30,000 al mes queda exento",
    origen: { tipo: "recalculado", detalle: "3,60,000 al año; exento 1,20,000; imponible 2,40,000, bajo el umbral de 4,00,000." },
    fecha: "2026-10-24",
    entrada: { mensual: 30000, bono: 0, categoria: "general", pf: 0, inversion: 0 },
    esperado: { impuesto: 0, neto: 30000 },
  },
  {
    nombre: "2 lakh al mes con el tope del exento",
    origen: { tipo: "recalculado", detalle: "24,00,000 al año; exento tope 5,00,000; imponible 19,00,000: 30,000 + 60,000 + 1,00,000 + 3,00,000 × 25 % = 2,65,000; 22,083.33 al mes." },
    fecha: "2026-10-24",
    entrada: { mensual: 200000, bono: 0, categoria: "general", pf: 0, inversion: 0 },
    esperado: { exento: 500000, impuesto: 265000, mensualImpuesto: 22083.33, neto: 177916.67 },
  },
  {
    nombre: "1 lakh al mes con fondo de previsión",
    origen: { tipo: "recalculado", detalle: "12,00,000; exento 4,00,000; imponible 8,00,000: 30,000 + 1,00,000 × 15 % = 45,000; rebaja 10 % de 60,000 = 6,000; impuesto 39,000; 3,250 al mes; neto 1,00,000 − 3,250 − 5,000 = 91,750." },
    fecha: "2026-10-24",
    entrada: { mensual: 100000, bono: 0, categoria: "general", pf: 5000, inversion: 0 },
    esperado: { rebaja: 6000, impuesto: 39000, mensualImpuesto: 3250, neto: 91750 },
  },
]);
