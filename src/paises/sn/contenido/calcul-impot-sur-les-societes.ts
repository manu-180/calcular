import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sn.calcul-impot-sur-les-societes",
  h1: "Calcul de l'impôt sur les sociétés au Sénégal",
  title: "Impôt sur les sociétés au Sénégal : IS et IMF",
  description: "Calculez l'impôt sur les sociétés à {{sn.is}} du bénéfice et comparez-le à l'impôt minimum forfaitaire de {{sn.imf[taux]}} du chiffre d'affaires.",
  intro: [
    "Inscrivez le bénéfice imposable et le chiffre d'affaires de l'année précédente pour voir l'impôt dû par la société.",
    "Une société paie l'impôt minimum forfaitaire quand son impôt sur les sociétés est inférieur à ce minimum.",
  ],
  comoSeCalcula: [
    "L'impôt sur les sociétés est de {{sn.is}} du bénéfice imposable. Toute fraction de bénéfice inférieure à mille francs est négligée.",
    "L'impôt minimum forfaitaire est de {{sn.imf[taux]}} du chiffre d'affaires hors taxes de l'année précédente, sans dépasser {{sn.imf[plafond]}}.",
    "La société paie le plus élevé des deux.",
  ],
  faq: [
    {
      pregunta: "Qui est exonéré de l'impôt minimum forfaitaire?",
      respuesta: "Entre autres, les entreprises dans leur première année d'activité et les entreprises nouvelles qui ne relèvent pas du service des grandes entreprises, pendant 3 ans à partir de leur création.",
    },
    {
      pregunta: "Quel est le maximum de l'impôt minimum forfaitaire?",
      respuesta: "{{sn.imf[plafond]}}.",
    },
    {
      pregunta: "Le bénéfice est-il arrondi?",
      respuesta: "Oui, toute fraction du bénéfice imposable inférieure à mille francs est négligée.",
    },
  ],
  glosario: [
    { termino: "IS", definicion: "Impôt sur les sociétés, calculé sur le bénéfice imposable." },
    { termino: "IMF", definicion: "Impôt minimum forfaitaire, dû sur le chiffre d'affaires quand l'IS est plus bas." },
  ],
});
