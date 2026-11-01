import { definirCasos } from "@/motor/calculo";
import daavadebisAnazghaureba from "./daavadebis-anazghaureba";

const KOD = "https://sla.gov.ge/Ge/Files/ViewFile/3236";

export default definirCasos(daavadebisAnazghaureba, [
  {
    nombre: "ხელშეკრულებით 100%, 10 დღე",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 46.2 „ი“ და 46.4: 3000 / 30 × 10 × 100% = 1000; დარჩა 30 და 50." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 3000, zedized: 10, sul: 10, procenti: 100 },
    esperado: { anazghaureba: 1000, statusi: "შეჩერების ფარგლებშია", zedizedDarcha: 30, sulDarcha: 50 },
  },
  {
    nombre: "ხელშეკრულების გარეშე, 41 დღე",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 46.4: ანაზღაურება 0; 41 > 40." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 3000, zedized: 41, sul: 41, procenti: 0 },
    esperado: { anazghaureba: 0, statusi: "ვადა გადაჭარბებულია", zedizedDarcha: 0 },
  },
]);
