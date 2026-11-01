import { definirCasos } from "@/motor/calculo";
import calc from "./izracun-otpremnine";

const U = "https://narodne-novine.nn.hr/clanci/sluzbeni/2022_12_151_2343.html";
const N = "https://porezna-uprava.gov.hr/pozivni_centar/Stranice/neoporezivi-primici-kod-dohotka-od-nesamostalnog-rada.aspx";

export default definirCasos(calc, [
  { nombre: "65 godina života i 15 godina staža", origen: { tipo: "recalculado", url: U, detalle: "Čl. 126. st. 2. (NN 151/2022): bez prava." }, fecha: "2026-11-01", entrada: { placa: 2000, godine: 10, skrivljeno: false, mirovina: true }, esperado: { otpremnina: 0 } },
  { nombre: "Osam godina, 1.800 eura", origen: { tipo: "recalculado", url: U, detalle: "Čl. 126.: 1.800 x 8 / 3 = 4.800; neoporezivo do 7.680." }, fecha: "2026-11-01", entrada: { placa: 1800, godine: 8, skrivljeno: false, mirovina: false }, esperado: { otpremnina: 4800, neoporezivo: 4800, oporezivo: 0 } },
  { nombre: "Gornja granica od šest plaća", origen: { tipo: "recalculado", url: U, detalle: "2.000 x 20 / 3 = 13.333,33; najviše 12.000." }, fecha: "2026-11-01", entrada: { placa: 2000, godine: 20, skrivljeno: false, mirovina: false }, esperado: { otpremnina: 12000 } },
  { nombre: "Dio iznad neoporezive svote", origen: { tipo: "recalculado", url: N, detalle: "3.000 x 3 / 3 = 3.000; neoporezivo 960 x 3 = 2.880; iznad 120." }, fecha: "2026-11-01", entrada: { placa: 3000, godine: 3, skrivljeno: false, mirovina: false }, esperado: { otpremnina: 3000, neoporezivo: 2880, oporezivo: 120 } },
  { nombre: "Manje od dvije godine", origen: { tipo: "recalculado", url: U, detalle: "Čl. 126.: uvjet su dvije godine." }, fecha: "2026-11-01", entrada: { placa: 2000, godine: 1, skrivljeno: false, mirovina: false }, esperado: { otpremnina: 0 } },
  { nombre: "Otkaz zbog ponašanja", origen: { tipo: "recalculado", url: U, detalle: "Čl. 126.: bez prava." }, fecha: "2026-11-01", entrada: { placa: 2000, godine: 10, skrivljeno: true, mirovina: false }, esperado: { otpremnina: 0 } },
]);
