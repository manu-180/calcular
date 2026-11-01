import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosSq: TextosUi<UiHormigon> = {
  slug: "kalkulator-betoni",
  ui: () => ({
    largo: (u) => `Gjatësia (${u})`,
    ancho: (u) => `Gjerësia (${u})`,
    espesor: (u) => `Trashësia (${u})`,
    espesorAyuda: "Një tarracë ose një shteg ka zakonisht 10 cm. Një platformë për makinë, nga 12 deri në 15 cm.",
    margen: "Rezervë shtesë (%)",
    margenAyuda: "Për terren të pabarabartë dhe humbje. Zakonisht nga 5% deri në 10%.",
    bolsa: (u) => `Pesha e thesit të çimentos (${u})`,
    volumen: (u) => `Vëllimi i saktë (${u})`,
    volumenTotal: (u) => `Beton i nevojshëm (${u})`,
    volumenPies: "Beton i nevojshëm (ft³)",
    cemento: (u) => `Çimento (${u})`,
    bolsas: "Thasë çimento",
    arena: (u) => `Rërë (${u})`,
    piedra: (u) => `Zhavorr (${u})`,
    agua: (u) => (u === "L" ? "Ujë (litra)" : "Ujë (galona)"),
    errorMedida: "Kjo përmasë duhet të jetë më e madhe se 0.",
    aviso: "Materialet janë orientuese, për një beton të zakonshëm 1:2:3 (rreth 350 kg çimento për m³). Ndryshojnë sipas recetës, punimit dhe materialeve vendase: verifikojini me atë që drejton punimet.",
  }),
};
