import { definirCasos } from "@/motor/calculo";
import calculadora from "./retenue-a-la-source";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Prestataire avec NIF, 500 000 F",
    origen: { tipo: "recalculado", detalle: "Article 99 du LPF : 5 % = 25 000 ; versé 475 000." },
    fecha: F,
    entrada: { montant: 500000, situation: "nif" },
    esperado: { retenue: 25000, net: 475000, taux: 5 },
  },
  {
    nombre: "Prestataire avec attestation de régularité fiscale",
    origen: { tipo: "recalculado", detalle: "3 % de 500 000 = 15 000." },
    fecha: F,
    entrada: { montant: 500000, situation: "attestation" },
    esperado: { retenue: 15000 },
  },
  {
    nombre: "Prestataire sans NIF",
    origen: { tipo: "recalculado", detalle: "20 % de 500 000 = 100 000." },
    fecha: F,
    entrada: { montant: 500000, situation: "autres" },
    esperado: { retenue: 100000, net: 400000 },
  },
]);
