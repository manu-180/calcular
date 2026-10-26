import { definirCasos } from "@/motor/calculo";
import ypologismosFpa from "./ypologismos-fpa";

const FEK = "https://ia37rg02wpsa01.blob.core.windows.net/fek/01/2025/20250100198.pdf";
const AADE = "https://www.aade.gr/sites/default/files/2025-12/dt_31.12.2025_0.docx";

export default definirCasos(ypologismosFpa, [
  {
    nombre: "100 € + ΦΠΑ 24%",
    origen: { tipo: "oficial", url: FEK, detalle: "Άρθρο 26 Κώδικα ΦΠΑ: συντελεστής 24%. 100 × 1,24 = 124." },
    fecha: "2026-10-24",
    entrada: { operacion: "prosthesi", poso: 100, syntelestis: "kanonikos", nisia: false },
    esperado: { synolo: 124, fpa: 24, tasa: 24 },
  },
  {
    nombre: "Αφαίρεση ΦΠΑ 24% από 124 €",
    origen: { tipo: "recalculado", url: FEK, detalle: "124 / 1,24 = 100. ΦΠΑ 24." },
    fecha: "2026-10-24",
    entrada: { operacion: "afairesi", poso: 124, syntelestis: "kanonikos", nisia: false },
    esperado: { neto: 100, fpa: 24 },
  },
  {
    nombre: "Νησιά: μειωμένος 13% γίνεται 9%",
    origen: { tipo: "oficial", url: AADE, detalle: "Ανακοίνωση ΑΑΔΕ: 13% σε 9% στα νησιά με μείωση 30%. 100 × 1,09 = 109." },
    fecha: "2026-10-24",
    entrada: { operacion: "prosthesi", poso: 100, syntelestis: "meiomenos", nisia: true },
    esperado: { synolo: 109, tasa: 9 },
  },
  {
    nombre: "Αφαίρεση 6% από 50 €",
    origen: { tipo: "recalculado", url: FEK, detalle: "50 / 1,06 = 47,17. ΦΠΑ 2,83." },
    fecha: "2026-10-24",
    entrada: { operacion: "afairesi", poso: 50, syntelestis: "yper-meiomenos", nisia: false },
    esperado: { neto: 47.17, fpa: 2.83 },
  },
  {
    nombre: "Ποσό μηδέν",
    origen: { tipo: "recalculado", url: FEK, detalle: "Χωρίς ποσό δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-24",
    entrada: { operacion: "prosthesi", poso: 0, syntelestis: "kanonikos", nisia: false },
    esperaError: true,
  },
]);
