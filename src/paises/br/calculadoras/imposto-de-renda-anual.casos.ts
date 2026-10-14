import { definirCasos } from "@/motor/calculo";
import impostoDeRendaAnual from "./imposto-de-renda-anual";

const ZERO = { dependentes: 0, saude: 0, instrucao: 0, pensao: 0, pgbl: 0 };

export default definirCasos(impostoDeRendaAnual, [
  {
    nombre: "R$ 60.000 no ano: imposto zerado pela redução",
    origen: {
      tipo: "recalculado",
      detalle: "Simplificado 20 % = 12000. Base 48000 × 22,5 % − 8105,85 = 2694,15, o valor máximo da redução anual (até 60000). Imposto zero; restitui os 500 retidos.",
    },
    fecha: "2026-12-31",
    entrada: { rendimentos: 60000, inss: 6018.12, retido: 500, ...ZERO },
    esperado: { simplificado: 12000, devidoSimplificada: 0, devido: 0, pagar: 0, restituir: 500 },
  },
  {
    nombre: "R$ 72.000 com um dependente e redução parcial",
    origen: {
      tipo: "recalculado",
      detalle: "Simplificado 14400 > legais 7698,12 + 2275,08. Base 57600 × 27,5 % − 10904,66 = 4935,34. Redução 8429,73 − 0,095575 × 72000 = 1548,33. Devido 3387,01.",
    },
    fecha: "2026-12-31",
    entrada: { rendimentos: 72000, inss: 7698.12, retido: 0, ...ZERO, dependentes: 1 },
    esperado: { legais: 9973.2, simplificado: 14400, devidoSimplificada: 3387.01, modelo: "Simplificada", pagar: 3387.01 },
  },
  {
    nombre: "R$ 100.000 sem redução: simplificado no teto",
    origen: { tipo: "recalculado", detalle: "20 % = 20000, limitado a 17640. Base 82360 × 27,5 % − 10904,66 = 11744,34. Acima de 88200, sem redução." },
    fecha: "2026-12-31",
    entrada: { rendimentos: 100000, inss: 11857.08, retido: 12000, ...ZERO },
    esperado: { simplificado: 17640, devidoSimplificada: 11744.34, devido: 11744.34, restituir: 255.66 },
  },
  {
    nombre: "Completa vale mais com saúde e instrução",
    origen: {
      tipo: "recalculado",
      detalle: "Legais 11857,08 + 2 × 2275,08 + 15000 + min(10000; 3 × 3561,50 = 10684,50) = 41407,24. Base 58592,76 × 27,5 % − 10904,66 = 5208,35, sem redução. Simplificada: 11744,34.",
    },
    fecha: "2026-12-31",
    entrada: { rendimentos: 100000, inss: 11857.08, retido: 0, dependentes: 2, saude: 15000, instrucao: 10000, pensao: 0, pgbl: 0 },
    esperado: { legais: 41407.24, devidoCompleta: 5208.35, modelo: "Completa", pagar: 5208.35 },
  },
]);
