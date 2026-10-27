import { definirCasos } from "@/motor/calculo";
import calculadora from "./taxe-professionnelle-unique";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Commerce, 12 000 000 F",
    origen: { tipo: "recalculado", detalle: "Article 135, tranche 10 000 001 à 15 000 000 : 190 000 F." },
    fecha: F,
    entrada: { ca: 12000000, activite: "commerce" },
    esperado: { regime: "TPU forfaitaire", tpu: 190000 },
  },
  {
    nombre: "Services, 2 500 000 F (fin de la première tranche)",
    origen: { tipo: "recalculado", detalle: "Article 135, tranche 0 à 2 500 000 : 20 000 F." },
    fecha: F,
    entrada: { ca: 2500000, activite: "services" },
    esperado: { tpu: 20000 },
  },
  {
    nombre: "Services, 2 500 001 F",
    origen: { tipo: "recalculado", detalle: "Article 135, tranche 2 500 001 à 5 000 000 : 187 500 F." },
    fecha: F,
    entrada: { ca: 2500001, activite: "services" },
    esperado: { tpu: 187500 },
  },
  {
    nombre: "Commerce déclaratif, 40 000 000 F",
    origen: { tipo: "recalculado", detalle: "Article 134 : 2 % de 40 000 000 = 800 000." },
    fecha: F,
    entrada: { ca: 40000000, activite: "commerce" },
    esperado: { regime: "TPU déclarative", tpu: 800000, tauxEffectif: 2 },
  },
  {
    nombre: "Services déclaratif, 50 000 000 F",
    origen: { tipo: "recalculado", detalle: "Article 134 : 8 % de 50 000 000 = 4 000 000." },
    fecha: F,
    entrada: { ca: 50000000, activite: "services" },
    esperado: { tpu: 4000000 },
  },
  {
    nombre: "Au-delà de 60 000 000 F",
    origen: { tipo: "recalculado", detalle: "Article 130 : hors TPU." },
    fecha: F,
    entrada: { ca: 70000000, activite: "commerce" },
    esperado: { regime: "Régime du réel", tpu: null },
  },
]);
