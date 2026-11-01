import { definirCasos } from "@/motor/calculo";
import calc from "./prekovremeni-rad";

const U = "https://narodne-novine.nn.hr/clanci/sluzbeni/2014_07_93_1872.html";

export default definirCasos(calc, [
  { nombre: "Deset sati uz 50 %", origen: { tipo: "recalculado", url: U, detalle: "2.000 / 174 = 11,49; 10 sati = 114,94; povećanje 57,47; ukupno 172,41." }, fecha: "2026-11-01", entrada: { bruto: 2000, fond: 174, sati: 10, postotak: 50, ukupnoGodine: 0 }, esperado: { satnica: 11.49, osnovno: 114.94, povecanje: 57.47, ukupno: 172.41 } },
  { nombre: "Bez povećanja", origen: { tipo: "recalculado", url: U, detalle: "1.740 / 174 = 10 po satu; 5 sati = 50." }, fecha: "2026-11-01", entrada: { bruto: 1740, fond: 174, sati: 5, postotak: 0, ukupnoGodine: 0 }, esperado: { ukupno: 50 } },
  { nombre: "Iznad 180 sati", origen: { tipo: "recalculado", url: U, detalle: "Čl. 65.: uz 175 + 10 sati premašena je granica, a iznos se računa isto." }, fecha: "2026-11-01", entrada: { bruto: 1740, fond: 174, sati: 10, postotak: 100, ukupnoGodine: 175 }, esperado: { ukupno: 200 } },
]);
