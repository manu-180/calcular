import { definirCasos } from "@/motor/calculo";
import kalkulatorInflacije from "./kalkulator-inflacije";

const CPI = "https://monstat.org/uploads/files/cijene/CPI/2026/9/CPI_CG_Septembar_2026.pdf";

export default definirCasos(kalkulatorInflacije, [
  {
    nombre: "Godišnja stopa za septembar 2026",
    origen: { tipo: "oficial", url: CPI, detalle: "MONSTAT: cijene u septembru 2026 više su za 5,2 % nego godinu ranije." },
    fecha: "2026-10-31",
    entrada: { iznos: 1000, od: "2025-09-01", do: "2026-09-01" },
    esperado: { danas: 1052.29, ukupno: 5.2295 },
  },
  {
    nombre: "Mjesečna stopa za septembar 2026",
    origen: { tipo: "oficial", url: CPI, detalle: "MONSTAT: u odnosu na avgust 2026 više za 0,5 %." },
    fecha: "2026-10-31",
    entrada: { iznos: 1000, od: "2026-08-01", do: "2026-09-01" },
    esperado: { razlika: 5.38 },
  },
  {
    nombre: "Krajnji mjesec poslije poslednjeg podatka",
    origen: { tipo: "recalculado", url: CPI, detalle: "Poslednji objavljen je septembar 2026, pa obračun staje tu." },
    fecha: "2026-10-31",
    entrada: { iznos: 1000, od: "2025-09-01", do: "2026-10-20" },
    esperado: { danas: 1052.29, mjesecDo: "septembar 2026." },
  },
  {
    nombre: "Početak prije podataka je greška",
    origen: { tipo: "recalculado", url: CPI, detalle: "Baza MONSTAT-a sa osnovom 2025 počinje od januara 2016." },
    fecha: "2026-10-31",
    entrada: { iznos: 1000, od: "2016-01-01", do: "2015-01-01" },
    esperaError: true,
  },
]);
