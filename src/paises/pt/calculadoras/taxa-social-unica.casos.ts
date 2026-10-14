import { definirCasos } from "@/motor/calculo";
import taxaSocialUnica from "./taxa-social-unica";

const CC = "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34514575";

export default definirCasos(taxaSocialUnica, [
  {
    nombre: "1 500 € de remuneração",
    origen: { tipo: "recalculado", url: CC, detalle: "Artigo 53.º: 1500 × 11 % = 165; 1500 × 23,75 % = 356,25; total 521,25 (34,75 %)." },
    fecha: "2026-10-14",
    entrada: { remuneracao: 1500 },
    esperado: { trabalhador: 165, empresa: 356.25, total: 521.25, taxaTotal: 34.75 },
  },
  {
    nombre: "Salário mínimo",
    origen: { tipo: "recalculado", url: CC, detalle: "920 × 11 % = 101,20; 920 × 23,75 % = 218,50." },
    fecha: "2026-10-14",
    entrada: { remuneracao: 920 },
    esperado: { trabalhador: 101.2, empresa: 218.5, total: 319.7 },
  },
]);
