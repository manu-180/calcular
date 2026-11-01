import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosLv: TextosUi<UiDividirGastos> = {
  slug: "izdevumu-dalisana",
  ui: () => ({
    persona: (n) => `Persona ${n}`,
    personaAyuda: "Ievadiet, cik katrs samaksāja. Ja kāds neko nesamaksāja, bet piedalās izdevumos, ievadiet 0. Pārējos laukus atstājiet tukšus.",
    total: "Kopējie izdevumi",
    personas: "Personu skaits",
    cuota: "Daļa uz vienu personu",
    transferencias: "Maksājumi norēķinam",
    tabla: "Kurš kam maksā",
    colDe: "Maksā",
    colPara: "Saņem",
    colMonto: "Summa",
    errorPocas: "Lai izdevumus varētu sadalīt, ievadiet vismaz divas personas.",
    aMano: "Viss nokārtots: visi samaksāja vienādi.",
  }),
};
