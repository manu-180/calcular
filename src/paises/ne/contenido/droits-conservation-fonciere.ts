import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ne.droits-conservation-fonciere",
  "h1": "Droits de publicité foncière au Niger : mutation, hypothèque, titre",
  "title": "Droits fonciers Niger {{anio}} : mutation et hypothèque",
  "description": "Calculez les droits de la conservation foncière au Niger : mutation à {{ne.foncier-taux[mutation-totale]}}, hypothèque à {{ne.foncier-taux[hypotheque]}}, droits fixes dès {{ne.foncier-fixes[certificat]}}.",
  "intro": [
    "Acheter un terrain titré, le faire immatriculer ou inscrire une hypothèque coûte des droits de publicité foncière. La mutation totale de propriété paie {{ne.foncier-taux[mutation-totale]}} du prix du terrain. L'hypothèque paie {{ne.foncier-taux[hypotheque]}} des sommes convenues.",
    "Choisissez la formalité et saisissez la base. Pour les formalités à droit fixe, aucun montant n'est demandé."
  ],
  "comoSeCalcula": [
    "Ces droits sont perçus au profit du budget national, au titre de la contribution aux frais généraux de l'administration. Ils sont fixés par l'article 1041 du Code général des impôts.",
    "L'immatriculation lors de la concession définitive paie {{ne.foncier-taux[immatriculation-habitat]}} en zone d'habitat et {{ne.foncier-taux[immatriculation-activite]}} en zone industrielle ou commerciale, sur la somme du prix du terrain et de la mise en valeur.",
    "Le morcellement paie {{ne.foncier-taux[morcellement]}} du prix du terrain issu du morcellement. Le droit de superficie paie {{ne.foncier-taux[superficie]}} de la mise en valeur constatée.",
    "Certaines formalités ont un droit fixe : {{ne.foncier-fixes[mainlevee]}} pour la mainlevée d'hypothèque, {{ne.foncier-fixes[certificat]}} pour un certificat de propriété sur imprimé."
  ],
  "ejemplo": [
    "Pour une mutation totale sur un terrain vendu 10 000 000 F, le droit est de 100 000 F. Pour une hypothèque de 20 000 000 F, il est de 300 000 F. Pour une mainlevée, il est de 50 000 F quel que soit le montant."
  ],
  "faq": [
    {
      "pregunta": "Quel texte fixe ces droits ?",
      "respuesta": "L'article 1041 du Code général des impôts, dans sa rédaction de l'ordonnance n° 2025-44 portant loi de finances 2026, applicable depuis le {{ne.foncier-taux#desde}}."
    },
    {
      "pregunta": "Dans quel délai faut-il payer le droit d'hypothèque ?",
      "respuesta": "Les droits sont exigibles dans un délai de dix jours francs à compter de la date de l'acte d'affectation hypothécaire."
    },
    {
      "pregunta": "Combien coûte un duplicata de titre foncier ?",
      "respuesta": "Un droit fixe de {{ne.foncier-fixes[duplicata]}}."
    }
  ],
  "glosario": [
    {
      "termino": "Mutation",
      "definicion": "Le changement de propriétaire d'un bien."
    },
    {
      "termino": "Immatriculation",
      "definicion": "L'inscription d'un terrain au livre foncier, qui donne un titre foncier."
    },
    {
      "termino": "Mainlevée",
      "definicion": "L'acte qui libère un bien d'une hypothèque une fois la dette payée."
    }
  ]
});
