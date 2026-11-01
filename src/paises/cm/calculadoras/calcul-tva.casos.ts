import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "Exemple du CGI : 10 000 000 F HT à 19,25 %",
    origen: {
      tipo: "oficial",
      url: "https://www.impots.cm/sites/default/files/documents/CODE%20GENERAL%20DES%20IMPOTS%202026%20SITE%20DGI%20VERSION%20FRANCAISE.pdf",
      detalle: "Illustration de l'instruction reprise au CGI 2026 : TVA totale du marché 10 000 000 × 19,25 % = 1 925 000 F (17,5 % + 10 % de CAC).",
    },
    fecha: F,
    entrada: { operation: "ht-ttc", montant: 10000000, taux: "general" },
    esperado: { tauxGlobal: 19.25, tva: 1750000, cac: 175000, taxes: 1925000, ttc: 11925000 },
  },
  {
    nombre: "Retirer la TVA de 119 250 F TTC",
    origen: { tipo: "recalculado", detalle: "119 250 / 1,1925 = 100 000 HT ; TVA 17 500 ; CAC 1 750." },
    fecha: F,
    entrada: { operation: "ttc-ht", montant: 119250, taux: "general" },
    esperado: { ht: 100000, tva: 17500, cac: 1750, ttc: 119250 },
  },
  {
    nombre: "Taux réduit : 11 % avec les CAC",
    origen: { tipo: "recalculado", detalle: "10 % + 10 % de 10 % = 11 %. 1 000 000 HT : TVA 100 000, CAC 10 000." },
    fecha: F,
    entrada: { operation: "ht-ttc", montant: 1000000, taux: "reduit" },
    esperado: { tauxGlobal: 11, taxes: 110000, ttc: 1110000 },
  },
]);
