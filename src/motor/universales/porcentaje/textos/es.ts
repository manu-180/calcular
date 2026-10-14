import { segunTrato, type TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosEs: TextosUi<UiPorcentaje> = {
  slug: "porcentaje",
  ui: (trato) => ({
    modo: segunTrato(trato, { tu: "¿Qué quieres calcular?", usted: "¿Qué quiere calcular?", vos: "¿Qué querés calcular?" }),
    modoParte: "¿Cuánto es el X % de Y?",
    modoProporcion: "¿Qué porcentaje de Y es X?",
    modoAumento: "Y más el X %",
    modoRebaja: "Y menos el X %",
    x: "Número X",
    xAyuda: "El porcentaje. Si eliges «¿Qué porcentaje de Y es X?», es la parte.",
    y: "Número Y",
    resultado: "Resultado",
    porcentaje: "Porcentaje",
    diferencia: "Cuánto se suma o se resta",
    errorYCero: "Y no puede ser 0: no existe un porcentaje de cero.",
    fraseParte: (x, y, r) => `El ${x} % de ${y} es ${r}.`,
    fraseProporcion: (x, y, p) => `${x} es el ${p} % de ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} más el ${x} % da ${r}: se suman ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} menos el ${x} % da ${r}: se restan ${d}.`,
  }),
};
