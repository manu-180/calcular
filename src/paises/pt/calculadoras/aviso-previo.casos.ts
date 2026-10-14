import { definirCasos } from "@/motor/calculo";
import avisoPrevio from "./aviso-previo";

const CT = "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475";

export default definirCasos(avisoPrevio, [
  {
    nombre: "Sem termo, 1 ano de casa",
    origen: { tipo: "recalculado", url: CT, detalle: "Artigo 400.º, n.º 1: até dois anos, 30 dias. 01/10/2026 + 30 = 31/10/2026." },
    fecha: "2026-10-14",
    entrada: { contrato: "sem-termo", meses: 12, comunicacao: "2026-10-01" },
    esperado: { dias: 30, ultimoDia: "31/10/2026" },
  },
  {
    nombre: "Sem termo, exatamente 2 anos",
    origen: { tipo: "recalculado", url: CT, detalle: "Até dois anos inclusive: 30 dias." },
    fecha: "2026-10-14",
    entrada: { contrato: "sem-termo", meses: 24, comunicacao: "2026-10-01" },
    esperado: { dias: 30 },
  },
  {
    nombre: "Sem termo, 5 anos",
    origen: { tipo: "recalculado", url: CT, detalle: "Mais de dois anos: 60 dias. 14/10/2026 + 60 = 13/12/2026." },
    fecha: "2026-10-14",
    entrada: { contrato: "sem-termo", meses: 60, comunicacao: "2026-10-14" },
    esperado: { dias: 60, ultimoDia: "13/12/2026" },
  },
  {
    nombre: "Contrato a termo de 4 meses",
    origen: { tipo: "recalculado", url: CT, detalle: "Artigo 400.º, n.º 3: menos de seis meses, 15 dias." },
    fecha: "2026-10-14",
    entrada: { contrato: "termo", meses: 4, comunicacao: "2026-10-14" },
    esperado: { dias: 15 },
  },
  {
    nombre: "Contrato a termo de 12 meses",
    origen: { tipo: "recalculado", url: CT, detalle: "Seis meses ou mais: 30 dias." },
    fecha: "2026-10-14",
    entrada: { contrato: "termo", meses: 12, comunicacao: "2026-10-14" },
    esperado: { dias: 30 },
  },
]);
