import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-societes";

export default definirCasos(calculadora, [
  {
    nombre: "Bénéfice de 2 millions DH",
    origen: { tipo: "recalculado", detalle: "20 % × 2 000 000 = 400 000." },
    fecha: "2026-10-16",
    entrada: { benefice: 2000000, type: "normal" },
    esperado: { impot: 400000, taux: 20, net: 1600000 },
  },
  {
    nombre: "Bénéfice de 150 millions DH",
    origen: { tipo: "recalculado", detalle: "Bénéfice ≥ 100 000 000 : 35 % × 150 000 000 = 52 500 000." },
    fecha: "2026-10-16",
    entrada: { benefice: 150000000, type: "normal" },
    esperado: { impot: 52500000, taux: 35 },
  },
  {
    nombre: "Entreprise d'assurance, 10 millions DH",
    origen: { tipo: "recalculado", detalle: "40 % × 10 000 000 = 4 000 000." },
    fecha: "2026-10-16",
    entrada: { benefice: 10000000, type: "financier" },
    esperado: { impot: 4000000, taux: 40 },
  },
]);
