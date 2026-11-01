import { definirCasos } from "@/motor/calculo";
import calc from "./porez-na-promet-nekretnina";

const U = "https://porezna-uprava.gov.hr/hr/porez-na-promet-nekretni-na/4583";

export default definirCasos(calc, [
  { nombre: "Stan od 200.000 eura", origen: { tipo: "recalculado", url: U, detalle: "200.000 x 3 % = 6.000; PDV 25 % bi bio 50.000." }, fecha: "2026-11-01", entrada: { vrijednost: 200000 }, esperado: { porez: 6000, ukupno: 206000, pdv: 50000 } },
  { nombre: "Nula nije dopuštena", origen: { tipo: "recalculado", url: U, detalle: "Greška unosa." }, fecha: "2026-11-01", entrada: { vrijednost: 0 }, esperaError: true },
]);
