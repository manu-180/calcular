import { pluralRo } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosRo: TextosUi<UiFechaDeParto> = {
  slug: "calculator-sarcina",
  ui: () => ({
    metodo: "Ce dată cunoașteți?",
    fum: "Prima zi a ultimei menstruații",
    concepcion: "Data concepției",
    fecha: "Data",
    fechaAyuda: "Dacă alegeți ultima menstruație, introduceți prima zi de sângerare.",
    ciclo: "Durata ciclului (zile)",
    cicloAyuda: "Se folosește doar cu ultima menstruație. Dacă nu o știți, lăsați 28.",
    fpp: "Data probabilă a nașterii",
    edadGestacional: "Vârsta sarcinii azi",
    trimestre: "Trimestrul",
    faltan: "Zile rămase",
    fechaConcepcion: "Data estimată a concepției",
    semanasYDias: (s, d) => `${pluralRo(s, "săptămână", "săptămâni")}${d ? ` și ${pluralRo(d, "zi", "zile")}` : ""}`,
    trimestres: ["Primul trimestru", "Al doilea trimestru", "Al treilea trimestru"],
    errorFutura: "Data nu poate fi după ziua de azi.",
    errorCiclo: "Durata ciclului trebuie să fie între 20 și 45 de zile.",
    notaPasada: "De la această dată au trecut mai mult de 42 de săptămâni, așa că vârsta sarcinii nu se afișează.",
    aviso: "Este o estimare: puțini copii se nasc exact la data probabilă. Ecografia și controalele la medic dau data cea mai precisă. Acest calculator nu înlocuiește consultul medical.",
  }),
};
