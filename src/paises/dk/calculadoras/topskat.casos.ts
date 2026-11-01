import { definirCasos } from "@/motor/calculo";
import topskat from "./topskat";

const PSL = "https://svmn.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/personskatteloven";

export default definirCasos(topskat, [
  {
    nombre: "65.000 kr. om måneden i København: kun mellemskat",
    origen: {
      tipo: "recalculado",
      url: PSL,
      detalle: "Årsløn 780.000 − ATP 1.188 = 778.812; am 62.304,96; personlig indkomst 716.507,04. Mellemskat 7,5 % af 75.307,04 = 5.648,03. Under topskattegrænsen på 777.900.",
    },
    fecha: "2026-10-24",
    entrada: { loen: 65000, kommune: "koebenhavn", pension: 0 },
    esperado: { personlig: 716507.04, mellemskat: 5648.03, topskat: 0, ekstraSkat: 5648.03, overMellem: 75307.04 },
  },
  {
    nombre: "80.000 kr. om måneden i København: mellemskat og topskat",
    origen: {
      tipo: "recalculado",
      url: PSL,
      detalle: "Personlig indkomst 882.107,04. Mellemskat 7,5 % af 240.907,04 = 18.068,03; topskat 7,5 % af 104.207,04 = 7.815,53; i alt 25.883,56.",
    },
    fecha: "2026-10-24",
    entrada: { loen: 80000, kommune: "koebenhavn", pension: 0 },
    esperado: { mellemskat: 18068.03, topskat: 7815.53, ekstraSkat: 25883.56 },
  },
  {
    nombre: "70.000 kr. i Albertslund: skatteloftet sætter mellemskatten ned",
    origen: {
      tipo: "recalculado",
      url: PSL,
      detalle: "Personlig indkomst 771.707,04. Nedslag 25,60 + 12,01 + 7,5 − 44,57 = 0,54; mellemskat 6,96 % af 130.507,04 = 9.083,29.",
    },
    fecha: "2026-10-24",
    entrada: { loen: 70000, kommune: "albertslund", pension: 0 },
    esperado: { mellemskat: 9083.29, topskat: 0 },
  },
  {
    nombre: "Månedsløn ved grænserne uden pension",
    origen: {
      tipo: "recalculado",
      url: PSL,
      detalle: "(641.200 / 0,92 + 1.188) / 12 = 58.178,71; (777.900 / 0,92 + 1.188) / 12 = 70.560,96; (2.592.700 / 0,92 + 1.188) / 12 = 234.945,01.",
    },
    fecha: "2026-10-24",
    entrada: { loen: 50000, kommune: "aarhus", pension: 0 },
    esperado: { loenMellem: 58178.71, loenTop: 70560.96, loenToptop: 234945.01, ekstraSkat: 0 },
  },
]);
