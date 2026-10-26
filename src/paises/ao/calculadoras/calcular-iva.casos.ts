import { definirCasos } from "@/motor/calculo";
import calcularIva from "./calcular-iva";

const AGT = "https://portaldocontribuinte.minfin.gov.ao/impostos-e-taxas/imposto-sobre-valor-acrescentado";

export default definirCasos(calcularIva, [
  {
    nombre: "Somar 14 % a 100 000 Kz",
    origen: { tipo: "recalculado", url: AGT, detalle: "100 000 × 14 % = 14 000. Com IVA: 114 000." },
    fecha: "2026-10-24",
    entrada: { operacao: "somar", valor: 100000 },
    esperado: { iva: 14000, comIva: 114000 },
  },
  {
    nombre: "Retirar o IVA de 57 000 Kz",
    origen: { tipo: "recalculado", url: AGT, detalle: "57 000 / 1,14 = 50 000. IVA 7 000." },
    fecha: "2026-10-24",
    entrada: { operacao: "retirar", valor: 57000 },
    esperado: { semIva: 50000, iva: 7000 },
  },
  {
    nombre: "Retirar o IVA com cêntimos",
    origen: { tipo: "recalculado", url: AGT, detalle: "10 000 / 1,14 = 8 771,93. IVA 1 228,07." },
    fecha: "2026-10-24",
    entrada: { operacao: "retirar", valor: 10000 },
    esperado: { semIva: 8771.93, iva: 1228.07 },
  },
]);
