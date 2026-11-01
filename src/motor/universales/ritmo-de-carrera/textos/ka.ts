import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

const corta = (u: string) => (u === "km" ? "კმ" : "მილი");

export const textosKa: TextosUi<UiRitmo> = {
  slug: "sirbilis-tempi",
  ui: () => ({
    calcular: "რისი გამოთვლა გსურთ?",
    calcRitmo: "ტემპი (მანძილით და დროით)",
    calcTiempo: "დრო (მანძილით და ტემპით)",
    calcDistancia: "მანძილი (დროით და ტემპით)",
    distancia: "მანძილი",
    distanciaAyuda: "აირჩიეთ რბოლის მანძილი ან „სხვა მანძილი“, თუ საკუთარი მანძილის შეყვანა გსურთ.",
    otra: "სხვა მანძილი",
    cincoK: "5 კმ",
    diezK: "10 კმ",
    media: "ნახევარმარათონი",
    maraton: "მარათონი",
    distanciaOtra: (u) => `სხვა მანძილი (${corta(u)})`,
    horas: "დრო: საათი",
    minutos: "დრო: წუთი",
    segundos: "დრო: წამი",
    ritmoMin: (u) => `ტემპი: წთ/${corta(u)}`,
    ritmoSeg: "ტემპი: წამი",
    ritmo: (u) => `ტემპი (წთ/${corta(u)})`,
    tiempo: "სასურველი დრო",
    distanciaRes: (u) => `მანძილი (${corta(u)})`,
    velocidad: (u) => `საშუალო სიჩქარე (${u === "km/h" ? "კმ/სთ" : "მილი/სთ"})`,
    errorDistancia: "შეიყვანეთ ნულზე მეტი მანძილი.",
    errorTiempo: "შეიყვანეთ დრო: საათი, წუთი ან წამი.",
    errorRitmo: "შეიყვანეთ ტემპი: წუთი და წამი მანძილის ერთეულზე.",
  }),
};
