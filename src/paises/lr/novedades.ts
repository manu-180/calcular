import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "lr.gst-13-may-2026",
    fecha: "2026-10-27",
    titulo: "GST rises to 13% on goods and services",
    texto:
      "The Liberia Tax Amendment Act of December 2025 set GST at 13% on goods and on services. The LRA has applied it since 1 May 2026. Our GST calculator already uses the new rate.",
    vigenteDesde: "2026-05-01",
    calculadoras: ["lr.gst-calculator"],
    fuente: {
      organismo: "LRA",
      titulo: "Important revenue notice: adjustment to Goods and Services Tax (GST) rates",
      url: "https://revenue.lra.gov.lr/important-revenue-noticeadjustment-to-goods-and-services-tax-gst-rates/",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "lr.excise-may-2026",
    fecha: "2026-10-27",
    titulo: "New excise rates on alcohol, tobacco and sweet drinks",
    texto:
      "The same Act replaced the excise tariff: beer and wine now pay US$1 a litre and spirits US$3 a litre, whether imported or made in Liberia. From 1 January 2027 these rates rise each year with inflation and growth.",
    vigenteDesde: "2026-05-01",
    calculadoras: ["lr.excise-tax"],
    fuente: {
      organismo: "LRA",
      titulo: "Liberia Tax Amendment Act of December 2025",
      url: "https://revenue.lra.gov.lr/wp-content/uploads/2026/04/LRC-Amendment-December-2025.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
