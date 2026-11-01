import { definirCasos } from "@/motor/calculo";
import calc from "./porez-na-dohodak";

const U = "https://porezna-uprava.gov.hr/hr/porez-na-dohodak-3939/3939";
const M = "https://porezna-uprava.gov.hr/pozivni_centar/Stranice/umanjenja-osobama-do-30-godina.aspx";
const Z = { djeca: 0, uzdrzavani: 0 };

export default definirCasos(calc, [
  {
    nombre: "Zagreb, 80.000 eura, obje stope",
    origen: { tipo: "recalculado", url: U, detalle: "Odbitak 7.200; osnovica 72.800; 60.000 x 23 % = 13.800; 12.800 x 33 % = 4.224; ukupno 18.024." },
    fecha: "2026-11-01",
    entrada: { dohodak: 80000, grad: "zagreb", dob: "ostali", ...Z },
    esperado: { odbitak: 7200, osnovica: 72800, nizi: 13800, visi: 4224, porez: 18024 },
  },
  {
    nombre: "Split, 30.000 eura",
    origen: { tipo: "recalculado", url: U, detalle: "Osnovica 22.800; 21,5 % = 4.902." },
    fecha: "2026-11-01",
    entrada: { dohodak: 30000, grad: "split", dob: "ostali", ...Z },
    esperado: { porez: 4902 },
  },
  {
    nombre: "Do 25 godina, puno umanjenje niže stope",
    origen: { tipo: "recalculado", url: M, detalle: "Zagreb 80.000: niža stopa 13.800 potpuno umanjena; ostaje 4.224." },
    fecha: "2026-11-01",
    entrada: { dohodak: 80000, grad: "zagreb", dob: "do25", ...Z },
    esperado: { umanjenje: 13800, porez: 4224 },
  },
  {
    nombre: "Od 26 do 30 godina, pola",
    origen: { tipo: "recalculado", url: M, detalle: "Split 30.000: 4.902 x 50 % = 2.451; ostaje 2.451." },
    fecha: "2026-11-01",
    entrada: { dohodak: 30000, grad: "split", dob: "do30", ...Z },
    esperado: { umanjenje: 2451, porez: 2451 },
  },
  {
    nombre: "Dvoje djece",
    origen: { tipo: "recalculado", url: "https://porezna-uprava.gov.hr/hr/osobni-odbitak-ili-neoporezivi-dio-place/4677", detalle: "Odbitak 7.200 x 2,2 = 15.840; Zagreb, 24.000: osnovica 8.160 x 23 % = 1.876,80." },
    fecha: "2026-11-01",
    entrada: { dohodak: 24000, grad: "zagreb", dob: "ostali", djeca: 2, uzdrzavani: 0 },
    esperado: { odbitak: 15840, porez: 1876.8 },
  },
]);
