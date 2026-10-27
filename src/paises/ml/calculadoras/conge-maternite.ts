import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "ml.conge-maternite",
  mercado: "ml",
  concepto: "propio",
  slug: "conge-maternite",
  estado: "publicado",
  requiere: { "ml.maternite-semaines": "mapa" },
  campos: [
    { id: "terme", tipo: "fecha", etiqueta: "Date présumée de l'accouchement", porDefecto: "hoy" },
    { id: "maladie", tipo: "si-no", etiqueta: "Maladie liée à la grossesse ou aux couches, attestée par un médecin", porDefecto: false },
  ],
  calcular(entrada, v) {
    const s = v["ml.maternite-semaines"];
    const debut = sumarDias(entrada.terme, -7 * s["avant"]);
    const semaines = s["total"] + (entrada.maladie ? s["prolongation-maladie"] : 0);
    const fin = sumarDias(debut, 7 * semaines - 1);
    return {
      debut,
      fin,
      semaines,
      observaciones: ["Si l'enfant naît avant la date présumée, le repos est prolongé pour que le congé atteigne quand même la durée totale."],
    };
  },
  resultado: [
    { clave: "debut", etiqueta: "Début du congé", formato: "fecha", destacada: true },
    { clave: "fin", etiqueta: "Fin du congé", formato: "fecha" },
    { clave: "semaines", etiqueta: "Durée du congé", formato: "semanas" },
  ],
});
