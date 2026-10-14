import { segunTrato, type TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosEs: TextosUi<UiMetaDeAhorro> = {
  slug: "meta-de-ahorro",
  ui: (trato) => ({
    meta: segunTrato(trato, { tu: "¿Cuánto quieres juntar?", usted: "¿Cuánto quiere juntar?", vos: "¿Cuánto querés juntar?" }),
    actual: segunTrato(trato, { tu: "Lo que ya tienes ahorrado (opcional)", usted: "Lo que ya tiene ahorrado (opcional)", vos: "Lo que ya tenés ahorrado (opcional)" }),
    meses: "Plazo en meses",
    rendimiento: "Rendimiento anual del ahorro (%, opcional)",
    rendimientoAyuda: segunTrato(trato, {
      tu: "Si el dinero está en una cuenta o inversión que paga interés. Si lo guardas sin invertir, déjalo vacío.",
      usted: "Si el dinero está en una cuenta o inversión que paga interés. Si lo guarda sin invertir, déjelo vacío.",
      vos: "Si el dinero está en una cuenta o inversión que paga interés. Si lo guardás sin invertir, dejalo vacío.",
    }),
    aporteMensual: segunTrato(trato, { tu: "Lo que tienes que ahorrar por mes", usted: "Lo que tiene que ahorrar por mes", vos: "Lo que tenés que ahorrar por mes" }),
    aporteSemanal: "Equivale por semana a",
    totalAportado: "Total de aportes",
    intereses: "Intereses ganados",
    errorMeta: segunTrato(trato, {
      tu: "Escribe cuánto quieres juntar.",
      usted: "Escriba cuánto quiere juntar.",
      vos: "Escribí cuánto querés juntar.",
    }),
    yaLlegas: segunTrato(trato, {
      tu: "Con lo que ya tienes llegas a la meta en ese plazo, sin aportar más.",
      usted: "Con lo que ya tiene llega a la meta en ese plazo, sin aportar más.",
      vos: "Con lo que ya tenés llegás a la meta en ese plazo, sin aportar más.",
    }),
  }),
};
