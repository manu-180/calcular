import type { Fuente, Novedad } from "@/motor/tipos";

function dof(codigo: string, fecha: string, titulo: string): Fuente {
  return { organismo: "DOF", titulo, url: `https://dof.gob.mx/nota_detalle.php?codigo=${codigo}&fecha=${fecha}`, tipo: "primaria", verificadoEl: "2026-10-07" };
}

export const novedades: readonly Novedad[] = [
  {
    id: "mx.jornada-40-horas",
    fecha: "2026-05-01",
    titulo: "Empieza la reducción de la jornada a 40 horas",
    texto:
      "La reforma a la Ley Federal del Trabajo rige desde el 1 de mayo de 2026. La jornada máxima baja dos horas por año hasta llegar a 40 en 2030, y el límite de horas extra dobles sube de 9 a 12 por semana en el mismo plazo. Las horas que pasan ese límite se pagan triples.",
    vigenteDesde: "2026-05-01",
    calculadoras: ["mx.horas-extra"],
    fuente: dof("5786537", "01/05/2026", "Decreto de reforma a la Ley Federal del Trabajo en materia de reducción de la jornada laboral"),
  },
  {
    id: "mx.uma-2026",
    fecha: "2026-01-09",
    titulo: "Nueva UMA desde febrero de 2026",
    texto: "El INEGI publicó la UMA que rige desde el 1 de febrero de 2026: 117.31 pesos diarios y 3,566.22 mensuales. Cambian los límites exentos de aguinaldo, prima vacacional, PTU e indemnizaciones, el subsidio para el empleo y el tope del IMSS.",
    vigenteDesde: "2026-02-01",
    calculadoras: ["mx.uma", "mx.aguinaldo", "mx.sueldo-neto", "mx.isr", "mx.ptu", "mx.liquidacion", "mx.vacaciones"],
    fuente: { ...dof("5778072", "09/01/2026", "Unidad de Medida y Actualización 2026"), organismo: "INEGI en el DOF" },
  },
  {
    id: "mx.subsidio-empleo-2026",
    fecha: "2025-12-31",
    titulo: "Subsidio para el empleo 2026",
    texto: "Desde febrero el subsidio es el 15.02 % de la UMA mensual y lo reciben quienes ganan hasta 11,492.66 pesos al mes. En enero se usó el 15.59 % de la UMA de 2025.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mx.sueldo-neto", "mx.isr", "mx.aguinaldo"],
    fuente: dof("5777649", "31/12/2025", "Decreto que modifica el diverso que otorga el subsidio para el empleo"),
  },
  {
    id: "mx.tarifas-isr-2026",
    fecha: "2025-12-28",
    titulo: "Nuevas tarifas de retención del ISR para 2026",
    texto: "El SAT actualizó las tarifas semanales, decenales, quincenales y mensuales del ISR en el Anexo 8 de la Resolución Miscelánea Fiscal para 2026.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mx.sueldo-neto", "mx.isr", "mx.aguinaldo"],
    fuente: { ...dof("5777219", "28/12/2025", "Anexo 8 de la Resolución Miscelánea Fiscal para 2026"), organismo: "SAT en el DOF" },
  },
  {
    id: "mx.salario-minimo-2026",
    fecha: "2025-12-09",
    titulo: "Salario mínimo 2026",
    texto: "Desde el 1 de enero de 2026 el salario mínimo general es de 315.04 pesos diarios (13 % más) y en la Zona Libre de la Frontera Norte de 440.87 pesos (5 % más).",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mx.salario-minimo", "mx.finiquito", "mx.liquidacion", "mx.sueldo-neto", "mx.isr", "mx.aguinaldo"],
    fuente: dof("5775534", "09/12/2025", "Resolución de la CONASAMI que fija los salarios mínimos desde el 1 de enero de 2026"),
  },
  {
    id: "mx.iva-frontera-2026",
    fecha: "2025-12-31",
    titulo: "Se renueva el IVA reducido en la frontera norte",
    texto: "El estímulo que deja el IVA en 8 % en la región fronteriza norte sigue vigente hasta el 31 de diciembre de 2026.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mx.iva"],
    fuente: dof("5777697", "31/12/2025", "Decreto que modifica los de estímulos fiscales de las regiones fronterizas"),
  },
];
