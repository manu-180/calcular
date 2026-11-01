import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosLv: TextosUi<UiMetrosCuadrados> = {
  slug: "kvadratmetru-kalkulators",
  ui: () => ({
    forma: (n) => `Laukums ${n}: forma`,
    formaAyuda: "Ja telpa ir L formā vai neregulāra, sadaliet to daļās, un tās tiks saskaitītas.",
    ninguna: "Neizmantot",
    rectangulo: "Taisnstūris vai kvadrāts",
    triangulo: "Trijstūris",
    circulo: "Aplis",
    medidaA: (n, u) => `Laukums ${n}: garums, pamats vai diametrs (${u})`,
    medidaAAyuda: "Taisnstūris: garums un platums. Trijstūris: pamats un augstums. Aplis: tikai diametrs.",
    medidaB: (n, u) => `Laukums ${n}: platums vai augstums (${u})`,
    total: (u) => `Kopējais laukums (${u})`,
    equivale: (u) => `Tas pats laukums (${u})`,
    parcial: (n, u) => `Laukums ${n} (${u})`,
    errorMedida: "Šī izmēra trūkst vai tas ir vienāds ar 0.",
  }),
};
