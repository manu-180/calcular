import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosLt: TextosUi<UiMetrosCuadrados> = {
  slug: "kvadratiniu-metru-skaiciuokle",
  ui: () => ({
    forma: (n) => `Plotas ${n}: forma`,
    formaAyuda: "Jei patalpa yra L formos arba netaisyklinga, padalykite ją į dalis, ir jos bus susumuotos.",
    ninguna: "Nenaudoti",
    rectangulo: "Stačiakampis arba kvadratas",
    triangulo: "Trikampis",
    circulo: "Apskritimas",
    medidaA: (n, u) => `Plotas ${n}: ilgis, pagrindas arba skersmuo (${u})`,
    medidaAAyuda: "Stačiakampis: ilgis ir plotis. Trikampis: pagrindas ir aukštis. Apskritimas: tik skersmuo.",
    medidaB: (n, u) => `Plotas ${n}: plotis arba aukštis (${u})`,
    total: (u) => `Bendras plotas (${u})`,
    equivale: (u) => `Tas pats plotas (${u})`,
    parcial: (n, u) => `Plotas ${n} (${u})`,
    errorMedida: "Šio matmens trūksta arba jis lygus 0.",
  }),
};
