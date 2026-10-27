import { definirCasos } from "@/motor/calculo";
import { URL_DTK } from "../lib/fuentes-url";
import ypologismosPlithorismou from "./ypologismos-plithorismou";

export default definirCasos(ypologismosPlithorismou, [
  {
    nombre: "1.000 € του Ιανουαρίου 2015 σε τιμές Σεπτεμβρίου 2026",
    origen: { tipo: "oficial", url: URL_DTK, detalle: "ΔΤΚ ΣΥΚ (2015=100): Ιανουάριος 2015 99,32, Σεπτέμβριος 2026 122,06. 1000 × 122,06 / 99,32 = 1228,96." },
    fecha: "2026-10-26",
    entrada: { poso: 1000, apo: "2015-01-01", eos: "2026-09-30" },
    esperado: { simera: 1228.96, diafora: 228.96, axia: 813.7 },
  },
  {
    nombre: "Από Ιανουάριο 2020 σε Δεκέμβριο 2025",
    origen: { tipo: "oficial", url: URL_DTK, detalle: "100,83 και 117,67: 1000 × 117,67 / 100,83 = 1167,01, πληθωρισμός 16,7%." },
    fecha: "2026-10-26",
    entrada: { poso: 1000, apo: "2020-01-15", eos: "2025-12-31" },
    esperado: { simera: 1167.01, synoliki: 16.7014 },
    tolerancia: 0.001,
  },
  {
    nombre: "Μήνας που δεν έχει δημοσιευτεί: ο υπολογισμός σταματά στον Σεπτέμβριο 2026",
    origen: { tipo: "oficial", url: URL_DTK, detalle: "Ο τελευταίος δείκτης είναι του Σεπτεμβρίου 2026." },
    fecha: "2026-10-26",
    entrada: { poso: 1000, apo: "2015-01-01", eos: "2026-10-26" },
    esperado: { simera: 1228.96 },
  },
]);
