import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosBs: TextosUi<UiHormigon> = {
  slug: "kalkulator-betona",
  ui: () => ({
    largo: (u) => `Dužina (${u})`,
    ancho: (u) => `Širina (${u})`,
    espesor: (u) => `Debljina (${u})`,
    espesorAyuda: "Za terasu ili stazu obično se radi 10 cm (4 in), a za prilaz za automobil 12 do 15 cm.",
    margen: "Rezerva (%)",
    margenAyuda: "Za neravnu podlogu i gubitak betona. Obično 5 do 10 %.",
    bolsa: (u) => `Težina vreće cementa (${u})`,
    volumen: (u) => `Tačan volumen (${u})`,
    volumenTotal: (u) => `Potrebna količina betona (${u})`,
    volumenPies: "Potrebna količina betona (ft³)",
    cemento: (u) => `Cement (${u})`,
    bolsas: "Broj vreća cementa (kom.)",
    arena: (u) => `Pijesak (${u})`,
    piedra: (u) => `Šljunak (${u})`,
    agua: (u) => (u === "L" ? "Voda (litre)" : "Voda (galoni)"),
    errorMedida: "Ova mjera mora biti veća od nule.",
    aviso:
      "Količina materijala je okvirna, za uobičajenu mješavinu 1 : 2 : 3 (oko 350 kg cementa na 1 m³). Ovisi o omjeru u mješavini, vrsti radova i lokalnim materijalima: provjerite je s izvođačem ili statičarem.",
  }),
};
