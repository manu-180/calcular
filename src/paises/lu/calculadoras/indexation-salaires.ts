import { definirCalculadora } from "@/motor/calculo";
import { nomDuMois } from "../lib/dates";

export default definirCalculadora({
  id: "lu.indexation-salaires",
  mercado: "lu",
  concepto: "propio",
  slug: "indexation-salaires",
  estado: "publicado",
  requiere: { "lu.ipcn-moyenne": "serie", "lu.cote-echeance": "numero", "lu.nombre-indice": "numero" },
  campos: [{ id: "salaire", tipo: "moneda", etiqueta: "Salaire brut mensuel actuel", min: 0, porDefecto: 5000 }],
  calcular(entrada, valores, { redondear }) {
    const moyenne = valores["lu.ipcn-moyenne"];
    const cote = valores["lu.cote-echeance"];
    // La cote suivante est la cote actuelle majorée de 2,5 % et tronquée au centième : STATEC publie
    // 988,75 → 1013,46 → 1038,79, ce qu'un arrondi ordinaire ne donne pas.
    const prochaineCote = Math.floor(cote * 1.025 * 100 + 1e-6) / 100;
    const reste = Math.max((prochaineCote / moyenne.valor - 1) * 100, 0);
    return {
      apres: redondear(entrada.salaire * 1.025),
      hausse: redondear(entrada.salaire * 0.025),
      prochaineCote,
      moyenne: moyenne.valor,
      mois: nomDuMois(moyenne.fecha),
      reste,
      indice: valores["lu.nombre-indice"],
      base100: redondear((entrada.salaire * 100) / valores["lu.nombre-indice"]),
      observaciones: [
        "La tranche indiciaire tombe lorsque la moyenne semestrielle de l'IPCN atteint la cote d'échéance suivante. STATEC publie chaque mois l'indice et les échéances de l'échelle mobile.",
      ],
    };
  },
  resultado: [
    { clave: "apres", etiqueta: "Salaire après la prochaine tranche indiciaire", formato: "moneda", destacada: true },
    { clave: "hausse", etiqueta: "Hausse mensuelle (2,5 %)", formato: "moneda" },
    { clave: "reste", etiqueta: "Hausse de la moyenne encore nécessaire", formato: "porcentaje", decimales: 2 },
    { clave: "moyenne", etiqueta: "Moyenne semestrielle de l'IPCN", formato: "numero", decimales: 2 },
    { clave: "mois", etiqueta: "Dernier mois publié", formato: "texto" },
    { clave: "prochaineCote", etiqueta: "Prochaine cote d'échéance", formato: "numero", decimales: 2 },
    { clave: "indice", etiqueta: "Nombre indice applicable", formato: "numero", decimales: 2 },
    { clave: "base100", etiqueta: "Salaire à l'indice 100", formato: "moneda" },
  ],
});
