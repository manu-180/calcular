import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "100 000 Ar HT au taux normal",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 06.01.12 : 20 %. TVA 20 000, TTC 120 000." },
    fecha: F,
    entrada: { operation: "ajouter", montant: 100000, taux: "normal" },
    esperado: { tva: 20000, ttc: 120000, taux: 20 },
  },
  {
    nombre: "Retirer la TVA de 120 000 Ar TTC",
    origen: { tipo: "recalculado", url: CDI, detalle: "120 000 / 1,20 = 100 000 HT, TVA 20 000." },
    fecha: F,
    entrada: { operation: "retirer", montant: 120000, taux: "normal" },
    esperado: { ht: 100000, tva: 20000 },
  },
  {
    nombre: "Bouteille de gaz butane à 55 000 Ar HT",
    origen: { tipo: "recalculado", url: CDI, detalle: "Taux réduit de 10 % : 5 500 de TVA, 60 500 TTC." },
    fecha: F,
    entrada: { operation: "ajouter", montant: 55000, taux: "butane" },
    esperado: { tva: 5500, ttc: 60500 },
  },
  {
    nombre: "Exportation",
    origen: { tipo: "recalculado", url: CDI, detalle: "Taux de 0 %." },
    fecha: F,
    entrada: { operation: "ajouter", montant: 1000000, taux: "export" },
    esperado: { tva: 0, ttc: 1000000 },
  },
]);
