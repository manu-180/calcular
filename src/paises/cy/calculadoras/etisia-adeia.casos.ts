import { definirCasos } from "@/motor/calculo";
import { URL_ADEIES } from "../lib/fuentes-url";
import etisiaAdeia from "./etisia-adeia";

export default definirCasos(etisiaAdeia, [
  {
    nombre: "Πενθήμερη εβδομάδα, όλο το έτος: 20 ημέρες",
    origen: { tipo: "oficial", url: URL_ADEIES, detalle: "Άρθρο 5(1): είκοσι εργάσιμες ημέρες για πενθήμερη εβδομάδα, με εργασία 48 εβδομάδων." },
    fecha: "2026-10-26",
    entrada: { evdomada: "5", evdomades: 52, misthos: null },
    esperado: { imeres: 20, evdomadesAdeias: 4 },
  },
  {
    nombre: "Εξαήμερη εβδομάδα: 24 ημέρες",
    origen: { tipo: "oficial", url: URL_ADEIES, detalle: "Άρθρο 5(1): είκοσι τέσσερις εργάσιμες ημέρες για εξαήμερη εβδομάδα." },
    fecha: "2026-10-26",
    entrada: { evdomada: "6", evdomades: 48, misthos: null },
    esperado: { imeres: 24 },
  },
  {
    nombre: "24 εβδομάδες εργασίας: η μισή άδεια",
    origen: { tipo: "recalculado", url: URL_ADEIES, detalle: "Άδεια ανάλογη: 20 × 24 / 48 = 10 ημέρες. Με μισθό 2000: 2000 × 12 / 260 × 10 = 923,08." },
    fecha: "2026-10-26",
    entrada: { evdomada: "5", evdomades: 24, misthos: 2000 },
    esperado: { imeres: 10, axia: 923.08 },
  },
]);
