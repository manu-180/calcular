import { definirCasos } from "@/motor/calculo";
import calc from "./prosjecna-placa";

const U = "https://podaci.dzs.hr/2026/hr/121041";

export default definirCasos(calc, [
  { nombre: "Točno prosjek", origen: { tipo: "oficial", url: U, detalle: "Prosjek za kolovoz 2026.: 1.543 eura neto i 2.180 eura bruto; medijan 1.336 i 1.850." }, fecha: "2026-11-01", entrada: { neto: 1543 }, esperado: { odnos: 100, prema: 0, prosjek: 1543, medijan: 1336, bruto: 2180, brutoMedijan: 1850 } },
  { nombre: "Točno medijan", origen: { tipo: "recalculado", url: U, detalle: "1.336 / 1.543 = 86,58 %; razlika -207." }, fecha: "2026-11-01", entrada: { neto: 1336 }, esperado: { odnos: 86.58, prema: -207, odnosMedijan: 100 } },
]);
