import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosSl: TextosUi<UiHormigon> = {
  slug: "izracun-betona",
  ui: () => ({
    largo: (u) => `Dolžina (${u})`,
    ancho: (u) => `Širina (${u})`,
    espesor: (u) => `Debelina (${u})`,
    espesorAyuda: "Za teraso ali pot se običajno uporabi 10 cm (4 in), za dovoz za avtomobil pa 12 do 15 cm.",
    margen: "Rezerva (%)",
    margenAyuda: "Za neravno podlago in izgubo betona. Običajno 5 do 10 %.",
    bolsa: (u) => `Teža vreče cementa (${u})`,
    volumen: (u) => `Natančna prostornina (${u})`,
    volumenTotal: (u) => `Potrebna količina betona (${u})`,
    volumenPies: "Potrebna količina betona (ft³)",
    cemento: (u) => `Cement (${u})`,
    bolsas: "Število vreč cementa (kos)",
    arena: (u) => `Pesek (${u})`,
    piedra: (u) => `Gramoz (${u})`,
    agua: (u) => (u === "L" ? "Voda (litri)" : "Voda (galone)"),
    errorMedida: "Ta mera mora biti večja od nič.",
    aviso:
      "Količina materiala je okvirna, za običajno mešanico 1 : 2 : 3 (približno 350 kg cementa na 1 m³). Odvisna je od razmerja v mešanici, vrste del in lokalnih materialov: preverite jo pri izvajalcu ali statiku.",
  }),
};
