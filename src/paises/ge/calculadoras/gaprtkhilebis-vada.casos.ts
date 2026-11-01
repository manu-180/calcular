import { definirCasos } from "@/motor/calculo";
import gaprtkhilebisVada from "./gaprtkhilebis-vada";

const KOD = "https://sla.gov.ge/Ge/Files/ViewFile/3236";

export default definirCasos(gaprtkhilebisVada, [
  {
    nombre: "დამსაქმებელი, 30 დღე",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 48.1: 1 ნოემბერს + 30 = 1 დეკემბერი." },
    fecha: "2026-11-01",
    entrada: { vin: "damsaqmebeli-30", tarighi: "2026-11-01" },
    esperado: { dghe: 30, adreuli: "2026-12-01", kompensatsia: 1 },
  },
  {
    nombre: "დამსაქმებელი, 3 დღე",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 48.2: 1 ნოემბერს + 3 = 4 ნოემბერი." },
    fecha: "2026-11-01",
    entrada: { vin: "damsaqmebeli-3", tarighi: "2026-11-01" },
    esperado: { dghe: 3, adreuli: "2026-11-04", kompensatsia: 2 },
  },
  {
    nombre: "დასაქმებული",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 48.3: 30 დღე, კომპენსაციის გარეშე." },
    fecha: "2026-11-01",
    entrada: { vin: "dasaqmebuli", tarighi: "2026-11-01" },
    esperado: { dghe: 30, kompensatsia: 0 },
  },
]);
