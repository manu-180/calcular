import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ug.employment-amendment-2026",
    fecha: "2026-10-24",
    titulo: "Employment (Amendment) Act 2026: new severance and sick pay rules",
    texto:
      "Since 5 June 2026, severance allowance is one month's salary for each year worked. Sick employees get full pay for the first two months and half pay for the next four. Our severance, terminal benefits and sick pay calculators already use the new rules.",
    vigenteDesde: "2026-06-05",
    calculadoras: ["ug.severance-pay-calculator", "ug.terminal-benefits-calculator", "ug.sick-pay-calculator"],
    fuente: {
      organismo: "ULII (Uganda Legal Information Institute)",
      titulo: "Employment (Amendment) Act, 2026 (Act 10 of 2026)",
      url: "https://media.ulii.org/media/legislation/128859/source_file/107fdd589735b99e/ug-act-2026-10-publication-document.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "ug.paye-threshold-2026",
    fecha: "2026-10-24",
    titulo: "PAYE threshold rises to Ushs 335,000 a month",
    texto:
      "From 1 July 2026 residents pay no PAYE on monthly income up to Ushs 335,000, up from Ushs 235,000. The 10% band is gone: income above the threshold pays 20%, 25% and then 30%. Our PAYE, net salary and employer cost calculators use the new URA rates.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["ug.paye-calculator", "ug.net-salary-calculator", "ug.employer-cost-calculator", "ug.local-service-tax-calculator"],
    fuente: {
      organismo: "Uganda Revenue Authority",
      titulo: "PAYE rates",
      url: "https://ura.go.ug/en/domestic-taxes/paye-rates/",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
