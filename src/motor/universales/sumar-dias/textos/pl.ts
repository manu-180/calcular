import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosPl: TextosUi<UiSumarDias> = {
  slug: "kalkulator-dat",
  ui: () => ({
    fecha: "Data początkowa",
    operacion: "Działanie",
    sumar: "Dodaj dni",
    restar: "Odejmij dni",
    dias: "Liczba dni",
    tipo: "Rodzaj dni",
    corridos: "Dni kalendarzowe",
    habiles: "Dni robocze (od poniedziałku do piątku)",
    resultado: "Data wynikowa",
    diaSemana: "Dzień tygodnia",
    diasCorridos: "Łącznie dni kalendarzowych",
    nombresDias: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"],
    errorDias: "Liczba dni musi być liczbą całkowitą, najwyżej na 100 lat.",
    notaHabiles: "Dni robocze pomijają soboty i niedziele, ale nie święta. Jeśli po drodze wypada święto, dolicz je osobno.",
  }),
};
