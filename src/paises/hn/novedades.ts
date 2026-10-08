import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "hn.salario-minimo-2026-2027",
    fecha: "2026-04-29",
    titulo: "Salario mínimo 2026 y 2027",
    texto:
      "El Acuerdo SETRASS-233-2026 sube el salario mínimo desde el 1 de enero de 2026: 6 % en empresas de 1 a 50 trabajadores y 7 % en las de 51 o más. También fija la tabla de 2027, con un 7.5 % para las de 151 o más. La diferencia de enero a abril de 2026 se tenía que pagar a más tardar el 31 de julio.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["hn.salario-minimo"],
    fuente: {
      organismo: "Secretaría de Trabajo y Seguridad Social (La Gaceta No. 37,129 del 29/4/2026)",
      titulo: "Acuerdo Ejecutivo SETRASS-233-2026",
      url: "https://tsc.gob.hn/web/leyes/Acuerdo-SETRASS-233-2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "hn.isr-tabla-2026",
    fecha: "2026-01-07",
    titulo: "Nueva tabla del ISR para 2026",
    texto:
      "El SAR actualizó la tabla progresiva con la inflación de 2025 (4.98 %). Con un salario de L22,360.36 al mes o menos no se paga ISR en 2026.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["hn.impuesto-sobre-la-renta"],
    fuente: {
      organismo: "Servicio de Administración de Rentas (SAR)",
      titulo: "Comunicado SAR 02-2026, Actualización de la tabla progresiva 2026",
      url: "https://www.sar.gob.hn/2026/01/actualizacion-de-la-tabla-progresiva-2026/",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
];
