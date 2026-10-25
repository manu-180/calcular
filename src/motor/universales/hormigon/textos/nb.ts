import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosNb: TextosUi<UiHormigon> = {
  slug: "betongkalkulator",
  ui: () => ({
    largo: (u) => `Lengde (${u})`,
    ancho: (u) => `Bredde (${u})`,
    espesor: (u) => `Tykkelse (${u})`,
    espesorAyuda: "En plate til en terrasse eller gangsti er ofte 10 cm (4 in). En innkjørsel 12 til 15 cm.",
    margen: "Ekstra tillegg (%)",
    margenAyuda: "Til ujevnt underlag og svinn. 5 til 10 % er det vanlige.",
    bolsa: (u) => `Vekt per sementsekk (${u})`,
    volumen: (u) => `Nøyaktig mengde (${u})`,
    volumenTotal: (u) => `Betong du trenger (${u})`,
    volumenPies: "Betong du trenger (ft³)",
    cemento: (u) => `Sement (${u})`,
    bolsas: "Sekker sement",
    arena: (u) => `Sand (${u})`,
    piedra: (u) => `Pukk eller singel (${u})`,
    agua: (u) => (u === "L" ? "Vann (liter)" : "Vann (gallon)"),
    errorMedida: "Målet må være større enn 0.",
    aviso: "Mengdene er veiledende for en vanlig blanding 1:2:3 (omtrent 350 kg sement per m³). De endrer seg med reseptet, typen arbeid og materialene du får tak i. Sjekk dem med den som har ansvar for arbeidet.",
  }),
};
