import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosKa: TextosUi<UiConsumoElectrico> = {
  slug: "elektroenergiis-kharji",
  ui: () => ({
    potencia: "მოწყობილობის სიმძლავრე (ვტ)",
    potenciaAyuda: "იპოვით ეტიკეტზე ან ინსტრუქციაში, ვატებში (ვტ). თუ მითითებულია კვტ, გაამრავლეთ ათასზე.",
    cantidad: "ერთნაირი მოწყობილობების რაოდენობა",
    horas: "გამოყენება დღეში (საათი)",
    dias: "გამოყენების დღეები თვეში",
    precio: "ფასი ერთ კვტ.სთ-ზე",
    precioAyuda: "იპოვით ელექტროენერგიის ქვითარში: ერთი კვტ.სთ-ის ტარიფი, გადასახადების ჩათვლით, თუ მთლიანი ხარჯი გაინტერესებთ.",
    kwhDia: "დღიური მოხმარება (კვტ.სთ)",
    kwhMes: "თვიური მოხმარება (კვტ.სთ)",
    kwhAnio: "წლიური მოხმარება (კვტ.სთ)",
    costoDia: "დღიური ხარჯი",
    costoMes: "თვიური ხარჯი",
    costoAnio: "წლიური ხარჯი",
    errorHoras: "დღე-ღამეში მხოლოდ 24 საათია: მიუთითეთ გამოყენების დრო 0 საათიდან 24 საათამდე.",
  }),
};
