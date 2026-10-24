import { definirCasos } from "@/motor/calculo";
import subsidioDeFerias from "./subsidio-de-ferias";

const LGT = "https://faolex.fao.org/docs/pdf/ang223057.pdf";

export default definirCasos(subsidioDeFerias, [
  {
    nombre: "Ano completo com o mínimo legal",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 238.º, n.º 1, alínea a: 350 000 × 50 % = 175 000." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 350000, meses: 12, percentagem: 50 },
    esperado: { subsidio: 175000, percentagem: 50 },
  },
  {
    nombre: "Ano de admissão com 5 meses",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 238.º, n.º 3: 240 000 × 50 % × 5 / 12 = 50 000." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 240000, meses: 5, percentagem: 50 },
    esperado: { subsidio: 50000 },
  },
  {
    nombre: "Contrato com 100 %",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 238.º, n.º 2: percentagem maior por contrato. 200 000 × 100 % = 200 000." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 200000, meses: 12, percentagem: 100 },
    esperado: { subsidio: 200000 },
  },
  {
    nombre: "Percentagem abaixo do mínimo",
    origen: { tipo: "recalculado", url: LGT, detalle: "30 % fica abaixo dos 50 % garantidos: erro." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 200000, meses: 12, percentagem: 30 },
    esperaError: true,
  },
]);
