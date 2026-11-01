import { definirCasos } from "@/motor/calculo";
import odchodne from "./odchodne";

export default definirCasos(odchodne, [
  { nombre: "1 800 eur", origen: { tipo: "recalculado", url: "https://static.slov-lex.sk/static/SK/ZZ/2001/311/20260901.html", detalle: "§ 76a ods. 1: najmenej jeden priemerný mesačný zárobok." }, fecha: "2026-06-15", entrada: { zarobok: 1800 }, esperado: { odchodne: 1800 } },
]);
