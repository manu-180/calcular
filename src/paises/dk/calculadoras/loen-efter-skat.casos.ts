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
        "Årsløn 480.000 − ATP 1.188 = 478.812; am-bidrag 8 % = 38.304,96; personlig indkomst 440.507,04. Beskæftigelsesfradrag 12,75 % = 61.048,53, jobfradrag 3.100. Skattepligtig 376.358,51 − personfradrag 54.100 = 322.258,51: kommuneskat 23,39 % = 75.376,27, kirkeskat 0,80 % = 2.578,07. Bundskat 12,01 % af 386.407,04 = 46.407,49. Netto 316.145,21, pr. måned 26.345,43.",
    },
    fecha: "2026-10-24",
    entrada: { loen: 40000, kommune: "koebenhavn", kirkeskat: true, pension: 0, atp: true },
    esperado: { am: 38304.96, kommuneskat: 75376.27, kirkeskat: 2578.07, bundskat: 46407.49, mellemskat: 0, nettoAar: 316145.21, nettoMaaned: 26345.43 },
  },
  {
    nombre: "Samme løn uden kirkeskat",
    origen: { tipo: "recalculado", url: PSL, detalle: "Som ovenfor uden kirkeskat: skat 121.783,76, netto 318.723,28, pr. måned 26.560,27." },
    fecha: "2026-10-24",
    entrada: { loen: 40000, kommune: "koebenhavn", kirkeskat: false, pension: 0, atp: true },
    esperado: { kirkeskat: 0, skatAar: 121783.76, nettoMaaned: 26560.27 },
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
      detalle: "Grundlag 298.812; jobfradrag 4,5 % af 63.612 = 2.862,54; beskæftigelsesfradrag 38.098,53. Kommuneskat 47.299,49, kirkeskat 2.212,11, bundskat 26.518,93. Netto 198.876,51, pr. måned 16.573,04.",
    },
    fecha: "2026-10-24",
    entrada: { loen: 25000, kommune: "lolland", kirkeskat: true, pension: 0, atp: true },
    esperado: { job: 2862.54, besk: 38098.53, nettoMaaned: 16573.04 },
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
