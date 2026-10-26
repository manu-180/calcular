import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "mu.income-tax-35-band-2026",
    fecha: "2026-10-24",
    titulo: "New 35% income tax band from July 2026",
    texto:
      "From the income year that started on 1 July 2026, chargeable income above Rs 12 million is taxed at 35%. The first Rs 500,000 stays at 0%, the next Rs 500,000 at 10% and the rest up to Rs 12 million at 20%. For individuals the new band takes the place of the 15% Fair Share Contribution, which now covers only the 2025-26 income year. Our salary, PAYE and income tax calculators already use the new bands.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["mu.salary-calculator", "mu.paye-calculator", "mu.income-tax-calculator"],
    fuente: {
      organismo: "Mauritius Revenue Authority",
      titulo: "The Finance Act 2026 (Act No. 14 of 2026), sections 7(b), 7(v) and 28(12)",
      url: "https://www.mra.mu/download/FinanceAct2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "mu.minimum-wage-2026",
    fecha: "2026-10-24",
    titulo: "National minimum wage is Rs 17,745 from January 2026",
    texto:
      "The National Minimum Wage (Amendment) Regulations 2026 raised the monthly minimum for a full-time worker from Rs 17,110 to Rs 17,745, backdated to 1 January 2026. Our minimum wage and salary compensation calculators use the new figure.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mu.minimum-wage", "mu.salary-compensation-calculator"],
    fuente: {
      organismo: "Ministry of Labour and Industrial Relations",
      titulo: "National Minimum Wage (Amendment) Regulations 2026, GN No. 8 of 2026",
      url: "https://labour.govmu.org/Documents/Legislations/NWCC/The%20National%20Minimum%20Wage_Amd_Regulations%202026%20gazetted%20on%2017.1.2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "mu.first-home-relief-2026",
    fecha: "2026-10-24",
    titulo: "Bigger registration duty relief for first homes",
    texto:
      "Since 13 August 2026 a buyer who qualifies gets up to Rs 300,000 off the registration duty on a house or apartment, up from Rs 250,000. On bare land bought to build a home the cut is up to Rs 150,000, up from Rs 125,000. Our registration duty calculator already applies the new amounts.",
    vigenteDesde: "2026-08-13",
    calculadoras: ["mu.registration-duty-calculator"],
    fuente: {
      organismo: "Mauritius Revenue Authority",
      titulo: "The Finance Act 2026 (Act No. 14 of 2026), section 16: Registration Duty Act amended",
      url: "https://www.mra.mu/download/FinanceAct2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "mu.nsf-ceiling-july-2026",
    fecha: "2026-10-24",
    titulo: "NSF ceiling of Rs 29,710 from July 2026",
    texto:
      "From 1 July 2026 NSF contributions are worked out on a monthly basic wage of at most Rs 29,710. The employee pays 1% and the employer 2.5%, so the most an employee pays is Rs 297.10 a month. Our salary, CSG and employer cost calculators use the new ceiling.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["mu.salary-calculator", "mu.csg-calculator", "mu.employer-cost-calculator"],
    fuente: {
      organismo: "Mauritius Revenue Authority",
      titulo: "NPF / NSF Contributions and Training Levy",
      url: "https://www.mra.mu/index.php/employers/npf-nsf-contributions",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
