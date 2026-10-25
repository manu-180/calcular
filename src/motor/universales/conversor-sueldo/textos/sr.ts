import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosSr: TextosUi<UiConversorSueldo> = {
  slug: "plata-po-satu",
  ui: () => ({
    monto: "Iznos zarade",
    periodo: "Iznos se odnosi na",
    hora: "Sat",
    dia: "Dan",
    semana: "Nedelju",
    quincena: "Pola meseca (24 puta godišnje)",
    mes: "Mesec",
    anio: "Godinu",
    horasSemana: "Radni sati nedeljno",
    diasSemana: "Radni dani nedeljno",
    semanasAnio: "Plaćene nedelje u godini",
    semanasAnioAyuda: "52 ako imate plaćen godišnji odmor. Ako vam se plaćaju samo odrađene nedelje, oduzmite ostale.",
    porHora: "Po satu",
    porDia: "Po danu",
    porSemana: "Nedeljno",
    porQuincena: "Za pola meseca",
    porMes: "Mesečno",
    porAnio: "Godišnje",
    errorHoras: "Unesite koliko sati nedeljno radite.",
    errorSemanas: "Broj plaćenih nedelja u godini mora biti veći od nule.",
    observacionBruto: "To je isti iznos preračunat na druge periode. Bonusi se ne dodaju, a porez i doprinosi se ne oduzimaju.",
  }),
};
