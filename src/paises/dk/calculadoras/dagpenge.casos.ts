import { definirCasos } from "@/motor/calculo";
import dagpenge from "./dagpenge";

const BM = "https://www.bm.dk/satser/satser-for-2026/dagpenge";

export default definirCasos(dagpenge, [
  {
    nombre: "30.000 kr. om måneden: højeste sats",
    origen: { tipo: "recalculado", url: BM, detalle: "30.000 − 8 % = 27.600; 90 % = 24.840, over højeste sats på 22.041 kr. for fuldtidsforsikrede." },
    fecha: "2026-10-24",
    entrada: { loen: 30000, forsikring: "fuldtid" },
    esperado: { grundlag: 27600, procent: 24840, dagpenge: 22041, aar: 264492 },
  },
  {
    nombre: "20.000 kr. om måneden: 90 % af grundlaget",
    origen: { tipo: "recalculado", url: BM, detalle: "20.000 − 8 % = 18.400; 90 % = 16.560, under højeste sats." },
    fecha: "2026-10-24",
    entrada: { loen: 20000, forsikring: "fuldtid" },
    esperado: { dagpenge: 16560 },
  },
  {
    nombre: "Deltidsforsikret",
    origen: { tipo: "recalculado", url: BM, detalle: "16.560 er over højeste sats for deltidsforsikrede på 14.694 kr." },
    fecha: "2026-10-24",
    entrada: { loen: 20000, forsikring: "deltid" },
    esperado: { dagpenge: 14694 },
  },
]);
