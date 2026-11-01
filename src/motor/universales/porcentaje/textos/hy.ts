import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosHy: TextosUi<UiPorcentaje> = {
  slug: "tokosi-hashvich",
  ui: () => ({
    modo: "Ի՞նչ եք ուզում հաշվարկել",
    modoParte: "Որքա՞ն է Y թվի X տոկոսը",
    modoProporcion: "X թիվը Y թվի քանի՞ տոկոսն է",
    modoAumento: "Y գումարած X տոկոս",
    modoRebaja: "Y հանած X տոկոս",
    x: "Թիվ X",
    xAyuda: "Սա տոկոսն է։ Եթե ընտրել եք «X թիվը Y թվի քանի՞ տոկոսն է» տարբերակը, սա մասն է։",
    y: "Թիվ Y",
    resultado: "Արդյունք",
    porcentaje: "Տոկոս",
    diferencia: "Ավելացված կամ հանված արժեք",
    errorYCero: "Y թիվը չի կարող 0 լինել, քանի որ զրոյից տոկոս չի հաշվարկվում։",
    fraseParte: (x, y, r) => `${y} թվի ${x} տոկոսը՝ ${r}։`,
    fraseProporcion: (x, y, p) => `${x} թիվը ${y} թվի ${p} տոկոսն է։`,
    fraseAumento: (x, y, r, d) => `${y} գումարած ${x} տոկոս՝ ${r} (ավելանում է ${d})։`,
    fraseRebaja: (x, y, r, d) => `${y} հանած ${x} տոկոս՝ ${r} (պակասում է ${d})։`,
  }),
};
