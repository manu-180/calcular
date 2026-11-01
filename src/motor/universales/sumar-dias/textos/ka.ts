import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosKa: TextosUi<UiSumarDias> = {
  slug: "tarighis-kalkulatori",
  ui: () => ({
    fecha: "საწყისი თარიღი",
    operacion: "მოქმედება",
    sumar: "დღეების დამატება",
    restar: "დღეების გამოკლება",
    dias: "დღეების რაოდენობა",
    tipo: "დღეების სახე",
    corridos: "კალენდარული დღეები",
    habiles: "სამუშაო დღეები (ორშაბათიდან პარასკევამდე)",
    resultado: "მიღებული თარიღი",
    diaSemana: "კვირის დღე",
    diasCorridos: "სულ კალენდარული დღეები",
    nombresDias: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"],
    errorDias: "დღეების რაოდენობა უნდა იყოს მთელი რიცხვი და არ უნდა აღემატებოდეს ას წელს.",
    notaHabiles: "სამუშაო დღეები გამოტოვებს შაბათსა და კვირას, უქმე დღეებს კი არა. თუ პერიოდში უქმე დღე ხვდება, ის ცალკე დაამატეთ.",
  }),
};
