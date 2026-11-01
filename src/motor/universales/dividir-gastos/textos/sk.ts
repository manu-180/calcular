import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosSk: TextosUi<UiDividirGastos> = {
  slug: "rozdelenie-uctu",
  ui: () => ({
    persona: (n) => `Osoba ${n}`,
    personaAyuda: "Zadajte, koľko kto zaplatil. Ak niekto nič neplatil, ale na výdavkoch sa podieľa, zadajte 0. Ostatné polia nechajte prázdne.",
    total: "Celkové výdavky",
    personas: "Počet osôb",
    cuota: "Podiel na osobu",
    transferencias: "Platby na vyrovnanie",
    tabla: "Kto komu platí",
    colDe: "Platí",
    colPara: "Dostáva",
    colMonto: "Suma",
    errorPocas: "Aby sa výdavky dali rozdeliť, zadajte aspoň dve osoby.",
    aMano: "Ste vyrovnaní: všetci zaplatili rovnako.",
  }),
};
