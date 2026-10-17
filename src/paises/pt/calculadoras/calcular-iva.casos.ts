import { definirCasos } from "@/motor/calculo";
import calcularIva from "./calcular-iva";

const CIVA = "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/civa_rep/Pages/iva18.aspx";
const OFICIO = "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/instrucoes_administrativas/Documents/Oficio_circulado_25045_2024.pdf";

export default definirCasos(calcularIva, [
  {
    nombre: "Acrescentar 23 % a 100 euros no continente",
    origen: { tipo: "recalculado", url: CIVA, detalle: "100 × 23 % = 23. Total 123." },
    fecha: "2026-10-14",
    entrada: { valor: 100, operacao: "somar", taxa: "normal", regiao: "continente" },
    esperado: { base: 100, imposto: 23, total: 123, tasa: 23 },
  },
  {
    nombre: "Retirar a taxa intermédia de 113 euros no continente",
    origen: { tipo: "recalculado", url: CIVA, detalle: "113 / 1,13 = 100. IVA 13." },
    fecha: "2026-10-14",
    entrada: { valor: 113, operacao: "retirar", taxa: "intermedia", regiao: "continente" },
    esperado: { base: 100, imposto: 13, total: 113 },
  },
  {
    nombre: "Taxa normal dos Açores (16 %)",
    origen: { tipo: "recalculado", url: OFICIO, detalle: "250 × 16 % = 40. Total 290." },
    fecha: "2026-10-14",
    entrada: { valor: 250, operacao: "somar", taxa: "normal", regiao: "acores" },
    esperado: { imposto: 40, total: 290, tasa: 16 },
  },
  {
    nombre: "Retirar a taxa reduzida da Madeira (4 %)",
    origen: { tipo: "recalculado", url: OFICIO, detalle: "52 / 1,04 = 50. IVA 2." },
    fecha: "2026-10-14",
    entrada: { valor: 52, operacao: "retirar", taxa: "reduzida", regiao: "madeira" },
    esperado: { base: 50, imposto: 2, tasa: 4 },
  },
  {
    nombre: "Taxa intermédia da Madeira (12 %)",
    origen: { tipo: "recalculado", url: OFICIO, detalle: "1000 × 12 % = 120." },
    fecha: "2026-10-14",
    entrada: { valor: 1000, operacao: "somar", taxa: "intermedia", regiao: "madeira" },
    esperado: { imposto: 120, total: 1120 },
  },
]);
