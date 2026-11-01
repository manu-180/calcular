import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "bn.spk-no-cap",
    fecha: "2026-10-29",
    titulo: "SPK has no maximum contribution",
    texto:
      "Since the Skim Persaraan Kebangsaan (SPK) started on 15 July 2023, the employee pays 8.5% of basic salary with no ceiling, and the employer pays 10.5%, 9.5% or 8.5% by salary group with a minimum of BND 57.50. Our SPK, take-home pay and employer cost calculators use these rules.",
    vigenteDesde: "2023-07-15",
    calculadoras: ["bn.spk-calculator", "bn.take-home-pay", "bn.employer-cost-calculator"],
    fuente: {
      organismo: "Employees Trust Fund (TAP)",
      titulo: "SPK: prescribed contribution rates for employers",
      url: "https://www.tap.com.bn/employers-responsibilities-contribution",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "bn.wht-april-2017",
    fecha: "2026-10-29",
    titulo: "Withholding tax on interest paid abroad is 2.5%",
    texto:
      "From 1 April 2017 the Revenue Division lists withholding tax of 2.5% on interest, commission and fees paid to non-residents, and 10% on royalties, know-how, technical services, management fees, movable property rent and directors' pay. Our withholding tax calculator uses this table.",
    vigenteDesde: "2017-04-01",
    calculadoras: ["bn.withholding-tax-calculator"],
    fuente: {
      organismo: "Ministry of Finance and Economy, Revenue Division",
      titulo: "Withholding of tax: tax rates",
      url: "https://www.mof.gov.bn/div_revenue_withholdingoftax_whtrate/",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
];
