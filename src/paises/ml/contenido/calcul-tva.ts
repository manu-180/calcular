import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.calcul-tva",
  h1: "Calcul de la TVA au Mali",
  title: "Calcul TVA Mali : HT, TTC, taux normal et réduit",
  description: "Passez du hors taxe au TTC ou du TTC au hors taxe avec les taux de TVA du Mali : {{ml.tva[normal]}} en taux normal et {{ml.tva[reduit]}} en taux réduit.",
  intro: [
    "Au Mali, la TVA s'applique aux livraisons de biens et aux prestations de services non exonérées. Le Code général des impôts prévoit un taux normal et un taux réduit.",
    "Choisissez le montant de départ et le taux. Vous obtenez le hors taxe, la TVA et le TTC.",
  ],
  comoSeCalcula: [
    "Le taux normal est de {{ml.tva[normal]}}. Le taux réduit de {{ml.tva[reduit]}} vise une liste fermée de produits du CGI, comme certains matériels informatiques.",
    "Depuis un montant HT : TVA = HT × taux, puis TTC = HT + TVA.",
    "Depuis un montant TTC : HT = TTC / (1 + taux), puis TVA = TTC moins HT.",
  ],
  ejemplo: ["Une facture de 100 000 F HT au taux normal porte 18 000 F de TVA, soit 118 000 F TTC."],
  faq: [
    {
      pregunta: "Quels produits ont le taux réduit ?",
      respuesta:
        "Seuls les produits listés au point D de la sous-section du CGI sur les produits imposables, notamment des machines de traitement de l'information. Tout le reste, sauf exonération, est au taux normal.",
    },
    {
      pregunta: "Quels produits sont exonérés ?",
      respuesta:
        "Le CGI exonère par exemple la presse locale et les tranches sociales d'eau (jusqu'à 20 m³) et d'électricité (jusqu'à 50 kWh pour un compteur de 5 ampères). La liste complète figure dans le Code.",
    },
    {
      pregunta: "Une entreprise à l'impôt synthétique facture-t-elle la TVA ?",
      respuesta:
        "Non. Le paiement de l'impôt synthétique libère l'entreprise des autres impôts, droits et taxes visés par le Code, dont la TVA. Elle relève de ce régime tant que son chiffre d'affaires annuel reste sous 50 millions de francs CFA.",
    },
  ],
  glosario: [
    { termino: "HT", definicion: "Hors taxe : le prix sans la TVA." },
    { termino: "TTC", definicion: "Toutes taxes comprises : le prix payé par le client." },
  ],
});
