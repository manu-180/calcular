import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosSr: TextosUi<UiHorasTrabajadas> = {
  slug: "obracun-radnih-sati",
  ui: () => ({
    dias: ["Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota", "Nedelja"],
    entrada: (dia) => `${dia}: početak`,
    salida: (dia) => `${dia}: kraj`,
    horarioAyuda: "Dane kada niste radili ostavite prazne. Ako se smena završava posle ponoći, računa se kao ista smena.",
    pausa: "Neplaćena pauza dnevno (minuti)",
    pausaAyuda: "Pauza za obrok i odmor koja se ne plaća. Oduzima se za svaki radni dan.",
    pagoHora: "Zarada po satu",
    umbral: "Redovnih sati nedeljno (nije obavezno)",
    umbralAyuda: "Sati preko ovog broja plaćaju se kao prekovremeni rad. Ako nemate prekovremeni rad, ostavite polje prazno.",
    recargo: "Uvećanje za prekovremeni rad (%)",
    recargoAyuda: "Koliko se više plaća svaki prekovremeni sat. 50% znači sat i po.",
    horasTotales: "Radni sati",
    horasReloj: "U satima i minutima",
    horasNormales: "Redovni sati",
    horasExtra: "Prekovremeni sati",
    pagoNormal: "Zarada za redovne sate",
    pagoExtra: "Zarada za prekovremeni rad",
    pagoTotal: "Ukupno za nedelju",
    tabla: "Po danima",
    colDia: "Dan",
    colEntrada: "Početak",
    colSalida: "Kraj",
    colHoras: "Sati",
    errorFaltaSalida: (dia) => `${dia}: nedostaje vreme završetka.`,
    errorFaltaEntrada: (dia) => `${dia}: nedostaje vreme početka.`,
    errorIguales: (dia) => `${dia}: početak i kraj su u isto vreme.`,
    errorPausa: (dia) => `${dia}: pauza traje koliko i smena ili duže.`,
    errorSinDias: "Unesite početak i kraj bar za jedan dan.",
    observacionNoche: "Neke smene se završavaju sledećeg dana: cele se računaju u dan kada su počele.",
    observacionGenerico:
      "Ovo je opšti obračun. Najduže radno vreme, pravila za prekovremeni rad i uvećanja za noćni rad i praznike određuju zakon i vaš ugovor o radu.",
  }),
};
