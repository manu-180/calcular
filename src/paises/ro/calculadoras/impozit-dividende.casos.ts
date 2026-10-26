import { definirCasos } from "@/motor/calculo";
import impozitDividende from "./impozit-dividende";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";

export default definirCasos(impozitDividende, [
  {
    nombre: "100.000 lei dividende brute",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "Impozit 16 % = 16.000 (art. 97 alin. 7). Net 84.000, între 12 × 4.050 = 48.600 și 24 × 4.050 = 97.200: baza CASS 48.600, CASS 4.860 (art. 170). Rămân 79.140 lei.",
    },
    fecha: "2026-10-24",
    entrada: { dividende: 100000, alteVenituri: 0 },
    esperado: { impozit: 16000, net: 84000, bazaCass: 48600, cass: 4860, ramas: 79140 },
  },
  {
    nombre: "20.000 lei dividende, sub pragul de 6 salarii minime",
    origen: { tipo: "recalculado", url: CF, detalle: "Impozit 3.200, net 16.800 < 6 × 4.050 = 24.300: fără CASS." },
    fecha: "2026-10-24",
    entrada: { dividende: 20000, alteVenituri: 0 },
    esperado: { impozit: 3200, cass: 0, ramas: 16800 },
  },
  {
    nombre: "20.000 lei dividende plus 10.000 lei chirii nete",
    origen: { tipo: "recalculado", url: CF, detalle: "Net 16.800 + 10.000 = 26.800 ≥ 24.300: baza CASS 24.300, CASS 2.430. Rămân 16.800 − 2.430 = 14.370 lei din dividende." },
    fecha: "2026-10-24",
    entrada: { dividende: 20000, alteVenituri: 10000 },
    esperado: { bazaCass: 24300, cass: 2430, ramas: 14370 },
  },
  {
    nombre: "Dividende mari: plafonul de 24 de salarii minime",
    origen: { tipo: "recalculado", url: CF, detalle: "500.000 lei: impozit 80.000, net 420.000 ≥ 97.200: CASS 10 % × 97.200 = 9.720." },
    fecha: "2026-10-24",
    entrada: { dividende: 500000, alteVenituri: 0 },
    esperado: { impozit: 80000, cass: 9720, ramas: 410280 },
  },
  {
    nombre: "Fără dividende",
    origen: { tipo: "recalculado", url: CF, detalle: "Fără dividende nu există calcul." },
    fecha: "2026-10-24",
    entrada: { dividende: 0, alteVenituri: 0 },
    esperaError: true,
  },
]);
