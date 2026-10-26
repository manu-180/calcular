import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosNb: TextosUi<UiCeramicos> = {
  slug: "flisekalkulator",
  ui: () => ({
    superficie: (u) => `Areal som skal flislegges (${u})`,
    largo: (u) => `Flisens lengde (${u})`,
    ancho: (u) => `Flisens bredde (${u})`,
    desperdicio: "Svinn (%)",
    desperdicioAyuda: "Til kapp og fliser som knekker. Regn med 10 % ved rett legging og 15 % ved diagonal legging.",
    porCaja: "Fliser per pakke",
    porCajaAyuda: "Valgfritt. Fyll inn for å se hvor mange pakker du må kjøpe.",
    piezas: "Antall fliser",
    cajas: "Pakker du må kjøpe",
    conDesperdicio: (u) => `Areal med svinn (${u})`,
    cubre: (u) => `Areal pakkene dekker (${u})`,
    errorSuperficie: "Arealet må være større enn 0.",
    errorPieza: "Målene på flisen må være større enn 0.",
  }),
};
