import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.ahv-beitraege-selbststaendige",
  h1: "Calcul des cotisations AVS des indépendants",
  title: "Cotisations AVS indépendants 2026 : barème dégressif",
  description: "Cotisations AVS/AI/APG des indépendants en 2026 : barème dégressif jusqu'à 60 500 francs, taux plein au-delà et cotisation minimale de {{ch.ahv-mindestbeitrag-selbststaendige}}.",
  intro: [
    "Les indépendants paient seuls leurs cotisations AVS, AI et APG. Pour les revenus plus bas, un taux réduit s'applique : c'est le barème dégressif.",
    "Les personnes qui gagnent très peu paient la cotisation minimale de {{ch.ahv-mindestbeitrag-selbststaendige}} par an.",
  ],
  comoSeCalcula: [
    "Le calculateur cherche la tranche du barème dans laquelle se situe votre revenu annuel et applique son taux à tout le revenu.",
    "À partir de 60 500 francs, le taux plein de 10 % s'applique : AVS 8,1 %, AI 1,4 % et APG 0,5 %.",
    "Si le revenu est inférieur à la tranche la plus basse, la cotisation minimale est due.",
  ],
  ejemplo: [
    "Pour un revenu de 50 000 francs, le taux est de 7,84 %. La cotisation annuelle s'élève à 3920 francs, environ 327 francs par mois.",
  ],
  faq: [
    { pregunta: "Quel revenu compte ?", respuesta: "La caisse de compensation fixe les cotisations définitives sur la base de la taxation fiscale. Elle ajoute au revenu net les cotisations personnelles AVS/AI/APG et déduit un intérêt sur le capital propre engagé dans l'entreprise." },
    { pregunta: "Y a-t-il des frais en plus ?", respuesta: "Oui. Les caisses de compensation perçoivent des contributions aux frais d'administration de 5 % au plus des cotisations." },
    { pregunta: "Dois-je aussi cotiser à l'assurance-chômage ?", respuesta: "Non. Les salariés et les employeurs sont tenus de cotiser à l'AC, pas le revenu d'une activité indépendante." },
  ],
  glosario: [
    { termino: "Barème dégressif", definicion: "Taux AVS/AI/APG plus bas pour les indépendants dont le revenu est modeste." },
    { termino: "Caisse de compensation", definicion: "Organe qui perçoit les cotisations AVS et verse les rentes." },
  ],
});
