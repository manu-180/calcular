import { definirCasos } from "@/motor/calculo";
import calc from "./kalkulator-neto-bruto";

const KSO = "https://www.noi.bg/wp-content/uploads/KCO-7.pdf";

export default definirCasos(calc, [
  {
    nombre: "Нето 1163,97 дава бруто 1500",
    origen: { tipo: "recalculado", url: KSO, detalle: "Обратна сметка на случая 1500 евро бруто: вноски 206,70, данък 129,33." },
    fecha: "2026-10-31",
    entrada: { neto: 1163.97 },
    esperado: { vnoski: 206.7, danak: 129.33, netoTochno: 1163.97 },
    tolerancia: 0.02,
  },
  {
    nombre: "Нето 2414,75 над тавана",
    origen: { tipo: "recalculado", url: KSO, detalle: "Над 2300 евро вноските спират: бруто 3000, вноски 316,94." },
    fecha: "2026-10-31",
    entrada: { neto: 2414.75 },
    esperado: { vnoski: 316.94, netoTochno: 2414.75 },
    tolerancia: 0.02,
  },
  {
    nombre: "Нулево нето",
    origen: { tipo: "recalculado", url: KSO, detalle: "Нетото трябва да е над нула." },
    fecha: "2026-10-31",
    entrada: { neto: 0 },
    esperaError: true,
  },
]);
