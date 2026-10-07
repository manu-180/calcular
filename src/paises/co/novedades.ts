import type { Novedad } from "@/motor/tipos";

const LEY_2466 = {
  organismo: "Congreso de la República",
  url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=260676",
  tipo: "primaria",
  verificadoEl: "2026-10-07",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "co.jornada-42-horas",
    fecha: "2026-07-15",
    titulo: "La jornada máxima baja a 42 horas por semana",
    texto: "Desde el 15 de julio de 2026 la jornada máxima es de 42 horas a la semana. El valor de la hora sube porque el salario se reparte entre menos horas. Ya lo usan las calculadoras de horas extras y salario mínimo.",
    vigenteDesde: "2026-07-15",
    calculadoras: ["co.horas-extras", "co.salario-minimo"],
    fuente: { ...LEY_2466, titulo: "Ley 2101 de 2021, artículo 3, y Ley 2466 de 2025, artículo 11" },
  },
  {
    id: "co.recargo-dominical-90",
    fecha: "2026-07-01",
    titulo: "El recargo por domingo o festivo sube al 90 %",
    texto: "Desde el 1 de julio de 2026 el trabajo en domingo o festivo se paga con un recargo del 90 %. Antes era del 80 %. En julio de 2027 llega al 100 %.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["co.horas-extras"],
    fuente: { ...LEY_2466, titulo: "Ley 2466 de 2025, artículo 14" },
  },
  {
    id: "co.uvt-2026",
    fecha: "2025-12-17",
    titulo: "La UVT 2026 queda en $52.374",
    texto: "La DIAN fijó la UVT para 2026 en $52.374. Cambian la retención en la fuente y todos los valores tributarios en UVT.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["co.uvt", "co.retencion-en-la-fuente", "co.salario-neto"],
    fuente: {
      organismo: "DIAN",
      titulo: "Resolución 000238 de 2025",
      url: "https://normograma.dian.gov.co/dian/compilacion/docs/resolucion_dian_0238_2025.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "co.smmlv-2026",
    fecha: "2025-12-29",
    titulo: "Salario mínimo 2026: $1.750.905",
    texto: "El salario mínimo sube 23 % y queda en $1.750.905 desde el 1 de enero de 2026. Ya lo usan todas las calculadoras laborales.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["co.salario-minimo", "co.liquidacion", "co.prima-de-servicios", "co.cesantias", "co.salario-neto"],
    fuente: {
      organismo: "Presidencia de la República y Ministerio del Trabajo",
      titulo: "Decreto 1469 de 2025",
      url: "https://normativa.colpensiones.gov.co/compilacion/docs/decreto_1469_2025.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "co.auxilio-2026",
    fecha: "2025-12-29",
    titulo: "Auxilio de transporte 2026: $249.095",
    texto: "El auxilio de transporte para quienes ganan hasta dos salarios mínimos queda en $249.095 al mes desde el 1 de enero de 2026.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["co.auxilio-de-transporte", "co.liquidacion", "co.prima-de-servicios", "co.cesantias", "co.salario-neto"],
    fuente: {
      organismo: "Presidencia de la República y Ministerio del Trabajo",
      titulo: "Decreto 1470 de 2025",
      url: "https://normativa.colpensiones.gov.co/compilacion/docs/decreto_1470_2025.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "co.nocturno-desde-las-7",
    fecha: "2025-12-25",
    titulo: "El trabajo nocturno empieza a las 7:00 p. m.",
    texto: "Desde el 25 de diciembre de 2025 el trabajo nocturno va de las 7:00 p. m. a las 6:00 a. m. Las horas en ese horario tienen recargo nocturno.",
    vigenteDesde: "2025-12-25",
    calculadoras: ["co.horas-extras"],
    fuente: { ...LEY_2466, titulo: "Ley 2466 de 2025, artículo 10" },
  },
];
