import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm-en.cotisations-cnps",
  h1: "CNPS contributions calculator",
  title: "CNPS contributions Cameroon: employee and employer",
  description:
    "Work out CNPS contributions on a salary: {{cm.cnps-pension[salarie]}} pension for the employee, family benefits and occupational injuries for the employer.",
  intro: [
    "The National Social Insurance Fund (CNPS) runs three branches: old-age pension, family benefits and occupational injuries.",
    "The employee only pays towards the pension. The employer pays its pension share and the other two branches.",
  ],
  comoSeCalcula: [
    "The pension costs {{cm.cnps-pension[salarie]}} for the employee and {{cm.cnps-pension[employeur]}} for the employer, on pay capped at {{cm.cnps-plafond}} a month.",
    "Family benefits are paid by the employer on the same capped pay: {{cm.cnps-prestations-familiales[general]}} in the general scheme, {{cm.cnps-prestations-familiales[agricole]}} in agriculture and {{cm.cnps-prestations-familiales[enseignement-prive]}} in private education.",
    "Occupational injuries are paid by the employer on all pay, by risk: {{cm.cnps-accidents-travail[a]}}, {{cm.cnps-accidents-travail[b]}} or {{cm.cnps-accidents-travail[c]}}.",
  ],
  ejemplo: ["On 300,000 F in the general scheme, group A: the employee pays 12,600 F. The employer pays 12,600 F pension, 21,000 F family benefits and 5,250 F occupational injuries."],
  faq: [
    {
      pregunta: "Does the ceiling apply to occupational injuries?",
      respuesta: "No. The {{cm.cnps-plafond}} ceiling applies to the pension and family benefits. Occupational injuries are charged on all pay.",
    },
    {
      pregunta: "How do I know my company's risk group?",
      respuesta: "The decree sorts activities into three groups, from low risk (A) to high risk (C). The CNPS can change the group after an inspection if the real activity differs.",
    },
    {
      pregunta: "Does the employee's share lower IRPP?",
      respuesta: "Yes. The pension paid to the CNPS by the employee is deducted from income before IRPP is worked out.",
    },
  ],
  glosario: [{ termino: "CNPS", definicion: "National Social Insurance Fund, which collects contributions and pays pensions and family benefits." }],
});
