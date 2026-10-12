import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "py.salario-minimo-julio-2026",
    fecha: "2026-07-10",
    titulo: "El salario mínimo sube 5 % y llega a Gs. 3.044.000",
    texto:
      "Desde el 1 de julio de 2026 el salario mínimo para actividades diversas no especificadas es de Gs. 3.044.000 por mes (antes, Gs. 2.899.048). El jornal mínimo pasa a Gs. 117.077 y la hora del mensualero a Gs. 12.683. El aumento lo dispuso el Decreto N° 6.225 y lo reglamentó la Resolución MTESS N° 670/2026.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["py.salario-minimo", "py.jornal-minimo", "py.vacaciones", "py.bonificacion-familiar", "py.salario-neto", "py.salario-minimo-por-actividad", "py.tiempo-parcial", "py.trabajo-nocturno", "py.ips-independiente"],
    fuente: {
      organismo: "Ministerio de Trabajo, Empleo y Seguridad Social (MTESS)",
      titulo: "Resolución MTESS N° 670/2026 (reglamenta el Decreto N° 6.225/2026)",
      url: "https://www.mtess.gov.py/wp-content/uploads/2026/07/Resolucion-MTESS-N%C2%B0-670-REGLAMENTACION-SALARIO-2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
];
