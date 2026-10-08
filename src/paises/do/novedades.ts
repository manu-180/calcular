import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "do.ley-30-26-isr-2027",
    fecha: "2026-06-18",
    titulo: "Ley 30-26: nueva escala del ISR desde 2027",
    texto: "Desde el ejercicio 2027 el monto exento del ISR sube a RD$480,000 al año y aparece un tramo de 27 % para rentas de más de RD$4,800,000. En 2026 sigue la escala actual. Cuando la DGII confirme la escala de 2027, la cargamos en las calculadoras de ISR y salario neto.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["do.isr-asalariados", "do.salario-neto"],
    fuente: {
      organismo: "Dirección General de Impuestos Internos (DGII)",
      titulo: "Ley 30-26 del 18/6/2026, artículo 10",
      url: "https://dgii.gov.do/legislacion/leyesTributarias/Documents/Codigo%20Tributario%20y%20Leyes%20que%20lo%20modifican%20y%20complementan/30-26.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "do.topes-tss-2026",
    fecha: "2026-02-05",
    titulo: "Nuevos topes de cotización de la TSS",
    texto: "Desde el 1 de febrero de 2026 el salario mínimo nacional para los topes es RD$23,223. El tope del SFS queda en RD$232,230, el de pensiones en RD$464,460 y el de riesgos laborales en RD$92,892.",
    vigenteDesde: "2026-02-01",
    calculadoras: ["do.salario-neto", "do.isr-asalariados", "do.aportes-tss"],
    fuente: {
      organismo: "Tesorería de la Seguridad Social (TSS)",
      titulo: "TSS informa nuevos topes de cotización del Régimen Contributivo del SDSS",
      url: "https://tss.gob.do/tss-informa-nuevos-topes-de-cotizacion-del-regimen-contributivo-del-sdss/",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "do.salario-minimo-febrero-2026",
    fecha: "2026-02-03",
    titulo: "Sube 8 % el salario mínimo del sector privado",
    texto: "Desde el 1 de febrero de 2026 el mínimo es RD$29,988 en empresas grandes, RD$27,489.60 en medianas, RD$18,421.20 en pequeñas y RD$16,993.20 en microempresas. Es el segundo tramo de la Resolución CNS-01-2025. Ya lo usan las calculadoras de salario mínimo, regalía y prestaciones.",
    vigenteDesde: "2026-02-01",
    calculadoras: ["do.salario-minimo", "do.regalia-pascual", "do.prestaciones-laborales"],
    fuente: {
      organismo: "Ministerio de Trabajo",
      titulo: "Ministerio de Trabajo llama a empresarios a cumplir con el pago del aumento del 8 % del salario mínimo",
      url: "https://mt.gob.do/ministerio-de-trabajo-llama-a-empresarios-a-cumplir-con-el-pago-del-aumento-del-8-del-salario-minimo/",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
];
