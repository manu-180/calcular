import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "gt.isr-decreto-13-2026",
    fecha: "2026-05-15",
    titulo: "Quien gana el salario mínimo deja de pagar ISR",
    texto:
      "El Decreto 13-2026 suma una deducción extraordinaria de Q3,024 para las rentas del trabajo de 2026, sin comprobantes. Desde 2027 la deducción fija de Q48,000 se reemplaza por 12 salarios mínimos no agrícolas más la bonificación incentivo, y se actualiza sola cada año.",
    vigenteDesde: "2026-05-23",
    calculadoras: ["gt.isr-asalariados", "gt.sueldo-liquido"],
    fuente: {
      organismo: "Congreso de la República (Diario de Centro América del 15/5/2026)",
      titulo: "Decreto 13-2026, reformas a la Ley de Actualización Tributaria",
      url: "https://www.congreso.gob.gt/assets/uploads/info_legislativo/decretos/3bcf4-13-2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "gt.salario-minimo-2026",
    fecha: "2025-12-19",
    titulo: "Salario mínimo 2026",
    texto:
      "Desde el 1 de enero de 2026 el salario mínimo no agrícola es de Q4,002.28 al mes en el departamento de Guatemala y de Q3,816.90 en el resto del país. El agrícola es de Q3,791.20 y Q3,625.89, y el de exportadora y maquila de Q3,409.73 y Q3,221.10.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["gt.salario-minimo"],
    fuente: {
      organismo: "Ministerio de Trabajo y Previsión Social",
      titulo: "Acuerdo Gubernativo 256-2025",
      url: "https://mintrabajo.gob.gt/wp-content/uploads/2026/06/Acuerdo-Gubernativo-Numero-256-2025-Salario-Minino.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
];
