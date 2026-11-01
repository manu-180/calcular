import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosKa: TextosUi<UiInteresSimple> = {
  slug: "martivi-protsenti",
  ui: () => ({
    capital: "ძირი",
    tasa: "წლიური საპროცენტო განაკვეთი (%)",
    tiempo: "ვადა",
    unidad: "ვადის ერთეული",
    dias: "დღე",
    meses: "თვე",
    anios: "წელი",
    base: "დღეების რაოდენობა წელიწადში (დღეებში მითითებული ვადისთვის)",
    baseAyuda: "ზოგი ბანკი 360 დღიან წელს იყენებს. თუ დარწმუნებული არ ხართ, დატოვეთ 365 დღე.",
    base365: "365 დღე",
    base360: "360 დღე (საბანკო წელი)",
    interes: "პროცენტი",
    montoFinal: "ძირი პროცენტის ჩათვლით",
    tasaPeriodo: "განაკვეთი პერიოდზე",
    errorCapital: "შეიყვანეთ ნულზე მეტი ძირი.",
  }),
};
