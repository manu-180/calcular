import { definirCasos } from "@/motor/calculo";
import zeganakveturiAnazghaureba from "./zeganakveturi-anazghaureba";

const KOD = "https://sla.gov.ge/Ge/Files/ViewFile/3236";

export default definirCasos(zeganakveturiAnazghaureba, [
  {
    nombre: "10 საათი, დანამატი 25%",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 24.2 და 27.2: 2080 × 12 / (40 × 52) = 12; 12 × 1,25 × 10 = 150." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 2080, saati: 10, damateba: 25, kvira: null },
    esperado: { anazghaureba: 150, saatobrivi: 12, gazrdili: 15, kvira: 40 },
  },
  {
    nombre: "სპეციფიკური რეჟიმი, 48 საათი",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 24.3: 2496 × 12 / (48 × 52) = 12; დანამატი 50%: 18; 5 საათი = 90." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 2496, saati: 5, damateba: 50, kvira: 48 },
    esperado: { anazghaureba: 90, saatobrivi: 12 },
  },
  {
    nombre: "ნული დანამატი",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 27.2 გაზრდილ ოდენობას ითხოვს." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 2080, saati: 5, damateba: 0, kvira: null },
    esperaError: true,
  },
]);
