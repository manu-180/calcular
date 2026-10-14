import { definirCasos } from "@/motor/calculo";
import dasMei from "./das-mei";

const INSS = "https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal";

export default definirCasos(dasMei, [
  {
    nombre: "Serviços",
    origen: { tipo: "oficial", url: INSS, detalle: "INSS do MEI: 5 % de R$ 1.621,00 = R$ 81,05 (tabela do INSS). Mais R$ 5 de ISS (LC 123, art. 18-A): R$ 86,05." },
    fecha: "2026-10-14",
    entrada: { atividade: "servicos", faturamento: null },
    esperado: { inss: 81.05, icms: 0, iss: 5, mensal: 86.05, anual: 1032.6 },
  },
  {
    nombre: "Comércio",
    origen: { tipo: "recalculado", detalle: "81,05 + 1 de ICMS = 82,05." },
    fecha: "2026-10-14",
    entrada: { atividade: "comercio", faturamento: 50000 },
    esperado: { mensal: 82.05 },
  },
  {
    nombre: "Comércio e serviços",
    origen: { tipo: "recalculado", detalle: "81,05 + 1 + 5 = 87,05." },
    fecha: "2026-10-14",
    entrada: { atividade: "ambos", faturamento: 90000 },
    esperado: { mensal: 87.05 },
  },
]);
