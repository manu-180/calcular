import { definirCasos } from "@/motor/calculo";
import salariulMinim from "./salariul-minim";

const HG146 = "https://static.anaf.ro/static/10/Anaf/legislatie/HG_146_2026.pdf";
const HG1506 = "https://static.anaf.ro/static/10/Anaf/legislatie/HG_1506_2024.pdf";

export default definirCasos(salariulMinim, [
  {
    nombre: "Salariul minim de la 1 iulie 2026",
    origen: { tipo: "oficial", url: HG146, detalle: "HG nr. 146/2026, art. 1: 4.325 lei lunar pentru 166,667 ore, adică 25,949 lei/oră. Net 2.699 lei, cost 4.418 lei." },
    fecha: "2026-10-24",
    entrada: { ore: 8 },
    esperado: { brut: 4325, orar: 25.949, oreLuna: 166.667, net: 2699, cost: 4418, anual: 51900 },
  },
  {
    nombre: "Salariul minim în primăvara lui 2026",
    origen: { tipo: "oficial", url: HG1506, detalle: "HG nr. 1.506/2024, art. 1: 4.050 lei lunar pentru 165,334 ore, adică 24,496 lei/oră. Net 2.574 lei, cost 4.134 lei." },
    fecha: "2026-05-04",
    entrada: { ore: 8 },
    esperado: { brut: 4050, orar: 24.496, net: 2574, cost: 4134 },
  },
  {
    nombre: "Ultima zi cu 4.050 lei și prima zi cu 4.325 lei",
    origen: { tipo: "oficial", url: HG146, detalle: "HG nr. 146/2026 se aplică de la 1 iulie 2026; pe 30 iunie se aplică încă HG nr. 1.506/2024." },
    fecha: "2026-06-30",
    entrada: { ore: 8 },
    esperado: { brut: 4050 },
  },
  {
    nombre: "Normă de 4 ore",
    origen: { tipo: "recalculado", url: HG146, detalle: "4.325 × 4 / 8 = 2.162,50 lei brut." },
    fecha: "2026-07-01",
    entrada: { ore: 4 },
    esperado: { brut: 2162.5 },
  },
  {
    nombre: "Zero ore",
    origen: { tipo: "recalculado", url: HG146, detalle: "Programul trebuie să aibă cel puțin o oră." },
    fecha: "2026-10-24",
    entrada: { ore: 0 },
    esperaError: true,
  },
]);
