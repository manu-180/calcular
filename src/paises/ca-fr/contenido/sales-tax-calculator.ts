import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.sales-tax-calculator",
  h1: "Calculatrice TPS et TVQ (taxes de vente au Canada)",
  title: "Calculatrice TPS TVQ : ajouter ou retirer les taxes",
  description: "Ajoutez ou retirez la TPS et la TVQ au Québec, ou la TVH et la TVP ailleurs au Canada. TPS de {{ca.gst-hst@qc}} et TVQ de {{ca.pst@qc}}. Taux officiels de l'ARC.",
  intro: [
    "Choisissez votre province ou votre territoire, puis inscrivez un prix pour ajouter les taxes, ou un total pour les retirer.",
    "Les taux viennent du tableau des taux de TPS/TVH et de TVP par province publié par l'Agence du revenu du Canada.",
  ],
  comoSeCalcula: [
    "Toutes les provinces et tous les territoires appliquent la TPS fédérale de {{ca.gst-hst@ab}}. Cinq provinces la combinent avec leur propre taxe sous forme de TVH : {{ca.gst-hst@on}} en Ontario, {{ca.gst-hst@ns}} en Nouvelle-Écosse et {{ca.gst-hst@nb}} au Nouveau-Brunswick, à Terre-Neuve-et-Labrador et à l'Île-du-Prince-Édouard.",
    "Le Québec ({{ca.pst@qc}} de TVQ), la Colombie-Britannique ({{ca.pst@bc}}), le Manitoba ({{ca.pst@mb}}) et la Saskatchewan ({{ca.pst@sk}}) ajoutent leur propre taxe de vente à la TPS.",
    "Pour retirer les taxes d'un total, on divise le total par 1 plus le taux combiné.",
  ],
  ejemplo: [
    "Un achat de 100 $ au Québec coûte 114,98 $ avec les taxes : 5 $ de TPS et 9,98 $ de TVQ. En Ontario, il coûte 113 $ avec la TVH.",
  ],
  faq: [
    {
      pregunta: "Quelle est la différence entre la TPS et la TVH?",
      respuesta: "La TPS est la taxe de vente fédérale. La TVH est une taxe unique qui combine la TPS et la partie provinciale dans les provinces qui ont harmonisé leur taxe.",
    },
    {
      pregunta: "Quelles régions n'ont pas de taxe de vente provinciale?",
      respuesta: "L'Alberta, les Territoires du Nord-Ouest, le Nunavut et le Yukon n'appliquent que la TPS de {{ca.gst-hst@ab}}.",
    },
    {
      pregunta: "Quand la TVH a-t-elle changé en Nouvelle-Écosse?",
      respuesta: "Elle est passée à {{ca.gst-hst@ns}} le 1er avril 2025.",
    },
    {
      pregunta: "Tous les produits sont-ils taxables?",
      respuesta: "Non. Certains biens et services sont détaxés ou exonérés, et les règles dépendent du lieu de la fourniture et de l'acheteur. Pour un article précis, vérifiez auprès de l'ARC ou de votre province.",
    },
  ],
  glosario: [
    { termino: "TPS", definicion: "Taxe sur les produits et services, la taxe de vente fédérale." },
    { termino: "TVQ", definicion: "Taxe de vente du Québec, qui s'ajoute à la TPS au Québec." },
    { termino: "TVH", definicion: "Taxe de vente harmonisée : la TPS et la taxe provinciale perçues ensemble comme une seule taxe." },
  ],
});
