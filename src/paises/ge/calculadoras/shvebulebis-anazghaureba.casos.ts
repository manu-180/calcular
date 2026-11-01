import { definirCasos } from "@/motor/calculo";
import shvebulebisAnazghaureba from "./shvebulebis-anazghaureba";

const KOD = "https://sla.gov.ge/Ge/Files/ViewFile/3236";

export default definirCasos(shvebulebisAnazghaureba, [
  {
    nombre: "სრული შვებულება",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 36 და 31.1: 2100 / 21 = 100, × 24 = 2400." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 2100, dghe: 24, samushao: 21, tve: 12 },
    esperado: { anazghaureba: 2400, dghiuri: 100, ufleba: 24 },
  },
  {
    nombre: "ექვსი თვე ნამუშევარი",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 31.5 პროპორციულობა: 24 × 6/12 = 12." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 2100, dghe: 12, samushao: 21, tve: 6 },
    esperado: { anazghaureba: 1200, ufleba: 12 },
  },
]);
