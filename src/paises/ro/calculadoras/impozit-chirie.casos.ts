import { definirCasos } from "@/motor/calculo";
import impozitChirie from "./impozit-chirie";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";

export default definirCasos(impozitChirie, [
  {
    nombre: "2.000 lei pe lună, tot anul",
    origen: { tipo: "recalculado", url: CF, detalle: "Brut 24.000; cheltuieli forfetare 20 % = 4.800 (art. 84 alin. 3); net 19.200; impozit 10 % = 1.920. Net sub 6 × 4.050 = 24.300: fără CASS." },
    fecha: "2026-10-24",
    entrada: { chirie: 2000, luni: 12, alteVenituri: 0 },
    esperado: { brut: 24000, net: 19200, impozit: 1920, cass: 0, total: 1920, ramas: 22080, impozitLunar: 160 },
  },
  {
    nombre: "3.000 lei pe lună: intră CASS",
    origen: { tipo: "recalculado", url: CF, detalle: "Brut 36.000, net 28.800, impozit 2.880. 28.800 ≥ 24.300: baza CASS 24.300, CASS 2.430 (art. 170). Total 5.310." },
    fecha: "2026-10-24",
    entrada: { chirie: 3000, luni: 12, alteVenituri: 0 },
    esperado: { impozit: 2880, cass: 2430, total: 5310, ramas: 30690 },
  },
  {
    nombre: "Șase luni de chirie",
    origen: { tipo: "recalculado", url: CF, detalle: "1.500 × 6 = 9.000; net 7.200; impozit 720." },
    fecha: "2026-10-24",
    entrada: { chirie: 1500, luni: 6, alteVenituri: 0 },
    esperado: { brut: 9000, impozit: 720, cass: 0 },
  },
  {
    nombre: "Chirie zero",
    origen: { tipo: "recalculado", url: CF, detalle: "Fără chirie nu există calcul." },
    fecha: "2026-10-24",
    entrada: { chirie: 0, luni: 12, alteVenituri: 0 },
    esperaError: true,
  },
]);
