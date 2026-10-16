import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/vakantiegeld-berekenen";

export default definirTextos(base, {
  calculadora: "be-fr.vakantiegeld-berekenen",
  slug: "calcul-pecule-de-vacances",
  campos: {
    situatie: {
      etiqueta: "Votre situation",
      opciones: {
        bediende: "Employé : double pécule de vacances",
        arbeider: "Ouvrier : pécule de vacances de l'ONVA ou de la caisse de vacances",
        vertrek: "Employé qui quitte l'entreprise : pécule de sortie",
      },
    },
    maandloon: { etiqueta: "Salaire mensuel brut (employé)" },
    maanden: { etiqueta: "Mois travaillés l'année passée (employé)" },
    jaarloon: {
      etiqueta: "Salaire brut sur la période (ouvrier ou sortie)",
      ayuda: "Ouvrier : votre salaire brut de l'année passée à 100 %. Sortie : le salaire brut gagné cette année chez cet employeur.",
    },
  },
  filas: {
    vakantiegeld: { etiqueta: "Pécule de vacances brut" },
    rsz: { etiqueta: "Moins : ONSS sur le double pécule" },
    naRsz: { etiqueta: "Après ONSS (avant précompte professionnel)" },
  },
  mensajes: {
    "Vul je brutomaandloon in.": "Indiquez votre salaire mensuel brut.",
    "Vul het brutoloon over de periode in.": "Indiquez le salaire brut sur la période.",
    "Tijdens je vakantiedagen loopt je gewone loon door: dat is je enkel vakantiegeld. Het dubbel vakantiegeld komt er één keer per jaar bij.":
      "Pendant vos jours de vacances, votre salaire normal continue : c'est votre simple pécule de vacances. Le double pécule s'y ajoute une fois par an.",
    "Het vakantiefonds berekent je vakantiegeld op je loon aan 108 %. Daarop gaat nog een solidariteitsbijdrage van 1 % af.":
      "La caisse de vacances calcule votre pécule sur votre salaire à 108 %. Une cotisation de solidarité de 1 % y est encore retenue.",
    "Je nieuwe werkgever trekt dit vertrekvakantiegeld af van het vakantiegeld dat hij je volgend jaar betaalt voor dezelfde dagen.":
      "Votre nouvel employeur déduit ce pécule de sortie du pécule de vacances qu'il vous paiera l'année prochaine pour les mêmes jours.",
  },
});
