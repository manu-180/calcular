import { definirCasos } from "@/motor/calculo";
import avisoPrevio from "./aviso-previo";

const LGT = "https://faolex.fao.org/docs/pdf/ang223057.pdf";

export default definirCasos(avisoPrevio, [
  {
    nombre: "Demissão com o aviso todo",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 305.º, n.º 1: 30 dias. 24/10/2026 + 30 dias = 23/11/2026." },
    fecha: "2026-10-24",
    entrada: { quem: "trabalhador", aviso: "2026-10-24", saida: null, salario: 350000 },
    esperado: { prazo: 30, cessacao: "2026-11-23", falta: 0, compensacao: 0 },
  },
  {
    nombre: "Saída 20 dias depois do aviso",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 305.º, n.º 2: faltam 10 dias. Os 30 dias valem um mês: 300 000 × 10 / 30 = 100 000." },
    fecha: "2026-10-24",
    entrada: { quem: "trabalhador", aviso: "2026-10-01", saida: "2026-10-21", salario: 300000 },
    esperado: { falta: 10, compensacao: 100000 },
  },
  {
    nombre: "Despedimento por causas objectivas",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 286.º, n.º 1: 30 dias. 24/10/2026 + 30 = 23/11/2026." },
    fecha: "2026-10-24",
    entrada: { quem: "empregador", aviso: "2026-10-24", saida: null, salario: null },
    esperado: { cessacao: "2026-11-23", falta: null },
  },
  {
    nombre: "Último dia antes do aviso",
    origen: { tipo: "recalculado", url: LGT, detalle: "Datas trocadas dão erro." },
    fecha: "2026-10-24",
    entrada: { quem: "trabalhador", aviso: "2026-10-10", saida: "2026-10-01", salario: 300000 },
    esperaError: true,
  },
]);
