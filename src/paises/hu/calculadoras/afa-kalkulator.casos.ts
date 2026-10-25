import { definirCasos } from "@/motor/calculo";
import afaKalkulator from "./afa-kalkulator";

const AFA = "https://njt.jog.gov.hu/jogszabaly/2007-127-00-00";

export default definirCasos(afaKalkulator, [
  {
    nombre: "10 000 Ft nettó, 27%",
    origen: { tipo: "recalculado", url: AFA, detalle: "82. § (1): 10 000 × 27% = 2700; bruttó 12 700." },
    fecha: "2026-10-24",
    entrada: { irany: "nettobol", osszeg: 10000, kulcs: "altalanos" },
    esperado: { kulcs: 27, afa: 2700, brutto: 12700 },
  },
  {
    nombre: "12 700 Ft bruttó, 27% kivonása",
    origen: { tipo: "recalculado", url: AFA, detalle: "12 700 / 1,27 = 10 000; ÁFA 2700." },
    fecha: "2026-10-24",
    entrada: { irany: "bruttobol", osszeg: 12700, kulcs: "altalanos" },
    esperado: { netto: 10000, afa: 2700 },
  },
  {
    nombre: "11 800 Ft bruttó, 18%",
    origen: { tipo: "recalculado", url: AFA, detalle: "82. § (3): 11 800 / 1,18 = 10 000; ÁFA 1800." },
    fecha: "2026-10-24",
    entrada: { irany: "bruttobol", osszeg: 11800, kulcs: "kedvezmenyes18" },
    esperado: { kulcs: 18, netto: 10000, afa: 1800 },
  },
  {
    nombre: "1990 Ft nettó, 5%",
    origen: { tipo: "recalculado", url: AFA, detalle: "82. § (2): 1990 × 5% = 99,5 → 100; bruttó 2090." },
    fecha: "2026-10-24",
    entrada: { irany: "nettobol", osszeg: 1990, kulcs: "kedvezmenyes5" },
    esperado: { kulcs: 5, afa: 100, brutto: 2090 },
  },
]);
