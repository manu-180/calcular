import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import { ajouterMois } from "../lib/datum";

export default definirCalculadora({
  id: "tn.delai-de-preavis",
  mercado: "tn",
  concepto: "preaviso",
  slug: "delai-de-preavis",
  estado: "publicado",
  requiere: {
    "tn.preavis": "numero",
  },
  campos: [
    { id: "notification", tipo: "fecha", etiqueta: "Date de réception de la lettre recommandée", porDefecto: "hoy" },
    { id: "salaire", tipo: "moneda", etiqueta: "Salaire mensuel brut", min: 0, porDefecto: 1500, ayuda: "Pour estimer l'indemnité due si le préavis n'est pas respecté." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire < 0) throw new ErrorEntrada("Indiquez un salaire positif.", "salaire");
    const mois = v["tn.preavis"];
    const fin = ajouterMois(entrada.notification, mois);
    const jours = diasEntre(entrada.notification, fin);
    return {
      fin,
      jours,
      secondeMoitie: sumarDias(entrada.notification, Math.ceil(jours / 2)),
      indemnite: redondear(entrada.salaire * mois),
      observaciones: [
        "Délai minimum du code du travail pour un contrat à durée indéterminée. Une convention collective, le contrat ou l'usage peuvent prévoir un préavis plus long.",
      ],
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "Fin du préavis", formato: "fecha", destacada: true },
    { clave: "jours", etiqueta: "Durée du préavis", formato: "dias" },
    { clave: "secondeMoitie", etiqueta: "Absence autorisée pour chercher un emploi à partir du", formato: "fecha" },
    { clave: "indemnite", etiqueta: "Indemnité si le préavis n'est pas respecté", formato: "moneda" },
  ],
});
