import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosPl: TextosUi<UiConversorSueldo> = {
  slug: "kalkulator-stawki-godzinowej",
  ui: () => ({
    monto: "Wynagrodzenie",
    periodo: "Kwota jest za",
    hora: "Godzinę",
    dia: "Dzień",
    semana: "Tydzień",
    quincena: "Pół miesiąca (24 razy w roku)",
    mes: "Miesiąc",
    anio: "Rok",
    horasSemana: "Godziny pracy w tygodniu",
    diasSemana: "Dni pracy w tygodniu",
    semanasAnio: "Płatne tygodnie w roku",
    semanasAnioAyuda: "52, jeśli masz płatny urlop. Jeśli dostajesz pieniądze tylko za przepracowane tygodnie, odejmij pozostałe.",
    porHora: "Za godzinę",
    porDia: "Za dzień",
    porSemana: "Za tydzień",
    porQuincena: "Za pół miesiąca",
    porMes: "Za miesiąc",
    porAnio: "Za rok",
    errorHoras: "Wpisz, ile godzin pracujesz w tygodniu.",
    errorSemanas: "Liczba płatnych tygodni w roku musi być większa od zera.",
    observacionBruto: "To ta sama kwota przeliczona na inne okresy. Nie dodajemy premii ani nie odejmujemy podatków i składek.",
  }),
};
