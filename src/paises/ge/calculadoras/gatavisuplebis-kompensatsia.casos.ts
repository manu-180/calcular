import { definirCasos } from "@/motor/calculo";
import gatavisuplebisKompensatsia from "./gatavisuplebis-kompensatsia";

const KOD = "https://sla.gov.ge/Ge/Files/ViewFile/3236";

export default definirCasos(gatavisuplebisKompensatsia, [
  {
    nombre: "30 დღიანი გაფრთხილება",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 48.1: არანაკლებ 1 თვე = 2100." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 2100, gaprtkhileba: "30", dghe: 0, samushao: 21 },
    esperado: { sul: 2100, tveebi: 1, vada: 7 },
  },
  {
    nombre: "3 დღიანი გაფრთხილება და შვებულება",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 48.2: 2 თვე = 4200; მუხლი 31.5: 2100 / 21 × 5 = 500; სულ 4700." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 2100, gaprtkhileba: "3", dghe: 5, samushao: 21 },
    esperado: { sul: 4700, kompensatsia: 4200, shvebuleba: 500, tveebi: 2 },
  },
]);
