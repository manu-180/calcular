import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "100 000 F HT",
    origen: { tipo: "recalculado", detalle: "Art. 241 du CGI : TVA 18 % = 18 000. TTC 118 000." },
    fecha: F,
    entrada: { sens: "ht", montant: 100000 },
    esperado: { tva: 18000, ttc: 118000, taux: 18 },
  },
  {
    nombre: "59 000 F TTC",
    origen: { tipo: "recalculado", detalle: "HT = 59 000 / 1,18 = 50 000 ; TVA 9 000." },
    fecha: F,
    entrada: { sens: "ttc", montant: 59000 },
    esperado: { ht: 50000, tva: 9000, ttc: 59000 },
  },
]);
