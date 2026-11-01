import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-revenus-capitaux-mobiliers";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Dividendes de 5 000 000 F",
    origen: { tipo: "recalculado", detalle: "Art. 86, paragraphe 2 : 10 % de 5 000 000 = 500 000." },
    fecha: F,
    entrada: { montant: 5000000, nature: "dividendes" },
    esperado: { impot: 500000, taux: 10, net: 4500000 },
  },
  {
    nombre: "Dividendes d'une société cotée",
    origen: { tipo: "recalculado", detalle: "Art. 86, paragraphe 1 : 5 % de 2 000 000 = 100 000." },
    fecha: F,
    entrada: { montant: 2000000, nature: "dividendes-cotees" },
    esperado: { impot: 100000, taux: 5 },
  },
  {
    nombre: "Intérêts d'un dépôt",
    origen: { tipo: "recalculado", detalle: "Art. 88 : 15 % de 400 000 = 60 000." },
    fecha: F,
    entrada: { montant: 400000, nature: "creances" },
    esperado: { impot: 60000, net: 340000 },
  },
  {
    nombre: "Obligation publique UEMOA",
    origen: { tipo: "recalculado", detalle: "Art. 87, paragraphe 2 : 3 % de 1 000 000 = 30 000." },
    fecha: F,
    entrada: { montant: 1000000, nature: "obligations-publiques" },
    esperado: { impot: 30000 },
  },
]);
