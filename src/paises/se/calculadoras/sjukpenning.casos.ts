import { definirCasos } from "@/motor/calculo";
import sjukpenning from "./sjukpenning";

const SFB = "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/socialforsakringsbalk-2010110_sfs-2010-110/";

export default definirCasos(sjukpenning, [
  {
    nombre: "32 000 kr i månaden, normalnivå",
    origen: { tipo: "recalculado", url: SFB, detalle: "SGI 384 000. 384 000 × 0,97 × 80 % = 297 984. Delat med 365 = 816,39, avrundat 816 kr." },
    fecha: "2026-10-24",
    entrada: { manadslon: 32000, niva: "normal" },
    esperado: { sgi: 384000, perDag: 816, per30: 24480, arsbelopp: 297984 },
  },
  {
    nombre: "Samma lön, fortsättningsnivå",
    origen: { tipo: "recalculado", url: SFB, detalle: "384 000 × 0,97 × 75 % = 279 360. Delat med 365 = 765,37, avrundat 765 kr." },
    fecha: "2026-10-24",
    entrada: { manadslon: 32000, niva: "fortsattning" },
    esperado: { perDag: 765 },
  },
  {
    nombre: "Lön över taket",
    origen: { tipo: "recalculado", url: SFB, detalle: "Taket 10 prisbasbelopp = 592 000. 592 000 × 0,97 × 80 % / 365 = 1 258,61, avrundat 1 259 kr." },
    fecha: "2026-10-24",
    entrada: { manadslon: 60000, niva: "normal" },
    esperado: { sgi: 592000, perDag: 1259 },
  },
  {
    nombre: "Ingen lön",
    origen: { tipo: "recalculado", url: SFB, detalle: "Utan inkomst finns ingen SGI." },
    fecha: "2026-10-24",
    entrada: { manadslon: 0, niva: "normal" },
    esperaError: true,
  },
]);
