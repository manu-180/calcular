import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

const dist = (u: string) => (u === "mi" ? "მილი" : "კმ");

export const textosKa: TextosUi<UiCombustible> = {
  slug: "satsvavis-kharji",
  ui: () => ({
    distancia: (u) => `მგზავრობის მანძილი (${dist(u)})`,
    idaYVuelta: "იქით და უკან",
    tipoConsumo: "როგორ მიუთითებთ საწვავის ხარჯს",
    l100: "ლიტრი 100 კმ-ზე",
    kml: "კილომეტრი ერთ ლიტრზე",
    consumo: "საწვავის ხარჯი",
    consumoMpg: "საწვავის ხარჯი (მილი ერთ გალონზე)",
    consumoAyuda: "ნახეთ ავტომობილის სახელმძღვანელოში ან ბორტკომპიუტერზე. გზატკეცილზე მანქანა ჩვეულებრივ ნაკლებს ხარჯავს, ვიდრე ქალაქში.",
    precio: (u) => (u === "L" ? "საწვავის ფასი ერთ ლიტრზე" : "საწვავის ფასი ერთ გალონზე"),
    personas: "რამდენი ადამიანი იყოფს ხარჯს",
    costo: "საწვავის ღირებულება",
    porPersona: "ერთ ადამიანზე",
    combustible: (u) => (u === "L" ? "საჭირო საწვავი (ლიტრი)" : "საჭირო საწვავი (გალონი)"),
    distanciaTotal: (u) => `მთლიანი მანძილი (${dist(u)})`,
    costoPorDistancia: (u) => (u === "mi" ? "ღირებულება ერთ მილზე" : "ღირებულება ერთ კილომეტრზე"),
    errorConsumo: "საწვავის ხარჯი ნულზე მეტი უნდა იყოს.",
    errorPersonas: "მინიმუმ ერთი ადამიანი უნდა იყოს.",
  }),
};
