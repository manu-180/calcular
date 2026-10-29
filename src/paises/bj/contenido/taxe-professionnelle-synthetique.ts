import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.taxe-professionnelle-synthetique",
  h1: "Taxe professionnelle synthétique (TPS) {{anio}} au Bénin",
  title: "Taxe professionnelle synthétique {{anio}} : calcul TPS au Bénin",
  description:
    "Calculez la TPS d'un petit commerce béninois : {{bj.tps-taux}} des recettes annuelles, minimum de {{bj.tps-minimum}} et redevance de {{bj.tps-redevance-ortb}} par établissement.",
  intro: [
    "La taxe professionnelle synthétique, au taux de {{bj.tps-taux}} des recettes, est l'impôt unique des petites entreprises dont le chiffre d'affaires reste sous un seuil fixé par arrêté du ministre chargé des finances. Elle remplace l'impôt sur les bénéfices d'affaires, la patente, la licence et le versement patronal sur salaires.",
    "Saisissez les recettes de l'année et le nombre d'établissements. Le résultat donne la taxe, la redevance et le total à régler.",
  ],
  comoSeCalcula: [
    "L'impôt est de {{bj.tps-taux}} des recettes annuelles, sans pouvoir descendre sous {{bj.tps-minimum}} (article 183, paragraphes 1 et 2 du Code général des impôts).",
    "Une redevance de {{bj.tps-redevance-ortb}} au profit de la radiodiffusion et télévision s'ajoute à l'impôt.",
    "La taxe est due par commune et par établissement : un commerçant qui exploite deux points de vente dans deux communes paie deux fois.",
    "Le paiement passe par deux acomptes, dans les dix premiers jours de février et de juin, calculés sur l'impôt de l'année précédente. Le solde est réglé au plus tard le 30 avril avec la déclaration (articles 184 et 185).",
  ],
  ejemplo: [
    "Une boutique encaisse 4 000 000 F dans l'année. La taxe est de 200 000 F et la redevance de 4 000 F, soit 204 000 F. Avec 150 000 F de recettes seulement, 5 % ne donnent que 7 500 F : le minimum de 10 000 F s'applique et le total est de 14 000 F.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux de la TPS au Bénin ?",
      respuesta: "L'article 183 du Code général des impôts fixe le taux à {{bj.tps-taux}} des recettes annuelles, avec un minimum de {{bj.tps-minimum}}.",
    },
    {
      pregunta: "Quels impôts la TPS remplace-t-elle ?",
      respuesta:
        "Selon l'article 178, elle est libératoire de l'impôt sur les bénéfices d'affaires, de la contribution des patentes, de la contribution des licences et du versement patronal sur salaires.",
    },
    {
      pregunta: "Quand déclarer et payer ?",
      respuesta: "La déclaration de l'exercice précédent se dépose au plus tard le 30 avril (article 184). Les acomptes sont versés dans les dix premiers jours de février et de juin (article 185).",
    },
  ],
  glosario: [
    { termino: "Recettes annuelles", definicion: "Les sommes encaissées sur l'exercice par un établissement, base de la TPS." },
    { termino: "Établissement", definicion: "Un lieu d'exploitation dans une commune. La taxe est due pour chacun." },
    { termino: "Acompte provisionnel", definicion: "Un versement d'avance calculé sur l'impôt de l'année précédente, payé en février et en juin." },
  ],
});
