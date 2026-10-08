import { definirCasos } from "@/motor/calculo";
import sueldoLiquido from "./sueldo-liquido";

const SIP = "https://media.economiayfinanzas.gob.bo/sites/default/files/2025-10/Bolet%C3%ADn%20SIP_diciembre%202024.pdf" as const;

export default definirCasos(sueldoLiquido, [
  {
    nombre: "Salario mínimo 2026",
    origen: { tipo: "recalculado", url: SIP, detalle: "Aportes del dependiente 12,71 % (cuadro 3 del boletín SIP): 330 + 56,43 + 16,50 + 16,50 = 419,43. Sin RC-IVA (no pasa de 2 salarios mínimos). Líquido 3.300 − 419,43 = 2.880,57." },
    fecha: "2026-10-07",
    entrada: { totalGanado: 3300, facturas: null },
    esperado: { gestora: 419.43, nacionalSolidario: 0, rcIva: 0, liquido: 2880.57 },
  },
  {
    nombre: "Quince mil, con Aporte Nacional Solidario y RC-IVA",
    origen: {
      tipo: "recalculado",
      detalle:
        "Aportes 1.500 + 256,50 + 75 + 75 = 1.906,50. ANS 1,15 % × (15.000 − 13.000) = 23. Neto 13.070,50. RC-IVA: (13.070,50 − 6.600) × 13 % = 841,17, menos 13 % de un salario mínimo (429) = 412,17. Líquido 12.658,33.",
    },
    fecha: "2026-10-07",
    entrada: { totalGanado: 15000, facturas: null },
    esperado: { cotizacion: 1500, riesgoComun: 256.5, comision: 75, solidario: 75, gestora: 1906.5, nacionalSolidario: 23, rcIva: 412.17, liquido: 12658.33, saldoAFavor: 0 },
  },
  {
    nombre: "Quince mil con facturas que cubren el impuesto",
    origen: { tipo: "recalculado", detalle: "Facturas por 4.000: 13 % = 520 contra 412,17 de impuesto. Retención 0 y saldo a favor 107,83." },
    fecha: "2026-10-07",
    entrada: { totalGanado: 15000, facturas: 4000 },
    esperado: { rcIva: 0, liquido: 13070.5, saldoAFavor: 107.83 },
  },
  {
    nombre: "Cuarenta mil: los tres tramos del Aporte Nacional Solidario",
    origen: {
      tipo: "recalculado",
      url: "https://www.economiayfinanzas.gob.bo/sites/default/files/2024-10/L15821807NCPP.pdf",
      detalle: "ANS (Ley 1582): 1,15 % × 27.000 = 310,50; 5,74 % × 15.000 = 861; 11,48 % × 5.000 = 574; total 1.745,50. Aportes 5.084. Neto 33.170,50. RC-IVA (33.170,50 − 6.600) × 13 % = 3.454,17 − 429 = 3.025,17. Líquido 30.145,33.",
    },
    fecha: "2026-10-07",
    entrada: { totalGanado: 40000, facturas: null },
    esperado: { gestora: 5084, nacionalSolidario: 1745.5, rcIva: 3025.17, liquido: 30145.33 },
  },
  {
    nombre: "Justo en el límite del RC-IVA (neto de 3 salarios mínimos)",
    origen: { tipo: "recalculado", detalle: "11.341,51 − aportes 1.441,51 = 9.900. (9.900 − 6.600) × 13 % = 429, igual al cómputo de un salario mínimo: no paga." },
    fecha: "2026-10-07",
    entrada: { totalGanado: 11341.51, facturas: null },
    esperado: { gestora: 1441.51, rcIva: 0, liquido: 9900 },
  },
  {
    nombre: "El mismo sueldo con el salario mínimo de 2025",
    origen: { tipo: "recalculado", url: "https://www.impuestos.gob.bo/wp-content/uploads/2025/09/DS-5383.pdf", detalle: "Con 2.750: (9.900 − 5.500) × 13 % = 572, menos 13 % de 2.750 (357,50) = 214,50. Líquido 9.685,50." },
    fecha: "2025-12-15",
    entrada: { totalGanado: 11341.51, facturas: null },
    esperado: { rcIva: 214.5, liquido: 9685.5 },
  },
]);
