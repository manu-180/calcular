import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosHr: TextosUi<UiHorasTrabajadas> = {
  slug: "kalkulator-radnih-sati",
  ui: () => ({
    dias: ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"],
    entrada: (dia) => `${dia}: početak`,
    salida: (dia) => `${dia}: kraj`,
    horarioAyuda: "Dane kada niste radili ostavite prazne. Ako smjena završava nakon ponoći, računa se kao ista smjena.",
    pausa: "Neplaćena stanka dnevno (minute)",
    pausaAyuda: "Stanka za obrok i odmor koja se ne plaća. Oduzima se za svaki radni dan.",
    pagoHora: "Satnica",
    umbral: "Redovni sati tjedno (nije obvezno)",
    umbralAyuda: "Sati iznad tog broja plaćaju se kao prekovremeni rad. Ako nemate prekovremeni rad, ostavite polje prazno.",
    recargo: "Uvećanje za prekovremeni rad (%)",
    recargoAyuda: "Koliko se više plaća svaki prekovremeni sat. 50 % znači sat i pol.",
    horasTotales: "Radni sati",
    horasReloj: "U satima i minutama",
    horasNormales: "Redovni sati",
    horasExtra: "Prekovremeni sati",
    pagoNormal: "Iznos za redovne sate",
    pagoExtra: "Iznos za prekovremeni rad",
    pagoTotal: "Ukupno za tjedan",
    tabla: "Po danima",
    colDia: "Dan",
    colEntrada: "Početak",
    colSalida: "Kraj",
    colHoras: "Sati",
    errorFaltaSalida: (dia) => `${dia}: nedostaje vrijeme završetka.`,
    errorFaltaEntrada: (dia) => `${dia}: nedostaje vrijeme početka.`,
    errorIguales: (dia) => `${dia}: početak i kraj su u isto vrijeme.`,
    errorPausa: (dia) => `${dia}: stanka traje koliko i smjena ili dulje.`,
    errorSinDias: "Unesite početak i kraj barem za jedan dan.",
    observacionNoche: "Neke smjene završavaju sljedećeg dana: cijele se računaju u dan kada su počele.",
    observacionGenerico:
      "Ovo je opći izračun. Najdulje radno vrijeme, pravila za prekovremeni rad i uvećanja za noćni rad i praznike određuju zakon i vaš ugovor o radu.",
  }),
};
