import { definirCasos } from "@/motor/calculo";
import saqueAniversarioFgts from "./saque-aniversario-fgts";

const ANEXO = "https://www.planalto.gov.br/ccivil_03/leis/l8036consol.htm";

export default definirCasos(saqueAniversarioFgts, [
  {
    nombre: "Saldo de R$ 3.000",
    origen: { tipo: "recalculado", url: ANEXO, detalle: "Anexo da Lei nº 8.036/1990: de 1.000,01 a 5.000, 30 % mais 150. 900 + 150 = 1050." },
    fecha: "2026-10-14",
    entrada: { saldo: 3000 },
    esperado: { aliquota: 30, parteAliquota: 900, adicional: 150, saque: 1050, restante: 1950 },
  },
  {
    nombre: "Saldo de R$ 400",
    origen: { tipo: "recalculado", url: ANEXO, detalle: "Até 500: 50 % sem parcela adicional. 200." },
    fecha: "2026-10-14",
    entrada: { saldo: 400 },
    esperado: { saque: 200 },
  },
  {
    nombre: "Saldo de R$ 12.000",
    origen: { tipo: "recalculado", url: ANEXO, detalle: "De 10.000,01 a 15.000: 15 % mais 1.150. 1800 + 1150 = 2950." },
    fecha: "2026-10-14",
    entrada: { saldo: 12000 },
    esperado: { saque: 2950 },
  },
  {
    nombre: "Saldo acima de R$ 20.000",
    origen: { tipo: "recalculado", url: ANEXO, detalle: "Acima de 20.000: 5 % mais 2.900. 25000 × 5 % = 1250 + 2900 = 4150." },
    fecha: "2026-10-14",
    entrada: { saldo: 25000 },
    esperado: { aliquota: 5, saque: 4150 },
  },
]);
