import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { ajouterMois } from "../lib/datum";

export default definirCalculadora({
  id: "tn.periode-d-essai",
  mercado: "tn",
  concepto: "propio",
  slug: "periode-d-essai",
  estado: "publicado",
  requiere: {
    "tn.periode-essai": "mapa",
  },
  campos: [
    { id: "debut", tipo: "fecha", etiqueta: "Date d'entrée dans l'entreprise", porDefecto: "hoy" },
    { id: "duree", tipo: "entero", etiqueta: "Durée de l'essai prévue au contrat, en mois", min: 1, max: 6, porDefecto: 6 },
    { id: "renouvele", tipo: "si-no", etiqueta: "L'essai est renouvelé", porDefecto: false },
  ],
  calcular(entrada, v) {
    const e = v["tn.periode-essai"];
    if (entrada.duree < 1 || entrada.duree > e["mois-max"]) {
      throw new ErrorEntrada(`La période d'essai ne peut pas dépasser ${e["mois-max"]} mois.`, "duree");
    }
    const finInitiale = ajouterMois(entrada.debut, entrada.duree);
    const fin = entrada.renouvele ? ajouterMois(entrada.debut, entrada.duree * (1 + e["renouvellements"])) : finInitiale;
    return {
      fin,
      finInitiale,
      prevenirAvant: sumarDias(fin, -e["preavis-jours"]),
      dureeTotale: entrada.renouvele ? entrada.duree * (1 + e["renouvellements"]) : entrada.duree,
      observaciones: [
        "Le renouvellement se fait une seule fois, pour la même durée. Un contrat à durée déterminée ne peut pas prévoir de période d'essai.",
      ],
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "Fin de la période d'essai", formato: "fecha", destacada: true },
    { clave: "finInitiale", etiqueta: "Fin de l'essai initial", formato: "fecha" },
    { clave: "prevenirAvant", etiqueta: "Pour y mettre fin, prévenir par écrit au plus tard le", formato: "fecha" },
    { clave: "dureeTotale", etiqueta: "Durée totale de l'essai", formato: "meses" },
  ],
});
