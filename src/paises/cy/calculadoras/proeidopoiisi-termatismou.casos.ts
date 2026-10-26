import { definirCasos } from "@/motor/calculo";
import { URL_TERMATISMOS } from "../lib/fuentes-url";
import proeidopoiisiTermatismou from "./proeidopoiisi-termatismou";

export default definirCasos(proeidopoiisiTermatismou, [
  {
    nombre: "104 εβδομάδες: 4 εβδομάδες από τον εργοδότη, 2 από τον εργοδοτούμενο",
    origen: { tipo: "oficial", url: URL_TERMATISMOS, detalle: "Οδηγός: από 104 μέχρι 155 εβδομάδες, 4 εβδομάδες. Εργοδοτούμενος: από 52 μέχρι 259, 2 εβδομάδες." },
    fecha: "2026-10-26",
    entrada: { apo: "2024-01-01", eos: "2025-12-28", misthos: null },
    esperado: { evdomades: 104, ergodotis: 4, ergazomenos: 2 },
  },
  {
    nombre: "103 εβδομάδες: ακόμη 2 εβδομάδες",
    origen: { tipo: "oficial", url: URL_TERMATISMOS, detalle: "Από 52 μέχρι 103 εβδομάδες: 2 εβδομάδες." },
    fecha: "2026-10-26",
    entrada: { apo: "2024-01-01", eos: "2025-12-27", misthos: 2600 },
    esperado: { evdomades: 103, ergodotis: 2, antiProeidopoiisis: 1200 },
  },
  {
    nombre: "Πάνω από 312 εβδομάδες: 8 και 3 εβδομάδες",
    origen: { tipo: "oficial", url: URL_TERMATISMOS, detalle: "Από 312 εβδομάδες και άνω: 8 εβδομάδες. Εργοδοτούμενος από 260 και άνω: 3." },
    fecha: "2026-10-26",
    entrada: { apo: "2016-01-04", eos: "2026-01-03", misthos: null },
    esperado: { ergodotis: 8, ergazomenos: 3 },
  },
  {
    nombre: "20 εβδομάδες: χωρίς ελάχιστη προειδοποίηση",
    origen: { tipo: "oficial", url: URL_TERMATISMOS, detalle: "Η υποχρέωση ξεκινά από 26 εβδομάδες συνεχούς υπηρεσίας." },
    fecha: "2026-10-26",
    entrada: { apo: "2026-01-05", eos: "2026-05-24", misthos: null },
    esperado: { evdomades: 20, ergodotis: 0, ergazomenos: 0 },
  },
]);
