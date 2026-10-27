import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-salaire-net";

const F = "2026-10-27";
const SANS = { primes: 0, logement: 0, fonction: 0, transport: 0, autres: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "200 000 F de salaire de base, sans charge",
    origen: {
      tipo: "recalculado",
      detalle:
        "CNSS 5,5 % × 200 000 = 11 000. Base IUTS 200 000 − 11 000 − abattement 25 % (50 000) = 139 000. IUTS 2 420 + 4 170 + 6 280 + 19 000 × 18,4 % (3 496) = 16 366. Net 200 000 − 11 000 − 16 366 = 172 634.",
    },
    fecha: F,
    entrada: { base: 200000, ...SANS, categorie: "autres", charges: 0 },
    esperado: { cnss: 11000, netImposable: 139000, iuts: 16366, net: 172634, netAnnuel: 2071608 },
  },
  {
    nombre: "Cadre avec primes, logement, transport et trois charges",
    origen: {
      tipo: "recalculado",
      detalle:
        "Brut 435 000 ; CNSS 23 925 (moins de 8 % de la base). Abattement 20 % de 300 000 = 60 000. Logement exonéré 60 000 ; transport exonéré 5 % × 411 075 = 20 553,75. Base 435 000 − 23 925 − 60 000 − 80 554 = 270 521. IUTS 44 560 − 12 % (5 347) = 39 213. Net 435 000 − 23 925 − 39 213 = 371 862.",
    },
    fecha: F,
    entrada: { base: 300000, primes: 50000, logement: 60000, fonction: 0, transport: 25000, categorie: "superieure", charges: 3, autres: 0 },
    esperado: { brut: 435000, cnss: 23925, netImposable: 270521, iuts: 39213, net: 371862 },
  },
  {
    nombre: "Salaire au-dessus du plafond CNSS",
    origen: {
      tipo: "recalculado",
      detalle:
        "CNSS plafonnée : 5,5 % × 800 000 = 44 000. Base 1 000 000 − 44 000 − 250 000 = 706 000. IUTS 2 420 + 4 170 + 6 280 + 9 200 + 17 360 + 456 000 × 25 % (114 000) = 153 430. Net 1 000 000 − 44 000 − 153 430 = 802 570.",
    },
    fecha: F,
    entrada: { base: 1000000, ...SANS, categorie: "autres", charges: 0 },
    esperado: { cnss: 44000, netImposable: 706000, iuts: 153430, net: 802570 },
  },
  {
    nombre: "Retenues supérieures au salaire",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { base: 50000, primes: 0, logement: 0, fonction: 0, transport: 0, categorie: "autres", charges: 0, autres: 100000 },
    esperaError: true,
  },
]);
