import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "mt.family-tax-rates-2026",
    fecha: "2026-10-26",
    titulo: "New tax rates for families with children",
    texto:
      "From income earned in 2026, married couples and parents with one child, or with two or more, have wider tax-free bands and lower bands. The income tax calculator already uses them.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mt.income-tax-calculator"],
    fuente: {
      organismo: "Legislation Unit, Government of Malta",
      titulo: "Act III of 2026, Budget Measures Implementation Act",
      url: "https://legislation.mt/eli/act/2026/3/eng",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
  {
    id: "mt.minimum-wage-2026",
    fecha: "2026-10-26",
    titulo: "Minimum wage rises to €229.44 a week",
    texto: "From 1 January 2026 the national minimum wage for workers aged 18 and over is €229.44 a week, and every whole-time wage goes up by a cost of living increase of €4.66 a week.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mt.minimum-wage", "mt.cola-increase"],
    fuente: {
      organismo: "Legislation Unit, Government of Malta",
      titulo: "L.N. 289 of 2025, National Minimum Wage National Standard Order, 2025",
      url: "https://legislation.mt/eli/ln/2025/289/eng",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
  {
    id: "mt.first-time-buyer-duty-2025",
    fecha: "2026-10-26",
    titulo: "First-time buyers keep the duty exemption on the first €200,000",
    texto:
      "For purchases from 28 October 2025, a first-time buyer of a home pays no duty on the first €200,000 if they never bought a residential property before. The stamp duty calculator applies it.",
    vigenteDesde: "2025-10-28",
    calculadoras: ["mt.stamp-duty-calculator"],
    fuente: {
      organismo: "Legislation Unit, Government of Malta",
      titulo: "Exemption of Duty in terms of Article 23 Order (S.L. 364.12), article 3",
      url: "https://legislation.mt/eli/sl/364.12/eng",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
];
