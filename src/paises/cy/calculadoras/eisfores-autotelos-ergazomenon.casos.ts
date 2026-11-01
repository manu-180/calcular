import { definirCasos } from "@/motor/calculo";
import { URL_AE } from "../lib/fuentes-url";
import eisforesAutotelosErgazomenon from "./eisfores-autotelos-ergazomenon";

export default definirCasos(eisforesAutotelosErgazomenon, [
  {
    nombre: "Κατηγορία 16 με 30.000 €: πάνω από το κατώτατο",
    origen: { tipo: "recalculado", url: URL_AE, detalle: "Κατώτατο 220,76 × 2,2 = 485,67 την εβδομάδα. Πραγματικό 30000 / 52 = 576,92. ΚΑ 30000 × 16,6% = 4980. ΓεΣΥ 30000 × 4% = 1200." },
    fecha: "2026-10-26",
    entrada: { katigoria: "16", eisodima: 30000, pragmatiko: false },
    esperado: { katotatoEvdomada: 485.67, ka: 4980, gesy: 1200, synolo: 6180 },
  },
  {
    nombre: "Κατηγορία 16 με 10.000 €: πληρώνει στο κατώτατο",
    origen: { tipo: "recalculado", url: URL_AE, detalle: "485,672 × 52 = 25254,94. ΚΑ × 16,6% = 4192,32. ΓεΣΥ στο πραγματικό: 400." },
    fecha: "2026-10-26",
    entrada: { katigoria: "16", eisodima: 10000, pragmatiko: false },
    esperado: { asfalistees: 25254.94, ka: 4192.32, gesy: 400 },
  },
  {
    nombre: "Με έγκριση για πραγματικό εισόδημα 10.000 €",
    origen: { tipo: "recalculado", url: URL_AE, detalle: "10000 × 16,6% = 1660." },
    fecha: "2026-10-26",
    entrada: { katigoria: "16", eisodima: 10000, pragmatiko: true },
    esperado: { ka: 1660 },
  },
  {
    nombre: "Πάνω από το ανώτατο όριο: 1.325 € την εβδομάδα",
    origen: { tipo: "recalculado", url: URL_AE, detalle: "1325 × 52 = 68900. ΚΑ 68900 × 16,6% = 11437,40. ΓεΣΥ 100000 × 4% = 4000." },
    fecha: "2026-10-26",
    entrada: { katigoria: "2b", eisodima: 100000, pragmatiko: false },
    esperado: { asfalistees: 68900, ka: 11437.4, gesy: 4000 },
  },
]);
