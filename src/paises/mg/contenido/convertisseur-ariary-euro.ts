import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.convertisseur-ariary-euro",
  h1: "Convertisseur ariary euro et dollar",
  title: "Convertisseur ariary euro et dollar : cours BFM du jour",
  description: "Convertissez des euros ou des dollars en ariary, et l'inverse, au cours moyen publié par la Banky Foiben'i Madagasikara. Un euro vaut {{mg.eur}} ce jour.",
  intro: [
    "L'ariary flotte : son cours change chaque jour ouvré sur le marché interbancaire des devises.",
    "Le convertisseur utilise le cours moyen (MID) publié par la Banky Foiben'i Madagasikara (BFM), la banque centrale.",
  ],
  comoSeCalcula: [
    "Montant en ariary = montant en devise × cours moyen. Montant en devise = montant en ariary ÷ cours moyen.",
    "Cours moyen de l'euro au {{mg.eur#desde}} : {{mg.eur}}. Cours moyen du dollar : {{mg.usd}}.",
  ],
  ejemplo: ["Avec un euro à 5 047,26 Ar, 100 euros font 504 726 Ar."],
  faq: [
    {
      pregunta: "Pourquoi ma banque n'applique-t-elle pas ce cours ?",
      respuesta: "Le cours moyen est une référence. Les banques et les bureaux de change achètent un peu en dessous et vendent un peu au-dessus, et ajoutent parfois des frais.",
    },
    { pregunta: "Le cours change-t-il le week-end ?", respuesta: "Non. La BFM publie un cours par jour ouvré. Le samedi et le dimanche, c'est le dernier cours publié qui sert de référence." },
    { pregunta: "D'où vient le cours ?", respuesta: "Du marché interbancaire des devises (MID), où les banques échangent les devises entre elles. La BFM en publie le cours moyen chaque jour ouvré." },
  ],
  glosario: [
    { termino: "MID", definicion: "Marché interbancaire des devises, où se forme le cours de l'ariary." },
    { termino: "BFM", definicion: "Banky Foiben'i Madagasikara, la banque centrale de Madagascar." },
  ],
});
