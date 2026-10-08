import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "sv.aguinaldo-desde-octubre-2026",
    fecha: "2026-09-30",
    titulo: "El aguinaldo se puede pagar desde el 1 de octubre",
    texto: "La reforma aprobada en septiembre de 2026 adelanta el inicio del pago del aguinaldo al 1 de octubre, en el sector público y en el privado. El último día para pagarlo sigue siendo el 20 de diciembre.",
    vigenteDesde: "2026-10-01",
    calculadoras: ["sv.aguinaldo"],
    fuente: {
      organismo: "Ministerio de Trabajo y Previsión Social",
      titulo: "Mayor protección laboral y propuestas de nuevas jornadas de trabajo (30/9/2026)",
      url: "https://www.mtps.gob.sv/2026/09/30/mayor-proteccion-laboral-y-propuestas-de-nuevas-jornadas-de-trabajo/",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
  {
    id: "sv.ley-quincena-25",
    fecha: "2026-01-14",
    titulo: "Nueva Quincena 25: la mitad del salario cada enero",
    texto: "La Ley Especial Quincena Veinticinco crea un pago del 50 % del salario mensual para quienes ganan hasta $1,500. Se paga entre el 15 y el 25 de enero, sin renta, ISSS ni AFP. En 2026 fue voluntaria para las empresas privadas y desde 2027 es obligatoria.",
    vigenteDesde: "2026-01-14",
    calculadoras: ["sv.quincena-25"],
    fuente: {
      organismo: "Asamblea Legislativa",
      titulo: "Ley Especial Quincena Veinticinco (D.L. 499, D.O. 8 del 14/1/2026)",
      url: "https://www.asamblea.gob.sv/sites/default/files/documents/decretos/D72EB960-89D5-443E-AE2D-196F677CB0F2.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-07",
    },
  },
];
