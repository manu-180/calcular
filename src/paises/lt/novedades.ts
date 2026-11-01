import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "lt.mma-2026",
    fecha: "2026-11-01",
    titulo: "MMA nuo 2026 m. sausio: 1153 eurai",
    texto: "Eurostato duomenimis, Lietuvos minimalioji mėnesinė alga 2026 m. siekia 1153 eurus, o 2025 m. buvo 1038 eurai. Šią sumą naudoja MMA skaičiuoklė.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["lt.mma"],
    fuente: {
      organismo: "Eurostat",
      titulo: "Minimum wages (earn_mw_cur), Lietuva",
      url: "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/earn_mw_cur?geo=LT&sinceTimePeriod=2025&currency=EUR&format=JSON",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
];
