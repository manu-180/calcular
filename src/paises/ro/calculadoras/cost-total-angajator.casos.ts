import { definirCasos } from "@/motor/calculo";
import costTotalAngajator from "./cost-total-angajator";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";

export default definirCasos(costTotalAngajator, [
  {
    nombre: "6.000 lei brut",
    origen: { tipo: "recalculado", url: CF, detalle: "CAM 2,25 % × 6.000 = 135; cost 6.135 lei; pe an 73.620 lei." },
    fecha: "2026-10-24",
    entrada: { brut: 6000, angajati: 1, minim: false },
    esperado: { cam: 135, cost: 6135, net: 3523, costAnual: 73620 },
  },
  {
    nombre: "Salariul minim din iulie 2026, cu suma neimpozabilă",
    origen: {
      tipo: "recalculado",
      url: "https://static.anaf.ro/static/10/Anaf/legislatie/OUG_89_2025.pdf",
      detalle: "Suma de 200 de lei nu intră nici în baza CAM: 2,25 % × 4.125 = 92,81 → 93; cost 4.325 + 93 = 4.418 lei.",
    },
    fecha: "2026-10-24",
    entrada: { brut: 4325, angajati: 1, minim: true },
    esperado: { cam: 93, cost: 4418, net: 2699 },
  },
  {
    nombre: "Salariul minim din primăvara lui 2026, trei angajați",
    origen: {
      tipo: "recalculado",
      url: "https://static.anaf.ro/static/10/Anaf/legislatie/OUG_89_2025.pdf",
      detalle: "2,25 % × (4.050 − 300) = 84,375 → 84; cost 4.134 lei pe angajat, 12.402 lei pentru trei.",
    },
    fecha: "2026-04-15",
    entrada: { brut: 4050, angajati: 3, minim: true },
    esperado: { cam: 84, cost: 4134, costLunarTotal: 12402 },
  },
  {
    nombre: "Brut zero",
    origen: { tipo: "recalculado", url: CF, detalle: "Fără salariu nu există cost." },
    fecha: "2026-10-24",
    entrada: { brut: 0, angajati: 1, minim: false },
    esperaError: true,
  },
]);
