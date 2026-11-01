import { definirCasos } from "@/motor/calculo";
import costTotalAngajator from "./cost-total-angajator";

const MF = "https://particip.gov.md/ro/download_attachment/34715";

export default definirCasos(costTotalAngajator, [
  {
    nombre: "15.000 de lei brut",
    origen: { tipo: "recalculado", url: MF, detalle: "CNAS 24 % × 15.000 = 3.600; cost 18.600; net 12.309; statul ia 3.600 + 1.350 + 1.341 = 6.291, adică 33,82 %." },
    fecha: "2026-10-26",
    entrada: { brut: 15000, scutire: "personala" },
    esperado: { cas: 3600, cost: 18600, net: 12309, pondere: 33.82 },
  },
  {
    nombre: "Fără scutire: povara de 35,4 % din prezentarea Ministerului Finanțelor",
    origen: { tipo: "oficial", url: MF, detalle: "Ministerul Finanțelor: CNAS 24 %, CNAM 9 %, IPV 12 %, povara totală 35,4 % din costul angajatorului. La 10.000: 2.400 + 900 + 1.092 = 4.392 din 12.400 = 35,42 %." },
    fecha: "2026-10-26",
    entrada: { brut: 10000, scutire: "fara" },
    esperado: { cost: 12400, impozit: 1092, pondere: 35.42 },
  },
  {
    nombre: "Brut negativ",
    origen: { tipo: "recalculado", url: MF, detalle: "Un salariu nu poate fi negativ." },
    fecha: "2026-10-26",
    entrada: { brut: -5, scutire: "personala" },
    esperaError: true,
  },
]);
