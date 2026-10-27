import { definirCasos } from "@/motor/calculo";
import limiteDeDescontos from "./limite-de-descontos";

const LT = "https://www.inss.gov.mz/wp-content/uploads/2025/09/NOVA-LEI-DO-TRABALHO-DE-25-DE-AGOSTO-DE-2023.pdf";

export default definirCasos(limiteDeDescontos, [
  {
    nombre: "30 000 MT com 4 000 MT já descontados",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 124, n.º 4: um terço = 10 000; margem 6 000. Artigo 123: espécie até 25 % = 7 500." },
    fecha: "2026-10-26",
    entrada: { remuneracao: 30000, descontos: 4000 },
    esperado: { maximo: 10000, margem: 6000, especie: 7500 },
  },
  {
    nombre: "Descontos acima do limite",
    origen: { tipo: "recalculado", url: LT, detalle: "Um terço de 12 000 = 4 000; com 5 000 de descontos não sobra margem." },
    fecha: "2026-10-26",
    entrada: { remuneracao: 12000, descontos: 5000 },
    esperado: { maximo: 4000, margem: 0 },
  },
]);
