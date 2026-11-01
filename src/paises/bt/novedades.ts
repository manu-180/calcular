import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "bt.cpi-september-2026",
    fecha: "2026-10-20",
    titulo: "Inflation reaches 5.58 % in the year to September 2026",
    texto:
      "The National Statistics Bureau reported on 20 October 2026 that consumer prices rose 5.58 % over 12 months to September 2026, up from 5.49 % in August. Food rose 4.95 % and other goods and services 6.34 %. Our inflation calculator uses the same index.",
    vigenteDesde: "2026-09-01",
    calculadoras: ["bt.inflation-calculator"],
    fuente: {
      organismo: "National Statistics Bureau",
      titulo: "Consumer Price Index Report, September 2026",
      url: "https://nsb.gov.bt/wp-content/uploads/2026/10/CPI_Report_September_2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-31",
    },
  },
  {
    id: "bt.nppf-members-notice-june-2026",
    fecha: "2026-06-02",
    titulo: "NPPF asks agencies to report joiners and leavers within five working days",
    texto:
      "On 2 June 2026 the National Pension and Provident Fund told members and employing agencies to send enrolment forms within five working days of a new employee joining, and to deposit contributions and the contribution schedule before the 10th of the following month. Our private provident fund calculator uses the same 10th-of-the-month deadline.",
    vigenteDesde: "2026-06-02",
    calculadoras: ["bt.private-provident-fund-calculator"],
    fuente: {
      organismo: "National Pension and Provident Fund (NPPF)",
      titulo: "Notice to All NPPF Members and Employing Agencies",
      url: "https://www.nppf.org.bt/notice-to-all-nppf-members-and-employing-agencies/",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "bt.gst-start-2026",
    fecha: "2026-01-01",
    titulo: "Goods and Services Tax starts at 5 %",
    texto:
      "The Goods and Services Tax Act of Bhutan 2020, as amended in 2025, came into force on 1 January 2026 with one rate of 5 % on taxable supplies and imports. Businesses with a turnover of Nu. 5 million or more a year must register.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["bt.gst-calculator", "bt.gst-registration-calculator"],
    fuente: {
      organismo: "Department of Revenue and Customs",
      titulo: "Goods and Services Tax Act of Bhutan 2020 (consolidated)",
      url: "https://www.drc.gov.bt/wp-content/uploads/2025/12/Consolidated-GST-Act-of-Bhutan-2020-and-amendment-thereof.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-31",
    },
  },
  {
    id: "bt.income-tax-act-2026",
    fecha: "2026-01-01",
    titulo: "New income tax bands under the Income Tax Act of Bhutan 2025",
    texto:
      "The Income Tax Act of Bhutan 2025 took effect on 1 January 2026. Individual income stays free of tax up to Nu. 300,000, then pays from 5 % to 30 %. Companies pay 22 %. Employees deduct 15 % of employment income, up to Nu. 150,000 a year.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["bt.income-tax-calculator", "bt.take-home-pay-calculator", "bt.corporate-tax-calculator", "bt.presumptive-tax-calculator", "bt.withholding-tax-calculator", "bt.rental-income-tax-calculator"],
    fuente: {
      organismo: "Department of Revenue and Customs",
      titulo: "Notification on tax rates, filing obligation and presumptive taxation, 16 December 2025",
      url: "https://www.drc.gov.bt/wp-content/uploads/2025/12/Public-Notification-on-new-Income-Tax-Act.docx-1.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-31",
    },
  },
];
