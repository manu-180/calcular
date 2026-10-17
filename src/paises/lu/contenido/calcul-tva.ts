import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.calcul-tva",
  h1: "Calcul de la TVA au Luxembourg : 17, 14, 8 et 3 %",
  title: "Calcul TVA Luxembourg : ajouter ou extraire la TVA",
  description: "TVA luxembourgeoise au taux normal de {{lu.tva-normal}}, intermédiaire de {{lu.tva-intermediaire}}, réduit de {{lu.tva-reduit}} ou super-réduit de {{lu.tva-super-reduit}}.",
  intro: [
    "Au Luxembourg, la TVA s'élève à {{lu.tva-normal}} au taux normal. Il existe aussi un taux intermédiaire de {{lu.tva-intermediaire}}, un taux réduit de {{lu.tva-reduit}} et un taux super-réduit de {{lu.tva-super-reduit}}.",
    "Avec le calculateur, vous ajoutez la TVA à un montant ou vous l'extrayez d'un prix TVA comprise.",
  ],
  comoSeCalcula: [
    "Ajouter : le montant multiplié par le taux donne la TVA.",
    "Extraire : le prix TVA comprise divisé par 1,17 (ou 1,14, 1,08 et 1,03) donne le montant hors TVA.",
  ],
  ejemplo: [
    "Une facture de 1.000 euros hors TVA coûte 1.170 euros au taux normal.",
  ],
  faq: [
    { pregunta: "Quels biens relèvent des taux réduits ?", respuesta: "Ceux énumérés aux annexes A (taux réduit), B (taux super-réduit) et C (taux intermédiaire) de la loi TVA. Les autres opérations relèvent du taux normal." },
    { pregunta: "La baisse de 2023 s'applique-t-elle encore ?", respuesta: "Non. Elle valait du 1er janvier au 31 décembre 2023. Les taux de 17, 14 et 8 % s'appliquent de nouveau." },
    { pregunta: "Qui perçoit la TVA ?", respuesta: "L'Administration de l'enregistrement, des domaines et de la TVA (AED)." },
  ],
  glosario: [
    { termino: "AED", definicion: "Administration de l'enregistrement, des domaines et de la TVA." },
  ],
});
