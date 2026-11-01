import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

const largoU = (u: string) => (u === "ft" ? "ფუტი" : "მ");
const superficieU = (u: string) => (u === "ft²" ? "კვ. ფუტი" : "მ²");

export const textosKa: TextosUi<UiMetrosCuadrados> = {
  slug: "kvadratuli-metri",
  ui: () => ({
    forma: (n) => `ფართობი ${n}: ფორმა`,
    formaAyuda: "თუ ოთახი L ფორმისაა ან არასწორი მოხაზულობის, დაყავით ნაწილებად და კალკულატორი შეკრებს მათ.",
    ninguna: "არ გამოიყენება",
    rectangulo: "მართკუთხედი ან კვადრატი",
    triangulo: "სამკუთხედი",
    circulo: "წრე",
    medidaA: (n, u) => `ფართობი ${n}: სიგრძე, ფუძე ან დიამეტრი (${largoU(u)})`,
    medidaAAyuda: "მართკუთხედი: სიგრძე და სიგანე. სამკუთხედი: ფუძე და სიმაღლე. წრე: მხოლოდ დიამეტრი.",
    medidaB: (n, u) => `ფართობი ${n}: სიგანე ან სიმაღლე (${largoU(u)})`,
    total: (u) => `მთლიანი ფართობი (${superficieU(u)})`,
    equivale: (u) => `სხვა ერთეულში (${superficieU(u)})`,
    parcial: (n, u) => `ფართობი ${n} (${superficieU(u)})`,
    errorMedida: "ეს ზომა აკლია ან ნულის ტოლია.",
  }),
};
