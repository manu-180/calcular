import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosNb: TextosUi<UiFechaDeParto> = {
  slug: "terminkalkulator",
  ui: () => ({
    metodo: "Hvilken dato vet du?",
    fum: "Første dag i siste menstruasjon",
    concepcion: "Dato for befruktning",
    fecha: "Dato",
    fechaAyuda: "Velger du siste menstruasjon, fyll inn første blødningsdag.",
    ciclo: "Syklusens lengde (dager)",
    cicloAyuda: "Brukes bare med siste menstruasjon. Vet du ikke, la 28 stå.",
    fpp: "Termindato",
    edadGestacional: "Svangerskapsuke i dag",
    trimestre: "Trimester",
    faltan: "Dager igjen",
    fechaConcepcion: "Omtrentlig befruktning",
    semanasYDias: (s, d) => `${s} ${s === 1 ? "uke" : "uker"}${d ? ` og ${d} ${d === 1 ? "dag" : "dager"}` : ""}`,
    trimestres: ["Første trimester", "Andre trimester", "Tredje trimester"],
    errorFutura: "Datoen kan ikke være etter i dag.",
    errorCiclo: "Syklusens lengde må være mellom 20 og 45 dager.",
    notaPasada: "Det har gått mer enn 42 uker siden den datoen, så svangerskapsuken vises ikke.",
    aviso: "Dette er et anslag. Få barn blir født nøyaktig på termindatoen. Ultralydundersøkelsen gir den sikreste datoen. Kalkulatoren er veiledende og erstatter ikke en samtale med lege eller jordmor.",
  }),
};
