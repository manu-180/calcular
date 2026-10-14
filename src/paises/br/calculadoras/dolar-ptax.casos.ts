import { definirCasos } from "@/motor/calculo";
import dolarPtax from "./dolar-ptax";

const SGS = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados?formato=json";

export default definirCasos(dolarPtax, [
  {
    nombre: "Cem dólares com a PTAX de 13 de outubro",
    origen: { tipo: "oficial", url: SGS, detalle: "PTAX de venda de 13/10/2026: 5,0096. 100 × 5,0096 = 500,96." },
    fecha: "2026-10-13",
    entrada: { sentido: "dolares-para-reais", quantia: 100 },
    esperado: { ptax: 5.0096, data: "2026-10-13", reais: 500.96, dolares: null },
  },
  {
    nombre: "Feriado de 12 de outubro usa a cotação anterior",
    origen: { tipo: "recalculado", url: SGS, detalle: "Sem PTAX em 10, 11 e 12/10/2026: vale a de 09/10/2026, 4,9892. 4989,20 / 4,9892 = 1000." },
    fecha: "2026-10-12",
    entrada: { sentido: "reais-para-dolares", quantia: 4989.2 },
    esperado: { ptax: 4.9892, dolares: 1000 },
  },
]);
