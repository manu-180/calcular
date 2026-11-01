import { definirCasos } from "@/motor/calculo";
import calc from "./pdv-kalkulator";

const U = "https://porezna-uprava.gov.hr/hr/obrtnici/3975";

export default definirCasos(calc, [
  { nombre: "Dodati 25 %", origen: { tipo: "recalculado", url: U, detalle: "100 x 1,25 = 125." }, fecha: "2026-11-01", entrada: { iznos: 100, stopa: "opca", smjer: "dodaj" }, esperado: { pdv: 25, ukupno: 125 } },
  { nombre: "Izdvojiti 25 %", origen: { tipo: "recalculado", url: U, detalle: "125 / 1,25 = 100." }, fecha: "2026-11-01", entrada: { iznos: 125, stopa: "opca", smjer: "izdvoji" }, esperado: { pdv: 25, osnovica: 100 } },
  { nombre: "Izdvojiti 13 %", origen: { tipo: "recalculado", url: U, detalle: "113 / 1,13 = 100." }, fecha: "2026-11-01", entrada: { iznos: 113, stopa: "snizena", smjer: "izdvoji" }, esperado: { pdv: 13, osnovica: 100 } },
  { nombre: "Dodati 5 %", origen: { tipo: "recalculado", url: U, detalle: "200 x 1,05 = 210." }, fecha: "2026-11-01", entrada: { iznos: 200, stopa: "niska", smjer: "dodaj" }, esperado: { pdv: 10, ukupno: 210 } },
]);
