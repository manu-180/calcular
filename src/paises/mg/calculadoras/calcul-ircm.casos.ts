import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-ircm";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "10 000 000 Ar de dividendes",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 01.04.04 : abattement 50 %, base 5 000 000, 20 % = 1 000 000. Net 9 000 000." },
    fecha: F,
    entrada: { nature: "dividendes", montant: 10000000 },
    esperado: { abattement: 5000000, base: 5000000, impot: 1000000, net: 9000000 },
  },
  {
    nombre: "Intérêts d'un placement de 2 345 678 Ar",
    origen: { tipo: "recalculado", url: CDI, detalle: "Base arrondie au millier : 2 345 000. 20 % = 469 000." },
    fecha: F,
    entrada: { nature: "interets", montant: 2345678 },
    esperado: { base: 2345000, impot: 469000 },
  },
  {
    nombre: "Ristournes de coopérative",
    origen: { tipo: "recalculado", url: CDI, detalle: "Taux réduit de 10 % : 10 % × 800 000 = 80 000." },
    fecha: F,
    entrada: { nature: "cooperative", montant: 800000 },
    esperado: { taux: 10, impot: 80000 },
  },
  {
    nombre: "Jetons de présence",
    origen: { tipo: "recalculado", url: CDI, detalle: "20 % × 3 000 000 = 600 000." },
    fecha: F,
    entrada: { nature: "administrateurs", montant: 3000000 },
    esperado: { impot: 600000, abattement: 0 },
  },
]);
