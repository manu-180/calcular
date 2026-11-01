import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosKa: TextosUi<UiInteresCompuesto> = {
  slug: "rtuli-protsenti",
  ui: () => ({
    capital: "საწყისი თანხა",
    aporte: "ყოველთვიური შენატანი (არასავალდებულო)",
    aporteAyuda: "თანხა, რომელსაც ყოველთვე ამატებთ. შენატანი ანგარიშზე თვის ბოლოს ირიცხება.",
    tasa: "წლიური საპროცენტო განაკვეთი (%)",
    anios: "წლების რაოდენობა",
    capitalizacion: "კაპიტალიზაცია",
    anual: "ყოველწლიურად",
    semestral: "ნახევარ წელიწადში ერთხელ",
    trimestral: "კვარტალში ერთხელ",
    mensual: "ყოველთვიურად",
    diaria: "ყოველდღიურად",
    saldo: "საბოლოო თანხა",
    aportado: "შენატანები ჯამში",
    intereses: "მიღებული პროცენტი",
    tabla: "ზრდა წლების მიხედვით",
    colAnio: "წელი",
    colAportado: "შენატანები",
    colIntereses: "პროცენტი",
    colSaldo: "ნაშთი წლის ბოლოს",
    errorSinDinero: "შეიყვანეთ საწყისი თანხა ან ყოველთვიური შენატანი.",
    observacionIntereses: (porcentaje) => `პროცენტის წილი საბოლოო თანხაში: ${porcentaje}%.`,
  }),
};
