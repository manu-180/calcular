import type { Novedad } from "@/motor/tipos";

const DIARIO_OFICIAL = "Diario Oficial de la República de Chile";

export const novedades: readonly Novedad[] = [
  {
    id: "cl.imm-mayo-2026",
    fecha: "2026-06-22",
    titulo: "El ingreso mínimo sube a $553.553",
    texto: "La Ley 21.830 sube el ingreso mínimo a $553.553 desde el 1 de mayo de 2026, con efecto retroactivo. Para menores de 18 y mayores de 65 queda en $412.938. Ya lo usan las calculadoras de sueldo mínimo, gratificación y horas extra.",
    vigenteDesde: "2026-05-01",
    calculadoras: ["cl.sueldo-minimo", "cl.gratificacion", "cl.horas-extra"],
    fuente: {
      organismo: DIARIO_OFICIAL,
      titulo: "Ley 21.830, publicada el 22/06/2026",
      url: "https://www.diariooficial.interior.gob.cl/publicaciones/2026/06/22/44481-B/01/2829298.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "cl.jornada-42-horas",
    fecha: "2026-04-26",
    titulo: "La jornada máxima baja a 42 horas",
    texto: "Desde el 26 de abril de 2026 la jornada ordinaria máxima es de 42 horas semanales. Con eso sube el valor de cada hora, y también el de la hora extra.",
    vigenteDesde: "2026-04-26",
    calculadoras: ["cl.horas-extra", "cl.sueldo-minimo"],
    fuente: {
      organismo: "Biblioteca del Congreso Nacional (BCN)",
      titulo: "Ley 21.561, artículo primero transitorio",
      url: "https://www.bcn.cl/leychile/navegar?idNorma=1191554",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "cl.topes-imponibles-2026",
    fecha: "2026-02-01",
    titulo: "Nuevo tope imponible: 90 UF",
    texto: "Desde las remuneraciones de febrero de 2026 el tope imponible para AFP y salud es de 90 UF (antes 87,8 UF). Para el seguro de cesantía es de 135,2 UF.",
    vigenteDesde: "2026-02-01",
    calculadoras: ["cl.sueldo-liquido"],
    fuente: {
      organismo: "Superintendencia de Pensiones",
      titulo: "Topes imponibles definitivos para 2026",
      url: "https://www.spensiones.cl/portal/institucional/594/w3-article-16921.html",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "cl.imm-enero-2026",
    fecha: "2026-01-01",
    titulo: "El ingreso mínimo sube a $539.000",
    texto: "Desde el 1 de enero de 2026 el ingreso mínimo es de $539.000, como lo fijó la Ley 21.751.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cl.sueldo-minimo", "cl.gratificacion", "cl.horas-extra"],
    fuente: {
      organismo: DIARIO_OFICIAL,
      titulo: "Ley 21.751, publicada el 28/06/2025",
      url: "https://www.diariooficial.interior.gob.cl/publicaciones/2025/06/28/44185/01/2665516.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "cl.honorarios-2026",
    fecha: "2025-12-26",
    titulo: "La retención de las boletas de honorarios sube a 15,25 %",
    texto: "Desde el 1 de enero de 2026 la retención de las boletas de honorarios es de 15,25 % (en 2025 era 14,5 %). En 2027 será 16 % y en 2028, 17 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cl.boleta-honorarios"],
    fuente: {
      organismo: "Servicio de Impuestos Internos (SII)",
      titulo: "Noticia del 26/12/2025",
      url: "https://www.sii.cl/noticias/2025/261225noti01smn.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
];
