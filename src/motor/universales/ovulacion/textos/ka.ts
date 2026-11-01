import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosKa: TextosUi<UiOvulacion> = {
  slug: "ovulatsiis-kalkulatori",
  ui: () => ({
    fum: "ბოლო მენსტრუაციის პირველი დღე",
    fumAyuda: "სისხლდენის პირველი დღე და არა ბოლო.",
    ciclo: "ციკლის ხანგრძლივობა (დღე)",
    cicloAyuda: "ერთი მენსტრუაციის პირველი დღიდან მომდევნოს წინა დღემდე. თუ იცვლება, მიუთითეთ საშუალო.",
    ovulacion: "ოვულაციის სავარაუდო დღე",
    fertilDesde: "ნაყოფიერი დღეების დასაწყისი",
    fertilHasta: "ნაყოფიერი დღეების დასასრული",
    proxima: "მომდევნო მენსტრუაცია",
    tabla: "მომდევნო ციკლები",
    colRegla: "მენსტრუაცია",
    colDesde: "ნაყოფიერი დღეების დასაწყისი",
    colHasta: "ნაყოფიერი დღეების დასასრული",
    colOvulacion: "ოვულაცია",
    errorCiclo: "ციკლის ხანგრძლივობა უნდა იყოს 21 დღიდან 45 დღემდე.",
    aviso: "ეს შეფასებაა რეგულარული ციკლისთვის. ის არ არის კონტრაცეფციის მეთოდი და არ ცვლის ექიმის კონსულტაციას.",
  }),
};
