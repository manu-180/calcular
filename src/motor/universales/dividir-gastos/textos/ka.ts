import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosKa: TextosUi<UiDividirGastos> = {
  slug: "kharjebis-gakopa",
  ui: () => ({
    persona: (n) => `მონაწილე ${n}`,
    personaAyuda: "შეიყვანეთ, ვინ რამდენი გადაიხადა. თუ ვინმეს არაფერი გადაუხდია, მაგრამ ხარჯში მონაწილეობს, ჩაწერეთ ნული. დანარჩენი ველები დატოვეთ ცარიელი.",
    total: "ჯამური ხარჯი",
    personas: "მონაწილეთა რაოდენობა",
    cuota: "თითოეულის წილი",
    transferencias: "ანგარიშსწორებისთვის საჭირო გადარიცხვები",
    tabla: "ვინ ვის უხდის",
    colDe: "იხდის",
    colPara: "იღებს",
    colMonto: "თანხა",
    errorPocas: "ხარჯის გასაყოფად მიუთითეთ მინიმუმ ორი ადამიანი.",
    aMano: "ანგარიში გასწორებულია: ყველამ ერთი და იგივე თანხა გადაიხადა.",
  }),
};
