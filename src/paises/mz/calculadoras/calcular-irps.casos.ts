import { definirCasos } from "@/motor/calculo";
import calcularIrps from "./calcular-irps";

const BR = "https://www.at.gov.mz/api/webdav?path=%2FLEGISLA%C3%87%C3%83O%2FLEGISLA%C3%87%C3%83O%20FISCAL%2FLEI%2FBR_248_I_SERIE_SUPLEMENTO_2025.pdf";

export default definirCasos(calcularIrps, [
  {
    nombre: "Exactamente 20 250 MT sem dependentes",
    origen: { tipo: "recalculado", url: BR, detalle: "Intervalo «De 20.250,00»: valor 0,00, só o coeficiente sobre a diferença (zero)." },
    fecha: "2026-10-26",
    entrada: { remuneracao: 20250, dependentes: "0" },
    esperado: { irps: 0, coeficiente: 10 },
  },
  {
    nombre: "21 500 MT com 1 dependente",
    origen: { tipo: "recalculado", url: BR, detalle: "Intervalo de 21 250: 50 + 10 % × 250 = 75." },
    fecha: "2026-10-26",
    entrada: { remuneracao: 21500, dependentes: "1" },
    esperado: { irps: 75 },
  },
  {
    nombre: "21 500 MT com 4 dependentes: sem imposto",
    origen: { tipo: "recalculado", url: BR, detalle: "Na coluna de 4 ou mais dependentes o intervalo de 21 250 tem o sinal (-)." },
    fecha: "2026-10-26",
    entrada: { remuneracao: 21500, dependentes: "4" },
    esperado: { irps: 0, coeficiente: null },
  },
  {
    nombre: "100 000 MT com 3 dependentes",
    origen: { tipo: "recalculado", url: BR, detalle: "Intervalo de 60 750: 7 275 + 25 % × 39 250 = 17 087,50." },
    fecha: "2026-10-26",
    entrada: { remuneracao: 100000, dependentes: "3" },
    esperado: { irps: 17087.5, limite: 60750, fixo: 7275 },
  },
]);
