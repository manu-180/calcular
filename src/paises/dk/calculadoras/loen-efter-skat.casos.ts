import { definirCasos } from "@/motor/calculo";
import loenEfterSkat from "./loen-efter-skat";

const PSL = "https://svmn.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/personskatteloven";

export default definirCasos(loenEfterSkat, [
  {
    nombre: "40.000 kr. om måneden i København med kirkeskat",
    origen: {
      tipo: "recalculado",
      url: PSL,
      detalle:
        "Årsløn 480.000 − ATP 1.188 = 478.812; am-bidrag 8 % = 38.304,96; personlig indkomst 440.507,04. Beskæftigelsesfradrag 12,75 % af 480.000 = 61.200, jobfradrag 3.100. Skattepligtig 376.207,04 − personfradrag 54.100 = 322.107,04: kommuneskat 23,39 % = 75.340,84, kirkeskat 0,80 % = 2.576,86. Bundskat 12,01 % af 386.407,04 = 46.407,49. Netto 316.181,85, pr. måned 26.348,49.",
    },
    fecha: "2026-10-24",
    entrada: { loen: 40000, kommune: "koebenhavn", kirkeskat: true, pension: 0, atp: true },
    esperado: { am: 38304.96, besk: 61200, kommuneskat: 75340.84, kirkeskat: 2576.86, bundskat: 46407.49, mellemskat: 0, nettoAar: 316181.85, nettoMaaned: 26348.49 },
  },
  {
    nombre: "Samme løn uden kirkeskat",
    origen: { tipo: "recalculado", url: PSL, detalle: "Som ovenfor uden kirkeskat: skat 121.748,33, netto 318.758,71, pr. måned 26.563,23." },
    fecha: "2026-10-24",
    entrada: { loen: 40000, kommune: "koebenhavn", kirkeskat: false, pension: 0, atp: true },
    esperado: { kirkeskat: 0, skatAar: 121748.33, nettoMaaned: 26563.23 },
  },
  {
    nombre: "75.000 kr. i Albertslund med 5 % egen pension: mellemskat med skatteloft",
    origen: {
      tipo: "recalculado",
      url: PSL,
      detalle:
        "Årsløn 900.000 − pension 45.000 − ATP 1.188 = 853.812; am 68.304,96; personlig indkomst 785.507,04. Skatteloft: 25,60 + 12,01 + 7,5 − 44,57 = 0,54, så mellemskat 6,96 % af 144.307,04 = 10.043,77. Topskat 7,5 % af 7.607,04 = 570,53. Kommuneskat 170.241,80, kirkeskat 5.320,06, bundskat 87.841,99. Netto 511.488,89, pr. måned 42.624,07.",
    },
    fecha: "2026-10-24",
    entrada: { loen: 75000, kommune: "albertslund", kirkeskat: true, pension: 5, atp: true },
    esperado: { mellemskat: 10043.77, topskat: 570.53, kommuneskat: 170241.8, bundskat: 87841.99, nettoAar: 511488.89, nettoMaaned: 42624.07 },
  },
  {
    nombre: "25.000 kr. i Lolland: jobfradraget under maksimum",
    origen: {
      tipo: "recalculado",
      url: PSL,
      detalle: "Løn 300.000; jobfradrag 4,5 % af 64.800 = 2.916; beskæftigelsesfradrag 38.250. Kommuneskat 47.245,59, kirkeskat 2.209,58, bundskat 26.518,93. Netto 198.932,94, pr. måned 16.577,75.",
    },
    fecha: "2026-10-24",
    entrada: { loen: 25000, kommune: "lolland", kirkeskat: true, pension: 0, atp: true },
    esperado: { job: 2916, besk: 38250, nettoMaaned: 16577.75 },
  },
  {
    nombre: "250.000 kr. om måneden i Gentofte: toptopskat",
    origen: {
      tipo: "recalculado",
      url: PSL,
      detalle: "Personlig indkomst 2.758.907,04. Mellemskat 7,5 % af 2.117.707,04 = 158.828,03; topskat 7,5 % af 1.981.007,04 = 148.575,53; toptopskat 5 % af 166.207,04 = 8.310,35. Netto 1.471.408,39.",
    },
    fecha: "2026-10-24",
    entrada: { loen: 250000, kommune: "gentofte", kirkeskat: true, pension: 0, atp: true },
    esperado: { mellemskat: 158828.03, topskat: 148575.53, toptopskat: 8310.35, nettoAar: 1471408.39 },
  },
  {
    nombre: "Løn 0",
    origen: { tipo: "recalculado", url: PSL, detalle: "Uden løn er der intet at beregne." },
    fecha: "2026-10-24",
    entrada: { loen: 0, kommune: "koebenhavn", kirkeskat: true, pension: 0, atp: true },
    esperaError: true,
  },
]);
