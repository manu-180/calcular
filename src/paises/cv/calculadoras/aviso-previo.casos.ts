import { definirCasos } from "@/motor/calculo";
import avisoPrevio from "./aviso-previo";

const CL = "https://boe.incv.cv/Bulletins/Download/348";
const CL16 = "https://boe.incv.cv/Bulletins/Download/2139";

export default definirCasos(avisoPrevio, [
  {
    nombre: "Rescisão com três anos de serviço",
    origen: { tipo: "recalculado", url: CL, detalle: "Artigo 243.º, n.º 1: 15 dias por ano, 3 × 15 = 45 dias, abaixo dos dois meses. De 1 de março de 2026 a 15 de abril de 2026." },
    fecha: "2026-10-29",
    entrada: { situacao: "rescisao", anos: 3, data: "2026-03-01" },
    esperado: { dias: 45, cessacao: "2026-04-15" },
  },
  {
    nombre: "Rescisão com seis anos: limite de dois meses",
    origen: { tipo: "recalculado", url: CL, detalle: "6 × 15 = 90 dias, acima de dois meses. O aviso fica nos dois meses: 1 de março a 1 de maio, 61 dias." },
    fecha: "2026-10-29",
    entrada: { situacao: "rescisao", anos: 6, data: "2026-03-01" },
    esperado: { dias: 61, cessacao: "2026-05-01" },
  },
  {
    nombre: "Despedimento por justa causa objetiva",
    origen: { tipo: "recalculado", url: CL16, detalle: "Artigo 237.º, n.º 1: 35 dias de antecedência. 1 de março mais 35 dias é 5 de abril." },
    fecha: "2026-10-29",
    entrada: { situacao: "objetiva", anos: null, data: "2026-03-01" },
    esperado: { dias: 35, cessacao: "2026-04-05" },
  },
  {
    nombre: "Despedimento coletivo",
    origen: { tipo: "recalculado", url: CL16, detalle: "Artigo 222.º, n.º 2: 15 dias. 1 de março mais 15 dias é 16 de março." },
    fecha: "2026-10-29",
    entrada: { situacao: "coletiva", anos: null, data: "2026-03-01" },
    esperado: { dias: 15, cessacao: "2026-03-16" },
  },
]);
