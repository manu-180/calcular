import { definirCasos } from "@/motor/calculo";
import atualizarValorInflacao from "./atualizar-valor-inflacao";

const BPSTAT = "https://bpstat.bportugal.pt/data/v1/domains/12/datasets/fd8f42946d3f4c45c144e9d62065dc72/?lang=PT&series_ids=12559545&obs_since=2025-01-01";

export default definirCasos(atualizarValorInflacao, [
  {
    nombre: "1 000 € de janeiro de 2020 a agosto de 2026",
    origen: { tipo: "recalculado", url: BPSTAT, detalle: "IPC: janeiro de 2020 = 83,3; agosto de 2026 = 103,3. 103,3 / 83,3 = 1,2401; 1000 × 1,2401 = 1240,10. Homóloga 103,3 / 100,0 = 3,3 %." },
    fecha: "2026-10-14",
    entrada: { valor: 1000, desde: "2020-01-15", hasta: "2026-08-31" },
    esperado: { atualizado: 1240.1, homologa: 3.3, indiceInicial: 83.3, indiceFinal: 103.3 },
    tolerancia: 0.01,
  },
  {
    nombre: "Mês final ainda sem índice: usa o último publicado",
    origen: { tipo: "recalculado", url: BPSTAT, detalle: "Em 14/10/2026 o último IPC publicado é o de setembro de 2026 (104,6). 104,6 / 83,3 × 1000 = 1255,70." },
    fecha: "2026-10-14",
    entrada: { valor: 1000, desde: "2020-01-01", hasta: "2026-10-14" },
    esperado: { atualizado: 1255.7, mesFinal: "setembro de 2026" },
    tolerancia: 0.01,
  },
  {
    nombre: "500 € de janeiro de 2015 a agosto de 2025",
    origen: { tipo: "recalculado", url: BPSTAT, detalle: "100,0 / 79,7 = 1,2547; 500 × 1,2547 = 627,35." },
    fecha: "2026-10-14",
    entrada: { valor: 500, desde: "2015-01-01", hasta: "2025-08-01" },
    esperado: { atualizado: 627.35 },
    tolerancia: 0.01,
  },
  {
    nombre: "Data inicial depois da final",
    origen: { tipo: "recalculado", detalle: "Datas trocadas." },
    fecha: "2026-10-14",
    entrada: { valor: 500, desde: "2025-08-01", hasta: "2015-01-01" },
    esperaError: true,
  },
]);
