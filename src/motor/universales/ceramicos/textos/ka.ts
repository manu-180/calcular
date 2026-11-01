import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

const piezaU = (u: string) => (u === "in" ? "დიუმი" : "სმ");
const superficieU = (u: string) => (u === "ft²" ? "კვ. ფუტი" : "მ²");

export const textosKa: TextosUi<UiCeramicos> = {
  slug: "metlakhis-kalkulatori",
  ui: () => ({
    superficie: (u) => `დასაფარი ფართობი (${superficieU(u)})`,
    largo: (u) => `ფილის სიგრძე (${piezaU(u)})`,
    ancho: (u) => `ფილის სიგანე (${piezaU(u)})`,
    desperdicio: "ჭრის მარაგი (%)",
    desperdicioAyuda: "ჭრისა და გატეხილი ფილებისთვის. პირდაპირი დაგებისას ჩვეულებრივ 10%, დიაგონალურისას 15%.",
    porCaja: "ფილების რაოდენობა კოლოფში",
    porCajaAyuda: "არასავალდებულოა. თუ შეავსებთ, ნახავთ, რამდენი კოლოფი უნდა იყიდოთ.",
    piezas: "საჭირო ფილები",
    cajas: "შესაძენი კოლოფები",
    conDesperdicio: (u) => `ფართობი მარაგით (${superficieU(u)})`,
    cubre: (u) => `კოლოფებით დაფარული ფართობი (${superficieU(u)})`,
    errorSuperficie: "ფართობი ნულზე მეტი უნდა იყოს.",
    errorPieza: "ფილის ზომები ნულზე მეტი უნდა იყოს.",
  }),
};
