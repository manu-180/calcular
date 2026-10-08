import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ni.salario-minimo-2026",
    fecha: "2026-03-06",
    titulo: "Nuevo salario mínimo desde el 1 de marzo de 2026",
    texto:
      "Sube 4 % en casi todos los sectores y rige hasta el 28 de febrero de 2027. En la industria manufacturera queda en C$8,320.48 al mes y en construcción, finanzas y seguros en C$13,848.23. Las zonas francas subieron 6.7 % desde enero.",
    vigenteDesde: "2026-03-01",
    calculadoras: ["ni.salario-minimo"],
    fuente: {
      organismo: "La Gaceta, Diario Oficial (Ministerio del Trabajo)",
      titulo: "Acuerdo Ministerial No. 02-2026, La Gaceta No. 43 del 6/3/2026",
      url: "https://www.lagaceta.gob.ni/la-gaceta-no-43-viernes-06-de-marzo-de-2026/",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "ni.tipo-cambio-2026",
    fecha: "2025-10-20",
    titulo: "El tipo de cambio queda fijo todo 2026",
    texto: "El Banco Central mantuvo el deslizamiento del córdoba en 0 % para 2026. El tipo de cambio oficial es de 36.6243 córdobas por dólar todo el año.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ni.tipo-de-cambio"],
    fuente: {
      organismo: "Banco Central de Nicaragua",
      titulo: "Nota de prensa del 20 de octubre de 2025 sobre la tasa de deslizamiento para 2026",
      url: "https://www.bcn.gob.ni/sites/default/files/noticias/notas_prensa/2025/np_tcdeslizamineto201025.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
];
