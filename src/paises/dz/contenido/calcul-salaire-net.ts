import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.calcul-salaire-net",
  h1: "Calcul du salaire net en Algérie",
  title: "Salaire net Algérie {{anio}} : du brut au net avec CNAS et IRG",
  description:
    "Passez du salaire brut au salaire net en Algérie : cotisation de sécurité sociale de {{dz.cnas[salarie]}}, puis IRG selon le barème, l'abattement et le lissage.",
  intro: [
    "Entre le salaire brut et le montant versé, deux retenues s'appliquent chaque mois : la cotisation de sécurité sociale versée à la CNAS et l'impôt sur le revenu global (IRG).",
    "Indiquez votre salaire brut mensuel. Vous voyez chaque retenue, votre salaire net et la part du brut qui vous reste.",
  ],
  comoSeCalcula: [
    "Cotisation de sécurité sociale du travailleur : {{dz.cnas[salarie]}} du salaire brut.",
    "Salaire imposable : brut moins cette cotisation.",
    "IRG : barème annuel appliqué au salaire imposable multiplié par 12, puis ramené au mois. On retire un abattement de {{dz.irg-abattement-taux}} de l'impôt, entre {{dz.irg-abattement[minimum]}} et {{dz.irg-abattement[maximum]}}.",
    "Pas d'IRG si le salaire imposable ne dépasse pas {{dz.irg-exoneration}}. Jusqu'à {{dz.irg-lissage-plafonds[general]}}, une formule de lissage réduit l'impôt.",
    "Salaire net = brut − cotisation − IRG.",
  ],
  ejemplo: [
    "Pour 60 000 DA brut : 5 400 DA de cotisation, 7 042 DA d'IRG, soit 47 558 DA net par mois.",
  ],
  faq: [
    {
      pregunta: "Combien touche-t-on net avec le SNMG ?",
      respuesta:
        "Avec le salaire minimum de {{dz.snmg}}, seule la cotisation de {{dz.cnas[salarie]}} est retenue : le salaire imposable reste sous le seuil d'exonération de {{dz.irg-exoneration}}, donc pas d'IRG.",
    },
    {
      pregunta: "Quel est le taux de cotisation à la CNAS ?",
      respuesta:
        "Le travailleur paie {{dz.cnas[salarie]}} de l'assiette de cotisation, l'employeur {{dz.cnas[employeur]}} et le fonds des œuvres sociales {{dz.cnas[oeuvres-sociales]}}.",
    },
    {
      pregunta: "Le net affiché correspond-il à mon bulletin de paie ?",
      respuesta:
        "Il en est proche si tout votre salaire est soumis à cotisation et à l'IRG. Les primes versées chaque trimestre ou les rappels sont imposés à part, au taux de {{dz.irg-primes}}.",
    },
  ],
  glosario: [
    { termino: "CNAS", definicion: "Caisse nationale des assurances sociales des travailleurs salariés." },
    { termino: "IRG", definicion: "Impôt sur le revenu global, retenu à la source par l'employeur." },
    { termino: "SNMG", definicion: "Salaire national minimum garanti." },
  ],
});
