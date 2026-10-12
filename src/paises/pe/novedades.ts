import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "pe.rmv-octubre-2026",
    fecha: "2026-09-28",
    titulo: "La remuneración mínima sube a S/ 1,230",
    texto:
      "Desde el 1 de octubre de 2026 la RMV pasa de S/ 1,130 a S/ 1,230, y la asignación familiar de S/ 113 a S/ 123. Ya lo usan las calculadoras de gratificación, CTS, liquidación, vacaciones, horas extras e indemnización. El Gobierno anunció un segundo tramo de S/ 70 para el primer semestre de 2027.",
    vigenteDesde: "2026-10-01",
    calculadoras: ["pe.sueldo-minimo", "pe.gratificacion", "pe.cts", "pe.liquidacion", "pe.vacaciones", "pe.horas-extras", "pe.despido-arbitrario", "pe.trabajadora-del-hogar", "pe.costo-laboral"],
    fuente: {
      organismo: "El Peruano",
      titulo: "Decreto Supremo 015-2026-TR",
      url: "https://busquedas.elperuano.pe/dispositivo/EX/2559163-1",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "pe.suspension-cuarta-2026",
    fecha: "2025-12-31",
    titulo: "Nuevos topes para suspender las retenciones de cuarta categoría",
    texto:
      "Para 2026 puedes pedir la suspensión de retenciones si calculas ganar con recibos por honorarios hasta S/ 48,125 en el año. Para directores, síndicos y mandatarios el tope es S/ 38,500.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["pe.cuarta-categoria"],
    fuente: {
      organismo: "El Peruano",
      titulo: "Resolución de Superintendencia 000390-2025/SUNAT",
      url: "https://busquedas.elperuano.pe/dispositivo/NL/2472998-1",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "pe.uit-2026",
    fecha: "2025-12-17",
    titulo: "La UIT de 2026 es S/ 5,500",
    texto:
      "La unidad impositiva tributaria vale S/ 5,500 durante todo 2026. Cambia la deducción de 7 UIT (ahora S/ 38,500) y los tramos del impuesto a la renta de trabajo.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["pe.conversor-uit", "pe.renta-quinta"],
    fuente: {
      organismo: "El Peruano",
      titulo: "Decreto Supremo 301-2025-EF",
      url: "https://busquedas.elperuano.pe/dispositivo/NL/2469116-1",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "pe.igv-ipm-2026",
    fecha: "2026-01-01",
    titulo: "El IGV baja a 15.5 % y el IPM sube a 2.5 %",
    texto:
      "Desde 2026 la Ley 32387 pasa medio punto por año del IGV al impuesto de promoción municipal, hasta 2029. Lo que paga quien compra no cambia: la tasa total sigue en 18 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["pe.igv"],
    fuente: {
      organismo: "SUNAT",
      titulo: "Orientación SUNAT: concepto, tasa y operaciones gravadas del IGV",
      url: "https://orientacion.sunat.gob.pe/3053-concepto-tasa-y-operaciones-gravadas-igv-empresas",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "pe.alquiler-renta-percibida-2026",
    fecha: "2025-12-31",
    titulo: "El impuesto mensual del alquiler se paga sobre lo que cobras",
    texto:
      "Desde 2026 el pago a cuenta de la renta de primera categoría se calcula sobre el alquiler efectivamente cobrado en el mes, con el recibo por arrendamiento que se emite al recibir el pago. La tasa no cambia: 6.25 % sobre el alquiler menos 20 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["pe.renta-primera"],
    fuente: {
      organismo: "SUNAT",
      titulo: "Ley del Impuesto a la Renta, artículo 84 (modificado por la Ley 32541)",
      url: "https://www.sunat.gob.pe/legislacion/renta/ley/capxi.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-12",
    },
  },
];
