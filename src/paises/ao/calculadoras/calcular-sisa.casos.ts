import { definirCasos } from "@/motor/calculo";
import calcularSisa from "./calcular-sisa";

const OGE = "https://tcontas.ao/wp-content/uploads/2026/09/Lei-14-25-de-30-de-Dezembro-OGE-2026.pdf";
const AGT = "https://portaldocontribuinte.minfin.gov.ao/impostos-e-taxas/imposto-predial-urbano";

export default definirCasos(calcularSisa, [
  {
    nombre: "Habitação de 30 milhões: isenta",
    origen: { tipo: "recalculado", url: OGE, detalle: "Artigo 27.º, n.º 1 da Lei n.º 14/25: isenção até 40 000 000." },
    fecha: "2026-10-24",
    entrada: { preco: 30000000, patrimonial: null, habitacao: true },
    esperado: { imposto: 0, taxa: 0 },
  },
  {
    nombre: "Habitação de 80 milhões: taxa a metade",
    origen: { tipo: "recalculado", url: OGE, detalle: "Artigo 27.º, n.º 2: 2 % reduzida em 50 % = 1 %. 80 000 000 × 1 % = 800 000." },
    fecha: "2026-10-24",
    entrada: { preco: 80000000, patrimonial: null, habitacao: true },
    esperado: { imposto: 800000, taxa: 1 },
  },
  {
    nombre: "Habitação de 150 milhões: taxa geral",
    origen: { tipo: "recalculado", url: AGT, detalle: "Acima de 100 000 000 não há redução. 150 000 000 × 2 % = 3 000 000." },
    fecha: "2026-10-24",
    entrada: { preco: 150000000, patrimonial: null, habitacao: true },
    esperado: { imposto: 3000000 },
  },
  {
    nombre: "Loja de 30 milhões",
    origen: { tipo: "recalculado", url: AGT, detalle: "Não é habitação: 30 000 000 × 2 % = 600 000." },
    fecha: "2026-10-24",
    entrada: { preco: 30000000, patrimonial: null, habitacao: false },
    esperado: { imposto: 600000 },
  },
  {
    nombre: "Valor patrimonial maior do que o preço",
    origen: { tipo: "recalculado", url: AGT, detalle: "Vale o maior: 50 000 000, no escalão reduzido. 50 000 000 × 1 % = 500 000." },
    fecha: "2026-10-24",
    entrada: { preco: 45000000, patrimonial: 50000000, habitacao: true },
    esperado: { base: 50000000, imposto: 500000 },
  },
]);
