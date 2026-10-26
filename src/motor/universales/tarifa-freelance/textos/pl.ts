import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosPl: TextosUi<UiTarifaFreelance> = {
  slug: "kalkulator-stawki-freelancera",
  ui: () => ({
    ingreso: "Ile chcesz mieć na rękę w ciągu roku",
    ingresoAyuda: "Po podatkach i kosztach. To twoja pensja jako freelancera.",
    gastos: "Koszty działalności rocznie",
    gastosAyuda: "Sprzęt, oprogramowanie, internet, kursy, księgowość, prywatna opieka medyczna i oszczędności na emeryturę.",
    impuestos: "Szacowane podatki i składki (%)",
    impuestosAyuda: "Ile z przychodu pomniejszonego o koszty idzie na podatki i składki. Jeśli nie wiesz, zapytaj księgową albo biuro rachunkowe. 25% to punkt wyjścia.",
    diasLibres: "Dni wolne w roku",
    diasLibresAyuda: "Urlop, święta i dni choroby. Nikt za nie nie płaci, więc twoja stawka musi je pokryć.",
    diasSemana: "Dni pracy w tygodniu",
    horasSemana: "Godziny do zafakturowania w tygodniu",
    horasSemanaAyuda: "Tylko godziny, za które bierzesz pieniądze. Szukanie klientów, sprawy administracyjne i nauka się nie liczą. Zwykle od 20 do 30 na 40.",
    tarifaHora: "Stawka godzinowa",
    tarifaDia: "Stawka dzienna",
    facturacionMensual: "Potrzebny przychód miesięcznie",
    facturacionAnual: "Potrzebny przychód rocznie",
    horasAnio: "Godziny do zafakturowania w roku",
    errorIngreso: "Wpisz, ile chcesz zarabiać w ciągu roku.",
    errorImpuestos: "Podatki muszą wynosić mniej niż 100%.",
    errorDias: "Przy tylu dniach wolnych nie zostaje w roku żaden dzień pracy.",
    errorHoras: "Wpisz, ile godzin tygodniowo możesz zafakturować.",
    observacionFacturables: "Jeśli weźmiesz mniej, zarobisz mniej, niż planujesz, albo będziesz pracować więcej godzin.",
  }),
};
