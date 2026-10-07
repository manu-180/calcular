import type { Novedad } from "@/motor/tipos";

const SRI = "Servicio de Rentas Internas (SRI)";

export const novedades: readonly Novedad[] = [
  {
    id: "ec.gastos-personales-2026",
    fecha: "2026-02-06",
    titulo: "Gastos personales 2026: el tope usa la canasta de $821,80",
    texto: "Para el impuesto a la renta de 2026, la rebaja por gastos personales es el 18 % de tus gastos, con un tope de 7 canastas sin cargas y hasta 20 con cinco cargas o más. La canasta de enero de 2026 es de $821,80. La proyección de gastos se entrega al empleador en febrero.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ec.impuesto-a-la-renta", "ec.sueldo-neto"],
    fuente: {
      organismo: SRI,
      titulo: "Boletín NAC-COM-26-006 del 6/2/2026",
      url: "https://www.sri.gob.ec/o/sri-portlet-biblioteca-alfresco-internet/descargar/ea002a89-17d8-4cdf-be42-affedbe3f8d8/BOLET%C3%8DN%20006%20-%20SRI%20HABILITA%20LA%20PROYECCI%C3%93N%20DE%20GASTOS%20PERSONALES%202026%20PARA%20REDUCIR%20EL%20IMPUESTO%20A%20LA%20RENTA.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "ec.tabla-renta-2026",
    fecha: "2025-12-30",
    titulo: "Nueva tabla del impuesto a la renta: no pagas hasta $12.208",
    texto: "Para 2026 la fracción exenta del impuesto a la renta sube a $12.208 al año (en 2025 era $12.081). La tabla tiene diez tramos, del 0 % al 37 %. Ya la usan las calculadoras de impuesto a la renta y sueldo neto.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ec.impuesto-a-la-renta", "ec.sueldo-neto"],
    fuente: {
      organismo: SRI,
      titulo: "Resolución NAC-DGERCGC25-00000043, Registro Oficial Segundo Suplemento 194 del 30/12/2025",
      url: "https://www.sri.gob.ec/o/sri-portlet-biblioteca-alfresco-internet/descargar/58a7f4f6-ab51-48b6-b9ff-a8e97e1a28ef/Tablas%20de%20c%c3%a1lculo%20de%20Impuesto%20a%20la%20Renta.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "ec.iva-15-2026",
    fecha: "2025-12-26",
    titulo: "El IVA sigue en 15 % en 2026",
    texto: "El SRI recordó que, sin un decreto nuevo, se mantiene la última tarifa fijada. Por eso el IVA sigue en 15 % en 2026, hasta que el Presidente lo cambie.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ec.iva"],
    fuente: {
      organismo: SRI,
      titulo: "Circular NAC-DGECCGC25-00000006 del 26/12/2025",
      url: "https://www.sri.gob.ec/o/sri-portlet-biblioteca-alfresco-internet/descargar?id=236482f4-6125-42fd-b073-62c99d08233d&nombre=NAC-DGECCGC25-00000006.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "ec.sbu-2026",
    fecha: "2025-12-18",
    titulo: "El salario básico sube a $482",
    texto: "Desde el 1 de enero de 2026 el salario básico unificado es de $482. Con él cambian el décimo cuarto, la base mínima de aportación al IESS y los cálculos que dependen del básico.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ec.salario-basico", "ec.decimo-cuarto-sueldo", "ec.liquidacion", "ec.sueldo-neto"],
    fuente: {
      organismo: "Instituto Ecuatoriano de Seguridad Social (IESS)",
      titulo: "Afiliación: base mínima de aportación de $482,00, el salario básico vigente para 2026",
      url: "https://www.iess.gob.ec/aplicaciones/AfiliacionIESS/",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
      nota: "Fijado por el Acuerdo Ministerial MDT-2025-195, Registro Oficial Suplemento 187 del 18/12/2025: https://www.registroficial.gob.ec/suplemento-no-187/",
    },
  },
];
