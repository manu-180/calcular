import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosKa: TextosUi<UiTasaEfectiva> = {
  slug: "epekturi-saprotsento-ganakveti",
  ui: () => ({
    direccion: "რომელი განაკვეთი გაქვთ?",
    nominalAEfectiva: "ნომინალური წლიური განაკვეთი (გადაყვანა ეფექტურად)",
    efectivaANominal: "ეფექტური განაკვეთი (გადაყვანა ნომინალურად)",
    tasa: "წლიური განაკვეთი (%)",
    tasaAyuda: "მიუთითეთ ზუსტად ისე, როგორც შეთავაზებაში ან ხელშეკრულებაშია.",
    capitalizacion: "კაპიტალიზაცია",
    capitalizacionAyuda: "რამდენად ხშირად ერიცხება პროცენტი. სესხებისა და საკრედიტო ბარათების შემთხვევაში ჩვეულებრივ ყოველთვე.",
    mensual: "ყოველთვიურად (წელიწადში 12 ჯერ)",
    trimestral: "კვარტალში ერთხელ (წელიწადში 4 ჯერ)",
    semestral: "ნახევარ წელიწადში ერთხელ (წელიწადში 2 ჯერ)",
    diaria: "ყოველდღიურად (წელიწადში 365 ჯერ)",
    efectiva: "ეფექტური წლიური განაკვეთი",
    nominal: "ნომინალური წლიური განაკვეთი",
    periodica: "განაკვეთი ერთ პერიოდზე",
    errorNegativa: "განაკვეთი უარყოფითი ვერ იქნება. შეიყვანეთ ნული ან მასზე მეტი რიცხვი.",
    observacionDiferencia: (puntos) => `ეფექტური განაკვეთი ნომინალურზე მაღალია. სხვაობა (პროცენტული პუნქტი): ${puntos}. მიზეზი ისაა, რომ დარიცხულ პროცენტსაც ერიცხება პროცენტი.`,
  }),
};
