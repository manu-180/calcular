import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-salaire-net";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "500 000 F bruts, ligne du barème de la DGI",
    origen: {
      tipo: "oficial",
      url: "https://www.impots.cm/sites/default/files/documents/BAREME%20IRPP_DSSI%20final.pdf",
      detalle: "Barème indicatif de la DGI, ligne 500 000 : IRPP 38 500, CAC 3 850, CFC 5 000, CRTV 5 850. CNPS 4,2 % = 21 000 ; TDL 27 000 / 12 = 2 250. Net 500 000 − 76 450 = 423 550.",
    },
    fecha: F,
    entrada: { brut: 500000, salaireBase: null, nonImposable: 0, autres: 0 },
    esperado: { irpp: 38500, cac: 3850, cfc: 5000, rav: 5850, cnps: 21000, tdl: 2250, net: 423550 },
  },
  {
    nombre: "300 000 F bruts dont 250 000 F de base, avec allocations",
    origen: {
      tipo: "recalculado",
      detalle: "Année : 3 600 000 − 1 080 000 (30 %) − 151 200 (CNPS) − 500 000 = 1 868 800 ; IRPP 10 % = 186 880, soit 15 573 par mois ; CAC 1 557 ; CFC 3 000 ; CRTV 3 250 ; TDL 18 000 / 12 = 1 500 ; CNPS 12 600. Net 300 000 − 37 480 + 10 000 = 272 520.",
    },
    fecha: F,
    entrada: { brut: 300000, salaireBase: 250000, nonImposable: 10000, autres: 0 },
    esperado: { irpp: 15573, cac: 1557, tdl: 1500, net: 272520, totalRetenues: 37480 },
  },
  {
    nombre: "SMIG de 60 000 F : pas d'IRPP sous 62 000 F",
    origen: { tipo: "recalculado", detalle: "IRPP nul (article 81). CNPS 2 520, CFC 600, CRTV 750, TDL 0. Net 60 000 − 3 870 = 56 130." },
    fecha: F,
    entrada: { brut: 60000, salaireBase: null, nonImposable: 0, autres: 0 },
    esperado: { irpp: 0, cac: 0, cnps: 2520, cfc: 600, rav: 750, tdl: 0, net: 56130 },
  },
  {
    nombre: "1 500 000 F : plafonds CNPS et frais professionnels",
    origen: {
      tipo: "recalculado",
      detalle: "CNPS 4,2 % × 750 000 = 31 500. Année : 18 000 000 − 4 800 000 (plafond) − 378 000 − 500 000 = 12 322 000 ; IRPP 200 000 + 150 000 + 500 000 + 7 322 000 × 35 % = 3 412 700, soit 284 392 par mois ; CAC 28 439.",
    },
    fecha: F,
    entrada: { brut: 1500000, salaireBase: null, nonImposable: 0, autres: 0 },
    esperado: { cnps: 31500, irpp: 284392, cac: 28439, rav: 13000, tdl: 2500, cfc: 15000 },
  },
  {
    nombre: "Retenues supérieures au salaire",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { brut: 100000, salaireBase: null, nonImposable: 0, autres: 200000 },
    esperaError: true,
  },
]);
