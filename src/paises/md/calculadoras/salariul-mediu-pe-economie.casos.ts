import { definirCasos } from "@/motor/calculo";
import salariulMediu from "./salariul-mediu-pe-economie";

const HG26 = "https://monitorul.gov.md/ro/monitorul/view/pdf/3193/part/2";

export default definirCasos(salariulMediu, [
  {
    nombre: "2026 cu un salariu de 15.000 de lei",
    origen: { tipo: "oficial", url: HG26, detalle: "HG nr. 773/2025: 17.400 de lei. 15.000 / 17.400 = 86,21 %; plafon 5 × 17.400 = 87.000; minim 6.300 / 17.400 = 36,21 %." },
    fecha: "2026-10-26",
    entrada: { salariu: 15000 },
    esperado: { mediu: 17400, procent: 86.21, plafon: 87000, anual: 208800, minimLaMediu: 36.21 },
  },
  {
    nombre: "Prima zi din 2026, fără salariu",
    origen: { tipo: "oficial", url: HG26, detalle: "HG nr. 773/2025 se aplică din 1 ianuarie 2026; fără salariu nu se arată procentul." },
    fecha: "2026-01-01",
    entrada: { salariu: null },
    esperado: { mediu: 17400, procent: null },
  },
]);
