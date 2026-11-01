import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosLt: TextosUi<UiDividirGastos> = {
  slug: "saskaitos-dalijimas",
  ui: () => ({
    persona: (n) => `Asmuo ${n}`,
    personaAyuda: "Įveskite, kiek kas sumokėjo. Jei kas nors nieko nemokėjo, bet dalyvauja išlaidose, įveskite 0. Kitus laukus palikite tuščius.",
    total: "Bendros išlaidos",
    personas: "Asmenų skaičius",
    cuota: "Dalis vienam asmeniui",
    transferencias: "Mokėjimai atsiskaityti",
    tabla: "Kas kam moka",
    colDe: "Moka",
    colPara: "Gauna",
    colMonto: "Suma",
    errorPocas: "Kad išlaidas būtų galima padalyti, įveskite bent du asmenis.",
    aMano: "Viskas atsiskaityta: visi sumokėjo po lygiai.",
  }),
};
