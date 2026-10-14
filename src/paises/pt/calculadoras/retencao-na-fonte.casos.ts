import { definirCasos } from "@/motor/calculo";
import retencaoNaFonte from "./retencao-na-fonte";

const DESPACHO = "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/Despachos_SEAF/Documents/Despacho-SEAF-2026-01-05-XXV.pdf";

export default definirCasos(retencaoNaFonte, [
  {
    nombre: "Limite da 2.ª linha da tabela I (taxa efetiva de 5,3 % no despacho)",
    origen: { tipo: "oficial", url: DESPACHO, detalle: "Coluna «taxa efetiva mensal de retenção no limite do escalão»: 5,3 % a 1 042 €. 1042 × 12,5 % − 12,5 % × 2,6 × (1273,85 − 1042) = 130,25 − 75,35 = 54,90." },
    fecha: "2026-10-14",
    entrada: { remuneracao: 1042, situacao: "nao-casado", dependentes: 0 },
    esperado: { retencao: 54.9, taxa: 12.5, parcela: 75.35 },
  },
  {
    nombre: "Limite da 6.ª linha da tabela I (13,5 % no despacho)",
    origen: { tipo: "oficial", url: DESPACHO, detalle: "1819 × 24,10 % − 193,33 = 245,05, que é 13,5 % de 1 819." },
    fecha: "2026-10-14",
    entrada: { remuneracao: 1819, situacao: "casado-dois", dependentes: 0 },
    esperado: { retencao: 245.05 },
  },
  {
    nombre: "Limite da 11.ª linha da tabela III (33,2 % no despacho)",
    origen: { tipo: "oficial", url: DESPACHO, detalle: "20265 × 38,43 % − 1049,96 = 6737,88." },
    fecha: "2026-10-14",
    entrada: { remuneracao: 20265, situacao: "casado-unico", dependentes: 0 },
    esperado: { retencao: 6737.88 },
  },
  {
    nombre: "Tabela III com um dependente na 2.ª linha",
    origen: { tipo: "recalculado", url: DESPACHO, detalle: "1000 × 12,5 % − 12,5 % × 2,6 × (1372,15 − 1000) − 42,86 = 125 − 120,95 − 42,86 < 0, retenção 0." },
    fecha: "2026-10-14",
    entrada: { remuneracao: 1000, situacao: "casado-unico", dependentes: 1 },
    esperado: { retencao: 0 },
  },
  {
    nombre: "Último escalão da tabela I",
    origen: { tipo: "recalculado", url: DESPACHO, detalle: "25000 × 47,17 % − 1272,31 = 10520,19." },
    fecha: "2026-10-14",
    entrada: { remuneracao: 25000, situacao: "nao-casado", dependentes: 0 },
    esperado: { retencao: 10520.19, taxa: 47.17 },
  },
]);
