import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosLv: TextosUi<UiConversorSueldo> = {
  slug: "algas-perioda-parrekins",
  ui: () => ({
    monto: "Alga",
    periodo: "Alga par",
    hora: "Stundu",
    dia: "Dienu",
    semana: "Nedēļu",
    quincena: "Pusmēnesi (divreiz mēnesī)",
    mes: "Mēnesi",
    anio: "Gadu",
    horasSemana: "Nostrādātās stundas nedēļā",
    diasSemana: "Darba dienas nedēļā",
    semanasAnio: "Apmaksātās nedēļas gadā",
    semanasAnioAyuda: "52, ja jums ir apmaksāts atvaļinājums. Ja maksā tikai par nostrādātajām nedēļām, pārējās atņemiet.",
    porHora: "Stundā",
    porDia: "Dienā",
    porSemana: "Nedēļā",
    porQuincena: "Pusmēnesī",
    porMes: "Mēnesī",
    porAnio: "Gadā",
    errorHoras: "Ievadiet, cik stundu nedēļā strādājat.",
    errorSemanas: "Apmaksāto nedēļu skaitam gadā jābūt lielākam par nulli.",
    observacionBruto: "Tā ir tā pati summa, pārrēķināta citiem periodiem. Piemaksas netiek pieskaitītas, nodokļi un iemaksas netiek atskaitītas.",
  }),
};
