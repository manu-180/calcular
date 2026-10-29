import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "bf.conge-maternite",
  mercado: "bf",
  concepto: "propio",
  slug: "conge-maternite",
  estado: "publicado",
  requiere: { "bf.maternite-semaines": "mapa" },
  campos: [
    { id: "terme", tipo: "fecha", etiqueta: "Date présumée de l'accouchement", porDefecto: "hoy" },
    {
      id: "avant",
      tipo: "entero",
      etiqueta: "Semaines de congé avant l'accouchement",
      min: 2,
      max: 8,
      porDefecto: 4,
      ayuda: "Entre 4 et 8 semaines, ou 2 semaines sur avis d'un médecin attesté par un certificat médical.",
    },
  ],
  calcular(entrada, v) {
    const s = v["bf.maternite-semaines"];
    if (entrada.avant > s["avant-max"]) throw new ErrorEntrada(`Le congé commence au plus tôt ${s["avant-max"]} semaines avant l'accouchement.`, "avant");
    if (entrada.avant < 2) throw new ErrorEntrada("Le congé commence au plus tard 2 semaines avant l'accouchement, avec un certificat médical.", "avant");
    const debut = sumarDias(entrada.terme, -7 * entrada.avant);
    const reprise = sumarDias(debut, 7 * s.total);
    const observaciones =
      entrada.avant < s["avant-min"]
        ? [`Partir moins de ${s["avant-min"]} semaines avant le terme demande l'avis d'un médecin attesté par un certificat médical.`]
        : [];
    return {
      debut,
      fin: sumarDias(reprise, -1),
      reprise,
      semainesApres: s.total - entrada.avant,
      total: s.total,
      prolongation: s.prolongation,
      observaciones,
    };
  },
  resultado: [
    { clave: "debut", etiqueta: "Début du congé", formato: "fecha" },
    { clave: "fin", etiqueta: "Dernier jour du congé", formato: "fecha", destacada: true },
    { clave: "reprise", etiqueta: "Reprise du travail", formato: "fecha" },
    { clave: "semainesApres", etiqueta: "Semaines après l'accouchement", formato: "semanas" },
    { clave: "total", etiqueta: "Durée du congé", formato: "semanas" },
    { clave: "prolongation", etiqueta: "Prolongation possible en cas de maladie liée à la grossesse", formato: "semanas" },
  ],
});
