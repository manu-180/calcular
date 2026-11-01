import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.impot-sur-les-societes",
  h1: "Impôt sur les sociétés (IS) {{anio}} au Bénin",
  title: "Impôt sur les sociétés {{anio}} au Bénin : taux et minimum",
  description:
    "Calculez l'IS d'une société béninoise : taux de {{bj.is-taux[general]}} ou {{bj.is-taux[industrie-enseignement]}}, minimum de perception sur les produits et plancher de {{bj.impot-minimum-plancher}}.",
  intro: [
    "L'impôt sur les sociétés frappe le bénéfice des personnes morales au taux de {{bj.is-taux[general]}} dans le cas général. Au Bénin, le montant payé ne peut jamais tomber sous un minimum de perception, même quand l'exercice est déficitaire.",
    "Indiquez le bénéfice imposable, les produits encaissables, l'activité et le secteur. Vous voyez l'impôt calculé, le minimum et le montant retenu.",
  ],
  comoSeCalcula: [
    "Le taux est de {{bj.is-taux[general]}} du bénéfice imposable, ramené à {{bj.is-taux[industrie-enseignement]}} pour les sociétés industrielles hors industries extractives et pour les écoles privées (article 46).",
    "Le minimum de perception est de {{bj.is-minimum-taux[general]}} des produits encaissables, de {{bj.is-minimum-taux[btp]}} dans le bâtiment et les travaux publics et de {{bj.is-minimum-taux[immobilier]}} pour les sociétés à prépondérance immobilière (article 47).",
    "Dans tous les cas, l'impôt ne peut être inférieur à {{bj.impot-minimum-plancher}}. On retient le plus élevé des trois montants, puis on ajoute la redevance de 4 000 F pour la radiodiffusion et télévision, payable avec l'acompte du 10 mars.",
  ],
  ejemplo: [
    "Une société de commerce dégage 30 000 000 F de bénéfice pour 200 000 000 F de produits. Le taux de 30 % donne 9 000 000 F, bien au-dessus du minimum de 2 000 000 F : elle règle 9 000 000 F plus 4 000 F de redevance. Une usine qui gagne 1 000 000 F pour 100 000 000 F de produits calcule 250 000 F à 25 %, mais le minimum de 1 000 000 F l'emporte.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux de l'impôt sur les sociétés au Bénin ?",
      respuesta: "L'article 46 du Code général des impôts fixe {{bj.is-taux[general]}} du bénéfice imposable, et {{bj.is-taux[industrie-enseignement]}} pour l'industrie hors extraction et les écoles privées.",
    },
    {
      pregunta: "Que se passe-t-il quand la société est en déficit ?",
      respuesta: "L'article 47 impose un minimum de perception sur les produits encaissables et, en tout état de cause, un impôt d'au moins {{bj.impot-minimum-plancher}}.",
    },
    {
      pregunta: "Le minimum est-il le même pour toutes les activités ?",
      respuesta: "Non. Il est de {{bj.is-minimum-taux[general]}} dans le cas général, de {{bj.is-minimum-taux[btp]}} pour le bâtiment et les travaux publics et de {{bj.is-minimum-taux[immobilier]}} pour l'immobilier (article 47).",
    },
  ],
  glosario: [
    { termino: "Bénéfice imposable", definicion: "Le résultat fiscal de l'exercice après les retraitements du Code général des impôts." },
    { termino: "Produits encaissables", definicion: "Les produits qui ont donné ou peuvent donner lieu à un flux d'argent, hors production immobilisée ou stockée, transferts de charges et reprises." },
    { termino: "Minimum de perception", definicion: "Le montant sous lequel l'impôt ne peut descendre, même sans bénéfice." },
  ],
});
