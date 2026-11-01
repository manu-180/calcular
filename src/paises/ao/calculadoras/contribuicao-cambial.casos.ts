import { definirCasos } from "@/motor/calculo";
import contribuicaoCambial from "./contribuicao-cambial";

const OGE = "https://tcontas.ao/wp-content/uploads/2026/09/Lei-14-25-de-30-de-Dezembro-OGE-2026.pdf";

export default definirCasos(contribuicaoCambial, [
  {
    nombre: "Pessoa singular, 1 milhão",
    origen: { tipo: "recalculado", url: OGE, detalle: "Artigo 16.º, n.º 7, alínea a: 2,5 %. 1 000 000 × 2,5 % = 25 000." },
    fecha: "2026-10-24",
    entrada: { titular: "singular", valor: 1000000 },
    esperado: { contribuicao: 25000, total: 1025000 },
  },
  {
    nombre: "Empresa, 5 milhões",
    origen: { tipo: "recalculado", url: OGE, detalle: "Artigo 16.º, n.º 7, alínea b: 10 %. 5 000 000 × 10 % = 500 000." },
    fecha: "2026-10-24",
    entrada: { titular: "colectiva", valor: 5000000 },
    esperado: { contribuicao: 500000, taxa: 10 },
  },
]);
