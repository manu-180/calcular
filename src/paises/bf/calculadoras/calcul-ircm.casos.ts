import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-ircm";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Dividendes de 1 000 000 F",
    origen: { tipo: "recalculado", detalle: "Article 140 : 12,5 % = 125 000. Net 875 000." },
    fecha: F,
    entrada: { nature: "dividendes", montant: 1000000, nouvelle: false },
    esperado: { taux: 12.5, impot: 125000, net: 875000 },
  },
  {
    nombre: "Dividendes d'une société nouvelle",
    origen: { tipo: "recalculado", detalle: "Article 141 : taux réduit de moitié, 6,25 % × 1 000 000 = 62 500." },
    fecha: F,
    entrada: { nature: "dividendes", montant: 1000000, nouvelle: true },
    esperado: { taux: 6.25, impot: 62500 },
  },
  {
    nombre: "Intérêts d'un compte de dépôt",
    origen: { tipo: "recalculado", detalle: "Article 140 : 25 % réduit de moitié, 12,5 % × 40 000 = 5 000." },
    fecha: F,
    entrada: { nature: "comptes", montant: 40000, nouvelle: null },
    esperado: { impot: 5000 },
  },
  {
    nombre: "Intérêts d'un prêt entre particuliers",
    origen: { tipo: "recalculado", detalle: "Article 140 : revenus des créances, 25 % × 200 000 = 50 000." },
    fecha: F,
    entrada: { nature: "creances", montant: 200000, nouvelle: null },
    esperado: { impot: 50000 },
  },
]);
