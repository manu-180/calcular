import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

const base: TextosUi<UiCeramicos> = {
  slug: "cuantos-ceramicos",
  ui: (trato) => ({
    superficie: (u) => `Superficie a cubrir (${u})`,
    largo: (u) => `Largo de cada pieza (${u})`,
    ancho: (u) => `Ancho de cada pieza (${u})`,
    desperdicio: "Desperdicio (%)",
    desperdicioAyuda: "Para cortes y roturas. Se usa 10 % en colocación recta y 15 % en diagonal.",
    porCaja: "Piezas por caja",
    porCajaAyuda: segunTrato(trato, {
      tu: "Opcional. Si lo completas, te dice cuántas cajas comprar.",
      usted: "Opcional. Si lo completa, le dice cuántas cajas comprar.",
      vos: "Opcional. Si lo completás, te dice cuántas cajas comprar.",
    }),
    piezas: "Piezas necesarias",
    cajas: "Cajas a comprar",
    conDesperdicio: (u) => `Superficie con desperdicio (${u})`,
    cubre: (u) => `Superficie que cubren las cajas (${u})`,
    errorSuperficie: "La superficie tiene que ser mayor que 0.",
    errorPieza: "Las medidas de la pieza tienen que ser mayores que 0.",
  }),
};

const espana = (): Partial<UiCeramicos> => ({
  largo: (u) => `Largo de cada baldosa (${u})`,
  ancho: (u) => `Ancho de cada baldosa (${u})`,
  piezas: "Baldosas necesarias",
  errorPieza: "Las medidas de la baldosa tienen que ser mayores que 0.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
