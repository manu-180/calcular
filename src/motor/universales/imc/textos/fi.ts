import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosFi: TextosUi<UiImc> = {
  slug: "bmi-laskuri",
  ui: () => ({
    peso: (u) => `Paino (${u})`,
    altura: (u) => `Pituus (${u})`,
    pies: "Pituus: jalat (ft)",
    pulgadas: "Pituus: tuumat (in)",
    imc: "Painoindeksi (BMI)",
    categoria: "Luokka (WHO)",
    pesoMin: (u) => `Normaali paino alkaen (${u})`,
    pesoMax: (u) => `Normaali paino enintään (${u})`,
    rangoAyuda: "Painoväli, jolla painoindeksisi on pituudellasi normaali.",
    bajo: "Alipaino",
    normal: "Normaali paino",
    sobrepeso: "Lievä ylipaino",
    obesidad1: "Merkittävä lihavuus",
    obesidad2: "Vaikea lihavuus",
    obesidad3: "Sairaalloinen lihavuus",
    errorPeso: "Painon on oltava suurempi kuin 0.",
    errorAltura: "Pituuden on oltava suurempi kuin 0.",
    aviso:
      "Painoindeksi on suuntaa antava mittari aikuisille. Se ei erottele lihasta ja rasvaa, eikä sitä käytetä samalla tavalla raskauden aikana tai lapsilla. Se ei korvaa lääkärin tai terveydenhoitajan arviota.",
  }),
};
