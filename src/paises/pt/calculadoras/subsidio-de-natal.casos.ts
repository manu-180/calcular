import { definirCasos } from "@/motor/calculo";
import subsidioDeNatal from "./subsidio-de-natal";

const CT = "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475";

export default definirCasos(subsidioDeNatal, [
  {
    nombre: "Ano completo",
    origen: { tipo: "recalculado", url: CT, detalle: "Artigo 263.º: um mês de retribuição. 1200 × 12 / 12 = 1200." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1200, meses: 12 },
    esperado: { subsidio: 1200, duodecimo: 100 },
  },
  {
    nombre: "Admitido em abril (9 meses)",
    origen: { tipo: "recalculado", url: CT, detalle: "Proporcional no ano de admissão: 1500 × 9 / 12 = 1125." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1500, meses: 9 },
    esperado: { subsidio: 1125, duodecimo: 125 },
  },
]);
