import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosEt: TextosUi<UiConversorSueldo> = {
  slug: "tunnipalk-kuupalgaks",
  ui: () => ({
    monto: "Palk",
    periodo: "Palk on antud",
    hora: "Tunni kohta",
    dia: "Päeva kohta",
    semana: "Nädala kohta",
    quincena: "Poole kuu kohta (24 korda aastas)",
    mes: "Kuu kohta",
    anio: "Aasta kohta",
    horasSemana: "Töötunnid nädalas",
    diasSemana: "Tööpäevad nädalas",
    semanasAnio: "Tasustatud nädalad aastas",
    semanasAnioAyuda: "52, kui sinu puhkus on tasustatud. Kui saad palka ainult töönädalate eest, lahuta ülejäänud nädalad.",
    porHora: "Tunnipalk",
    porDia: "Päevapalk",
    porSemana: "Nädalapalk",
    porQuincena: "Palk poole kuu eest",
    porMes: "Kuupalk",
    porAnio: "Aastapalk",
    errorHoras: "Sisesta, mitu tundi nädalas töötad.",
    errorSemanas: "Tasustatud nädalaid peab aastas olema rohkem kui null.",
    observacionBruto: "Need arvud on sama palk teiste perioodide peale ümber arvutatuna, enne makse. Lisatasusid ega preemiaid ei lisata ja makse ei lahutata.",
  }),
};
