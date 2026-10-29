import { definirCasos } from "@/motor/calculo";
import droitCommandePublique from "./droit-commande-publique";

const F = "2026-10-29";

export default definirCasos(droitCommandePublique, [
  {
    nombre: "Marché public de 20 000 000 F hors TVA",
    origen: { tipo: "recalculado", detalle: "5 % × 20 000 000 = 1 000 000." },
    fecha: F,
    entrada: { nature: "marche", montant: 20000000 },
    esperado: { droit: 1000000, taux: 5 },
  },
  {
    nombre: "Bon de commande de 900 000 F",
    origen: { tipo: "recalculado", detalle: "Montant inférieur à 1 000 000 : exempté." },
    fecha: F,
    entrada: { nature: "bon", montant: 900000 },
    esperado: { droit: 0, taux: 0 },
  },
  {
    nombre: "Bon de commande de 1 000 000 F",
    origen: { tipo: "recalculado", detalle: "Le montant n'est pas inférieur au seuil : 5 % × 1 000 000 = 50 000." },
    fecha: F,
    entrada: { nature: "bon", montant: 1000000 },
    esperado: { droit: 50000, taux: 5 },
  },
  {
    nombre: "Contrat privé de 5 000 000 F",
    origen: { tipo: "recalculado", detalle: "2 % × 5 000 000 = 100 000." },
    fecha: F,
    entrada: { nature: "prive", montant: 5000000 },
    esperado: { droit: 100000, taux: 2 },
  },
  {
    nombre: "Montant nul",
    origen: { tipo: "recalculado", detalle: "Un montant nul est refusé." },
    fecha: F,
    entrada: { nature: "marche", montant: 0 },
    esperaError: true,
  },
]);
