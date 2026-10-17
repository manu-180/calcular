import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "es.smi-2026",
    fecha: "2026-02-19",
    titulo: "El salario mínimo sube a 1.221 euros al mes en 2026",
    texto: "El Real Decreto 126/2026 fija el SMI en 1.221 euros al mes en 14 pagas (17.094 euros al año), con efectos desde el 1 de enero de 2026. Ya lo usan las calculadoras de salario mínimo y de sueldo neto.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["es.salario-minimo", "es.sueldo-neto"],
    fuente: {
      organismo: "BOE",
      titulo: "Real Decreto 126/2026, de 18 de febrero",
      url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-3815",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "es.cotizacion-2026",
    fecha: "2026-03-31",
    titulo: "Nuevas bases y tipos de cotización para 2026",
    texto: "La Orden PJC/297/2026 sube la base máxima a 5.101,20 euros al mes, deja el MEI en el 0,90 % y fija los tramos de la cotización de solidaridad y de la cuota de autónomos para 2026.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["es.sueldo-neto", "es.cotizacion-seguridad-social", "es.coste-trabajador", "es.cuota-autonomos"],
    fuente: {
      organismo: "BOE",
      titulo: "Orden PJC/297/2026, de 30 de marzo",
      url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-7296",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
