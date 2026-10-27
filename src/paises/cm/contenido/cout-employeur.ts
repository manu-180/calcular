import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.cout-employeur",
  h1: "Calcul du coût employeur d'un salarié",
  title: "Coût employeur au Cameroun : charges patronales",
  description:
    "Calculez le coût total d'un salarié : cotisations patronales CNPS, Crédit foncier de {{cm.cfc-taux[employeur]}} et Fonds national de l'emploi de {{cm.fne-taux}}.",
  intro: [
    "Embaucher coûte plus que le salaire brut. L'employeur verse ses cotisations à la CNPS et deux contributions sur les salaires : le Crédit foncier et le Fonds national de l'emploi.",
    "Indiquez le brut mensuel, le régime et le groupe de risque. Vous obtenez le coût du mois et de l'année.",
  ],
  comoSeCalcula: [
    "CNPS : {{cm.cnps-pension[employeur]}} de pension et les prestations familiales sur le salaire limité à {{cm.cnps-plafond}}, plus les accidents du travail sur tout le salaire.",
    "Crédit foncier : {{cm.cfc-taux[employeur]}} du brut arrondi au millier inférieur. Fonds national de l'emploi : {{cm.fne-taux}} de la même base.",
    "Certains employeurs sont exonérés de ces deux contributions, comme l'État, les communes ou les associations sans but lucratif.",
  ],
  ejemplo: ["Pour 300 000 F au régime général en groupe A : 38 850 F de CNPS, 4 500 F de Crédit foncier et 3 000 F de FNE. Le coût total est de 346 350 F par mois."],
  faq: [
    {
      pregunta: "Le Crédit foncier est-il payé aussi par le salarié ?",
      respuesta: "Oui. Le salarié paie {{cm.cfc-taux[salarie]}} et l'employeur {{cm.cfc-taux[employeur]}}. Seule la part patronale entre dans le coût employeur.",
    },
    {
      pregunta: "Quand faut-il verser ces contributions ?",
      respuesta: "Le Crédit foncier et le FNE se versent au Trésor dans les vingt premiers jours du mois, pour les salaires payés le mois précédent.",
    },
    {
      pregunta: "Le coût inclut-il les congés ou les primes ?",
      respuesta: "Non. Le calcul porte sur le brut que vous indiquez. Ajoutez les primes au brut pour les inclure.",
    },
  ],
  glosario: [
    { termino: "FNE", definicion: "Fonds national de l'emploi, financé par une contribution des employeurs sur les salaires." },
    { termino: "Charges patronales", definicion: "Cotisations et contributions payées par l'employeur en plus du salaire brut." },
  ],
});
