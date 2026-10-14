import { definirCasos } from "@/motor/calculo";
import diasDeFerias from "./dias-de-ferias";

const CT = "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475";

export default definirCasos(diasDeFerias, [
  {
    nombre: "Admitido a 1 de março",
    origen: { tipo: "recalculado", url: CT, detalle: "Artigo 239.º: 10 meses × 2 = 20 dias (máximo 20). Gozo a partir de 01/09. Subsídio 1200 × 20 / 22 = 1090,91." },
    fecha: "2026-10-14",
    entrada: { admissao: "2026-03-01", retribuicao: 1200 },
    esperado: { diasAdmissao: 20, meses: 10, gozoDesde: "01/09/2026", subsidioAdmissao: 1090.91 },
  },
  {
    nombre: "Admitido a 15 de setembro",
    origen: { tipo: "recalculado", url: CT, detalle: "Meses completos até 31/12: 3 (15/09 a 14/12). 3 × 2 = 6 dias. Gozo a partir de 15/03 do ano seguinte." },
    fecha: "2026-10-14",
    entrada: { admissao: "2026-09-15", retribuicao: 1100 },
    esperado: { diasAdmissao: 6, meses: 3, gozoDesde: "15/03/2027", subsidioAdmissao: 300 },
  },
  {
    nombre: "Admitido a 2 de janeiro: limite de 20 dias",
    origen: { tipo: "recalculado", url: CT, detalle: "11 meses completos × 2 = 22, limitado a 20." },
    fecha: "2026-10-14",
    entrada: { admissao: "2026-01-02", retribuicao: 1000 },
    esperado: { diasAdmissao: 20, meses: 11, diasAnuais: 22 },
  },
]);
