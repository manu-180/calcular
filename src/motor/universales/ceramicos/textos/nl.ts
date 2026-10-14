import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosNl: TextosUi<UiCeramicos> = {
  slug: "tegels-berekenen",
  ui: () => ({
    superficie: (u) => `Te betegelen oppervlakte (${u})`,
    largo: (u) => `Lengte van een tegel (${u})`,
    ancho: (u) => `Breedte van een tegel (${u})`,
    desperdicio: "Snijverlies (%)",
    desperdicioAyuda: "Voor zaagsneden en breuk. Neem 10% als je recht legt en 15% als je diagonaal legt.",
    porCaja: "Tegels per doos",
    porCajaAyuda: "Niet verplicht. Vul het in om te zien hoeveel dozen je moet kopen.",
    piezas: "Benodigde tegels",
    cajas: "Te kopen dozen",
    conDesperdicio: (u) => `Oppervlakte met snijverlies (${u})`,
    cubre: (u) => `Oppervlakte die de dozen dekken (${u})`,
    errorSuperficie: "De oppervlakte moet groter zijn dan 0.",
    errorPieza: "De maten van de tegel moeten groter zijn dan 0.",
  }),
};
