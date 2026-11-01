import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosSr: TextosUi<UiSumarDias> = {
  slug: "dodavanje-dana-datumu",
  ui: () => ({
    fecha: "Početni datum",
    operacion: "Operacija",
    sumar: "Dodavanje dana",
    restar: "Oduzimanje dana",
    dias: "Broj dana",
    tipo: "Vrsta dana",
    corridos: "Kalendarski dani",
    habiles: "Radni dani (od ponedeljka do petka)",
    resultado: "Dobijeni datum",
    diaSemana: "Dan u nedelji",
    diasCorridos: "Ukupno kalendarskih dana",
    nombresDias: ["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"],
    errorDias: "Broj dana mora biti ceo broj, za period od najviše 100 godina.",
    notaHabiles: "Radni dani preskaču subote i nedelje, ali ne i praznike. Ako neki praznik pada u taj period, dodajte ga posebno.",
  }),
};
