import { definirCasos } from "@/motor/calculo";
import contribuicaoInss from "./contribuicao-inss";

export default definirCasos(contribuicaoInss, [
  {
    nombre: "TCO com 30 000 MT",
    origen: { tipo: "oficial", url: "https://www.inss.gov.mz/taxa-contributiva-contribuinte/", detalle: "4 % do contribuinte mais 3 % do trabalhador, 7 % no total: 1 200 + 900 = 2 100." },
    fecha: "2026-10-26",
    entrada: { regime: "tco", remuneracao: 30000 },
    esperado: { trabalhador: 900, empregador: 1200, total: 2100, taxa: 7 },
  },
  {
    nombre: "TCP com 15 000 MT",
    origen: { tipo: "oficial", url: "https://www.inss.gov.mz/taxa-contributiva-tcp/", detalle: "7 % pagos pelo próprio trabalhador: 1 050." },
    fecha: "2026-10-26",
    entrada: { regime: "tcp", remuneracao: 15000 },
    esperado: { total: 1050, empregador: null },
  },
]);
