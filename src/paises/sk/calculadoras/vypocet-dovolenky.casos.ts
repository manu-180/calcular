import { definirCasos } from "@/motor/calculo";
import vypocetDovolenky from "./vypocet-dovolenky";

const ZP = "https://static.slov-lex.sk/static/SK/ZZ/2001/311/20260901.html";

export default definirCasos(vypocetDovolenky, [
  { nombre: "Päť týždňov za celý rok", origen: { tipo: "recalculado", url: ZP, detalle: "§ 103 ods. 2: 5 × 5 = 25 dní." }, fecha: "2026-06-15", entrada: { vymera: "zvysena", dniTyzdenne: 5, mesiace: 12 }, esperado: { dni: 25 } },
  { nombre: "Štyri týždne a tri mesiace", origen: { tipo: "recalculado", url: ZP, detalle: "§ 102: 3/12 z 20 dní = 5." }, fecha: "2026-06-15", entrada: { vymera: "zakladna", dniTyzdenne: 5, mesiace: 3 }, esperado: { dni: 5 } },
  { nombre: "Osem týždňov pre pedagóga", origen: { tipo: "recalculado", url: ZP, detalle: "§ 103 ods. 3: 8 × 5 = 40 dní." }, fecha: "2026-06-15", entrada: { vymera: "pedagog", dniTyzdenne: 5, mesiace: 12 }, esperado: { dni: 40 } },
]);
