import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "hk.minimum-wage-may-2026",
    fecha: "2026-10-16",
    titulo: "Statutory minimum wage rises to $43.1 an hour",
    texto:
      "From 1 May 2026 the statutory minimum wage is $43.1 an hour. The monthly wage below which employers must keep a record of hours worked also rose, to $17,600.",
    vigenteDesde: "2026-05-01",
    calculadoras: ["hk.minimum-wage"],
    fuente: {
      organismo: "Labour Department",
      titulo: "Statutory Minimum Wage",
      url: "https://www.labour.gov.hk/eng/news/mwo.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
  {
    id: "hk.allowances-2026-27",
    fecha: "2026-10-16",
    titulo: "Higher salaries tax allowances from 2026/27",
    texto:
      "From the 2026/27 year of assessment the basic allowance is $145,000, the married person's allowance $290,000 and the child allowance $140,000. A newborn now gets the additional child allowance in each of the first two years.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["hk.salaries-tax-calculator", "hk.provisional-salaries-tax", "hk.take-home-pay"],
    fuente: {
      organismo: "Inland Revenue Department",
      titulo: "2026-27 Budget: Tax Measures",
      url: "https://www.ird.gov.hk/eng/tax/budget.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
  {
    id: "hk.avd-above-100m-2026",
    fecha: "2026-10-16",
    titulo: "Stamp duty on homes above $100 million goes up to 6.5%",
    texto:
      "For residential property instruments signed on or after 26 February 2026, the top ad valorem stamp duty rate is 6.5% on a price above $100 million, up from 4.25%. Non-residential property now has its own Scale 3, which keeps the 4.25% top rate.",
    vigenteDesde: "2026-02-26",
    calculadoras: ["hk.stamp-duty-calculator"],
    fuente: {
      organismo: "Inland Revenue Department",
      titulo: "Ad valorem stamp duty: frequently asked questions",
      url: "https://www.ird.gov.hk/eng/faq/avd.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
];
