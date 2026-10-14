import { definirCasos } from "@/motor/calculo";
import subsidioDeFerias from "./subsidio-de-ferias";

const CT = "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475";

export default definirCasos(subsidioDeFerias, [
  {
    nombre: "Ano normal, 22 dias",
    origen: { tipo: "recalculado", url: CT, detalle: "Artigos 238.º e 264.º: 22 dias correspondem a um mês. 1200 × 22 / 22 = 1200." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1200, dias: 22 },
    esperado: { subsidio: 1200, diasConta: 22 },
  },
  {
    nombre: "Ano de admissão com 12 dias",
    origen: { tipo: "recalculado", url: CT, detalle: "1100 × 12 / 22 = 600." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1100, dias: 12 },
    esperado: { subsidio: 600 },
  },
  {
    nombre: "25 dias por convenção: o subsídio fica nos 22",
    origen: { tipo: "recalculado", url: CT, detalle: "Artigo 264.º, n.º 2: duração mínima. 1000 × 22 / 22 = 1000." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1000, dias: 25 },
    esperado: { subsidio: 1000, diasConta: 22 },
  },
]);
