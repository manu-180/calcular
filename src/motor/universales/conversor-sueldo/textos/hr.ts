import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosHr: TextosUi<UiConversorSueldo> = {
  slug: "kalkulator-place",
  ui: () => ({
    monto: "Iznos plaće",
    periodo: "Iznos se odnosi na",
    hora: "Sat",
    dia: "Dan",
    semana: "Tjedan",
    quincena: "Pola mjeseca (24 puta godišnje)",
    mes: "Mjesec",
    anio: "Godinu",
    horasSemana: "Radni sati tjedno",
    diasSemana: "Radni dani tjedno",
    semanasAnio: "Plaćeni tjedni u godini",
    semanasAnioAyuda: "52 ako imate plaćeni godišnji odmor. Ako vam se plaćaju samo odrađeni tjedni, oduzmite ostale.",
    porHora: "Po satu",
    porDia: "Po danu",
    porSemana: "Tjedno",
    porQuincena: "Za pola mjeseca",
    porMes: "Mjesečno",
    porAnio: "Godišnje",
    errorHoras: "Unesite koliko sati tjedno radite.",
    errorSemanas: "Broj plaćenih tjedana u godini mora biti veći od nule.",
    observacionBruto: "To je isti iznos preračunat na druga razdoblja. Bonusi se ne dodaju, a porez i doprinosi se ne oduzimaju.",
  }),
};
