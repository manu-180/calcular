import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { anneesCompletes, iso, parties, plusJours, plusMois } from "../lib/dates";

export default definirCalculadora({
  id: "lu.preavis-licenciement",
  mercado: "lu",
  concepto: "preaviso",
  slug: "preavis-licenciement",
  estado: "publicado",
  requiere: { "lu.preavis-employeur": "mapa" },
  campos: [
    {
      id: "initiative",
      tipo: "opcion",
      etiqueta: "Qui met fin au contrat ?",
      opciones: [
        { valor: "employeur", etiqueta: "L'employeur (licenciement)" },
        { valor: "salarie", etiqueta: "Le salarié (démission)" },
      ],
      porDefecto: "employeur",
    },
    { id: "entree", tipo: "fecha", etiqueta: "Date d'entrée dans l'entreprise", min: "1970-01-01", porDefecto: "2020-03-01" },
    { id: "notification", tipo: "fecha", etiqueta: "Date de notification de la résiliation", min: "1970-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores) {
    if (entrada.notification < entrada.entree) throw new ErrorEntrada("La notification ne peut pas précéder l'entrée dans l'entreprise.", "notification");
    const anciennete = anneesCompletes(entrada.entree, entrada.notification);
    const delais = valores["lu.preavis-employeur"];
    const moisEmployeur = anciennete < 5 ? enMapa(delais, "moins-5") : anciennete < 10 ? enMapa(delais, "5-10") : enMapa(delais, "10-plus");
    const mois = entrada.initiative === "employeur" ? moisEmployeur : moisEmployeur / 2;
    const { a, m, j } = parties(entrada.notification);
    // Art. L. 124-3 (3) : le préavis court le 15 du mois si la notification est antérieure au 15, sinon le 1er du mois suivant.
    const debut = j < 15 ? iso(a, m, 15) : plusMois(iso(a, m, 1), 1);
    return {
      fin: plusJours(plusMois(debut, mois), -1),
      debut,
      mois,
      anciennete,
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "Fin du contrat (dernier jour du préavis)", formato: "fecha", destacada: true },
    { clave: "debut", etiqueta: "Début du préavis", formato: "fecha" },
    { clave: "mois", etiqueta: "Durée du préavis", formato: "meses" },
    { clave: "anciennete", etiqueta: "Ancienneté à la notification (années complètes)", formato: "anios" },
  ],
});
