import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosKa: TextosUi<UiMetaDeAhorro> = {
  slug: "danazogis-mizani",
  ui: () => ({
    meta: "რა თანხის დაგროვება გსურთ?",
    actual: "არსებული დანაზოგი (არასავალდებულო)",
    meses: "რამდენ თვეში",
    rendimiento: "დანაზოგის წლიური უკუგება (%, არასავალდებულო)",
    rendimientoAyuda: "თუ თანხა ანაბარზე ან საპროცენტო ინვესტიციაშია. თუ არაფერს იძლევა, დატოვეთ ცარიელი.",
    aporteMensual: "ყოველთვე უნდა გადადოთ",
    aporteSemanal: "ყოველკვირეულად",
    totalAportado: "სულ შეიტანთ",
    intereses: "მიღებული პროცენტი",
    errorMeta: "მიუთითეთ, რა თანხის დაგროვება გსურთ.",
    yaLlegas: "არსებული დანაზოგი ამ ვადაში დამატებითი შენატანის გარეშეც მიაღწევს მიზანს.",
  }),
};
