import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosHr: TextosUi<UiSumarDias> = {
  slug: "dodavanje-dana-datumu",
  ui: () => ({
    fecha: "Početni datum",
    operacion: "Operacija",
    sumar: "Dodavanje dana",
    restar: "Oduzimanje dana",
    dias: "Broj dana",
    tipo: "Vrsta dana",
    corridos: "Kalendarski dani",
    habiles: "Radni dani (od ponedjeljka do petka)",
    resultado: "Dobiveni datum",
    diaSemana: "Dan u tjednu",
    diasCorridos: "Ukupno kalendarskih dana",
    nombresDias: ["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"],
    errorDias: "Broj dana mora biti cijeli broj, za razdoblje od najviše 100 godina.",
    notaHabiles: "Radni dani preskaču subote i nedjelje, ali ne i blagdane. Ako neki blagdan pada u to razdoblje, dodajte ga zasebno.",
  }),
};
