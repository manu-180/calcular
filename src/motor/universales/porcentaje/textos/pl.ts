import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosPl: TextosUi<UiPorcentaje> = {
  slug: "kalkulator-procentowy",
  ui: () => ({
    modo: "Co chcesz policzyć?",
    modoParte: "Ile to X% z Y?",
    modoProporcion: "Jakim procentem Y jest X?",
    modoAumento: "Y powiększone o X%",
    modoRebaja: "Y pomniejszone o X%",
    x: "Liczba X",
    xAyuda: "Procent. Jeśli wybierzesz „Jakim procentem Y jest X?”, to jest część.",
    y: "Liczba Y",
    resultado: "Wynik",
    porcentaje: "Procent",
    diferencia: "Ile dodano albo odjęto",
    errorYCero: "Y nie może wynosić 0: nie ma procentu z zera.",
    fraseParte: (x, y, r) => `${x}% z ${y} to ${r}.`,
    fraseProporcion: (x, y, p) => `${x} to ${p}% z ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} powiększone o ${x}% to ${r}: dodano ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} pomniejszone o ${x}% to ${r}: odjęto ${d}.`,
  }),
};
