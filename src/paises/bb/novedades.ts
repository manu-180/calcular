import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "bb.land-tax-bands-august-2026",
    fecha: "2026-10-27",
    titulo: "Corrected land tax bands for homes valued above $450,000",
    texto:
      "The BRA and the Ministry of Finance confirmed the residential land tax bands for 2026-2027: nothing on the first $400,000 of improved value, 0.1% up to $550,000, 0.7% up to $950,000 and 1% above that. Bills for homes valued above $450,000 were reissued on August 31, 2026. Our land tax calculator uses these bands.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["bb.land-tax-calculator"],
    fuente: {
      organismo: "Barbados Revenue Authority and Ministry of Finance",
      titulo: "Lower Land Tax Bills Coming for Residential Properties Valued Above $450,000",
      url: "https://bra.gov.bb/News/Press-Releases/Lower-Land-Tax-Bills-Coming-for-Re",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "bb.income-tax-cut-2026",
    fecha: "2026-10-27",
    titulo: "Income tax rates cut to 11.5% and 27.5% for 2026",
    texto:
      "From income year 2026 the lower income tax rate falls from 12.5% to 11.5% and the higher rate from 28.5% to 27.5%. The personal allowance stays at $25,000 and the lower band still covers the first $50,000 of taxable income. Our salary and income tax calculators use the new rates.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["bb.salary-calculator", "bb.income-tax-calculator"],
    fuente: {
      organismo: "Barbados Revenue Authority",
      titulo: "Policy Note OGC No. 001/2026: Reduction of Personal Income Tax Rates",
      url: "https://bra.gov.bb/attachment?file=Attachments%2fPolicy+Note+2026_Reduction+in+Personal+Income+Tax+Rates_April+2026.pdf&name=Policy+Note+2026_Reduction+in+Personal+Income+Tax+Rates_April+2026",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "bb.nis-ceiling-2027",
    fecha: "2026-10-27",
    titulo: "NIS earnings ceiling rises to $5,450 a month in 2027",
    texto:
      "From January 1, 2027 the insurable earnings ceiling goes up from $5,360 to $5,450 for monthly paid workers, and from $1,238 to $1,258 for weekly paid workers from January 4, 2027. Contribution rates do not change. Our salary, NIS and employer cost calculators switch to the new ceiling on those dates.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["bb.salary-calculator", "bb.nis-calculator", "bb.employer-cost-calculator"],
    fuente: {
      organismo: "National Insurance and Social Security Service (NISSS)",
      titulo: "Increase in Earnings Ceiling 2027",
      url: "https://www.nis.gov.bb/increase-in-earnings-ceiling-2027/",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
