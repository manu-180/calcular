import { definirCasos } from "@/motor/calculo";
import diasDeFerias from "./dias-de-ferias";

const LGT = "https://faolex.fao.org/docs/pdf/ang223057.pdf";

export default definirCasos(diasDeFerias, [
  {
    nombre: "Ano completo",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 204.º, n.º 1: 22 dias úteis." },
    fecha: "2026-10-24",
    entrada: { situacao: "ano", meses: null },
    esperado: { dias: 22 },
  },
  {
    nombre: "Admissão com 7 meses",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 204.º, n.º 2: 7 × 2 = 14 dias úteis." },
    fecha: "2026-10-24",
    entrada: { situacao: "admissao", meses: 7 },
    esperado: { dias: 14 },
  },
  {
    nombre: "Admissão com 2 meses: mínimo de 6",
    origen: { tipo: "recalculado", url: LGT, detalle: "2 × 2 = 4, abaixo do mínimo de 6 dias úteis." },
    fecha: "2026-10-24",
    entrada: { situacao: "admissao", meses: 2 },
    esperado: { dias: 6 },
  },
  {
    nombre: "Contrato a termo de 12 meses: limite de 22",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 205.º, n.º 1: 12 × 2 = 24, limitado a 22." },
    fecha: "2026-10-24",
    entrada: { situacao: "termo", meses: 12 },
    esperado: { dias: 22 },
  },
]);
