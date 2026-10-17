import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

const base: TextosUi<UiTarifaFreelance> = {
  slug: "cuanto-cobrar-por-hora",
  ui: (trato) => ({
    ingreso: segunTrato(trato, {
      tu: "Lo que quieres ganar en limpio por año",
      usted: "Lo que quiere ganar en limpio por año",
      vos: "Lo que querés ganar en limpio por año",
    }),
    ingresoAyuda: segunTrato(trato, {
      tu: "Después de impuestos y gastos. Es tu sueldo como independiente.",
      usted: "Después de impuestos y gastos. Es su sueldo como independiente.",
      vos: "Después de impuestos y gastos. Es tu sueldo como independiente.",
    }),
    gastos: "Gastos del negocio por año",
    gastosAyuda: "Equipo, software, internet, cursos, contador, seguro de salud y aportes voluntarios.",
    impuestos: "Impuestos y aportes estimados (%)",
    impuestosAyuda: segunTrato(trato, {
      tu: "Lo que se va en impuestos sobre lo que facturas, menos los gastos. Si no lo sabes, consulta a un contador. 25 % es un punto de partida.",
      usted: "Lo que se va en impuestos sobre lo que factura, menos los gastos. Si no lo sabe, consulte a un contador. 25 % es un punto de partida.",
      vos: "Lo que se va en impuestos sobre lo que facturás, menos los gastos. Si no lo sabés, consultá a un contador. 25 % es un punto de partida.",
    }),
    diasLibres: "Días sin trabajar por año",
    diasLibresAyuda: "Vacaciones, feriados y días de enfermedad. Como nadie los paga, hay que cubrirlos con la tarifa.",
    diasSemana: "Días de trabajo por semana",
    horasSemana: "Horas facturables por semana",
    horasSemanaAyuda:
      "Solo las horas que se cobran. Las de buscar clientes, administrar y capacitarse no se facturan. Entre 20 y 30 de 40 es lo habitual.",
    tarifaHora: "Tarifa por hora",
    tarifaDia: "Tarifa por día",
    facturacionMensual: "Facturación necesaria por mes",
    facturacionAnual: "Facturación necesaria por año",
    horasAnio: "Horas facturables por año",
    errorIngreso: segunTrato(trato, {
      tu: "Escribe cuánto quieres ganar por año.",
      usted: "Escriba cuánto quiere ganar por año.",
      vos: "Escribí cuánto querés ganar por año.",
    }),
    errorImpuestos: "Los impuestos tienen que ser menores que 100 %.",
    errorDias: "Con esos días libres no queda ningún día de trabajo en el año.",
    errorHoras: segunTrato(trato, {
      tu: "Escribe cuántas horas por semana puedes cobrar.",
      usted: "Escriba cuántas horas por semana puede cobrar.",
      vos: "Escribí cuántas horas por semana podés cobrar.",
    }),
    observacionFacturables: segunTrato(trato, {
      tu: "Si cobras menos que esta tarifa, ganarás menos de lo que te propusiste o trabajarás más horas.",
      usted: "Si cobra menos que esta tarifa, ganará menos de lo que se propuso o trabajará más horas.",
      vos: "Si cobrás menos que esta tarifa, vas a ganar menos de lo que te propusiste o trabajar más horas.",
    }),
  }),
};

const espana = (): Partial<UiTarifaFreelance> => ({
  ingreso: "Lo que quieres ganar en neto al año",
  ingresoAyuda: "Después de impuestos y gastos. Es tu sueldo como autónomo.",
  gastos: "Gastos del negocio al año",
  gastosAyuda: "Equipo, software, internet, formación, gestoría, seguro de salud y plan de pensiones.",
  impuestos: "Impuestos y cuota de autónomo estimados (%)",
  impuestosAyuda:
    "Lo que se va en IRPF y cuota de autónomo sobre lo que facturas, menos los gastos. Si no lo sabes, pregunta a tu gestor. Un 25 % es un punto de partida.",
  diasLibres: "Días sin trabajar al año",
  diasLibresAyuda: "Vacaciones, festivos y días de baja. Como nadie te los paga, hay que cubrirlos con la tarifa.",
  diasSemana: "Días de trabajo a la semana",
  horasSemana: "Horas facturables a la semana",
  horasSemanaAyuda:
    "Solo las horas que se cobran. Las de buscar clientes, gestionar y formarse no se facturan. Entre 20 y 30 de 40 es lo habitual.",
  facturacionMensual: "Facturación necesaria al mes",
  facturacionAnual: "Facturación necesaria al año",
  horasAnio: "Horas facturables al año",
  errorIngreso: "Escribe cuánto quieres ganar al año.",
  errorImpuestos: "Los impuestos tienen que ser menores que el 100 %.",
  errorHoras: "Escribe cuántas horas a la semana puedes facturar.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
