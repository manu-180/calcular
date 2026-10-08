import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "zz.minimo-octubre-2026",
    fecha: "2026-10-07",
    titulo: "Sube el salario mínimo de la zona norte",
    texto: "Desde el 1 de octubre de 2026 el mínimo de la zona norte pasa de 1000 a 1100. La calculadora del bono ya lo usa.",
    vigenteDesde: "2026-10-01",
    calculadoras: ["zz.bono"],
    fuente: {
      organismo: "Diario Oficial de Zetalandia",
      titulo: "Decreto 15 de 2026",
      url: "https://example.org/zz/decreto-15-2026",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
];
