import { definirCasos } from "@/motor/calculo";
import calculadora from "./droits-enregistrement-cession";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Voiture d'occasion entre particuliers à 30 000 000 Ar",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 02.02.42 : 5 % × 30 000 000 = 1 500 000." },
    fecha: F,
    entrada: { bien: "meubles", prix: 30000000 },
    esperado: { droits: 1500000, taux: 5 },
  },
  {
    nombre: "Camionnette à 60 000 000 Ar",
    origen: { tipo: "recalculado", url: CDI, detalle: "Taux réduit de 2 % : 1 200 000." },
    fecha: F,
    entrada: { bien: "utilitaire", prix: 60000000 },
    esperado: { droits: 1200000 },
  },
  {
    nombre: "Cession de parts sociales pour 100 000 000 Ar",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 02.02.43 : 0,5 % × 100 000 000 = 500 000." },
    fecha: F,
    entrada: { bien: "parts", prix: 100000000 },
    esperado: { droits: 500000, taux: 0.5 },
  },
  {
    nombre: "Fonds de commerce",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 02.02.22 : 5 % × 40 000 000 = 2 000 000." },
    fecha: F,
    entrada: { bien: "fonds", prix: 40000000 },
    esperado: { droits: 2000000 },
  },
]);
