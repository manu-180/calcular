import type { TextosUi } from "../../tipos";
import { duracionHu } from "../../dias-entre-fechas/textos/hu";
import type { UiEdad } from "../definicion";

export const textosHu: TextosUi<UiEdad> = {
  slug: "eletkor-kalkulator",
  ui: () => ({
    nacimiento: "Születési dátum",
    referencia: "Életkor ezen a napon",
    referenciaAyuda: "Alapból a mai nap. Változtasd meg, ha egy másik napra vonatkozó életkorra vagy kíváncsi.",
    edad: "Életkor",
    anios: "Betöltött évek",
    totalMeses: "Hónapokban",
    totalSemanas: "Hetekben",
    totalDias: "Napokban",
    proximo: "Következő születésnap",
    faltan: "Hátralévő napok",
    cumplira: "Hány éves lesz",
    duracion: duracionHu,
    errorFutura: "A születési dátum nem lehet későbbi annál a napnál, amelyre az életkort számolod.",
    cumpleHoy: (anios) => `Ma van a születésnap: pontosan ${anios} éves.`,
    nota29: "Aki február 29. napján született, annak a nem szökőévekben február 28. napján számoljuk a születésnapját.",
  }),
};
