import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosHu: TextosUi<UiSumarDias> = {
  slug: "datum-kalkulator",
  ui: () => ({
    fecha: "Kiinduló dátum",
    operacion: "Művelet",
    sumar: "Napok hozzáadása",
    restar: "Napok kivonása",
    dias: "Napok száma",
    tipo: "Napok fajtája",
    corridos: "Naptári napok",
    habiles: "Munkanapok (hétfőtől péntekig)",
    resultado: "Eredmény dátuma",
    diaSemana: "A hét napja",
    diasCorridos: "Naptári napok összesen",
    nombresDias: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
    errorDias: "A napok száma egész szám legyen, legfeljebb száz évnyi.",
    notaHabiles: "A munkanapok kihagyják a szombatot és a vasárnapot, az ünnepnapokat viszont nem. Ha az időszakba ünnepnap esik, azt külön add hozzá.",
  }),
};
