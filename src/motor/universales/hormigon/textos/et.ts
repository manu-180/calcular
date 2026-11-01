import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosEt: TextosUi<UiHormigon> = {
  slug: "betooni-kalkulaator",
  ui: () => ({
    largo: (u) => `Pikkus (${u})`,
    ancho: (u) => `Laius (${u})`,
    espesor: (u) => `Paksus (${u})`,
    espesorAyuda: "Terrassi või kõnnitee plaat on sageli 10 cm (4 in) paks. Sõidutee plaat on 12-15 cm.",
    margen: "Varu (%)",
    margenAyuda: "Ebatasase aluspinna ja materjalikao jaoks. Tavaliselt 5-10%.",
    bolsa: (u) => `Tsemendikoti kaal (${u})`,
    volumen: (u) => `Täpne maht (${u})`,
    volumenTotal: (u) => `Vajalik betoon (${u})`,
    volumenPies: "Vajalik betoon (ft³)",
    cemento: (u) => `Tsement (${u})`,
    bolsas: "Tsemendikotid",
    arena: (u) => `Liiv (${u})`,
    piedra: (u) => `Kruus või killustik (${u})`,
    agua: (u) => (u === "L" ? "Vesi (liitrit)" : "Vesi (gallonit)"),
    errorMedida: "Mõõt peab olema suurem kui 0.",
    aviso: "Materjalikogused on ligikaudsed ja põhinevad levinud segusuhtel 1:2:3 (umbes 350 kg tsementi kuupmeetri kohta). Need sõltuvad retseptist, tööst ja kohalikest materjalidest. Kontrolli neid töödejuhatajaga.",
  }),
};
