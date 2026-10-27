import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";

// Anniversaire à un âge donné ; un 29 février tombe le 28 février les années non bissextiles.
function anniversaire(naissance: FechaISO, age: number): FechaISO {
  const [a, m, j] = naissance.split("-").map(Number);
  const annee = a + age;
  const bissextile = (annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0;
  const jour = m === 2 && j === 29 && !bissextile ? 28 : j;
  return `${annee}-${String(m).padStart(2, "0")}-${String(jour).padStart(2, "0")}` as FechaISO;
}

function moisEntre(debut: FechaISO, fin: FechaISO): number {
  const [a1, m1, j1] = debut.split("-").map(Number);
  const [a2, m2, j2] = fin.split("-").map(Number);
  return (a2 - a1) * 12 + (m2 - m1) - (j2 < j1 ? 1 : 0);
}

export default definirCalculadora({
  id: "bf.age-de-depart-a-la-retraite",
  mercado: "bf",
  concepto: "propio",
  slug: "age-de-depart-a-la-retraite",
  estado: "publicado",
  requiere: { "bf.age-retraite": "mapa", "bf.retraite-cotisation-min": "numero" },
  campos: [
    { id: "naissance", tipo: "fecha", etiqueta: "Date de naissance", porDefecto: "hoy" },
    { id: "categorie", tipo: "opcion-dato", dato: "bf.age-retraite", etiqueta: "Catégorie professionnelle", porDefecto: "employe" },
  ],
  calcular(entrada, v, { fecha }) {
    if (entrada.naissance > fecha) throw new ErrorEntrada("La date de naissance ne peut pas être dans le futur.", "naissance");
    const age = enMapa(v["bf.age-retraite"], entrada.categorie);
    const depart = anniversaire(entrada.naissance, age);
    const restant = Math.max(moisEntre(fecha, depart), 0);
    return {
      depart,
      age,
      annees: Math.floor(restant / 12),
      mois: restant % 12,
      cotisationMin: v["bf.retraite-cotisation-min"],
      statut: depart <= fecha ? "L'âge de départ à la retraite est atteint." : "L'âge de départ à la retraite n'est pas encore atteint.",
    };
  },
  resultado: [
    { clave: "depart", etiqueta: "Date à laquelle vous atteignez l'âge de la retraite", formato: "fecha", destacada: true },
    { clave: "age", etiqueta: "Âge de départ pour votre catégorie", formato: "anios" },
    { clave: "statut", etiqueta: "Situation", formato: "texto" },
    { clave: "annees", etiqueta: "Années restantes", formato: "anios" },
    { clave: "mois", etiqueta: "Et mois", formato: "meses" },
    { clave: "cotisationMin", etiqueta: "Durée minimale de cotisation pour la pension", formato: "anios" },
  ],
});
