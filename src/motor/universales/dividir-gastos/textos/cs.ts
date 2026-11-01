import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosCs: TextosUi<UiDividirGastos> = {
  slug: "rozdeleni-uctu",
  ui: () => ({
    persona: (n) => `Osoba ${n}`,
    personaAyuda: "Zadejte, kolik kdo zaplatil. Pokud někdo nic neplatil, ale na útratě se podílí, zadejte 0. Ostatní pole nechte prázdná.",
    total: "Celková útrata",
    personas: "Počet osob",
    cuota: "Podíl na osobu",
    transferencias: "Platby k vyrovnání",
    tabla: "Kdo komu platí",
    colDe: "Platí",
    colPara: "Dostává",
    colMonto: "Částka",
    errorPocas: "Aby šlo útratu rozdělit, zadejte alespoň dvě osoby.",
    aMano: "Jste vyrovnaní: všichni zaplatili stejně.",
  }),
};
