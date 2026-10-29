import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.calcul-tva",
  h1: "Calcul de la TVA au Burkina Faso",
  title: "Calcul TVA Burkina Faso : HT, TTC et taux de {{bf.tva-normal}}",
  description:
    "Ajoutez ou retirez la TVA d'un prix : taux normal de {{bf.tva-normal}} et taux réduit de {{bf.tva-reduit}} pour l'hébergement et la restauration agréés.",
  intro: [
    "La taxe sur la valeur ajoutée (TVA) s'ajoute au prix hors taxes de la plupart des ventes et des services.",
    "Indiquez un montant et choisissez le sens du calcul. Vous obtenez le hors taxes, la TVA et le toutes taxes comprises.",
  ],
  comoSeCalcula: [
    "Du HT au TTC : TVA = montant HT × taux. TTC = HT + TVA.",
    "Du TTC au HT : HT = TTC ÷ (1 + taux). La TVA est la différence.",
    "Les fractions de franc de la TVA sont arrondies au franc inférieur.",
  ],
  ejemplo: ["Une facture de 100 000 F HT au taux normal : 18 000 F de TVA, soit 118 000 F TTC."],
  faq: [
    {
      pregunta: "Quel est le taux normal de la TVA ?",
      respuesta: "{{bf.tva-normal}}. Il s'applique à toutes les opérations imposables qui ne relèvent pas du taux réduit.",
    },
    {
      pregunta: "Qui bénéficie du taux réduit ?",
      respuesta: "Le taux de {{bf.tva-reduit}} vaut pour les prestations d'hébergement et de restauration des hôtels, restaurants et organismes assimilés agréés.",
    },
    {
      pregunta: "Comment retrouver le prix hors taxes ?",
      respuesta: "Divisez le prix TTC par 1,18 au taux normal. Le calculateur le fait pour vous en choisissant « Passer du TTC au HT ».",
    },
  ],
  glosario: [
    { termino: "HT", definicion: "Hors taxes : le prix avant la TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix payé par le client, TVA incluse." },
  ],
});
