import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.allocations-familiales",
  mercado: "tg",
  concepto: "propio",
  slug: "allocations-familiales",
  estado: "publicado",
  requiere: { "tg.allocations-familiales": "mapa", "tg.allocations-enfants-max": "numero" },
  campos: [
    { id: "enfants", tipo: "entero", etiqueta: "Enfants à charge", min: 0, max: 20, porDefecto: 2 },
    { id: "mois", tipo: "entero", etiqueta: "Nombre de mois", min: 1, max: 12, porDefecto: 12 },
    { id: "grossesse", tipo: "si-no", etiqueta: "Grossesse en cours avec les trois examens prénatals", porDefecto: false },
  ],
  calcular(entrada, v) {
    const a = v["tg.allocations-familiales"];
    const retenus = Math.min(entrada.enfants, v["tg.allocations-enfants-max"]);
    const mensuel = retenus * a["par-enfant"];
    const familiales = mensuel * entrada.mois;
    const prenatales = entrada.grossesse ? a.prenatales : 0;
    return {
      total: familiales + prenatales,
      mensuel,
      retenus,
      familiales,
      prenatales,
      observaciones:
        entrada.enfants > retenus
          ? [`Les allocations sont versées pour ${v["tg.allocations-enfants-max"]} enfants de l'assuré au plus.`]
          : [],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total des allocations sur la période", formato: "moneda", destacada: true },
    { clave: "mensuel", etiqueta: "Allocations familiales par mois", formato: "moneda" },
    { clave: "retenus", etiqueta: "Enfants retenus", formato: "numero" },
    { clave: "prenatales", etiqueta: "Allocations prénatales", formato: "moneda", ocultarSiCero: true },
  ],
});
