import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.cpp-calculator",
  h1: "Calcul des cotisations au RRQ et au RPC 2026",
  title: "Cotisations RRQ 2026 : calcul, RRQ2 et maximum",
  description: "Calculez vos cotisations 2026 au Régime de rentes du Québec (RRQ) ou au RPC, y compris la deuxième cotisation supplémentaire, salarié ou travailleur autonome.",
  intro: [
    "Inscrivez vos gains pour voir combien vous versez au Régime de rentes du Québec en 2026, et combien votre employeur ajoute.",
    "Le calcul couvre la cotisation de base, la première cotisation supplémentaire et la deuxième cotisation supplémentaire (RRQ2), ainsi que le Régime de pensions du Canada si vous travaillez hors Québec.",
  ],
  comoSeCalcula: [
    "Les premiers {{ca.cpp[exemption]}} de gains sont exemptés.",
    "Sur les gains entre {{ca.cpp[exemption]}} et {{ca.cpp[ympe]}}, le taux de base du RRQ est de {{ca.qpp[base]}}, plus {{ca.qpp[first]}} de première cotisation supplémentaire. Hors Québec, le RPC est de {{ca.cpp-rates[base]}} plus {{ca.cpp-rates[first]}}.",
    "Sur les gains entre {{ca.cpp[ympe]}} et {{ca.cpp[yampe]}}, vous payez {{ca.qpp[second]}} de deuxième cotisation supplémentaire (RRQ2), ou {{ca.cpp-rates[second]}} de RPC2.",
    "Votre employeur paie le même montant que vous. Si vous êtes travailleur autonome, vous payez les deux parts.",
  ],
  faq: [
    {
      pregunta: "Quelle partie des cotisations puis-je déduire?",
      respuesta: "Les premières et deuxièmes cotisations supplémentaires se déduisent de votre revenu. Les cotisations de base donnent plutôt droit à un crédit d'impôt non remboursable.",
    },
    {
      pregunta: "Quand les retenues s'arrêtent-elles dans l'année?",
      respuesta: "Les cotisations de base et les premières cotisations supplémentaires s'arrêtent quand vos gains de l'année dépassent {{ca.cpp[ympe]}}, et la deuxième cotisation supplémentaire s'arrête à {{ca.cpp[yampe]}}. Elles reprennent en janvier.",
    },
    {
      pregunta: "Pourquoi le RRQ et le RPC n'ont-ils pas le même taux?",
      respuesta: "Le Québec administre son propre régime. Le taux de base du RRQ est de {{ca.qpp[base]}} et celui du RPC de {{ca.cpp-rates[base]}}, sur la même tranche de gains.",
    },
  ],
  glosario: [
    { termino: "MGA", definicion: "Maximum des gains admissibles, {{ca.cpp[ympe]}} en 2026." },
    { termino: "MSGA", definicion: "Maximum supplémentaire des gains admissibles, {{ca.cpp[yampe]}} en 2026. La deuxième cotisation supplémentaire s'applique entre le MGA et ce montant." },
    { termino: "Exemption de base", definicion: "Les premiers {{ca.cpp[exemption]}} de gains annuels, sur lesquels aucune cotisation n'est perçue." },
  ],
});
