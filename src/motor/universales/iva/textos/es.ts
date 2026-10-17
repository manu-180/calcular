import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

const base: TextosUi<UiIva> = {
  slug: "iva",
  ui: (trato) => ({
    operacion: segunTrato(trato, { tu: "¿Qué quieres hacer?", usted: "¿Qué quiere hacer?", vos: "¿Qué querés hacer?" }),
    agregar: "Agregar el IVA a un precio sin IVA",
    quitar: "Quitar el IVA de un precio con IVA",
    monto: "Precio",
    montoAyuda: segunTrato(trato, {
      tu: "Sin IVA si vas a agregarlo; con IVA si vas a quitarlo.",
      usted: "Sin IVA si va a agregarlo; con IVA si va a quitarlo.",
      vos: "Sin IVA si vas a agregarlo; con IVA si vas a quitarlo.",
    }),
    otraTasa: "Otra tasa de IVA (%)",
    otraTasaAyuda: segunTrato(trato, {
      tu: "Opcional. Si tu producto paga una tasa reducida, escríbela. Si no, se usa la tasa general.",
      usted: "Opcional. Si su producto paga una tasa reducida, escríbala. Si no, se usa la tasa general.",
      vos: "Opcional. Si tu producto paga una tasa reducida, escribila. Si no, se usa la tasa general.",
    }),
    neto: "Precio sin IVA",
    impuesto: "IVA",
    total: "Precio con IVA",
    tasaUsada: "Tasa aplicada",
    errorTasa: "La tasa de IVA no es válida.",
  }),
};

const espana = (): Partial<UiIva> => ({
  agregar: "Añadir el IVA a un precio sin IVA",
  montoAyuda: "Sin IVA si vas a añadirlo; con IVA si vas a quitarlo.",
  otraTasa: "Otro tipo de IVA (%)",
  otraTasaAyuda: "Opcional. Si tu producto tiene un tipo reducido o superreducido, escríbelo. Si no, se usa el tipo general.",
  tasaUsada: "Tipo aplicado",
  errorTasa: "El tipo de IVA no es válido.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
