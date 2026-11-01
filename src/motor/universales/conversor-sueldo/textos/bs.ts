import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosBs: TextosUi<UiConversorSueldo> = {
  slug: "plata-po-satu",
  ui: () => ({
    monto: "Iznos plate",
    periodo: "Iznos se odnosi na",
    hora: "Sat",
    dia: "Dan",
    semana: "Sedmica",
    quincena: "Pola mjeseca (24 puta godišnje)",
    mes: "Mjesec",
    anio: "Godinu",
    horasSemana: "Radni sati sedmično",
    diasSemana: "Radni dani sedmično",
    semanasAnio: "Plaćene sedmice u godini",
    semanasAnioAyuda: "52 ako imate plaćeni godišnji odmor. Ako vam se plaćaju samo odrađene sedmice, oduzmite ostale.",
    porHora: "Po satu",
    porDia: "Po danu",
    porSemana: "Sedmično",
    porQuincena: "Za pola mjeseca",
    porMes: "Mjesečno",
    porAnio: "Godišnje",
    errorHoras: "Unesite koliko sati sedmično radite.",
    errorSemanas: "Broj plaćenih sedmica u godini mora biti veći od nule.",
    observacionBruto: "To je isti iznos preračunat na druge periode. Bonusi se ne dodaju, a porez i doprinosi se ne oduzimaju.",
  }),
};
