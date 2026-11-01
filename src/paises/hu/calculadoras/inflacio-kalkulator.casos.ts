import { definirCasos } from "@/motor/calculo";
import inflacioKalkulator from "./inflacio-kalkulator";

const KSH = "https://www.ksh.hu/stadat_files/ara/hu/ara0040.html";

export default definirCasos(inflacioKalkulator, [
  {
    nombre: "100 000 Ft 2020 januárjából 2026 szeptemberére",
    origen: { tipo: "recalculado", url: KSH, detalle: "Láncolt index (2016. december = 100): 110,0324 és 173,0996; 100 000 × 173,0996 / 110,0324 = 157 317." },
    fecha: "2026-10-24",
    entrada: { osszeg: 100000, tol: "2020-01-01", ig: "2026-09-15" },
    esperado: { mai: 157317, kulonbseg: 57317, ertek: 63566, tolHonap: "2020. január", igHonap: "2026. szeptember" },
  },
  {
    nombre: "Egy év: 2025 szeptemberétől 2026 szeptemberéig",
    origen: { tipo: "recalculado", url: KSH, detalle: "173,0996 / 170,5444 = 1,01498; 250 000 Ft-ból 253 746 Ft." },
    fecha: "2026-10-24",
    entrada: { osszeg: 250000, tol: "2025-09-01", ig: "2026-09-01" },
    esperado: { mai: 253746 },
  },
  {
    nombre: "A záró hónapra még nincs adat",
    origen: { tipo: "recalculado", url: KSH, detalle: "Az októberi adat még nem jelent meg: a kalkulátor szeptemberig számol." },
    fecha: "2026-10-24",
    entrada: { osszeg: 250000, tol: "2025-09-01", ig: "2026-10-24" },
    esperado: { mai: 253746, igHonap: "2026. szeptember" },
  },
  {
    nombre: "A sorozat előtti hónap",
    origen: { tipo: "recalculado", url: KSH, detalle: "A láncolt index 2016 decemberétől indul." },
    fecha: "2026-10-24",
    entrada: { osszeg: 1000, tol: "2010-01-01", ig: "2026-09-01" },
    esperaError: true,
  },
]);
