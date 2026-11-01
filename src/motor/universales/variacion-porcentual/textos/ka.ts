import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosKa: TextosUi<UiVariacion> = {
  slug: "protsentuli-tsvlileba",
  ui: () => ({
    inicial: "საწყისი მნიშვნელობა",
    final: "ახალი მნიშვნელობა",
    variacion: "პროცენტული ცვლილება",
    diferencia: "სხვაობა",
    vuelta: "საწყის მნიშვნელობაზე დასაბრუნებლად",
    vueltaAyuda: "რამდენით უნდა შეიცვალოს ახალი მნიშვნელობა, რომ საწყის მნიშვნელობას დაუბრუნდეს.",
    errorInicialCero: "საწყისი მნიშვნელობა არ შეიძლება იყოს ნული: ნულიდან პროცენტული ცვლილება არ ითვლება.",
    subio: (p) => `მნიშვნელობა გაიზარდა ${p} პროცენტით.`,
    bajo: (p) => `მნიშვნელობა შემცირდა ${p} პროცენტით.`,
    igual: "ცვლილება არ არის: ორივე მნიშვნელობა ერთნაირია.",
  }),
};
