import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "ლიტრი" : "გალონი");
const largoU = (u: string) => (u === "ft" ? "ფუტი" : "მ");
const superficieU = (u: string) => (u === "ft²" ? "კვ. ფუტი" : "მ²");
const rendimientoU = (u: string) => (u === "ft²/gal" ? "კვ. ფუტი/გალონი" : "მ²/ლიტრი");

export const textosKa: TextosUi<UiPintura> = {
  slug: "saghebavis-kalkulatori",
  ui: () => ({
    modo: "რა ზომები გაქვთ?",
    modoMedidas: "კედლების სიგრძე და სიმაღლე",
    modoSuperficie: "მთლიანი ფართობი",
    largo: (u) => `კედლების ჯამური სიგრძე (${largoU(u)})`,
    largoAyuda: "ყველა შესაღები კედლის სიგრძე ერთად. ოთახისთვის ეს მისი პერიმეტრია.",
    alto: (u) => `კედლის სიმაღლე (${largoU(u)})`,
    superficie: (u) => `შესაღები ფართობი (${superficieU(u)})`,
    aberturas: (u) => `გამოსაკლები კარები და ფანჯრები (${superficieU(u)})`,
    aberturasAyuda: "კარი: დაახლოებით 2 მ² (21 კვ. ფუტი). საშუალო ფანჯარა: 1-2 მ².",
    manos: "ფენების რაოდენობა",
    rendimiento: (u) => `საღებავის დაფარვის უნარი (${rendimientoU(u)})`,
    rendimientoAyuda: "მითითებულია ქილაზე: რა ფართობს ფარავს ერთი ფენით. თუ არ იცით, დატოვეთ რეკომენდებული მნიშვნელობა.",
    recomendado: (u) => `შესაძენი საღებავი (${volumen(u)})`,
    recomendadoAyuda: "მოიცავს 10% მარაგს შესწორებებისთვის და ლილვაკზე დარჩენილი საღებავისთვის.",
    necesario: (u) => `ზუსტი რაოდენობა (${volumen(u)})`,
    neta: (u) => `შესაღები ფართობი (${superficieU(u)})`,
    errorMedidas: "შეიყვანეთ კედლების სიგრძე და სიმაღლე.",
    errorSuperficie: "შეიყვანეთ შესაღები ფართობი.",
    errorAberturas: "კარები და ფანჯრები მთელ კედელს ვერ დაიკავებს.",
    errorRendimiento: "დაფარვის უნარი ნულზე მეტი უნდა იყოს.",
  }),
};
