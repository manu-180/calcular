import { definirCasos } from "@/motor/calculo";
import felmondasiIdoKalkulator from "./felmondasi-ido-kalkulator";

const MT = "https://njt.jog.gov.hu/jogszabaly/2012-1-00-00";

export default definirCasos(felmondasiIdoKalkulator, [
  {
    nombre: "Munkáltatói felmondás négy év után",
    origen: { tipo: "recalculado", url: MT, detalle: "69. § (1)-(2): 30 + 5 = 35 nap; 70. § (1): felmentés legalább 17,5, töredéknap egész nap: 18." },
    fecha: "2026-10-24",
    entrada: { ki: "munkaltato", evek: 4, kozles: null },
    esperado: { napok: 35, hosszabbitas: 5, felmentes: 18, dolgozni: 17 },
  },
  {
    nombre: "Munkáltatói felmondás húsz év után, közléssel",
    origen: { tipo: "recalculado", url: MT, detalle: "30 + 60 = 90 nap; 68. § (1): a közlést követő napon kezdődik, 2026. november 2-tól január 30-ig." },
    fecha: "2026-10-24",
    entrada: { ki: "munkaltato", evek: 20, kozles: "2026-11-01" },
    esperado: { napok: 90, felmentes: 45, kezdet: "2026-11-02", utolso: "2027-01-30" },
  },
  {
    nombre: "Munkavállalói felmondás",
    origen: { tipo: "recalculado", url: MT, detalle: "69. § (2) csak a munkáltató felmondására vonatkozik: 30 nap, felmentés nélkül." },
    fecha: "2026-10-24",
    entrada: { ki: "munkavallalo", evek: 15, kozles: null },
    esperado: { napok: 30, hosszabbitas: 0, felmentes: 0 },
  },
]);
