import { definirCalculadora } from "@/motor/calculo";
import { nomDuMois } from "../lib/dates";
import { variationEntre } from "../lib/ipcn";

export default definirCalculadora({
  id: "lu.calcul-inflation",
  mercado: "lu",
  concepto: "inflacion",
  slug: "calcul-inflation",
  estado: "publicado",
  requiere: { "lu.ipcn": "serie" },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant en euros", min: 0, porDefecto: 1000 },
    { id: "de", tipo: "fecha", etiqueta: "Mois du montant d'origine", min: "2000-01-01", porDefecto: "2020-01-01", ayuda: "C'est l'indice de ce mois qui compte, le jour ne joue aucun rôle." },
    { id: "a", tipo: "fecha", etiqueta: "Mois vers lequel convertir", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = variationEntre(valores["lu.ipcn"], entrada.de, entrada.a, "de");
    return {
      ajuste: redondear(entrada.montant * v.facteur),
      difference: redondear(entrada.montant * v.facteur - entrada.montant),
      total: v.total,
      annuelle: v.annuelle,
      moisDepart: nomDuMois(v.moisDepart),
      indiceDepart: v.indiceDepart,
      moisFin: nomDuMois(v.moisFin),
      indiceFin: v.indiceFin,
      observaciones: v.notes,
    };
  },
  resultado: [
    { clave: "ajuste", etiqueta: "Montant au même pouvoir d'achat", formato: "moneda", destacada: true },
    { clave: "difference", etiqueta: "Différence due à l'inflation", formato: "moneda" },
    { clave: "total", etiqueta: "Inflation sur la période", formato: "porcentaje", decimales: 2 },
    { clave: "annuelle", etiqueta: "Inflation sur un an au mois de fin", formato: "porcentaje", decimales: 1 },
    { clave: "moisDepart", etiqueta: "Mois de départ", formato: "texto" },
    { clave: "indiceDepart", etiqueta: "IPCN du mois de départ", formato: "numero", decimales: 2 },
    { clave: "moisFin", etiqueta: "Mois de fin", formato: "texto" },
    { clave: "indiceFin", etiqueta: "IPCN du mois de fin", formato: "numero", decimales: 2 },
  ],
});
