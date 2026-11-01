import { definirCasos } from "@/motor/calculo";
import calc from "./regres";

const U = "https://porezna-uprava.gov.hr/pozivni_centar/Stranice/neoporezivi-primici-kod-dohotka-od-nesamostalnog-rada.aspx";

export default definirCasos(calc, [
  { nombre: "Regres 500 eura", origen: { tipo: "recalculado", url: U, detalle: "Do 700 eura godišnje: sve neoporezivo, preostaje 200." }, fecha: "2026-11-01", entrada: { isplata: 500, vecIsplaceno: 0 }, esperado: { neoporezivo: 500, oporezivo: 0, preostalo: 200 } },
  { nombre: "Božićnica nakon regresa", origen: { tipo: "recalculado", url: U, detalle: "Već 500; slobodno 200; božićnica 300: 200 neoporezivo, 100 iznad." }, fecha: "2026-11-01", entrada: { isplata: 300, vecIsplaceno: 500 }, esperado: { neoporezivo: 200, oporezivo: 100, preostalo: 0 } },
  { nombre: "Svota već iskorištena", origen: { tipo: "recalculado", url: U, detalle: "Već 800 eura: ništa nije slobodno." }, fecha: "2026-11-01", entrada: { isplata: 100, vecIsplaceno: 800 }, esperado: { neoporezivo: 0, oporezivo: 100 } },
]);
