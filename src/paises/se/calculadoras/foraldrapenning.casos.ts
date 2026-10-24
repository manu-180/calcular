import { definirCasos } from "@/motor/calculo";
import foraldrapenning from "./foraldrapenning";

const SFB = "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/socialforsakringsbalk-2010110_sfs-2010-110/";

export default definirCasos(foraldrapenning, [
  {
    nombre: "35 000 kr i månaden",
    origen: {
      tipo: "recalculado",
      url: SFB,
      detalle: "SGI 420 000. 420 000 × 0,97 × 80 % / 365 = 892,93, avrundat 893 kr per dag. Fem dagar i veckan: 893 × 5 × 52 / 12 = 19 348,33 kr i månaden.",
    },
    fecha: "2026-10-24",
    entrada: { manadslon: 35000, dagarPerVecka: 5 },
    esperado: { sgi: 420000, perDag: 893, perVecka: 4465, perManad: 19348.33 },
  },
  {
    nombre: "Lön över taket",
    origen: {
      tipo: "recalculado",
      url: SFB,
      detalle: "Tak 10 prisbasbelopp = 592 000. 592 000 × 0,97 × 80 % / 365 = 1 258,61, avrundat 1 259 kr per dag.",
    },
    fecha: "2026-10-24",
    entrada: { manadslon: 70000, dagarPerVecka: 7 },
    esperado: { sgi: 592000, perDag: 1259, maxDag: 1259, takManad: 49333.33 },
  },
  {
    nombre: "Låg inkomst ger grundnivå",
    origen: { tipo: "recalculado", url: SFB, detalle: "SGI 96 000 ger 204 kr per dag, under grundnivån 250 kr. Då lämnas grundnivån (12 kap. 22 §)." },
    fecha: "2026-10-24",
    entrada: { manadslon: 8000, dagarPerVecka: 5 },
    esperado: { perDag: 250 },
  },
]);
