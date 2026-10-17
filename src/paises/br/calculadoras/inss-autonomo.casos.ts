import { definirCasos } from "@/motor/calculo";
import inssAutonomo from "./inss-autonomo";

const INSS = "https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal";

export default definirCasos(inssAutonomo, [
  {
    nombre: "Plano normal no salário mínimo",
    origen: { tipo: "oficial", url: INSS, detalle: "Tabela do INSS 2026: 20 % entre R$ 324,20 (salário mínimo) e R$ 1.695,11 (teto)." },
    fecha: "2026-10-14",
    entrada: { plano: "normal", valor: 1000 },
    esperado: { base: 1621, mensal: 324.2 },
  },
  {
    nombre: "Plano normal no teto",
    origen: { tipo: "oficial", url: INSS, detalle: "20 % de R$ 8.475,55 = R$ 1.695,11." },
    fecha: "2026-10-14",
    entrada: { plano: "normal", valor: 20000 },
    esperado: { base: 8475.55, mensal: 1695.11 },
  },
  {
    nombre: "Plano simplificado",
    origen: { tipo: "oficial", url: INSS, detalle: "11 % de R$ 1.621,00 = R$ 178,31." },
    fecha: "2026-10-14",
    entrada: { plano: "simplificado", valor: 5000 },
    esperado: { aliquota: 11, mensal: 178.31 },
  },
  {
    nombre: "Facultativo de baixa renda",
    origen: { tipo: "oficial", url: INSS, detalle: "5 % de R$ 1.621,00 = R$ 81,05." },
    fecha: "2026-10-14",
    entrada: { plano: "baixa-renda", valor: 0 },
    esperado: { mensal: 81.05 },
  },
  {
    nombre: "Plano normal com R$ 3.000",
    origen: { tipo: "recalculado", detalle: "20 % de 3000 = 600; no ano 7200." },
    fecha: "2026-10-14",
    entrada: { plano: "normal", valor: 3000 },
    esperado: { mensal: 600, anual: 7200 },
  },
]);
