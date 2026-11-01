import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.taxe-fonciere",
  h1: "Calcul de la taxe foncière au Cameroun",
  title: "Taxe foncière Cameroun : calcul selon la valeur du bien",
  description:
    "Calculez la taxe sur la propriété foncière : {{cm.taxe-fonciere[0].tasa}} de la valeur de vos propriétés, avec des taux plus élevés pour les gros patrimoines.",
  intro: [
    "La taxe sur la propriété foncière est due chaque année par les propriétaires d'immeubles bâtis ou non bâtis situés dans une commune.",
    "Elle est déclarée et payée au plus tard le 30 juin au centre des impôts du lieu du bien.",
  ],
  comoSeCalcula: [
    "La base est la valeur de la propriété déclarée selon la zone. À défaut, l'administration retient la valeur administrative.",
    "Le taux est de {{cm.taxe-fonciere[0].tasa}} jusqu'à {{cm.taxe-fonciere[0].hasta}}.",
    "Au-delà, le barème est progressif : {{cm.taxe-fonciere[1].tasa}} jusqu'à {{cm.taxe-fonciere[1].hasta}}, puis {{cm.taxe-fonciere[2].tasa}}.",
  ],
  ejemplo: ["Une maison estimée à 40 millions paie 40 000 F de taxe foncière par an."],
  faq: [
    {
      pregunta: "La taxe est-elle due sur un terrain nu ?",
      respuesta: "Oui, sur les propriétés bâties ou non bâties situées dans une commune, dans les conditions prévues par la loi sur la fiscalité locale.",
    },
    {
      pregunta: "Que se passe-t-il si je ne paie pas ?",
      respuesta: "Une vente, une hypothèque ou une location du bien ne peut être enregistrée sans la preuve du paiement de la taxe.",
    },
    {
      pregunta: "Le seuil s'apprécie-t-il bien par bien ?",
      respuesta: "Non. La loi regarde la valeur totale d'une propriété ou de l'ensemble des propriétés d'un même contribuable.",
    },
  ],
  glosario: [{ termino: "Valeur administrative", definicion: "Valeur fixée par l'administration fiscale quand le propriétaire ne déclare pas ou sous-évalue son bien." }],
});
