import { definirCasos } from "@/motor/calculo";
import calculatorSalariuNet from "./calculator-salariu-net";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";
const OUG89 = "https://static.anaf.ro/static/10/Anaf/legislatie/OUG_89_2025.pdf";

export default definirCasos(calculatorSalariuNet, [
  {
    nombre: "Salariul minim din iulie 2026 (4.325 lei) cu suma neimpozabilă de 200 de lei",
    origen: {
      tipo: "recalculado",
      url: OUG89,
      detalle: "Baza CAS și CASS 4.325 − 200 = 4.125; CAS 25 % = 1.031,25 → 1.031; CASS 10 % = 412,5 → 413; deducere 20 % × 4.325 = 865; baza impozit 4.125 − 1.031 − 413 − 865 = 1.816; impozit 181,6 → 182; net 4.325 − 1.031 − 413 − 182 = 2.699 (netul anunțat de Ministerul Muncii).",
    },
    fecha: "2026-10-24",
    entrada: { brut: 4325, persoane: "0", sub26: false, copii: 0, minim: true },
    esperado: { cas: 1031, cass: 413, impozit: 182, net: 2699, sumaNeimpozabila: 200 },
  },
  {
    nombre: "Salariul minim din ianuarie-iunie 2026 (4.050 lei) cu suma neimpozabilă de 300 de lei",
    origen: {
      tipo: "recalculado",
      url: OUG89,
      detalle: "Baza 4.050 − 300 = 3.750; CAS 937,5 → 938; CASS 375; deducere 20 % × 4.050 = 810; baza impozit 3.750 − 938 − 375 − 810 = 1.627; impozit 162,7 → 163; net 4.050 − 938 − 375 − 163 = 2.574.",
    },
    fecha: "2026-03-15",
    entrada: { brut: 4050, persoane: "0", sub26: false, copii: 0, minim: true },
    esperado: { cas: 938, cass: 375, impozit: 163, net: 2574 },
  },
  {
    nombre: "6.000 lei brut, fără persoane în întreținere",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "CAS 1.500, CASS 600, venit net 3.900. Peste minim cu 1.675 lei = 34 de tranșe de 50 de lei: 20 % − 17 = 3 % × 4.325 = 129,75 → 130. Baza 3.770, impozit 377. Net 6.000 − 1.500 − 600 − 377 = 3.523.",
    },
    fecha: "2026-10-24",
    entrada: { brut: 6000, persoane: "0", sub26: false, copii: 0, minim: false },
    esperado: { cas: 1500, cass: 600, deducere: 130, impozit: 377, net: 3523 },
  },
  {
    nombre: "6.000 lei brut, două persoane în întreținere, sub 26 de ani, un copil la școală",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "Deducere de bază 30 % − 17 = 13 % × 4.325 = 562,25 → 562; tineri 15 % × 4.325 = 648,75 → 649; copil 100; total 1.311. Baza 3.900 − 1.311 = 2.589, impozit 258,9 → 259. Net 6.000 − 2.100 − 259 = 3.641.",
    },
    fecha: "2026-10-24",
    entrada: { brut: 6000, persoane: "2", sub26: true, copii: 1, minim: false },
    esperado: { deducere: 1311, impozit: 259, net: 3641 },
  },
  {
    nombre: "10.000 lei brut, fără deducere",
    origen: { tipo: "recalculado", url: CF, detalle: "Peste 4.325 + 2.000 lei nu se acordă deducere de bază. CAS 2.500, CASS 1.000, impozit 10 % × 6.500 = 650, net 5.850." },
    fecha: "2026-10-24",
    entrada: { brut: 10000, persoane: "0", sub26: false, copii: 0, minim: false },
    esperado: { deducere: 0, impozit: 650, net: 5850 },
  },
  {
    nombre: "4.700 lei brut cu bază la minim: peste plafonul de 4.600 de lei, fără suma neimpozabilă",
    origen: {
      tipo: "recalculado",
      url: OUG89,
      detalle: "Brutul depășește 4.600 lei. CAS 1.175, CASS 470, venit net 3.055. 375 lei peste minim = 8 tranșe: 16 % × 4.325 = 692. Baza 2.363, impozit 236,3 → 236. Net 2.819.",
    },
    fecha: "2026-10-24",
    entrada: { brut: 4700, persoane: "0", sub26: false, copii: 0, minim: true },
    esperado: { sumaNeimpozabila: 0, deducere: 692, impozit: 236, net: 2819 },
  },
  {
    nombre: "Brut zero",
    origen: { tipo: "recalculado", url: CF, detalle: "Fără salariu nu există calcul." },
    fecha: "2026-10-24",
    entrada: { brut: 0, persoane: "0", sub26: false, copii: 0, minim: false },
    esperaError: true,
  },
]);
