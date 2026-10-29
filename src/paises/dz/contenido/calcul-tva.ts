import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.calcul-tva",
  h1: "Calcul de la TVA en Algérie : {{dz.tva-normal}} et {{dz.tva-reduit}}",
  title: "Calcul TVA Algérie {{anio}} : taux de {{dz.tva-normal}} et {{dz.tva-reduit}}",
  description:
    "Ajoutez ou retirez la TVA algérienne au taux normal de {{dz.tva-normal}} ou au taux réduit de {{dz.tva-reduit}}. Passez du hors taxe au TTC et inversement.",
  intro: [
    "La TVA algérienne compte deux taux : le taux normal de {{dz.tva-normal}}, prévu à l'article 21 du code des taxes sur le chiffre d'affaires, et le taux réduit de {{dz.tva-reduit}}, réservé aux opérations listées à l'article 23.",
    "Indiquez un montant, précisez s'il est hors taxe ou toutes taxes comprises, puis choisissez le taux.",
  ],
  comoSeCalcula: [
    "Ajouter la TVA : montant hors taxe × taux.",
    "Retirer la TVA : montant TTC ÷ (1 + taux) donne le hors taxe ; la différence est la TVA.",
    "Le résultat est arrondi au centime.",
  ],
  ejemplo: ["Une facture de 11 900 DA TTC au taux normal contient 1 900 DA de TVA : 11 900 ÷ 1,19 = 10 000 DA hors taxe."],
  faq: [
    {
      pregunta: "Quelles opérations relèvent du taux réduit de {{dz.tva-reduit}} ?",
      respuesta:
        "L'article 23 du code des taxes sur le chiffre d'affaires en dresse la liste. La loi de finances pour 2026 y a ajouté notamment la réhabilitation des anciens logements, les actes médicaux des établissements de santé et les prestations d'enseignement et de formation professionnelle des entreprises agréées.",
    },
    {
      pregunta: "Pourquoi diviser par 1,19 au lieu de retirer 19 % ?",
      respuesta:
        "Parce que la TVA se calcule sur le montant hors taxe. Sur 11 900 DA TTC, 10 000 DA sont hors taxe et 1 900 DA de TVA. Retirer 19 % de 11 900 DA donnerait un résultat faux.",
    },
    {
      pregunta: "Depuis quand le taux normal est-il de {{dz.tva-normal}} ?",
      respuesta: "Depuis la loi de finances pour 2017, qui l'a fixé à {{dz.tva-normal}} à l'article 21 du code des taxes sur le chiffre d'affaires.",
    },
  ],
  glosario: [
    { termino: "TVA", definicion: "Taxe sur la valeur ajoutée, facturée par les entreprises sur leurs ventes et reversée au Trésor." },
    { termino: "HT", definicion: "Hors taxe : le montant sans TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix payé par le client." },
  ],
});
