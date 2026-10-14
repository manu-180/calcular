import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosNl: TextosUi<UiPorcentaje> = {
  slug: "procenten-berekenen",
  ui: () => ({
    modo: "Wat wil je uitrekenen?",
    modoParte: "Hoeveel is X% van Y?",
    modoProporcion: "Hoeveel procent is X van Y?",
    modoAumento: "Y plus X%",
    modoRebaja: "Y min X%",
    x: "Getal X",
    xAyuda: "Het percentage. Kies je “Hoeveel procent is X van Y?”, dan is X het deel.",
    y: "Getal Y",
    resultado: "Uitkomst",
    porcentaje: "Percentage",
    diferencia: "Erbij of eraf",
    errorYCero: "Y kan geen 0 zijn: van nul bestaat geen percentage.",
    fraseParte: (x, y, r) => `${x}% van ${y} is ${r}.`,
    fraseProporcion: (x, y, p) => `${x} is ${p}% van ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plus ${x}% is ${r}. Er komt ${d} bij.`,
    fraseRebaja: (x, y, r, d) => `${y} min ${x}% is ${r}. Er gaat ${d} af.`,
  }),
};
