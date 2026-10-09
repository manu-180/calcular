import type { Novedad } from "@/motor/tipos";

const IMPO = "IMPO (Diario Oficial)";

export const novedades: readonly Novedad[] = [
  {
    id: "uy.domestico-julio-2026",
    fecha: "2026-07-06",
    titulo: "Trabajo doméstico: tres categorías con mínimos propios",
    texto: "Desde el 1 de julio de 2026 el trabajo doméstico tiene tres categorías: general ($ 32.051 por mes), cocina ($ 33.796) y cuidados ($ 34.885), por 44 horas semanales. Por hora: $ 169, $ 178 y $ 184.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["uy.trabajo-domestico"],
    fuente: {
      organismo: "Banco de Previsión Social (BPS)",
      titulo: "Comunicado R 14/2026: trabajo doméstico, aumento salarial julio 2026",
      url: "https://www.bps.gub.uy/bps/file/24374/2/2026---comunicado-r-14---trabajo-domestico-aumento-salarial-julio-2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-08",
    },
  },
  {
    id: "uy.smn-julio-2026",
    fecha: "2026-07-01",
    titulo: "El salario mínimo sube a $ 25.383",
    texto: "Desde el 1 de julio de 2026 el Salario Mínimo Nacional es de $ 25.383 por mes: $ 1.015,32 por jornal y $ 126,92 por hora. Es el segundo tramo del aumento fijado para 2026.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["uy.salario-minimo", "uy.horas-extra"],
    fuente: {
      organismo: IMPO,
      titulo: "Decreto 319/025, artículo 2",
      url: "https://www.impo.com.uy/bases/decretos/319-2025",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "uy.bpc-2026",
    fecha: "2026-01-29",
    titulo: "La BPC de 2026 es de $ 6.864",
    texto: "Desde el 1 de enero de 2026 la Base de Prestaciones y Contribuciones vale $ 6.864 (en 2025 era $ 6.576). Con ella se calculan las franjas del IRPF, el umbral del Fonasa y la deducción por hijos.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["uy.sueldo-liquido", "uy.irpf", "uy.valor-ui", "uy.salario-vacacional", "uy.liquidacion-por-egreso"],
    fuente: {
      organismo: IMPO,
      titulo: "Decreto 11/026, publicado el 29/01/2026",
      url: "https://www.impo.com.uy/bases/decretos/11-2026",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "uy.smn-enero-2026",
    fecha: "2026-01-12",
    titulo: "El salario mínimo de enero de 2026 es de $ 24.572",
    texto: "El Decreto 319/025 subió el Salario Mínimo Nacional en dos tramos: 4,1 % desde el 1 de enero de 2026 ($ 24.572) y 3,3 % desde el 1 de julio ($ 25.383).",
    vigenteDesde: "2026-01-01",
    calculadoras: ["uy.salario-minimo"],
    fuente: {
      organismo: IMPO,
      titulo: "Decreto 319/025, publicado el 12/01/2026",
      url: "https://www.impo.com.uy/bases/decretos/319-2025",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
];
