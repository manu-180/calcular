import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-salaire-net";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "200 000 F bruts, sans personne à charge",
    origen: {
      tipo: "recalculado",
      detalle:
        "CNSS 4 % = 8 000 ; AMU 5 % = 10 000. IRPP : 2 400 000 − 96 000 − 120 000 = 2 184 000 ; moins 28 % (611 520) = 1 572 480, arrondi 1 572 000 ; (1 572 000 − 900 000) × 3 % = 20 160 par an, 1 680 par mois. Net 200 000 − 18 000 − 1 680 = 180 320.",
    },
    fecha: F,
    entrada: { brut: 200000, personnes: 0, nonImposable: 0, autres: 0 },
    esperado: { cnss: 8000, amu: 10000, irpp: 1680, net: 180320, netAnnuel: 2163840 },
  },
  {
    nombre: "500 000 F, deux personnes à charge, indemnité et retenue",
    origen: {
      tipo: "recalculado",
      detalle:
        "CNSS 20 000 ; AMU 25 000. IRPP : 6 000 000 − 540 000 = 5 460 000 ; moins 28 % (1 528 800) et 240 000 = 3 691 200, arrondi 3 691 000 ; 63 000 + 69 100 = 132 100 par an, 11 008 par mois. Net 500 000 − 45 000 − 11 008 − 5 000 + 25 000 = 463 992.",
    },
    fecha: F,
    entrada: { brut: 500000, personnes: 2, nonImposable: 25000, autres: 5000 },
    esperado: { irpp: 11008, net: 463992 },
  },
  {
    nombre: "Salaire sous le SMIG : cotisations sur 52 500 F",
    origen: { tipo: "recalculado", detalle: "Assiette 52 500 : CNSS 2 100, AMU 2 625. IRPP nul. Net 40 000 − 4 725 = 35 275." },
    fecha: F,
    entrada: { brut: 40000, personnes: 0, nonImposable: 0, autres: 0 },
    esperado: { cnss: 2100, amu: 2625, irpp: 0, net: 35275 },
  },
  {
    nombre: "Retenues supérieures au salaire",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { brut: 100000, personnes: 0, nonImposable: 0, autres: 200000 },
    esperaError: true,
  },
]);
