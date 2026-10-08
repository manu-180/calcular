import { definirCasos } from "@/motor/calculo";
import rcIva from "./rc-iva";

const LEY843 = "https://www.impuestos.gob.bo/wp-content/uploads/2026/09/1.-LEY-N%C2%B0-843-08-26.pdf" as const;

export default definirCasos(rcIva, [
  {
    nombre: "Quince mil sin facturas",
    origen: {
      tipo: "recalculado",
      url: LEY843,
      detalle:
        "D.S. 21531 art. 8: neto 15.000 − 1.906,50 − 23 = 13.070,50; menos 2 SMN (6.600) = 6.470,50; 13 % = 841,17; menos 13 % de 1 SMN (429) = 412,17. Para cubrirlo hacen falta 412,17 / 0,13 = 3.170,54 en facturas.",
    },
    fecha: "2026-10-07",
    entrada: { totalGanado: 15000, facturas: 0, saldoAnterior: null },
    esperado: { sueldoNeto: 13070.5, minimoNoImponible: 6600, base: 6470.5, impuesto: 841.17, computoSalarioMinimo: 429, retencion: 412.17, saldoAFavor: 0, facturasParaCubrir: 3170.54 },
  },
  {
    nombre: "Facturas justas para no pagar",
    origen: { tipo: "recalculado", detalle: "3.170,54 × 13 % = 412,17: cubre el impuesto, sin retención ni saldo." },
    fecha: "2026-10-07",
    entrada: { totalGanado: 15000, facturas: 3170.54, saldoAnterior: null },
    esperado: { creditoFacturas: 412.17, retencion: 0, saldoAFavor: 0 },
  },
  {
    nombre: "Con saldo a favor del mes anterior",
    origen: { tipo: "recalculado", detalle: "412,17 − 100 de saldo = 312,17 de retención; para cubrirlo, 312,17 / 0,13 = 2.401,31 en facturas." },
    fecha: "2026-10-07",
    entrada: { totalGanado: 15000, facturas: 0, saldoAnterior: 100 },
    esperado: { retencion: 312.17, facturasParaCubrir: 2401.31 },
  },
  {
    nombre: "Ocho mil: el cómputo cubre el impuesto",
    origen: { tipo: "recalculado", detalle: "Neto 8.000 − 1.016,80 = 6.983,20; base 383,20; 13 % = 49,82, menor que 429. No paga." },
    fecha: "2026-10-07",
    entrada: { totalGanado: 8000, facturas: 0, saldoAnterior: null },
    esperado: { base: 383.2, impuesto: 49.82, retencion: 0, facturasParaCubrir: 0 },
  },
  {
    nombre: "Primer día del cómputo de un salario mínimo (2025)",
    origen: { tipo: "recalculado", url: "https://www.impuestos.gob.bo/wp-content/uploads/2025/09/DS-5383.pdf", detalle: "Primer día con cómputo de 1 SMN (1/5/2025) y SMN 2025 de 2.750: 2 SMN = 5.500, cómputo 357,50. Neto 13.070,50 − 5.500 = 7.570,50; 13 % = 984,17; − 357,50 = 626,67." },
    fecha: "2025-05-01",
    entrada: { totalGanado: 15000, facturas: 0, saldoAnterior: null },
    esperado: { minimoNoImponible: 5500, impuesto: 984.17, computoSalarioMinimo: 357.5, retencion: 626.67 },
  },
]);
