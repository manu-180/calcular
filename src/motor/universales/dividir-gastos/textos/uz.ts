import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosUz: TextosUi<UiDividirGastos> = {
  slug: "xarajatlarni-bolish",
  ui: () => ({
    persona: (n) => `Ishtirokchi ${n}`,
    personaAyuda: "Har bir kishi qancha toʻlaganini kiriting. Kimdir hech narsa toʻlamagan, lekin xarajatga sherik boʻlsa, 0 yozing. Qolganlarini boʻsh qoldiring.",
    total: "Jami xarajat",
    personas: "Ishtirokchilar",
    cuota: "Har bir kishining ulushi",
    transferencias: "Hisob-kitob uchun oʻtkazmalar",
    tabla: "Kim kimga toʻlaydi",
    colDe: "Toʻlaydi",
    colPara: "Oladi",
    colMonto: "Summa",
    errorPocas: "Xarajatni boʻlish uchun kamida ikki kishi kerak.",
    aMano: "Hisob teng: hamma bir xil summa toʻlagan.",
  }),
};
