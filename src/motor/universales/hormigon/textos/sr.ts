import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosSr: TextosUi<UiHormigon> = {
  slug: "kalkulator-betona",
  ui: () => ({
    largo: (u) => `Dužina (${u})`,
    ancho: (u) => `Širina (${u})`,
    espesor: (u) => `Debljina (${u})`,
    espesorAyuda: "Za terasu ili stazu obično se radi 10 cm (4 in), a za prilaz za automobil 12 do 15 cm.",
    margen: "Rezerva (%)",
    margenAyuda: "Za neravnu podlogu i gubitak betona. Obično 5 do 10 %.",
    bolsa: (u) => `Težina džaka cementa (${u})`,
    volumen: (u) => `Tačna zapremina (${u})`,
    volumenTotal: (u) => `Potrebno betona (${u})`,
    volumenPies: "Potrebno betona (ft³)",
    cemento: (u) => `Cement (${u})`,
    bolsas: "Džakova cementa (kom.)",
    arena: (u) => `Pesak (${u})`,
    piedra: (u) => `Šljunak (${u})`,
    agua: (u) => (u === "L" ? "Voda (litri)" : "Voda (galoni)"),
    errorMedida: "Ova mera mora biti veća od nule.",
    aviso:
      "Količina materijala je okvirna, za uobičajenu mešavinu 1 : 2 : 3 (oko 350 kg cementa na 1 m³). Zavisi od odnosa u mešavini, vrste radova i lokalnih materijala: proverite je sa izvođačem ili statičarem.",
  }),
};
