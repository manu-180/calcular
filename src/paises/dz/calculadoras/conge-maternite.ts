import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OBS_ASSIETTE, paie, REQ_PAIE } from "../lib/irg";

function ajouterJours(date: string, jours: number): string {
  return new Date(Date.parse(`${date}T00:00:00Z`) + jours * 86400000).toISOString().slice(0, 10);
}

export default definirCalculadora({
  id: "dz.conge-maternite",
  mercado: "dz",
  concepto: "propio",
  slug: "conge-maternite",
  estado: "publicado",
  requiere: { ...REQ_PAIE, "dz.maternite": "mapa", "dz.maternite-taux": "numero", "dz.indemnite-diviseur": "numero" },
  campos: [
    { id: "terme", tipo: "fecha", etiqueta: "Date présumée de l'accouchement", min: "2000-01-01", porDefecto: "hoy" },
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 60000, ayuda: "Salaire soumis à cotisation, avant la retenue de sécurité sociale et l'IRG." },
  ],
  calcular(e, v, { redondear }) {
    if (e.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const m = v["dz.maternite"];
    const jours = m.duree * 7;
    const debut = ajouterJours(e.terme, -m["avant-max"] * 7);
    const p = paie(e.brut, false, v, redondear);
    const mensuel = redondear((p.net * v["dz.maternite-taux"]) / 100);
    const journaliere = redondear(mensuel / v["dz.indemnite-diviseur"]);
    return {
      duree: m.duree,
      debut,
      fin: ajouterJours(debut, jours - 1),
      finTerme: ajouterJours(e.terme, jours - 1),
      mensuel,
      journaliere,
      jours,
      total: redondear(journaliere * jours),
      observaciones: [
        `Le congé peut commencer plus tard que la date au plus tôt : il dure toujours ${m.duree} semaines consécutives. Les dates de fin indiquées correspondent à un départ au plus tôt et à un départ le jour de l'accouchement.`,
        OBS_ASSIETTE,
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Indemnité sur le congé", formato: "moneda", destacada: true },
    { clave: "mensuel", etiqueta: "Indemnité équivalente à un mois", formato: "moneda" },
    { clave: "journaliere", etiqueta: "Indemnité journalière", formato: "moneda" },
    { clave: "jours", etiqueta: "Jours indemnisés", formato: "dias" },
    { clave: "duree", etiqueta: "Durée du congé indemnisé", formato: "semanas" },
    { clave: "debut", etiqueta: "Début du congé au plus tôt", formato: "fecha" },
    { clave: "fin", etiqueta: "Fin du congé si départ au plus tôt", formato: "fecha" },
    { clave: "finTerme", etiqueta: "Fin du congé si départ à l'accouchement", formato: "fecha" },
  ],
});
