import { definirCasos } from "@/motor/calculo";
import atualizarValorInflacao from "./atualizar-valor-inflacao";

const INE = "https://www.ine.gov.ao/publicacoes/detalhes/NTg0OTk%3D";

export default definirCasos(atualizarValorInflacao, [
  {
    nombre: "De dezembro de 2020 a setembro de 2026",
    origen: { tipo: "oficial", url: INE, detalle: "IPCN de dezembro de 2020 = 100 (base) e de setembro de 2026 = 270,1712. 100 000 × 2,701712 = 270 171,20. Homóloga de setembro de 2026: 8,43 % no comunicado do INE." },
    fecha: "2026-10-24",
    entrada: { valor: 100000, desde: "2020-12-01", hasta: "2026-09-30" },
    esperado: { atualizado: 270171.2, indiceInicial: 100, indiceFinal: 270.1712 },
    tolerancia: 0.01,
  },
  {
    nombre: "Mês final ainda sem índice",
    origen: { tipo: "recalculado", url: INE, detalle: "Outubro de 2026 ainda não foi publicado: o cálculo pára em setembro. 50 000 × 270,1712 / 257,7635 = 52 406,80." },
    fecha: "2026-10-24",
    entrada: { valor: 50000, desde: "2026-01-01", hasta: "2026-10-24" },
    esperado: { atualizado: 52406.8, mesFinal: "setembro de 2026" },
  },
  {
    nombre: "Antes do início da série",
    origen: { tipo: "recalculado", url: INE, detalle: "A série carregada começa em janeiro de 2015." },
    fecha: "2026-10-24",
    entrada: { valor: 50000, desde: "2014-12-01", hasta: "2026-01-01" },
    esperaError: true,
  },
]);
