import { definirCasos } from "@/motor/calculo";
import calc from "./atlaisanas-pabalsts";

const LM = "https://www.lm.gov.lv/lv/biezak-uzdotie-jautajumi-par-darba-uzteiksanu";

export default definirCasos(calc, [
  {
    nombre: "Mazāk nekā 5 gadi",
    origen: { tipo: "oficial", url: LM, detalle: "Labklājības ministrija: viena mēneša vidējā izpeļņa." },
    fecha: "2026-11-01",
    entrada: { izpelna: 1500, stazs: "lidz-5" },
    esperado: { pabalsts: 1500, menesi: 1 },
  },
  {
    nombre: "Vairāk nekā 20 gadi",
    origen: { tipo: "oficial", url: LM, detalle: "Labklājības ministrija: četru mēnešu vidējā izpeļņa." },
    fecha: "2026-11-01",
    entrada: { izpelna: 1500, stazs: "virs-20" },
    esperado: { pabalsts: 6000, menesi: 4 },
  },
]);
