import { definirCasos } from "@/motor/calculo";
import licencaDeMaternidade from "./licenca-de-maternidade";

const LT = "https://www.inss.gov.mz/wp-content/uploads/2025/09/NOVA-LEI-DO-TRABALHO-DE-25-DE-AGOSTO-DE-2023.pdf";

export default definirCasos(licencaDeMaternidade, [
  {
    nombre: "Começa 20 dias antes do parto",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 14: 90 dias seguidos, até 20 dias antes do parto. Parto previsto a 1/12/2026: de 11/11/2026 a 8/2/2027." },
    fecha: "2026-10-26",
    entrada: { licenca: "maternidade", data: "2026-12-01", antes: 20 },
    esperado: { inicio: "2026-11-11", fim: "2027-02-08", dias: 90 },
  },
  {
    nombre: "Paternidade",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 15: 7 dias a partir do dia seguinte ao nascimento (10/11/2026): de 11/11 a 17/11/2026." },
    fecha: "2026-10-26",
    entrada: { licenca: "paternidade", data: "2026-11-10", antes: null },
    esperado: { inicio: "2026-11-11", fim: "2026-11-17", dias: 7 },
  },
  {
    nombre: "Mais de 20 dias antes não é possível",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 14, n.º 1." },
    fecha: "2026-10-26",
    entrada: { licenca: "maternidade", data: "2026-12-01", antes: 30 },
    esperaError: true,
  },
]);
