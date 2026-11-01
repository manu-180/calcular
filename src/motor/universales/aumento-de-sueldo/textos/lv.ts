import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosLv: TextosUi<UiAumentoDeSueldo> = {
  slug: "algas-pielikuma-kalkulators",
  ui: () => ({
    sueldo: "Pašreizējā mēneša alga",
    sueldoAyuda: "Bruto vai neto, kā jums ērtāk. Rezultāts būs tādā pašā veidā.",
    aumentoPorcentaje: "Pielikums (%)",
    aumentoMonto: "Pielikums naudā (nav obligāts)",
    aumentoMontoAyuda: "Ja pielikums ir fiksēta summa, ievadiet to šeit. Tā tiks izmantota procentu vietā.",
    inflacion: "Perioda inflācija (%, nav obligāta)",
    inflacionAyuda: "Inflācija kopš pēdējā pielikuma. Tā redzēsiet, vai par algu nopirksiet vairāk vai mazāk nekā agrāk.",
    sueldosAnio: "Algu skaits gadā",
    sueldosAnioAyuda: "12, ja algu maksā katru mēnesi. 13 vai 14, ja katru gadu saņemat arī trīspadsmito vai četrpadsmito algu.",
    nuevo: "Jaunā mēneša alga",
    diferenciaMensual: "Starpība mēnesī",
    diferenciaAnual: "Starpība gadā",
    porcentaje: "Pielikums procentos",
    real: "Reālais pielikums (ņemot vērā inflāciju)",
    realAyuda: "Par cik vairāk nopirksiet par jauno algu nekā par iepriekšējo.",
    errorSueldo: "Ievadiet pašreizējo algu.",
    errorSinAumento: "Ievadiet pielikumu procentos vai naudā.",
    observacionGana: (puntos) => `Jūsu pielikums apsteidz inflāciju: par algu nopirksiet par ${puntos}% vairāk nekā agrāk.`,
    observacionPierde: (puntos) => `Jūsu pielikums nesedz inflāciju: par algu nopirksiet par ${puntos}% mazāk nekā agrāk.`,
    observacionIgual: "Jūsu pielikums atbilst inflācijai: par algu nopirksiet tikpat, cik agrāk.",
  }),
};
