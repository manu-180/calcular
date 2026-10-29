import { definirCasos } from "@/motor/calculo";
import diasDeFerias from "./dias-de-ferias";

const CL = "https://boe.incv.cv/Bulletins/Download/348";

export default definirCasos(diasDeFerias, [
  {
    nombre: "Contrato sem prazo, anos anteriores",
    origen: { tipo: "recalculado", url: CL, detalle: "Artigo 52.º, n.º 1: 22 dias úteis por cada ano de serviço." },
    fecha: "2026-10-29",
    entrada: { contrato: "indeterminado", admissao: "anterior", meses: null },
    esperado: { dias: 22, acumulacao: 44, prazo: 1 },
  },
  {
    nombre: "Admitido no primeiro semestre",
    origen: { tipo: "recalculado", url: CL, detalle: "Artigo 53.º, n.º 5: 7 dias úteis no ano da admissão." },
    fecha: "2026-10-29",
    entrada: { contrato: "indeterminado", admissao: "primeiro-semestre", meses: null },
    esperado: { dias: 7 },
  },
  {
    nombre: "Admitido no segundo semestre",
    origen: { tipo: "recalculado", url: CL, detalle: "Artigo 53.º, n.º 2: o primeiro período vence-se ao fim de seis meses; neste ano, 0." },
    fecha: "2026-10-29",
    entrada: { contrato: "indeterminado", admissao: "segundo-semestre", meses: null },
    esperado: { dias: 0 },
  },
  {
    nombre: "Contrato a prazo de seis meses",
    origen: { tipo: "recalculado", url: CL, detalle: "Artigo 52.º, n.º 3: proporcional à duração. 22 × 6 / 12 = 11." },
    fecha: "2026-10-29",
    entrada: { contrato: "prazo-curto", admissao: null, meses: 6 },
    esperado: { dias: 11 },
  },
  {
    nombre: "Contrato a prazo de dois anos",
    origen: { tipo: "recalculado", url: CL, detalle: "Artigo 52.º, n.º 2: contrato a prazo de um ano ou mais tem 22 dias." },
    fecha: "2026-10-29",
    entrada: { contrato: "prazo-longo", admissao: null, meses: null },
    esperado: { dias: 22 },
  },
]);
