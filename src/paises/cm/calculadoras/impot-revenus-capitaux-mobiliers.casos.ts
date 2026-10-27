import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-revenus-capitaux-mobiliers";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "1 000 000 F de dividendes au taux général",
    origen: { tipo: "recalculado", detalle: "Article 70 : 15 % = 150 000 ; article 71 : CAC 10 % = 15 000. Total 165 000, net 835 000." },
    fecha: F,
    entrada: { montant: 1000000, cas: "general" },
    esperado: { impot: 150000, cac: 15000, total: 165000, net: 835000 },
  },
  {
    nombre: "Dividendes d'une PME",
    origen: { tipo: "recalculado", detalle: "10 % de 2 000 000 = 200 000 ; CAC 20 000." },
    fecha: F,
    entrada: { montant: 2000000, cas: "dividendes-pme" },
    esperado: { total: 220000 },
  },
  {
    nombre: "Bénéficiaire dans un paradis fiscal",
    origen: { tipo: "recalculado", detalle: "30 % de 1 000 000 = 300 000 ; CAC 30 000." },
    fecha: F,
    entrada: { montant: 1000000, cas: "paradis-fiscal" },
    esperado: { total: 330000 },
  },
]);
