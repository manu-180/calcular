import { definirCasos } from "@/motor/calculo";
import taxeTransfertsArgent from "./taxe-transferts-argent";

const F = "2026-10-29";

export default definirCasos(taxeTransfertsArgent, [
  {
    nombre: "500 000 F transférés",
    origen: { tipo: "recalculado", detalle: "0,5 % × 500 000 = 2 500." },
    fecha: F,
    entrada: { montant: 500000 },
    esperado: { taxe: 2500, taux: 0.5 },
  },
  {
    nombre: "Exactement 2 000 000 F",
    origen: { tipo: "recalculado", detalle: "Le montant ne dépasse pas le seuil : 0,5 % × 2 000 000 = 10 000." },
    fecha: F,
    entrada: { montant: 2000000 },
    esperado: { taxe: 10000, taux: 0.5 },
  },
  {
    nombre: "3 000 000 F, au-dessus du seuil",
    origen: { tipo: "recalculado", detalle: "5 % × 3 000 000 = 150 000." },
    fecha: F,
    entrada: { montant: 3000000 },
    esperado: { taxe: 150000, taux: 5 },
  },
  {
    nombre: "Montant nul",
    origen: { tipo: "recalculado", detalle: "Un montant nul est refusé." },
    fecha: F,
    entrada: { montant: 0 },
    esperaError: true,
  },
]);
