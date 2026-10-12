import { definirCasos } from "@/motor/calculo";
import irIndemnizacion from "./ir-indemnizacion";

export default definirCasos(irIndemnizacion, [
  {
    nombre: "Indemnización por antigüedad dentro de los cinco meses",
    origen: { tipo: "recalculado", detalle: "LCT art. 19 num. 3: exentas hasta cinco meses de salario. 20000 × 5 = 100000, mayor que 80000: todo exento, retención 0." },
    fecha: "2026-10-12",
    entrada: { salario: 20000, indemnizacion: 80000 },
    esperado: { exentaMeses: 80000, exentaAdicional: 0, gravada: 0, retencion: 0, neto: 80000 },
  },
  {
    nombre: "Excedente de cinco meses cubierto por el monto adicional",
    origen: { tipo: "recalculado", detalle: "50000 × 5 = 250000 exento. Resto 400000 − 250000 = 150000, menor que C$500,000: exento. Gravada 0." },
    fecha: "2026-10-12",
    entrada: { salario: 50000, indemnizacion: 400000 },
    esperado: { exentaMeses: 250000, exentaAdicional: 150000, gravada: 0, retencion: 0 },
  },
  {
    nombre: "Indemnización alta con parte gravada",
    origen: { tipo: "recalculado", detalle: "150000 × 5 = 750000 exento. Resto 1500000 − 750000 = 750000; exentos 500000 más; gravada 250000. LCT art. 24 num. 1 (Ley 987): 15 %. 250000 × 15 % = 37500. Neto 1500000 − 37500 = 1462500." },
    fecha: "2026-10-12",
    entrada: { salario: 150000, indemnizacion: 1500000 },
    esperado: { exentaMeses: 750000, exentaAdicional: 500000, gravada: 250000, retencion: 37500, neto: 1462500 },
  },
  {
    nombre: "Con la alícuota anterior a la Ley 987",
    origen: { tipo: "recalculado", detalle: "Prueba de fórmula con el 10 % de la Ley 891: gravada 250000 × 10 % = 25000." },
    fecha: "2026-10-12",
    entrada: { salario: 150000, indemnizacion: 1500000 },
    valores: { "ni.ir-retencion-indemnizacion": 10 },
    esperado: { gravada: 250000, retencion: 25000 },
  },
  {
    nombre: "Sin salario no se puede calcular",
    origen: { tipo: "recalculado", detalle: "El tope de cinco meses necesita el salario mensual." },
    fecha: "2026-10-12",
    entrada: { salario: 0, indemnizacion: 100000 },
    esperaError: true,
  },
]);
