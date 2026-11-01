import { definirCasos } from "@/motor/calculo";
import calc from "./tecaj-hnb";

const U = "https://api.hnb.hr/tecajn-eur/v3?valuta=USD";

export default definirCasos(calc, [
  { nombre: "100 eura u dolarima", origen: { tipo: "recalculado", url: U, detalle: "100 x 1.1172 = 111.72." }, fecha: "2026-11-01", entrada: { valuta: "usd", smjer: "izEura", iznos: 100 }, esperado: { rezultat: 111.72, tecaj: 1.1172 } },
  { nombre: "Dolari u eure", origen: { tipo: "recalculado", url: U, detalle: "1.1172 / 1.1172 = 1." }, fecha: "2026-11-01", entrada: { valuta: "usd", smjer: "uEuro", iznos: 1.1172 }, esperado: { rezultat: 1 } },
]);
