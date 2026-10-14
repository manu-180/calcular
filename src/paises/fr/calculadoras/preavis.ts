import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";

function ajouterMois(date: FechaISO, mois: number): FechaISO {
  const [a, m, j] = date.split("-").map(Number);
  const total = a * 12 + (m - 1) + mois;
  const annee = Math.floor(total / 12);
  const moisCible = (total % 12) + 1;
  const bissextile = (annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0;
  const dernierJour = [31, bissextile ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][moisCible - 1];
  const jour = Math.min(j, dernierJour);
  return `${annee}-${String(moisCible).padStart(2, "0")}-${String(jour).padStart(2, "0")}` as FechaISO;
}

export default definirCalculadora({
  id: "fr.preavis",
  mercado: "fr",
  concepto: "preaviso",
  slug: "preavis",
  estado: "publicado",
  requiere: {
    "fr.preavis-moins-2-ans": "numero",
    "fr.preavis-2-ans": "numero",
    "fr.preavis-handicap-max": "numero",
  },
  campos: [
    { id: "annees", tipo: "entero", etiqueta: "Ancienneté : années complètes", min: 0, max: 60, porDefecto: 3 },
    { id: "mois", tipo: "entero", etiqueta: "Ancienneté : mois en plus", min: 0, max: 11, porDefecto: 0 },
    { id: "notification", tipo: "fecha", etiqueta: "Date de présentation de la lettre de licenciement", porDefecto: "hoy" },
    { id: "salaire", tipo: "moneda", etiqueta: "Salaire mensuel brut", min: 0, requerido: false, ayuda: "Facultatif, pour estimer l'indemnité si le préavis n'est pas effectué." },
    { id: "handicap", tipo: "si-no", etiqueta: "Travailleur handicapé reconnu", porDefecto: false },
    { id: "fauteGrave", tipo: "si-no", etiqueta: "Licenciement pour faute grave ou lourde", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const anciennete = entrada.annees * 12 + entrada.mois;
    if (entrada.fauteGrave) {
      return { duree: 0, fin: null, indemnite: null, observaciones: ["En cas de faute grave ou lourde, il n'y a pas de préavis."] };
    }
    if (anciennete < 6) {
      return {
        duree: null,
        fin: null,
        indemnite: null,
        observaciones: ["Avant 6 mois d'ancienneté, la durée du préavis dépend de votre convention collective ou des usages de la profession."],
      };
    }
    let duree = anciennete < 24 ? valores["fr.preavis-moins-2-ans"] : valores["fr.preavis-2-ans"];
    if (entrada.handicap) duree = Math.min(duree * 2, valores["fr.preavis-handicap-max"]);
    if (!Number.isInteger(duree)) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    return {
      duree,
      fin: ajouterMois(entrada.notification, duree),
      indemnite: entrada.salaire === null ? null : redondear(entrada.salaire * duree),
      observaciones: ["Votre convention collective, votre contrat ou les usages peuvent prévoir un préavis plus long : il s'applique alors."],
    };
  },
  resultado: [
    { clave: "duree", etiqueta: "Durée du préavis", formato: "meses", destacada: true },
    { clave: "fin", etiqueta: "Fin du préavis (indicative)", formato: "fecha" },
    { clave: "indemnite", etiqueta: "Indemnité compensatrice si le préavis n'est pas effectué", formato: "moneda" },
  ],
});
