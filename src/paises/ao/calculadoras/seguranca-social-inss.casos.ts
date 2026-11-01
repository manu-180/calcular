import { definirCasos } from "@/motor/calculo";
import segurancaSocialInss from "./seguranca-social-inss";

const DP = "https://portal.inss.gov.ao/wp-content/uploads/2021/10/227_18.pdf";

export default definirCasos(segurancaSocialInss, [
  {
    nombre: "Trabalhador no activo",
    origen: { tipo: "recalculado", url: DP, detalle: "Artigo 12.º, n.º 1: 350 000 × 3 % = 10 500 e 350 000 × 8 % = 28 000. Total 38 500." },
    fecha: "2026-10-24",
    entrada: { remuneracao: 350000, reformado: false },
    esperado: { trabalhador: 10500, empregador: 28000, total: 38500, depois: 339500 },
  },
  {
    nombre: "Trabalhador reformado",
    origen: { tipo: "recalculado", url: DP, detalle: "Artigo 12.º, n.º 2: 200 000 × 8 % = 16 000 do trabalhador, mais 16 000 da entidade empregadora." },
    fecha: "2026-10-24",
    entrada: { remuneracao: 200000, reformado: true },
    esperado: { trabalhador: 16000, taxaTrabalhador: 8, empregador: 16000, total: 32000 },
  },
]);
