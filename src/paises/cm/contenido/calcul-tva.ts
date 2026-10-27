import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.calcul-tva",
  h1: "Calcul de la TVA au Cameroun",
  title: "Calcul TVA Cameroun : HT, TTC et centimes communaux",
  description:
    "Ajoutez ou retirez la TVA : taux général de {{cm.tva[general]}} plus {{cm.cac}} de centimes additionnels communaux. Passez du HT au TTC en un clic.",
  intro: [
    "Au Cameroun, la TVA facturée comprend le principal et les centimes additionnels communaux (CAC). C'est pourquoi on parle souvent d'un taux global.",
    "Choisissez le sens du calcul et le taux. Vous obtenez le HT, la TVA, les CAC et le TTC.",
  ],
  comoSeCalcula: [
    "Le principal de la TVA est de {{cm.tva[general]}} au taux général et de {{cm.tva[reduit]}} au taux réduit.",
    "Les centimes additionnels communaux ajoutent {{cm.cac}} du principal. Le taux global est donc un peu plus élevé que le principal.",
    "Pour retirer la TVA d'un prix TTC, on divise ce prix par un plus le taux global.",
  ],
  ejemplo: ["Pour 100 000 F HT au taux général : 17 500 F de TVA et 1 750 F de CAC. Le prix TTC est de 119 250 F."],
  faq: [
    {
      pregunta: "Pourquoi le taux global dépasse-t-il le taux de TVA ?",
      respuesta: "C'est le taux général de {{cm.tva[general]}} majoré de {{cm.cac}} de centimes additionnels communaux. Les deux figurent sur la facture.",
    },
    {
      pregunta: "Qu'est-ce qui relève du taux réduit ?",
      respuesta:
        "Le CGI le réserve aux logements sociaux : la vente à une personne pour sa première habitation, la location par un promoteur public et les intérêts du prêt, avec un quitus des impôts.",
    },
    {
      pregunta: "Les petites entreprises facturent-elles la TVA ?",
      respuesta: "Non. L'impôt général synthétique remplace la TVA pour les entreprises qui en relèvent. Seules celles du régime du réel la facturent.",
    },
  ],
  glosario: [
    { termino: "HT", definicion: "Hors taxes : le prix avant TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix payé par le client." },
  ],
});
