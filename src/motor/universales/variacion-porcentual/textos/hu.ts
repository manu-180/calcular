import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosHu: TextosUi<UiVariacion> = {
  slug: "szazalekos-valtozas",
  ui: () => ({
    inicial: "Kiinduló érték",
    final: "Új érték",
    variacion: "Százalékos változás",
    diferencia: "Különbség",
    vuelta: "Vissza a kiinduló értékre",
    vueltaAyuda: "Mennyit kellene változnia az új értéknek ahhoz, hogy visszaérjen a kiinduló értékre.",
    errorInicialCero: "A kiinduló érték nem lehet nulla: nulláról nem lehet százalékos változást számolni.",
    subio: (p) => `Az érték ${p} százalékkal nőtt.`,
    bajo: (p) => `Az érték ${p} százalékkal csökkent.`,
    igual: "Nincs változás: a két érték ugyanaz.",
  }),
};
