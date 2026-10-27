import { definirCasos } from "@/motor/calculo";
import calcularSisa from "./calcular-sisa";

const SISA = "https://www.at.gov.mz/api/webdav?path=%2FLEGISLA%C3%87%C3%83O%2FLEGISLA%C3%87%C3%83O%20FISCAL%2FDECRETO%2FDecreto%20n.%C2%BA%2046-2004%20SISA%20(C%C3%B3digo%20da%20Sisa).pdf";

export default definirCasos(calcularSisa, [
  {
    nombre: "Preço acima do valor patrimonial",
    origen: { tipo: "recalculado", url: SISA, detalle: "Incide sobre o maior valor (3 000 000). Taxa de 2 %: 60 000." },
    fecha: "2026-10-26",
    entrada: { preco: 3000000, patrimonial: 2500000, paraiso: false },
    esperado: { base: 3000000, sisa: 60000 },
  },
  {
    nombre: "Valor patrimonial maior que o preço",
    origen: { tipo: "recalculado", url: SISA, detalle: "4 000 000 × 2 % = 80 000." },
    fecha: "2026-10-26",
    entrada: { preco: 3000000, patrimonial: 4000000, paraiso: false },
    esperado: { base: 4000000, sisa: 80000 },
  },
  {
    nombre: "Comprador em território de regime fiscal mais favorável",
    origen: { tipo: "recalculado", url: SISA, detalle: "Artigo 10, n.º 2: taxa de 10 %. 3 000 000 × 10 % = 300 000." },
    fecha: "2026-10-26",
    entrada: { preco: 3000000, patrimonial: null, paraiso: true },
    esperado: { sisa: 300000, taxa: 10 },
  },
]);
