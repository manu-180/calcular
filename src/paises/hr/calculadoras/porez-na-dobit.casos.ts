import { definirCasos } from "@/motor/calculo";
import calc from "./porez-na-dobit";

const U = "https://porezna-uprava.gov.hr/hr/porez-na-dobit-4587/4587";

export default definirCasos(calc, [
  { nombre: "Prihodi 500.000 eura", origen: { tipo: "recalculado", url: U, detalle: "10 % na 60.000 = 6.000." }, fecha: "2026-11-01", entrada: { prihodi: 500000, dobit: 60000 }, esperado: { stopa: 10, porez: 6000, ostaje: 54000 } },
  { nombre: "Točno 1.000.000 eura", origen: { tipo: "recalculado", url: U, detalle: "Do 1.000.000 eura vrijedi 10 %." }, fecha: "2026-11-01", entrada: { prihodi: 1000000, dobit: 100000 }, esperado: { stopa: 10, porez: 10000 } },
  { nombre: "Iznad milijuna", origen: { tipo: "recalculado", url: U, detalle: "18 % na 300.000 = 54.000." }, fecha: "2026-11-01", entrada: { prihodi: 2000000, dobit: 300000 }, esperado: { stopa: 18, porez: 54000 } },
  { nombre: "Dobit veća od prihoda", origen: { tipo: "recalculado", url: U, detalle: "Greška unosa." }, fecha: "2026-11-01", entrada: { prihodi: 100, dobit: 200 }, esperaError: true },
]);
