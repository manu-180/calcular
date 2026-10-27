import { definirCasos } from "@/motor/calculo";
import { URL_NOMOS_FOROU } from "../lib/fuentes-url";
import ypologismosMiktouApoKatharo from "./ypologismos-miktou-apo-katharo";

export default definirCasos(ypologismosMiktouApoKatharo, [
  {
    nombre: "1.771 € καθαρά: αντίστροφο του παραδείγματος των 2.000 € μεικτά",
    origen: { tipo: "recalculado", url: URL_NOMOS_FOROU, detalle: "2000 − 176 − 53 = 1771, χωρίς φόρο. Με 1999,99 τα καθαρά βγαίνουν 1770,99." },
    fecha: "2026-10-26",
    entrada: { kathara: 1771, misthoi: "12", tekna: 0, monogoneas: false },
    esperado: { miktos: 2000, katharaMina: 1771 },
  },
  {
    nombre: "2.000 € καθαρά",
    origen: {
      tipo: "recalculado",
      url: URL_NOMOS_FOROU,
      detalle: "Μεικτός 2305,67: ΚΑ 202,90, ΓεΣΥ 61,10. Έτος 27668,04 − 3168 = 24500,04. Φόρος 2500,04 × 20% = 500,01, / 12 = 41,67. Καθαρά 2000.",
    },
    fecha: "2026-10-26",
    entrada: { kathara: 2000, misthoi: "12", tekna: 0, monogoneas: false },
    esperado: { miktos: 2305.67, forosMina: 41.67, katharaMina: 2000 },
  },
  {
    nombre: "Καθαρά μηδέν",
    origen: { tipo: "recalculado", url: URL_NOMOS_FOROU, detalle: "Χωρίς ποσό δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-26",
    entrada: { kathara: 0, misthoi: "12", tekna: 0, monogoneas: false },
    esperaError: true,
  },
]);
